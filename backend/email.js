import nodemailer from "nodemailer";

// ------------------------------------------------------------------
// EMAIL SETUP
// ------------------------------------------------------------------
// By default this uses Ethereal (https://ethereal.email) — a free fake
// SMTP service made for testing. It does NOT deliver to real inboxes.
// Every "sent" email gets a preview link instead, so you can see exactly
// what the customer would have received.
//
// To send REAL emails to real inboxes (e.g. Gmail), set these environment
// variables before starting the server, and this file will use them
// automatically instead of Ethereal:
//
//   SMTP_HOST=smtp.gmail.com
//   SMTP_PORT=465
//   SMTP_USER=youraddress@gmail.com
//   SMTP_PASS=your_16_char_gmail_app_password   (not your normal password)
//
// Gmail requires an "app password" (Google Account → Security → 2-Step
// Verification → App passwords) — a normal password will be rejected.
// ------------------------------------------------------------------

let transporterPromise = null;

async function getTransporter() {
  if (transporterPromise) return transporterPromise;

  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    transporterPromise = Promise.resolve(
      nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 465,
        secure: true,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 10000,
      })
    );
  } else {
    transporterPromise = nodemailer.createTestAccount().then((testAccount) =>
      nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: { user: testAccount.user, pass: testAccount.pass },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 10000,
      })
    );
  }
  return transporterPromise;
}

function renderOrderEmail(order) {
  const rows = order.items
    .map(
      (l) => `
      <tr>
        <td style="padding:8px 0;">${l.product?.name} × ${l.qty}</td>
        <td style="padding:8px 0; text-align:right;">$${(l.product?.price * l.qty).toFixed(0)}</td>
      </tr>`
    )
    .join("");

  return `
  <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; color:#2B2420;">
    <div style="background:#3D2B56; padding:24px; border-radius:16px 16px 0 0; text-align:center;">
      <h1 style="color:#FBF7F0; margin:0; font-size:22px;">🛋️ Nestly</h1>
    </div>
    <div style="background:#FBF7F0; padding:24px; border-radius:0 0 16px 16px;">
      <h2 style="margin-top:0;">Order confirmed!</h2>
      <p>Hi ${order.customer?.name || "there"}, thanks for your order. Here's the summary:</p>
      <p style="font-family: monospace; font-size:14px; color:#6B8F71;"><strong>Order #${order.id}</strong></p>
      <table style="width:100%; border-collapse:collapse; margin:16px 0;">
        ${rows}
        <tr style="border-top:1px solid #ddd;">
          <td style="padding:8px 0; font-weight:bold;">Total</td>
          <td style="padding:8px 0; text-align:right; font-weight:bold;">$${order.total.toFixed(0)}</td>
        </tr>
      </table>
      <p style="font-size:13px; color:#888;">Shipping to: ${order.customer?.address || ""}, ${order.customer?.city || ""} ${order.customer?.zip || ""}</p>
    </div>
  </div>`;
}

export async function sendOrderConfirmation(order) {
  try {
    const transporter = await getTransporter();
    const info = await transporter.sendMail({
      from: '"Nestly" <orders@nestly.example>',
      to: order.customer?.email || "customer@example.com",
      subject: `Your Nestly order #${order.id} is confirmed`,
      html: renderOrderEmail(order),
    });

    const previewUrl = nodemailer.getTestMessageUrl(info) || null;
    return { sent: true, previewUrl };
  } catch (err) {
    console.error("Email send failed:", err.message);
    return { sent: false, previewUrl: null, error: err.message };
  }
}
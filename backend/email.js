import nodemailer from "nodemailer";
import { Resend } from "resend";

// ------------------------------------------------------------------
// EMAIL SETUP — three options, tried in this order:
//
// 1. RESEND (recommended for hosts like Railway/Render)
//    Many free hosting platforms BLOCK outbound SMTP connections
//    (ports 465/587) to stop spam abuse — this makes Gmail/SMTP email
//    impossible from them, no matter how correct your settings are.
//    Resend sends over normal HTTPS instead, so it isn't blocked.
//    Set: RESEND_API_KEY=re_xxxxxxxx  (free at https://resend.com)
//    Note: without verifying your own domain on Resend, you can only
//    send TO the email address you signed up to Resend with — that's
//    a Resend anti-abuse rule, not a bug here.
//
// 2. SMTP (works when running locally, or on hosts that allow it)
//    Set: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
//    For Gmail, SMTP_PASS must be an App Password (Google Account →
//    Security → 2-Step Verification → App passwords).
//
// 3. ETHEREAL (default fallback — fake SMTP for testing)
//    No real delivery; returns a preview link instead.
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
  const to = order.customer?.email || "customer@example.com";
  const subject = `Your Nestly order #${order.id} is confirmed`;
  const html = renderOrderEmail(order);

  // Option 1: Resend (HTTPS-based — works even when hosts block SMTP)
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { error } = await resend.emails.send({
        from: "Nestly <onboarding@resend.dev>",
        to,
        subject,
        html,
      });
      if (error) throw new Error(error.message || "Resend error");
      return { sent: true, previewUrl: null };
    } catch (err) {
      console.error("Resend email send failed:", err.message);
      return { sent: false, previewUrl: null, error: err.message };
    }
  }

  // Option 2 / 3: SMTP or Ethereal fallback
  try {
    const transporter = await getTransporter();
    const info = await transporter.sendMail({
      from: '"Nestly" <orders@nestly.example>',
      to,
      subject,
      html,
    });

    const previewUrl = nodemailer.getTestMessageUrl(info) || null;
    return { sent: true, previewUrl };
  } catch (err) {
    console.error("Email send failed:", err.message);
    return { sent: false, previewUrl: null, error: err.message };
  }
}
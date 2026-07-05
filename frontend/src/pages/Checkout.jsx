import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { api } from "../api";

export default function Checkout() {
  const { cart, cartId, refresh } = useCart();
  const [form, setForm] = useState({ name: "", email: "", address: "", city: "", zip: "" });
  const [order, setOrder] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const shipping = cart.subtotal > 500 ? 0 : 49;
  const total = cart.subtotal + shipping;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const result = await api.checkout(cartId, form);
      setOrder(result);
      await refresh();
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (order) {
    return (
      <div className="max-w-xl mx-auto px-5 py-24 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
          className="w-20 h-20 rounded-full bg-sage/20 flex items-center justify-center mx-auto mb-6 text-4xl"
        >
          ✓
        </motion.div>
        <h1 className="font-display text-3xl font-semibold">Order confirmed!</h1>
        <p className="text-ink/60 mt-3">
          Order <span className="font-mono font-bold text-ink">#{order.id}</span> is on its way. A
          confirmation has been sent to {order.customer?.email || "your email"}.
        </p>
        {order.emailPreviewUrl && (
          <a
            href={order.emailPreviewUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-3 text-sm font-semibold text-sage underline underline-offset-4"
          >
            📧 View the confirmation email (test preview)
          </a>
        )}
        <div className="mt-8 text-left bg-white rounded-2xl border border-ink/10 p-6">
          {order.items.map((l) => (
            <div key={l.productId} className="flex justify-between text-sm py-1">
              <span>
                {l.product?.name} × {l.qty}
              </span>
              <span className="font-mono">${(l.product?.price * l.qty).toFixed(0)}</span>
            </div>
          ))}
          <div className="border-t border-ink/10 mt-3 pt-3 flex justify-between font-bold">
            <span>Total</span>
            <span className="font-mono">${order.total.toFixed(0)}</span>
          </div>
        </div>
        <Link
          to="/shop"
          className="inline-block mt-8 bg-coral text-cream px-7 py-3.5 rounded-full font-semibold hover:bg-ink transition-colors"
        >
          Keep shopping
        </Link>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-5 py-24 text-center">
        <p className="text-4xl mb-4">🛋️</p>
        <h1 className="font-display text-3xl font-semibold">Your cart is empty</h1>
        <button
          onClick={() => navigate("/shop")}
          className="inline-block mt-6 bg-coral text-cream px-7 py-3.5 rounded-full font-semibold"
        >
          Browse furniture
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-5 md:px-8 py-12 grid md:grid-cols-5 gap-12">
      <form onSubmit={handleSubmit} className="md:col-span-3 space-y-5">
        <h1 className="font-display text-3xl font-semibold mb-2">Checkout</h1>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Full name" name="name" value={form.name} onChange={handleChange} required />
          <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
        </div>
        <Field label="Address" name="address" value={form.address} onChange={handleChange} required />
        <div className="grid grid-cols-2 gap-4">
          <Field label="City" name="city" value={form.city} onChange={handleChange} required />
          <Field label="ZIP code" name="zip" value={form.zip} onChange={handleChange} required />
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={submitting}
          className="w-full bg-coral text-cream font-semibold py-4 rounded-full hover:bg-ink transition-colors mt-4 disabled:opacity-60"
        >
          {submitting ? "Placing order…" : `Place order — $${total.toFixed(0)}`}
        </motion.button>
      </form>

      <div className="md:col-span-2 bg-white rounded-3xl border border-ink/10 p-6 h-fit">
        <h2 className="font-display text-xl font-semibold mb-4">Order summary</h2>
        <AnimatePresence>
          {cart.items.map((l) => (
            <motion.div
              key={l.productId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3 py-2 border-b border-ink/5"
            >
              <img src={l.product?.image} className="w-14 h-14 rounded-lg object-cover bg-ink/5" />
              <div className="flex-1 text-sm">
                <p className="font-medium">{l.product?.name}</p>
                <p className="text-ink/40">Qty {l.qty}</p>
              </div>
              <span className="font-mono text-sm">${(l.product?.price * l.qty).toFixed(0)}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        <div className="pt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-ink/60">Subtotal</span>
            <span className="font-mono">${cart.subtotal.toFixed(0)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ink/60">Shipping</span>
            <span className="font-mono">{shipping === 0 ? "Free" : `$${shipping}`}</span>
          </div>
          <div className="flex justify-between font-bold text-base pt-2 border-t border-ink/10">
            <span>Total</span>
            <span className="font-mono">${total.toFixed(0)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, ...props }) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <input
        {...props}
        className="mt-1 w-full bg-white border border-ink/15 rounded-xl px-4 py-2.5 outline-none focus:border-coral"
      />
    </label>
  );
}

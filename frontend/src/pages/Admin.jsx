import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "../api";

export default function Admin() {
  const [orders, setOrders] = useState(null);
  const [openId, setOpenId] = useState(null);
  const [error, setError] = useState(null);

  const load = () => {
    api.getAllOrders().then(setOrders).catch((e) => setError(e.message));
  };

  useEffect(() => {
    load();
    const interval = setInterval(load, 5000); // auto-refresh so new orders show up
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-coral font-bold mb-2">
            Store admin
          </p>
          <h1 className="font-display text-4xl font-semibold">Customer orders</h1>
        </div>
        <button
          onClick={load}
          className="border border-ink/15 hover:border-ink/40 px-4 py-2 rounded-full text-sm font-medium"
        >
          Refresh
        </button>
      </div>

      {error && <p className="text-coral">{error}</p>}

      {!orders ? (
        <p className="text-ink/50">Loading…</p>
      ) : orders.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-3xl border border-ink/10">
          <p className="text-4xl mb-3">📦</p>
          <p className="text-ink/60">No orders yet. Place a test checkout to see one here.</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-ink/10 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-ink/5 text-left">
              <tr>
                <th className="px-5 py-3 font-semibold">Order</th>
                <th className="px-5 py-3 font-semibold">Customer</th>
                <th className="px-5 py-3 font-semibold">Items</th>
                <th className="px-5 py-3 font-semibold">Total</th>
                <th className="px-5 py-3 font-semibold">Placed</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <motion.tr
                  key={o.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-t border-ink/5 hover:bg-cream cursor-pointer"
                  onClick={() => setOpenId(openId === o.id ? null : o.id)}
                >
                  <td className="px-5 py-4 font-mono font-semibold">#{o.id}</td>
                  <td className="px-5 py-4">
                    <p className="font-medium">{o.customer?.name || "—"}</p>
                    <p className="text-ink/40 text-xs">{o.customer?.email}</p>
                  </td>
                  <td className="px-5 py-4">{o.items.length} item(s)</td>
                  <td className="px-5 py-4 font-mono font-semibold">${o.total.toFixed(0)}</td>
                  <td className="px-5 py-4 text-ink/50">
                    {new Date(o.createdAt).toLocaleString()}
                  </td>
                  <td className="px-5 py-4 text-ink/30">{openId === o.id ? "▲" : "▼"}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          <AnimatePresence>
            {orders
              .filter((o) => o.id === openId)
              .map((o) => (
                <motion.div
                  key={o.id}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-ink/10 bg-cream px-6 py-5"
                >
                  <p className="font-semibold mb-2">Shipping to</p>
                  <p className="text-ink/60 text-sm mb-4">
                    {o.customer?.address}, {o.customer?.city} {o.customer?.zip}
                  </p>
                  <p className="font-semibold mb-2">Items</p>
                  <div className="space-y-2">
                    {o.items.map((l) => (
                      <div key={l.productId} className="flex justify-between text-sm">
                        <span>
                          {l.product?.name} × {l.qty}
                        </span>
                        <span className="font-mono">${(l.product?.price * l.qty).toFixed(0)}</span>
                      </div>
                    ))}
                  </div>
                  {o.emailPreviewUrl && (
                    <a
                      href={o.emailPreviewUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block mt-4 text-sm font-semibold text-sage underline underline-offset-4"
                    >
                      📧 View confirmation email sent for this order
                    </a>
                  )}
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

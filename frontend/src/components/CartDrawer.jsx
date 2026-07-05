import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartDrawer() {
  const { cart, isOpen, setIsOpen, updateQty, removeItem } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-50"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-cream z-50 flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-ink/10">
              <h2 className="font-display text-2xl font-semibold">Your cart</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 rounded-full hover:bg-ink/5 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {cart.items.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-4xl mb-3">🛋️</p>
                  <p className="text-ink/60">Your cart is empty. Let's fix that.</p>
                </div>
              )}
              <AnimatePresence>
                {cart.items.map((line) => (
                  <motion.div
                    key={line.productId + line.color}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, height: 0 }}
                    className="flex gap-3 border-b border-ink/5 pb-4"
                  >
                    <img
                      src={line.product?.image}
                      alt={line.product?.name}
                      className="w-20 h-20 rounded-xl object-cover bg-ink/5"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{line.product?.name}</p>
                      <span
                        className="inline-block w-3 h-3 rounded-full mt-1 border border-ink/10"
                        style={{ backgroundColor: line.color }}
                      />
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2 border border-ink/15 rounded-full px-2 py-1">
                          <button onClick={() => updateQty(line.productId, line.qty - 1)} disabled={line.qty <= 1}>
                            −
                          </button>
                          <span className="w-5 text-center text-sm font-mono">{line.qty}</span>
                          <button onClick={() => updateQty(line.productId, line.qty + 1)}>+</button>
                        </div>
                        <span className="font-mono font-semibold">
                          ${(line.product?.price * line.qty).toFixed(0)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(line.productId)}
                      className="text-ink/30 hover:text-coral self-start"
                    >
                      ✕
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {cart.items.length > 0 && (
              <div className="border-t border-ink/10 px-6 py-5 space-y-4">
                <div className="flex justify-between font-mono text-lg">
                  <span>Subtotal</span>
                  <span className="font-bold">${cart.subtotal.toFixed(0)}</span>
                </div>
                <Link
                  to="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="block text-center bg-coral text-cream font-semibold py-3.5 rounded-full hover:bg-ink transition-colors"
                >
                  Checkout
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

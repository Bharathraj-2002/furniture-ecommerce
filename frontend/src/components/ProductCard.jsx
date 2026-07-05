import { motion, useMotionValue, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product, index = 0 }) {
  const { addItem } = useCart();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-40, 40], [6, -6]);
  const rotateY = useTransform(x, [-40, 40], [-6, 6]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 8) * 0.05 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      whileHover={{ y: -8 }}
      className="group relative bg-white/60 rounded-3xl p-3 border border-ink/10 hover:border-ink/20 hover:shadow-xl hover:shadow-ink/5 transition-shadow"
    >
      {product.tag && (
        <span className="absolute top-5 left-5 z-10 bg-mustard text-ink text-xs font-bold px-3 py-1 rounded-full">
          {product.tag}
        </span>
      )}
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-ink/5">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        </div>
      </Link>

      <div className="px-2 pt-4 pb-2">
        <p className="text-xs uppercase tracking-wide text-sage font-semibold font-mono">
          {product.material}
        </p>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-display text-lg font-medium mt-1 hover:text-coral transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mt-1 mb-3">
          {product.colors.slice(0, 4).map((c) => (
            <span
              key={c}
              className="w-3.5 h-3.5 rounded-full border border-ink/10"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2 font-mono">
            <span className="font-bold text-lg">${product.price}</span>
            {product.originalPrice && (
              <span className="text-ink/40 line-through text-sm">${product.originalPrice}</span>
            )}
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => addItem(product.id, product.colors[0])}
            className="w-10 h-10 rounded-full bg-ink text-cream flex items-center justify-center hover:bg-coral transition-colors"
            aria-label={`Add ${product.name} to cart`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

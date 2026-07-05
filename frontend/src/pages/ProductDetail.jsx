import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "../api";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

export default function ProductDetail() {
  const { id } = useParams();
  const { addItem, loading } = useCart();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [color, setColor] = useState(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setProduct(null);
    api.getProduct(id).then((p) => {
      setProduct(p);
      setColor(p.colors[0]);
      setQty(1);
      api.getProducts({ category: p.category }).then((all) =>
        setRelated(all.filter((x) => x.id !== p.id).slice(0, 4))
      );
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (!product) {
    return <div className="max-w-7xl mx-auto px-5 md:px-8 py-24 text-center text-ink/50">Loading…</div>;
  }

  const handleAdd = async () => {
    await addItem(product.id, color, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-10">
      <div className="text-sm text-ink/50 mb-6 flex gap-2">
        <Link to="/shop" className="hover:text-coral">
          Shop
        </Link>
        <span>/</span>
        <span className="capitalize">{product.category}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl overflow-hidden aspect-[4/3] bg-ink/5"
        >
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}>
          {product.tag && (
            <span className="bg-mustard text-ink text-xs font-bold px-3 py-1 rounded-full">
              {product.tag}
            </span>
          )}
          <h1 className="font-display text-4xl font-semibold mt-4">{product.name}</h1>
          <p className="text-sage font-mono text-sm uppercase tracking-wide mt-2">{product.material}</p>

          <div className="flex items-center gap-2 mt-3 text-sm">
            <span className="text-mustard">{"★".repeat(Math.round(product.rating))}</span>
            <span className="text-ink/40">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          <div className="flex items-baseline gap-3 mt-5 font-mono">
            <span className="text-3xl font-bold">${product.price}</span>
            {product.originalPrice && (
              <span className="text-ink/40 line-through text-lg">${product.originalPrice}</span>
            )}
          </div>

          <p className="text-ink/60 mt-5 leading-relaxed">{product.desc}</p>

          <div className="mt-6">
            <p className="text-sm font-semibold mb-2">Color</p>
            <div className="flex gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-9 h-9 rounded-full border-2 transition-transform ${
                    color === c ? "border-ink scale-110" : "border-transparent"
                  }`}
                  style={{ backgroundColor: c }}
                  aria-label={c}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 mt-8">
            <div className="flex items-center gap-3 border border-ink/15 rounded-full px-4 py-2.5">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="font-bold">
                −
              </button>
              <span className="w-6 text-center font-mono">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="font-bold">
                +
              </button>
            </div>

            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={handleAdd}
              disabled={loading}
              className="flex-1 bg-coral text-cream font-semibold py-3.5 rounded-full hover:bg-ink transition-colors relative overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {added ? (
                  <motion.span key="added" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}>
                    Added to cart ✓
                  </motion.span>
                ) : (
                  <motion.span key="add" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}>
                    Add to cart
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-10 text-sm">
            <div className="bg-sage/10 rounded-2xl p-4">
              <p className="font-semibold">🚚 Free shipping</p>
              <p className="text-ink/50 mt-1">On orders over $500</p>
            </div>
            <div className="bg-coral/10 rounded-2xl p-4">
              <p className="font-semibold">🛋️ 100-night trial</p>
              <p className="text-ink/50 mt-1">Return it if it's not right</p>
            </div>
          </div>
        </motion.div>
      </div>

      {related.length > 0 && (
        <div className="mt-24">
          <h2 className="font-display text-3xl font-semibold mb-6">You might also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

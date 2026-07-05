import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { api } from "../api";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import Marquee from "../components/Marquee";
import Stats from "../components/Stats";
import Testimonials from "../components/Testimonials";

const swatches = [
  { color: "#FF6B4A", label: "Coral", top: "8%", left: "6%", delay: 0 },
  { color: "#F4B740", label: "Mustard", top: "62%", left: "2%", delay: 0.6 },
  { color: "#6B8F71", label: "Sage", top: "14%", left: "88%", delay: 1.1 },
  { color: "#D46A8F", label: "Rose", top: "70%", left: "90%", delay: 0.3 },
  { color: "#3E92CC", label: "Sky", top: "40%", left: "94%", delay: 0.9 },
];

export default function Home() {
  const [featured, setFeatured] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.getProducts({ sort: "rating" }).then((p) => setFeatured(p.slice(0, 8)));
    api.getCategories().then(setCategories);
  }, []);

  return (
    <div>
      {/* HERO */}
      <section className="relative max-w-7xl mx-auto px-5 md:px-8 pt-14 pb-28 overflow-hidden">
        <div
          className="absolute inset-0 -z-10 opacity-70"
          style={{
            background:
              "radial-gradient(circle at 15% 20%, #FF6B4A22, transparent 40%), radial-gradient(circle at 85% 15%, #3E92CC22, transparent 40%), radial-gradient(circle at 50% 90%, #F4B74033, transparent 45%)",
          }}
        />
        {swatches.map((s) => (
          <motion.div
            key={s.label}
            className="hidden md:flex absolute flex-col items-center gap-1"
            style={{ top: s.top, left: s.left }}
            animate={{ y: [0, -16, 0], rotate: [0, 6, 0] }}
            transition={{ duration: 5 + s.delay, repeat: Infinity, ease: "easeInOut", delay: s.delay }}
          >
            <span
              className="w-14 h-14 rounded-blob shadow-lg block border-4 border-white"
              style={{ backgroundColor: s.color }}
            />
            <span className="text-[10px] font-mono uppercase tracking-wider text-ink/50">
              {s.label}
            </span>
          </motion.div>
        ))}

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-xs uppercase tracking-[0.3em] text-sage font-bold mb-5"
          >
            New season, new corners
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-semibold leading-[1.05] tracking-tight"
          >
            Furniture that
            <br />
            feels like <span className="text-coral italic">home</span>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-ink/60 text-lg"
          >
            Hand-picked pieces from small workshops — every sofa, chair, and lamp
            chosen to make a room feel like yours.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-9 flex items-center justify-center gap-4"
          >
            <Link
              to="/shop"
              className="bg-coral text-cream px-7 py-3.5 rounded-full font-semibold hover:bg-ink transition-colors"
            >
              Shop the collection
            </Link>
            <Link
              to="/shop?category=sofas"
              className="px-7 py-3.5 rounded-full font-semibold border border-ink/15 hover:border-ink/40 transition-colors"
            >
              Browse sofas
            </Link>
          </motion.div>
        </div>
      </section>

      <Marquee />

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex items-end justify-between mb-6">
          <h2 className="font-display text-3xl font-semibold">Shop by room</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={`/shop?category=${c.slug}`}
                className="group block rounded-3xl p-6 h-32 flex flex-col justify-between relative overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${c.swatch}26, ${c.swatch}0D)`,
                  border: `1px solid ${c.swatch}33`,
                }}
              >
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: c.swatch }}
                >
                  ●
                </span>
                <span className="font-display text-lg font-medium group-hover:translate-x-1 transition-transform">
                  {c.label}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <Stats />
      <Testimonials />

      {/* FEATURED */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 mt-20">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-coral font-bold mb-2">
              Top rated
            </p>
            <h2 className="font-display text-3xl font-semibold">Customer favorites</h2>
          </div>
          <Link to="/shop" className="text-sm font-semibold underline underline-offset-4">
            View all
          </Link>
        </div>
        {!featured ? (
          <Loader count={8} />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* BANNER */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 mt-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-plum text-cream rounded-[2.5rem] px-8 py-16 md:py-24 text-center relative overflow-hidden"
        >
          <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-coral/30 blur-2xl animate-floatSlow" />
          <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-mustard/20 blur-2xl animate-float" />
          <h2 className="font-display text-4xl md:text-5xl font-semibold relative z-10">
            Free shipping over $500
          </h2>
          <p className="text-cream/60 mt-4 relative z-10">
            Plus a 100-night home trial on every sofa and bed.
          </p>
          <Link
            to="/shop"
            className="inline-block mt-8 bg-coral px-7 py-3.5 rounded-full font-semibold relative z-10 hover:bg-mustard hover:text-ink transition-colors"
          >
            Start shopping
          </Link>
        </motion.div>
      </section>
    </div>
  );
}

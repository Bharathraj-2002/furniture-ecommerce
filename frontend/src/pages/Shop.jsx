import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "../api";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "all";
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    api.getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    setProducts(null);
    const t = setTimeout(() => {
      api.getProducts({ category, search, sort }).then(setProducts);
    }, 200);
    return () => clearTimeout(t);
  }, [category, search, sort]);

  const setCategory = (slug) => {
    if (slug === "all") setSearchParams({});
    else setSearchParams({ category: slug });
  };

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-10">
      <div className="mb-8">
        <p className="font-mono text-xs uppercase tracking-widest text-coral font-bold mb-2">
          {products ? `${products.length} pieces` : "Loading…"}
        </p>
        <h1 className="font-display text-4xl font-semibold">Shop everything</h1>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-8">
        <div className="flex flex-wrap gap-2">
          <FilterPill active={category === "all"} onClick={() => setCategory("all")}>
            All
          </FilterPill>
          {categories.map((c) => (
            <FilterPill key={c.slug} active={category === c.slug} onClick={() => setCategory(c.slug)} dot={c.swatch}>
              {c.label}
            </FilterPill>
          ))}
        </div>

        <div className="flex gap-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search furniture…"
            className="bg-white border border-ink/15 rounded-full px-4 py-2 text-sm outline-none focus:border-coral w-48"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-white border border-ink/15 rounded-full px-4 py-2 text-sm outline-none focus:border-coral"
          >
            <option value="">Sort: Featured</option>
            <option value="price-asc">Price: Low to high</option>
            <option value="price-desc">Price: High to low</option>
            <option value="rating">Top rated</option>
          </select>
        </div>
      </div>

      {!products ? (
        <Loader count={9} />
      ) : products.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-ink/60">No pieces match that search yet — try another term.</p>
        </div>
      ) : (
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
          >
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

function FilterPill({ active, onClick, children, dot }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
        active ? "bg-ink text-cream border-ink" : "border-ink/15 hover:border-ink/40"
      }`}
    >
      {dot && <span className="w-2 h-2 rounded-full" style={{ backgroundColor: dot }} />}
      {children}
    </button>
  );
}

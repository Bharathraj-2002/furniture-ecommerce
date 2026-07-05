import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

const links = [
  { to: "/shop", label: "Shop" },
  { to: "/shop?category=sofas", label: "Sofas" },
  { to: "/shop?category=lighting", label: "Lighting" },
  { to: "/shop?category=decor", label: "Decor" },
];

export default function Navbar() {
  const { cart, setIsOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-cream/80 backdrop-blur-md border-b border-ink/10">
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <motion.span
            whileHover={{ rotate: -8, scale: 1.08 }}
            className="w-9 h-9 rounded-full bg-coral flex items-center justify-center text-cream font-display font-bold text-lg"
          >
            N
          </motion.span>
          <span className="font-display text-2xl font-semibold tracking-tight">Nestly</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 font-medium text-sm">
          {links.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              className="relative py-2 text-ink/80 hover:text-ink transition-colors group"
            >
              {l.label}
              <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-coral transition-all duration-300 group-hover:w-full" />
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpen(true)}
            className="relative flex items-center gap-2 bg-ink text-cream px-4 py-2.5 rounded-full font-medium text-sm hover:bg-plum transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            Cart
            {cart.count > 0 && (
              <motion.span
                key={cart.count}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-coral text-cream text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold"
              >
                {cart.count}
              </motion.span>
            )}
          </button>
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <motion.nav
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="md:hidden bg-cream border-t border-ink/10 px-5 py-4 flex flex-col gap-4 font-medium"
        >
          {links.map((l) => (
            <NavLink key={l.label} to={l.to} onClick={() => setMenuOpen(false)}>
              {l.label}
            </NavLink>
          ))}
        </motion.nav>
      )}
    </header>
  );
}

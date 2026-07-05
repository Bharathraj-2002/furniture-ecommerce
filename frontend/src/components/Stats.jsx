import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

const stats = [
  { value: 12400, suffix: "+", label: "Happy homes furnished", color: "#FF6B4A" },
  { value: 41, suffix: "", label: "Unique pieces in the shop", color: "#F4B740" },
  { value: 4.8, suffix: "★", label: "Average customer rating", color: "#6B8F71", decimals: 1 },
  { value: 100, suffix: "-night", label: "Home trial on every order", color: "#3E92CC" },
];

function Counter({ value, suffix, decimals = 0, color }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className="font-display text-4xl md:text-5xl font-bold" style={{ color }}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="max-w-7xl mx-auto px-5 md:px-8 mt-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <Counter value={s.value} suffix={s.suffix} decimals={s.decimals} color={s.color} />
            <p className="text-ink/50 text-sm mt-2">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

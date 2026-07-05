import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const testimonials = [
  { name: "Priya R.", quote: "The Marlow sofa is the first piece of furniture I've been excited to show people. It genuinely feels custom.", role: "Bengaluru", color: "#FF6B4A" },
  { name: "Daniel K.", quote: "Ordered the Alder coffee table and it showed up exactly like the photos — heavy, solid, gorgeous grain.", role: "Austin, TX", color: "#F4B740" },
  { name: "Meera S.", quote: "The 100-night trial made it an easy decision. Ended up keeping the sectional after week one.", role: "Mumbai", color: "#6B8F71" },
  { name: "Tom H.", quote: "Delivery was fast and the rocking chair is somehow even better in person. Already eyeing the dresser next.", role: "Leeds, UK", color: "#3E92CC" },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 4500);
    return () => clearInterval(t);
  }, []);

  const current = testimonials[index];

  return (
    <section className="max-w-4xl mx-auto px-5 md:px-8 mt-24 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-coral font-bold mb-2">
        What people are saying
      </p>
      <div className="relative h-56 md:h-40 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <p className="font-display text-xl md:text-2xl leading-snug">"{current.quote}"</p>
            <p className="mt-4 text-sm font-semibold" style={{ color: current.color }}>
              {current.name} <span className="text-ink/40 font-normal">· {current.role}</span>
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {testimonials.map((t, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className="w-2.5 h-2.5 rounded-full transition-all"
            style={{
              backgroundColor: i === index ? t.color : "#00000022",
              width: i === index ? "24px" : "10px",
            }}
            aria-label={`Show testimonial ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

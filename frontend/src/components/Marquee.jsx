const items = [
  "🚚 Free shipping over $500",
  "🛋️ 100-night home trial",
  "🎨 Custom colors on every sofa",
  "⭐ 4.8 average rating",
  "🔁 Easy 30-day returns",
  "🌿 Sustainably sourced wood",
];

export default function Marquee() {
  const loop = [...items, ...items];
  return (
    <div className="overflow-hidden bg-ink text-cream py-3 border-y-4 border-coral">
      <div className="flex gap-10 whitespace-nowrap animate-[marquee_22s_linear_infinite] w-max">
        {loop.map((item, i) => (
          <span key={i} className="font-mono text-sm font-semibold tracking-wide flex items-center gap-3">
            {item}
            <span className="text-mustard">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Loader({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-3xl p-3 border border-ink/10">
          <div className="aspect-[4/3] rounded-2xl shimmer-bg animate-shimmer" />
          <div className="h-3 w-1/3 rounded-full shimmer-bg animate-shimmer mt-4" />
          <div className="h-4 w-2/3 rounded-full shimmer-bg animate-shimmer mt-2" />
          <div className="h-5 w-1/4 rounded-full shimmer-bg animate-shimmer mt-3" />
        </div>
      ))}
    </div>
  );
}

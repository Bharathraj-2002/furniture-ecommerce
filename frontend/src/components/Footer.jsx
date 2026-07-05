export default function Footer() {
  return (
    <footer className="bg-plum text-cream mt-24">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-8 rounded-full bg-coral flex items-center justify-center font-display font-bold">
              N
            </span>
            <span className="font-display text-xl font-semibold">Nestly</span>
          </div>
          <p className="text-cream/60 text-sm leading-relaxed">
            Furniture built for the way you actually live — sourced from small workshops, shipped to your door.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-mustard">Shop</h4>
          <ul className="space-y-2 text-sm text-cream/70">
            <li>Sofas & Couches</li>
            <li>Chairs</li>
            <li>Tables</li>
            <li>Lighting</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-mustard">Support</h4>
          <ul className="space-y-2 text-sm text-cream/70">
            <li>Shipping & returns</li>
            <li>Track an order</li>
            <li>Care guides</li>
            <li>Contact us</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-mustard">Stay in the loop</h4>
          <p className="text-cream/60 text-sm mb-3">New arrivals & 10% off your first order.</p>
          <div className="flex">
            <input
              placeholder="you@email.com"
              className="bg-cream/10 placeholder:text-cream/40 rounded-l-full px-4 py-2 text-sm outline-none w-full border border-cream/20"
            />
            <button className="bg-coral px-4 rounded-r-full text-sm font-semibold">Join</button>
          </div>
        </div>
      </div>
      <div className="border-t border-cream/10 py-6 text-center text-xs text-cream/50">
        © {new Date().getFullYear()} Nestly Furniture Co. Built for demo purposes.
      </div>
    </footer>
  );
}

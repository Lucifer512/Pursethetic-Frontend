import ProductGallery from "../components/ProductGallery";

export default function HomePage() {
  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-12">
      {/* Hero Section */}
      <section id="hero" className="text-center mb-14">
        <h1 className="headline-text text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight drop-shadow-lg">Premium, Minimalist Handbags</h1>
        <p className="muted-text text-lg sm:text-xl max-w-2xl mx-auto mb-8">Discover the new standard for the modern muse. Effortless style, curated quality, and timeless design—crafted for you.</p>
        <a href="#products" className="button-text inline-block bg-primary px-8 py-3 rounded-xl font-semibold shadow hover:bg-accent transition-transform hover:scale-105">Shop Now</a>
      </section>

      {/* Features Section */}
      <section className="flex flex-col md:flex-row justify-center gap-8 mb-16">
        <div className="flex-1 bg-surface rounded-xl shadow-card p-6 flex flex-col items-center border border-border">
          <span className="text-3xl mb-2">🚚</span>
          <h3 className="font-bold text-lg mb-1">Nationwide Shipping</h3>
          <p className="muted-text text-center">Fast, reliable delivery across Pakistan. Free shipping on orders over Rs. 4,000.</p>
        </div>
        <div className="flex-1 bg-surface rounded-xl shadow-card p-6 flex flex-col items-center border border-border">
          <span className="text-3xl mb-2">💳</span>
          <h3 className="font-bold text-lg mb-1">Cash on Delivery</h3>
          <p className="muted-text text-center">Secure doorstep payment for a worry-free shopping experience.</p>
        </div>
        <div className="flex-1 bg-surface rounded-xl shadow-card p-6 flex flex-col items-center border border-border">
          <span className="text-3xl mb-2">🔄</span>
          <h3 className="font-bold text-lg mb-1">Easy Exchanges</h3>
          <p className="muted-text text-center">7-day seamless exchange policy for your peace of mind.</p>
        </div>
      </section>

      {/* Product Gallery */}
      <ProductGallery />
    </main>
  );
}

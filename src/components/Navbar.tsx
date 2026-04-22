import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-surface shadow px-6 py-4 flex justify-between items-center border-b border-border">
      <div className="text-2xl font-bold">
        <Link href="/">Pursethetic</Link>
      </div>
      <div className="space-x-6">
        <Link href="/products" className="hover:opacity-70 transition">Products</Link>
        <Link href="/cart" className="hover:opacity-70 transition">Cart</Link>
        <Link href="/account" className="hover:opacity-70 transition">Account</Link>
      </div>
    </nav>
  );
}

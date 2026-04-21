import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-gray-800">
        <Link href="/">Pursethetic</Link>
      </div>
      <div className="space-x-6">
        <Link href="/products" className="hover:text-blue-600">Products</Link>
        <Link href="/cart" className="hover:text-blue-600">Cart</Link>
        <Link href="/account" className="hover:text-blue-600">Account</Link>
      </div>
    </nav>
  );
}

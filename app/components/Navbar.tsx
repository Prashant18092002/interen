// app/components/Navbar.tsx
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          SecureSight Dashboard
        </Link>
        {/* Add more nav items if needed */}
      </div>
    </nav>
  );
}
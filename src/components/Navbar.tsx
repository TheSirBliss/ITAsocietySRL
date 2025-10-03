'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 px-4 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">ITA Nexus</Link>
        <ul className={`md:flex space-x-6 ${isOpen ? 'block' : 'hidden'} md:block`}>
          <li><Link href="/about" className="text-white hover:text-blue-400">About</Link></li>
          <li><Link href="/services" className="text-white hover:text-blue-400">Services</Link></li>
          <li><Link href="/partners" className="text-white hover:text-blue-400">Partners</Link></li>
          <li><Link href="/contact" className="text-white hover:text-blue-400">Contact</Link></li>
        </ul>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">Menu</button>
      </div>
    </nav>
  );
}
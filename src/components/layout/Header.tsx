'use client';
import Link from 'next/link';
import { useState } from 'react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/background-remover', label: 'Remove Background' },
  { href: '/docs', label: 'API' },
  { href: '/blog', label: 'Blog' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[--color-primary] rounded-lg flex items-center justify-center"><span className="text-white font-bold text-sm">✂</span></div>
            <span className="text-xl font-bold text-gray-900">Clear<span className="text-[--color-primary]">Cut</span></span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {links.map(l => <Link key={l.href} href={l.href} className="text-sm font-medium text-gray-600 hover:text-[--color-primary] transition-colors">{l.label}</Link>)}
            <Link href="/background-remover" className="bg-[--color-primary] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[--color-primary-dark]">Remove Background →</Link>
          </nav>
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-gray-600" aria-label="Menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              {open ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
        {open && <div className="md:hidden pb-4 space-y-2">{links.map(l => <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block px-3 py-2 text-gray-600 hover:text-[--color-primary] hover:bg-purple-50 rounded-lg text-sm font-medium">{l.label}</Link>)}</div>}
      </div>
    </header>
  );
}

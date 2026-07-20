'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/#home', type: 'anchor' as const },
  { label: 'About', href: '/#about', type: 'anchor' as const },
  {
    label: 'Services',
    href: '/#services',
    type: 'anchor' as const,
    children: [
      { label: 'Security Services', href: '/#services' },
      { label: 'Housekeeping & Cleaning', href: '/#services' },
      { label: 'Event Organization', href: '/#services' },
      { label: 'Training Programs', href: '/#services' },
      { label: 'Job Consultancy', href: '/#services' },
      { label: 'Manpower Supply', href: '/#services' },
    ],
  },
  { label: 'Contact', href: '/#contact', type: 'anchor' as const },
  { label: 'Employee', href: '/employee', type: 'route' as const },
  { label: 'Employer', href: '/employer', type: 'route' as const },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const isLanding = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0d1b3e] shadow-xl py-2' : 'bg-[#0d1b3e]/95 backdrop-blur-md py-3'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center font-black text-white text-lg shadow-lg group-hover:bg-amber-400 transition-colors">
            H
          </div>
          <div>
            <div className="text-white font-bold text-sm leading-tight">HAND TO HAND</div>
            <div className="text-amber-400 text-[10px] font-semibold tracking-wider leading-tight">
              SERVICES PVT. LTD.
            </div>
            <div className="text-gray-400 text-[9px] tracking-widest">SERVICE WITH INTEGRITY</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) =>
            link.children ? (
              <li key={link.label} className="relative">
                <button
                  className="flex items-center gap-1 text-gray-200 hover:text-amber-400 transition-colors duration-200 font-medium text-sm"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  {link.label} <ChevronDown size={14} />
                </button>
                {dropdownOpen && (
                  <ul className="absolute top-full left-0 mt-2 w-52 bg-[#0d1b3e] border border-amber-500/20 rounded-xl shadow-2xl overflow-hidden z-50">
                    {link.children.map((child) => (
                      <li key={child.label}>
                        <Link
                          href={child.href}
                          className="block px-4 py-2.5 text-gray-300 hover:bg-amber-500 hover:text-white text-sm transition-colors"
                          onClick={() => setDropdownOpen(false)}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ) : link.type === 'route' ? (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-gray-200 hover:text-amber-400 transition-colors duration-200 font-medium text-sm"
                >
                  {link.label}
                </Link>
              </li>
            ) : (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-gray-200 hover:text-amber-400 transition-colors duration-200 font-medium text-sm"
                >
                  {link.label}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* CTA */}
        <Link href="/#contact" className="hidden lg:inline-flex btn-gold text-sm">
          Get Free Quote
        </Link>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-white p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0d1b3e] border-t border-white/10 px-4 pb-4">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label}>
                <Link
                  href={link.href}
                  className="block py-3 text-gray-200 hover:text-amber-400 font-medium border-b border-white/5 text-sm"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
                {link.children.map((child) => (
                  <Link
                    key={child.label}
                    href={child.href}
                    className="block py-2 pl-4 text-gray-400 hover:text-amber-400 text-xs border-b border-white/5"
                    onClick={() => setMobileOpen(false)}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="block py-3 text-gray-200 hover:text-amber-400 font-medium border-b border-white/5 text-sm"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            )
          )}
          <Link href="/#contact" className="btn-gold mt-4 justify-center w-full" onClick={() => setMobileOpen(false)}>
            Get Free Quote
          </Link>
        </div>
      )}
    </header>
  );
}

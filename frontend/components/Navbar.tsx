'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/', type: 'route' as const },
  { label: 'About Us', href: '/about', type: 'route' as const },
  { label: 'Services', href: '/services', type: 'route' as const },
  { label: 'Contact Us', href: '/contact', type: 'route' as const },
  {
    label: 'Portal / Apply',
    href: '/apply',
    type: 'route' as const,
    children: [
      { label: 'Job Application (Employee)', href: '/apply?type=employee' },
      { label: 'Service Request (Employer)', href: '/apply?type=employer' },
    ],
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  // 👇 tracks WHICH dropdown is open (null = none). One dropdown at a time.
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  // 👇 mobile submenu expansion (separate from desktop)
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns & mobile menu whenever the route changes
  useEffect(() => {
    setOpenDropdown(null);
    setMobileSubmenu(null);
    setMobileOpen(false);
  }, [pathname]);

  // Close desktop dropdown on outside click + Escape key
  useEffect(() => {
    if (!openDropdown) return;
    const onDocClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenDropdown(null);
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [openDropdown]);

  const toggleDropdown = (label: string) =>
    setOpenDropdown((prev) => (prev === label ? null : label));

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0d1b3e] shadow-xl py-2' : 'bg-[#0d1b3e]/95 backdrop-blur-md py-3'
        }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Hand to Hand Services Logo"
            className="h-10 sm:h-11 w-auto object-contain rounded-lg transition-transform group-hover:scale-105"
          />
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
              <li
                key={link.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  className="flex items-center gap-1 text-gray-200 hover:text-amber-400 transition-colors duration-200 font-medium text-sm"
                  onClick={() => toggleDropdown(link.label)}
                  aria-haspopup="true"
                  aria-expanded={openDropdown === link.label}
                >
                  {link.label}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${openDropdown === link.label ? 'rotate-180' : ''
                      }`}
                  />
                </button>

                {openDropdown === link.label && (
                  <>
                    {/* invisible bridge so the menu doesn't close while moving the mouse down */}
                    <div className="absolute top-full left-0 w-full h-2" />
                    <ul className="absolute top-full left-0 mt-2 w-52 bg-[#0d1b3e] border border-amber-500/20 rounded-xl shadow-2xl overflow-hidden z-50 py-1">
                      {link.children.map((child) => (
                        <li key={child.label}>
                          <Link
                            href={child.href}
                            className="block px-4 py-2.5 text-gray-300 hover:bg-amber-500 hover:text-white text-sm transition-colors"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </li>
            ) : (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-gray-200 hover:text-amber-400 transition-colors duration-200 font-medium text-sm"
                  onClick={() => setOpenDropdown(null)}
                >
                  {link.label}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* CTA */}
        <Link href="/contact#contact" className="!hidden lg:!inline-flex btn-gold text-sm">
          Connect With Us
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

      {/* Mobile menu — with expandable submenus per item */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0d1b3e] border-t border-white/10 px-4 pb-4">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label}>
                <button
                  className="w-full flex items-center justify-between py-3 text-gray-200 hover:text-amber-400 font-medium border-b border-white/5 text-sm"
                  onClick={() =>
                    setMobileSubmenu((prev) => (prev === link.label ? null : link.label))
                  }
                  aria-expanded={mobileSubmenu === link.label}
                >
                  {link.label}
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${mobileSubmenu === link.label ? 'rotate-180' : ''
                      }`}
                  />
                </button>
                {mobileSubmenu === link.label &&
                  link.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className="block py-2.5 pl-4 text-gray-400 hover:text-amber-400 text-xs border-b border-white/5"
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
          <Link
            href="/contact#contact"
            className="btn-gold mt-4 justify-center w-full"
            onClick={() => setMobileOpen(false)}
          >
            Connect With Us
          </Link>
        </div>
      )}
    </header>
  );
}
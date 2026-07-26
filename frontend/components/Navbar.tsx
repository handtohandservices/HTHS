'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/', type: 'route' as const },
  { label: 'About Us', href: '/about', type: 'route' as const },
  {
    label: 'Services',
    href: '/services/security-housekeeping',
    type: 'route' as const,
    children: [
      {
        label: '1. Private Security & Guarding Services',
        href: '/services/security-housekeeping#security',
        subtitle: 'Page 1 • PSARA Guarding & Bouncers',
      },
      {
        label: '2. Housekeeping, Cleaning & Hospitality',
        href: '/services/security-housekeeping#housekeeping',
        subtitle: 'Page 1 • Deep Cleaning & Janitorial',
      },
      {
        label: '3. Event Security & Management',
        href: '/services/events-cultural#events',
        subtitle: 'Page 2 • VIP Escort & 4K Photography',
      },
      {
        label: '4. Cultural Programs, Drama & Dance',
        href: '/services/events-cultural#cultural',
        subtitle: 'Page 2 • Stage Show & Drama Production',
      },
      {
        label: '5. Skill Development, Health & AI Training',
        href: '/services/training-empowerment#training',
        subtitle: 'Page 3 • Fire Drills & AI Workshops',
      },
      {
        label: '6. Women Empowerment & Social Initiatives',
        href: '/services/training-empowerment#women-empowerment',
        subtitle: 'Page 3 • Lady Guarding & CSR Placement',
      },
      {
        label: '7. Job Placement & Recruitment Consultancy',
        href: '/services/recruitment-manpower#consultancy',
        subtitle: 'Page 4 • Executive Talent Hiring',
      },
      {
        label: '8. Skilled & Unskilled Manpower Supply',
        href: '/services/recruitment-manpower#manpower',
        subtitle: 'Page 4 • Contract Staffing & Payroll',
      },
      {
        label: '9. Tour, Travel & Transportation Services',
        href: '/services/travel-logistics#travel',
        subtitle: 'Page 5 • Fleet Rentals & Airport Pickups',
      },
      {
        label: '10. Courier, Cargo & Logistics',
        href: '/services/travel-logistics#cargo',
        subtitle: 'Page 5 • Express Parcels & Heavy Freight',
      },
      {
        label: '11. Government & Private Tenders',
        href: '/services/tenders-others#tenders',
        subtitle: 'Page 6 • Uniforms & Tender Supplies',
      },
      {
        label: '12. Other Specialized Corporate Solutions',
        href: '/services/tenders-others#others',
        subtitle: 'Page 6 • ISO Audits & Facility Setup',
      },
    ],
  },
  { label: 'Gallery', href: '/gallery', type: 'route' as const },
  { label: 'Contact Us', href: '/contact', type: 'route' as const },
  {
    label: 'Portal / Apply',
    href: '/apply',
    type: 'route' as const,
    children: [
      { label: 'Job Application (Employee)', href: '/apply?type=employee', subtitle: '' },
      { label: 'Service Request (Employer)', href: '/apply?type=employer', subtitle: '' },
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
            <div className="text-white font-bold text-sm leading-tight">Hand to Hand Services Pvt. Ltd</div>

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
                    <ul className={`absolute top-full mt-2 ${link.label === 'Services'
                      ? 'w-[680px] -left-36 grid grid-cols-2 gap-1 p-2.5'
                      : 'w-60 left-0 py-2 divide-y divide-white/5'
                      } bg-[#0d1b3e] border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden z-50`}>
                      {link.children.map((child) => (
                        <li key={child.label}>
                          <Link
                            href={child.href}
                            className="block px-3 py-2 rounded-xl hover:bg-amber-500/20 hover:text-amber-300 text-gray-200 transition-colors group"
                            onClick={() => setOpenDropdown(null)}
                          >
                            <div className="font-semibold text-xs group-hover:text-amber-300 flex items-center justify-between">
                              <span className="truncate">{child.label}</span>
                              <span className="text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity text-xs shrink-0 ml-1">→</span>
                            </div>
                            {child.subtitle && (
                              <div className="text-[10px] text-gray-400 group-hover:text-gray-200 mt-0.5 truncate">
                                {child.subtitle}
                              </div>
                            )}
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
        <div className="lg:hidden bg-[#0d1b3e] border-t border-white/10 px-4 pb-4 max-h-[80vh] overflow-y-auto">
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
                {mobileSubmenu === link.label && (
                  <div className="py-1 bg-white/5 rounded-xl my-1 divide-y divide-white/5">
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block py-2.5 px-4 text-gray-300 hover:text-amber-400 text-xs"
                        onClick={() => setMobileOpen(false)}
                      >
                        <div className="font-semibold">{child.label}</div>
                        {child.subtitle && <div className="text-[10px] text-gray-400">{child.subtitle}</div>}
                      </Link>
                    ))}
                  </div>
                )}
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
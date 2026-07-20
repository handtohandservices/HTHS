'use client';

import { Phone, Mail, MapPin, ArrowRight, Linkedin, Facebook, Instagram } from 'lucide-react';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Our Services', href: '#services' },
  { label: 'Why Choose Us', href: '#about' },
  { label: 'Directors', href: '#directors' },
  { label: 'Contact Us', href: '#contact' },
];

const services = [
  'Private Security',
  'Housekeeping & Cleaning',
  'Event Organization',
  'Training Programs',
  'Job Consultancy',
  'Courier & Cargo',
];

export default function Footer() {
  return (
    <footer className="bg-[#0a1530] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 bg-amber-500 rounded-lg flex items-center justify-center font-black text-white text-lg shadow-lg">
                H
              </div>
              <div>
                <div className="text-white font-bold leading-tight">HAND TO HAND</div>
                <div className="text-amber-400 text-[10px] font-semibold tracking-wider">
                  SERVICES PVT. LTD.
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Your trusted partner for security, manpower, and comprehensive business solutions
              across India. Service with integrity.
            </p>
            <div className="flex gap-3">
              {[Linkedin, Facebook, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-amber-500 flex items-center justify-center transition-colors"
                  aria-label="Social link"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm hover:text-amber-400 transition-colors inline-flex items-center gap-2 group"
                  >
                    <ArrowRight size={14} className="text-amber-500 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Our Services</h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s}>
                  <a href="#services" className="text-sm hover:text-amber-400 transition-colors">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
                <span>307/5, Ground Floor, Sailing Club Road, Batla House, Okhla, Jamia Nagar, South Delhi - 110025</span>
              </li>
              <li className="flex gap-3">
                <Phone size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
                <span>
                  <a href="tel:9752128838" className="hover:text-amber-400 block">9752128838</a>
                  <a href="tel:8109929029" className="hover:text-amber-400 block">8109929029</a>
                  <a href="tel:7971293277" className="hover:text-amber-400 block">7971293277</a>
                </span>
              </li>
              <li className="flex gap-3">
                <Mail size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
                <a href="mailto:handtohandservices51@gmail.com" className="hover:text-amber-400 break-all">
                  handtohandservices51@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Hand to Hand Services Pvt. Ltd. All rights reserved.</p>
          <p>Service With Integrity • Built with excellence</p>
        </div>
      </div>
    </footer>
  );
}

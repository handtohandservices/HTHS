'use client';

import Link from 'next/link';
import { Shield, Users2, Briefcase, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] md:min-h-screen flex items-center pt-24 sm:pt-28 pb-16 sm:pb-20 overflow-hidden"
    >
      {/* Background image container with smart mobile & desktop positioning */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero.png"
          alt="Hand to Hand Services security and workforce team"
          className="w-full h-full object-cover object-[75%_center] sm:object-[85%_center] md:object-center lg:object-right transition-all duration-500"
        />
        {/* Responsive Overlay Gradient:
            - Mobile (default): Smooth vertical gradient so text on top is 100% readable while image shows through
            - Desktop (md+): Smooth left-to-right navy fade (dark on text side, clear on workforce side)
        */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1636]/95 via-[#0a1636]/80 to-[#0a1636]/90 md:bg-gradient-to-r md:from-[#0a1636] md:via-[#0a1636]/85 md:via-50% md:to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1636] via-transparent to-transparent opacity-80 md:opacity-40"></div>
      </div>

      {/* Decorative background glow */}
      <div className="absolute top-1/4 left-10 w-60 sm:w-80 h-60 sm:h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="max-w-2xl text-left">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-amber-500/30 rounded-full px-3.5 sm:px-4 py-1.5 mb-5 sm:mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-amber-300 text-[11px] sm:text-xs font-bold tracking-wider uppercase">
              PSARA LICENSED & ISO 9001:2015 CERTIFIED
            </span>
          </div>

          {/* Responsive Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold text-white leading-[1.18] sm:leading-[1.15] mb-4 sm:mb-6 tracking-tight">
            Your Trusted Partner for{' '}
            <span className="text-amber-400 font-extrabold block sm:inline">
              Security & Manpower
            </span>{' '}
            Solutions
          </h1>

          {/* Responsive Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-6 sm:mb-8 leading-relaxed max-w-xl">
            Hand to Hand Services Pvt. Ltd. delivers 100% verified security guarding, qualified staffing, housekeeping, and operational support built on integrity, discipline, and trust.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12">
            <Link
              href="/contact"
              className="btn-gold justify-center font-bold px-6 sm:px-7 py-3 sm:py-3.5 rounded-full inline-flex items-center gap-2 shadow-lg hover:scale-105 transition-transform text-sm sm:text-base"
            >
              Connect With Us <ArrowRight size={16} />
            </Link>
            <Link
              href="/services"
              className="btn-navy-outline justify-center !border-white/40 !text-white hover:!bg-white/10 font-bold px-6 sm:px-7 py-3 sm:py-3.5 rounded-full inline-flex items-center gap-2 text-sm sm:text-base"
            >
              Explore Services
            </Link>
          </div>

          {/* Responsive Feature pills grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 max-w-2xl">
            {[
              { icon: Shield, label: 'PSARA Trained Guards' },
              { icon: Users2, label: 'Verified Staffing' },
              { icon: Briefcase, label: '24/7 Rapid Response' },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/15 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 shadow-sm hover:border-amber-400/40 transition-colors"
              >
                <item.icon className="text-amber-400 shrink-0" size={18} />
                <span className="text-white text-xs font-semibold">{item.label}</span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Bottom wave divider */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 80L60 70C120 60 240 40 360 35C480 30 600 40 720 45C840 50 960 50 1080 45C1200 40 1320 30 1380 25L1440 20V80H0Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}




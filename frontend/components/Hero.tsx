'use client';

import { Shield, Users2, Briefcase, ArrowRight, Phone } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}

       <img
          src="/hero.png"
          alt="Security and workforce"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1b3e]/95 via-[#0d1b3e]/85 to-[#0d1b3e]/60"></div>
      </div>

      {/* Decorative blobs */}
      <div className="absolute top-1/4 right-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-amber-500/30 rounded-full px-4 py-1.5 mb-6 animate-fade-in-up">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-amber-300 text-xs font-semibold tracking-wider">
              TRUSTED ACROSS INDIA SINCE INCEPTION
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 animate-fade-in-up delay-100">
            Your Trusted Partner for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">
              Security, Manpower
            </span>{' '}
            & Business Solutions
          </h1>

          <p className="text-lg text-gray-200 mb-8 leading-relaxed max-w-2xl animate-fade-in-up delay-200">
            Hand to Hand Services Pvt. Ltd. delivers premium security, skilled manpower,
            housekeeping, event management, and complete business support services with
            professionalism, integrity, and reliability.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in-up delay-300">
            <a href="#contact" className="btn-gold">
              Contact Us <ArrowRight size={16} />
            </a>
            <a href="#services" className="btn-navy-outline">
              Our Services
            </a>
          </div>

          {/* Quick feature pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl animate-fade-in-up delay-400">
            {[
              { icon: Shield, label: 'Trained Security' },
              { icon: Users2, label: 'Skilled Manpower' },
              { icon: Briefcase, label: 'Business Solutions' },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3"
              >
                <item.icon className="text-amber-400" size={20} />
                <span className="text-white text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 100L60 90C120 80 240 60 360 55C480 50 600 60 720 65C840 70 960 70 1080 65C1200 60 1320 50 1380 45L1440 40V100H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}

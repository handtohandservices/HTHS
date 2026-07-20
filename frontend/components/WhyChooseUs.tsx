'use client';

import {
  Users2,
  ShieldCheck,
  Award,
  Smile,
  Wallet,
  Layers,
} from 'lucide-react';

const features = [
  {
    icon: Users2,
    title: 'Professional Team',
    desc: 'A dedicated team of trained, vetted, and experienced professionals.',
  },
  {
    icon: ShieldCheck,
    title: 'Reliable Services',
    desc: 'Consistent, dependable service delivery you can count on, every time.',
  },
  {
    icon: Award,
    title: 'Experienced Staff',
    desc: 'Skilled personnel with years of industry expertise and on-ground knowledge.',
  },
  {
    icon: Smile,
    title: 'Customer Satisfaction',
    desc: 'We prioritize your needs and exceed expectations on every assignment.',
  },
  {
    icon: Wallet,
    title: 'Affordable Pricing',
    desc: 'Competitive and transparent pricing with no hidden costs.',
  },
  {
    icon: Layers,
    title: 'End-to-End Solutions',
    desc: 'A complete suite of business services from a single trusted partner.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-10 lg:py-12 bg-white relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #0d1b3e 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-1">
            <span className="section-label">
              <span className="w-8 h-px bg-amber-500"></span> Why Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0d1b3e] mb-3 leading-tight">
              The Hand to Hand Advantage
            </h2>
            <p className="text-gray-600 mb-5 text-sm">
              We combine experience, integrity, and a client-first approach to deliver services
              that drive real value for your organization.
            </p>
            <a href="#contact" className="btn-navy">
              Partner With Us
            </a>
          </div>

          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="flex gap-4 p-4 rounded-xl border border-gray-100 hover:border-amber-200 hover:shadow-lg transition-all duration-300 group"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-amber-50 group-hover:bg-amber-500 flex items-center justify-center transition-colors duration-300">
                  <f.icon className="text-amber-600 group-hover:text-white transition-colors" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-[#0d1b3e] mb-1 group-hover:text-amber-600 transition-colors text-base">
                    {f.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA banner */}
          <div className="lg:col-span-3 mt-2">
            <div className="gradient-navy rounded-2xl p-6 lg:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>
              <div className="relative text-center lg:text-left">
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-1">
                  Ready to elevate your business operations?
                </h3>
                <p className="text-gray-300 text-sm">Get a free consultation with our experts today.</p>
              </div>
              <a href="#contact" className="btn-gold relative whitespace-nowrap">
                Get Free Consultation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { ShieldCheck, Award, CheckCircle2, Star } from 'lucide-react';

const trustPoints = [
  {
    icon: ShieldCheck,
    title: 'Quality Assured',
    desc: 'Every service delivery follows ISO 9001:2015 quality management standards.',
  },
  {
    icon: CheckCircle2,
    title: 'Process Driven',
    desc: 'Documented processes and audits ensure consistency across all operations.',
  },
  {
    icon: Award,
    title: 'Internationally Recognized',
    desc: 'Our certification is globally accepted, reflecting our commitment to excellence.',
  },
  {
    icon: Star,
    title: 'Continuous Improvement',
    desc: 'We regularly review and enhance our systems to raise service standards.',
  },
];

export default function Certifications() {
  return (
    <section className="py-10 lg:py-12 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #c9a227 1px, transparent 0)`,
          backgroundSize: '28px 28px',
        }}
      ></div>

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="section-label justify-center">
            <span className="w-8 h-px bg-amber-500"></span> Certifications & Standards
            <span className="w-8 h-px bg-amber-500"></span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0d1b3e] mb-4">
            ISO 9001:2015 Certified Company
          </h2>
          <p className="text-gray-600 leading-relaxed text-sm">
            Hand to Hand Services Pvt. Ltd. is proud to be an ISO 9001:2015 Certified Company —
            a mark of our unwavering commitment to quality, consistency, and international
            standards in every service we deliver.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left — Badge showcase */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full bg-amber-400/20 blur-3xl scale-110"></div>

              {/* Outer decorative ring */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full border-4 border-dashed border-amber-300/50 flex items-center justify-center animate-[spin_30s_linear_infinite]">
                {/* Static inner wrapper (counter-rotates) */}
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-[#fdf8f0] to-white shadow-2xl flex items-center justify-center animate-[spin_30s_linear_infinite_reverse]">
                  <div className="relative group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/ISO.jpeg"
                      alt="ISO 9001:2015 Certified Company"
                      className="w-48 h-48 sm:w-56 sm:h-56 object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>

              {/* Floating badge — Certified */}
              <div className="absolute -top-3 -right-3 bg-[#0d1b3e] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-amber-400/30">
                ISO Certified
              </div>

              {/* Floating badge — Year */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap">
                9001 : 2015 Standard
              </div>
            </div>
          </div>

          {/* Right — Trust points */}
          <div>
            <div className="grid gap-3">
              {trustPoints.map((point, i) => (
                <div
                  key={point.title}
                  className="flex gap-4 p-4 rounded-xl border border-gray-100 hover:border-amber-200 hover:shadow-lg transition-all duration-300 group"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-amber-50 group-hover:bg-amber-500 flex items-center justify-center transition-colors duration-300 shadow-sm">
                    <point.icon
                      className="text-amber-600 group-hover:text-white transition-colors"
                      size={22}
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0d1b3e] mb-1 group-hover:text-amber-600 transition-colors">
                      {point.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{point.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom trust strip */}
            <div className="mt-4 flex items-center gap-4 bg-gradient-to-r from-[#0d1b3e] to-[#1a2f5e] rounded-xl px-6 py-3 shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/ISO.jpeg"
                alt="ISO Badge"
                className="w-12 h-12 object-contain flex-shrink-0"
              />
              <div>
                <p className="text-white font-bold text-sm">Quality You Can Trust</p>
                <p className="text-gray-300 text-xs mt-0.5">
                  Our ISO 9001:2015 certification is a testament to our dedication to delivering
                  services that meet the highest international quality benchmarks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
    </section>
  );
}

'use client';

import Link from 'next/link';
import { ShieldCheck, Award, ArrowRight, CheckCircle2, Building2 } from 'lucide-react';

export default function AboutShort() {
  return (
    <section id="about-summary" className="py-16 lg:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Image & Trust Badges */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Hand to Hand Services Team"
                className="w-full h-[360px] sm:h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b3e]/70 via-transparent to-transparent"></div>
            </div>

            {/* ISO Badge top-right */}
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-amber-200/50 flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/ISO.jpeg" alt="ISO 9001:2015 Certified" className="w-12 h-12 object-contain" />
              <div>
                <div className="text-xs font-bold text-[#0d1b3e]">ISO 9001:2015</div>
                <div className="text-[10px] font-semibold text-amber-600">Certified Company</div>
              </div>
            </div>

            {/* Bottom floating stat card */}
            <div className="absolute -bottom-6 left-6 sm:left-10 bg-[#0d1b3e] text-white rounded-2xl p-5 shadow-2xl border border-amber-500/30 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center text-white shrink-0">
                <Building2 size={24} />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-amber-400">100+</div>
                <div className="text-xs text-gray-300">Corporate & Institutional Clients</div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-amber-600 uppercase mb-3">
              <span className="w-8 h-0.5 bg-amber-500"></span> About Our Organization
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0d1b3e] mb-5 leading-tight">
              Service With Integrity, Built On Unwavering Trust
            </h2>

            <p className="text-gray-600 text-base leading-relaxed mb-6">
              Hand to Hand Services Pvt. Ltd. is a premier Indian security, facility management, and manpower enterprise headquartered in South Delhi. We deliver rigorous, fully compliant, and customized workforce solutions to safeguard and empower businesses across India.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {[
                'PSARA License Compliant',
                'ISO 9001:2015 Certified Quality',
                '100% Police Verified Force',
                '24/7 Control & Field Supervision',
                'EPF, ESIC & Statutory Compliant',
                'Customized Security Audits',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <CheckCircle2 size={18} className="text-amber-500 shrink-0" />
                  <span className="text-sm font-semibold text-gray-800">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link href="/about" className="btn-navy">
                Learn More About Us <ArrowRight size={16} />
              </Link>
              <Link href="/services" className="text-amber-700 font-bold text-sm hover:underline inline-flex items-center gap-1">
                View All Services &rarr;
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

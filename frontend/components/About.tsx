'use client';

import { Target, Eye, Award } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    desc: 'To deliver exceptional security and business services that empower organizations to thrive safely.',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    desc: "To be India's most trusted service partner, recognized for quality, integrity, and reliability.",
  },
  {
    icon: Award,
    title: 'Our Promise',
    desc: 'Uncompromised professionalism and dedicated service on every assignment, every time.',
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Beige skewed background like screenshot */}
      <div className="absolute top-0 right-0 w-[55%] lg:w-[45%] h-full bg-[#fdf6ea] -skew-x-12 origin-top-right translate-x-20 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image side */}
          <div className="relative">
            <div className="relative rounded-[24px] overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Professional team"
                className="w-full h-[400px] lg:h-[420px] object-cover"
              />
            </div>
            {/* ISO badge — top right of image */}
            <div className="absolute top-4 right-4 w-16 h-16 bg-white rounded-xl shadow-xl p-1.5 flex items-center justify-center border border-amber-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/ISO.jpeg" alt="ISO 9001:2015 Certified" className="w-full h-full object-contain" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-2 sm:right-0 lg:-right-6 bg-[#0d1b3e] text-white rounded-2xl p-5 sm:p-6 shadow-xl max-w-[200px]">
              <div className="text-3xl font-extrabold text-amber-400 leading-none">10+</div>
              <div className="text-[13px] leading-snug text-gray-300 mt-2">
                Service categories delivered with excellence
              </div>
            </div>
          </div>

          {/* Text side */}
          <div>
            <span className="inline-flex items-center gap-3 text-[11px] font-bold tracking-[0.18em] text-amber-600 uppercase mb-4">
              <span className="w-8 h-px bg-amber-500"></span> About Us
            </span>

            <h2 className="text-3xl sm:text-[36px] font-extrabold text-[#0d1b3e] mb-6 leading-[1.15]">
              Service With Integrity, Built On Trust
            </h2>

            <p className="text-[14px] text-slate-600 mb-6 leading-relaxed">
              Hand to Hand Services Pvt. Ltd. is a diversified business services company based in
              South Delhi, offering a comprehensive suite of security, manpower, and business
              support solutions. Our commitment to quality, professionalism, and reliable service
              has made us a trusted partner for organizations across industries.
            </p>

            <p className="text-[14px] text-slate-600 mb-8 leading-relaxed">
              From trained security personnel and expert housekeeping teams to event management,
              training programs, and tender supplies — we deliver end-to-end solutions tailored to
              your needs, backed by an experienced leadership team.
            </p>

            <div className="space-y-5">
              {values.map((v) => (
                <div key={v.title} className="flex gap-4 group">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center group-hover:bg-amber-500 transition-colors duration-300">
                    <v.icon
                      className="text-amber-600 group-hover:text-white transition-colors"
                      size={20}
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-[14px] text-[#0d1b3e] mb-1">{v.title}</h3>
                    <p className="text-[13px] text-slate-600 leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import Directors from '@/components/Directors';
import Certifications from '@/components/Certifications';
import Link from 'next/link';
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  Users2,
  Building2,
  FileCheck,
  Scale,
  GraduationCap,
  Eye,
  Target,
  ArrowRight,
  UserCheck,
  Search,
  Radio,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Hand to Hand Services Pvt. Ltd.',
  description:
    'Learn about Hand to Hand Services Pvt. Ltd. — India’s trusted provider of PSARA-compliant private security, skilled manpower, housekeeping, and facility management.',
};

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="pt-24 bg-slate-50">
        {/* Page Banner Header */}
        <section className="relative py-20 bg-[#070f26] text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Security and manpower team"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#070f26] via-[#070f26]/90 to-transparent"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 text-xs font-bold px-3.5 py-1.5 rounded-full mb-4 border border-amber-500/30">
                <ShieldCheck size={14} className="text-amber-400" /> CORPORATE PROFILE & GOVERNANCE
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
                Pioneering Security, Skilled Manpower & Operational Excellence
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed">
                Hand to Hand Services Pvt. Ltd. is a premier Indian security, facility management, and workforce solution provider headquartered in South Delhi, serving corporate, commercial, industrial, and government organizations.
              </p>
            </div>
          </div>
        </section>

        {/* Corporate Overview & Heritage */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <span className="text-amber-600 font-bold text-xs tracking-widest uppercase mb-2 block">
                  Who We Are
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0d1b3e] mb-6 leading-tight">
                  Delivering Uncompromising Security & Comprehensive Manpower Solutions
                </h2>
                <p className="text-gray-600 text-base leading-relaxed mb-4">
                  Hand to Hand Services Pvt. Ltd. was built on the core foundation of discipline, integrity, and proactive execution. Designed to bridge the gap between demanding corporate requirements and reliable ground manpower, our organization offers end-to-end security guarding, corporate staffing, housekeeping, event security, and specialized skill development.
                </p>
                <p className="text-gray-600 text-base leading-relaxed mb-6">
                  Like India’s finest security firms, we strictly adhere to statutory governance, PSARA guidelines, and quality standards. Our personnel undergo intense physical, tactical, and behavioral training before deployment, ensuring your assets, premises, and personnel remain protected 24 hours a day, 365 days a year.
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/60">
                    <h3 className="font-bold text-[#0d1b3e] text-base mb-1">100% Statutory Compliant</h3>
                    <p className="text-xs text-gray-600">Strict compliance with PF, ESIC, GST, Minimum Wages & Labour laws.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-100 border border-slate-200">
                    <h3 className="font-bold text-[#0d1b3e] text-base mb-1">24/7 Field Supervision</h3>
                    <p className="text-xs text-gray-600">Mobile night squads & swift response team stationed for emergency deployment.</p>
                  </div>
                </div>
              </div>

              {/* Right Image Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden shadow-lg h-56 border border-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/Private_Security.jpeg"
                      alt="Security personnel"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="bg-[#0d1b3e] text-white p-6 rounded-2xl shadow-xl">
                    <div className="text-3xl font-extrabold text-amber-400 mb-1">ISO 9001:2015</div>
                    <div className="text-xs text-gray-300">Certified Quality Management System</div>
                  </div>
                </div>
                <div className="space-y-4 pt-6">
                  <div className="bg-amber-500 text-white p-6 rounded-2xl shadow-xl">
                    <div className="text-3xl font-extrabold mb-1">PSARA</div>
                    <div className="text-xs text-amber-100">Licensed & Regulated Security Provider</div>
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-lg h-56 border border-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/Housekeeping.jpeg"
                      alt="Housekeeping team"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission, Vision & Core Pillars */}
        <section className="py-16 bg-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-amber-600 font-bold text-xs tracking-widest uppercase mb-2 block">
                Our Foundation
              </span>
              <h2 className="text-3xl font-extrabold text-[#0d1b3e]">
                Mission, Vision & Core Values
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200/80 hover:shadow-xl transition">
                <div className="w-14 h-14 bg-amber-500/10 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
                  <Target size={28} />
                </div>
                <h3 className="text-xl font-bold text-[#0d1b3e] mb-3">Our Mission</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  To safeguard lives, protect physical & intellectual assets, and provide highly disciplined workforce solutions through continuous innovation, rigorous vetting, and unyielding commitment to service excellence.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200/80 hover:shadow-xl transition">
                <div className="w-14 h-14 bg-amber-500/10 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
                  <Eye size={28} />
                </div>
                <h3 className="text-xl font-bold text-[#0d1b3e] mb-3">Our Vision</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  To be recognized as India’s most benchmarked security and integrated facility management corporation, renowned for reliability, operational integrity, and employee welfare.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200/80 hover:shadow-xl transition">
                <div className="w-14 h-14 bg-amber-500/10 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
                  <Award size={28} />
                </div>
                <h3 className="text-xl font-bold text-[#0d1b3e] mb-3">Our Core Values</h3>
                <ul className="text-gray-600 text-sm space-y-2">
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-500" /> Integrity & Truthfulness</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-500" /> Alertness & Vigilance</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-500" /> Client-Centric Responsiveness</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-500" /> Complete Regulatory Compliance</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Regulatory & Compliance Framework */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-amber-600 font-bold text-xs tracking-widest uppercase mb-2 block">
                Statutory Compliance
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0d1b3e] mb-4">
                Strict Statutory & Legal Framework
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                We believe that zero-tolerance compliance protects both our clients and our personnel. We maintain full legal transparency across all government bodies.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: FileCheck,
                  title: 'PSARA License',
                  desc: 'Fully licensed under the Private Security Agencies Regulation Act for legal security deployment.',
                },
                {
                  icon: Award,
                  title: 'ISO 9001:2015',
                  desc: 'Certified Quality Management System ensuring standardized standard operating procedures.',
                },
                {
                  icon: Scale,
                  title: 'Labor Compliance',
                  desc: 'Full compliance with EPF (Provident Fund), ESIC (Medical Benefits), & Minimum Wages Act.',
                },
                {
                  icon: UserCheck,
                  title: '100% Police Verified',
                  desc: 'Mandatory police background verification, fingerprinting, and criminal history checks.',
                },
              ].map((c) => (
                <div key={c.title} className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-amber-400 transition">
                  <c.icon className="text-amber-600 mb-4" size={32} />
                  <h3 className="font-bold text-[#0d1b3e] text-lg mb-2">{c.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vetting & Training Protocol */}
        <section className="py-16 bg-[#070f26] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-amber-400 font-bold text-xs tracking-widest uppercase mb-2 block">
                  Quality Assurance
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 leading-tight">
                  Our 4-Stage Recruitment & Guard Training Protocol
                </h2>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8">
                  Before any guard or staff member steps foot on your premises, they complete a rigorous multi-stage vetting and training program modeled after paramilitary discipline.
                </p>

                <div className="space-y-6">
                  {[
                    {
                      step: '01',
                      title: 'Background Vetting & Verification',
                      desc: 'Police clearance verification, address check, identity validation (Aadhaar/PAN), and prior employer reference checks.',
                    },
                    {
                      step: '02',
                      title: 'Physical & Medical Screening',
                      desc: 'Height, vision, physical endurance test, and complete health checkup to ensure high alertness.',
                    },
                    {
                      step: '03',
                      title: 'Tactical & SOP Training',
                      desc: 'Training in perimeter security, access control, fire-fighting, first aid, CCTV monitoring, and visitor logs.',
                    },
                    {
                      step: '04',
                      title: 'Behavioral & Soft Skills',
                      desc: 'Customer etiquette, conflict de-escalation, professional uniform decorum, and emergency reporting.',
                    },
                  ].map((s) => (
                    <div key={s.step} className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-xl bg-amber-500 text-[#070f26] font-extrabold flex items-center justify-center shrink-0 text-sm">
                        {s.step}
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base mb-1">{s.title}</h3>
                        <p className="text-gray-300 text-xs leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#0d1b3e] p-8 rounded-3xl border border-amber-500/20 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-4">24/7 Central Control & Supervision</h3>
                <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                  We don't just deploy security guards — we monitor them actively around the clock.
                </p>
                <div className="space-y-4">
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center gap-3">
                    <Radio className="text-amber-400" size={24} />
                    <div>
                      <div className="text-sm font-bold text-white">Central Control Room</div>
                      <div className="text-xs text-gray-400">Real-time attendance tracking & emergency alert response.</div>
                    </div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center gap-3">
                    <Search className="text-amber-400" size={24} />
                    <div>
                      <div className="text-sm font-bold text-white">Random Night Inspections</div>
                      <div className="text-xs text-gray-400">Surprise field officer visits to ensure zero sleeping on duty.</div>
                    </div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center gap-3">
                    <ShieldCheck className="text-amber-400" size={24} />
                    <div>
                      <div className="text-sm font-bold text-white">Immediate Replacement Guarantee</div>
                      <div className="text-xs text-gray-400">Instant guard replacement in case of leave or emergency.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Certifications strip */}
        <Certifications />

        {/* Leadership / Directors section */}
        <Directors />

        {/* CTA section */}
        <section className="py-16 bg-gradient-to-r from-amber-600 to-amber-500 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl font-extrabold mb-4">Ready to Partner With Us?</h2>
            <p className="text-amber-100 max-w-2xl mx-auto mb-8 text-sm sm:text-base">
              Contact our directors today for a complimentary security assessment and customized quotation tailored to your organization.
            </p>
            <Link href="/contact" className="btn-navy !bg-[#070f26] !text-white hover:!bg-[#0d1b3e] inline-flex">
              Contact Our Directors Now <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}

import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import Contact from '@/components/Contact';
import Directors from '@/components/Directors';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us | Hand to Hand Services Pvt. Ltd.',
  description:
    'Contact Hand to Hand Services Pvt. Ltd. for private security, housekeeping, and manpower quotes. Reach our directors directly or visit our office in South Delhi.',
};

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="pt-24 bg-slate-50">
        {/* Banner Header */}
        <section className="relative py-20 bg-[#070f26] text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Contact us header"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#070f26] via-[#070f26]/90 to-transparent"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 text-xs font-bold px-3.5 py-1.5 rounded-full mb-4 border border-amber-500/30">
                <ShieldCheck size={14} className="text-amber-400" /> 24/7 HELPLINE & HEAD OFFICE
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
                Get In Touch With Our Leadership Team
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed">
                Whether you need immediate security guarding, site security audits, or manpower deployment across India, our directors and service desk are here to assist.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Contact Bar for Directors */}
        <section className="py-8 bg-amber-500 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-[#070f26] rounded-xl text-white shadow-md border border-amber-400/20">
                <div className="text-xs font-extrabold uppercase text-amber-400 tracking-wider">Director</div>
                <div className="text-base font-extrabold text-white my-0.5">Kaleem Ullah Rizvi</div>
                <a href="tel:9752128838" className="text-sm font-bold text-white underline hover:text-amber-300 transition">
                  Mobile: 9752128838
                </a>
              </div>

              <div className="p-4 bg-[#070f26] rounded-xl text-white shadow-md border border-amber-400/20">
                <div className="text-xs font-extrabold uppercase text-amber-400 tracking-wider">Director</div>
                <div className="text-base font-extrabold text-white my-0.5">Shabana Kaleem Rizvi</div>
                <a href="tel:8109929029" className="text-sm font-bold text-white underline hover:text-amber-300 transition">
                  Mobile: 8109929029
                </a>
              </div>

              <div className="p-4 bg-[#070f26] rounded-xl text-white shadow-md border border-amber-400/20">
                <div className="text-xs font-extrabold uppercase text-amber-400 tracking-wider">Director</div>
                <div className="text-base font-extrabold text-white my-0.5">Ahad Ullah</div>
                <a href="tel:7971293277" className="text-sm font-bold text-white underline hover:text-amber-300 transition">
                  Mobile: 7971293277
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Main Contact Section with Form, Map & Details */}
        <Contact />

        {/* Directors Section */}
        <Directors />

        {/* Frequently Asked Questions */}
        <section className="py-16 bg-white border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <span className="text-amber-600 font-bold text-xs tracking-widest uppercase mb-2 block">
                Common Questions
              </span>
              <h2 className="text-3xl font-extrabold text-[#0d1b3e]">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-6">
              {[
                {
                  q: 'How fast can Hand to Hand Services deploy security personnel to a new site?',
                  a: 'We maintain a standby reserve force. For standard commercial or residential security guarding in Delhi NCR, deployment can occur within 24 to 48 hours following site assessment.',
                },
                {
                  q: 'Are your security guards and staff police verified?',
                  a: 'Yes, 100% of our security guards, bouncers, and housekeeping staff undergo strict police background verification, Aadhaar verification, and physical fitness testing before deployment.',
                },
                {
                  q: 'Do you handle EPF, ESIC, and statutory payroll compliance for contract staff?',
                  a: 'Absolutely. We operate with full statutory compliance including EPF (Employee Provident Fund), ESIC (Employee State Insurance), GST, and Minimum Wages Act regulations.',
                },
                {
                  q: 'Can we request a free site security audit before signing a contract?',
                  a: 'Yes, our field operations team and directors conduct complimentary site security assessments to evaluate perimeter vulnerabilities and recommend optimized guarding setups.',
                },
              ].map((item) => (
                <div key={item.q} className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <h3 className="font-bold text-[#0d1b3e] text-base mb-2 flex items-start gap-2">
                    <HelpCircle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                    {item.q}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed pl-6">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}

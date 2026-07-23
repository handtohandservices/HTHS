import {
  Users2,
  ShieldCheck,
  Award,
  Smile,
  Wallet,
  Layers,
  Clock,
  HeadphonesIcon,
  CheckCircle2,
} from 'lucide-react';

const features = [
  {
    icon: Users2,
    title: 'Professional Team',
    desc: 'Our team comprises rigorously vetted, certified, and industry-trained professionals who bring deep domain expertise to every project—ensuring you always work with the best.',
    highlight: '100+ Trained Experts',
  },
  {
    icon: ShieldCheck,
    title: 'Reliable & Consistent',
    desc: 'We deliver with unwavering consistency. Our ISO-aligned processes, SLA-backed commitments, and quality checkpoints guarantee dependable outcomes on every assignment.',
    highlight: '99.2% On-Time Delivery',
  },
  {
    icon: Award,
    title: 'Deep Industry Expertise',
    desc: 'With over a decade of cross-sector experience, our specialists understand your unique challenges and deliver solutions that are battle-tested and proven in real-world scenarios.',
    highlight: '10+ Years Experience',
  },
  {
    icon: Smile,
    title: 'Customer-First Approach',
    desc: "Your satisfaction isn't just a metric—it's our mission. From personalized service plans to proactive communication, we go beyond expectations to build lasting partnerships.",
    highlight: '98% Client Retention',
  },
  {
    icon: Wallet,
    title: 'Transparent & Affordable',
    desc: 'No hidden fees, no surprise charges. Our competitive pricing model is fully transparent, giving you maximum value and complete budget clarity from day one.',
    highlight: 'Zero Hidden Costs',
  },
  {
    icon: Layers,
    title: 'End-to-End Solutions',
    desc: 'From planning to execution to ongoing support—we provide a comprehensive, single-source service ecosystem so you never have to juggle multiple vendors again.',
    highlight: '360° Service Coverage',
  },
  {
    icon: Clock,
    title: 'Rapid Turnaround',
    desc: 'Time is money. Our streamlined workflows and dedicated response teams ensure your projects are delivered faster—without ever compromising on quality or compliance.',
    highlight: '48hr Response SLA',
  },
  {
    icon: HeadphonesIcon,
    title: 'Dedicated Support',
    desc: 'A named account manager and 24/7 support channel means you always have a direct line to someone who knows your business, your preferences, and your priorities.',
    highlight: '24/7 Availability',
  },
];

const trustPoints = [
  'ISO-aligned quality management systems',
  'Regular third-party compliance audits',
  'Comprehensive insurance & liability coverage',
  'Data security & confidentiality protocols',
];

export default function WhyChooseUs() {
  return (
    <section className="py-12 lg:py-20 bg-white relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #0d1b3e 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Decorative accent */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#0d1b3e]/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">

        {/* ── Header ── */}
        <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-14">
          <span className="inline-flex items-center gap-2 section-label mb-3">
            <span className="w-8 h-px bg-amber-500" />
            Why Choose Us
            <span className="w-8 h-px bg-amber-500" />
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0d1b3e] mb-4 leading-tight">
            The <span className="text-amber-500">Hand to Hand</span> Advantage
          </h2>

        </div>

        {/* ── Features Grid ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mb-10 lg:mb-14">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="relative bg-white rounded-2xl border border-gray-100 p-5 hover:border-amber-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {/* Hover glow */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

              <div className="relative flex flex-col h-full">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-amber-50 group-hover:bg-amber-500 flex items-center justify-center transition-colors duration-300 mb-3">
                  <f.icon className="text-amber-600 group-hover:text-white transition-colors duration-300" size={22} />
                </div>
                <h3 className="font-bold text-[#0d1b3e] mb-1.5 group-hover:text-amber-600 transition-colors text-[15px]">
                  {f.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-3 flex-grow">{f.desc}</p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                  <CheckCircle2 size={12} />
                  {f.highlight}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Trust & Compliance Bar ── */}
        <div className="bg-gray-50 rounded-2xl p-6 lg:p-8 mb-10 lg:mb-14">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-2xl bg-[#0d1b3e] shadow-lg">
              <ShieldCheck className="text-amber-400" size={28} />
            </div>
            <div className="text-center lg:text-left flex-grow">
              <h3 className="text-xl font-bold text-[#0d1b3e] mb-1">Trust & Compliance Built In</h3>
              <p className="text-gray-600 text-sm mb-4">
                Every engagement is backed by rigorous standards, continuous auditing, and a zero-tolerance policy for shortcuts.
              </p>
              <div className="grid sm:grid-cols-2 gap-2">
                {trustPoints.map((point) => (
                  <div key={point} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="text-amber-500 flex-shrink-0" size={16} />
                    <span className="font-medium">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── CTA Banner ── */}
        <div className="gradient-navy rounded-2xl p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute -right-24 -top-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-white/5 rounded-full blur-2xl" />

          <div className="relative text-center lg:text-left max-w-xl">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
              Ready to Transform Your Business Operations?
            </h3>
            <p className="text-gray-300 text-base lg:text-lg leading-relaxed">
              Join 500+ organizations that trust Hand to Hand for reliable, end-to-end business solutions.
              Get a complimentary strategy session with our senior consultants.
            </p>
          </div>
          <div className="relative flex flex-col sm:flex-row gap-3">
            <a href="#contact" className="btn-gold whitespace-nowrap text-center">
              Connect With Us


            </a>
            <a href="#services" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-colors text-sm whitespace-nowrap">
              Explore Services →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

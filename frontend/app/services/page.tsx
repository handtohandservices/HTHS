import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import Link from 'next/link';
import {
  ShieldCheck,
  Sparkles,
  Camera,
  GraduationCap,
  HeartHandshake,
  BriefcaseBusiness,
  Drama,
  Plane,
  PackageCheck,
  Truck,
  CheckCircle2,
  ArrowRight,
  PhoneCall,
  Building,
  Factory,
  Home,
  School,
  Hospital,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Services | Hand to Hand Services Pvt. Ltd.',
  description:
    'Explore comprehensive security, housekeeping, manpower supply, event management, and business consultancy services offered by Hand to Hand Services Pvt. Ltd.',
};

const detailedServices = [
  {
    id: 'security',
    icon: ShieldCheck,
    title: 'Private Security & Guarding Services',
    subtitle: 'PSARA Compliant Guarding for Commercial, Industrial & Residential Premises',
    img: '/Private_Security.jpeg',
    desc: 'We provide physically fit, well-disciplined, and police-verified male & female security personnel. Trained in access control, visitor management, perimeter patrolling, and emergency crisis management.',
    features: [
      'Armed & Unarmed Security Guards',
      'Personal Security Officers (PSO / Bouncers)',
      'Lady Guarding & Event Security',
      'Industrial & Warehouse Perimeter Security',
      'CCTV Monitoring & Control Room Operations',
      'Daily Gate Pass & Visitor Register Maintenance',
    ],
    sectors: ['Corporate Towers', 'Industrial Plants', 'Residential Societies', 'Banks & Malls'],
  },
  {
    id: 'housekeeping',
    icon: Sparkles,
    title: 'Housekeeping, Cleaning & Hospitality',
    subtitle: 'Professional Deep Cleaning & Daily Facility Maintenance',
    img: '/Housekeeping.jpeg',
    desc: 'Complete corporate housekeeping and janitorial solutions. We supply trained housekeepers, Pantry Boys, floor scrubbing machine operators, and facility supervisors equipped with eco-friendly cleaning agents.',
    features: [
      'Daily Office Cleaning & Sanitization',
      'Deep Cleaning & Carpet/Sofa Shampooing',
      'Pantry Staff & Hospitality Attendants',
      'Post-Construction Clean-Up Services',
      'Waste Management & Washroom Hygiene',
      'Industrial Floor Scrubbing & Polishing',
    ],
    sectors: ['IT Parks', 'Hotels & Restaurants', 'Hospitals & Clinics', 'Educational Institutes'],
  },
  {
    id: 'manpower',
    icon: BriefcaseBusiness,
    title: 'Skilled & Unskilled Manpower Supply',
    subtitle: 'Vetted Contractual Staffing for All Industry Sectors',
    img: 'https://images.pexels.com/photos/3184464/pexels-photo-3184464.jpeg?auto=compress&cs=tinysrgb&w=800',
    desc: 'End-to-end manpower solutions tailored to your operational needs. We handle recruitment, background verification, attendance tracking, EPF/ESIC compliance, and monthly payroll administration.',
    features: [
      'Office Assistants & Clerical Staff',
      'Data Entry & Computer Operators',
      'Electricians, Plumbers & Technicians',
      'Warehouse Loaders & Packing Staff',
      'Drivers & Dispatch Personnel',
      'Flexi-Staffing for Peak Demand Cycles',
    ],
    sectors: ['Logistics Hubs', 'E-Commerce Warehouses', 'Corporate Offices', 'Government Offices'],
  },
  {
    id: 'events',
    icon: Camera,
    title: 'Event Security & Management',
    subtitle: 'Flawless Crowd Control, VIP Security & Live Photography',
    img: '/Event_Organization.jpeg',
    desc: 'Comprehensive event management solutions covering venue security, VIP escort, crowd control, stage management, professional photography, and high-definition videography for corporate & social events.',
    features: [
      'VIP & Celebrity Escort Protection',
      'Bouncer Deployment & Metal Detectors',
      'Stage & Venue Security Management',
      'Professional Event Photography & 4K Video',
      'Sound, Lighting & Equipment Logistics',
      'Entry & Ticketing Gate Supervision',
    ],
    sectors: ['Concerts & Expos', 'Corporate Galas', 'Weddings & Celebrations', 'Sports Tournaments'],
  },
  {
    id: 'training',
    icon: GraduationCap,
    title: 'Skill Development, Health & AI Training',
    subtitle: 'Empowering Workforce with Modern Technical & Behavioral Skills',
    img: '/Health_Education.jpeg',
    desc: 'Structured training programs for security personnel, corporate staff, and job seekers. We offer workshops in first aid, fire safety, AI tools utilization, customer etiquette, and digital literacy.',
    features: [
      'PSARA Security Guard Basic Training',
      'Fire Fighting & Disaster Drill Workshops',
      'First Aid & Health Emergency Response',
      'Practical AI & Digital Literacy Workshops',
      'Customer Care & Behavioral Etiquette',
      'Certification & Skill Assessments',
    ],
    sectors: ['Security Agencies', 'Corporate Teams', 'Youth & Job Seekers', 'NGOs'],
  },
  {
    id: 'consultancy',
    icon: BriefcaseBusiness,
    title: 'Job Placement & Recruitment Consultancy',
    subtitle: 'Connecting Top Talent with Leading Employers Across India',
    img: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    desc: 'Professional job consultancy matching candidate skills with company requirements. We streamline candidate screening, interview scheduling, and placement for candidates across various levels.',
    features: [
      'Executive Talent Acquisition',
      'Resume Screening & Candidate Vetting',
      'Contract-to-Hire Staffing',
      'Bulk Recruitment Drives',
      'Career Counseling for Job Seekers',
      'Fast Turnaround Deployment',
    ],
    sectors: ['Corporate Companies', 'SMEs', 'Retail Chains', 'Healthcare & Facilities'],
  },
  {
    id: 'women-empowerment',
    icon: HeartHandshake,
    title: 'Women Empowerment & Social Initiatives',
    subtitle: 'Skill Training & Job Placement for Women',
    img: '/Women_Empowerment.jpeg',
    desc: 'Dedicated initiatives empowering women through vocational training, self-defense workshops, digital literacy, and placement into lady security guard and front-office roles.',
    features: [
      'Lady Guard Training & Certification',
      'Self-Defense & Safety Workshops',
      'Vocational Skill Building',
      'Direct Job Placement Support',
      'Community Outreach Programs',
      'Equal Opportunity Workforce Initiatives',
    ],
    sectors: ['Community Organizations', 'Educational Campuses', 'NGO Partners', 'Corporate CSR'],
  },
  {
    id: 'cultural',
    icon: Drama,
    title: 'Cultural Programs, Drama & Dance Events',
    subtitle: 'Promoting Heritage & Organization of High-Energy Stage Shows',
    img: '/Cultural_Programs.jpeg',
    desc: 'End-to-end planning and execution of cultural festivals, drama performances, dance competitions, and traditional stage presentations for corporate and public audiences.',
    features: [
      'Stage Production & Choreography',
      'Sound & Lighting Setup',
      'Artist Management & Booking',
      'Theme Conceptualization',
      'Public Relations & Promotion',
      'Flawless On-Ground Coordination',
    ],
    sectors: ['Cultural Associations', 'Schools & Colleges', 'Government Festivals', 'Corporate Anniversaries'],
  },
  {
    id: 'tenders',
    icon: PackageCheck,
    title: 'Government & Private Tender Supplies',
    subtitle: 'Procurement & Delivery of Safety, Stationery & Uniform Supplies',
    img: '/Government_Private.jpeg',
    desc: 'Trusted supply chain partner for government and private tender fulfillments. Supplying safety gear, corporate uniforms, sports equipment, office furniture, and specialized equipment.',
    features: [
      'Security Uniforms & Combat Boots',
      'Safety Gear (Helmets, Vests, Gloves)',
      'Bulk Office Stationery & Materials',
      'Sports Goods & Educational Supplies',
      'Quality Certified Materials',
      'Timely Delivery & Logistics Compliance',
    ],
    sectors: ['Government Bodies', 'PSUs', 'Educational Institutions', 'Corporate Firms'],
  },
  {
    id: 'cargo',
    icon: Truck,
    title: 'Courier, Cargo & Supply Chain Logistics',
    subtitle: 'Swift, Secure Domestic & International Express Deliveries',
    img: '/Courier_Cargo.jpeg',
    desc: 'Reliable parcel delivery, cargo logistics, and document express services ensuring safe and punctual transport for corporate documents, heavy equipment, and bulk packages.',
    features: [
      'Domestic Express Document Delivery',
      'Bulk Freight & Cargo Transport',
      'Real-Time Parcel Tracking',
      'Secure Handling of Confidential Files',
      'Customized Logistics Packages',
      'Dedicated Courier Personnel Deployment',
    ],
    sectors: ['Legal & Financial Firms', 'E-Commerce Brands', 'Corporate Offices', 'Retail'],
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />

      <main className="pt-24 bg-slate-50">
        {/* Banner */}
        <section className="relative py-20 bg-[#070f26] text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero.png"
              alt="Services header"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#070f26] via-[#070f26]/90 to-transparent"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 text-xs font-bold px-3.5 py-1.5 rounded-full mb-4 border border-amber-500/30">
                <ShieldCheck size={14} className="text-amber-400" /> COMPREHENSIVE SERVICE PORTFOLIO
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
                Integrated Security, Manpower & Business Solutions
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed">
                From PSARA-regulated security guarding to complete facility management, skill development, and logistics — discover how Hand to Hand Services Pvt. Ltd. drives operational excellence.
              </p>
            </div>
          </div>
        </section>

        {/* Industry Sector Strip */}
        <section className="py-8 bg-amber-500 text-[#070f26]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-wrap items-center justify-between gap-6 text-sm font-bold">
              <span className="text-xs uppercase tracking-wider font-black">Trusted Across Sectors:</span>
              <div className="flex items-center gap-2"><Building size={18} /> Corporate Towers</div>
              <div className="flex items-center gap-2"><Factory size={18} /> Industrial & Warehousing</div>
              <div className="flex items-center gap-2"><Home size={18} /> Gated Societies</div>
              <div className="flex items-center gap-2"><School size={18} /> Educational Campuses</div>
              <div className="flex items-center gap-2"><Hospital size={18} /> Hospitals & Malls</div>
            </div>
          </div>
        </section>

        {/* Detailed Services Listing */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
            {detailedServices.map((s, idx) => (
              <div
                key={s.id}
                id={s.id}
                className={`bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-gray-200/80 scroll-mt-28 grid lg:grid-cols-12 gap-8 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
              >
                {/* Image side */}
                <div className={`lg:col-span-5 relative ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] border border-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={s.img}
                      alt={s.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070f26]/60 to-transparent"></div>
                  </div>
                  <div className="absolute top-4 left-4 bg-amber-500 text-[#070f26] p-3 rounded-xl shadow-lg">
                    <s.icon size={24} />
                  </div>
                </div>

                {/* Content side */}
                <div className={`lg:col-span-7 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="inline-block text-amber-600 text-xs font-bold uppercase tracking-wider mb-2">
                    Service Sector #{idx + 1}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d1b3e] mb-2 leading-tight">
                    {s.title}
                  </h2>
                  <p className="text-amber-600 text-sm font-semibold mb-4">{s.subtitle}</p>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                    {s.desc}
                  </p>

                  {/* Feature checklist */}
                  <div className="grid sm:grid-cols-2 gap-2.5 mb-6">
                    {s.features.map((f) => (
                      <div key={f} className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-amber-500 shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-gray-700 font-medium">{f}</span>
                      </div>
                    ))}
                  </div>

                  {/* Sectors badges & CTA */}
                  <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                      {s.sectors.map((sec) => (
                        <span key={sec} className="bg-slate-100 text-slate-700 text-[11px] font-semibold px-2.5 py-1 rounded-md">
                          {sec}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/apply?type=employer&service=${encodeURIComponent(s.title)}`}
                      className="btn-gold text-xs py-2.5 px-5"
                    >
                      Request Quotation <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Strip */}
        <section className="py-16 bg-[#070f26] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center max-w-3xl">
            <h2 className="text-3xl font-extrabold text-white mb-4">Need Custom Deployment or Bulk Staffing?</h2>
            <p className="text-gray-300 text-sm sm:text-base mb-8 leading-relaxed">
              Our service coordinators and directors are available for site inspections and fast quote turnarounds across Delhi NCR and major Indian cities.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-gold justify-center">
                Go to Contact Us Page <PhoneCall size={16} />
              </Link>
              <a href="tel:9752128838" className="btn-navy-outline justify-center !border-white/30 !text-white">
                Call Director: 9752128838
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}

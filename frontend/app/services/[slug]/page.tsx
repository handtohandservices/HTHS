import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import Link from 'next/link';
import { notFound } from 'next/navigation';
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
  ArrowLeft,
  Building,
  CheckCircle,
  LucideIcon,
} from 'lucide-react';
import ServiceCollage from '@/components/ServiceCollage';

interface ServiceItem {
  id: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  desc: string;
  features: string[];
  sectors: string[];
  images: {
    src: string;
    alt: string;
    caption: string;
  }[];
}

interface DualServicePageData {
  slug: string;
  pageTitle: string;
  metaTitle: string;
  metaDesc: string;
  heroSub: string;
  service1: ServiceItem;
  service2: ServiceItem;
}

const dualServicesMap: Record<string, DualServicePageData> = {
  'security-housekeeping': {
    slug: 'security-housekeeping',
    pageTitle: 'Private Security & Housekeeping Services',
    metaTitle: 'Private Security & Housekeeping Services | Hand to Hand Services',
    metaDesc: 'PSARA compliant guarding services and professional corporate housekeeping, deep cleaning & facility maintenance by Hand to Hand Private Limited.',
    heroSub: 'Combining PSARA-regulated security protection with ISO-standard housekeeping & janitorial operations for total peace of mind.',
    service1: {
      id: 'security',
      icon: ShieldCheck,
      title: 'Private Security & Guarding Services',
      subtitle: 'PSARA Compliant Guarding for Commercial, Industrial & Residential Premises',
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
      images: [
        {
          src: '/Private_Security.jpeg',
          alt: 'Private Security Personnel On Duty',
          caption: 'Trained & Vetted Security Officers',
        },
        {
          src: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
          alt: 'CCTV Control Room Monitoring',
          caption: '24/7 Surveillance & Control Room',
        },
        {
          src: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=800&q=80',
          alt: 'Corporate Office Access Control',
          caption: 'Visitor & Gate Access Management',
        },
        {
          src: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=800&q=80',
          alt: 'Industrial Site Perimeter Guarding',
          caption: 'Industrial & Factory Protection',
        },
      ],
    },
    service2: {
      id: 'housekeeping',
      icon: Sparkles,
      title: 'Housekeeping, Cleaning & Hospitality',
      subtitle: 'Professional Deep Cleaning & Daily Facility Maintenance',
      desc: 'Complete corporate housekeeping and janitorial solutions. We supply trained housekeepers, Pantry Staff, floor scrubbing machine operators, and facility supervisors equipped with eco-friendly cleaning agents.',
      features: [
        'Daily Office Cleaning & Sanitization',
        'Deep Cleaning & Carpet/Sofa Shampooing',
        'Pantry Staff & Hospitality Attendants',
        'Post-Construction Clean-Up Services',
        'Waste Management & Washroom Hygiene',
        'Industrial Floor Scrubbing & Polishing',
      ],
      sectors: ['IT Parks', 'Hotels & Restaurants', 'Hospitals & Clinics', 'Educational Institutes'],
      images: [
        {
          src: '/Housekeeping.jpeg',
          alt: 'Professional Housekeeping Staff',
          caption: 'Certified Cleaning & Janitorial Crew',
        },
        {
          src: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
          alt: 'Corporate Office Sanitization',
          caption: 'Daily Sanitization & Office Care',
        },
        {
          src: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=800&q=80',
          alt: 'Floor Scrubbing & Polishing',
          caption: 'Industrial Floor Machine Cleaning',
        },
        {
          src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
          alt: 'Washroom & Facility Hygiene Maintenance',
          caption: 'Hospitality & Pantry Operations',
        },
      ],
    },
  },
  'events-cultural': {
    slug: 'events-cultural',
    pageTitle: 'Event Security & Cultural Programs',
    metaTitle: 'Event Security & Cultural Event Management | Hand to Hand Services',
    metaDesc: 'VIP bouncer protection, crowd control, stage management, 4K event photography, and cultural drama & dance event organization.',
    heroSub: 'From VIP celebrity security and bouncers to complete stage choreography, drama performances, and cultural festival coordination.',
    service1: {
      id: 'events',
      icon: Camera,
      title: 'Event Security & Management',
      subtitle: 'Flawless Crowd Control, VIP Security & Live Photography',
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
      images: [
        {
          src: '/Event_Organization.jpeg',
          alt: 'Event Security & Bouncers',
          caption: 'VIP Escort & Bouncer Squad',
        },
        {
          src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
          alt: 'Live Event Crowd Control',
          caption: 'Concert & Expo Crowd Management',
        },
        {
          src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
          alt: 'Stage Security & Lighting',
          caption: 'Stage Setup & Gate Supervision',
        },
        {
          src: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
          alt: 'Live Event Videography',
          caption: '4K Event Coverage & Photography',
        },
      ],
    },
    service2: {
      id: 'cultural',
      icon: Drama,
      title: 'Cultural Programs, Drama & Dance Events',
      subtitle: 'Promoting Heritage & Organization of High-Energy Stage Shows',
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
      images: [
        {
          src: '/Cultural_Programs.jpeg',
          alt: 'Cultural Stage Performance',
          caption: 'Traditional Dance & Drama Shows',
        },
        {
          src: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
          alt: 'Stage Dance Production',
          caption: 'Choreography & Artist Booking',
        },
        {
          src: 'https://images.unsplash.com/photo-1469488865564-c2de10f69f96?auto=format&fit=crop&w=800&q=80',
          alt: 'Cultural Festival Celebration',
          caption: 'Public & Corporate Festivals',
        },
        {
          src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
          alt: 'Drama & Theater Lights',
          caption: 'Sound & High-Tech Stage Lighting',
        },
      ],
    },
  },
  'training-empowerment': {
    slug: 'training-empowerment',
    pageTitle: 'Skill Training & Women Empowerment',
    metaTitle: 'Skill Training & Women Empowerment Initiatives | Hand to Hand Services',
    metaDesc: 'PSARA guard training, first aid & AI workshops paired with dedicated women empowerment & lady security guard placement programs.',
    heroSub: 'Building capabilities through certified skill development workshops, digital literacy, and dedicated employment initiatives for women.',
    service1: {
      id: 'training',
      icon: GraduationCap,
      title: 'Skill Development, Health & AI Training',
      subtitle: 'Empowering Workforce with Modern Technical & Behavioral Skills',
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
      images: [
        {
          src: '/Health_Education.jpeg',
          alt: 'Skill Training Workshop Session',
          caption: 'Structured Classroom Training',
        },
        {
          src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
          alt: 'Interactive Skill Assessment',
          caption: 'Behavioral & Etiquette Sessions',
        },
        {
          src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
          alt: 'Digital & AI Literacy Workshop',
          caption: 'Practical AI & Computer Literacy',
        },
        {
          src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
          alt: 'First Aid & Health Response Training',
          caption: 'Fire Safety & First Aid Drills',
        },
      ],
    },
    service2: {
      id: 'women-empowerment',
      icon: HeartHandshake,
      title: 'Women Empowerment & Social Initiatives',
      subtitle: 'Skill Training & Job Placement for Women',
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
      images: [
        {
          src: '/Women_Empowerment.jpeg',
          alt: 'Women Empowerment & Training',
          caption: 'Vocational & Lady Guard Training',
        },
        {
          src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
          alt: 'Women Professional Leadership',
          caption: 'Corporate Front Office & Staffing',
        },
        {
          src: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80',
          alt: 'Women Vocational Skill Building',
          caption: 'Self-Defense & Safety Seminars',
        },
        {
          src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
          alt: 'Community Social Outreach',
          caption: 'Equal Opportunity Community Team',
        },
      ],
    },
  },
  'recruitment-manpower': {
    slug: 'recruitment-manpower',
    pageTitle: 'Job Placement & Manpower Supply',
    metaTitle: 'Job Placement & Manpower Supply | Hand to Hand Services',
    metaDesc: 'Executive recruitment consultancy and vetted contractual skilled & unskilled manpower supply for corporate, industrial, and logistics sectors.',
    heroSub: 'Connecting top talent with leading enterprises and providing background-verified contractual staffing across all industry domains.',
    service1: {
      id: 'consultancy',
      icon: BriefcaseBusiness,
      title: 'Job Placement & Recruitment Consultancy',
      subtitle: 'Connecting Top Talent with Leading Employers Across India',
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
      images: [
        {
          src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
          alt: 'Job Interview & Executive Recruitment',
          caption: 'Executive Candidate Screening',
        },
        {
          src: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80',
          alt: 'Corporate Handshake & Placement',
          caption: 'Successful Placement Agreements',
        },
        {
          src: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
          alt: 'Recruitment Consultation',
          caption: 'Contract-to-Hire & Bulk Hiring',
        },
        {
          src: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
          alt: 'Talent Acquisition Team',
          caption: 'Career Counseling & Vetting',
        },
      ],
    },
    service2: {
      id: 'manpower',
      icon: BriefcaseBusiness,
      title: 'Skilled & Unskilled Manpower Supply',
      subtitle: 'Vetted Contractual Staffing for All Industry Sectors',
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
      images: [
        {
          src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
          alt: 'Industrial Skilled Factory Workers',
          caption: 'Factory & Industrial Staffing',
        },
        {
          src: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
          alt: 'Technical & Electrical Staff',
          caption: 'Skilled Technicians & Electricians',
        },
        {
          src: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
          alt: 'Warehouse Loading Personnel',
          caption: 'Warehouse & E-Commerce Crew',
        },
        {
          src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
          alt: 'On-Site Operations Staff',
          caption: 'Compliant Flexi-Staffing Supply',
        },
      ],
    },
  },
  'travel-logistics': {
    slug: 'travel-logistics',
    pageTitle: 'Tour Travel & Courier Logistics',
    metaTitle: 'Tour Travel & Express Courier Logistics | Hand to Hand Services',
    metaDesc: 'Corporate fleet rentals, luxury travel coach bookings paired with swift express courier delivery and cargo logistics services.',
    heroSub: 'Providing seamless corporate fleet rentals and group tour management together with trusted express courier & heavy cargo logistics.',
    service1: {
      id: 'travel',
      icon: Plane,
      title: 'Tour, Travel & Transportation Services',
      subtitle: 'Corporate Fleet Rental, Luxury Travel & Tour Management',
      desc: 'Complete tour and travel arrangements including corporate cab rentals, luxury bus fleet deployment, ticketing, tour packages, and airport pickup/drop services for organizations and groups.',
      features: [
        'Corporate Fleet & Cab Rentals',
        'Luxury Bus & Traveller Booking',
        'Domestic Tour Packages & Itineraries',
        '24/7 Airport & Railway Station Pickups',
        'Licensed & Experienced Commercial Drivers',
        'Customized Delegation Travel Management',
      ],
      sectors: ['Corporate Delegations', 'Educational Tours', 'Event Organizers', 'Family & Group Trips'],
      images: [
        {
          src: '/Tour_Travel.jpeg',
          alt: 'Tour & Travel Services',
          caption: 'Luxury Fleet & Group Travel',
        },
        {
          src: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
          alt: 'Luxury Bus & Tourist Coach',
          caption: 'Commercial Cabs & Bus Rentals',
        },
        {
          src: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
          alt: 'Corporate Airport Transfer',
          caption: '24/7 Airport & Delegation Pickups',
        },
        {
          src: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
          alt: 'Scenic Domestic Tour Trip',
          caption: 'Customized Domestic Tour Packages',
        },
      ],
    },
    service2: {
      id: 'cargo',
      icon: Truck,
      title: 'Courier, Cargo & Supply Chain Logistics',
      subtitle: 'Swift, Secure Domestic & International Express Deliveries',
      desc: 'Reliable parcel delivery, cargo logistics, and document express services ensuring safe and punctual transport for corporate documents, heavy equipment, and bulk packages.',
      features: [
        'Domestic Express Document Delivery',
        'Bulk Freight & Cargo Transport',
        'Real-Time Parcel Tracking',
        'Secure Handling of Confidential Files',
        'Customized Logistics Packages',
        'Dedicated Courier Personnel Deployment',
      ],
      sectors: ['Legal & Financial Firms', 'E-Commerce Brands', 'Corporate Offices', 'Retail Chains'],
      images: [
        {
          src: '/Courier_Cargo.jpeg',
          alt: 'Courier & Cargo Logistics',
          caption: 'Express Courier & Parcel Transport',
        },
        {
          src: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
          alt: 'Cargo Logistics Truck Fleet',
          caption: 'Heavy Freight & Bulk Cargo',
        },
        {
          src: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&w=800&q=80',
          alt: 'Document Express Courier',
          caption: 'Confidential Files & Document Delivery',
        },
        {
          src: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=800&q=80',
          alt: 'Logistics Warehouse Supply Chain',
          caption: 'Real-Time Tracked Supply Chain',
        },
      ],
    },
  },
  'tenders-others': {
    slug: 'tenders-others',
    pageTitle: 'Government Tenders & Corporate Supplies',
    metaTitle: 'Government Tenders & Corporate Supplies | Hand to Hand Services',
    metaDesc: 'Public and private tender procurement, safety gear, uniforms, and specialized corporate infrastructure solutions.',
    heroSub: 'Your dependable procurement partner for government and private tenders, safety equipment, uniforms, and custom corporate solutions.',
    service1: {
      id: 'tenders',
      icon: PackageCheck,
      title: 'Government & Private Tender Supplies',
      subtitle: 'Procurement & Delivery of Safety, Stationery & Uniform Supplies',
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
      images: [
        {
          src: '/Government_Private.jpeg',
          alt: 'Government & Private Tender Supply',
          caption: 'Certified Material Procurement',
        },
        {
          src: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
          alt: 'Supply Warehouse Stock',
          caption: 'Bulk Warehouse Inventory',
        },
        {
          src: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=800&q=80',
          alt: 'Safety Gear & Uniform Supplies',
          caption: 'Safety Gear & Uniform Dispatch',
        },
        {
          src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
          alt: 'Official Tender Documentation',
          caption: 'PSU & Government Compliance',
        },
      ],
    },
    service2: {
      id: 'others',
      icon: Building,
      title: 'Other Specialized Corporate Solutions',
      subtitle: 'Customized Infrastructure, ISO Certified Systems & Management Consulting',
      desc: 'Tailored business support services encompassing compliance auditing, ISO standard implementations, facility setup consultancy, and emergency support services for enterprises.',
      features: [
        'Statutory Compliance Audits',
        'ISO System Alignment & Certification Support',
        'Office Facility Setup & Setup Consulting',
        'Emergency Response Protocols',
        'Customized SLA Contracts',
        'Dedicated Key Account Management',
      ],
      sectors: ['Enterprises & MNCs', 'Financial Institutions', 'Industrial Plants', 'New Business Ventures'],
      images: [
        {
          src: '/ISO.png',
          alt: 'ISO Certification Standards',
          caption: 'ISO Aligned Quality Control',
        },
        {
          src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
          alt: 'Corporate Infrastructure Setup',
          caption: 'Facility Infrastructure & Setup',
        },
        {
          src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
          alt: 'Modern Business Suite',
          caption: 'Enterprise Corporate Solutions',
        },
        {
          src: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
          alt: 'Strategic Management Consulting',
          caption: 'Dedicated Account Management',
        },
      ],
    },
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const pageData = dualServicesMap[slug];
  if (!pageData) {
    return { title: 'Service Not Found | Hand to Hand Services' };
  }
  return {
    title: pageData.metaTitle,
    description: pageData.metaDesc,
  };
}

export default async function DualServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = dualServicesMap[slug];

  if (!data) {
    notFound();
  }

  const { pageTitle, heroSub, service1, service2 } = data;

  return (
    <>
      <Navbar />

      <main className="pt-24 bg-slate-50 min-h-screen">
        {/* Top Hero Banner */}
        <section className="relative py-16 lg:py-24 bg-[#070f26] text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero.png"
              alt="Services hero backdrop"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#070f26] via-[#070f26]/90 to-transparent"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors mb-4 bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20"
            >
              <ArrowLeft size={14} /> Back to Home
            </Link>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
              {pageTitle}
            </h1>
            <p className="text-gray-300 text-base sm:text-lg max-w-3xl leading-relaxed">
              {heroSub}
            </p>
          </div>
        </section>

        {/* Quick Nav Bar between the two services */}
        <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm py-3 px-4">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-bold text-gray-700">
            <span className="uppercase text-gray-400 tracking-wider">Services on this page:</span>
            <div className="flex items-center gap-3">
              <a
                href={`#${service1.id}`}
                className="px-3.5 py-1.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-500 hover:text-white transition-colors"
              >
                1. {service1.title}
              </a>
              <a
                href={`#${service2.id}`}
                className="px-3.5 py-1.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-500 hover:text-white transition-colors"
              >
                2. {service2.title}
              </a>
            </div>
          </div>
        </div>

        {/* Main Content Area: 2 Services */}
        <section className="py-12 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-20">
            
            {/* ── SERVICE 1 BLOCK ── */}
            <div
              id={service1.id}
              className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-200/80 scroll-mt-36"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-lg shrink-0">
                  <service1.icon size={26} />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Service Option 1</span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d1b3e] leading-tight">
                    {service1.title}
                  </h2>
                </div>
              </div>

              <p className="text-amber-700 font-medium text-sm mb-4">{service1.subtitle}</p>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
                {service1.desc}
              </p>

              {/* 4 Image Collage Component for Service 1 */}
              <div className="mb-10">
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#0d1b3e] mb-3 flex items-center gap-2">
                  <CheckCircle size={14} className="text-amber-500" />
                  Service Visual Gallery (4 Photo Collage)
                </h3>
                <ServiceCollage images={service1.images} />
              </div>

              {/* Features & Sectors Grid */}
              <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-gray-100">
                <div>
                  <h4 className="font-bold text-[#0d1b3e] text-sm mb-3">Key Operational Features:</h4>
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    {service1.features.map((f) => (
                      <div key={f} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700 font-medium">
                        <CheckCircle2 size={16} className="text-amber-500 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-[#0d1b3e] text-sm mb-3">Primary Sectors Served:</h4>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {service1.sectors.map((sec) => (
                        <span key={sec} className="bg-amber-50 text-amber-800 text-xs font-semibold px-3 py-1 rounded-lg border border-amber-200/60">
                          {sec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/apply?type=employer&service=${encodeURIComponent(service1.title)}`}
                    className="btn-gold justify-center text-sm w-full sm:w-auto"
                  >
                    Request Quotation for {service1.title} <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>

            {/* ── SERVICE 2 BLOCK ── */}
            <div
              id={service2.id}
              className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-200/80 scroll-mt-36"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#0d1b3e] text-amber-400 flex items-center justify-center shadow-lg shrink-0">
                  <service2.icon size={26} />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Service Option 2</span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d1b3e] leading-tight">
                    {service2.title}
                  </h2>
                </div>
              </div>

              <p className="text-amber-700 font-medium text-sm mb-4">{service2.subtitle}</p>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
                {service2.desc}
              </p>

              {/* 4 Image Collage Component for Service 2 */}
              <div className="mb-10">
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#0d1b3e] mb-3 flex items-center gap-2">
                  <CheckCircle size={14} className="text-amber-500" />
                  Service Visual Gallery (4 Photo Collage)
                </h3>
                <ServiceCollage images={service2.images} />
              </div>

              {/* Features & Sectors Grid */}
              <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-gray-100">
                <div>
                  <h4 className="font-bold text-[#0d1b3e] text-sm mb-3">Key Operational Features:</h4>
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    {service2.features.map((f) => (
                      <div key={f} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700 font-medium">
                        <CheckCircle2 size={16} className="text-amber-500 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-[#0d1b3e] text-sm mb-3">Primary Sectors Served:</h4>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {service2.sectors.map((sec) => (
                        <span key={sec} className="bg-amber-50 text-amber-800 text-xs font-semibold px-3 py-1 rounded-lg border border-amber-200/60">
                          {sec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/apply?type=employer&service=${encodeURIComponent(service2.title)}`}
                    className="btn-gold justify-center text-sm w-full sm:w-auto"
                  >
                    Request Quotation for {service2.title} <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Bottom CTA Section */}
        <section className="py-16 bg-[#070f26] text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
              Looking for Customized SLA & Bulk Deployment?
            </h2>
            <p className="text-gray-300 text-sm sm:text-base mb-8 max-w-2xl mx-auto leading-relaxed">
              Our directors and operational heads provide complimentary site inspections and fast proposal turnarounds for corporate and government clients.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/apply?type=employer" className="btn-gold justify-center">
                Submit Service Request <ArrowRight size={16} />
              </Link>
              <a href="tel:9752128838" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors text-sm">
                <PhoneCall size={16} /> Call Us: 9752128838
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

'use client';

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
} from 'lucide-react';

const services = [
  {
    icon: ShieldCheck,
    title: 'Private Security Services',
    desc: 'Trained male & female security personnel for corporate, residential, and industrial protection.',
    img: 'https://images.pexels.com/photos/2579874/pexels-photo-2579874.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    icon: Sparkles,
    title: 'Housekeeping, Cleaning & Hospitality',
    desc: 'Professional cleaning, housekeeping, and hospitality staff for offices, hotels, and institutions.',
    img: 'https://images.pexels.com/photos/4239035/pexels-photo-4239035.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    icon: Camera,
    title: 'Event Organization & Photography',
    desc: 'Complete event planning, management, photography & videography services for all occasions.',
    img: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    icon: GraduationCap,
    title: 'Health, Education & AI Training',
    desc: 'Specialized training programs in health, education, digital marketing, and AI applications.',
    img: 'https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    icon: HeartHandshake,
    title: 'Women Empowerment Programs',
    desc: 'Awareness programs and initiatives dedicated to women empowerment and social development.',
    img: 'https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Job Consultancy',
    desc: 'Connecting talented professionals with the right opportunities across diverse industries.',
    img: 'https://images.pexels.com/photos/3184464/pexels-photo-3184464.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    icon: Drama,
    title: 'Cultural Programs (Drama & Dance)',
    desc: 'Organizing cultural events, drama performances, and dance programs to celebrate heritage.',
    img: 'https://images.pexels.com/photos/2167673/pexels-photo-2167673.jpeg?auto=extract&cs=tinysrgb&w=800',
  },
  {
    icon: Plane,
    title: 'Tour & Travel Services',
    desc: 'Domestic and international tour packages, ticketing, and complete travel assistance.',
    img: 'https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    icon: PackageCheck,
    title: 'Government & Private Tender Supplies',
    desc: 'Safety equipment, stationery, sports items, furniture, food & clothing supplies.',
    img: 'https://images.pexels.com/photos/4488636/pexels-photo-4488636.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    icon: Truck,
    title: 'Courier & Cargo Services',
    desc: 'Reliable domestic and international courier & cargo delivery solutions.',
    img: 'https://images.pexels.com/photos/4368132/pexels-photo-4368132.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-10 lg:py-12 bg-[#fdf8f0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="section-label justify-center">
            <span className="w-8 h-px bg-amber-500"></span> Our Services
            <span className="w-8 h-px bg-amber-500"></span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0d1b3e] mb-3">
            Comprehensive Business Solutions Under One Roof
          </h2>
          <p className="text-gray-600 text-sm">
            From security and manpower to specialized training and supply chain — we deliver
            excellence across ten core service categories.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <article key={s.title} className="service-card group bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-40 -mx-5 -mt-5 mb-4 overflow-hidden rounded-t-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.img}
                  alt={s.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b3e]/60 to-transparent"></div>
                <div className="absolute bottom-3 left-3 w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                  <s.icon className="text-white" size={20} />
                </div>
              </div>
              <h3 className="font-bold text-[#0d1b3e] mb-2 group-hover:text-amber-600 transition-colors text-base">
                {s.title}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

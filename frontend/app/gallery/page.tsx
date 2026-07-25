'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import Link from 'next/link';
import {
  Image as ImageIcon,
  ZoomIn,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  X,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  ArrowRight,
  Filter,
} from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  categorySlug: string;
  src: string;
  alt: string;
  location: string;
}

const galleryData: GalleryItem[] = [
  {
    id: '1',
    title: 'PSARA Verified Security Guards Deployment',
    category: 'Private Security',
    categorySlug: 'security',
    src: '/Private_Security.jpeg',
    alt: 'Security guards standing in formation',
    location: 'Corporate Tower, South Delhi',
  },
  {
    id: '2',
    title: 'Commercial Deep Cleaning & Janitorial Operations',
    category: 'Housekeeping & Facilities',
    categorySlug: 'housekeeping',
    src: '/Housekeeping.jpeg',
    alt: 'Housekeeping team cleaning office premises',
    location: 'IT Park, Gurgaon',
  },
  {
    id: '3',
    title: 'VIP Escort & Event Bouncer Management',
    category: 'Events & Cultural',
    categorySlug: 'events',
    src: '/Event_Organization.jpeg',
    alt: 'Event security personnel at stage venue',
    location: 'Exhibition Center, New Delhi',
  },
  {
    id: '4',
    title: 'Traditional Cultural Festival Stage Production',
    category: 'Events & Cultural',
    categorySlug: 'events',
    src: '/Cultural_Programs.jpeg',
    alt: 'Cultural dance stage performance',
    location: 'Auditorium, Noida',
  },
  {
    id: '5',
    title: 'Fire Safety, First Aid & Skill Training Workshop',
    category: 'Skill & AI Training',
    categorySlug: 'training',
    src: '/Health_Education.jpeg',
    alt: 'Security personnel in training workshop',
    location: 'Training Center, Delhi NCR',
  },
  {
    id: '6',
    title: 'Lady Guard Training & Empowerment Program',
    category: 'Women Empowerment',
    categorySlug: 'women-empowerment',
    src: '/Women_Empowerment.jpeg',
    alt: 'Lady security guards in professional attire',
    location: 'Community Facility, Bhopal',
  },
  {
    id: '7',
    title: 'Corporate Fleet & Tour Transportation Vehicles',
    category: 'Logistics & Supplies',
    categorySlug: 'logistics',
    src: '/Tour_Travel.jpeg',
    alt: 'Tour travel luxury bus fleet',
    location: 'Delhi-NCR Route',
  },
  {
    id: '8',
    title: 'Express Document Courier & Cargo Dispatch',
    category: 'Logistics & Supplies',
    categorySlug: 'logistics',
    src: '/Courier_Cargo.jpeg',
    alt: 'Logistics cargo truck and courier parcels',
    location: 'Distribution Center, Indore',
  },
  {
    id: '9',
    title: 'Government Tender Materials & Safety Uniforms',
    category: 'Logistics & Supplies',
    categorySlug: 'logistics',
    src: '/Government_Private.jpeg',
    alt: 'Tender procurement supplies warehouse',
    location: 'Supply Depot, South Delhi',
  },
  {
    id: '10',
    title: 'ISO 9001:2015 Quality Systems Audit & Certification',
    category: 'Private Security',
    categorySlug: 'security',
    src: '/ISO.png',
    alt: 'ISO Certification symbol and quality badge',
    location: 'Head Office, New Delhi',
  },
  {
    id: '11',
    title: 'CCTV Control Room & 24/7 Gate Surveillance',
    category: 'Private Security',
    categorySlug: 'security',
    src: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80',
    alt: 'Surveillance monitors in control room',
    location: 'Industrial Hub, Pithampur',
  },
  {
    id: '12',
    title: 'Corporate Entrance Access Control Guarding',
    category: 'Private Security',
    categorySlug: 'security',
    src: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=1200&q=80',
    alt: 'Corporate entrance security checkpoint',
    location: 'Financial Center, Delhi NCR',
  },
  {
    id: '13',
    title: 'Sanitization & Office Desk Deep Cleaning',
    category: 'Housekeeping & Facilities',
    categorySlug: 'housekeeping',
    src: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
    alt: 'Professional office sanitizer at work',
    location: 'Commercial Complex, Gurgaon',
  },
  {
    id: '14',
    title: 'Industrial Floor Machine Polishing & Maintenance',
    category: 'Housekeeping & Facilities',
    categorySlug: 'housekeeping',
    src: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=1200&q=80',
    alt: 'Industrial floor scrubber machine operation',
    location: 'Warehouse Center, Noida',
  },
  {
    id: '15',
    title: 'High-Profile Concert VIP Escort & Stage Lighting',
    category: 'Events & Cultural',
    categorySlug: 'events',
    src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    alt: 'Stage lights and crowd security control',
    location: 'Stadia Ground, New Delhi',
  },
  {
    id: '16',
    title: 'Practical AI & Digital Literacy Workshop for Staff',
    category: 'Skill & AI Training',
    categorySlug: 'training',
    src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    alt: 'Staff members interacting during computer workshop',
    location: 'Skill Academy, South Delhi',
  },
  {
    id: '17',
    title: 'Front Desk & Hospitality Executive Placement',
    category: 'Women Empowerment',
    categorySlug: 'women-empowerment',
    src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
    alt: 'Executive woman in corporate setting',
    location: 'Corporate Office, Noida',
  },
  {
    id: '18',
    title: 'Express Parcel Cargo Distribution Logistics',
    category: 'Logistics & Supplies',
    categorySlug: 'logistics',
    src: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    alt: 'Cargo warehouse loading operation',
    location: 'Logistics Park, Greater Noida',
  },
];

const categories = [
  { name: 'All Photos', slug: 'all' },
  { name: 'Private Security', slug: 'security' },
  { name: 'Housekeeping & Facilities', slug: 'housekeeping' },
  { name: 'Events & Cultural', slug: 'events' },
  { name: 'Skill & AI Training', slug: 'training' },
  { name: 'Women Empowerment', slug: 'women-empowerment' },
  { name: 'Logistics & Supplies', slug: 'logistics' },
];

export default function GalleryPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const filteredData =
    selectedFilter === 'all'
      ? galleryData
      : galleryData.filter((item) => item.categorySlug === selectedFilter);

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeModalIndex === null) return;
    setActiveModalIndex((prev) =>
      prev! > 0 ? prev! - 1 : filteredData.length - 1
    );
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeModalIndex === null) return;
    setActiveModalIndex((prev) =>
      prev! < filteredData.length - 1 ? prev! + 1 : 0
    );
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeModalIndex === null) return;
      if (e.key === 'Escape') setActiveModalIndex(null);
      if (e.key === 'ArrowLeft') {
        setActiveModalIndex((prev) =>
          prev! > 0 ? prev! - 1 : filteredData.length - 1
        );
      }
      if (e.key === 'ArrowRight') {
        setActiveModalIndex((prev) =>
          prev! < filteredData.length - 1 ? prev! + 1 : 0
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalIndex, filteredData.length]);

  return (
    <>
      <Navbar />

      <main className="pt-24 bg-slate-50 min-h-screen">
        {/* Header Banner */}


        {/* Filter Navigation Tabs */}
        <section className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0 sm:justify-center">
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 pr-2 shrink-0 border-r border-gray-200">
                <Filter size={14} className="text-amber-500" />
                <span>Filter:</span>
              </div>
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedFilter(cat.slug)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300 ${selectedFilter === cat.slug
                      ? 'bg-[#0d1b3e] text-amber-400 shadow-md scale-105'
                      : 'bg-slate-100 text-gray-700 hover:bg-amber-50 hover:text-amber-700'
                    }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {filteredData.map((item, index) => {
                const isFailed = failedImages[item.id];

                return (
                  <div
                    key={item.id}
                    onClick={() => !isFailed && setActiveModalIndex(index)}
                    className="group relative rounded-2xl overflow-hidden shadow-md border border-gray-200/80 bg-slate-900 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 aspect-[4/3]"
                  >
                    {!isFailed ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.src}
                        alt={item.alt}
                        onError={() => handleImageError(item.id)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
                      />
                    ) : (
                      /* Fallback card */
                      <div className="w-full h-full bg-gradient-to-br from-[#0d1b3e] to-slate-800 p-4 flex flex-col items-center justify-center text-center text-white">
                        <ImageIcon size={32} className="text-amber-400 mb-2 opacity-80" />
                        <p className="text-xs font-bold text-amber-300 mb-1">{item.title}</p>
                        <span className="text-[10px] text-gray-400">Hand to Hand Operations</span>
                      </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                    {/* Top Category Badge */}
                    <span className="absolute top-3 left-3 bg-amber-500/90 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow backdrop-blur-sm tracking-wider uppercase border border-amber-300/30">
                      {item.category}
                    </span>

                    {/* Bottom Title Pill */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <div className="min-w-0 pr-2">
                        <p className="text-white text-xs font-bold truncate drop-shadow-md">
                          {item.title}
                        </p>
                        <p className="text-[10px] text-gray-300 truncate">
                          {item.location}
                        </p>
                      </div>
                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-amber-500/90 text-white flex items-center justify-center shadow backdrop-blur-sm group-hover:bg-amber-500 group-hover:scale-110 transition-all">
                        <ZoomIn size={13} />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Lightbox Modal */}
        {activeModalIndex !== null && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setActiveModalIndex(null)}
          >
            {/* Modal Container */}
            <div
              className="relative max-w-5xl w-full bg-[#0d1b3e] rounded-3xl overflow-hidden shadow-2xl border border-amber-500/30"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Box */}
              <div className="relative aspect-[16/10] bg-black flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={filteredData[activeModalIndex].src}
                  alt={filteredData[activeModalIndex].alt}
                  className="w-full h-full object-contain"
                />

                {/* Left Arrow Button */}
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-amber-500 flex items-center justify-center transition-colors border border-white/20"
                  aria-label="Previous photo"
                >
                  <ChevronLeft size={22} />
                </button>

                {/* Right Arrow Button */}
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-amber-500 flex items-center justify-center transition-colors border border-white/20"
                  aria-label="Next photo"
                >
                  <ChevronRight size={22} />
                </button>

                {/* Close Button */}
                <button
                  onClick={() => setActiveModalIndex(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white hover:bg-red-500 flex items-center justify-center transition-colors border border-white/20"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Bottom Bar */}
              <div className="p-5 sm:p-6 bg-[#0d1b3e] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/10">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-amber-500 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                      {filteredData[activeModalIndex].category}
                    </span>
                    <span className="text-gray-400 text-xs">
                      Photo {activeModalIndex + 1} of {filteredData.length}
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-base sm:text-lg">
                    {filteredData[activeModalIndex].title}
                  </h3>
                  <p className="text-xs text-amber-400 mt-0.5">
                    Location: {filteredData[activeModalIndex].location}
                  </p>
                </div>

                <Link
                  href="/apply?type=employer"
                  className="btn-gold text-xs py-2.5 px-5 whitespace-nowrap shrink-0"
                >
                  Request Quotation <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Bottom CTA Banner */}
        <section className="py-16 bg-[#070f26] text-white border-t border-white/10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
              Need Professional Security or Facility Management Staffing?
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

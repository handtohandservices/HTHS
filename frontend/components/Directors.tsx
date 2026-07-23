'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Phone, Mail } from 'lucide-react';

interface Director {
  name: string;
  phone: string;
  role: string;
  initials: string;
  img: string;
}

const directors: Director[] = [
  {
    name: 'Kaleem Ullah Rizvi',
    phone: '9752128838',
    role: 'Director',
    initials: 'KR',
    img: '/KALIM_RIZV.jpeg',
  },
  {
    name: 'Shabana Kaleem Rizvi',
    phone: '8109929029',
    role: 'Director',
    initials: 'SR',
    img: '/SHABANA_RIZVI.jpeg',
  },
  {
    name: 'Ahad Ullah',
    phone: '7971293277',
    role: 'Director',
    initials: 'AU',
    img: '/AHAD_ULLAH.jpeg',
  },
];

function DirectorCard({ d }: { d: Director }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 text-center group">
      {/* Director photo — standard circular profile shape */}
      <div className="relative w-28 h-28 mx-auto mb-5">
        {!imgError && d.img ? (
          <Image
            src={d.img}
            alt={d.name}
            fill
            sizes="112px"
            onError={() => setImgError(true)}
            className="rounded-full object-cover object-top shadow-lg ring-4 ring-amber-100 group-hover:ring-amber-300 group-hover:scale-105 transition-all duration-300"
          />
        ) : (
          /* fallback: initials if photo fails to load */
          <div className="w-28 h-28 rounded-full gradient-gold flex items-center justify-center text-white font-extrabold text-2xl shadow-lg ring-4 ring-amber-100">
            {d.initials}
          </div>
        )}

        <div className="absolute bottom-0 right-0 w-7 h-7 bg-[#0d1b3e] rounded-full border-4 border-white flex items-center justify-center">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
        </div>
      </div>

      <h3 className="font-bold text-lg text-[#0d1b3e] mb-1">{d.name}</h3>

      <p className="text-amber-600 text-sm font-semibold mb-4">
        {d.role}
      </p>

      <a
        href={`tel:+91${d.phone}`}
        className="inline-flex items-center gap-2 text-gray-700 hover:text-amber-600 transition-colors text-sm font-medium"
      >
        <Phone size={15} /> {d.phone}
      </a>
    </div>
  );
}

export default function Directors() {
  return (
    <section
      id="directors"
      className="pb-20 pt-10 lg:pb-28 lg:pt-12 bg-[#fdf8f0]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="section-label justify-center">
            <span className="w-8 h-px bg-amber-500"></span>
            Leadership
            <span className="w-8 h-px bg-amber-500"></span>
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0d1b3e] mb-4">
            Meet Our Directors
          </h2>

          <p className="text-gray-600">
            Experienced leadership guiding our mission to deliver trusted,
            professional services.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {directors.map((d) => (
            <DirectorCard key={d.name} d={d} />
          ))}
        </div>

        {/* Email banner */}
        <div className="mt-10 bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
          <Mail className="text-amber-500" size={22} />

          <span className="text-gray-700 font-medium">
            Reach us via email:
          </span>

          <a
            href="mailto:handtohandservices51@gmail.com"
            className="text-[#0d1b3e] font-bold hover:text-amber-600 transition-colors"
          >
            handtohandservices51@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}
'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

export default function WhatsAppFloat() {
  const [visible, setVisible] = useState(true);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  useEffect(() => {
    // Show tooltip after a delay since it's now visible from the start
    const t = setTimeout(() => setTooltipOpen(true), 1500);
    const t2 = setTimeout(() => setTooltipOpen(false), 7000);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, []);

  const phone = '919752128838';
  const message = encodeURIComponent(
    "Hello Hand to Hand Services Pvt. Ltd., I'd like to know more about your services."
  );
  const href = `https://wa.me/${phone}?text=${message}`;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 transition-all duration-500 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
        }`}
    >
      {/* Tooltip */}
      <div
        className={`hidden sm:flex items-center gap-2 bg-white shadow-xl rounded-full pl-4 pr-2 py-2 border border-gray-100 transition-all duration-300 ${tooltipOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
          }`}
      >
        <span className="text-sm text-gray-700 font-medium whitespace-nowrap">
          Chat with us on WhatsApp
        </span>
        <button
          onClick={() => setTooltipOpen(false)}
          className="w-6 h-6 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400"
          aria-label="Dismiss"
        >
          <X size={14} />
        </button>
      </div>

      {/* WhatsApp button */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30"></span>
        <svg
          viewBox="0 0 32 32"
          fill="currentColor"
          className="w-8 h-8 text-white relative z-10"
          aria-hidden="true"
        >
          <path d="M16.003 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.6 4.47 1.73 6.4L3.2 28.8l6.55-1.71c1.86 1.01 3.96 1.55 6.1 1.55h.01c7.06 0 12.8-5.74 12.8-12.8 0-3.42-1.33-6.64-3.75-9.06-2.42-2.42-5.64-3.75-9.06-3.75zm0 23.04h-.01c-1.93 0-3.82-.52-5.47-1.5l-.39-.23-4.06 1.06 1.08-3.96-.25-.4a10.55 10.55 0 0 1-1.62-5.62c0-5.84 4.76-10.6 10.6-10.6 2.83 0 5.49 1.1 7.49 3.11 2 2.01 3.11 4.67 3.11 7.5 0 5.84-4.76 10.6-10.6 10.6zm5.82-7.94c-.32-.16-1.88-.93-2.17-1.03-.29-.11-.5-.16-.71.16-.21.32-.82 1.03-1 1.24-.18.21-.37.24-.69.08-.32-.16-1.34-.49-2.55-1.57-.94-.84-1.58-1.88-1.76-2.2-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.71-.97-2.34-.26-.62-.52-.54-.71-.55-.18-.01-.4-.01-.61-.01-.21 0-.56.08-.85.4-.29.32-1.11 1.08-1.11 2.64 0 1.56 1.14 3.07 1.3 3.28.16.21 2.24 3.42 5.42 4.8.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.88-.77 2.14-1.51.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.61-.37z" />
        </svg>
      </a>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Image as ImageIcon, ZoomIn, Sparkles } from 'lucide-react';

interface CollageImage {
  src: string;
  alt: string;
  caption: string;
}

export default function ServiceCollage({ images }: { images: CollageImage[] }) {
  const [activeImage, setActiveImage] = useState<CollageImage | null>(null);
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});

  const handleImageError = (idx: number) => {
    setFailedImages((prev) => ({ ...prev, [idx]: true }));
  };

  const imgList = images.slice(0, 4);
  const mainImg = imgList[0];
  const rightTopImg = imgList[1];
  const rightBottomImg1 = imgList[2];
  const rightBottomImg2 = imgList[3];

  const renderTile = (
    img: CollageImage | undefined,
    idx: number,
    className: string,
    isHero = false
  ) => {
    if (!img) return null;
    const isFailed = failedImages[idx];

    return (
      <div
        key={idx}
        onClick={() => !isFailed && setActiveImage(img)}
        className={`group relative rounded-2xl overflow-hidden shadow-md border border-gray-200/80 bg-slate-900 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5 ${className}`}
      >
        {!isFailed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={img.src}
            alt={img.alt}
            onError={() => handleImageError(idx)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
          />
        ) : (
          /* Fallback stylized card */
          <div className="w-full h-full bg-gradient-to-br from-[#0d1b3e] to-slate-800 p-4 flex flex-col items-center justify-center text-center text-white">
            <ImageIcon size={isHero ? 36 : 24} className="text-amber-400 mb-2 opacity-80" />
            <p className="text-xs font-bold text-amber-300 mb-1">{img.caption}</p>
            <span className="text-[10px] text-gray-400">Hand to Hand Certified Service</span>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* Bottom Caption Pill */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="text-white text-xs font-semibold drop-shadow-md truncate max-w-[85%]">
            {img.caption}
          </span>
          <span className="flex-shrink-0 w-7 h-7 rounded-full bg-amber-500/90 text-white flex items-center justify-center shadow backdrop-blur-sm group-hover:bg-amber-500 group-hover:scale-110 transition-all">
            <ZoomIn size={13} />
          </span>
        </div>

        {/* Badge for Main Hero Image */}
        {isHero && (
          <span className="absolute top-3.5 left-3.5 bg-amber-500 text-white text-[10px] font-extrabold px-3 py-1 rounded-full shadow-lg tracking-wider uppercase flex items-center gap-1.5 border border-amber-300/40">
            <Sparkles size={11} /> Featured Service Photo
          </span>
        )}
      </div>
    );
  };

  return (
    <div>
      {/* Premium 4-Image Asymmetric Collage Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 items-stretch">
        {/* Left Side: Main Large Featured Image (spans 7 cols on LG) */}
        <div className="lg:col-span-7 flex">
          {renderTile(
            mainImg,
            0,
            'w-full h-full min-h-[280px] sm:min-h-[340px] lg:min-h-[380px] aspect-[4/3] lg:aspect-auto',
            true
          )}
        </div>

        {/* Right Side: 3 Supporting Collage Images (spans 5 cols on LG) */}
        <div className="lg:col-span-5 flex flex-col gap-3 lg:gap-4 justify-between">
          {/* Top Right Image */}
          <div className="flex-1 min-h-[160px] sm:min-h-[180px]">
            {renderTile(rightTopImg, 1, 'w-full h-full aspect-[16/9] lg:aspect-auto')}
          </div>

          {/* Bottom Right 2 Images Grid */}
          <div className="grid grid-cols-2 gap-3 lg:gap-4 flex-1">
            {renderTile(rightBottomImg1, 2, 'w-full h-full aspect-square lg:aspect-auto min-h-[130px] sm:min-h-[150px]')}
            {renderTile(rightBottomImg2, 3, 'w-full h-full aspect-square lg:aspect-auto min-h-[130px] sm:min-h-[150px]')}
          </div>
        </div>
      </div>

      {/* Lightbox Modal when clicking any image */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#0d1b3e] rounded-3xl overflow-hidden shadow-2xl border border-amber-500/30"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] bg-black">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeImage.src}
                alt={activeImage.alt}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-4 sm:p-6 bg-[#0d1b3e] text-white flex items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-amber-400 text-sm sm:text-base">{activeImage.caption}</h4>
                <p className="text-xs text-gray-300 mt-0.5">{activeImage.alt}</p>
              </div>
              <button
                onClick={() => setActiveImage(null)}
                className="px-4 py-2 bg-amber-500 text-white font-bold text-xs rounded-xl hover:bg-amber-600 transition-colors shrink-0"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

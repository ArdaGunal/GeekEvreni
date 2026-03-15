'use client';

import { Show } from '@/types';
import { useState } from 'react';
import Image from 'next/image';

export default function ShowHeader({ show }: { show: Show }) {
  const [imageError, setImageError] = useState(false);

  // TMDB'de TV şovlarının adı 'name' olarak gelir. Geriye dönük uyumluluk için title da kontrol ediliyor.
  const displayTitle = show.name || show.title || 'İsimsiz Dizi';
  const initial = displayTitle.charAt(0).toUpperCase();

  // TMDB görsel base URL'i
  const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';
  
  // Afiş kontrolü
  const posterUrl = show.poster_path ? `${TMDB_IMAGE_BASE}${show.poster_path}` : show.poster_url;
  const showPlaceholder = !posterUrl || imageError;

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 shadow-xl mt-6">
      <div className="relative z-10 flex flex-col md:flex-row gap-6 p-6 md:p-10 items-start md:items-center">
        {/* Poster */}
        <div className="flex-shrink-0 relative w-32 h-48 md:w-56 md:h-80 rounded-xl overflow-hidden shadow-2xl shadow-black/50 border border-slate-700 bg-slate-800 flex items-center justify-center">
          {showPlaceholder ? (
            <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-indigo-900/50 to-slate-900">
              <span className="text-6xl md:text-8xl font-black text-slate-700/50 select-none">
                {initial}
              </span>
            </div>
          ) : (
            <Image 
              src={posterUrl!} 
              alt={displayTitle} 
              fill
              className="object-cover"
              onError={() => setImageError(true)}
              sizes="(max-width: 768px) 128px, 224px"
            />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col gap-5">
          <div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4 drop-shadow-md">
              {displayTitle}
            </h1>
          </div>
          
          <p className="text-slate-300 md:text-lg leading-relaxed max-w-3xl font-medium tracking-wide">
            {show.overview || show.synopsis}
          </p>
        </div>
      </div>
    </div>
  );
}

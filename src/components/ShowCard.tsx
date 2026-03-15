import Link from 'next/link';
import Image from 'next/image';
import { Show } from '@/types';

export default function ShowCard({ show }: { show: Show }) {
  // TMDB'de TV şovlarının adı 'name' olarak gelir. Geriye dönük uyumluluk için title da kontrol ediliyor.
  const displayTitle = show.name || show.title || 'İsimsiz Dizi';
  const initial = displayTitle.charAt(0).toUpperCase();
  
  // TMDB görsel base URL'i
  const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';
  
  // Afiş kontrolü
  const posterUrl = show.poster_path ? `${TMDB_IMAGE_BASE}${show.poster_path}` : show.poster_url;
  const showPlaceholder = !posterUrl;

  return (
    <Link href={`/show/${show.id}`} className="group block focus:outline-none">
      <div className="relative aspect-[2/3] w-full bg-slate-800 rounded-xl overflow-hidden border border-slate-700/50 shadow-md group-hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] group-hover:border-indigo-500/50 transition-all duration-300 transform group-hover:-translate-y-1">
        
        {/* Arka Plan Afiş veya Placeholder */}
        {showPlaceholder ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-900/60 to-slate-900">
            <span className="text-6xl md:text-8xl font-black text-slate-700/50 select-none">
              {initial}
            </span>
          </div>
        ) : (
          <Image 
            src={posterUrl} 
            alt={displayTitle} 
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
          />
        )}
        
        {/* Karartma Gecişi (Gradient) */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />
        
        {/* Alt Metin Alanı */}
        <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col justify-end">
          <h3 className="text-base sm:text-lg font-bold text-white truncate drop-shadow-md group-hover:text-indigo-400 transition-colors">
            {displayTitle}
          </h3>
          
          {/* Sadece Hover'da Açılan Açıklama */}
          <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-in-out">
            <div className="overflow-hidden">
               <p className="text-xs text-slate-300 mt-2 line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                 {show.overview || show.synopsis || "Tartışmalara Katıl"}
               </p>
            </div>
          </div>
        </div>
        
      </div>
    </Link>
  );
}

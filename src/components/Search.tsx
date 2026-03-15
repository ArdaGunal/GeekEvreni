'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from 'use-debounce';

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  
  const [text, setText] = useState(queryParam);
  // Kullanıcı yazmayı bıraktıktan 500ms sonra değeri günceller
  const [debouncedValue] = useDebounce(text, 500);

  // Debounced değer değiştiğinde rotayı /search sayfasına it
  useEffect(() => {
    if (debouncedValue) {
      router.push(`/search?q=${encodeURIComponent(debouncedValue)}`);
    } else if (text === '' && queryParam !== '') {
      // Eğer kullanıcı metni sildiyse ve zaten arama sayfasındaysa anasayfaya dön
      router.push('/');
    }
  }, [debouncedValue, router, text, queryParam]);

  // Sayfa dışarıdan (Link ile vb.) değiştiğinde inputu senkronize et
  useEffect(() => {
    setText(queryParam);
  }, [queryParam]);

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-slate-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
        </svg>
      </div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="block w-full pl-10 pr-3 py-2 border border-slate-700 rounded-lg leading-5 bg-slate-800 text-slate-300 placeholder-slate-500 focus:outline-none focus:bg-slate-700/50 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm transition-colors"
        placeholder="Dizi, film veya anime ara..."
      />
      {text && (
        <button 
          onClick={() => setText('')}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
        >
          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  );
}

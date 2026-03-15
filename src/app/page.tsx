import { Show } from '@/types';
import ShowCard from '@/components/ShowCard';
import { getPopularShows } from '@/lib/tmdb';
import Pagination from '@/components/Pagination';

export default async function Home({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  // Arama parametrelerini NextJs app router (server component) için asenkron yakalama
  const resolvedParams = await searchParams;
  const page = parseInt(resolvedParams.page || '1', 10);
  
  // Gerçek API verisi yükleniyor (hata durumunda boş dizi dönecek şekilde ayarlanmıştır)
  const shows: Show[] = await getPopularShows(page);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Popüler Sezonlar ve Tartışmalar
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Aradığın diziyi bul, sevdiğin sezonların derinliklerine in ve toplulukla teorilerini paylaş.
        </p>
      </div>

      {/* Dizi Listesi Gelecek Alan (Placeholder) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
        {shows.length > 0 ? (
          shows.map((show) => <ShowCard key={show.id} show={show} />)
        ) : (
          <div className="col-span-full text-center py-20 border-2 border-dashed border-slate-700 rounded-2xl">
            <p className="text-slate-400 font-medium">İçerikler Yükleniyor veya Henüz Eklenmemiş...</p>
          </div>
        )}
      </div>

      {/* Sayfalama (Pagination) Modülü */}
      {shows.length > 0 && <Pagination currentPage={page} />}
    </div>
  );
}

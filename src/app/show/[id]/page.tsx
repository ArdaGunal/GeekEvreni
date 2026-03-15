import { notFound } from 'next/navigation';
import { getShowDetails } from '@/lib/tmdb';
import ShowHeader from '@/components/ShowHeader';
import SeasonList from '@/components/SeasonList';

export default async function ShowPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  // TMDB'den detayları çek (dizi ve sezonları barındırır)
  const show = await getShowDetails(resolvedParams.id);

  if (!show) {
    notFound();
  }

  // TMDB'den dönen seasons dizisinden sadece sezon numaralarını çıkarıyoruz
  // Not: TMDB'de "Specials" olan sezon genellikle 0. sezondur, onu filtreleyebiliriz
  const seasonNumbers = show.seasons
    ?.filter((s: any) => s.season_number > 0)
    .map((s: any) => s.season_number) || [];

  return (
    <div className="min-h-screen bg-slate-900">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-20">
        <ShowHeader show={show} />
        <SeasonList seasons={seasonNumbers} showId={resolvedParams.id} />
      </main>
    </div>
  );
}

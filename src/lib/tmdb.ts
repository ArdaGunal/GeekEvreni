/**
 * TMDB API Configuration and Skeleton Setup
 */

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_ACCESS_TOKEN = process.env.NEXT_PUBLIC_TMDB_API_READ_ACCESS_TOKEN;

// API istekleri atarken ortak olarak kullanılacak headers objesi
const getAuthHeaders = (): HeadersInit => {
  if (TMDB_ACCESS_TOKEN) {
    return {
      accept: 'application/json',
      Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
    };
  }
  return {
    accept: 'application/json',
  };
};

/**
 * TMDB'den veri çekmek için taslak fonksiyon
 * @param endpoint - API ucu, örn: '/tv/popular'
 * @param params - Ek sorgu parametreleri, örn: '?language=tr-TR'
 */
export async function fetchFromTMDB(endpoint: string, params: string = '') {
  if (!TMDB_API_KEY && !TMDB_ACCESS_TOKEN) {
    console.warn('TMDB API Key veya Access Token bulunamadı. Lütfen .env.local dosyanızı kontrol edin.');
    // Şimdilik mock data dönecek şekilde ayarlanabilir veya throw edilebilir.
    return null;
  }

  // Eğer token yoksa fallback olarak query'ye api_key eklenir.
  const authQuery = TMDB_ACCESS_TOKEN ? '' : (params.includes('?') ? `&api_key=${TMDB_API_KEY}` : `?api_key=${TMDB_API_KEY}`);
  const url = `${TMDB_BASE_URL}${endpoint}${params}${authQuery}`;

  try {
    const res = await fetch(url, { headers: getAuthHeaders() });
    if (!res.ok) {
        throw new Error(`TMDB fetch error: ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error('TMDB Data Fetch Error:', error);
    return null;
  }
}

/**
 * TMDB'den popüler dizileri çeker.
 */
export async function getPopularShows(page: number = 1) {
  try {
    const data = await fetchFromTMDB('/tv/popular', `?language=tr-TR&page=${page}`);
    if (!data || !data.results) {
      return [];
    }
    return data.results;
  } catch (error) {
    console.error("Failed to fetch popular shows:", error);
    return [];
  }
}

/**
 * TMDB'den belirli bir dizinin detaylarını çeker.
 */
export async function getShowDetails(id: string) {
  try {
    const data = await fetchFromTMDB(`/tv/${id}`, '?language=tr-TR');
    if (!data || data.success === false) {
      return null;
    }
    return data;
  } catch (error) {
    console.error(`Failed to fetch show details for ID ${id}:`, error);
    return null;
  }
}

/**
 * TMDB'den dizi ve sinema araması yapar.
 */
export async function searchTrending(query: string, page: number = 1) {
  if (!query) return [];
  
  try {
    const data = await fetchFromTMDB('/search/multi', `?query=${encodeURIComponent(query)}&language=tr-TR&page=${page}`);
    if (!data || !data.results) {
      return [];
    }
    
    // Sadece dizileri (tv) ve filmleri (movie) filtrele (kişiler vb. çıkmasın)
    return data.results.filter(
      (item: any) => item.media_type === 'tv' || item.media_type === 'movie'
    );
  } catch (error) {
    console.error(`Search failed for ${query}:`, error);
    return [];
  }
}

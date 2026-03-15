import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase-server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';

  if (code) {
    const supabase = await createServerSupabase();
    
    // Auth kodunu oturum için takas et (Cookie'ye otomatik yazılır)
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Hata durumunda (veya code yoksa) ana sayfaya ya da bir hata sayfasına yönlendir.
  return NextResponse.redirect(`${origin}/`);
}

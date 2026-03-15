import { createBrowserClient } from '@supabase/ssr';

export function createBrowserSupabase() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function signInWithGoogle() {
  const supabase = createBrowserSupabase();
  
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      // Login olduktan sonra kullanıcının yönlendirileceği sayfa
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
  
  if (error) {
    console.error("Google Login Error:", error);
    throw error;
  }
}

export async function signOut() {
  const supabase = createBrowserSupabase();
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    console.error("Logout Error:", error);
    throw error;
  }
  
  // Çıkış yapınca sayfayı yenile
  window.location.reload();
}

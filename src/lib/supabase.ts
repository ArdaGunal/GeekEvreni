import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Sadece istemci veya sunucu tarafında tek bir instance oluşturulması için varsayılan yapılandırma
export const supabase = createClient(supabaseUrl, supabaseKey);

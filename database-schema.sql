-- GeekEvreni Supabase Veritabanı Şeması
-- Profiller Tablosu (Kullanıcı verileri, yetkiler ve avatarlar için)

-- 1. profiles tablosunun oluşturulması
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    avatar_url TEXT,
    role TEXT DEFAULT 'member'::TEXT NOT NULL CHECK (role IN ('member', 'moderator', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Row Level Security (RLS) aktif etme
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. RLS Politikaları
-- Kullanıcıların kendi profillerini görebilmesi
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone."
ON public.profiles FOR SELECT
USING ( true );

-- Kullanıcıların kendi profillerini güncelleyebilmesi
DROP POLICY IF EXISTS "Users can insert their own profile." ON public.profiles;
CREATE POLICY "Users can insert their own profile."
ON public.profiles FOR INSERT
WITH CHECK ( auth.uid() = id );

-- Kullanıcıların kendi profillerini düzenleyebilmesi (rol değiştirmelerine izin vermemek için ekstra güvenlik önlemleri alınabilir)
DROP POLICY IF EXISTS "Users can update own profile." ON public.profiles;
CREATE POLICY "Users can update own profile."
ON public.profiles FOR UPDATE
USING ( auth.uid() = id );

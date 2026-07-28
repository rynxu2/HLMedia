-- ============================================
-- HLMedia Website - Supabase Schema + Seed Data
-- Run this in Supabase SQL Editor
-- ============================================

-- =============================================
-- 1. TABLES
-- =============================================

-- Profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Leads table
CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  service TEXT,
  industry TEXT,
  message TEXT,
  source TEXT NOT NULL DEFAULT 'contact',
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);

-- Blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT '',
  category_color TEXT NOT NULL DEFAULT '#1877f2',
  tags TEXT[] DEFAULT '{}',
  image TEXT,
  read_time TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  views INT NOT NULL DEFAULT 0,
  author_id UUID REFERENCES profiles(id),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_blogs_status ON blogs(status);
CREATE INDEX IF NOT EXISTS idx_blogs_category ON blogs(category);
CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON blogs(created_at);

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  instructor TEXT NOT NULL DEFAULT '',
  price TEXT NOT NULL DEFAULT '',
  price_value INT,
  duration TEXT NOT NULL DEFAULT '',
  lessons INT NOT NULL DEFAULT 0,
  students INT NOT NULL DEFAULT 0,
  rating FLOAT NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft',
  category TEXT NOT NULL DEFAULT '',
  thumbnail TEXT,
  study_mode TEXT NOT NULL DEFAULT 'Online & Offline',
  highlight BOOLEAN NOT NULL DEFAULT false,
  topics TEXT[] DEFAULT '{}',
  outcomes TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_courses_status ON courses(status);
CREATE INDEX IF NOT EXISTS idx_courses_category ON courses(category);

-- Settings table
CREATE TABLE IF NOT EXISTS settings (
  id SERIAL PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL
);

-- =============================================
-- 2. ROW LEVEL SECURITY (RLS)
-- =============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read their own, admin can read all
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Leads: anon can insert (contact form), authenticated admin can read/update/delete
CREATE POLICY "Anyone can create leads" ON leads
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can view leads" ON leads
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update leads" ON leads
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete leads" ON leads
  FOR DELETE USING (auth.role() = 'authenticated');

-- Blogs: public can read published, authenticated can CRUD
CREATE POLICY "Anyone can view published blogs" ON blogs
  FOR SELECT USING (status = 'published' OR auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can create blogs" ON blogs
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update blogs" ON blogs
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete blogs" ON blogs
  FOR DELETE USING (auth.role() = 'authenticated');

-- Courses: public can read active, authenticated can CRUD
CREATE POLICY "Anyone can view active courses" ON courses
  FOR SELECT USING (status = 'active' OR auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can create courses" ON courses
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update courses" ON courses
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete courses" ON courses
  FOR DELETE USING (auth.role() = 'authenticated');

-- Settings: authenticated can CRUD
CREATE POLICY "Authenticated users can manage settings" ON settings
  FOR ALL USING (auth.role() = 'authenticated');

-- =============================================
-- 3. AUTO-UPDATE updated_at TRIGGER
-- =============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blogs_updated_at BEFORE UPDATE ON blogs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- 4. AUTO-CREATE PROFILE ON SIGNUP
-- =============================================

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'role', 'admin')
  );
  RETURN NEW;
END;
$$ language 'plpgsql' SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- =============================================
-- 5. STORAGE BUCKET
-- =============================================

INSERT INTO storage.buckets (id, name, public) 
VALUES ('uploads', 'uploads', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Anyone can view uploads" ON storage.objects
  FOR SELECT USING (bucket_id = 'uploads');

CREATE POLICY "Authenticated users can upload" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'uploads' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete uploads" ON storage.objects
  FOR DELETE USING (bucket_id = 'uploads' AND auth.role() = 'authenticated');

-- =============================================
-- 6. SEED DATA - BLOGS
-- =============================================

INSERT INTO blogs (slug, title, excerpt, content, category, category_color, tags, image, read_time, status, views, published_at) VALUES
(
  'huong-dan-chay-quang-cao-facebook-2025',
  'Hướng dẫn chạy quảng cáo Facebook 2025',
  'Tổng hợp kiến thức từ A-Z về Facebook Ads: từ thiết lập tài khoản, tạo chiến dịch, nhắm mục tiêu đến tối ưu chi phí.',
  '# Hướng dẫn chạy quảng cáo Facebook 2025

Quảng cáo Facebook vẫn là kênh tiếp cận khách hàng hiệu quả nhất cho doanh nghiệp nhỏ và vừa tại Việt Nam. Với hơn 70 triệu người dùng, Facebook mang đến cơ hội tiếp cận đúng đối tượng.

## 1. Thiết lập tài khoản Business Manager

Bước đầu tiên là tạo tài khoản Business Manager. Truy cập business.facebook.com và làm theo hướng dẫn.

## 2. Xác định mục tiêu chiến dịch

Chọn đúng objective: Awareness, Traffic, Engagement, Leads, hoặc Sales.

## 3. Nhắm mục tiêu đối tượng

Sử dụng Custom Audiences, Lookalike Audiences và Interest-based targeting.

## 4. Tối ưu ngân sách

Bắt đầu với ngân sách nhỏ 200-500k/ngày, theo dõi CPM và CPC.',
  'Facebook / TikTok Ads',
  '#1877f2',
  ARRAY['facebook ads', 'quảng cáo', 'digital marketing'],
  'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800',
  '8 phút đọc',
  'published',
  0,
  '2025-03-15T00:00:00Z'
),
(
  'bi-quyet-ban-hang-tiktok-shop',
  'Bí quyết bán hàng trên TikTok Shop',
  'Tìm hiểu cách tận dụng TikTok Shop để tăng doanh số. Từ setup gian hàng, tạo content viral đến chiến lược livestream.',
  '# Bí quyết bán hàng trên TikTok Shop

TikTok Shop đang bùng nổ tại Việt Nam với hàng triệu đơn hàng mỗi ngày.

## 1. Setup gian hàng chuyên nghiệp

Đăng ký TikTok Shop Seller Center, hoàn thiện hồ sơ và upload sản phẩm.

## 2. Tạo content viral

Sử dụng trending sounds, hashtags và storytelling để tạo video hấp dẫn.

## 3. Livestream bán hàng

Livestream vào khung giờ vàng 19h-22h, kết hợp flash sale.',
  'TikTok Marketing',
  '#000000',
  ARRAY['tiktok', 'tiktok shop', 'bán hàng online'],
  'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800',
  '6 phút đọc',
  'published',
  0,
  '2025-04-02T00:00:00Z'
),
(
  'thiet-ke-website-ban-hang-chuan-seo',
  'Thiết kế website bán hàng chuẩn SEO',
  'Hướng dẫn xây dựng website bán hàng chuẩn SEO từ đầu: chọn domain, hosting, cấu trúc site và tối ưu tốc độ.',
  '# Thiết kế website bán hàng chuẩn SEO

Một website chuẩn SEO giúp bạn có traffic miễn phí từ Google.

## 1. Chọn domain và hosting

Chọn domain .vn hoặc .com ngắn gọn, dễ nhớ. Hosting SSD tốc độ cao.

## 2. Cấu trúc website

Sử dụng heading hierarchy (H1 > H2 > H3), breadcrumb, internal linking.

## 3. Tối ưu Core Web Vitals

LCP < 2.5s, FID < 100ms, CLS < 0.1.',
  'SEO & Website',
  '#10b981',
  ARRAY['website', 'seo', 'thiết kế web'],
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
  '10 phút đọc',
  'published',
  0,
  '2025-04-18T00:00:00Z'
)
ON CONFLICT (slug) DO NOTHING;

-- =============================================
-- 7. SEED DATA - COURSES
-- =============================================

INSERT INTO courses (name, description, instructor, price, price_value, duration, lessons, students, rating, status, category, thumbnail, highlight, topics, outcomes) VALUES
(
  'Facebook & TikTok Ads thực chiến',
  'Khóa học chạy quảng cáo Facebook và TikTok từ zero đến hero. Học xong tự tin setup và tối ưu chiến dịch quảng cáo.',
  'HL Media Team',
  '2.500.000đ',
  2500000,
  '8 buổi (2h/buổi)',
  8,
  120,
  4.8,
  'active',
  'Facebook Ads',
  'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600',
  true,
  ARRAY['Setup Business Manager', 'Tạo chiến dịch', 'Nhắm mục tiêu', 'Tối ưu chi phí', 'Retargeting', 'Scaling'],
  ARRAY['Tự setup và chạy quảng cáo', 'Tối ưu chi phí hiệu quả', 'Đọc hiểu data & báo cáo']
),
(
  'Edit Video Reels & TikTok',
  'Học cách edit video ngắn chuyên nghiệp cho Reels và TikTok. Từ cắt ghép cơ bản đến hiệu ứng nâng cao.',
  'HL Media Team',
  '1.800.000đ',
  1800000,
  '6 buổi (2h/buổi)',
  6,
  85,
  4.9,
  'active',
  'Edit Video',
  'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600',
  false,
  ARRAY['CapCut Pro', 'Premiere Rush', 'Trending effects', 'Color grading', 'Sound design'],
  ARRAY['Edit video ngắn chuyên nghiệp', 'Tạo content viral', 'Sử dụng hiệu ứng trending']
)
ON CONFLICT DO NOTHING;

-- =============================================
-- 8. USER MANAGEMENT - SCHEMA UPDATES
-- =============================================

-- Add is_active column to profiles (run as migration)
-- ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT true;

-- Update handle_new_user to default role='viewer' instead of 'admin'
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'role', 'viewer')
  );
  RETURN NEW;
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- Super Admin RLS policies for profiles
CREATE POLICY "Super admin can update all profiles" ON profiles
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'super_admin')
  );

CREATE POLICY "Super admin can delete profiles" ON profiles
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'super_admin')
  );

CREATE POLICY "Super admin can insert profiles" ON profiles
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'super_admin')
  );

-- =============================================
-- DONE! Now create an admin user in Supabase Auth:
-- Go to Authentication > Users > Add User
-- Email: admin@hlmedia.vn
-- Password: (your choice)
-- Then run: UPDATE profiles SET role = 'super_admin' WHERE id = '<user-uuid>';
-- =============================================

export interface User {
  id: number;
  username: string;
  displayName: string;
  role: string;
}

export interface Lead {
  id: number;
  name: string;
  phone: string;
  service?: string;
  industry?: string;
  message?: string;
  source?: string;
  status: 'new' | 'contacted' | 'closed';
  createdAt: string;
  updatedAt: string;
}

export interface Blog {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  categoryColor: string;
  tags: string[];
  image: string | null;
  readTime: string | null;
  status: 'draft' | 'published';
  views: number;
  authorId: number;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  author?: { displayName: string };
}

export interface Course {
  id: number;
  name: string;
  description: string;
  instructor: string;
  price: string;
  priceValue: number | null;
  duration: string;
  lessons: number | null;
  students: number | null;
  rating: number | null;
  status: string;
  category: string;
  thumbnail: string | null;
  studyMode: string;
  highlight: boolean;
  topics: string[];
  outcomes: string[];
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStat {
  label: string;
  value: string;
  delta: string;
}

export interface ActivityItem {
  type: 'lead' | 'blog';
  text: string;
  time: string;
}

/* ── User Management Types ───────────────────── */
export type UserRole = 'super_admin' | 'admin' | 'viewer';

export interface AdminUser {
  id: string;
  email: string;
  display_name: string;
  role: UserRole;
  is_active: boolean;
  created_at: string;
  last_sign_in_at: string | null;
}

export interface CreateUserPayload {
  email: string;
  password: string;
  display_name: string;
  role: UserRole;
}

export interface UpdateUserPayload {
  display_name?: string;
  role?: UserRole;
  is_active?: boolean;
}

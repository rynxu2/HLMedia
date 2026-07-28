import { supabase } from "./supabase";

/* ── Blog API ────────────────────────────────────── */
export const blogApi = {
  async list(opts?: { status?: string; limit?: number; page?: number }) {
    let q = supabase
      .from("blogs")
      .select("*, profiles(display_name)");
    if (opts?.status && opts.status !== 'all') q = q.eq("status", opts.status);
    q = q.order("created_at", { ascending: false });
    if (opts?.limit) q = q.limit(opts.limit);
    const { data, error } = await q;
    if (error) throw error;
    return data ?? [];
  },

  async getById(id: number) {
    const { data, error } = await supabase
      .from("blogs")
      .select("*, profiles(display_name)")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

  async getBySlug(slug: string) {
    const { data, error } = await supabase
      .from("blogs")
      .select("*, profiles(display_name)")
      .eq("slug", slug)
      .single();
    if (error) throw error;
    return data;
  },

  async create(blog: Record<string, unknown>) {
    const { data, error } = await supabase
      .from("blogs")
      .insert(blog)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id: number, blog: Record<string, unknown>) {
    const { data, error } = await supabase
      .from("blogs")
      .update(blog)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async delete(id: number) {
    const { error } = await supabase.from("blogs").delete().eq("id", id);
    if (error) throw error;
  },

  async incrementViews(slug: string) {
    await supabase.rpc("increment_blog_views", { blog_slug: slug }).catch(() => {
      // fire-and-forget: if RPC not available, update directly
      supabase
        .from("blogs")
        .update({ views: supabase.rpc ? undefined : 0 })
        .eq("slug", slug);
    });
  },
};

/* ── Course API ──────────────────────────────────── */
export const courseApi = {
  async list(opts?: { status?: string }) {
    let q = supabase.from("courses").select("*");
    if (opts?.status && opts.status !== 'all') q = q.eq("status", opts.status);
    q = q.order("created_at", { ascending: false });
    const { data, error } = await q;
    if (error) throw error;
    return data ?? [];
  },

  async getById(id: number) {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

  async create(course: Record<string, unknown>) {
    const { data, error } = await supabase
      .from("courses")
      .insert(course)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id: number, course: Record<string, unknown>) {
    const { data, error } = await supabase
      .from("courses")
      .update(course)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async delete(id: number) {
    const { error } = await supabase.from("courses").delete().eq("id", id);
    if (error) throw error;
  },
};

/* ── Lead API ────────────────────────────────────── */
export const leadApi = {
  async list(opts?: {
    search?: string;
    status?: string;
    page?: number;
    limit?: number;
  }) {
    const limit = opts?.limit ?? 20;
    const page = opts?.page ?? 1;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let q = supabase
      .from("leads")
      .select("*", { count: "exact" });
    if (opts?.status && opts.status !== "all")
      q = q.eq("status", opts.status);
    if (opts?.search)
      q = q.or(
        `name.ilike.%${opts.search}%,phone.ilike.%${opts.search}%`
      );
    q = q.order("created_at", { ascending: false }).range(from, to);
    const { data, error, count } = await q;
    if (error) throw error;
    return {
      data: data ?? [],
      total: count ?? 0,
      page,
      totalPages: Math.ceil((count ?? 0) / limit),
    };
  },

  async create(lead: Record<string, unknown>) {
    const { data, error } = await supabase
      .from("leads")
      .insert(lead)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id: number, fields: Record<string, unknown>) {
    const { data, error } = await supabase
      .from("leads")
      .update(fields)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async delete(id: number) {
    const { error } = await supabase.from("leads").delete().eq("id", id);
    if (error) throw error;
  },

  async exportAll(opts?: { search?: string; status?: string }) {
    let q = supabase.from("leads").select("*");
    if (opts?.status && opts.status !== "all")
      q = q.eq("status", opts.status);
    if (opts?.search)
      q = q.or(
        `name.ilike.%${opts.search}%,phone.ilike.%${opts.search}%`
      );
    q = q.order("created_at", { ascending: false });
    const { data, error } = await q;
    if (error) throw error;
    return data ?? [];
  },
};

/* ── Dashboard API ───────────────────────────────── */
export const dashboardApi = {
  async getStats() {
    const [blogs, courses, leads, newLeads] = await Promise.all([
      supabase.from("blogs").select("id", { count: "exact", head: true }),
      supabase
        .from("courses")
        .select("id", { count: "exact", head: true }),
      supabase
        .from("leads")
        .select("id", { count: "exact", head: true }),
      supabase
        .from("leads")
        .select("id", { count: "exact", head: true })
        .eq("status", "new"),
    ]);
    return {
      totalBlogs: blogs.count ?? 0,
      totalCourses: courses.count ?? 0,
      totalLeads: leads.count ?? 0,
      newLeads: newLeads.count ?? 0,
    };
  },

  async getRecentLeads() {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);
    if (error) throw error;
    return data ?? [];
  },

  async getActivity() {
    const { data, error } = await supabase
      .from("leads")
      .select("created_at")
      .order("created_at", { ascending: false })
      .limit(30);
    if (error) throw error;
    return data ?? [];
  },
};

/* ── Upload API ──────────────────────────────────── */
export const uploadApi = {
  async upload(file: File) {
    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage
      .from("uploads")
      .upload(fileName, file);
    if (error) throw error;
    const {
      data: { publicUrl },
    } = supabase.storage.from("uploads").getPublicUrl(fileName);
    return { url: publicUrl, publicId: fileName };
  },
};

/* ── User Admin API (via Edge Function) ──────── */
export const userApi = {
  async _call(method: string, path = '', body?: unknown) {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('Not authenticated');
    
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const res = await fetch(`${supabaseUrl}/functions/v1/admin-users${path}`, {
      method,
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
        'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const headerErr = res.headers.get('X-Error-Message');
      let errMsg = headerErr ? decodeURIComponent(headerErr) : `Yêu cầu thất bại (HTTP ${res.status})`;
      if (typeof data.error === "string" && data.error.trim() && data.error !== "{}") {
        errMsg = data.error;
      } else if (typeof data.message === "string" && data.message.trim()) {
        errMsg = data.message;
      } else if (typeof data.msg === "string" && data.msg.trim()) {
        errMsg = data.msg;
      } else if (typeof data.error_description === "string" && data.error_description.trim()) {
        errMsg = data.error_description;
      } else if (data.error && typeof data.error === "object") {
        errMsg = data.error.message || data.error.msg || JSON.stringify(data.error);
      }
      throw new Error(errMsg);
    }
    return data;
  },

  async list() {
    return this._call('GET');
  },

  async create(payload: { email: string; password: string; display_name: string; role: string }) {
    return this._call('POST', '', payload);
  },

  async update(id: string, payload: { display_name?: string; role?: string; is_active?: boolean }) {
    return this._call('PATCH', `/${id}`, payload);
  },

  async delete(id: string) {
    return this._call('DELETE', `/${id}`);
  },

  async resetPassword(id: string, password: string) {
    return this._call('POST', `/${id}/reset-password`, { password });
  },
};

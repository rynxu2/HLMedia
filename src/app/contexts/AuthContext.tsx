import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import { supabase } from "../lib/supabase";
import type { User as SupabaseUser } from "@supabase/supabase-js";

interface User {
  id: string;
  email: string;
  displayName: string;
  role: string;
  isActive: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isSuperAdmin: boolean;
  isAdmin: boolean;
  canManageContent: boolean;
  canManageUsers: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

function mapUser(
  su: SupabaseUser,
  profile?: { display_name?: string; role?: string; is_active?: boolean }
): User {
  return {
    id: su.id,
    email: su.email ?? "",
    displayName: profile?.display_name ?? su.email ?? "",
    role: profile?.role ?? "viewer",
    isActive: profile?.is_active ?? true,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAndSetUser = useCallback(async (supabaseUser: SupabaseUser) => {
    const { data: profile } = await supabase
      .from("profiles")
      .select("display_name, role, is_active")
      .eq("id", supabaseUser.id)
      .single();

    const mapped = mapUser(supabaseUser, profile ?? undefined);

    // If user is deactivated, sign out immediately
    if (!mapped.isActive) {
      await supabase.auth.signOut();
      setUser(null);
      throw new Error("Tài khoản đã bị vô hiệu hóa");
    }

    setUser(mapped);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        try {
          await fetchAndSetUser(session.user);
        } catch {
          // User deactivated, already signed out
        }
      }
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        try {
          await fetchAndSetUser(session.user);
        } catch {
          // User deactivated
        }
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchAndSetUser]);

  const login = useCallback(async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;

    // Check if user is active
    if (data.user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("is_active")
        .eq("id", data.user.id)
        .single();

      if (profile && profile.is_active === false) {
        await supabase.auth.signOut();
        throw new Error("Tài khoản đã bị vô hiệu hóa");
      }
    }
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
  }, []);

  const value = useMemo(() => {
    const role = user?.role ?? "";
    const isSuperAdmin = role === "super_admin";
    const isAdmin = role === "admin" || isSuperAdmin;
    return {
      user,
      isLoading,
      isAuthenticated: !!user,
      isSuperAdmin,
      isAdmin,
      canManageContent: isAdmin,
      canManageUsers: isSuperAdmin,
      login,
      logout,
    };
  }, [user, isLoading, login, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}

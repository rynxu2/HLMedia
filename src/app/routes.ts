import { createBrowserRouter, Navigate } from "react-router";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import ServiceDetail from "./pages/services/ServiceDetail";
import AllBlogs from "./pages/blog/AllBlogs";
import BlogDetail from "./pages/blog/BlogDetail";
import AllCourses from "./pages/courses/AllCourses";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import React from "react";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";

const AdminDashboard = React.lazy(() => import("./pages/admin/AdminDashboard"));
const AdminLeads = React.lazy(() => import("./pages/admin/AdminLeads"));
const AdminBlog = React.lazy(() => import("./pages/admin/AdminBlog"));
const AdminCourses = React.lazy(() => import("./pages/admin/AdminCourses"));
const AdminBlogEditor = React.lazy(() => import("./pages/admin/AdminBlogEditor"));
const AdminCourseEditor = React.lazy(() => import("./pages/admin/AdminCourseEditor"));
const AdminUsers = React.lazy(() => import("./pages/admin/AdminUsers"));

/** Helper component to redirect Client visitors accessing /quan-ly to admin.hlagency.com.vn */
function AdminRedirectGuard({ children }: { children: React.ReactNode }) {
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    const isClientHost =
      !hostname.startsWith("admin.") &&
      import.meta.env.VITE_APP_MODE !== "admin" &&
      !hostname.includes("localhost") &&
      !hostname.includes("127.0.0.1");

    if (isClientHost) {
      window.location.href = `https://admin.hlagency.com.vn${window.location.pathname}${window.location.search}`;
      return null;
    }
  }
  return React.createElement(React.Fragment, null, children);
}

/** Helper component for Admin Domain root / redirect */
function AdminRootRedirect() {
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    const isAdminHost =
      hostname.startsWith("admin.") ||
      import.meta.env.VITE_APP_MODE === "admin";

    if (isAdminHost) {
      return React.createElement(Navigate, { to: "/login", replace: true });
    }
  }
  return React.createElement(Home);
}

const isAdminHost =
  typeof window !== "undefined" &&
  (window.location.hostname.startsWith("admin.") ||
    import.meta.env.VITE_APP_MODE === "admin");

export const router = createBrowserRouter(
  isAdminHost
    ? [
        // 🛡️ ADMIN DOMAIN ROUTE TREE (admin.hlagency.com.vn)
        {
          path: "/login",
          Component: function CleanAdminLoginWrapper() {
            return React.createElement(AdminRedirectGuard, null, React.createElement(AdminLogin));
          },
        },
        {
          path: "/",
          Component: function CleanAdminWrapper() {
            return React.createElement(AdminLayout);
          },
          children: [
            { index: true, Component: function RootRedirect() { return React.createElement(Navigate, { to: "/dashboard", replace: true }); } },
            { path: "dashboard", Component: AdminDashboard },
            { path: "leads", Component: AdminLeads },
            { path: "blog", Component: AdminBlog },
            { path: "blog/create", Component: AdminBlogEditor },
            { path: "blog/edit/:id", Component: AdminBlogEditor },
            { path: "khoa-hoc", Component: AdminCourses },
            { path: "khoa-hoc/create", Component: AdminCourseEditor },
            { path: "khoa-hoc/edit/:id", Component: AdminCourseEditor },
            { path: "nguoi-dung", Component: AdminUsers },
          ],
        },
        // Fallback / Redirect for any legacy /quan-ly route
        {
          path: "/quan-ly/*",
          Component: function LegacyAdminRedirect() {
            return React.createElement(Navigate, { to: "/dashboard", replace: true });
          },
        },
      ]
    : [
        // 🌐 CLIENT DOMAIN ROUTE TREE (hlagency.com.vn)
        {
          path: "/",
          Component: MainLayout,
          children: [
            { index: true, Component: Home },
            { path: "dich-vu/:slug", Component: ServiceDetail },
            { path: "blog", Component: AllBlogs },
            { path: "blog/:slug", Component: BlogDetail },
            { path: "khoa-hoc", Component: AllCourses },
            { path: "lien-he", Component: ContactPage },
            { path: "gioi-thieu", Component: AboutPage },
          ],
        },
        // If client user accesses /quan-ly or /login on hlagency.com.vn -> redirect to admin domain
        {
          path: "/quan-ly/*",
          Component: function ClientToAdminRedirect() {
            return React.createElement(AdminRedirectGuard, null, React.createElement(AdminLogin));
          },
        },
        {
          path: "/login",
          Component: function ClientToAdminLoginRedirect() {
            return React.createElement(AdminRedirectGuard, null, React.createElement(AdminLogin));
          },
        },
      ]
);

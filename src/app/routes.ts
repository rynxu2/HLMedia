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
      return React.createElement(Navigate, { to: "/dashboard", replace: true });
    }
  }
  return React.createElement(Home);
}

export const router = createBrowserRouter([
  // Public Site Routes (Client Domain)
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: AdminRootRedirect },
      { path: "dich-vu/:slug", Component: ServiceDetail },
      { path: "blog", Component: AllBlogs },
      { path: "blog/:slug", Component: BlogDetail },
      { path: "khoa-hoc", Component: AllCourses },
      { path: "lien-he", Component: ContactPage },
      { path: "gioi-thieu", Component: AboutPage },
    ],
  },
  // Clean Admin Domain Root Layout & Subpaths
  {
    path: "/",
    Component: function CleanAdminWrapper() {
      const isAdminHost = typeof window !== "undefined" && (window.location.hostname.startsWith("admin.") || import.meta.env.VITE_APP_MODE === "admin");
      if (!isAdminHost) return null;
      return React.createElement(AdminLayout);
    },
    children: [
      { path: "dashboard", Component: AdminDashboard },
      { path: "leads", Component: AdminLeads },
      { path: "admin-blog", Component: AdminBlog },
      { path: "admin-blog/create", Component: AdminBlogEditor },
      { path: "admin-blog/edit/:id", Component: AdminBlogEditor },
      { path: "admin-khoa-hoc", Component: AdminCourses },
      { path: "admin-khoa-hoc/create", Component: AdminCourseEditor },
      { path: "admin-khoa-hoc/edit/:id", Component: AdminCourseEditor },
      { path: "nguoi-dung", Component: AdminUsers },
    ],
  },
  // Legacy / Direct Admin Routes (/quan-ly)
  {
    path: "/quan-ly",
    Component: function AdminLoginWrapper() {
      return React.createElement(AdminRedirectGuard, null, React.createElement(AdminLogin));
    },
  },
  {
    path: "/quan-ly",
    Component: function AdminLayoutWrapper() {
      return React.createElement(AdminRedirectGuard, null, React.createElement(AdminLayout));
    },
    children: [
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
]);

import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { FloatingActions } from "../components/FloatingActions";

export default function MainLayout() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  useEffect(() => {
    if (hash) {
      const targetId = hash.slice(1);
      const element = document.getElementById(targetId);
      if (element) {
        const timer = setTimeout(() => {
          const yOffset = -80; // offset for fixed navbar
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }, 100);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}

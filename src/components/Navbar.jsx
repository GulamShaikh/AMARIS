"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FiArrowRight } from "react-icons/fi";

export default function Navbar() {
  const [showNav, setShowNav] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const hoverRef = useRef(false);

  // ================= AUTO HIDE =================
  useEffect(() => {
    let timeout;

    const handleScroll = () => {
      setShowNav(true);

      if (timeout) clearTimeout(timeout);

      timeout = setTimeout(() => {
        if (!hoverRef.current) setShowNav(false);
      }, 1200);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  // ================= SCROLL HANDLER =================
  const handleScrollTo = (id) => {
    if (pathname !== "/") {
      router.push(`/#${id}`);

      setTimeout(() => {
        const el = document.getElementById(id);
        if (!el) return;

        const yOffset = -100;
        const y = el.getBoundingClientRect().top + window.scrollY + yOffset;

        window.scrollTo({
          top: y,
          behavior: "smooth",
        });
      }, 300);

      return;
    }

    const el = document.getElementById(id);
    if (!el) return;

    const yOffset = -100;
    const y = el.getBoundingClientRect().top + window.scrollY + yOffset;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  };

  // ================= MENU LOGIC =================
  const homeSections = ["hero", "features", "benefitors", "contact", "faqs"];
  const pageLinks = [
    { name: "hero", path: "/" },
    { name: "weather", path: "/weather" },
    { name: "news", path: "/news" },
    { name: "chat", path: "/chat" },
  ];

  const isHome = pathname === "/";

  return (
    <div
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full px-4 transition-all duration-500 ${
        showNav ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
      }`}
    >
      <nav
        onMouseEnter={() => {
          hoverRef.current = true;
          setShowNav(true);
        }}
        onMouseLeave={() => {
          hoverRef.current = false;

          setTimeout(() => {
            if (!hoverRef.current) setShowNav(false);
          }, 800);
        }}
        className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3 rounded-full  bg-white/70 backdrop-blur-lg border border-gray-200   shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
      >
        {/* ================= LOGO ================= */}
        <div
          onClick={() => router.push("/")}
          className="text-lg font-semibold cursor-pointer text-black hover:text-gray-600 transition"
        >
          AMARIS
        </div>

        {/* ================= CENTER ================= */}
        <div className="hidden md:flex gap-8 text-sm font-medium">
          {isHome
            ? homeSections.map((item) => (
                <button
                  key={item}
                  onClick={() => handleScrollTo(item)}
                  className="relative text-gray-700 hover:text-black transition group"
                >
                  {item.toUpperCase()}
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full" />
                </button>
              ))
            : pageLinks.map((item) => (
                <button
                  key={item.name}
                  onClick={() => router.push(item.path)}
                  className={`relative transition group ${
                    pathname === item.path
                      ? "text-black"
                      : "text-gray-500 hover:text-black"
                  }`}
                >
                  {item.name.toUpperCase()}
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] bg-black transition-all duration-300 ${
                      pathname === item.path
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </button>
              ))}
        </div>

        {/* ================= RIGHT ================= */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/menu")}
            className="flex items-center gap-2 px-5 py-2 rounded-full  bg-black text-white text-sm font-medium  hover:scale-105 transition"
          >
            MENU
          </button>
        </div>
      </nav>
    </div>
  );
}

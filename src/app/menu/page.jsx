"use client";

import { useRouter } from "next/navigation";

export default function MenuPage() {
  const router = useRouter();

  const sections = [
    {
      title: "Weather",
      desc: "Understand the weather around you",
      path: "/weather",
      img: "/images/img2.jpeg",
    },
    {
      title: "Chat",
      desc: "Interact with AMARIS intelligence",
      path: "/chat",
      img: "/images/img3.jpeg",
    },
    {
      title: "News",
      desc: "Explore real-time insights",
      path: "/news",
      img: "/images/img4.jpeg",
    },
  ];

  return (
    <section className="min-h-screen flex flex-col md:flex-row bg-white overflow-hidden">
      {sections.map((sec, i) => (
        <div
          key={i}
          onClick={() => router.push(sec.path)}
          className="
            group flex-1 flex items-center justify-center
            cursor-pointer relative overflow-hidden
            border border-black/5
            transition-all duration-500
          "
        >
          {/* ⚪ BASE */}
          <div className="absolute inset-0 bg-white z-0" />

          {/* 🖼️ HOVER IMAGE */}
          <div
            className="
              absolute inset-0 z-0
              opacity-0 group-hover:opacity-100
              transition duration-700
              scale-110 group-hover:scale-100
            "
          >
            <img
              src={sec.img}
              alt=""
              className="w-full h-full object-cover grayscale"
            />
          </div>

          {/* 🌫️ OVERLAY (for readability) */}
          <div className="absolute inset-0 bg-white/80 group-hover:bg-white/60 transition duration-500 z-10" />

          {/* 🎯 CONTENT */}
          <div className="relative z-20 text-center px-6 transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-1">
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-black">
              {sec.title}
            </h1>

            <p className="mt-3 text-sm md:text-base text-black/50 group-hover:text-black/70 transition">
              {sec.desc}
            </p>

            {/* UNDERLINE */}
            <div className="mt-6 h-[2px] w-10 bg-black/10 mx-auto group-hover:w-20 group-hover:bg-black transition-all duration-500" />
          </div>

          {/* 🧲 DEPTH */}
          <div className="absolute inset-0 pointer-events-none transition-all duration-500 group-hover:shadow-[inset_0_-80px_100px_rgba(0,0,0,0.06)] z-10" />
        </div>
      ))}
    </section>
  );
}

"use client";

import {
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiArrowUpRight,
} from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#020617] text-white overflow-hidden">
      {/* 🌈 SUBTLE GRADIENT GLOW */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, rgba(37,99,235,0.25), transparent 60%)," +
            "radial-gradient(circle at 80% 70%, rgba(59,130,246,0.18), transparent 60%)",
        }}
      />

      {/* 🌫️ GRAIN */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ================= CONTENT ================= */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-16 py-20">
        <div className="grid md:grid-cols-4 gap-12">
          {/* ================= BRAND ================= */}
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">AMARIS</h2>

            <p className="mt-4 text-sm text-slate-400 leading-relaxed max-w-xs">
              An open intelligence platform built for thinkers, builders, and
              contributors — transforming conversations into structured insight.
            </p>
          </div>

          {/* ================= LINKS ================= */}
          <div>
            <h3 className="text-sm font-semibold tracking-wide text-white">
              Product
            </h3>

            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li className="hover:text-white transition cursor-pointer">
                Features
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Roadmap
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Changelog
              </li>
              <li className="hover:text-white transition cursor-pointer">
                FAQs
              </li>
            </ul>
          </div>

          {/* ================= COMMUNITY ================= */}
          <div>
            <h3 className="text-sm font-semibold tracking-wide text-white">
              Community
            </h3>

            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li className="hover:text-white transition cursor-pointer">
                Contribute
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Discussions
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Open Source
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Feedback
              </li>
            </ul>
          </div>

          {/* ================= CTA ================= */}
          <div>
            <h3 className="text-sm font-semibold tracking-wide text-white">
              Explore
            </h3>

            <p className="mt-4 text-sm text-slate-400">
              Dive deeper into the AMARIS ecosystem and connected platforms.
            </p>

            <a
              href="https://clyxn.com"
              target="_blank"
              className="inline-flex items-center gap-2 mt-6 text-sm text-white hover:text-blue-400 transition"
            >
              Visit Ecosystem <FiArrowUpRight />
            </a>
          </div>
        </div>

        {/* ================= DIVIDER ================= */}
        <div className="mt-16 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* ================= BOTTOM ================= */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-400">
          <p>© {new Date().getFullYear()} AMARIS. All rights reserved.</p>

          {/* SOCIAL */}
          <div className="flex items-center gap-4 text-lg">
            <FiGithub className="hover:text-white cursor-pointer transition" />
            <FiTwitter className="hover:text-white cursor-pointer transition" />
            <FiLinkedin className="hover:text-white cursor-pointer transition" />
          </div>
        </div>
      </div>
    </footer>
  );
}

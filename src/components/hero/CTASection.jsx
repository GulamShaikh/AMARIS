"use client";

import { FiArrowRight } from "react-icons/fi";

export default function CTASection() {
  return (
    <section className="bg-transparent px-6 md:px-20 py-24">
      <div className="max-w-6xl mx-auto">
        <a
          href="/chat"
          className="group relative block w-full overflow-hidden rounded-[34px] border border-black/10 shadow-[0_20px_70px_rgba(0,0,0,0.15)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_35px_120px_rgba(0,0,0,0.22)]"
        >
          {/* BACKGROUND */}
          <div
            className="absolute inset-0 animate-[amarisGlow_7s_ease-in-out_infinite] bg-[radial-gradient(circle_at_20%_30%,rgba(30,64,175,0.85),transparent_55%),radial-gradient(circle_at_70%_40%,rgba(75,85,99,0.70),transparent_60%),radial-gradient(circle_at_85%_80%,rgba(2,6,23,0.95),transparent_65%)]"
          />

          {/* WAVE */}
          <div
            className="absolute -inset-24 opacity-60 blur-2xl transition bg-[conic-gradient(from_90deg,rgba(30,64,175,0.70),rgba(2,6,23,0.85),rgba(75,85,99,0.60),rgba(30,64,175,0.70))] animate-[amarisSpin_12s_linear_infinite] group-hover:animate-[amarisSpin_5s_linear_infinite]"
          />

          {/* SHEEN */}
          <div
            className="absolute inset-0 opacity-25 translate-x-[-120%] bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.55)_35%,transparent_65%)] animate-[amarisSheen_6s_ease-in-out_infinite] group-hover:animate-[amarisSheen_1.8s_ease-in-out_infinite]"
          />

          {/* CONTRAST */}
          <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition" />

          {/* CONTENT */}
          <div className="relative grid grid-cols-[1fr_auto] items-stretch">
            {/* LEFT */}
            <div className="p-8 md:p-10 text-white">
              <h3 className="text-4xl md:text-6xl font-semibold tracking-tight">
                Start AMARIS
              </h3>

              <p className="mt-4 max-w-2xl text-sm md:text-base text-white/85 leading-relaxed">
                Chat with intelligence, scan live news, and combine context into
                clear actions. Built for speed and clarity.
              </p>

              <div className="mt-5 text-xs text-white/75 tracking-wide">
                Real-time • Context-aware • Minimal friction
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="relative flex items-center justify-center w-[140px] md:w-[200px] border-l border-white/15">
              <button
                className="group relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden bg-white/10 backdrop-blur border border-white/20 grid place-content-center transition-all duration-300 hover:scale-110 hover:bg-white/20 shadow-[0_10px_40px_rgba(0,0,0,0.25)]"
              >
                {/* ROTATING TEXT */}
                <div
                  className="absolute inset-0 text-[10px] md:text-[12px] font-bold text-white tracking-wide"
                  style={{ animation: "spinText 12s linear infinite" }}
                >
                  {"EXPLORE AMARIS"
                    .repeat(1)
                    .split("")
                    .map((char, i) => (
                      <span
                        key={i}
                        style={{
                          position: "absolute",
                          inset: "12px", // 🔥 increased radius
                          transform: `rotate(${i * 8}deg)`, // 🔥 smoother circle
                        }}
                      >
                        {char}
                      </span>
                    ))}
                </div>

                {/* ⚪ CENTER */}
                <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-md">
                  {/* MAIN ICON */}
                  <FiArrowRight className="text-black text-xl md:text-2xl transition-transform duration-300" />

                  {/* COPY ICON */}
                </div>
              </button>
            </div>

            {/* BORDER */}
            <div className="pointer-events-none absolute inset-0 rounded-[34px] ring-1 ring-white/15 group-hover:ring-white/25 transition" />
          </div>

          {/* KEYFRAMES */}
          <style jsx>{`
            @keyframes amarisSpin {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }

            @keyframes amarisSheen {
              0% {
                transform: translateX(-120%);
              }
              40% {
                transform: translateX(120%);
              }
              100% {
                transform: translateX(120%);
              }
            }

            @keyframes amarisGlow {
              0%,
              100% {
                filter: saturate(1.05) contrast(1.05);
                transform: scale(1);
              }
              50% {
                filter: saturate(1.25) contrast(1.1);
                transform: scale(1.02);
              }
            }

            @keyframes spinText {
              to {
                transform: rotate(360deg);
              }
            }
          `}</style>
        </a>
      </div>
    </section>
  );
}

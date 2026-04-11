"use client";

import {
  FiGlobe,
  FiCpu,
  FiTrendingUp,
  FiZap,
  FiShield,
  FiLayers,
} from "react-icons/fi";

const features = [
  {
    icon: <FiGlobe />,
    title: "Global Intelligence",
    desc: "Real-time insights from global news and data streams.",
  },
  {
    icon: <FiCpu />,
    title: "AI-Powered Context",
    desc: "Understands conversations and builds meaningful context.",
  },
  {
    icon: <FiTrendingUp />,
    title: "Smart Decisions",
    desc: "Turn raw information into structured, actionable outputs.",
  },
  {
    icon: <FiZap />,
    title: "Instant Responses",
    desc: "Fast and responsive system built for real-time interaction.",
  },
  {
    icon: <FiShield />,
    title: "Reliable Outputs",
    desc: "Consistent and trustworthy responses across domains.",
  },
  {
    icon: <FiLayers />,
    title: "Unified Platform",
    desc: "Chat, news, and weather combined into one experience.",
  },
];

export default function FeatureGrid() {
  return (
    <section className="px-6 md:px-20 py-24 bg-white">
      {/* ================= HEADER ================= */}
      <div className="max-w-3xl mb-16">
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-black">
          Your intelligence platform,
          <br />
          <span className="text-gray-400">finally simplified.</span>
        </h2>

        <p className="mt-4 text-gray-500 text-sm md:text-base leading-relaxed">
          Everything you need to understand, analyze, and act — without the
          noise.
        </p>
      </div>

      {/* ================= GRID ================= */}
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((item, index) => (
          <div
            key={index}
            className="
              group rounded-2xl border border-gray-200 bg-gray-50
              p-6 transition-all duration-300
              hover:bg-white hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)]
              hover:-translate-y-1
            "
          >
            {/* ICON */}
            <div
              className="
                w-10 h-10 flex items-center justify-center rounded-xl
                bg-white border border-gray-200 text-gray-700
                mb-4 transition
                group-hover:bg-black group-hover:text-white
              "
            >
              {item.icon}
            </div>

            {/* TITLE */}
            <h3 className="text-lg font-semibold text-black mb-2">
              {item.title}
            </h3>

            {/* DESC */}
            <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

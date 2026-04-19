"use client";

import {
  FiPlus,
  FiArrowUpRight,
  FiLayers,
  FiGlobe,
  FiZap,
  FiGrid,
  FiCode,
  FiCpu,
  FiActivity
} from "react-icons/fi";

const roles = [
  { icon: <FiPlus />, label: "CREATORS" },
  { icon: <FiArrowUpRight />, label: "BUILDERS" },
  { icon: <FiCpu />, label: "THINKERS" },
  { icon: <FiGlobe />, label: "EXPLORERS" },
  { icon: <FiZap />, label: "DOERS" },
  { icon: <FiLayers />, label: "LEADERS" },
  { icon: <FiGrid />, label: "DISRUPTORS" },
  { icon: <FiCode />, label: "CODERS" },
  { icon: <FiActivity />, label: "INNOVATORS" },

];

export default function BenefitorsSection() {
  return (
    <section className="w-full min-h-screen bg-white px-6 pb-6">
      <div className="w-full grid md:grid-cols-2 gap-16 items-center">
        {/* ================= LEFT ================= */}
        <div className="max-w-xl text-left">
          <p className="text-xs tracking-[0.3em] uppercase text-black/40 mb-4">
            Built for People
          </p>

          <h2 className="text-5xl md:text-7xl font-semibold leading-[1.05] tracking-tight text-gray-500">
            Who is <span className=" text-black">AMARIS</span> for?
          </h2>

          <p className="mt-6 text-black/70 text-lg md:text-xl leading-relaxed">
            AMARIS is crafted for individuals who build, explore, analyze, and
            shape ideas into impact ~ combining intelligence with execution.
          </p>

          <div className="mt-8 space-y-2 text-lg text-black/80">
            <p>• Real-time thinking</p>
            <p>• Intelligent workflows</p>
            <p>• Seamless exploration</p>
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="flex flex-col gap-8">
          {roles.map((item, index) => (
            <div
              key={index}
              className="group flex items-center gap-6 text-5xl md:text-6xl font-bold opacity-50 hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer"
            >
              {/* ICON */}
              <div
                className="w-14 h-14 flex items-center justify-center rounded-xl text-black/60 transition-all duration-500 group-hover:text-blue-600 group-hover:scale-110"
              >
                {item.icon}
              </div>

              {/* TEXT */}
              <span
                className="transition-all duration-500 group-hover:tracking-wider group-hover:translate-x-2"
              >
                {item.label}
              </span>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

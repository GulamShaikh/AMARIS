"use client";

import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";

export default function GetInTouchPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    topic: "",
    message: "",
  });

  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thanks for reaching out ");
  };

  return (
    <section className="min-h-screen grid md:grid-cols-2">
      {/* ================= LEFT ================= */}
      <div className="relative flex items-start px-10 md:px-20 py-20 bg-white overflow-hidden">
        {/* grid texture */}
        <div className="absolute inset-0 opacity-[0.25] pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(2,6,23,0.08)_1px,transparent_1px)] [background-size:18px_18px]" />
        </div>

        {/* glow */}
        <div className="absolute -top-32 -left-32 h-[420px] w-[420px] bg-blue-500/10 blur-3xl rounded-full" />

        <div className="relative max-w-xl text-left">
          <p className="text-xs tracking-[0.22em] text-slate-400 uppercase">
            Contact AMARIS
          </p>

          <h1 className="mt-6 text-5xl md:text-6xl font-semibold leading-[1.05] text-slate-950">
            Let’s build
            <br />
            <span className="text-slate-500">intelligence together.</span>
          </h1>

          <p className="mt-6 text-slate-600 text-sm leading-relaxed max-w-lg">
            AMARIS is an open intelligence platform built for builders,
            thinkers, and contributors.
            <br />
            <br />
            If you want to contribute, collaborate, or improve the system — we’d
            love to hear from you. Whether it’s ideas, integrations, or
            real-world use cases, your input helps AMARIS evolve.
          </p>

          {/* tags */}
          <div className="mt-12">
            <p className="text-[11px] uppercase tracking-widest text-slate-400">
              Built for collaboration
            </p>

            <div className="mt-3 flex items-center gap-3">
              <div className="px-4 py-2 rounded-full text-xs font-medium bg-blue-200 border border-slate-200 shadow-sm">
                Open-source
              </div>
              <div className="px-4 py-2 rounded-full text-xs font-medium bg-blue-200 border border-slate-200 shadow-sm">
                Community-driven
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= RIGHT ================= */}
      <div className="relative flex items-center justify-center px-6 md:px-20 py-20 overflow-hidden">
        {/* gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 20% 40%, rgba(37,99,235,0.55), transparent 60%)," +
              "radial-gradient(circle at 80% 60%, rgba(29,78,216,0.45), transparent 60%)," +
              "linear-gradient(135deg, rgba(2,6,23,0.96), rgba(30,58,138,0.6))",
          }}
        />

        {/* FORM (bigger now) */}
        <div className="relative w-full max-w-lg bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_40px_120px_rgba(0,0,0,0.4)] p-10 md:p-12">
          <div className="mb-8 text-center">
            <p className="text-[11px] tracking-[0.22em] uppercase text-slate-500">
              Send an inquiry
            </p>

            <h2 className="mt-2 text-2xl font-semibold text-slate-950">
              Contribute to AMARIS
            </h2>

            <p className="text-sm text-slate-500 mt-2">
              Ideas, feedback, or collaboration — we’re open.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <input
                name="firstName"
                placeholder="First Name"
                onChange={handleChange}
                className="w-full border border-slate-300/50 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition"
                required
              />
              <input
                name="lastName"
                placeholder="Last Name"
                onChange={handleChange}
                className="w-full border border-slate-300/50 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition"
                required
              />
            </div>

            <input
              name="email"
              placeholder="Email"
              type="email"
              onChange={handleChange}
              className="w-full border border-slate-300/50 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition"
              required
            />

            <select
              name="topic"
              onChange={handleChange}
              className="w-full border border-slate-300/50 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition"
              required
            >
              <option value="">Select Purpose</option>
              <option>Contribute</option>
              <option>Feedback</option>
              <option>Collaboration</option>
              <option>Integration</option>
            </select>

            <textarea
              name="message"
              rows={5}
              placeholder="Tell us what you want to build or improve..."
              onChange={handleChange}
              className="w-full border border-slate-300/50 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition resize-none"
              required
            />

            <button className="w-full bg-slate-950 text-white py-3.5 rounded-full text-sm font-medium hover:bg-blue-600 transition shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
              Submit
            </button>

            <p className="text-xs text-slate-500 text-center">
              Your input helps shape AMARIS.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

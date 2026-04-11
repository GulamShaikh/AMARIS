"use client";

import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const faqs = [
  {
    q: "What is AMARIS?",
    a: "AMARIS is an AI-powered intelligence platform designed to transform conversations into structured, actionable insights.",
  },
  {
    q: "Who is AMARIS for?",
    a: "AMARIS is built for builders, thinkers, developers, and teams who want intelligent workflows and real-time contextual insights.",
  },
  {
    q: "Is AMARIS open for contributions?",
    a: "Yes. AMARIS is evolving as an open intelligence platform where contributors can share ideas, integrations, and improvements.",
  },
  {
    q: "How can I collaborate with AMARIS?",
    a: "You can collaborate by submitting ideas, integrations, or partnership requests through the contact section.",
  },
  {
    q: "Does AMARIS support real-time insights?",
    a: "Yes. AMARIS is designed to provide real-time, context-aware responses for better decision making.",
  },
];

export default function FAQSection() {
  const [active, setActive] = useState(null);

  const toggle = (index) => {
    setActive(active === index ? null : index);
  };

  return (
    <section className="w-full py-20 px-6 md:px-20 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.25em] text-blue-500 uppercase">
            FAQs
          </p>

          <h2 className="mt-4 text-4xl md:text-5xl font-semibold text-slate-950">
            Frequently Asked Questions
          </h2>

          <p className="mt-4 text-slate-500 text-sm max-w-xl mx-auto">
            Everything you need to know about AMARIS and how it works.
          </p>
        </div>

        {/* FAQ LIST */}
        <div className="space-y-5">
          {faqs.map((item, index) => {
            const isOpen = active === index;

            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden
                ${
                  isOpen
                    ? "border-blue-500/40 shadow-[0_10px_40px_rgba(37,99,235,0.15)] bg-white"
                    : "border-slate-200 bg-white hover:shadow-md"
                }`}
              >
                {/* QUESTION */}
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span
                    className={`font-medium text-lg transition ${
                      isOpen ? "text-blue-600" : "text-slate-900"
                    }`}
                  >
                    {item.q}
                  </span>

                  <span
                    className={`transition ${
                      isOpen ? "text-blue-600 rotate-180" : "text-slate-400"
                    }`}
                  >
                    {isOpen ? <FiMinus /> : <FiPlus />}
                  </span>
                </button>

                {/* ANSWER */}
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    isOpen ? "max-h-40" : "max-h-0"
                  }`}
                >
                  <div className="px-6 pb-6">
                    {/* divider */}
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-200 to-transparent mb-4" />

                    <p className="text-slate-600 text-sm leading-relaxed bg-blue-50/60 p-4 rounded-xl border border-blue-100">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

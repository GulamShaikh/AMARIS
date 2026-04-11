// app/chat/page.jsx
"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import {
  FiUser,
  FiCloud,
  FiMapPin,
  FiGlobe,
  FiTrendingUp,
  FiBriefcase,
  FiSun,
  FiCloudRain,
  FiAlertCircle,
  FiArrowUp,
  FiMessageSquare,
} from "react-icons/fi";

export default function ChatPage() {
  const THEME = useMemo(
    () => ({
      bgTop: "#F7FAFF",
      bgBottom: "#EEF3FF",
      card: "rgba(255,255,255,0.92)",
      card2: "rgba(255,255,255,0.78)",
      border: "rgba(15,23,42,0.10)",
      borderSoft: "rgba(15,23,42,0.08)",
      text: "rgba(15,23,42,0.92)",
      subtext: "rgba(15,23,42,0.62)",
      accent1: "#2563EB",
      accent2: "#7C3AED",
      accent3: "#06B6D4",
    }),
    [],
  );

  const [messages, setMessages] = useState([
    {
      id: "m1",
      role: "assistant",
      content:
        "Hi! I’m your conversational AI. Choose a prompt below or type your question to begin.",
      ts: Date.now(),
    },
  ]);

  const [query, setQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef(null);

  const prompts = [
    {
      icon: <FiCloud className="text-slate-700/80" />,
      title: "Check current weather in my city",
      value:
        "Show me the current weather conditions, temperature, humidity, and wind speed for my location.",
    },
    {
      icon: <FiSun className="text-slate-700/80" />,
      title: "Get a 7-day weather forecast",
      value:
        "Provide a detailed 7-day weather forecast including temperature trends and chances of rain.",
    },
    {
      icon: <FiMapPin className="text-slate-700/80" />,
      title: "Compare weather between two cities",
      value:
        "Compare the current weather and forecast between Mumbai and Delhi with key differences.",
    },

    {
      icon: <FiGlobe className="text-slate-700/80" />,
      title: "Top global headlines today",
      value:
        "Summarize the top global news headlines today across technology, politics, and economy.",
    },
    {
      icon: <FiTrendingUp className="text-slate-700/80" />,
      title: "Latest tech news updates",
      value:
        "Give me the latest updates in technology including AI, startups, and product launches.",
    },
    {
      icon: <FiBriefcase className="text-slate-700/80" />,
      title: "Business and market insights",
      value:
        "Provide a summary of today's stock market trends and key business news highlights.",
    },
    {
      icon: <FiCloudRain className="text-slate-700/80" />,
      title: "Rain prediction and alerts",
      value:
        "Will it rain today or tomorrow in my area? Provide rain probability, timing, and alerts if any.",
    },
    {
      icon: <FiAlertCircle className="text-slate-700/80" />,
      title: "Breaking news alerts",
      value:
        "Show me the latest breaking news updates happening right now with brief summaries.",
    },
  ];

  // ================= LOCATION =================
  const [coords, setCoords] = useState(null);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
        () => console.log("Location denied — using fallback city"),
      );
    }
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);
  const sendMessage = async (text) => {
    const trimmed = (text ?? "").trim();
    if (!trimmed || isTyping) return;

    const userMsg = {
      id: `u-${crypto?.randomUUID?.() ?? Date.now()}`,
      role: "user",
      content: trimmed,
      ts: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setQuery("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: trimmed, coords }),
      });

      const data = await res.json();

      const assistantMsg = {
        id: `a-${crypto?.randomUUID?.() ?? Date.now() + 1}`,
        role: "assistant",
        type: data.type, // 🔥 important
        data: data, // 🔥 important
        content: data.content || "",
        ts: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          role: "assistant",
          content: "Error connecting to server.",
          ts: Date.now(),
        },
      ]);
    }

    setIsTyping(false);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(query);
    }
  };

  return (
    <main
      className="w-full h-[100dvh] overflow-hidden"
      style={{
        background: `
          radial-gradient(900px 420px at 15% 10%, ${THEME.accent3}18 0%, transparent 55%),
          radial-gradient(900px 420px at 85% 15%, ${THEME.accent2}14 0%, transparent 55%),
          radial-gradient(900px 420px at 50% 0%, ${THEME.accent1}14 0%, transparent 60%),
          linear-gradient(180deg, ${THEME.bgTop} 0%, ${THEME.bgBottom} 100%)
        `,
      }}
    >
      {/* Grid overlay */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.20]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,23,42,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* App Shell: header + content fill */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Content (fills remaining height) */}
        <section className="flex-1 px-4 md:px-6 py-5 min-h-0">
          <div className="h-full grid grid-cols-1 lg:grid-cols-12 gap-5 min-h-0">
            {/* Left panel */}
            <aside className="lg:col-span-4 xl:col-span-4 min-h-0">
              <div
                className="h-full rounded-3xl p-[1px] shadow-2xl"
                style={{
                  background: `linear-gradient(135deg, ${THEME.accent1}35, ${THEME.accent2}28, ${THEME.accent3}22)`,
                }}
              >
                <div
                  className="h-full rounded-3xl p-6 md:p-8 overflow-auto"
                  style={{
                    background: THEME.card,
                    border: `1px solid ${THEME.border}`,
                    backdropFilter: "blur(14px)",
                  }}
                >
                  <h1
                    className="text-2xl md:text-2xl font-semibold tracking-tight"
                    style={{ color: THEME.text }}
                  >
                    What would you like to know?
                  </h1>

                  <p
                    className="mt-3 text-xs md:text-base"
                    style={{ color: THEME.subtext }}
                  >
                    Use one of the common prompts below, or type your own
                    question to begin.
                  </p>

                  <div className="mt-6 grid grid-cols-1 gap-4">
                    {prompts.map((p, idx) => (
                      <button
                        key={idx}
                        onClick={() => setQuery(p.value)}
                        className="group text-left rounded-2xl p-4 transition-all duration-200 hover:-translate-y-1"
                        style={{
                          background: "rgba(255,255,255,0.75)",
                          border: `1px solid ${THEME.border}`,
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className="h-10 w-10 rounded-xl flex items-center justify-center"
                            style={{
                              background: "rgba(15,23,42,0.05)",
                              border: "1px solid rgba(15,23,42,0.08)",
                            }}
                          >
                            {p.icon}
                          </div>

                          <div className="flex-1">
                            <p
                              className="text-[15px] font-medium leading-snug"
                              style={{ color: THEME.text }}
                            >
                              {p.title}
                            </p>

                            <div
                              className="mt-3 h-[2px] w-0 group-hover:w-full transition-all duration-300 rounded-full"
                              style={{
                                background: `linear-gradient(90deg, ${THEME.accent1}, ${THEME.accent2})`,
                              }}
                            />
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Right panel (full height) */}
            <section className="lg:col-span-8 xl:col-span-8 min-h-0">
              <div
                className="h-full rounded-3xl flex flex-col overflow-hidden"
                style={{
                  background: THEME.card,
                  border: `1px solid ${THEME.border}`,
                  backdropFilter: "blur(14px)",
                }}
              >
                {/* Chat header */}
                <div
                  className="shrink-0 px-5 py-4 flex items-center justify-between"
                  style={{
                    borderBottom: `1px solid ${THEME.borderSoft}`,
                    background: "rgba(255,255,255,0.72)",
                  }}
                >
                  <div>
                    <p
                      className="font-semibold leading-none"
                      style={{ color: THEME.text }}
                    >
                      Conversation
                    </p>
                  </div>

                  <div
                    className="hidden md:flex items-center gap-2 text-xs"
                    style={{ color: THEME.subtext }}
                  >
                    <span className="inline-block h-2 w-2 rounded-full bg-emerald-500/80" />
                    Ready
                  </div>
                </div>

                {/* Messages (scroll area) */}
                <div className="flex-1 min-h-0 overflow-y-auto px-4 md:px-5 py-5">
                  <div className="space-y-4">
                    {messages.map((m) => (
                      <MessageBubble key={m.id} msg={m} theme={THEME} />
                    ))}

                    {isTyping && (
                      <div className="flex items-start gap-3">
                        <div
                          className="h-9 w-9 rounded-xl flex items-center justify-center"
                          style={{
                            background: `linear-gradient(135deg, ${THEME.accent1}20, ${THEME.accent2}14)`,
                            border: `1px solid ${THEME.borderSoft}`,
                          }}
                        >
                          <FiMessageSquare style={{ color: THEME.text }} />
                        </div>

                        <div
                          className="max-w-[85%] rounded-2xl px-4 py-3"
                          style={{
                            background: "rgba(15,23,42,0.04)",
                            border: `1px solid ${THEME.borderSoft}`,
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-slate-600/50 animate-pulse" />
                            <span className="h-2 w-2 rounded-full bg-slate-600/35 animate-pulse [animation-delay:120ms]" />
                            <span className="h-2 w-2 rounded-full bg-slate-600/25 animate-pulse [animation-delay:240ms]" />
                          </div>
                        </div>
                      </div>
                    )}

                    <div ref={endRef} />
                  </div>
                </div>

                {/* Input (fixed bottom) */}
                <div
                  className="shrink-0 px-4 md:px-5 py-4"
                  style={{
                    borderTop: `1px solid ${THEME.borderSoft}`,
                    background: "rgba(255,255,255,0.72)",
                  }}
                >
                  <div
                    className="flex items-end gap-3 rounded-2xl px-4 py-3"
                    style={{
                      background: "rgba(255,255,255,0.88)",
                      border: `1px solid ${THEME.borderSoft}`,
                    }}
                  >
                    <div className="flex-1">
                      <textarea
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={onKeyDown}
                        rows={1}
                        placeholder="Ask whatever you want"
                        className="w-full resize-none bg-transparent outline-none text-slate-900 placeholder:text-slate-500 text-sm md:text-base leading-relaxed"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => sendMessage(query)}
                      className="h-11 w-11 rounded-xl flex items-center justify-center transition hover:scale-[1.03] active:scale-[0.98]"
                      style={{
                        background: `linear-gradient(135deg, ${THEME.accent1}, ${THEME.accent2})`,
                        boxShadow: `0 12px 28px ${THEME.accent1}22`,
                        color: "white",
                      }}
                      aria-label="Send"
                    >
                      <FiArrowUp className="text-white text-lg" />
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}

function MessageBubble({ msg, theme }) {
  const isUser = msg.role === "user";

  // 🔥 WEATHER CARD
  if (msg.type === "weather") {
    return <WeatherCard data={msg.data} theme={theme} />;
  }

  // 🔥 NEWS CARD
  if (msg.type === "news") {
    return <NewsCard data={msg.data} theme={theme} />;
  }

  return (
    <div className={`flex items-start gap-3 ${isUser ? "justify-end" : ""}`}>
      {!isUser && (
        <div
          className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background: `linear-gradient(135deg, ${theme.accent1}18, ${theme.accent2}12)`,
            border: `1px solid ${theme.borderSoft}`,
          }}
        >
          <FiMessageSquare style={{ color: theme.text }} />
        </div>
      )}

      <div
        className="max-w-[88%] rounded-2xl px-4 py-3"
        style={{
          background: isUser
            ? `linear-gradient(135deg, ${theme.accent1}22, ${theme.accent2}16)`
            : "rgba(15,23,42,0.04)",
          border: `1px solid ${theme.borderSoft}`,
        }}
      >
        <p
          className="text-sm md:text-[15px] leading-relaxed whitespace-pre-wrap"
          style={{ color: theme.text }}
        >
          {msg.content}
        </p>

        <div className="mt-2 flex items-center justify-between gap-3">
          <span className="text-[10px]" style={{ color: theme.subtext }}>
            {isUser ? "You" : "AI"}
          </span>
          <span className="text-[10px]" style={{ color: theme.subtext }}>
            {new Date(msg.ts).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </span>
        </div>
      </div>

      {isUser && (
        <div
          className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background: "rgba(15,23,42,0.04)",
            border: `1px solid ${theme.borderSoft}`,
          }}
        >
          <FiUser style={{ color: theme.text }} />
        </div>
      )}
    </div>
  );
}
function WeatherCard({ data, theme }) {
  return (
    <div className="flex items-start gap-3">
      <div
        className="h-9 w-9 rounded-xl flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${theme.accent3}30, ${theme.accent1}20)`,
        }}
      >
        <FiCloud />
      </div>

      <div
        className="rounded-2xl px-5 py-4 w-full"
        style={{
          background: "rgba(15,23,42,0.04)",
          border: `1px solid ${theme.borderSoft}`,
        }}
      >
        <h3 className="font-semibold text-lg">{data.city}</h3>
        <p className="text-sm opacity-70">{data.condition}</p>

        <div className="mt-3 grid grid-cols-3 text-sm">
          <div>🌡 {data.temp}°C</div>
          <div>💧 {data.humidity}%</div>
          <div>🌬 {data.wind}</div>
        </div>
      </div>
    </div>
  );
}

function NewsCard({ data, theme }) {
  return (
    <div className="flex flex-col gap-3">
      {data.articles?.map((a, i) => (
        <div
          key={i}
          className="rounded-xl p-4 hover:scale-[1.01] transition"
          style={{
            background: "rgba(15,23,42,0.04)",
            border: `1px solid ${theme.borderSoft}`,
          }}
        >
          <p className="font-medium">{a.title}</p>

          <a
            href={a.url}
            target="_blank"
            className="text-sm text-blue-600 mt-2 inline-block"
          >
            Read more →
          </a>
        </div>
      ))}
    </div>
  );
}

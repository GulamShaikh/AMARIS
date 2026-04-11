"use client";

import { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔍 Search + Filters
  const [query, setQuery] = useState("technology");
  const [searchInput, setSearchInput] = useState("");
  const [country, setCountry] = useState("in");
  const [category, setCategory] = useState("top");

  // ================= FETCH FUNCTION =================
  const fetchNews = async () => {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams({
        apikey: process.env.NEXT_PUBLIC_NEWSDATA_API_KEY,
        q: query,
        country: country,
        category: category,
        language: "en",
      });

      const res = await fetch(`https://newsdata.io/api/1/latest?${params}`);

      const data = await res.json();

      if (data.status === "success" && Array.isArray(data.results)) {
        setNews(data.results);
      } else {
        setNews([]);
        setError(data?.message || data.results?.message || "No news found or invalid API key");
      }
    } catch (err) {
      setError("Failed to fetch news");
    } finally {
      setLoading(false);
    }
  };

  // ================= AUTO FETCH =================
  useEffect(() => {
    fetchNews();
  }, [query, country, category]);

  // ================= SEARCH HANDLER =================
  const handleSearch = () => {
    if (searchInput.trim() !== "") {
      setQuery(searchInput);
    }
  };

  return (
    <section className="min-h-screen px-6 md:px-16 py-10 bg-[#0f0f0f] text-white">
      {/* ================= HEADER ================= */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">News Dashboard</h1>
        <p className="text-gray-400 mt-2">Real-time global news with filters</p>
      </div>

      {/* ================= CONTROLS ================= */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* 🔍 SEARCH */}
        <div className="flex gap-2 w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search news..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] border border-gray-700 outline-none"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Search
          </button>
        </div>

        {/* 🌍 COUNTRY FILTER */}
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="px-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded-lg"
        >
          <option value="in">India</option>
          <option value="us">USA</option>
          <option value="gb">UK</option>
          <option value="au">Australia</option>
        </select>

        {/* 🏷️ CATEGORY FILTER */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded-lg"
        >
          <option value="top">Top</option>
          <option value="business">Business</option>
          <option value="technology">Technology</option>
          <option value="sports">Sports</option>
          <option value="entertainment">Entertainment</option>
          <option value="health">Health</option>
        </select>
      </div>

      {/* ================= STATES ================= */}
      {loading && <p className="text-gray-400">Loading news...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* ================= NEWS GRID ================= */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {news.map((item, index) => (
          <div
            key={index}
            className="bg-[#1a1a1a] rounded-xl overflow-hidden shadow-md hover:scale-[1.02] transition"
          >
            {item.image_url && (
              <img
                src={item.image_url}
                alt="news"
                className="w-full h-48 object-cover"
              />
            )}

            <div className="p-4 flex flex-col gap-2">
              <h2 className="text-lg font-semibold line-clamp-2">
                {item.title}
              </h2>

              <p className="text-sm text-gray-400 line-clamp-3">
                {item.description}
              </p>

              <div className="text-xs text-gray-500 flex justify-between mt-2">
                <span>{item.source_id}</span>
                <span>{new Date(item.pubDate).toLocaleDateString()}</span>
              </div>

              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 text-blue-400 text-sm hover:underline flex items-center gap-1"
              >
                Read More
                <FiArrowRight className="text-sm" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

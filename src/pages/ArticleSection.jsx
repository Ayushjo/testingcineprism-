"use client";

import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  User,
  Search,
  Eye,
} from "lucide-react";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";
import AdSense from "@/components/Adsense";
// Article Cards with Focus (Blur effect)
const ArticleCardsWithFocus = ({ filteredArticles }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  // Insert ads every N articles (e.g., every 4 articles = one ad per ~screen)
  const articlesPerAd = 4;
  const itemsWithAds = [];

  filteredArticles.forEach((article, index) => {
    itemsWithAds.push({ type: "article", data: article, index });

    // Add ad after every articlesPerAd articles (but not after the last one)
    if (
      (index + 1) % articlesPerAd === 0 &&
      index < filteredArticles.length - 1
    ) {
      itemsWithAds.push({ type: "ad", index: `ad-${index}` });
    }
  });

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {itemsWithAds.map((item, displayIndex) => {
          if (item.type === "ad") {
            return (
              <motion.div
                key={item.index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: displayIndex * 0.1 }}
                className="col-span-1 lg:col-span-2 flex items-center justify-center py-8"
              >
                <div className="w-full max-w-4xl">
                  <AdSense adSlot="8224310579" />
                </div>
              </motion.div>
            );
          }

          // Original article card code
          const article = item.data;
          const index = item.index;

          return (
            <motion.article
              key={article.id || article.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity:
                  hoveredCard !== null && hoveredCard !== index ? 0.3 : 1,
                scale: hoveredCard === index ? 1.02 : 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: displayIndex * 0.1,
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 },
              }}
              whileHover={{ y: -8 }}
              onMouseEnter={() => {
                setHoveredCard(index);
              }}
              onMouseLeave={() => {
                setHoveredCard(null);
              }}
              onClick={() => navigate(`/articles/${article.slug}`)}
              className="group relative aspect-[5/4] sm:aspect-[4/3] lg:aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-visible cursor-pointer"
              style={{
                filter:
                  hoveredCard !== null && hoveredCard !== index
                    ? "blur(2px)"
                    : "blur(0px)",
                transition: "filter 0.3s ease-in-out",
              }}
            >
              <div className="absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden">
                <img
                  src={article.mainImageUrl || "/placeholder.svg"}
                  alt={article.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src =
                      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMUUyOTNGIi8+CjxwYXRoIGQ9Ik0xNzUgMTIwSDE3MFYxNjBIMTc1VjEyMFpNMjMwIDEyMEgyMjVWMTYwSDIzMFYxMjBaTTIwMCAxODBDMTgzLjQzMiAxODAgMTcwIDE2Ni41NjggMTcwIDE1MEMxNzAgMTMzLjQzMiAxODMuNDMyIDEyMCAyMDAgMTIwQzIxNi41NjggMTIwIDIzMCAxMzMuNDMyIDIzMCAxNTBDMjMwIDE2Ni41NjggMjE2LjU2OCAxODAgMjAwIDE4MFoiIGZpbGw9IiM0RjQ2RTUiLz4KPHBhdGggZD0iTTIwMCAxNDBDMjA4LjI4NCAxNDAgMjE1IDE0Ni43MTYgMjE1IDE1NUMyMTUgMTYzLjI4NCAyMDguMjg0IDE3MCAyMDAgMTcwQzE5MS43MTYgMTcwIDE4NSAxNjMuMjg0IDE4NSAxNTVDMTg1IDE0Ni43MTYgMTkxLjcxNiAxNDAgMjAwIDE0MFoiIGZpbGw9IiM5QTgyRkIiLz4KPC9zdmc+";
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 sm:from-black/80 sm:via-black/40 sm:to-transparent" />

                <div className="relative h-full flex flex-col justify-end p-5 sm:p-6 lg:p-8">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-2 tracking-tight group-hover:text-emerald-300 transition-colors duration-300 leading-tight">
                      {article.title}
                    </h2>
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </>
  );
};

export default function ArticlesPage() {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token =
    localStorage.getItem("cineprism_auth_token") ||
    sessionStorage.getItem("cineprism_auth_token");

  // API call to fetch articles
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://api.thecineprism.com/api/v1/articles/get-articles",
          {
            withCredentials: true,
            headers: {
              Authorization: token ? `Bearer ${token}` : undefined,
              "Content-Type": "application/json",
            },
          }
        );

        const data = response.data;
        if (data.articles) {
          setArticles(data.articles);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
        setError("Failed to load articles. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [token]);

  // Filter articles
  const filteredArticles = useMemo(() => {
    let filtered = articles;

    // Filter by search term
    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.author.toLowerCase().includes(query) ||
          article.shortDescription.toLowerCase().includes(query)
      );
    }

    // Sort by newest first (default)
    filtered.sort((a, b) => {
      return (
        new Date(b.publishedAt || b.createdAt) -
        new Date(a.publishedAt || a.createdAt)
      );
    });

    return filtered;
  }, [articles, searchTerm]);


  // Loading state
  if (isLoading) {
    return (
      <div className={`min-h-screen pt-20 flex items-center justify-center transition-colors duration-300 ${
        theme === "light" ? "bg-white text-black" : "bg-slate-950 text-white"
      }`}>
        <div className="text-center">
          <div className={`w-12 h-12 border-4 rounded-full animate-spin mx-auto mb-4 ${
            theme === "light"
              ? "border-gray-300 border-t-black"
              : "border-emerald-500/30 border-t-emerald-500"
          }`} />
          <p className={`text-lg ${theme === "light" ? "text-gray-600" : "text-slate-400"}`}>Loading articles...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={`min-h-screen pt-20 flex items-center justify-center transition-colors duration-300 ${
        theme === "light" ? "bg-white text-black" : "bg-slate-950 text-white"
      }`}>
        <div className="text-center">
          <div className={`border rounded-2xl p-8 max-w-md mx-auto ${
            theme === "light"
              ? "bg-red-50 border-red-300"
              : "bg-red-500/10 border-red-500/30"
          }`}>
            <h3 className={`text-2xl font-bold mb-4 ${
              theme === "light" ? "text-red-700" : "text-red-400"
            }`}>Error</h3>
            <p className={`mb-6 ${theme === "light" ? "text-gray-700" : "text-slate-400"}`}>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                theme === "light"
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-gradient-to-r from-red-500/80 to-red-600/80 hover:from-red-500 hover:to-red-600 text-white"
              }`}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-20 transition-colors duration-300 ${
      theme === "light" ? "bg-white text-black" : "bg-slate-950 text-white"
    }`}>
      {/* Ambient Background */}
      <div className="absolute inset-0 opacity-20">
        {theme === "light" ? (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(0,0,0,0.03),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(0,0,0,0.03),transparent_50%)]" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(16,185,129,0.03),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(139,92,246,0.03),transparent_50%)]" />
          </>
        )}
      </div>

      {/* Header Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-block mb-6">
              <span className={`backdrop-blur-xl px-4 py-2 rounded-2xl text-sm font-semibold border-2 shadow-md ${
                theme === "light"
                  ? "bg-gray-100 text-black border-black/40"
                  : "bg-white/5 text-emerald-400 border-white/10"
              }`}>
                📰 All Articles
              </span>
            </div>
            <h1 className={`text-5xl md:text-7xl font-black mb-6 bg-clip-text text-transparent tracking-tight ${
              theme === "light"
                ? "bg-gradient-to-r from-black via-gray-800 to-gray-600"
                : "bg-gradient-to-r from-white via-slate-200 to-slate-400"
            }`}>
              Articles
            </h1>
            <p className={`text-xl max-w-2xl mx-auto leading-relaxed ${
              theme === "light" ? "text-black/70" : "text-slate-400"
            }`}>
              Dive deep into the world of cinema with our latest insights and
              stories.
            </p>
          </motion.div>

          {/* Search Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            {/* Search Bar */}
            <div className="relative">
              <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 z-10 ${
                theme === "light" ? "text-gray-600" : "text-slate-400"
              }`} />
              <input
                type="text"
                placeholder="Search articles by title, author, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-12 pr-4 py-3 sm:py-4 backdrop-blur-xl border rounded-xl transition-all duration-300 text-sm sm:text-base focus:outline-none ${
                  theme === "light"
                    ? "bg-gray-100/70 border-gray-300 text-black placeholder-gray-500 focus:border-black focus:bg-gray-100"
                    : "bg-white/5 border-white/10 text-white placeholder-slate-400 focus:border-emerald-400/50 focus:bg-white/10"
                }`}
              />
            </div>
          </motion.div>

          {/* Results Summary */}
          {searchTerm && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 text-center"
            >
              <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-slate-400"}`}>
                {filteredArticles.length > 0
                  ? `Found ${filteredArticles.length} article${
                      filteredArticles.length !== 1 ? "s" : ""
                    }`
                  : "No articles found"}
                {searchTerm && ` matching "${searchTerm}"`}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="pb-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredArticles.length > 0 ? (
            <ArticleCardsWithFocus filteredArticles={filteredArticles} />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <div className={`text-lg ${theme === "light" ? "text-gray-600" : "text-slate-400"}`}>
                {searchTerm
                  ? "No articles found matching your search."
                  : "No articles available."}
              </div>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className={`mt-4 transition-colors duration-200 text-sm underline ${
                    theme === "light"
                      ? "text-black hover:text-gray-700"
                      : "text-emerald-400 hover:text-emerald-300"
                  }`}
                >
                  Clear search and show all articles
                </button>
              )}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}

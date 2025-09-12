"use client";

import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  User,
  Search,
  Filter,
  ArrowRight,
  ChevronDown,
  Eye,
} from "lucide-react";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Article Cards with Focus (Blur effect)
const ArticleCardsWithFocus = ({ filteredArticles }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredArticles.map((article, index) => (
          <motion.article
            key={article.id || article.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: hoveredCard !== null && hoveredCard !== index ? 0.3 : 1,
              scale: hoveredCard === index ? 1.02 : 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
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

                  {/* Updated metadata line with integrated view count */}
                  <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-2 text-xs sm:text-sm text-slate-300 mb-3 sm:mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span>
                        {new Date(
                          article.publishedAt || article.createdAt
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>

                    <span className="text-slate-500">•</span>

                    <div className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span className="truncate">{article.author}</span>
                    </div>

                    <span className="text-slate-500">•</span>

                    <div className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span>
                        {article.viewCount >= 1000
                          ? `${(article.viewCount / 1000).toFixed(1)}k`
                          : article.viewCount}{" "}
                        views
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-300 leading-relaxed mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-2 text-sm sm:text-base">
                    {article.shortDescription}
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className="group/btn inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold transition-all duration-300 text-sm sm:text-base"
                  >
                    Read Full Article
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </>
  );
};

export default function ArticlesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token =
    localStorage.getItem("cineprism_auth_token") ||
    sessionStorage.getItem("cineprism_auth_token");

  // Status filter options
  const statusOptions = [
    { key: "all", label: "All Articles" },
    { key: "published", label: "Published" },
    { key: "draft", label: "Drafts" },
  ];

  // Sort options
  const sortOptions = [
    { key: "newest", label: "Newest First" },
    { key: "oldest", label: "Oldest First" },
    { key: "title", label: "A-Z" },
    { key: "views", label: "Most Viewed" },
  ];

  // API call to fetch articles
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://testingcineprismbackend-production.up.railway.app/api/v1/articles/get-articles",
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

  // Filter and sort articles
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

    // Filter by status
    if (selectedStatus !== "all") {
      filtered = filtered.filter((article) => {
        if (selectedStatus === "published") {
          return article.published;
        } else if (selectedStatus === "draft") {
          return !article.published;
        }
        return true;
      });
    }

    // Sort articles
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.publishedAt || b.createdAt) -
            new Date(a.publishedAt || a.createdAt)
          );
        case "oldest":
          return (
            new Date(a.publishedAt || a.createdAt) -
            new Date(b.publishedAt || b.createdAt)
          );
        case "title":
          return a.title.localeCompare(b.title);
        case "views":
          return b.viewCount - a.viewCount;
        default:
          return 0;
      }
    });

    return filtered;
  }, [articles, searchTerm, selectedStatus, sortBy]);

  const handleStatusSelect = (statusKey) => {
    setSelectedStatus(statusKey);
  };

  const handleSortSelect = (sortKey) => {
    setSortBy(sortKey);
  };

  const activeStatusLabel =
    statusOptions.find((s) => s.key === selectedStatus)?.label ||
    "All Articles";
  const activeSortLabel =
    sortOptions.find((s) => s.key === sortBy)?.label || "Newest First";

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400 text-lg">Loading articles...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 text-white pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8 max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-red-400 mb-4">Error</h3>
            <p className="text-slate-400 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-red-500/80 to-red-600/80 hover:from-red-500 hover:to-red-600 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-20">
      {/* Ambient Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(16,185,129,0.03),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(139,92,246,0.03),transparent_50%)]" />
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
              <span className="bg-white/5 backdrop-blur-xl text-emerald-400 px-4 py-2 rounded-2xl text-sm font-semibold border border-white/10">
                📰 All Articles
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent tracking-tight">
              Articles
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Dive deep into the world of cinema with our latest insights and
              stories.
            </p>
          </motion.div>

          {/* Search and Filter Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col lg:flex-row gap-4 max-w-6xl mx-auto"
          >
            {/* Search Bar */}
            <div className="flex-1 max-w-4xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles by title, author, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400/50 focus:bg-white/10 transition-all duration-300"
              />
            </div>

            {/* Status Filter Dropdown */}
            <div className="flex justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center justify-between gap-3 px-6 py-4 min-w-[200px] rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-white hover:bg-white/10 hover:border-emerald-500/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span className="font-medium">{activeStatusLabel}</span>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-slate-900/98 border-white/10 backdrop-blur-xl">
                  <DropdownMenuLabel className="text-slate-300 font-semibold px-4 py-2">
                    Filter by Status
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  {statusOptions.map((status) => (
                    <DropdownMenuItem
                      key={status.key}
                      onClick={() => handleStatusSelect(status.key)}
                      className={`cursor-pointer transition-colors px-4 py-3 ${
                        selectedStatus === status.key
                          ? "bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 focus:bg-emerald-500/30"
                          : "text-slate-300 hover:text-emerald-200 hover:bg-emerald-500/10 focus:bg-emerald-500/10 focus:text-emerald-200"
                      }`}
                    >
                      {status.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Sort Options Dropdown */}
            <div className="flex justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center justify-between gap-3 px-6 py-4 min-w-[180px] rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-white hover:bg-white/10 hover:border-emerald-500/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50">
                  <span className="font-medium">{activeSortLabel}</span>
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-slate-900/98 border-white/10 backdrop-blur-xl">
                  <DropdownMenuLabel className="text-slate-300 font-semibold px-4 py-2">
                    Sort By
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  {sortOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.key}
                      onClick={() => handleSortSelect(option.key)}
                      className={`cursor-pointer transition-colors px-4 py-3 ${
                        sortBy === option.key
                          ? "bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 focus:bg-emerald-500/30"
                          : "text-slate-300 hover:text-emerald-200 hover:bg-emerald-500/10 focus:bg-emerald-500/10 focus:text-emerald-200"
                      }`}
                    >
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </motion.div>

          {/* Results Summary */}
          {(searchTerm || selectedStatus !== "all") && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 text-center"
            >
              <p className="text-slate-400 text-sm">
                {filteredArticles.length > 0
                  ? `Found ${filteredArticles.length} article${
                      filteredArticles.length !== 1 ? "s" : ""
                    }`
                  : "No articles found"}
                {searchTerm && ` matching "${searchTerm}"`}
                {selectedStatus !== "all" && ` in ${activeStatusLabel}`}
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
              <div className="text-slate-400 text-lg">
                {searchTerm || selectedStatus !== "all"
                  ? "No articles found matching your criteria."
                  : "No articles available."}
              </div>
              {(searchTerm || selectedStatus !== "all") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedStatus("all");
                  }}
                  className="mt-4 text-emerald-400 hover:text-emerald-300 transition-colors duration-200 text-sm underline"
                >
                  Clear filters and show all articles
                </button>
              )}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}

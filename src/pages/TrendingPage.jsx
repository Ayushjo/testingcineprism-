"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Star,
  TrendingUp,
  ExternalLink,
  Calendar,
  User,
  Clock,
  Newspaper,
} from "lucide-react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import axios from "axios";
import MovieDetailsModal from "../components/MovieDetailsModal"; // Adjust path as needed
import { useTheme } from "../context/ThemeContext";


const tabs = [
  { id: "movies", name: "Movies", icon: TrendingUp },
  { id: "news", name: "News", icon: Newspaper },
];

export default function TrendingPage() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("movies");
  const [trendingMoviesData, setTrendingMoviesData] = useState([]);
  const [trendingNewsData, setTrendingNewsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showMovieModal, setShowMovieModal] = useState(false);

  // Fetch trending movies from API
  const fetchTrendingMovies = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "https://testingcineprismbackend-production.up.railway.app/api/v1/movies"
      );
      if (response.data.success) {
        setTrendingMoviesData(response.data.data);
      } else {
        setError("Failed to fetch trending movies");
      }
    } catch (err) {
      console.error("Error fetching trending movies:", err);
      setError("Failed to fetch trending movies");
    } finally {
      setLoading(false);
    }
  };

  // Fetch trending news from API
  const fetchTrendingNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "https://testingcineprismbackend-production.up.railway.app/api/v1/news"
      );
      if (response.data.success) {
        setTrendingNewsData(response.data.data);
      } else {
        setError("Failed to fetch trending news");
      }
    } catch (err) {
      console.error("Error fetching trending news:", err);
      setError("Failed to fetch trending news");
    } finally {
      setLoading(false);
    }
  };

  // Handle URL parameters for tab selection
  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl && ['movies', 'news'].includes(tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams]);

  // Fetch data when component mounts or when tab is selected
  useEffect(() => {
    if (activeTab === "movies") {
      fetchTrendingMovies();
    } else if (activeTab === "news") {
      fetchTrendingNews();
    }
  }, [activeTab]);

  const handleNewsClick = (article, index) => {
    sessionStorage.setItem(
      "currentArticle",
      JSON.stringify({
        ...article,
        id: index + 1,
      })
    );
    navigate(`/news/${index + 1}`);
  };


  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setShowMovieModal(true);
  };

  const closeMovieModal = () => {
    setShowMovieModal(false);
    setSelectedMovie(null);
  };

  const renderMovieCard = (movie, index) => (
    <motion.div
      key={movie.tmdb_id}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, x: [0, 5, 10] }}
      onClick={() => handleMovieClick(movie)}
      className={`group relative backdrop-blur-xl border-2 rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
        theme === "light"
          ? "bg-gray-100 border-black/40 hover:bg-gray-200 hover:border-black/60 hover:shadow-black/10"
          : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-emerald-500/10"
      }`}
    >
      <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
        {/* Rank Number */}
        <div className="flex-shrink-0">
          <span className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black transition-colors duration-300 tracking-tighter leading-none ${
            theme === "light"
              ? "text-black/20 group-hover:text-black/40"
              : "text-white/20 group-hover:text-emerald-400/40"
          }`}>
            {String(movie.trending_rank || index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Movie Poster */}
        <div className="flex-shrink-0">
          <div className="w-10 h-14 sm:w-12 sm:h-18 md:w-16 md:h-24 rounded-lg sm:rounded-xl overflow-hidden shadow-lg">
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "/placeholder.svg"
              }
              alt={movie.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Movie Info - Flexible Layout */}
        <div className="flex-1 min-w-0 pr-2 sm:pr-0">
          <h3 className={`text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-1 tracking-tight transition-colors duration-300 line-clamp-2 sm:line-clamp-1 ${
            theme === "light"
              ? "text-black group-hover:text-gray-700"
              : "text-white group-hover:text-emerald-300"
          }`}>
            {movie.title}
          </h3>
          <p className={`text-xs sm:text-sm leading-relaxed line-clamp-2 md:line-clamp-2 hidden sm:block ${
            theme === "light" ? "text-black/70" : "text-slate-400"
          }`}>
            {movie.overview || "Most viewed this week"}
          </p>
        </div>
      </div>

      {/* Mobile: Description below (optional) */}
      <div className="mt-2 sm:hidden">
        <p className={`text-xs line-clamp-2 leading-relaxed ${
          theme === "light" ? "text-black/70" : "text-slate-400"
        }`}>
          {movie.overview || "Most viewed this week"}
        </p>
      </div>

      <div className={`absolute inset-0 bg-gradient-to-r via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl sm:rounded-3xl ${
        theme === "light"
          ? "from-gray-400/5 to-gray-400/5"
          : "from-emerald-500/5 to-purple-500/5"
      }`} />
    </motion.div>
  );

  // Enhanced newspaper-style news card
  const renderNewsCard = (article, index) => {
    const isHeadline = index < 3; // First 3 articles are treated as headlines
    const isMainStory = index === 0; // First article is the main story

    return (
      <motion.article
        key={article.id || index}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.05 }}
        onClick={() => handleNewsClick(article, index)}
        className={`group cursor-pointer transition-all duration-300 hover:scale-[1.01] ${
          isMainStory
            ? "col-span-full md:col-span-2 row-span-2"
            : isHeadline
            ? "col-span-full sm:col-span-1"
            : "col-span-full"
        }`}
      >
        {/* Main Story Layout (First Article) */}
        {isMainStory && (
          <div className={`relative backdrop-blur-xl border-l-4 rounded-r-2xl p-6 md:p-8 transition-all duration-300 min-h-[400px] flex flex-col ${
            theme === "light"
              ? "bg-gray-100 border-[#8B4513] hover:bg-gray-200 hover:border-[#654321]"
              : "bg-white/5 border-emerald-400 hover:bg-white/8 hover:border-emerald-300"
          }`}>
            {/* Breaking News Badge */}
            <div className="absolute -left-1 top-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-r-md shadow-lg">
              BREAKING
            </div>

            <div className="flex flex-col h-full">
              {/* Category & Date */}
              <div className="flex items-center gap-3 mb-4 text-xs">
                <span className={`px-2 py-1 rounded-md font-semibold ${
                  theme === "light"
                    ? "bg-[#8B4513]/20 text-[#654321]"
                    : "bg-emerald-400/20 text-emerald-300"
                }`}>
                  CINEMA NEWS
                </span>
                <div className={`flex items-center gap-1 ${
                  theme === "light" ? "text-gray-600" : "text-slate-400"
                }`}>
                  <Calendar className="w-3 h-3" />
                  <span>
                    {new Date(
                      article.published_at || article.created_at
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Main Image */}
              {article.image_url && (
                <div className="w-full h-48 md:h-64 rounded-xl overflow-hidden mb-4 shadow-lg">
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}

              {/* Main Headline */}
              <h1 className={`text-2xl md:text-3xl lg:text-4xl font-black leading-tight mb-4 transition-colors duration-300 ${
                theme === "light"
                  ? "text-black group-hover:text-[#8B4513]"
                  : "text-white group-hover:text-emerald-300"
              }`}>
                {article.title}
              </h1>

              {/* Lead Paragraph */}
              <p className={`text-base md:text-lg leading-relaxed mb-4 flex-grow line-clamp-4 ${
                theme === "light" ? "text-gray-700" : "text-slate-300"
              }`}>
                {article.description || article.content}
              </p>

              {/* Byline */}
              <div className={`flex items-center justify-between text-sm pt-4 border-t ${
                theme === "light"
                  ? "text-gray-600 border-gray-300"
                  : "text-slate-400 border-white/10"
              }`}>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className={`font-medium ${
                    theme === "light" ? "text-[#8B4513]" : "text-emerald-300"
                  }`}>
                    {article.source_name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>5 min read</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Headline Stories Layout (Articles 2-3) */}
        {isHeadline && !isMainStory && (
          <div className={`relative backdrop-blur-xl border rounded-xl p-4 md:p-6 transition-all duration-300 min-h-[300px] flex flex-col ${
            theme === "light"
              ? "bg-gray-50 border-gray-300 hover:bg-gray-100 hover:border-gray-400"
              : "bg-white/3 border-white/10 hover:bg-white/6 hover:border-white/20"
          }`}>
            {/* Category */}
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-2 h-2 rounded-full ${
                theme === "light" ? "bg-[#8B4513]" : "bg-emerald-400"
              }`}></div>
              <span className={`text-xs font-semibold tracking-wide ${
                theme === "light" ? "text-[#654321]" : "text-emerald-300"
              }`}>
                TOP STORY
              </span>
            </div>

            {/* Image */}
            {article.image_url && (
              <div className="w-full h-32 md:h-40 rounded-lg overflow-hidden mb-4 shadow-md">
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}

            {/* Title */}
            <h2 className={`text-lg md:text-xl font-bold leading-tight mb-3 transition-colors duration-300 line-clamp-3 flex-grow ${
              theme === "light"
                ? "text-black group-hover:text-[#8B4513]"
                : "text-white group-hover:text-emerald-300"
            }`}>
              {article.title}
            </h2>

            {/* Meta Info */}
            <div className={`flex items-center justify-between text-xs mt-auto pt-3 border-t ${
              theme === "light"
                ? "text-gray-600 border-gray-200"
                : "text-slate-400 border-white/5"
            }`}>
              <span className={`font-medium ${
                theme === "light" ? "text-[#8B4513]" : "text-emerald-300"
              }`}>
                {article.source_name}
              </span>
              <span>
                {new Date(
                  article.published_at || article.created_at
                ).toLocaleDateString()}
              </span>
            </div>
          </div>
        )}

        {/* Regular Articles Layout (Articles 4+) */}
        {!isHeadline && (
          <div className={`relative backdrop-blur-xl border-b p-4 md:p-5 transition-all duration-300 group ${
            theme === "light"
              ? "bg-white/80 border-gray-200 hover:bg-gray-50"
              : "bg-white/2 border-white/10 hover:bg-white/4"
          }`}>
            <div className="flex gap-4 md:gap-6">
              {/* Article Number */}
              <div className="flex-shrink-0 pt-1">
                <span className={`text-xl md:text-2xl font-black transition-colors duration-300 font-mono ${
                  theme === "light"
                    ? "text-black/20 group-hover:text-[#8B4513]/40"
                    : "text-white/20 group-hover:text-emerald-400/40"
                }`}>
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Category Tag */}
                <div className="flex items-center gap-2 mb-2">
                  <ExternalLink className={`w-3 h-3 ${
                    theme === "light" ? "text-gray-500" : "text-slate-500"
                  }`} />
                  <span className={`text-xs font-medium tracking-wide ${
                    theme === "light" ? "text-gray-600" : "text-slate-500"
                  }`}>
                    {article.source_name}
                  </span>
                  <span className={`text-xs ${
                    theme === "light" ? "text-gray-400" : "text-slate-600"
                  }`}>•</span>
                  <span className={`text-xs ${
                    theme === "light" ? "text-gray-500" : "text-slate-600"
                  }`}>
                    {new Date(
                      article.published_at || article.created_at
                    ).toLocaleDateString()}
                  </span>
                </div>

                {/* Title */}
                <h3 className={`text-base md:text-lg font-bold mb-2 leading-tight transition-colors duration-300 line-clamp-2 ${
                  theme === "light"
                    ? "text-black group-hover:text-[#8B4513]"
                    : "text-white group-hover:text-emerald-300"
                }`}>
                  {article.title}
                </h3>

                {/* Description */}
                <p className={`text-sm leading-relaxed line-clamp-2 hidden sm:block ${
                  theme === "light" ? "text-gray-600" : "text-slate-400"
                }`}>
                  {article.description || article.content}
                </p>
              </div>

              {/* Thumbnail */}
              {article.image_url && (
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden shadow-md">
                    <img
                      src={article.image_url}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Mobile description */}
            <div className="mt-3 sm:hidden">
              <p className={`text-sm leading-relaxed line-clamp-2 ${
                theme === "light" ? "text-gray-600" : "text-slate-400"
              }`}>
                {article.description || article.content}
              </p>
            </div>
          </div>
        )}
      </motion.article>
    );
  };


  const getCurrentData = () => {
    switch (activeTab) {
      case "movies":
        return trendingMoviesData;
      case "news":
        return trendingNewsData;
      default:
        return trendingMoviesData;
    }
  };

  const getRetryFunction = () => {
    switch (activeTab) {
      case "movies":
        return fetchTrendingMovies;
      case "news":
        return fetchTrendingNews;
      default:
        return fetchTrendingMovies;
    }
  };

  const renderCurrentContent = () => {
    const data = getCurrentData();
    const currentTabName =
      tabs.find((tab) => tab.id === activeTab)?.name || "content";

    // Show loading state
    if ((activeTab === "movies" || activeTab === "news") && loading) {
      return (
        <div className="flex justify-center items-center py-12 sm:py-20">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-emerald-400"></div>
        </div>
      );
    }

    // Show error state
    if ((activeTab === "movies" || activeTab === "news") && error) {
      return (
        <div className="flex justify-center items-center py-12 sm:py-20">
          <div className="text-center px-4">
            <p className="text-red-400 mb-4 text-sm sm:text-base">{error}</p>
            <button
              onClick={getRetryFunction()}
              className={`px-4 py-2 rounded-2xl border transition-all text-sm sm:text-base ${
                theme === "light"
                  ? "bg-red-200/50 text-red-600 border-red-600/30 hover:bg-red-300/50"
                  : "bg-emerald-500/20 text-emerald-300 border-emerald-400/30 hover:bg-emerald-500/30"
              }`}
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    // Show empty state
    if (
      (activeTab === "movies" || activeTab === "news") &&
      data.length === 0 &&
      !loading
    ) {
      return (
        <div className="flex justify-center items-center py-12 sm:py-20">
          <p className={`text-sm sm:text-base ${
            theme === "light" ? "text-black/70" : "text-slate-400"
          }`}>
            No trending {currentTabName.toLowerCase()} available
          </p>
        </div>
      );
    }

    switch (activeTab) {
      case "movies":
        return (
          <div className="space-y-3 sm:space-y-4">
            {data.map((movie, index) => renderMovieCard(movie, index))}
          </div>
        );
      case "news":
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {data.map((article, index) => renderNewsCard(article, index))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b pt-4 sm:pt-6 md:pt-8 relative overflow-hidden transition-colors duration-300 ${
      theme === "light"
        ? "from-gray-50 to-white"
        : "from-slate-950 to-slate-900"
    }`}>
      <div className="absolute inset-0 opacity-20">
        <div className={`absolute inset-0 ${
          theme === "light"
            ? "bg-[radial-gradient(circle_at_30%_40%,rgba(0,0,0,0.03),transparent_50%)]"
            : "bg-[radial-gradient(circle_at_30%_40%,rgba(139,92,246,0.05),transparent_50%)]"
        }`} />
        <div className={`absolute inset-0 ${
          theme === "light"
            ? "bg-[radial-gradient(circle_at_70%_60%,rgba(0,0,0,0.02),transparent_50%)]"
            : "bg-[radial-gradient(circle_at_70%_60%,rgba(16,185,129,0.05),transparent_50%)]"
        }`} />
        <div className={`absolute inset-0 ${
          theme === "light"
            ? "bg-[radial-gradient(circle_at_50%_80%,rgba(0,0,0,0.01),transparent_50%)]"
            : "bg-[radial-gradient(circle_at_50%_80%,rgba(236,72,153,0.03),transparent_50%)]"
        }`} />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className={`absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl ${
            theme === "light" ? "bg-gray-300/8" : "bg-purple-500/5"
          }`}
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className={`absolute top-3/4 right-1/4 w-96 h-96 rounded-full blur-3xl ${
            theme === "light" ? "bg-gray-200/8" : "bg-emerald-500/5"
          }`}
        />
      </div>

      <main className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-8 relative py-6 sm:py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <div className="inline-block mb-4 sm:mb-6 pt-12 sm:pt-0">
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`backdrop-blur-xl px-3 sm:px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold border-2 flex items-center gap-2 shadow-md ${
                theme === "light"
                  ? "bg-gray-100 text-black border-black/40"
                  : "bg-white/5 text-emerald-400 border-white/10"
              }`}
            >
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
              Live Updates
            </motion.span>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 sm:mb-6 bg-clip-text text-transparent tracking-tight px-4 ${
              theme === "light"
                ? "bg-gradient-to-r from-black via-gray-800 to-gray-600"
                : "bg-gradient-to-r from-white via-slate-200 to-slate-400"
            }`}
          >
            Trending Now
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed px-4 ${
              theme === "light" ? "text-black/70" : "text-slate-400"
            }`}
          >
            The most popular movies our community can't stop talking about
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 px-4"
        >
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-2xl font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center gap-1 sm:gap-2 border-2 ${
                  activeTab === tab.id
                    ? theme === "light"
                      ? "bg-black text-white border-black shadow-lg shadow-black/10"
                      : "bg-emerald-500/20 text-emerald-300 border-emerald-400/30 shadow-lg shadow-emerald-500/10"
                    : theme === "light"
                    ? "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 hover:text-black hover:border-black/40"
                    : "bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20"
                }`}
              >
                <IconComponent className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline sm:inline">{tab.name}</span>
              </motion.button>
            );
          })}
        </motion.div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {renderCurrentContent()}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <div className={`inline-flex items-center gap-2 text-xs sm:text-sm ${
            theme === "light" ? "text-gray-500" : "text-slate-500"
          }`}>
            <div className={`w-6 sm:w-8 h-px ${
              theme === "light"
                ? "bg-gradient-to-r from-transparent to-gray-400"
                : "bg-gradient-to-r from-transparent to-slate-500"
            }`} />
            <span>Updated every hour</span>
            <div className={`w-6 sm:w-8 h-px ${
              theme === "light"
                ? "bg-gradient-to-l from-transparent to-gray-400"
                : "bg-gradient-to-l from-transparent to-slate-500"
            }`} />
          </div>
        </motion.div>
      </main>

      {/* Movie Details Modal */}
      {showMovieModal && (
        <MovieDetailsModal movie={selectedMovie} onClose={closeMovieModal} />
      )}
    </div>
  );
}

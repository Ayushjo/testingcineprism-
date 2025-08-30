"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Star,
  TrendingUp,
  MessageSquare,
  Lightbulb,
  ExternalLink,
  Calendar,
  User,
  Clock,
  Newspaper,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MovieDetailsModal from "../components/MovieDetailsModal"; // Adjust path as needed

const aiInsightsData = [
  {
    id: "ai-1",
    title:
      "The Rise of the Anti-Hero: Why Are Audiences Rooting for the Bad Guy?",
    content:
      "Recent years have shown a significant rise in the popularity of anti-heroes, from comic book villains to morally gray protagonists in streaming dramas. AI analysis of 1.2M tweets and 500+ box office reports highlights that audiences resonate more with flawed characters who mirror real-world struggles. This trend suggests viewers are moving away from black-and-white morality tales in favor of stories that challenge their empathy and ethical boundaries.",
    content_type: "analysis",
    prompt_used:
      "Analyze cultural and box office trends to explain the popularity of anti-heroes.",
    status: "active",
    view_count: 5230,
    engagement_score: 8.2,
    expires_at: "2025-09-01T00:00:00Z",
    created_at: "2025-08-23T08:00:00Z",
    updated_at: "2025-08-23T11:00:00Z",
  },
  {
    id: "ai-2",
    title: "Hypothetical Matchup: Ellen Ripley vs. Sarah Connor",
    content:
      "In a showdown between Ellen Ripley (Alien franchise) and Sarah Connor (Terminator franchise), AI models analyzed combat strategies, leadership traits, and survival instincts. Ripley's adaptability in extraterrestrial threats gives her a tactical edge, while Connor's military training and relentless determination make her a nearly unstoppable human warrior. Social sentiment polls lean slightly in favor of Ripley for her resilience against the unknown, though Connor dominates in strategic ground combat scenarios.",
    content_type: "matchup",
    prompt_used:
      "Compare two iconic heroines from film: Ellen Ripley and Sarah Connor.",
    status: "active",
    view_count: 4175,
    engagement_score: 7.6,
    expires_at: "2025-09-05T00:00:00Z",
    created_at: "2025-08-23T09:30:00Z",
    updated_at: "2025-08-23T11:00:00Z",
  },
];

const tabs = [
  { id: "movies", name: "Movies", icon: TrendingUp },
  { id: "news", name: "News", icon: Newspaper },
  { id: "ai-insights", name: "AI Insights", icon: Lightbulb },
];

export default function TrendingPage() {
  const navigate = useNavigate();
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

  const handleAIInsightClick = (insight, index) => {
    sessionStorage.setItem(
      "currentArticle",
      JSON.stringify({
        ...insight,
        id: index + 1,
        image_url:
          "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1072&q=80",
      })
    );
    navigate(`/ai-insights/${index + 1}`);
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
      className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-6 cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10"
    >
      <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
        {/* Rank Number */}
        <div className="flex-shrink-0">
          <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white/20 group-hover:text-emerald-400/40 transition-colors duration-300 tracking-tighter leading-none">
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
          <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white mb-1 tracking-tight group-hover:text-emerald-300 transition-colors duration-300 line-clamp-2 sm:line-clamp-1">
            {movie.title}
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed line-clamp-2 md:line-clamp-2 hidden sm:block">
            {movie.overview || "Most viewed this week"}
          </p>
        </div>
      </div>

      {/* Mobile: Description below (optional) */}
      <div className="mt-2 sm:hidden">
        <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">
          {movie.overview || "Most viewed this week"}
        </p>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl sm:rounded-3xl" />
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
          <div className="relative bg-white/5 backdrop-blur-xl border-l-4 border-amber-400 rounded-r-2xl p-6 md:p-8 hover:bg-white/8 hover:border-amber-300 transition-all duration-300 min-h-[400px] flex flex-col">
            {/* Breaking News Badge */}
            <div className="absolute -left-1 top-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-r-md shadow-lg">
              BREAKING
            </div>

            <div className="flex flex-col h-full">
              {/* Category & Date */}
              <div className="flex items-center gap-3 mb-4 text-xs">
                <span className="bg-amber-400/20 text-amber-300 px-2 py-1 rounded-md font-semibold">
                  CINEMA NEWS
                </span>
                <div className="flex items-center gap-1 text-slate-400">
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
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight mb-4 group-hover:text-amber-300 transition-colors duration-300">
                {article.title}
              </h1>

              {/* Lead Paragraph */}
              <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-4 flex-grow line-clamp-4">
                {article.description || article.content}
              </p>

              {/* Byline */}
              <div className="flex items-center justify-between text-sm text-slate-400 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="font-medium text-amber-300">
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
          <div className="relative bg-white/3 backdrop-blur-xl border border-white/10 rounded-xl p-4 md:p-6 hover:bg-white/6 hover:border-white/20 transition-all duration-300 min-h-[300px] flex flex-col">
            {/* Category */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
              <span className="text-amber-300 text-xs font-semibold tracking-wide">
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
            <h2 className="text-lg md:text-xl font-bold text-white leading-tight mb-3 group-hover:text-amber-300 transition-colors duration-300 line-clamp-3 flex-grow">
              {article.title}
            </h2>

            {/* Meta Info */}
            <div className="flex items-center justify-between text-xs text-slate-400 mt-auto pt-3 border-t border-white/5">
              <span className="font-medium text-amber-300">
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
          <div className="relative bg-white/2 backdrop-blur-xl border-b border-white/10 p-4 md:p-5 hover:bg-white/4 transition-all duration-300 group">
            <div className="flex gap-4 md:gap-6">
              {/* Article Number */}
              <div className="flex-shrink-0 pt-1">
                <span className="text-xl md:text-2xl font-black text-white/20 group-hover:text-amber-400/40 transition-colors duration-300 font-mono">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Category Tag */}
                <div className="flex items-center gap-2 mb-2">
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                  <span className="text-xs text-slate-500 font-medium tracking-wide">
                    {article.source_name}
                  </span>
                  <span className="text-xs text-slate-600">•</span>
                  <span className="text-xs text-slate-600">
                    {new Date(
                      article.published_at || article.created_at
                    ).toLocaleDateString()}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base md:text-lg font-bold text-white mb-2 leading-tight group-hover:text-amber-300 transition-colors duration-300 line-clamp-2">
                  {article.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-400 leading-relaxed line-clamp-2 hidden sm:block">
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
              <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">
                {article.description || article.content}
              </p>
            </div>
          </div>
        )}
      </motion.article>
    );
  };

  const renderAIInsightCard = (insight, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, x: [0, 5, 10] }}
      onClick={() => handleAIInsightClick(insight, index)}
      className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-6 cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10"
    >
      <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
        {/* Rank Number */}
        <div className="flex-shrink-0">
          <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white/20 group-hover:text-emerald-400/40 transition-colors duration-300 tracking-tighter leading-none">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* AI Icon */}
        <div className="flex-shrink-0">
          <div className="w-10 h-14 sm:w-12 sm:h-18 md:w-16 md:h-24 rounded-lg sm:rounded-xl bg-gradient-to-br from-emerald-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center">
            {insight.content_type === "analysis" ? (
              <Lightbulb className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 text-emerald-400" />
            ) : (
              <MessageSquare className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 text-purple-400" />
            )}
          </div>
        </div>

        {/* Insight Info - Flexible Layout */}
        <div className="flex-1 min-w-0 pr-2 sm:pr-0">
          <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white mb-1 tracking-tight group-hover:text-emerald-300 transition-colors duration-300 line-clamp-2">
            {insight.title}
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm mb-1 sm:mb-2 line-clamp-2 sm:line-clamp-3 hidden sm:block">
            {insight.content}
          </p>
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="text-xs text-emerald-400 font-medium capitalize">
              {insight.content_type}
            </span>
            <span className="text-xs text-slate-500 hidden sm:inline">•</span>
            <span className="text-xs text-slate-500 hidden sm:inline">
              AI Generated
            </span>
          </div>
        </div>

        {/* AI Badge - Desktop/Tablet only */}
        <div className="hidden sm:flex flex-shrink-0">
          <div className="bg-gradient-to-r from-emerald-500/20 to-purple-500/20 backdrop-blur-sm px-2 md:px-3 py-1 md:py-2 rounded-xl md:rounded-2xl border border-white/10">
            <span className="text-xs font-semibold text-emerald-300">AI</span>
          </div>
        </div>
      </div>

      {/* Mobile: Content preview below */}
      <div className="mt-2 sm:hidden">
        <p className="text-slate-400 text-xs line-clamp-3 leading-relaxed">
          {insight.content}
        </p>
        <div className="mt-1 flex items-center gap-1">
          <span className="text-xs text-slate-500">AI Generated</span>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl sm:rounded-3xl" />
    </motion.div>
  );

  const getCurrentData = () => {
    switch (activeTab) {
      case "movies":
        return trendingMoviesData;
      case "news":
        return trendingNewsData;
      case "ai-insights":
        return aiInsightsData;
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
              className="bg-emerald-500/20 text-emerald-300 px-4 py-2 rounded-2xl border border-emerald-400/30 hover:bg-emerald-500/30 transition-all text-sm sm:text-base"
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
          <p className="text-slate-400 text-sm sm:text-base">
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
          <>
            {/* Newspaper Header */}
            <div className="mb-8 text-center border-b-2 border-amber-400/30 pb-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-4 mb-4"
              >
                <div className="w-12 h-px bg-amber-400/50"></div>
                <Newspaper className="w-8 h-8 text-amber-400" />
                <div className="w-12 h-px bg-amber-400/50"></div>
              </motion.div>
              <h2 className="text-2xl md:text-3xl font-black text-amber-200 tracking-wider">
                THE CINÉPRISM TIMES
              </h2>
              <p className="text-amber-400/70 text-sm mt-2 tracking-wide">
                LATEST CINEMA NEWS • {new Date().toLocaleDateString()} • EDITION
                #{Math.floor(Math.random() * 1000) + 500}
              </p>
            </div>

            {/* Newspaper Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {data.map((article, index) => renderNewsCard(article, index))}
            </div>
          </>
        );
      case "ai-insights":
        return (
          <div className="space-y-3 sm:space-y-4">
            {data.map((insight, index) => renderAIInsightCard(insight, index))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b pt-4 sm:pt-6 md:pt-8 from-slate-950 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(139,92,246,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(16,185,129,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(236,72,153,0.03),transparent_50%)]" />
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
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"
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
          className="absolute top-3/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"
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
              className="bg-white/5 backdrop-blur-xl text-emerald-400 px-3 sm:px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold border border-white/10 flex items-center gap-2"
            >
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
              Live Updates
            </motion.span>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-4 sm:mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent tracking-tight px-4"
          >
            Trending Now
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed px-4"
          >
            The latest buzz in the world of cinema, powered by data and AI.
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
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-2xl font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center gap-1 sm:gap-2 ${
                  activeTab === tab.id
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 shadow-lg shadow-emerald-500/10"
                    : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20"
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
          <div className="inline-flex items-center gap-2 text-slate-500 text-xs sm:text-sm">
            <div className="w-6 sm:w-8 h-px bg-gradient-to-r from-transparent to-slate-500" />
            <span>Updated every hour</span>
            <div className="w-6 sm:w-8 h-px bg-gradient-to-l from-transparent to-slate-500" />
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

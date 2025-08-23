"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Star,
  TrendingUp,
  MessageSquare,
  Lightbulb,
  ExternalLink,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MovieDetailsModal from "./MovieDetailsModal"; // Adjust path as needed
import TrendingNewsLayout from "./TrendingNewsLayout"; // Adjust path as needed

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
  { id: "news", name: "News", icon: ExternalLink },
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

  // News handling function for the new layout
  const handleNewsArticleClick = (article, index) => {
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
      whileHover={{ scale: 1.02, x: 10 }}
      onClick={() => handleMovieClick(movie)}
      className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10"
    >
      <div className="flex items-center gap-6">
        <div className="flex-shrink-0">
          <span className="text-6xl font-black text-white/20 group-hover:text-emerald-400/40 transition-colors duration-300 tracking-tighter">
            {String(movie.trending_rank).padStart(2, "0")}
          </span>
        </div>

        <div className="flex-shrink-0">
          <div className="w-16 h-24 rounded-xl overflow-hidden shadow-lg">
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

        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-emerald-300 transition-colors duration-300">
            {movie.title}
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed line-clamp-1">
            {movie.overview || "Most viewed this week"}
          </p>
        </div>

        <div className="flex-shrink-0 flex items-center gap-2 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-2xl border border-white/10">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-white font-semibold">{movie.vote_average}</span>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
    </motion.div>
  );

  const renderNewsCard = (article, index) => (
    <motion.div
      key={article.id || index}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, x: 10 }}
      onClick={() => handleNewsClick(article, index)}
      className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
    >
      <div className="flex items-center gap-6">
        <div className="flex-shrink-0">
          <span className="text-6xl font-black text-white/20 group-hover:text-purple-400/40 transition-colors duration-300 tracking-tighter">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="flex-shrink-0">
          <div className="w-16 h-24 rounded-xl overflow-hidden shadow-lg">
            <img
              src={article.image_url || "/placeholder.svg"}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-purple-300 transition-colors duration-300 line-clamp-2">
            {article.title}
          </h3>
          <p className="text-slate-400 text-sm mb-2 line-clamp-2">
            {article.description || article.content}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-emerald-400 font-medium">
              {article.source_name}
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-slate-500">
              {new Date(
                article.published_at || article.created_at
              ).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="flex-shrink-0">
          <div className="bg-black/20 backdrop-blur-sm p-3 rounded-2xl border border-white/10">
            <ExternalLink className="w-4 h-4 text-purple-400" />
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
    </motion.div>
  );

  const renderAIInsightCard = (insight, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, x: 10 }}
      onClick={() => handleAIInsightClick(insight, index)}
      className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10"
    >
      <div className="flex items-center gap-6">
        <div className="flex-shrink-0">
          <span className="text-6xl font-black text-white/20 group-hover:text-emerald-400/40 transition-colors duration-300 tracking-tighter">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="flex-shrink-0">
          <div className="w-16 h-24 rounded-xl bg-gradient-to-br from-emerald-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center">
            {insight.content_type === "analysis" ? (
              <Lightbulb className="w-8 h-8 text-emerald-400" />
            ) : (
              <MessageSquare className="w-8 h-8 text-purple-400" />
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-emerald-300 transition-colors duration-300 line-clamp-2">
            {insight.title}
          </h3>
          <p className="text-slate-400 text-sm mb-2 line-clamp-3">
            {insight.content}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-emerald-400 font-medium capitalize">
              {insight.content_type}
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-slate-500">AI Generated</span>
          </div>
        </div>

        <div className="flex-shrink-0">
          <div className="bg-gradient-to-r from-emerald-500/20 to-purple-500/20 backdrop-blur-sm px-3 py-2 rounded-2xl border border-white/10">
            <span className="text-xs font-semibold text-emerald-300">AI</span>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
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
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400"></div>
        </div>
      );
    }

    // Show error state
    if ((activeTab === "movies" || activeTab === "news") && error) {
      return (
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={getRetryFunction()}
              className="bg-emerald-500/20 text-emerald-300 px-4 py-2 rounded-2xl border border-emerald-400/30 hover:bg-emerald-500/30 transition-all"
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
        <div className="flex justify-center items-center py-20">
          <p className="text-slate-400">
            No trending {currentTabName.toLowerCase()} available
          </p>
        </div>
      );
    }

    switch (activeTab) {
      case "movies":
        return data.map((movie, index) => renderMovieCard(movie, index));
      case "news":
        return (
          <TrendingNewsLayout
            articles={data}
            onArticleClick={handleNewsArticleClick}
          />
        );
      case "ai-insights":
        return data.map((insight, index) =>
          renderAIInsightCard(insight, index)
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b pt-8 from-slate-950 to-slate-900 relative overflow-hidden">
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-6">
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/5 backdrop-blur-xl text-emerald-400 px-4 py-2 rounded-2xl text-sm font-semibold border border-white/10 flex items-center gap-2"
            >
              <TrendingUp className="w-4 h-4" />
              Live Updates
            </motion.span>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent tracking-tight"
          >
            Trending Now
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            The latest buzz in the world of cinema, powered by data and AI.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 shadow-lg shadow-emerald-500/10"
                    : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20"
                }`}
              >
                <IconComponent className="w-4 h-4" />
                {tab.name}
              </motion.button>
            );
          })}
        </motion.div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4"
        >
          {renderCurrentContent()}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 text-slate-500 text-sm">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-slate-500" />
            <span>Updated every hour</span>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-slate-500" />
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

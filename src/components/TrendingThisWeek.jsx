"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, TrendingUp } from "lucide-react";
import axios from "axios";
import MovieDetailsModal from "./MovieDetailsModal"; // Adjust path as needed
import { useTheme } from "../context/ThemeContext";

const TrendingMovieCard = ({ movie, index, onClick, theme }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ x: 5 }}
      onClick={() => onClick(movie)}
      className={`group relative backdrop-blur-xl border-2 rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
        theme === "light"
          ? "bg-gray-100 border-black/40 hover:bg-gray-200 hover:border-black/60 hover:shadow-black/10"
          : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-purple-500/10"
      }`}
    >
      <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
        {/* Rank Number */}
        <div className="flex-shrink-0">
          <span className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black transition-colors duration-300 tracking-tighter leading-none ${
            theme === "light"
              ? "text-black/20 group-hover:text-black/40"
              : "text-white/20 group-hover:text-purple-400/40"
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
              : "text-white group-hover:text-purple-300"
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
        theme === "light" ? "from-gray-400/5 to-gray-400/5" : "from-purple-500/5 to-purple-500/5"
      }`} />
    </motion.div>
  );
};

export default function TrendingThisWeek() {
  const { theme } = useTheme();
  const [trendingMoviesData, setTrendingMoviesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showMovieModal, setShowMovieModal] = useState(false);

  const fetchTrendingMovies = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "https://api.thecineprism.com/api/v1/movies"
      );
      if (response.data.success) {
        // Take only first 5 movies
        setTrendingMoviesData(response.data.data.slice(0, 5));
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

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setShowMovieModal(true);
  };

  const closeMovieModal = () => {
    setShowMovieModal(false);
    setSelectedMovie(null);
  };

  return (
    <section className={`py-12 sm:py-16 md:py-24 relative overflow-hidden transition-colors duration-300 ${
      theme === "light"
        ? "bg-gradient-to-b from-gray-50 to-white"
        : "bg-gradient-to-b from-slate-950 to-slate-900"
    }`}>
      {/* Ambient Background */}
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
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 relative">
        {/* Section Header - keeping existing design */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <div className="inline-block mb-4 sm:mb-6">
            <span className={`backdrop-blur-xl px-3 sm:px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold border-2 flex items-center gap-2 shadow-md ${
              theme === "light"
                ? "bg-gray-100 text-black border-black/40"
                : "bg-white/5 text-purple-400 border-white/10"
            }`}>
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
              Hot Right Now
            </span>
          </div>
          <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 bg-clip-text text-transparent tracking-tight px-4 ${
            theme === "light"
              ? "bg-gradient-to-r from-black via-gray-800 to-gray-600"
              : "bg-gradient-to-r from-white via-slate-200 to-slate-400"
          }`}>
            Trending This Week
          </h2>
          <p className={`text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed px-4 ${
            theme === "light" ? "text-black/70" : "text-slate-400"
          }`}>
            The most popular movies our community can't stop talking about
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {loading ? (
            <div className="flex justify-center items-center py-12 sm:py-20">
              <div className={`animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 ${
                theme === "light" ? "border-black" : "border-purple-400"
              }`}></div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-12 sm:py-20">
              <div className="text-center px-4">
                <p className="text-red-400 mb-4 text-sm sm:text-base">
                  {error}
                </p>
                <button
                  onClick={fetchTrendingMovies}
                  className={`px-4 py-2 rounded-2xl border transition-all text-sm sm:text-base ${
                    theme === "light"
                      ? "bg-red-200/50 text-red-600 border-red-600/30 hover:bg-red-300/50"
                      : "bg-purple-500/20 text-purple-300 border-purple-400/30 hover:bg-purple-500/30"
                  }`}
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : trendingMoviesData.length === 0 ? (
            <div className="flex justify-center items-center py-12 sm:py-20">
              <p className={`text-sm sm:text-base ${theme === "light" ? "text-black/70" : "text-slate-400"}`}>
                No trending movies available
              </p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {trendingMoviesData.map((movie, index) => (
                <TrendingMovieCard
                  key={movie.tmdb_id}
                  movie={movie}
                  index={index}
                  onClick={handleMovieClick}
                  theme={theme}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Movie Details Modal */}
      {showMovieModal && (
        <MovieDetailsModal movie={selectedMovie} onClose={closeMovieModal} />
      )}
    </section>
  );
}

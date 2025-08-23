"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, TrendingUp } from "lucide-react";
import axios from "axios";
import MovieDetailsModal from "./MovieDetailsModal"; // Adjust path as needed

export default function TrendingThisWeek() {
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
        "https://testingcineprismbackend-production.up.railway.app/api/v1/movies"
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
    <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(139,92,246,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(16,185,129,0.05),transparent_50%)]" />
      </div>

      <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <div className="inline-block mb-4 sm:mb-6">
            <span className="bg-white/5 backdrop-blur-xl text-purple-400 px-3 sm:px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold border border-white/10 flex items-center gap-2">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
              Hot Right Now
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent tracking-tight px-4">
            Trending This Week
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed px-4">
            The most popular movies our community can't stop talking about
          </p>
        </motion.div>

        {/* Trending List */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-3 sm:space-y-4"
        >
          {loading ? (
            <div className="flex justify-center items-center py-12 sm:py-20">
              <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-purple-400"></div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-12 sm:py-20">
              <div className="text-center px-4">
                <p className="text-red-400 mb-4 text-sm sm:text-base">
                  {error}
                </p>
                <button
                  onClick={fetchTrendingMovies}
                  className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded-2xl border border-purple-400/30 hover:bg-purple-500/30 transition-all text-sm sm:text-base"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : trendingMoviesData.length === 0 ? (
            <div className="flex justify-center items-center py-12 sm:py-20">
              <p className="text-slate-400 text-sm sm:text-base">
                No trending movies available
              </p>
            </div>
          ) : (
            trendingMoviesData.map((movie, index) => (
              <motion.div
                key={movie.tmdb_id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: [0, 5, 10] }}
                onClick={() => handleMovieClick(movie)}
                className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-6 cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
              >
                <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
                  {/* Rank Number */}
                  <div className="flex-shrink-0">
                    <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white/20 group-hover:text-purple-400/40 transition-colors duration-300 tracking-tighter leading-none">
                      {String(movie.trending_rank || index + 1).padStart(
                        2,
                        "0"
                      )}
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
                    <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white mb-1 tracking-tight group-hover:text-purple-300 transition-colors duration-300 line-clamp-1 sm:line-clamp-1">
                      {movie.title}
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm line-clamp-1 hidden sm:block">
                      {movie.overview || "Most viewed this week"}
                    </p>
                    {/* Mobile: Show rating inline with title */}
                    <div className="flex items-center gap-1 mt-1 sm:hidden">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-white text-xs font-semibold">
                        {movie.vote_average}
                      </span>
                    </div>
                  </div>

                  {/* Rating - Desktop/Tablet only */}
                  <div className="hidden sm:flex flex-shrink-0 items-center gap-2 bg-black/20 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 rounded-xl md:rounded-2xl border border-white/10">
                    <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 fill-current" />
                    <span className="text-white font-semibold text-sm md:text-base">
                      {movie.vote_average}
                    </span>
                  </div>
                </div>

                {/* Mobile: Description below (optional) */}
                <div className="mt-2 sm:hidden">
                  <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">
                    {movie.overview || "Most viewed this week"}
                  </p>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl sm:rounded-3xl" />
              </motion.div>
            ))
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

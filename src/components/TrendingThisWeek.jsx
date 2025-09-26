"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Star, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import MovieDetailsModal from "./MovieDetailsModal"; // Adjust path as needed

const TrendingMovieCard = ({ movie, index, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      onClick={() => onClick(movie)}
      className="group relative flex-shrink-0 w-48 sm:w-52 md:w-56 cursor-pointer"
    >
      {/* Movie Poster Container */}
      <div className="relative aspect-[2/3] rounded-2xl overflow-hidden mb-4 shadow-lg group-hover:shadow-xl group-hover:shadow-purple-500/20 transition-all duration-300">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/abstract-movie-poster.png"
          }
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Rank Number Overlay */}
        <div className="absolute top-3 left-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
            <span className="text-white font-bold text-sm sm:text-base">
              {String(movie.trending_rank || index + 1).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Subtle Border Glow on Hover */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-purple-400/30 transition-colors duration-300" />
      </div>

      {/* Movie Title */}
      <div className="px-2">
        <h3 className="text-white font-bold text-sm sm:text-base line-clamp-2 group-hover:text-purple-300 transition-colors duration-300 leading-tight">
          {movie.title}
        </h3>
        {movie.vote_average && (
          <div className="flex items-center gap-1 mt-2">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="text-slate-400 text-xs">
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default function TrendingThisWeek() {
  const [trendingMoviesData, setTrendingMoviesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showMovieModal, setShowMovieModal] = useState(false);
  const scrollContainerRef = useRef(null);

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

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(139,92,246,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(16,185,129,0.05),transparent_50%)]" />
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

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
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
            <>
              {/* Navigation Arrows - Desktop Only */}
              <button
                onClick={scrollLeft}
                className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/60 backdrop-blur-sm rounded-full items-center justify-center border border-white/20 hover:bg-black/80 hover:border-purple-400/50 transition-all duration-300 -translate-x-6"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              <button
                onClick={scrollRight}
                className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/60 backdrop-blur-sm rounded-full items-center justify-center border border-white/20 hover:bg-black/80 hover:border-purple-400/50 transition-all duration-300 translate-x-6"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              {/* Fade-out edges */}
              <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

              {/* Horizontal Scrolling Container */}
              <div
                ref={scrollContainerRef}
                className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide pb-4 px-4 sm:px-8"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {trendingMoviesData.map((movie, index) => (
                  <TrendingMovieCard
                    key={movie.tmdb_id}
                    movie={movie}
                    index={index}
                    onClick={handleMovieClick}
                  />
                ))}
              </div>
            </>
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

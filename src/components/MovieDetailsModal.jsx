"use client";

import { motion } from "framer-motion";
import { X, Star, Calendar } from "lucide-react";

const MovieDetailsModal = ({ movie, onClose }) => {
  if (!movie) return null;

  const genreMap = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };

  const getGenreNames = (genreIds) => {
    if (!genreIds || genreIds.length === 0) return ["Genre not available"];
    return genreIds.map((id) => genreMap[id] || "Unknown").filter(Boolean);
  };

  const genreNames = getGenreNames(movie.genre_ids);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl w-full max-w-md sm:max-w-lg md:max-w-2xl max-h-[85vh] overflow-hidden shadow-2xl shadow-black/50"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/10 backdrop-blur-xl p-2.5 rounded-full border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 group"
        >
          <X className="w-4 h-4 text-white group-hover:text-slate-200 transition-colors" />
        </button>

        {/* Scrollable Content */}
        <div className="max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20 hover:scrollbar-thumb-white/30">
          {/* Hero Section with Poster */}
          <div className="relative">
            {/* Background Image */}
            <div className="aspect-[16/9] relative overflow-hidden">
              <img
                src={
                  movie.backdrop_path
                    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
                    : movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "/movie-poster-placeholder.png"
                }
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-slate-950/30" />

              {/* Noise Texture */}
              <div
                className="absolute inset-0 opacity-10 mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
                }}
              />
            </div>

            {/* Movie Poster (Floating) */}
            <div className="absolute -bottom-12 sm:-bottom-16 left-4 sm:left-6">
              <div className="w-20 h-28 sm:w-24 sm:h-36 md:w-28 md:h-40 rounded-xl overflow-hidden shadow-2xl border-2 border-white/20">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "/movie-poster-placeholder.png"
                  }
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Rating and Rank Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1.5 rounded-full text-xs font-semibold border border-emerald-500/30 backdrop-blur-sm">
                #{movie.trending_rank || "N/A"}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="pt-16 sm:pt-20 px-4 sm:px-6 pb-6">
            {/* Title and Year */}
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2 bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent leading-tight">
                {movie.title}
              </h1>
              <div className="flex items-center gap-2 text-slate-400">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {new Date(movie.release_date).getFullYear()}
                </span>
              </div>
            </div>

            {/* Genres */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-3 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Genres
              </h3>
              <div className="flex flex-wrap gap-2">
                {genreNames.map((genre, index) => (
                  <span
                    key={index}
                    className="bg-white/5 backdrop-blur-sm text-slate-200 px-3 py-1.5 rounded-full text-xs border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 font-medium"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            {/* Overview */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-3 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Overview
              </h3>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                {movie.overview || "No overview available for this movie."}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
                <h4 className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                  Audience Reviews
                </h4>
                <p className="text-white text-xl font-bold">
                  {movie.vote_count?.toLocaleString() || "N/A"}
                </p>
                <p className="text-xs text-slate-500 mt-1">Total ratings</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
                <h4 className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                  Trending Score
                </h4>
                <p className="text-white text-xl font-bold">
                  {movie.popularity_score?.toFixed(1) ||
                    movie.popularity?.toFixed(1) ||
                    "N/A"}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Current buzz level
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MovieDetailsModal;

"use client";

import { motion } from "framer-motion";
import { X, Star, Calendar, Play } from "lucide-react";

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
      className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl shadow-black/50"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 bg-white/5 backdrop-blur-xl p-3 rounded-full border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
        >
          <X className="w-5 h-5 text-white group-hover:text-slate-200 transition-colors" />
        </button>

        <motion.div className="flex flex-col lg:flex-row min-h-[600px]">
          <div className="lg:w-2/5 relative">
            <div className="aspect-[2/3] lg:aspect-auto lg:h-full relative overflow-hidden">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "/movie-poster-placeholder.png"
                }
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-slate-950/60" />

              <div
                className="absolute inset-0 opacity-20 mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
                }}
              />
            </div>
          </div>

          <div className="lg:w-3/5 p-8 lg:p-12 relative">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-emerald-500/20 text-emerald-300 px-4 py-2 rounded-full text-sm font-semibold border border-emerald-500/30 backdrop-blur-sm">
                  #{movie.trending_rank}
                </span>
                <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                  <Star className="w-4 h-4 text-amber-400 fill-current" />
                  <span className="text-white font-bold text-sm">
                    {movie.vote_average}
                  </span>
                </div>
              </div>

              <h1 className="text-4xl lg:text-5xl font-black text-white mb-3 bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent leading-tight">
                {movie.title}
              </h1>

              <div className="flex items-center gap-2 text-slate-400">
                <Calendar className="w-5 h-5" />
                <span className="text-lg font-medium">
                  {new Date(movie.release_date).getFullYear()}
                </span>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Genres
              </h3>
              <div className="flex flex-wrap gap-3">
                {genreNames.map((genre, index) => (
                  <span
                    key={index}
                    className="bg-white/5 backdrop-blur-sm text-slate-200 px-4 py-2 rounded-full text-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 font-medium"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Overview
              </h3>
              <p className="text-slate-300 leading-relaxed text-lg">
                {movie.overview || "No overview available for this movie."}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
                <h4 className="text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                  Audience Reviews
                </h4>
                <p className="text-white text-xl font-bold">
                  {movie.vote_count?.toLocaleString() || "N/A"}
                </p>
                <p className="text-xs text-slate-500 mt-1">Total ratings</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
                <h4 className="text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                  Trending Score
                </h4>
                <p className="text-white text-xl font-bold">
                  {movie.popularity_score?.toFixed(1) || "N/A"}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Current buzz level
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default MovieDetailsModal;

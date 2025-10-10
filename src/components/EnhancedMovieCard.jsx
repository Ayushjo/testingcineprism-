"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import OptimizedImage from "./OptimizedImage";

const EnhancedMovieCard = ({ movie, index }) => {
  const { theme } = useTheme();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      {/* Card Container with Dotted Border */}
      <div className={`relative overflow-hidden rounded-2xl border-2 border-dashed backdrop-blur-sm transition-all duration-300 ${
        theme === "light"
          ? "border-gray-300 bg-gray-50/50 hover:border-black/50 hover:shadow-lg hover:shadow-black/10"
          : "border-slate-700/50 bg-slate-900/30 hover:border-amber-400/50 hover:shadow-lg hover:shadow-amber-400/10"
      }`}>
        {/* Poster Image */}
        <div className="relative aspect-[2/3] overflow-hidden">
          <OptimizedImage
            src={
              movie.posterImageUrl || "/placeholder.svg?height=450&width=300"
            }
            alt={movie.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Rating Badge */}
          {movie.rating && (
            <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 backdrop-blur-sm">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span className="text-xs font-semibold text-white">
                {movie.rating}
              </span>
            </div>
          )}
        </div>

        {/* Movie Info */}
        <div className="p-4">
          <h3 className={`mb-1 font-bold line-clamp-2 transition-colors ${
            theme === "light"
              ? "text-black group-hover:text-gray-700"
              : "text-white group-hover:text-amber-400"
          }`}>
            {movie.title}
          </h3>
          <p className={`mb-2 text-sm ${
            theme === "light" ? "text-gray-700" : "text-slate-400"
          }`}>{movie.year}</p>
          {movie.ratingCategory && (
            <span className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
              theme === "light"
                ? "bg-emerald-500/20 text-emerald-700"
                : "bg-emerald-500/20 text-emerald-400"
            }`}>
              {movie.ratingCategory}
            </span>
          )}
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className={`absolute inset-0 rounded-2xl ${
            theme === "light"
              ? "bg-gradient-to-r from-gray-300/10 to-gray-400/10"
              : "bg-gradient-to-r from-amber-400/5 to-emerald-400/5"
          }`} />
        </div>
      </div>
    </motion.div>
  );
};

export default EnhancedMovieCard;

"use client";
import { motion } from "framer-motion";

const RecommendationCard = ({ movie, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="group relative bg-gray-800/40 backdrop-blur-sm border border-gray-700/20 rounded-xl overflow-hidden hover:bg-gray-800/60 transition-all duration-500 ease-out cursor-pointer"
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Poster Image */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={movie.poster || "/placeholder.svg"}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Enhanced overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Genre indicator */}
        {movie.genre && (
          <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
            <span className="text-xs px-3 py-1.5 bg-black/70 backdrop-blur-md text-white rounded-full font-medium border border-white/20">
              {movie.genre}
            </span>
          </div>
        )}

        {/* Rating badge if available */}
        {movie.rating && (
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
            <span className="text-xs px-2.5 py-1 bg-yellow-500/90 backdrop-blur-sm text-black rounded-full font-semibold">
              ★ {movie.rating}
            </span>
          </div>
        )}
      </div>

      {/* Enhanced Content */}
      <div className="p-6">
        <h3 className="text-white font-semibold text-lg mb-3 line-clamp-2 group-hover:text-gray-100 transition-colors duration-300 leading-tight">
          {movie.title}
        </h3>

        {/* Year and additional info */}
        <div className="flex items-center justify-between text-gray-400 mb-2">
          {movie.year && (
            <span className="text-sm font-medium text-gray-300">
              {movie.year}
            </span>
          )}

          {movie.duration && (
            <span className="text-xs font-light opacity-70">
              {movie.duration}
            </span>
          )}
        </div>

        {/* Director info */}
        {movie.director && (
          <p className="text-xs text-gray-500 font-light truncate mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            Directed by {movie.director}
          </p>
        )}

        {/* Description preview on hover */}
        {movie.description && (
          <p className="text-xs text-gray-400 font-light line-clamp-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 leading-relaxed">
            {movie.description}
          </p>
        )}
      </div>

      {/* Enhanced glow effect on hover */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 via-white/5 to-transparent" />
        <div className="absolute inset-0 rounded-xl shadow-2xl shadow-black/50" />
      </div>

      {/* Subtle border glow */}
      <div className="absolute inset-0 rounded-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
};

export default RecommendationCard;

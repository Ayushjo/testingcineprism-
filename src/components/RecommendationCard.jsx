"use client";
import { motion } from "framer-motion";

const RecommendationCard = ({ movie, index }) => {
  // Helper function to get primary genre
  const getPrimaryGenre = () => {
    if (movie.genre) return movie.genre;
    if (movie.genres && movie.genres.length > 0) return movie.genres[0];
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="group relative bg-gray-800/40 backdrop-blur-sm border border-gray-700/20 rounded-lg overflow-hidden hover:bg-gray-800/60 transition-all duration-500 ease-out"
      whileHover={{ y: -4 }}
    >
      {/* Poster Image */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={
            movie.posterImageUrl ||
            movie.reviewPosterImageUrl ||
            "/placeholder.svg"
          }
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Subtle overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Genre indicator */}
        {getPrimaryGenre() && (
          <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <span className="text-xs px-2 py-1 bg-gray-900/70 backdrop-blur-sm text-gray-300 rounded-md font-light border border-gray-700/30">
              {getPrimaryGenre()}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-white font-medium text-base mb-2 line-clamp-2 group-hover:text-gray-100 transition-colors duration-300 leading-snug">
          {movie.title}
        </h3>

        {/* Year and additional info */}
        <div className="flex items-center justify-between text-gray-400">
          {movie.year && (
            <span className="text-sm font-light">{movie.year}</span>
          )}

          {movie.origin && (
            <span className="text-xs font-light opacity-70 truncate ml-2">
              {movie.origin}
            </span>
          )}
        </div>
      </div>

      {/* Subtle glow effect on hover */}
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/5 to-transparent" />
      </div>
    </motion.div>
  );
};

export default RecommendationCard;

import { motion } from "framer-motion";
import { useState } from "react";
import { Calendar, Clock, User, TrendingUp } from "lucide-react";

const RankedMovieCard = ({ movie, index, onMovieClick }) => {
  const [imageError, setImageError] = useState(false);

  const handleClick = () => {
    onMovieClick(movie);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={handleClick}
      className="group relative bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 cursor-pointer hover:scale-[1.01] sm:hover:scale-[1.02]"
    >
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Rank Number */}
        <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
          <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">
            {movie.rank}
          </span>
        </div>

        {/* Movie Poster */}
        <div className="flex-shrink-0 w-16 h-20 sm:w-20 sm:h-28 md:w-24 md:h-36 bg-slate-800 rounded-lg sm:rounded-xl overflow-hidden shadow-lg">
          {!imageError ? (
            <img
              src={movie.posterUrl || "/placeholder.svg"}
              alt={movie.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-800">
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 text-slate-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Movie Info */}
        <div className="flex-1 min-w-0 space-y-2 sm:space-y-3">
          <div>
            <h3 className="text-sm sm:text-lg md:text-xl font-bold text-white group-hover:text-emerald-400 transition-colors leading-tight line-clamp-2">
              {movie.title}
            </h3>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-1 sm:mt-2 text-xs sm:text-sm text-slate-400">
              <div className="flex items-center gap-1">
                <User className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="truncate">{movie.studio}</span>
              </div>
              {movie.genre && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="truncate">{movie.genre}</span>
                </div>
              )}
              {movie.runtime && (
                <div className="hidden sm:flex items-center gap-1">
                  <Clock className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{movie.runtime}</span>
                </div>
              )}
            </div>
          </div>

          {/* Description - Hidden on mobile and small tablets */}
          {movie.description && (
            <p className="hidden md:block text-sm text-slate-400 line-clamp-2 leading-relaxed">
              {movie.description}
            </p>
          )}
        </div>

        {/* Worldwide Gross */}
        <div className="flex-shrink-0 text-right">
          <div className="flex items-center justify-end gap-1 text-emerald-400 mb-1">
            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="text-sm sm:text-lg md:text-2xl font-bold">
              {movie.worldwideGross}
            </span>
          </div>
          <div className="text-xs text-slate-500 uppercase tracking-wider">
            Worldwide
          </div>
          {movie.domesticGross && (
            <div className="hidden sm:block text-xs text-slate-400 mt-1">
              US: {movie.domesticGross}
            </div>
          )}
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
};

export default RankedMovieCard;

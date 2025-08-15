"use client";
import { motion } from "framer-motion";

const GenreSidebar = ({ genres, activeGenre, onGenreSelect, movieCounts }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-64"
    >
      {/* Sidebar Container */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <h3 className="text-white text-lg font-bold mb-6 tracking-tight">
          Genres
        </h3>

        <div className="space-y-2">
          {genres.map((genre, index) => (
            <motion.button
              key={genre.key}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => onGenreSelect(genre.key)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                activeGenre === genre.key
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="font-medium">{genre.label}</span>
              <span
                className={`text-sm font-semibold ${
                  activeGenre === genre.key
                    ? "text-emerald-300"
                    : "text-slate-500"
                }`}
              >
                {movieCounts[genre.key] || 0}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default GenreSidebar;

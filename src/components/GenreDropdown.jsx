"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const GenreDropdown = ({ genres, activeGenre, onGenreSelect, movieCounts }) => {
  const [isOpen, setIsOpen] = useState(false);

  const activeGenreLabel =
    genres.find((g) => g.key === activeGenre)?.label || "All Genres";
  const activeCount = movieCounts[activeGenre] || 0;

  return (
    <div className="relative mb-6">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-lg p-4 flex justify-between items-center text-white"
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center gap-3">
          <span className="font-medium">{activeGenreLabel}</span>
          <span className="bg-emerald-500/30 text-emerald-300 text-sm px-2 py-1 rounded-full">
            {activeCount}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 z-50 mt-2 bg-slate-800/95 backdrop-blur-xl border border-slate-700/50 rounded-lg overflow-hidden shadow-2xl"
          >
            {genres.map((genre) => {
              const isActive = activeGenre === genre.key;
              const count = movieCounts[genre.key] || 0;

              return (
                <motion.button
                  key={genre.key}
                  onClick={() => {
                    onGenreSelect(genre.key);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left p-4 transition-all duration-200 ${
                    isActive
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                  }`}
                  whileHover={{ x: 4 }}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{genre.label}</span>
                    <span
                      className={`text-sm px-2 py-1 rounded-full ${
                        isActive
                          ? "bg-emerald-500/30 text-emerald-300"
                          : "bg-slate-700/50 text-slate-400"
                      }`}
                    >
                      {count}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GenreDropdown;

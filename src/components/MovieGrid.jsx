"use client";
import { motion } from "framer-motion";
import EnhancedMovieCard from "./EnhancedMovieCard";

const MovieGrid = ({ movies, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="border-2 border-dashed border-slate-700/30 bg-slate-900/30 rounded-2xl overflow-hidden animate-pulse"
          >
            <div className="aspect-[2/3] bg-slate-700/30" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-slate-700/30 rounded" />
              <div className="h-3 bg-slate-700/30 rounded w-2/3" />
              <div className="h-2 bg-slate-700/30 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center py-24 text-center"
      >
        <div className="text-8xl mb-8 opacity-40">🎬</div>
        <h3 className="text-3xl font-light text-white mb-4">No titles found</h3>
        <p className="text-slate-400 font-light text-lg max-w-md">
          Try exploring a different genre or check back later for new additions
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      {movies.map((movie, index) => (
        <EnhancedMovieCard key={movie.id} movie={movie} index={index} />
      ))}
    </motion.div>
  );
};

export default MovieGrid;

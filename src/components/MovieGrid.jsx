"use client";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import * as ReactWindow from "react-window";
import EnhancedMovieCard from "./EnhancedMovieCard";

const FixedSizeGrid = ReactWindow.FixedSizeGrid;

const MovieGrid = ({ movies, isLoading, useVirtualScroll = false }) => {
  const [dimensions, setDimensions] = useState({ width: 1200, columnCount: 5 });
  const containerRef = useRef(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        let columnCount = 5;

        if (width < 640) columnCount = 2;       // sm
        else if (width < 768) columnCount = 3;  // md
        else if (width < 1024) columnCount = 4; // lg
        else columnCount = 5;                   // xl

        setDimensions({ width, columnCount });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

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

  // Use virtual scrolling for large lists (more than 20 items)
  const shouldUseVirtualScroll = useVirtualScroll || movies.length > 20;

  if (shouldUseVirtualScroll) {
    const { width, columnCount } = dimensions;
    const gap = width < 640 ? 16 : width < 1024 ? 24 : 32;
    const columnWidth = (width - gap * (columnCount - 1)) / columnCount;
    const rowHeight = columnWidth * 1.5 + 120; // aspect ratio 2/3 + padding for info
    const rowCount = Math.ceil(movies.length / columnCount);

    const Cell = ({ columnIndex, rowIndex, style }) => {
      const index = rowIndex * columnCount + columnIndex;
      const movie = movies[index];

      if (!movie) return null;

      return (
        <div style={{ ...style, padding: `${gap / 2}px` }}>
          <EnhancedMovieCard
            movie={movie}
            index={index}
          />
        </div>
      );
    };

    return (
      <div ref={containerRef} className="w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <FixedSizeGrid
            columnCount={columnCount}
            columnWidth={columnWidth}
            height={Math.min(rowCount * rowHeight, 2000)} // Max height 2000px
            rowCount={rowCount}
            rowHeight={rowHeight}
            width={width}
            style={{ margin: '0 auto' }}
          >
            {Cell}
          </FixedSizeGrid>
        </motion.div>
      </div>
    );
  }

  // Regular grid for smaller lists
  return (
    <div ref={containerRef} className="w-full">
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
    </div>
  );
};

export default MovieGrid;

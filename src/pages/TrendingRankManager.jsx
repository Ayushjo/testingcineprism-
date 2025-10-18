"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GripVertical, Save, RotateCcw, AlertCircle } from "lucide-react";
import axios from "axios";

const TrendingRankManager = () => {
  const [movies, setMovies] = useState([]);
  const [originalMovies, setOriginalMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const token =
    localStorage.getItem("cineprism_auth_token") ||
    sessionStorage.getItem("cineprism_auth_token");

  const API_BASE_URL =
    "https://api.thecineprism.com/api/v1";

  // Fetch trending movies
  const fetchTrendingMovies = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/movies`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data && response.data.success && response.data.data) {
        const sortedMovies = response.data.data.sort(
          (a, b) => a.trending_rank - b.trending_rank
        );
        setMovies(sortedMovies);
        setOriginalMovies(JSON.parse(JSON.stringify(sortedMovies)));
        setHasChanges(false);
      }
    } catch (err) {
      console.error("Error fetching trending movies:", err);
      setError(
        err.response?.data?.message || "Failed to fetch trending movies"
      );
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchTrendingMovies();
  }, [fetchTrendingMovies]);

  // Check if there are changes
  useEffect(() => {
    const hasChangesNow = movies.some((movie, index) => {
      const originalMovie = originalMovies.find((m) => m.id === movie.id);
      return originalMovie && originalMovie.trending_rank !== index + 1;
    });
    setHasChanges(hasChangesNow);
  }, [movies, originalMovies]);

  // Drag and drop handlers
  const handleDragStart = (e, index) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();

    if (draggedItem === null || draggedItem === dropIndex) {
      setDraggedItem(null);
      setDragOverIndex(null);
      return;
    }

    const newMovies = [...movies];
    const draggedMovie = newMovies[draggedItem];

    // Remove the dragged item
    newMovies.splice(draggedItem, 1);

    // Insert at the new position
    newMovies.splice(dropIndex, 0, draggedMovie);

    setMovies(newMovies);
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  // Reset to original rankings
  const handleReset = () => {
    setMovies(JSON.parse(JSON.stringify(originalMovies)));
    setHasChanges(false);
  };

  // Save updated rankings
  const handleSave = async () => {
    setIsSaving(true);
    setError(null);

    try {
      // Create the payload with updated rankings
      const movieData = movies.map((movie, index) => ({
        id: movie.id,
        trendingRank: index + 1,
      }));

      const response = await axios.post(
        `${API_BASE_URL}/movies/edit-rank`,
        { movieData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response.data.success) {
        // Update the original movies to reflect saved state
        const updatedMovies = movies.map((movie, index) => ({
          ...movie,
          trending_rank: index + 1,
        }));
        setOriginalMovies(JSON.parse(JSON.stringify(updatedMovies)));
        setHasChanges(false);

        // Show success message (you can replace with toast notification)
        alert("Rankings saved successfully!");
      }
    } catch (err) {
      console.error("Error saving rankings:", err);
      setError(err.response?.data?.message || "Failed to save rankings");
    } finally {
      setIsSaving(false);
    }
  };

  // Loading screen
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 pt-20 text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-emerald-400"></div>
          <p className="text-slate-400">Loading Trending Movies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-20">
      {/* Ambient Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(16,185,129,0.03),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(245,158,11,0.03),transparent_50%)]" />
      </div>

      <section className="relative py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="mb-4 sm:mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-transparent">
              Manage Trending Rankings
            </h1>
            <p className="mx-auto max-w-3xl text-base sm:text-lg lg:text-xl leading-relaxed text-slate-400 px-4">
              Drag and drop movies to reorder their trending rankings
            </p>
          </motion.div>
        </div>
      </section>

      {/* Error Message */}
      {error && (
        <section className="relative pb-4">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-6 rounded-lg border border-red-500/30 bg-red-900/20 p-4 flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
              <p className="text-red-400 text-sm sm:text-base">{error}</p>
            </div>
          </div>
        </section>
      )}

      {/* Control Panel */}
      {movies.length > 0 && (
        <section className="relative border-t border-b border-slate-800/50 bg-slate-900/20 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="text-slate-300">
                <span className="font-medium">{movies.length} movies</span>
                {hasChanges && (
                  <span className="ml-2 text-amber-400 text-sm">
                    • Unsaved changes
                  </span>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleReset}
                  disabled={!hasChanges || isSaving}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </button>

                <button
                  onClick={handleSave}
                  disabled={!hasChanges || isSaving}
                  className="flex items-center gap-2 px-6 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm"
                >
                  {isSaving ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Save Rankings
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Movies List */}
      <section className="relative pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
          {movies.length > 0 ? (
            <div className="space-y-3">
              <AnimatePresence>
                {movies.map((movie, index) => (
                  <motion.div
                    key={movie.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, index)}
                    onDragEnd={handleDragEnd}
                    className={`relative group cursor-move ${
                      dragOverIndex === index ? "scale-105" : ""
                    } ${draggedItem === index ? "opacity-50" : ""}`}
                  >
                    {/* Drop indicator */}
                    {dragOverIndex === index && draggedItem !== index && (
                      <div className="absolute -top-1 left-0 right-0 h-0.5 bg-emerald-400 rounded-full z-10" />
                    )}

                    <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                      {/* Drag Handle */}
                      <div className="flex-shrink-0 text-slate-400 group-hover:text-slate-300">
                        <GripVertical className="h-5 w-5" />
                      </div>

                      {/* Rank */}
                      <div className="flex-shrink-0 w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                        <span className="text-emerald-400 font-bold text-lg">
                          {index + 1}
                        </span>
                      </div>

                      {/* Movie Poster */}
                      <div className="flex-shrink-0 w-16 h-24 bg-slate-800 rounded-lg overflow-hidden">
                        {movie.poster_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src =
                                "data:image/svg+xml,%3Csvg width='100' height='150' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23374151'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23fff'%3ENo Image%3C/text%3E%3C/svg%3E";
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs">
                            No Image
                          </div>
                        )}
                      </div>

                      {/* Movie Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-semibold text-lg truncate">
                          {movie.title}
                        </h3>
                        <p className="text-slate-400 text-sm line-clamp-2">
                          {movie.overview}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-slate-500 text-sm">
                            {new Date(movie.release_date).getFullYear()}
                          </span>
                          <span className="text-emerald-400 text-sm">
                            ★ {movie.vote_average.toFixed(1)}
                          </span>
                          <span className="text-slate-500 text-sm">
                            Popularity: {movie.popularity_score.toFixed(1)}
                          </span>
                        </div>
                      </div>

                      {/* Original Rank Indicator */}
                      {movie.trending_rank !== index + 1 && (
                        <div className="flex-shrink-0 text-amber-400 text-sm font-medium">
                          Was #{movie.trending_rank}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <div className="text-slate-400 text-lg">
                No trending movies found.
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default TrendingRankManager;

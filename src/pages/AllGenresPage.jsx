"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Film } from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

// Modal Component
const MovieDetailsModal = ({ movie, onClose }) => {
  if (!movie) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl w-full max-w-md sm:max-w-lg md:max-w-2xl max-h-[85vh] overflow-hidden shadow-2xl shadow-black/50"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/10 backdrop-blur-xl p-2.5 rounded-full border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 group"
        >
          <X className="w-4 h-4 text-white group-hover:text-slate-200 transition-colors" />
        </button>

        {/* Scrollable Content */}
        <div className="max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20 hover:scrollbar-thumb-white/30">
          {/* Hero Section with Poster */}
          <div className="relative">
            {/* Background Image */}
            <div className="aspect-[16/9] relative overflow-hidden">
              <img
                src={movie.posterImageUrl || "/placeholder.svg"}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-slate-950/30" />

              {/* Noise Texture */}
              <div
                className="absolute inset-0 opacity-10 mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
                }}
              />
            </div>

            {/* Movie Poster (Floating) */}
            <div className="absolute -bottom-12 sm:-bottom-16 left-4 sm:left-6">
              <div className="w-20 h-28 sm:w-24 sm:h-36 md:w-28 md:h-40 rounded-xl overflow-hidden shadow-2xl border-2 border-white/20">
                <img
                  src={movie.posterImageUrl || "/placeholder.svg"}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="pt-16 sm:pt-20 px-4 sm:px-6 pb-6">
            {/* Title and Year */}
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2 bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent leading-tight">
                {movie.title}
              </h1>
              <div className="flex items-center gap-2 text-slate-400">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">{movie.year}</span>
              </div>
            </div>

            {/* Director */}
            {movie.directedBy && (
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-3 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  Directed By
                </h3>
                <div className="flex items-center gap-2">
                  <Film className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-300 font-medium">{movie.directedBy}</span>
                </div>
              </div>
            )}

            {/* Genres */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-3 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Genres
              </h3>
              <div className="flex flex-wrap gap-2">
                {movie.genre && movie.genre.map((g, index) => (
                  <span
                    key={index}
                    className="bg-white/5 backdrop-blur-sm text-slate-200 px-3 py-1.5 rounded-full text-xs border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 font-medium"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>

            {/* Synopsis */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-3 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Synopsis
              </h3>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                {movie.synopsis || "No synopsis available for this movie."}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Movie Card Component
const MovieCard = ({ movie, onClick, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onClick}
      className="group relative cursor-pointer"
    >
      {/* Card Container with Dotted Border */}
      <div className="relative overflow-hidden rounded-2xl border-2 border-dashed border-slate-700/50 bg-slate-900/30 backdrop-blur-sm transition-all duration-300 hover:border-amber-400/50 hover:shadow-lg hover:shadow-amber-400/10">
        {/* Poster Image */}
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={movie.posterImageUrl || "/placeholder.svg"}
            alt={movie.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        {/* Movie Info */}
        <div className="p-4">
          <h3 className="mb-1 font-bold text-white line-clamp-2 group-hover:text-amber-400 transition-colors">
            {movie.title}
          </h3>
          <p className="mb-2 text-sm text-slate-400">{movie.year}</p>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400/5 to-emerald-400/5" />
        </div>
      </div>
    </motion.div>
  );
};

// Main Page Component
const GenreMoviesPage = () => {
  const { genre } = useParams();
  const { token } = useAuth();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchGenreMovies = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://testingcineprismbackend-production.up.railway.app/api/v1/admin/fetch-byGenre/${genre}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.genrePosts) {
          // Sort movies alphabetically by title
          const sortedMovies = response.data.genrePosts.sort((a, b) =>
            a.title.localeCompare(b.title)
          );
          setMovies(sortedMovies);
        } else {
          setError(response.data.message || "Failed to fetch movies");
          setMovies([]);
        }
      } catch (err) {
        console.error("Error fetching genre movies:", err);
        setError(
          err.response?.data?.message || "Failed to load movies"
        );
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGenreMovies();
  }, [genre, token]);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 pt-20">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-emerald-400"></div>
          <p className="text-slate-400">Loading {genre} Movies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-20">
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
            <h1 className="mb-4 sm:mb-6 bg-gradient-to-r from-white via-emerald-200 to-slate-400 bg-clip-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-transparent">
              Top {movies.length} {genre} Movies
            </h1>
            
          </motion.div>
        </div>
      </section>

      {error && (
        <section className="relative pb-4">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-6 rounded-lg border border-red-500/30 bg-red-900/20 p-4">
              <p className="text-center text-red-400">{error}</p>
            </div>
          </div>
        </section>
      )}

      <section className="relative pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {movies.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8"
            >
              {movies.map((movie, index) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  index={index}
                  onClick={() => handleMovieClick(movie)}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <p className="text-slate-400 text-lg">
                No {genre?.toLowerCase()} movies found.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedMovie && (
          <MovieDetailsModal movie={selectedMovie} onClose={handleCloseModal} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default GenreMoviesPage;

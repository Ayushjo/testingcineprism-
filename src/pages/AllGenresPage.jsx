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
      className="fixed inset-0 bg-slate-950/90 backdrop-blur-lg z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-slate-900/98 backdrop-blur-2xl border-2 border-dashed border-amber-400/30 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl shadow-amber-400/10"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-xl p-2.5 rounded-full border border-white/20 hover:bg-black/80 hover:border-amber-400/50 transition-all duration-300"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        <div className="max-h-[90vh] overflow-y-auto scrollbar-hide">
          <div className="relative">
            <div className="aspect-[16/10] relative overflow-hidden">
              <img
                src={movie.posterImageUrl || "/placeholder.svg"}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent" />
            </div>
          </div>

          <div className="p-8 -mt-24 relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 bg-gradient-to-r from-white via-amber-100 to-slate-300 bg-clip-text text-transparent leading-tight"
            >
              {movie.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-4 mb-8"
            >
              <div className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-700/50">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-semibold text-white">{movie.year}</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-700/50">
                <Film className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-semibold text-white">{movie.directedBy}</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <h3 className="text-lg font-bold text-amber-400 mb-3 uppercase tracking-wider">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {movie.genre &&
                  movie.genre.map((g, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-amber-500/20 to-emerald-500/20 text-amber-300 px-4 py-2 rounded-full text-sm border-2 border-dashed border-amber-400/30 font-semibold hover:border-amber-400/60 transition-all duration-300"
                    >
                      {g}
                    </span>
                  ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-6"
            >
              <h3 className="text-lg font-bold text-amber-400 mb-4 uppercase tracking-wider">Synopsis</h3>
              <div className="bg-slate-800/30 backdrop-blur-sm border-l-4 border-amber-400/50 rounded-r-xl p-6">
                <p className="text-slate-200 leading-relaxed text-base">
                  {movie.synopsis || "No synopsis available."}
                </p>
              </div>
            </motion.div>
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
          {movie.genre && movie.genre.length > 0 && (
            <span className="inline-block rounded-full bg-emerald-500/20 px-2 py-1 text-xs font-medium text-emerald-400">
              {movie.genre[0]}
            </span>
          )}
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
          setMovies(response.data.genrePosts);
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
            <p className="mx-auto max-w-3xl text-base sm:text-lg lg:text-xl leading-relaxed text-slate-400 px-4">
              Handpicked {genre.toLowerCase()} films curated by cinema experts
            </p>
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

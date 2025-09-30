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
        className="relative bg-slate-900/95 backdrop-blur-xl border border-emerald-500/20 rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-hidden shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/10 backdrop-blur-xl p-2.5 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
        >
          <X className="w-4 h-4 text-white" />
        </button>

        <div className="max-h-[85vh] overflow-y-auto">
          <div className="relative">
            <div className="aspect-[3/4] md:aspect-[16/9] relative overflow-hidden">
              <img
                src={movie.posterImageUrl || "/placeholder.svg"}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
            </div>
          </div>

          <div className="p-6 -mt-20 relative z-10">
            <h1 className="text-3xl md:text-4xl font-black text-white mb-3 bg-gradient-to-r from-white via-emerald-100 to-slate-300 bg-clip-text text-transparent">
              {movie.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-2 text-slate-300">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">{movie.year}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Film className="w-4 h-4" />
                <span className="text-sm font-medium">{movie.directedBy}</span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-3">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {movie.genre &&
                  movie.genre.map((g, index) => (
                    <span
                      key={index}
                      className="bg-emerald-500/20 text-emerald-300 px-3 py-1.5 rounded-full text-xs border border-emerald-500/30 font-medium"
                    >
                      {g}
                    </span>
                  ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-3">Synopsis</h3>
              <p className="text-slate-300 leading-relaxed text-sm">
                {movie.synopsis || "No synopsis available."}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Movie Card Component
const MovieCard = ({ movie, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="relative aspect-[2/3] rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 hover:border-emerald-500/50 transition-all duration-300 shadow-lg hover:shadow-emerald-500/20">
        <img
          src={movie.posterImageUrl || "/placeholder.svg"}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-bold text-base mb-1 line-clamp-2 group-hover:text-emerald-300 transition-colors">
            {movie.title}
          </h3>
          <p className="text-slate-300 text-sm">{movie.year}</p>
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
          `https://testingcineprismbackend-production.up.railway.app/api/v1/admin/fetch-genre/${genre}`,
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
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6"
            >
              {movies.map((movie, index) => (
                <motion.div
                  key={movie.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <MovieCard
                    movie={movie}
                    onClick={() => handleMovieClick(movie)}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <p className="text-slate-400 text-lg">
                No {genre.toLowerCase()} movies found.
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

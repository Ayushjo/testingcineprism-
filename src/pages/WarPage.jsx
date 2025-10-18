"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Film } from "lucide-react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import OptimizedImage from "../components/OptimizedImage";
import { showSuccessToast, showErrorToast, showLoadingToast, showInfoToast, dismissToast } from "../utils/toast";

// Modal Component
const MovieDetailsModal = ({ movie, onClose }) => {
  const { theme } = useTheme();
  if (!movie) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className={`fixed inset-0 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        theme === "light" ? "bg-black/50" : "bg-slate-950/80"
      }`}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className={`relative backdrop-blur-xl border rounded-3xl w-full max-w-md sm:max-w-lg md:max-w-2xl max-h-[85vh] overflow-hidden shadow-2xl transition-all duration-300 ${
          theme === "light"
            ? "bg-white/95 border-gray-300 shadow-black/20"
            : "bg-white/5 border-white/10 shadow-black/50"
        }`}
      >
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 z-10 backdrop-blur-xl p-2.5 rounded-full border transition-all duration-300 group ${
            theme === "light"
              ? "bg-gray-100 border-gray-300 hover:bg-gray-200 hover:border-gray-400"
              : "bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/30"
          }`}
        >
          <X className={`w-4 h-4 transition-colors ${
            theme === "light"
              ? "text-black group-hover:text-gray-700"
              : "text-white group-hover:text-slate-200"
          }`} />
        </button>

        <div className="max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20 hover:scrollbar-thumb-white/30">
          <div className="relative">
            <div className="aspect-[16/9] relative overflow-hidden">
              <OptimizedImage
                src={movie.posterImageUrl || "/placeholder.svg"}
                alt={movie.title}
                className="w-full h-full object-cover"
                priority={true}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-slate-950/30" />
              <div
                className="absolute inset-0 opacity-10 mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
                }}
              />
            </div>

            <div className="absolute -bottom-12 sm:-bottom-16 left-4 sm:left-6">
              <div className="w-20 h-28 sm:w-24 sm:h-36 md:w-28 md:h-40 rounded-xl overflow-hidden shadow-2xl border-2 border-white/20">
                <OptimizedImage
                  src={movie.posterImageUrl || "/placeholder.svg"}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                  priority={true}
                />
              </div>
            </div>
          </div>

          <div className="pt-16 sm:pt-20 px-4 sm:px-6 pb-6">
            <div className="mb-6">
              <h1 className={`text-2xl sm:text-3xl md:text-4xl font-black mb-2 bg-clip-text text-transparent leading-tight transition-all duration-300 ${
                theme === "light"
                  ? "bg-gradient-to-r from-black via-gray-800 to-gray-600"
                  : "bg-gradient-to-r from-white via-slate-100 to-slate-300"
              }`}>
                {movie.title}
              </h1>
              <div className={`flex items-center gap-2 ${
                theme === "light" ? "text-gray-600" : "text-slate-400"
              }`}>
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">{movie.year}</span>
              </div>
            </div>

            {movie.directedBy && (
              <div className="mb-6">
                <h3 className={`text-lg font-bold mb-3 bg-clip-text text-transparent transition-all duration-300 ${
                  theme === "light"
                    ? "bg-gradient-to-r from-black to-gray-600"
                    : "bg-gradient-to-r from-white to-slate-300"
                }`}>
                  Directed By
                </h3>
                <div className="flex items-center gap-2">
                  <Film className={`w-4 h-4 ${
                    theme === "light" ? "text-gray-600" : "text-slate-400"
                  }`} />
                  <span className={`font-medium ${
                    theme === "light" ? "text-gray-700" : "text-slate-300"
                  }`}>{movie.directedBy}</span>
                </div>
              </div>
            )}

            <div className="mb-6">
              <h3 className={`text-lg font-bold mb-3 bg-clip-text text-transparent transition-all duration-300 ${
                theme === "light"
                  ? "bg-gradient-to-r from-black to-gray-600"
                  : "bg-gradient-to-r from-white to-slate-300"
              }`}>
                Genres
              </h3>
              <div className="flex flex-wrap gap-2">
                {movie.genre && movie.genre.map((g, index) => (
                  <span
                    key={index}
                    className={`backdrop-blur-sm px-3 py-1.5 rounded-full text-xs border transition-all duration-300 font-medium ${
                      theme === "light"
                        ? "bg-gray-100 text-black border-gray-300 hover:bg-gray-200 hover:border-gray-400"
                        : "bg-white/5 text-slate-200 border-white/10 hover:bg-white/10 hover:border-white/20"
                    }`}
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className={`text-lg font-bold mb-3 bg-clip-text text-transparent transition-all duration-300 ${
                theme === "light"
                  ? "bg-gradient-to-r from-black to-gray-600"
                  : "bg-gradient-to-r from-white to-slate-300"
              }`}>
                Synopsis
              </h3>
              <p className={`leading-relaxed text-sm sm:text-base transition-all duration-300 ${
                theme === "light" ? "text-gray-700" : "text-slate-300"
              }`}>
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
  const { theme } = useTheme();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onClick={onClick}
      className="group relative cursor-pointer"
    >
      <div className={`relative overflow-hidden rounded-2xl border-2 border-dashed backdrop-blur-sm transition-all duration-300 ${
        theme === "light"
          ? "border-gray-300 bg-gray-50 hover:border-black/60 hover:shadow-lg hover:shadow-black/10"
          : "border-slate-700/50 bg-slate-900/30 hover:border-amber-400/50 hover:shadow-lg hover:shadow-amber-400/10"
      }`}>
        <div className="relative aspect-[2/3] overflow-hidden">
          <OptimizedImage
            src={movie.posterImageUrl || "/placeholder.svg"}
            alt={movie.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        <div className="p-4">
          <h3 className={`mb-1 font-bold line-clamp-2 transition-colors ${
            theme === "light"
              ? "text-black group-hover:text-gray-700"
              : "text-white group-hover:text-amber-400"
          }`}>
            {movie.title}
          </h3>
          <p className={`mb-2 text-sm ${
            theme === "light" ? "text-gray-600" : "text-slate-400"
          }`}>{movie.year}</p>
        </div>

        <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className={`absolute inset-0 rounded-2xl ${
            theme === "light"
              ? "bg-gradient-to-r from-black/5 to-gray-600/5"
              : "bg-gradient-to-r from-amber-400/5 to-emerald-400/5"
          }`} />
        </div>
      </div>
    </motion.div>
  );
};

// Movie Grid Component
const MovieGrid = ({ movies, onMovieClick }) => {
  return (
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
          onClick={() => onMovieClick(movie)}
        />
      ))}
    </motion.div>
  );
};

// Main Page Component
const WarPage = () => {
  const GENRE = "War";
  const { token, loading: authLoading } = useAuth();
  const { theme } = useTheme();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchGenreMovies = async () => {
      if (authLoading) {
        return;
      }

      if (!token) {
        const errorMsg = "Please log in to view movies";
        setError(errorMsg);
        showErrorToast(errorMsg);
        setIsLoading(false);
        setMovies([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      const loadingToastId = showLoadingToast(`Loading ${GENRE} movies...`);

      try {
        const response = await axios.get(
          `https://api.thecineprism.com/api/v1/admin/fetch-byGenre/${GENRE}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.genrePosts && Array.isArray(response.data.genrePosts)) {
          const sortedMovies = response.data.genrePosts.sort((a, b) =>
            a.title.localeCompare(b.title)
          );
          setMovies(sortedMovies);
          dismissToast(loadingToastId);

          if (sortedMovies.length > 0) {
            showSuccessToast(`Loaded ${sortedMovies.length} ${GENRE} movies`);
          } else {
            showInfoToast(`No ${GENRE} movies available yet`);
          }
          setError(null);
        } else {
          const errorMsg = response.data.message || "Unexpected response format";
          setError(errorMsg);
          dismissToast(loadingToastId);
          showErrorToast(errorMsg);
          setMovies([]);
        }
      } catch (err) {
        console.error("Error fetching genre movies:", err);
        dismissToast(loadingToastId);

        let errorMsg;
        if (err.response?.status === 401 || err.response?.status === 403) {
          errorMsg = "Authentication failed. Please log in again.";
        } else if (err.response?.status === 404) {
          errorMsg = `No movies found for genre: ${GENRE}`;
        } else if (err.response?.status === 500) {
          errorMsg = "Server error. Please try again later.";
        } else if (err.code === 'ECONNABORTED' || err.message === 'Network Error') {
          errorMsg = "Network error. Please check your connection.";
        } else {
          errorMsg = err.response?.data?.message || "Failed to load movies. Please try again.";
        }

        setError(errorMsg);
        showErrorToast(errorMsg);
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGenreMovies();
  }, [token, authLoading]);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  if (isLoading) {
    return (
      <div className={`flex min-h-screen items-center justify-center pt-20 transition-all duration-300 ${
        theme === "light" ? "bg-white" : "bg-slate-950"
      }`}>
        <div className="text-center">
          <div className={`mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 ${
            theme === "light" ? "border-black" : "border-emerald-400"
          }`}></div>
          <p className={theme === "light" ? "text-gray-600" : "text-slate-400"}>
            Loading {GENRE} Movies...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-20 transition-all duration-300 ${
      theme === "light" ? "bg-white" : "bg-slate-950"
    }`}>
      <div className="absolute inset-0 opacity-20">
        {theme === "light" ? (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(0,0,0,0.03),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(0,0,0,0.03),transparent_50%)]" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(16,185,129,0.03),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(245,158,11,0.03),transparent_50%)]" />
          </>
        )}
      </div>

      <section className="relative py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className={`mb-4 sm:mb-6 bg-clip-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-transparent transition-all duration-300 ${
              theme === "light"
                ? "bg-gradient-to-r from-black via-gray-800 to-gray-600"
                : "bg-gradient-to-r from-white via-emerald-200 to-slate-400"
            }`}>
              {movies.length > 0 ? `Top ${movies.length} ${GENRE} Movies` : `${GENRE} Movies`}
            </h1>
          </motion.div>
        </div>
      </section>

      {error && (
        <section className="relative pb-4">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 rounded-xl border p-6 transition-all duration-300 shadow-lg ${
                theme === "light"
                  ? "border-red-400/50 bg-red-50"
                  : "border-red-500/30 bg-red-900/20"
              }`}
            >
              <div className="flex items-start gap-3">
                <svg
                  className={`w-6 h-6 flex-shrink-0 ${
                    theme === "light" ? "text-red-600" : "text-red-400"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div className="flex-1">
                  <h3 className={`font-bold mb-1 ${
                    theme === "light" ? "text-red-800" : "text-red-300"
                  }`}>
                    Error Loading Movies
                  </h3>
                  <p className={`${
                    theme === "light" ? "text-red-700" : "text-red-400"
                  }`}>
                    {error}
                  </p>
                  {error.includes("log in") && (
                    <button
                      onClick={() => window.location.href = '/'}
                      className={`mt-3 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        theme === "light"
                          ? "bg-red-600 text-white hover:bg-red-700"
                          : "bg-red-500 text-white hover:bg-red-600"
                      }`}
                    >
                      Go to Login
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <section className="relative pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {movies.length > 0 ? (
            <MovieGrid
              movies={movies}
              onMovieClick={handleMovieClick}
            />
          ) : !error && !isLoading ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className={`inline-block p-8 rounded-2xl backdrop-blur-sm border ${
                theme === "light"
                  ? "bg-gray-50/50 border-gray-200"
                  : "bg-slate-900/50 border-slate-700/50"
              }`}>
                <svg
                  className={`w-16 h-16 mx-auto mb-4 ${
                    theme === "light" ? "text-gray-400" : "text-slate-500"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                  />
                </svg>
                <p className={`text-xl font-medium mb-2 ${
                  theme === "light" ? "text-gray-700" : "text-slate-300"
                }`}>
                  No {GENRE} movies available yet
                </p>
                <p className={`text-sm ${
                  theme === "light" ? "text-gray-500" : "text-slate-500"
                }`}>
                  Check back later for new additions to this genre
                </p>
              </div>
            </motion.div>
          ) : null}
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

export default WarPage;

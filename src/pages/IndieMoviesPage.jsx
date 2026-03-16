"use client";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, X, Filter, Share2, Check, Calendar, Film, Tv } from "lucide-react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import OptimizedImage from "../components/OptimizedImage";
import {
  showSuccessToast,
  showErrorToast,
  showLoadingToast,
  showInfoToast,
  dismissToast,
} from "../utils/toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// ─── Modal ────────────────────────────────────────────────────────────────────
const MovieDetailsModal = ({ movie, onClose }) => {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);

  if (!movie) return null;

  const handleShare = async () => {
    const shareUrl = `https://api.thecineprism.com/api/v1/html/indie/${movie.id}`;
    const shareData = {
      title: `${movie.title} | TheCinePrism`,
      text: movie.synopsis
        ? movie.synopsis.substring(0, 100) + "..."
        : `Check out ${movie.title} on TheCinePrism`,
      url: shareUrl,
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch {}
    } else {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
            theme === "light" ? "text-black group-hover:text-gray-700" : "text-white group-hover:text-slate-200"
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
            {/* Title + Share */}
            <div className="mb-6 flex items-start justify-between gap-4">
              <div className="flex-1">
                <h1 className={`text-2xl sm:text-3xl md:text-4xl font-black mb-2 bg-clip-text text-transparent leading-tight transition-all duration-300 ${
                  theme === "light"
                    ? "bg-gradient-to-r from-black via-gray-800 to-gray-600"
                    : "bg-gradient-to-r from-white via-slate-100 to-slate-300"
                }`}>
                  {movie.title}
                </h1>
                <div className={`flex items-center gap-2 ${theme === "light" ? "text-gray-600" : "text-slate-400"}`}>
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">{movie.year}</span>
                </div>
              </div>
              <button
                onClick={handleShare}
                className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium transition-all duration-300 ${
                  theme === "light"
                    ? "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
                    : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                }`}
              >
                {copied ? (
                  <><Check className="w-3.5 h-3.5 text-emerald-400" /><span className="text-emerald-400">Copied!</span></>
                ) : (
                  <><Share2 className="w-3.5 h-3.5" />Share</>
                )}
              </button>
            </div>

            {movie.directedBy && (
              <div className="mb-6">
                <h3 className={`text-lg font-bold mb-3 bg-clip-text text-transparent ${
                  theme === "light" ? "bg-gradient-to-r from-black to-gray-600" : "bg-gradient-to-r from-white to-slate-300"
                }`}>Directed By</h3>
                <div className="flex items-center gap-2">
                  <Film className={`w-4 h-4 ${theme === "light" ? "text-gray-600" : "text-slate-400"}`} />
                  <span className={`font-medium ${theme === "light" ? "text-gray-700" : "text-slate-300"}`}>
                    {movie.directedBy}
                  </span>
                </div>
              </div>
            )}

            {movie.streamingAt && (
              <div className="mb-6">
                <h3 className={`text-lg font-bold mb-3 bg-clip-text text-transparent ${
                  theme === "light" ? "bg-gradient-to-r from-black to-gray-600" : "bg-gradient-to-r from-white to-slate-300"
                }`}>Streaming At</h3>
                <div className="flex items-center gap-2">
                  <Tv className={`w-4 h-4 ${theme === "light" ? "text-gray-600" : "text-slate-400"}`} />
                  <span className={`font-medium ${theme === "light" ? "text-gray-700" : "text-slate-300"}`}>
                    {movie.streamingAt}
                  </span>
                </div>
              </div>
            )}

            <div className="mb-6">
              <h3 className={`text-lg font-bold mb-3 bg-clip-text text-transparent ${
                theme === "light" ? "bg-gradient-to-r from-black to-gray-600" : "bg-gradient-to-r from-white to-slate-300"
              }`}>Genres</h3>
              <div className="flex flex-wrap gap-2">
                {movie.genres?.map((g, i) => (
                  <span key={i} className={`backdrop-blur-sm px-3 py-1.5 rounded-full text-xs border font-medium transition-all duration-300 ${
                    theme === "light"
                      ? "bg-gray-100 text-black border-gray-300 hover:bg-gray-200"
                      : "bg-white/5 text-slate-200 border-white/10 hover:bg-white/10"
                  }`}>{g}</span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className={`text-lg font-bold mb-3 bg-clip-text text-transparent ${
                theme === "light" ? "bg-gradient-to-r from-black to-gray-600" : "bg-gradient-to-r from-white to-slate-300"
              }`}>Synopsis</h3>
              <p className={`leading-relaxed text-sm sm:text-base ${
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

// ─── Card ─────────────────────────────────────────────────────────────────────
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
        <div className="p-3 space-y-2">
          <h3 className={`font-bold text-sm leading-tight line-clamp-2 transition-colors ${
            theme === "light" ? "text-black group-hover:text-gray-700" : "text-white group-hover:text-amber-400"
          }`}>{movie.title}</h3>
          <div className="flex items-center gap-1.5">
            <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
              theme === "light" ? "bg-gray-200 text-gray-600" : "bg-slate-700 text-slate-300"
            }`}>{movie.year}</span>
            {movie.directedBy && (
              <>
                <span className={`text-xs ${theme === "light" ? "text-gray-400" : "text-slate-600"}`}>·</span>
                <span className={`text-xs truncate ${theme === "light" ? "text-gray-500" : "text-slate-400"}`}>
                  {movie.directedBy}
                </span>
              </>
            )}
          </div>
          {movie.streamingAt && (
            <div className="flex items-center gap-1">
              <Tv className={`w-3 h-3 flex-shrink-0 ${theme === "light" ? "text-gray-400" : "text-slate-500"}`} />
              <span className={`text-xs font-medium truncate ${
                theme === "light" ? "text-gray-500" : "text-emerald-400/80"
              }`}>{movie.streamingAt}</span>
            </div>
          )}
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

// ─── Grid ─────────────────────────────────────────────────────────────────────
const MovieGrid = ({ movies, onMovieClick }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.4, delay: 0.1 }}
    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8"
  >
    {movies.map((movie, index) => (
      <MovieCard key={movie.id} movie={movie} index={index} onClick={() => onMovieClick(movie)} />
    ))}
  </motion.div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
const IndieMoviesPage = () => {
  const { token, loading: authLoading } = useAuth();
  const { theme } = useTheme();

  const [allMovies, setAllMovies]         = useState([]);
  const [isLoading, setIsLoading]         = useState(true);
  const [error, setError]                 = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [activeGenre, setActiveGenre]     = useState("all");
  const [searchQuery, setSearchQuery]     = useState("");

  const genres = [
    { key: "all",         label: "All Genres" },
    { key: "Action",      label: "Action" },
    { key: "Comedy",      label: "Comedy" },
    { key: "Crime",       label: "Crime" },
    { key: "Documentary", label: "Documentary" },
    { key: "Drama",       label: "Drama" },
    { key: "Fantasy",     label: "Fantasy" },
    { key: "Horror",      label: "Horror" },
    { key: "Indie",       label: "Indie" },
    { key: "IndianIndie", label: "Indian Indie" },
    { key: "Music",       label: "Music" },
    { key: "Mystery",     label: "Mystery" },
    { key: "Romance",     label: "Romance" },
    { key: "Sci-Fi",      label: "Sci-Fi" },
    { key: "Thriller",    label: "Thriller" },
    { key: "WorldIndie",  label: "World Indie" },
  ];

  useEffect(() => {
    const fetchIndieMovies = async () => {
      setIsLoading(true);
      setError(null);
      const loadingToastId = showLoadingToast("Loading Indie movies...");
      try {
        const response = await axios.get(
          "http://localhost:3500/api/v1/admin/fetch-indie",
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.indieMovies && Array.isArray(response.data.indieMovies)) {
          const sorted = response.data.indieMovies.sort((a, b) => a.title.localeCompare(b.title));
          setAllMovies(sorted);
          dismissToast(loadingToastId);
          sorted.length > 0
            ? showSuccessToast(`Loaded ${sorted.length} Indie movies`)
            : showInfoToast("No Indie movies available yet");
        } else {
          const msg = response.data.message || "Unexpected response format";
          setError(msg);
          dismissToast(loadingToastId);
          showErrorToast(msg);
        }
      } catch (err) {
        dismissToast(loadingToastId);
        const msg =
          err.response?.status === 401 || err.response?.status === 403
            ? "Authentication failed. Please log in again."
            : err.response?.status === 404
            ? "No indie movies found"
            : err.response?.data?.message || "Failed to load movies. Please try again.";
        setError(msg);
        showErrorToast(msg);
        setAllMovies([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchIndieMovies();
  }, [token, authLoading]);

  const movieCounts = useMemo(() => {
    const counts = { all: allMovies.length };
    genres.forEach((g) => {
      if (g.key === "all") return;
      counts[g.key] = allMovies.filter((m) =>
        m.genres?.some((mg) => mg.toLowerCase() === g.key.toLowerCase())
      ).length;
    });
    return counts;
  }, [allMovies]);

  const filteredMovies = useMemo(() => {
    let filtered = allMovies;
    if (activeGenre !== "all") {
      filtered = filtered.filter((m) =>
        m.genres?.some((g) => g.toLowerCase() === activeGenre.toLowerCase())
      );
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (m) =>
          m.title?.toLowerCase().includes(q) ||
          m.directedBy?.toLowerCase().includes(q) ||
          m.streamingAt?.toLowerCase().includes(q) ||
          m.year?.toString().includes(q)
      );
    }
    return filtered;
  }, [activeGenre, searchQuery, allMovies]);

  const activeGenreLabel = genres.find((g) => g.key === activeGenre)?.label || "All Genres";

  if (isLoading) {
    return (
      <div className={`flex min-h-screen items-center justify-center pt-20 transition-colors duration-300 ${
        theme === "light" ? "bg-white" : "bg-slate-950"
      }`}>
        <div className="text-center">
          <div className={`mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 ${
            theme === "light" ? "border-black" : "border-emerald-400"
          }`} />
          <p className={theme === "light" ? "text-gray-600" : "text-slate-400"}>Loading Indie Movies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-20 transition-colors duration-300 ${
      theme === "light" ? "bg-white" : "bg-slate-950"
    }`}>
      {/* Ambient bg */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className={`absolute inset-0 ${
          theme === "light"
            ? "bg-[radial-gradient(circle_at_25%_25%,rgba(0,0,0,0.03),transparent_50%)]"
            : "bg-[radial-gradient(circle_at_25%_25%,rgba(16,185,129,0.03),transparent_50%)]"
        }`} />
        <div className={`absolute inset-0 ${
          theme === "light"
            ? "bg-[radial-gradient(circle_at_75%_75%,rgba(0,0,0,0.02),transparent_50%)]"
            : "bg-[radial-gradient(circle_at_75%_75%,rgba(245,158,11,0.03),transparent_50%)]"
        }`} />
      </div>

      {/* ── Hero ── */}
      <section className="relative py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            

            {/* Line 1 */}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className={`block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black italic leading-none tracking-tight bg-clip-text text-transparent ${
                theme === "light"
                  ? "bg-gradient-to-r from-black via-gray-700 to-gray-500"
                  : "bg-gradient-to-br from-white via-emerald-100 to-slate-300"
              }`}
            >
              Greatest Indian
            </motion.span>

            {/* Line 2 */}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className={`block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black italic leading-none tracking-tight bg-clip-text text-transparent ${
                theme === "light"
                  ? "bg-gradient-to-r from-black via-gray-700 to-gray-500"
                  : "bg-gradient-to-br from-white via-emerald-100 to-slate-300"
              }`}
            >
              Films Ever Created
            </motion.span>

            {/* Ornament */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center justify-center gap-4 mt-6"
            >
              <div className={`h-px flex-1 max-w-[80px] ${theme === "light" ? "bg-gray-300" : "bg-white/15"}`} />
              
              <span className={`text-xs font-medium tracking-widest uppercase ${
                theme === "light" ? "text-gray-400" : "text-slate-500"
              }`}>The Cinéprism</span>
              
              <div className={`h-px flex-1 max-w-[80px] ${theme === "light" ? "bg-gray-300" : "bg-white/15"}`} />
            </motion.div>

            
          </motion.div>
        </div>
      </section>

      {/* ── Error ── */}
      {error && (
        <section className="relative pb-4">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className={`mb-6 rounded-lg border p-4 ${
              theme === "light" ? "border-red-400/50 bg-red-100/50" : "border-red-500/30 bg-red-900/20"
            }`}>
              <p className={`text-center text-sm ${theme === "light" ? "text-red-700" : "text-red-400"}`}>{error}</p>
            </div>
          </div>
        </section>
      )}

      {/* ── Search + Filter ── */}
      <section className={`relative border-t border-b backdrop-blur-sm ${
        theme === "light" ? "border-gray-200 bg-gray-50/50" : "border-slate-800/50 bg-slate-900/20"
      }`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto space-y-4"
          >
            {/* Search bar */}
            <div className="relative">
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 z-10 ${
                theme === "light" ? "text-gray-600" : "text-slate-400"
              }`} />
              <input
                type="text"
                placeholder="Search by title, director, platform, or year..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-12 pr-10 py-3 sm:py-4 backdrop-blur-xl border rounded-xl transition-all duration-300 text-sm sm:text-base focus:outline-none ${
                  theme === "light"
                    ? "bg-gray-100/70 border-gray-300 text-black placeholder-gray-500 focus:border-black focus:bg-gray-100"
                    : "bg-white/5 border-white/10 text-white placeholder-slate-400 focus:border-emerald-400/50 focus:bg-white/10"
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full transition-colors z-10 ${
                    theme === "light" ? "hover:bg-gray-200" : "hover:bg-white/10"
                  }`}
                >
                  <X className={`h-4 w-4 ${theme === "light" ? "text-gray-600" : "text-slate-400"}`} />
                </button>
              )}
            </div>

            {/* Genre dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className={`flex items-center justify-between w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl backdrop-blur-xl border transition-all duration-300 focus:outline-none focus:ring-2 ${
                theme === "light"
                  ? "bg-gray-100/70 border-gray-300 text-black hover:bg-gray-200 hover:border-black/40 focus:ring-black/50"
                  : "bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-emerald-500/50 focus:ring-emerald-500/50"
              }`}>
                <div className="flex items-center gap-2 sm:gap-3">
                  <Filter className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="font-medium text-sm sm:text-base">
                    {activeGenreLabel} ({movieCounts[activeGenre] || 0})
                  </span>
                </div>
                <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className={`w-full sm:w-80 max-h-80 overflow-y-auto backdrop-blur-xl ${
                theme === "light" ? "bg-white/98 border-gray-300" : "bg-slate-900/98 border-white/10"
              }`}>
                <DropdownMenuLabel className={`font-semibold px-4 py-2 text-sm ${
                  theme === "light" ? "text-gray-800" : "text-slate-300"
                }`}>
                  Filter by Genre
                </DropdownMenuLabel>
                <DropdownMenuSeparator className={theme === "light" ? "bg-gray-300" : "bg-white/10"} />
                {genres.map((genre) => (
                  <DropdownMenuItem
                    key={genre.key}
                    onClick={() => setActiveGenre(genre.key)}
                    className={`cursor-pointer transition-colors px-4 py-3 text-sm ${
                      activeGenre === genre.key
                        ? theme === "light"
                          ? "bg-black/10 text-black hover:bg-black/20 focus:bg-black/20"
                          : "bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 focus:bg-emerald-500/30"
                        : theme === "light"
                        ? "text-gray-700 hover:text-black hover:bg-gray-100 focus:bg-gray-100"
                        : "text-slate-300 hover:text-emerald-200 hover:bg-emerald-500/10 focus:bg-emerald-500/10"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span>{genre.label}</span>
                      <span className="text-xs opacity-75">({movieCounts[genre.key] || 0})</span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>

          {searchQuery && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 text-center">
              <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-slate-400"}`}>
                {filteredMovies.length > 0
                  ? `Found ${filteredMovies.length} film${filteredMovies.length !== 1 ? "s" : ""} matching "${searchQuery}"`
                  : `No films found matching "${searchQuery}"`}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Results header ── */}
      <section className="relative py-6 sm:py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            key={`${activeGenre}-${searchQuery}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className={`text-2xl sm:text-3xl font-bold ${theme === "light" ? "text-black" : "text-white"}`}>
              {filteredMovies.length > 0
                ? searchQuery
                  ? `${filteredMovies.length} Film${filteredMovies.length !== 1 ? "s" : ""} Found`
                  : `${filteredMovies.length} ${activeGenre === "all" ? "Indie" : activeGenreLabel} Film${filteredMovies.length !== 1 ? "s" : ""}`
                : searchQuery
                ? `No Films Found for "${searchQuery}"`
                : `No ${activeGenreLabel} Films Found`}
            </h2>
          </motion.div>
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="relative pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filteredMovies.length > 0 ? (
            <MovieGrid movies={filteredMovies} onMovieClick={setSelectedMovie} />
          ) : !error ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
              <div className={`inline-block p-8 rounded-2xl backdrop-blur-sm border ${
                theme === "light" ? "bg-gray-50/50 border-gray-200" : "bg-slate-900/50 border-slate-700/50"
              }`}>
                <svg className={`w-16 h-16 mx-auto mb-4 ${theme === "light" ? "text-gray-400" : "text-slate-500"}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                </svg>
                <p className={`text-xl font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-slate-300"}`}>
                  {searchQuery ? `No films matching "${searchQuery}"` : "No Indie movies available yet"}
                </p>
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")}
                    className={`mt-3 text-sm underline transition-colors ${
                      theme === "light" ? "text-black hover:text-gray-700" : "text-emerald-400 hover:text-emerald-300"
                    }`}>
                    Clear search
                  </button>
                )}
              </div>
            </motion.div>
          ) : null}
        </div>
      </section>

      <AnimatePresence>
        {selectedMovie && (
          <MovieDetailsModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default IndieMoviesPage;
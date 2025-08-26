"use client";
import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, ChevronDown, X } from "lucide-react";
import axios from "axios";
import MovieGrid from "../components/MovieGrid";
const TopPicksPage = () => {
  const [activeGenre, setActiveGenre] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allMovies, setAllMovies] = useState([]);
  const [showGenreDropdown, setShowGenreDropdown] = useState(false);
  const token =
    localStorage.getItem("cineprism_auth_token") ||
    sessionStorage.getItem("cineprism_auth_token");
  
  const genres = [
    { key: "all", label: "All Genres" },
    { key: "action", label: "Action" },
    { key: "adventure", label: "Adventure" },
    { key: "biography", label: "Biography" },
    { key: "comedy", label: "Comedy" },
    { key: "crime", label: "Crime" },
    { key: "drama", label: "Drama" },
    { key: "fantasy", label: "Fantasy" },
    { key: "history", label: "History" },
    { key: "horror", label: "Horror" },
    { key: "music", label: "Music" },
    { key: "mystery", label: "Mystery" },
    { key: "romance", label: "Romance" },
    { key: "scifi", label: "Sci-Fi" },
    { key: "thriller", label: "Thriller" },
    { key: "war", label: "War" },
    { key: "western", label: "Western" },
  ];

  // Helper function to transform the API response into a consistent movie object structure
  const transformMovieData = (topPicks) => {
    return topPicks.map((item) => ({
      id: item.id,
      title: item.title,
      year: item.year,
      posterImageUrl: item.posterImageUrl,
      // The specific genre this was a "top pick" for, used for filtering
      topPickGenre: item.genre,
      // Adding default values for fields that might be expected elsewhere
      content: "",
      origin: "",
      duration: 0,
      genres: [item.genre],
      reviewPosterImageUrl: "",
      ratingCategory: "",
      relatedPostIds: [],
      createdAt: item.createdAt || new Date().toISOString(),
      updatedAt: item.updatedAt || new Date().toISOString(),
    }));
  };

  // useEffect to fetch all top picks when the component mounts
  useEffect(() => {
    const fetchAllTopPicks = async () => {
      setInitialLoading(true);
      setError(null);
      try {
        const response = await axios.post(
          `https://testingcineprismbackend-production.up.railway.app/api/v1/admin/fetch-top-picks`,
          {},
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`, // <-- sending token here
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data && response.data.topPicks) {
          const transformedMovies = transformMovieData(response.data.topPicks);
          setAllMovies(transformedMovies);
        }
      } catch (err) {
        console.error("Error fetching top picks:", err);
        setError(err.response?.data?.message || "Failed to fetch top picks");
        setAllMovies([]);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchAllTopPicks();
  }, []);

  // Calculate movie counts for each genre
  const movieCounts = useMemo(() => {
    const counts = { all: allMovies.length };
    genres.forEach((genre) => {
      if (genre.key === "all") return;
      counts[genre.key] = allMovies.filter(
        (movie) => movie.topPickGenre.toLowerCase() === genre.key.toLowerCase()
      ).length;
    });
    return counts;
  }, [allMovies]);

  // Filter movies based on active genre and search query
  const filteredMovies = useMemo(() => {
    let filtered = allMovies;

    // Filter by genre
    if (activeGenre !== "all") {
      filtered = filtered.filter(
        (movie) =>
          movie.topPickGenre.toLowerCase() === activeGenre.toLowerCase()
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (movie) =>
          movie.title.toLowerCase().includes(query) ||
          movie.topPickGenre.toLowerCase().includes(query) ||
          movie.year?.toString().includes(query)
      );
    }

    return filtered;
  }, [activeGenre, searchQuery, allMovies]);

 const handleGenreSelect = (genreKey) => {
   console.log("handleGenreSelect called with:", genreKey); // Debug log
   setIsLoading(true);
   setActiveGenre(genreKey);
   setShowGenreDropdown(false);

   // Remove the setTimeout and just set loading to false immediately
   // The genre change should be instant
   setIsLoading(false);
 };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const activeGenreLabel =
    genres.find((g) => g.key === activeGenre)?.label || "All Genres";
  const movieCount = filteredMovies.length;

  // Initial loading screen
  if (initialLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 pt-20 text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-emerald-400"></div>
          <p className="text-slate-400">Loading Top Picks...</p>
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
              Top Picks
            </h1>
            <p className="mx-auto max-w-3xl text-base sm:text-lg lg:text-xl leading-relaxed text-slate-400 px-4">
              The Greatest Films in Cinema History - Curated by Leading Film
              Scholars
            </p>
          </motion.div>
        </div>
      </section>

      {/* Error Message */}
      {error && (
        <section className="relative pb-4">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-6 rounded-lg border border-red-500/30 bg-red-900/20 p-4">
              <p className="text-center text-red-400 text-sm sm:text-base">
                {error}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Enhanced Search Section */}
      <section className="relative border-t border-b border-slate-800/50 bg-slate-900/20 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-4xl mx-auto"
          >
            {/* Extended Search Bar */}
            <div className="flex-1 relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search films by title, genre, or year..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-12 pr-10 py-3 sm:py-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all duration-300 text-sm sm:text-base"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors duration-200"
                  >
                    <X className="h-4 w-4 text-slate-400 hover:text-white" />
                  </button>
                )}
              </div>
            </div>

            {/* Fixed Genre Dropdown */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowGenreDropdown(!showGenreDropdown);
                }}
                className="w-full sm:w-auto flex items-center justify-between gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 min-w-[200px]"
              >
                <span className="font-medium text-sm sm:text-base truncate">
                  {activeGenreLabel}
                  {movieCounts[activeGenre] !== undefined && (
                    <span className="ml-2 text-xs opacity-75">
                      ({movieCounts[activeGenre]})
                    </span>
                  )}
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                    showGenreDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Fixed Dropdown Menu */}
              {showGenreDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800/98 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-[9999] max-h-80 overflow-y-auto">
                  <div className="py-1">
                    {genres.map((genre) => (
                      <button
                        key={genre.key}
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          console.log("Genre clicked:", genre.key); // Debug log
                          handleGenreSelect(genre.key);
                        }}
                        className={`w-full text-left px-4 py-3 hover:bg-white/10 transition-colors duration-200 text-sm sm:text-base block ${
                          activeGenre === genre.key
                            ? "bg-emerald-500/20 text-emerald-300"
                            : "text-slate-300 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span>{genre.label}</span>
                          {movieCounts[genre.key] !== undefined && (
                            <span className="text-xs opacity-75 ml-2">
                              ({movieCounts[genre.key]})
                            </span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Search Results Info */}
          {searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-center"
            >
              <p className="text-slate-400 text-sm">
                {filteredMovies.length > 0
                  ? `Found ${filteredMovies.length} film${
                      filteredMovies.length !== 1 ? "s" : ""
                    } matching "${searchQuery}"`
                  : `No films found matching "${searchQuery}"`}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Fixed Click Outside Handler */}
      {showGenreDropdown && (
        <div
          className="fixed inset-0 z-[9998]"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowGenreDropdown(false);
          }}
        />
      )}

      {/* Results Header */}
      <section className="relative py-6 sm:py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            key={`${activeGenre}-${searchQuery}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              {movieCount > 0
                ? searchQuery
                  ? `${movieCount} Film${movieCount !== 1 ? "s" : ""} Found`
                  : `Top ${movieCount} ${
                      activeGenre === "all" ? "" : activeGenreLabel
                    } Films`
                : searchQuery
                ? `No Films Found for "${searchQuery}"`
                : `No ${activeGenreLabel} Films Found`}
            </h2>
          </motion.div>
        </div>
      </section>

      {/* Movie Grid */}
      <section className="relative pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <MovieGrid movies={filteredMovies} isLoading={isLoading} />

          {!isLoading && filteredMovies.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 text-center"
            >
              <button className="rounded-xl bg-gradient-to-r from-emerald-500/20 to-amber-500/20 backdrop-blur-xl border border-white/10 px-6 sm:px-8 py-3 sm:py-4 text-white font-semibold transition-all duration-300 hover:from-emerald-500/30 hover:to-amber-500/30 hover:scale-105 text-sm sm:text-base">
                View All {movieCount}{" "}
                {searchQuery
                  ? "Results"
                  : `${activeGenre === "all" ? "" : activeGenreLabel} Films`}
              </button>
            </motion.div>
          )}

          {!isLoading && filteredMovies.length === 0 && !error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <div className="text-slate-400 text-base sm:text-lg">
                {searchQuery
                  ? `No films found matching "${searchQuery}"${
                      activeGenre !== "all"
                        ? ` in ${activeGenreLabel.toLowerCase()}`
                        : ""
                    }.`
                  : `No films found for ${activeGenreLabel.toLowerCase()}.`}
              </div>
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="mt-4 text-emerald-400 hover:text-emerald-300 transition-colors duration-200 text-sm underline"
                >
                  Clear search and show all films
                </button>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* Click outside to close dropdown */}
      {showGenreDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowGenreDropdown(false)}
        />
      )}
    </div>
  );
};

export default TopPicksPage;

"use client";
import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, ChevronDown, X, Filter } from "lucide-react";
import axios from "axios";
import MovieGrid from "../components/MovieGrid";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TopPicksPage = () => {
  const [activeGenre, setActiveGenre] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allMovies, setAllMovies] = useState([]);

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
      topPickGenre: item.genre,
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
              Authorization: `Bearer ${token}`,
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
  }, [token]);

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
    console.log("Genre selected:", genreKey);
    setActiveGenre(genreKey);
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

      {/* Search and Filter Section with ShadCN Dropdown */}
      <section className="relative border-t border-b border-slate-800/50 bg-slate-900/20 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col lg:flex-row gap-4 max-w-6xl mx-auto"
          >
            {/* Wider Search Bar */}
            <div className="flex-1 max-w-4xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search films by title, genre, or year..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-12 pr-10 py-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all duration-300 text-base"
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

            {/* Single Genre Dropdown for All Devices */}
            <div className="flex justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center justify-between gap-3 px-6 py-4 min-w-[220px] rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-white hover:bg-white/10 hover:border-emerald-500/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span className="font-medium">
                      {activeGenreLabel} ({movieCounts[activeGenre] || 0})
                    </span>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 max-h-80 overflow-y-auto bg-slate-900/98 border-white/10 backdrop-blur-xl">
                  <DropdownMenuLabel className="text-slate-300 font-semibold px-4 py-2">
                    Filter by Genre
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  {genres.map((genre) => (
                    <DropdownMenuItem
                      key={genre.key}
                      onClick={() => handleGenreSelect(genre.key)}
                      className={`cursor-pointer transition-colors px-4 py-3 ${
                        activeGenre === genre.key
                          ? "bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 focus:bg-emerald-500/30"
                          : "text-slate-300 hover:text-emerald-200 hover:bg-emerald-500/10 focus:bg-emerald-500/10 focus:text-emerald-200"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span>{genre.label}</span>
                        <span className="text-xs opacity-75">
                          ({movieCounts[genre.key] || 0})
                        </span>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
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
    </div>
  );
};

export default TopPicksPage;

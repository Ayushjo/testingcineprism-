"use client";
import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import axios from "axios";
import MovieGrid from "./MovieGrid";

const TopPicksPage = () => {
  const [activeGenre, setActiveGenre] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allMovies, setAllMovies] = useState([]);

  const genres = [
    { key: "all", label: "All" },
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
          { withCredentials: true }
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

  // Filter movies based on active genre
  const filteredMovies = useMemo(() => {
    if (activeGenre === "all") {
      return allMovies;
    }
    return allMovies.filter(
      (movie) => movie.topPickGenre.toLowerCase() === activeGenre.toLowerCase()
    );
  }, [activeGenre, allMovies]);

  const handleGenreSelect = (genreKey) => {
    setIsLoading(true);
    setActiveGenre(genreKey);

    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  const activeGenreLabel =
    genres.find((g) => g.key === activeGenre)?.label || "All";
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

      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-5xl font-black tracking-tight text-transparent md:text-7xl">
              Top Picks
            </h1>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-slate-400">
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
              <p className="text-center text-red-400">{error}</p>
            </div>
          </div>
        </section>
      )}

      <section className="relative border-t border-b border-slate-800/50 bg-slate-900/20 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-center">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-3 text-slate-300 transition-all duration-300 hover:bg-white/10 hover:text-white"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Search className="h-5 w-5" />
              <span className="font-medium">Search Films</span>
            </motion.button>
          </div>
        </div>
      </section>

      <section className="relative py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {genres.map((genre, index) => (
              <motion.button
                key={genre.key}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                onClick={() => handleGenreSelect(genre.key)}
                className={`rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                  activeGenre === genre.key
                    ? "bg-amber-400 text-black shadow-lg shadow-amber-400/25"
                    : "border border-slate-600/50 bg-slate-800/30 text-slate-300 backdrop-blur-sm hover:border-slate-500 hover:bg-slate-700/50 hover:text-white"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {genre.label}
                {movieCounts[genre.key] !== undefined && (
                  <span className="ml-2 text-xs opacity-75">
                    ({movieCounts[genre.key]})
                  </span>
                )}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            key={activeGenre}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-white">
              {movieCount > 0
                ? `Top ${movieCount} ${activeGenreLabel} Films`
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
              <button className="rounded-xl bg-gradient-to-r from-emerald-500/20 to-amber-500/20 backdrop-blur-xl border border-white/10 px-8 py-4 text-white font-semibold transition-all duration-300 hover:from-emerald-500/30 hover:to-amber-500/30 hover:scale-105">
                View All {movieCount} {activeGenreLabel} Films
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
              <div className="text-slate-400 text-lg">
                No films found for {activeGenreLabel.toLowerCase()} genre.
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default TopPicksPage;

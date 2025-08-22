"use client";
import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import GenreSidebar from "./GenreSidebar.jsx";
import GenreDropdown from "./GenreDropdown.jsx";
import MovieGrid from "./MovieGrid.jsx";

const TopPicksPage = () => {
  // State for the active genre, loading transitions, and error handling
  const [activeGenre, setActiveGenre] = useState("all");
  const [isLoading, setIsLoading] = useState(false); // For genre change transitions
  const [initialLoading, setInitialLoading] = useState(true); // For the initial page load
  const [error, setError] = useState(null);

  // A single state to hold ALL movies fetched initially
  const [allMovies, setAllMovies] = useState([]);

  // List of available genres
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
          setAllMovies(transformedMovies); // Store all movies in one state
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
  }, []); // Empty dependency array ensures this runs only once

  // Memoized calculation for movie counts per genre
  const movieCounts = useMemo(() => {
    const counts = { all: allMovies.length };
    genres.forEach((genre) => {
      if (genre.key === "all") return;
      counts[genre.key] = allMovies.filter(
        (movie) => movie.topPickGenre.toLowerCase() === genre.key.toLowerCase()
      ).length;
    });
    return counts;
  }, [allMovies]); // Recalculates only when allMovies state changes

  // Memoized filtering of movies based on the active genre
  const filteredMovies = useMemo(() => {
    if (activeGenre === "all") {
      return allMovies;
    }
    return allMovies.filter(
      (movie) => movie.topPickGenre.toLowerCase() === activeGenre.toLowerCase()
    );
  }, [activeGenre, allMovies]); // Recalculates when genre or movies change

  // Handles genre selection. No API call is made here.
  const handleGenreSelect = (genreKey) => {
    setIsLoading(true); // Show a loading state for a smooth transition
    setActiveGenre(genreKey);

    // Simulate a brief loading period for better UX
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

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
    <div className="min-h-screen bg-slate-950 pt-20 text-white">
      {/* Ambient Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(16,185,129,0.03),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(139,92,246,0.03),transparent_50%)]" />
      </div>

      {/* Header Section */}
      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12 text-center"
          >
            <div className="mb-6 inline-block">
              <span className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-emerald-400 backdrop-blur-xl">
                🎬 Curated Collection
              </span>
            </div>
            <h1 className="mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-5xl font-black tracking-tight text-transparent md:text-7xl">
              Top Picks
            </h1>
            <p className="mx-auto max-w-2xl text-xl leading-relaxed text-slate-400">
              It's been a pleasure chatting with a fellow cinema lover.
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

      {/* Main Content */}
      <section className="relative pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-12">
            {/* Desktop Sidebar */}
            <div className="hidden flex-shrink-0 lg:block">
              <div className="sticky top-8">
                <GenreSidebar
                  genres={genres}
                  activeGenre={activeGenre}
                  onGenreSelect={handleGenreSelect}
                  movieCounts={movieCounts}
                />
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1">
              {/* Mobile Dropdown */}
              <div className="mb-8 lg:hidden">
                <GenreDropdown
                  genres={genres}
                  activeGenre={activeGenre}
                  onGenreSelect={handleGenreSelect}
                  movieCounts={movieCounts}
                />
              </div>

              {/* Results Header */}
              <motion.div
                className="mb-10"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h2 className="mb-2 text-3xl font-bold tracking-tight text-white">
                  {genres.find((g) => g.key === activeGenre)?.label}
                </h2>
                <p className="text-lg text-slate-400">
                  {filteredMovies.length}{" "}
                  {filteredMovies.length === 1 ? "title" : "titles"}
                </p>
              </motion.div>

              {/* Movie Grid */}
              <MovieGrid movies={filteredMovies} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TopPicksPage;

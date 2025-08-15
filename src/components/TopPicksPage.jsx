"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { recommendationsData } from "@/data/recommendationsData.js";
import GenreSidebar from "./GenreSidebar.jsx";
import GenreDropdown from "./GenreDropdown.jsx";
import MovieGrid from "./MovieGrid.jsx";

const TopPicksPage = () => {
  const [activeGenre, setActiveGenre] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  // Updated genres based on your image
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

  // Calculate movie counts for each genre
   const movieCounts = useMemo(() => {
     const counts = {};
     let totalCount = 0;

     // Get all movies from all categories
     const allMovies = Object.values(recommendationsData).flat();
     totalCount = allMovies.length;
     counts.all = totalCount;

     // Count movies by genre
     genres.forEach((genre) => {
       if (genre.key === "all") return;

       const genreCount = allMovies.filter(
         (movie) =>
           movie.genre &&
           movie.genre.toLowerCase() === genre.label.toLowerCase()
       ).length;

       counts[genre.key] = genreCount;
     });

     return counts;
   }, []);

   // Filter movies based on active genre
   const filteredMovies = useMemo(() => {
     // Get all movies from all categories
     const allMovies = Object.values(recommendationsData).flat();

     if (activeGenre === "all") {
       return allMovies;
     }

     // Find the genre label for the active genre key
     const selectedGenre = genres.find((g) => g.key === activeGenre);
     if (!selectedGenre) return [];

     // Filter movies by matching genre
     return allMovies.filter(
       (movie) =>
         movie.genre &&
         movie.genre.toLowerCase() === selectedGenre.label.toLowerCase()
     );
   }, [activeGenre]);

   const handleGenreSelect = (genreKey) => {
     setIsLoading(true);
     setActiveGenre(genreKey);

     // Simulate loading delay for smooth transition
     setTimeout(() => {
       setIsLoading(false);
     }, 200);
   };
  return (
    <div className="min-h-screen bg-slate-950 text-white pt-20">
      {/* Ambient Background - matching Reviews page */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(16,185,129,0.03),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(139,92,246,0.03),transparent_50%)]" />
      </div>

      {/* Header Section - matching Reviews page style */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-block mb-6">
              <span className="bg-white/5 backdrop-blur-xl text-emerald-400 px-4 py-2 rounded-2xl text-sm font-semibold border border-white/10">
                🎬 Curated Collection
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent tracking-tight">
              Top Picks
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              It's been a pleasure chatting with a fellow cinema lover.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-12">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block flex-shrink-0">
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
              <div className="lg:hidden mb-8">
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
                <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
                  {genres.find((g) => g.key === activeGenre)?.label}
                </h2>
                <p className="text-slate-400 text-lg">
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

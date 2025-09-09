"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X, Calendar, Clock, User, DollarSign, MapPin, Star, Play, Share2, Bookmark, TrendingUp, Globe, Target, Users } from "lucide-react";
import RankedMovieCard from "@/components/RankedMovieCard";
import { boxOfficeData } from "@/data/boxOfficeData";

// Movie Details Modal Component
const MovieDetailsModal = ({ movie, isOpen, onClose }) => {
  if (!isOpen || !movie) return null;

  const formatCurrency = (amount) => {
    return amount.replace(',', '').replace(' Million', 'M').replace(' Billion', 'B');
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-3xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 p-2 bg-slate-800/80 hover:bg-slate-700 rounded-full transition-colors duration-200"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <div className="overflow-y-auto max-h-[90vh]">
            {/* Header Section */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent" />
              <div className="relative p-8 pb-6">
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Movie Poster */}
                  <div className="flex-shrink-0 mx-auto lg:mx-0">
                    <div className="w-48 h-72 bg-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                      <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Movie Info */}
                  <div className="flex-1 space-y-6">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                          <span className="text-xl font-bold text-white">#{movie.rank}</span>
                        </div>
                        <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium">
                          {movie.genre}
                        </div>
                      </div>
                      
                      <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                        {movie.title}
                      </h1>
                      
                      <p className="text-slate-300 text-lg leading-relaxed">
                        {movie.description}
                      </p>
                    </div>

                    {/* Movie Meta */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-emerald-400">
                          <User className="w-4 h-4" />
                          <span className="text-sm font-medium">Director</span>
                        </div>
                        <p className="text-white font-semibold">{movie.director}</p>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-emerald-400">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm font-medium">Release</span>
                        </div>
                        <p className="text-white font-semibold">{movie.releaseDate}</p>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-emerald-400">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm font-medium">Runtime</span>
                        </div>
                        <p className="text-white font-semibold">{movie.runtime}</p>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-emerald-400">
                          <DollarSign className="w-4 h-4" />
                          <span className="text-sm font-medium">Budget</span>
                        </div>
                        <p className="text-white font-semibold">{movie.budget}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Box Office Performance */}
            <div className="p-8 pt-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
                Box Office Performance
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                  <div className="flex items-center gap-2 mb-3">
                    <Globe className="w-5 h-5 text-emerald-400" />
                    <span className="text-sm font-medium text-slate-400">Worldwide</span>
                  </div>
                  <p className="text-2xl font-bold text-emerald-400">{movie.worldwideGross}</p>
                </div>
                
                <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-5 h-5 text-blue-400" />
                    <span className="text-sm font-medium text-slate-400">Domestic (US)</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-400">{movie.domesticGross}</p>
                </div>
                
                <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                  <div className="flex items-center gap-2 mb-3">
                    <Globe className="w-5 h-5 text-purple-400" />
                    <span className="text-sm font-medium text-slate-400">International</span>
                  </div>
                  <p className="text-2xl font-bold text-purple-400">{movie.internationalGross}</p>
                </div>
                
                <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-5 h-5 text-orange-400" />
                    <span className="text-sm font-medium text-slate-400">India</span>
                  </div>
                  <p className="text-2xl font-bold text-orange-400">{movie.indiaGross}</p>
                </div>
              </div>
            </div>

            {/* Cast & Crew */}
            <div className="p-8 pt-0">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Users className="w-6 h-6 text-emerald-400" />
                Cast & Crew
              </h2>
              
              <div className="space-y-4">
                <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                  <h3 className="text-lg font-semibold text-white mb-3">Main Cast</h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.cast?.map((actor, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-slate-700 text-slate-200 rounded-full text-sm"
                      >
                        {actor}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                  <h3 className="text-lg font-semibold text-white mb-3">Production</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-slate-400 text-sm">Studio</span>
                      <p className="text-white font-semibold">{movie.studio}</p>
                    </div>
                    <div>
                      <span className="text-slate-400 text-sm">Director</span>
                      <p className="text-white font-semibold">{movie.director}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Main Box Office Page Component
// Responsive Box Office Page Component
const BoxOfficePage = () => {
  const currentYear = 2025;
  const years = Array.from({ length: 26 }, (_, i) => currentYear - i);
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentMovies = boxOfficeData[selectedYear] || [];

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.05),transparent_50%)]" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.05),transparent_50%)]" />

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center py-24 sm:py-24 md:py-24 lg:py-24 px-4 sm:px-6"
        >
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-emerald-100 to-emerald-200 bg-clip-text text-transparent leading-tight">
            Box Office Archive
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-xs sm:max-w-md md:max-w-2xl mx-auto leading-relaxed px-2">
            Explore the top-grossing films of the last 25 years.
          </p>
        </motion.div>

        {/* Year Selector - Enhanced with better mobile responsiveness */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 mb-8 sm:mb-12"
        >
          <div className="flex justify-center">
            <div className="relative w-full max-w-xs sm:max-w-sm">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-between gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 w-full min-w-0 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-white hover:bg-white/10 hover:border-emerald-500/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Calendar className="h-4 w-4 flex-shrink-0" />
                  <span className="font-semibold text-base sm:text-lg truncate">{selectedYear}</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-slate-900/98 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl z-50 max-h-48 sm:max-h-64 overflow-y-auto"
                  >
                    {years.map((year) => {
                      const hasData = boxOfficeData[year.toString()];
                      return (
                        <button
                          key={year}
                          onClick={() => {
                            setSelectedYear(year.toString());
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 sm:px-6 py-2 sm:py-3 hover:bg-slate-700/50 transition-colors first:rounded-t-2xl last:rounded-b-2xl flex items-center justify-between text-sm sm:text-base ${
                            selectedYear === year.toString()
                              ? "bg-emerald-500/20 text-emerald-400"
                              : hasData
                              ? "text-white"
                              : "text-slate-500"
                          }`}
                        >
                          <span className="truncate">{year}</span>
                          {hasData && (
                            <span className="text-xs opacity-75 flex-shrink-0 ml-2">
                              ({boxOfficeData[year.toString()].length})
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Movies List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24"
        >
          {currentMovies.length > 0 ? (
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 text-slate-300 px-4">
                Top {currentMovies.length} Films of {selectedYear}
              </h2>
              <div className="space-y-3 sm:space-y-4">
                {currentMovies.map((movie, index) => (
                  <RankedMovieCard
                    key={`${selectedYear}-${movie.rank}`}
                    movie={movie}
                    index={index}
                    onMovieClick={handleMovieClick}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16 px-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-slate-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-slate-400 mb-2">
                No Data Available
              </h3>
              <p className="text-sm sm:text-base text-slate-500 max-w-sm mx-auto">
                Box office data for {selectedYear} is not yet available.
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Movie Details Modal */}
      <MovieDetailsModal
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};
export default BoxOfficePage;
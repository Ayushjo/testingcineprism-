"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Globe, ChevronLeft, ChevronRight, X, Calendar, Film } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "../context/ThemeContext";

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
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 z-10 backdrop-blur-xl p-2.5 rounded-full border transition-all duration-300 group ${
            theme === "light"
              ? "bg-gray-100 border-gray-300 hover:bg-gray-200 hover:border-gray-400"
              : "bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/30"
          }`}
        >
          <X
            className={`w-4 h-4 transition-colors ${
              theme === "light"
                ? "text-black group-hover:text-gray-700"
                : "text-white group-hover:text-slate-200"
            }`}
          />
        </button>

        {/* Scrollable Content */}
        <div className="max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20 hover:scrollbar-thumb-white/30">
          {/* Hero Section with Poster */}
          <div className="relative">
            {/* Background Image */}
            <div className="aspect-[16/9] relative overflow-hidden">
              <img
                src={movie.posterImageUrl || "/placeholder.svg"}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-slate-950/30" />

              {/* Noise Texture */}
              <div
                className="absolute inset-0 opacity-10 mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
                }}
              />
            </div>

            {/* Movie Poster (Floating) */}
            <div className="absolute -bottom-12 sm:-bottom-16 left-4 sm:left-6">
              <div className="w-20 h-28 sm:w-24 sm:h-36 md:w-28 md:h-40 rounded-xl overflow-hidden shadow-2xl border-2 border-white/20">
                <img
                  src={movie.posterImageUrl || "/placeholder.svg"}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="pt-16 sm:pt-20 px-4 sm:px-6 pb-6">
            {/* Title and Year */}
            <div className="mb-6">
              <h1
                className={`text-2xl sm:text-3xl md:text-4xl font-black mb-2 bg-clip-text text-transparent leading-tight transition-all duration-300 ${
                  theme === "light"
                    ? "bg-gradient-to-r from-black via-gray-800 to-gray-600"
                    : "bg-gradient-to-r from-white via-slate-100 to-slate-300"
                }`}
              >
                {movie.title}
              </h1>
              <div
                className={`flex items-center gap-2 ${
                  theme === "light" ? "text-gray-600" : "text-slate-400"
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">{movie.year}</span>
              </div>
            </div>

            {/* Director */}
            {movie.directedBy && (
              <div className="mb-6">
                <h3
                  className={`text-lg font-bold mb-3 bg-clip-text text-transparent transition-all duration-300 ${
                    theme === "light"
                      ? "bg-gradient-to-r from-black to-gray-600"
                      : "bg-gradient-to-r from-white to-slate-300"
                  }`}
                >
                  Directed By
                </h3>
                <div className="flex items-center gap-2">
                  <Film
                    className={`w-4 h-4 ${
                      theme === "light" ? "text-gray-600" : "text-slate-400"
                    }`}
                  />
                  <span
                    className={`font-medium ${
                      theme === "light" ? "text-gray-700" : "text-slate-300"
                    }`}
                  >
                    {movie.directedBy}
                  </span>
                </div>
              </div>
            )}

            {/* Genres */}
            <div className="mb-6">
              <h3
                className={`text-lg font-bold mb-3 bg-clip-text text-transparent transition-all duration-300 ${
                  theme === "light"
                    ? "bg-gradient-to-r from-black to-gray-600"
                    : "bg-gradient-to-r from-white to-slate-300"
                }`}
              >
                Genres
              </h3>
              <div className="flex flex-wrap gap-2">
                {movie.genre &&
                  movie.genre.map((g, index) => (
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

            {/* Synopsis */}
            <div className="mb-6">
              <h3
                className={`text-lg font-bold mb-3 bg-clip-text text-transparent transition-all duration-300 ${
                  theme === "light"
                    ? "bg-gradient-to-r from-black to-gray-600"
                    : "bg-gradient-to-r from-white to-slate-300"
                }`}
              >
                Synopsis
              </h3>
              <p
                className={`leading-relaxed text-sm sm:text-base transition-all duration-300 ${
                  theme === "light" ? "text-gray-700" : "text-slate-300"
                }`}
              >
                {movie.synopsis || "No synopsis available for this movie."}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Article Card Component (reusable from ArticleSection)
// const ArticleCard = ({ article, index, hoveredCard, setHoveredCard }) => {
//   const { theme } = useTheme();

//   return (
//     <motion.article
//       initial={{ opacity: 0, y: 30 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{
//         duration: 0.6,
//         delay: index * 0.1,
//         opacity: { duration: 0.3 },
//         scale: { duration: 0.3 },
//       }}
//       animate={{
//         opacity: hoveredCard !== null && hoveredCard !== index ? 0.3 : 1,
//         scale: hoveredCard === index ? 1.02 : 1,
//       }}
//       whileHover={{ y: -8 }}
//       onMouseEnter={() => setHoveredCard(index)}
//       onMouseLeave={() => setHoveredCard(null)}
//       className="group relative aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-visible cursor-pointer"
//       style={{
//         filter:
//           hoveredCard !== null && hoveredCard !== index
//             ? "blur(2px)"
//             : "blur(0px)",
//         transition: "filter 0.3s ease-in-out",
//       }}
//     >
//       <div className="absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden">
//         <img
//           src={article.imageUrl || "/placeholder.svg"}
//           alt={article.title}
//           className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
//         />
//         <div
//           className={`absolute inset-0 transition-all duration-300 ${
//             theme === "light"
//               ? "bg-gradient-to-t from-black/80 via-black/40 to-black/20"
//               : "bg-gradient-to-t from-black/90 via-black/50 to-black/20"
//           }`}
//         />

//         <div className="relative h-full flex flex-col justify-end p-5 sm:p-6 lg:p-8">
//           <div>
//             {article.category && (
//               <span
//                 className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 backdrop-blur-sm border ${
//                   theme === "light"
//                     ? "bg-white/20 text-white border-white/30"
//                     : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
//                 }`}
//               >
//                 {article.category}
//               </span>
//             )}
//             <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-2 tracking-tight group-hover:text-emerald-300 transition-colors duration-300 leading-tight">
//               {article.title}
//             </h2>
//             <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-2 text-xs sm:text-sm text-slate-300">
//               <span>{article.author}</span>
//               <span className="text-slate-500">•</span>
//               <span>
//                 {new Date(article.publishedAt).toLocaleDateString("en-US", {
//                   year: "numeric",
//                   month: "short",
//                   day: "numeric",
//                 })}
//               </span>
//               {article.viewCount && (
//                 <>
//                   <span className="text-slate-500">•</span>
//                   <span>
//                     {article.viewCount >= 1000
//                       ? `${(article.viewCount / 1000).toFixed(1)}k`
//                       : article.viewCount}{" "}
//                     views
//                   </span>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </motion.article>
//   );
// };

// Movie Poster Card with Rank
const MoviePosterCard = ({ movie, onClick, index }) => {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onClick={() => onClick(movie)}
      className="group relative flex-shrink-0 w-40 sm:w-48 md:w-56 cursor-pointer"
    >
      {/* Card Container with Dotted Border */}
      <div
        className={`relative overflow-hidden rounded-2xl border-2 border-dashed backdrop-blur-sm transition-all duration-300 ${
          theme === "light"
            ? "border-gray-300 bg-gray-50 hover:border-black/60 hover:shadow-lg hover:shadow-black/10"
            : "border-slate-700/50 bg-slate-900/30 hover:border-amber-400/50 hover:shadow-lg hover:shadow-amber-400/10"
        }`}
      >
        {/* Poster Image */}
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={movie.posterImageUrl || "/placeholder.svg"}
            alt={movie.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Rank Badge */}
          <div className="absolute top-3 left-3">
            <div
              className={`w-10 h-10 rounded-full backdrop-blur-xl border flex items-center justify-center ${
                theme === "light"
                  ? "bg-white/90 border-gray-300"
                  : "bg-black/60 border-white/20"
              }`}
            >
              <span
                className={`text-sm font-black ${
                  theme === "light" ? "text-black" : "text-amber-400"
                }`}
              >
                {movie.rank}
              </span>
            </div>
          </div>
        </div>

        {/* Movie Info */}
        <div className="p-3">
          <h3
            className={`text-sm font-bold line-clamp-2 transition-colors ${
              theme === "light"
                ? "text-black group-hover:text-gray-700"
                : "text-white group-hover:text-amber-400"
            }`}
          >
            {movie.title}
          </h3>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div
            className={`absolute inset-0 rounded-2xl ${
              theme === "light"
                ? "bg-gradient-to-r from-black/5 to-gray-600/5"
                : "bg-gradient-to-r from-amber-400/5 to-emerald-400/5"
            }`}
          />
        </div>
      </div>
    </motion.div>
  );
};

// Category Card Component
const CategoryCard = ({ icon: Icon, title, to }) => {
  const { theme } = useTheme();

  // Different background images for each category
  const bgImages = {
    Indian: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80",
    World: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80"
  };

  return (
    <Link to={to} aria-label={`${title} films`}>
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.3 }}
        className="group relative overflow-hidden rounded-3xl min-h-[280px] sm:min-h-[320px] cursor-pointer"
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={bgImages[title]}
            alt={`${title} cinema`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Dark gradient overlay */}
          <div className={`absolute inset-0 transition-all duration-500 ${
            theme === "light"
              ? "bg-gradient-to-br from-black/70 via-black/50 to-black/70 group-hover:from-black/60 group-hover:via-black/40 group-hover:to-black/60"
              : "bg-gradient-to-br from-black/80 via-black/60 to-black/80 group-hover:from-black/70 group-hover:via-black/50 group-hover:to-black/70"
          }`} />

          {/* Noise texture for film grain effect */}
          <div
            className="absolute inset-0 opacity-20 mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Glowing border effect */}
        <div className={`absolute inset-0 rounded-3xl border-2 transition-all duration-300 ${
          theme === "light"
            ? "border-white/20 group-hover:border-[#8B4513]/60 group-hover:shadow-[0_0_40px_rgba(139,69,19,0.4)]"
            : "border-white/10 group-hover:border-emerald-400/60 group-hover:shadow-[0_0_40px_rgba(16,185,129,0.3)]"
        }`} />

        {/* Content */}
        <div className="relative h-full flex flex-col justify-between p-8 sm:p-10">
          {/* Icon Badge */}
          <div className="flex justify-start">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl backdrop-blur-xl border-2 flex items-center justify-center transition-all duration-300 ${
                theme === "light"
                  ? "bg-white/20 border-white/40 group-hover:bg-white/30 group-hover:border-white/60"
                  : "bg-white/10 border-white/20 group-hover:bg-white/20 group-hover:border-white/40"
              }`}
            >
              <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-lg" />
            </motion.div>
          </div>

          {/* Title and Arrow */}
          <div className="flex items-end justify-between gap-4">
            <div>
              <motion.h3
                className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-none mb-2 drop-shadow-2xl"
                style={{
                  textShadow: "0 4px 20px rgba(0,0,0,0.5)"
                }}
              >
                {title}
              </motion.h3>
              <p className="text-white/80 text-sm sm:text-base font-medium">
                Explore {title.toLowerCase()} indie films
              </p>
            </div>

            {/* Arrow with animated background */}
            <motion.div
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full backdrop-blur-xl border-2 flex items-center justify-center transition-all duration-300 ${
                theme === "light"
                  ? "bg-white/20 border-white/40 group-hover:bg-white/30 group-hover:border-white/60"
                  : "bg-white/10 border-white/20 group-hover:bg-emerald-400/30 group-hover:border-emerald-400/60"
              }`}
            >
              <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 text-white drop-shadow-lg" />
            </motion.div>
          </div>
        </div>

        {/* Animated shimmer effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className={`absolute inset-0 ${
            theme === "light"
              ? "bg-gradient-to-r from-transparent via-white/10 to-transparent"
              : "bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent"
          } translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000`} />
        </div>
      </motion.div>
    </Link>
  );
};

export default function IndiePage() {
  const { token } = useAuth();
  const { theme } = useTheme();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showMovieModal, setShowMovieModal] = useState(false);
  // const [hoveredArticle, setHoveredArticle] = useState(null);
  const [topIndieFilms, setTopIndieFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const scrollContainerRef = useRef(null);

  // Fetch Thriller movies as dummy data for Top 25
  useEffect(() => {
    const fetchTop25IndieFilms = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.thecineprism.com/api/v1/admin/fetch-byGenre/Thriller`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.genrePosts) {
          // Take first 25 movies and add rank
          const rankedMovies = response.data.genrePosts
            .slice(0, 25)
            .map((movie, index) => ({
              ...movie,
              rank: index + 1,
            }));
          setTopIndieFilms(rankedMovies);
        }
      } catch (err) {
        console.error("Error fetching top indie films:", err);
        // Keep empty array on error
        setTopIndieFilms([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTop25IndieFilms();
  }, [token]);


  // const featuredIndieArticles = [
  //   {
  //     id: "art1",
  //     title: "The Rise of A24: A Decade of Independent Excellence",
  //     author: "Jane Doe",
  //     publishedAt: "2025-10-15T00:00:00.000Z",
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=800&q=80",
  //     viewCount: 1254,
  //     category: "Analysis",
  //   },
  //   {
  //     id: "art2",
  //     title: "How 'Masaan' Redefined Modern Indian Indie Cinema",
  //     author: "Rohan Kumar",
  //     publishedAt: "2025-10-12T00:00:00.000Z",
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80",
  //     viewCount: 2345,
  //     category: "Deep Dive",
  //   },
  //   {
  //     id: "art3",
  //     title: "A Guide to the Korean New Wave for Beginners",
  //     author: "Emily Chen",
  //     publishedAt: "2025-10-10T00:00:00.000Z",
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1574267432644-f71916e8eeb0?w=800&q=80",
  //     viewCount: 987,
  //     category: "Guide",
  //   },
  // ];

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setShowMovieModal(true);
  };

  const closeMovieModal = () => {
    setShowMovieModal(false);
    setSelectedMovie(null);
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className={`min-h-screen pt-20 transition-colors duration-300 ${
        theme === "light" ? "bg-white" : "bg-slate-950"
      }`}
    >
      {/* Ambient Background */}
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

      {/* Main Content */}
      <div className="relative pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section 1: Main Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 sm:mb-20"
          >
            <h1
              className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 bg-clip-text text-transparent tracking-tight ${
                theme === "light"
                  ? "bg-gradient-to-r from-black via-gray-800 to-gray-600"
                  : "bg-gradient-to-r from-white via-slate-200 to-slate-400"
              }`}
            >
              Indie Cinema
            </h1>
            <p
              className={`text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed ${
                theme === "light" ? "text-black/70" : "text-slate-400"
              }`}
            >
              Exploring the boldest voices and most unique stories from outside
              the studio system.
            </p>
          </motion.div>

          {/* Section 2: Top 25 Indie Films Carousel */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-20 sm:mb-24"
          >
            <div className="mb-8">
              <h2
                className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight ${
                  theme === "light" ? "text-black" : "text-white"
                }`}
              >
                Cinéprism Top 25
              </h2>
            </div>

            {/* Carousel Container */}
            <div className="relative group">
              {/* Left Arrow */}
              <button
                onClick={() => scroll("left")}
                className={`hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-12 h-12 rounded-full backdrop-blur-xl border-2 transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-1/2 ${
                  theme === "light"
                    ? "bg-white/80 border-gray-300 hover:bg-white hover:border-[#8B4513]"
                    : "bg-white/10 border-white/20 hover:bg-white/20 hover:border-emerald-400"
                }`}
              >
                <ChevronLeft
                  className={`w-6 h-6 ${
                    theme === "light" ? "text-black" : "text-white"
                  }`}
                />
              </button>

              {/* Right Arrow */}
              <button
                onClick={() => scroll("right")}
                className={`hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-12 h-12 rounded-full backdrop-blur-xl border-2 transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-1/2 ${
                  theme === "light"
                    ? "bg-white/80 border-gray-300 hover:bg-white hover:border-[#8B4513]"
                    : "bg-white/10 border-white/20 hover:bg-white/20 hover:border-emerald-400"
                }`}
              >
                <ChevronRight
                  className={`w-6 h-6 ${
                    theme === "light" ? "text-black" : "text-white"
                  }`}
                />
              </button>

              {/* Scrollable Container */}
              <div
                ref={scrollContainerRef}
                className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center w-full py-12">
                    <div
                      className={`animate-spin rounded-full h-12 w-12 border-b-2 ${
                        theme === "light" ? "border-black" : "border-emerald-400"
                      }`}
                    ></div>
                  </div>
                ) : topIndieFilms.length > 0 ? (
                  topIndieFilms.map((film, index) => (
                    <MoviePosterCard
                      key={film.id || film.tmdb_id}
                      movie={film}
                      index={index}
                      onClick={handleMovieClick}
                    />
                  ))
                ) : (
                  <div className="flex items-center justify-center w-full py-12">
                    <p
                      className={`text-sm ${
                        theme === "light" ? "text-black/70" : "text-slate-400"
                      }`}
                    >
                      No movies available
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.section>

          {/* Section 3: Regional Navigation Cards */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-20 sm:mb-24"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CategoryCard icon={MapPin} title="Indian" to="/indie/indian" />
              <CategoryCard icon={Globe} title="World" to="/indie/world" />
            </div>
          </motion.section>

          {/* Section 4: Featured Articles */}
          {/* <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="mb-8">
              <h2
                className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight ${
                  theme === "light" ? "text-black" : "text-white"
                }`}
              >
                Featured Articles
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredIndieArticles.map((article, index) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  index={index}
                  hoveredCard={hoveredArticle}
                  setHoveredCard={setHoveredArticle}
                />
              ))}
            </div>
          </motion.section> */}
        </div>
      </div>

      {/* Movie Details Modal */}
      {showMovieModal && (
        <MovieDetailsModal movie={selectedMovie} onClose={closeMovieModal} />
      )}
    </div>
  );
}

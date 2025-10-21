import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";

const ReviewCard = ({ movie, index, onClick, theme }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      onClick={() => onClick(movie.id)}
      className="group relative flex-shrink-0 w-48 sm:w-52 md:w-56 cursor-pointer"
    >
      {/* Movie Poster Container */}
      <div className={`relative aspect-[2/3] rounded-2xl overflow-hidden mb-4 shadow-lg transition-all duration-300 border-2 ${
        theme === "light"
          ? "border-black/40 group-hover:shadow-xl group-hover:shadow-black/20 group-hover:border-black/80"
          : "border-white/20 group-hover:shadow-xl group-hover:shadow-emerald-500/20"
      }`}>
        <img
          src={movie.posterUrl || "/placeholder.svg"}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.src = "/placeholder.svg";
          }}
        />

        {/* Review Badge Overlay */}
        <div className="absolute top-3 left-3">
          <div className={`px-2 py-1 sm:px-3 sm:py-1.5 backdrop-blur-sm rounded-full flex items-center gap-1 border ${
            theme === "light"
              ? "bg-white/90 border-black/60"
              : "bg-black/60 border-white/20"
          }`}>
            <BookOpen className={`w-3 h-3 ${theme === "light" ? "text-black" : "text-emerald-400"}`} />
            <span className={`font-medium text-xs ${theme === "light" ? "text-black" : "text-white"}`}>REVIEW</span>
          </div>
        </div>

        {/* Hover Glow Effect */}
        <div className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
          theme === "light" ? "from-gray-400/10" : "from-emerald-500/10"
        }`} />

        {/* Subtle Border Glow on Hover */}
        <div className={`absolute inset-0 rounded-2xl border-2 border-transparent transition-colors duration-300 ${
          theme === "light" ? "group-hover:border-black/30" : "group-hover:border-emerald-400/30"
        }`} />

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Movie Info Overlay */}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-white font-bold text-sm leading-tight mb-1">
            {movie.title}
          </h3>
          <div className="flex items-center gap-2 text-slate-300 text-xs">
            <span>{movie.year}</span>
            {movie.genres && movie.genres.length > 0 && (
              <>
                <span>•</span>
                <span>{movie.genres[0]}</span>
              </>
            )}
          </div>
          {movie.directedBy && (
            <p className="text-slate-400 text-xs mt-1">
              by {movie.directedBy}
            </p>
          )}
        </div>
      </div>

      {/* Movie Title (outside poster for better visibility) */}
      <div className="px-2">
        <h3 className={`font-bold text-sm sm:text-base line-clamp-2 transition-colors duration-300 leading-tight ${
          theme === "light"
            ? "text-black group-hover:text-gray-700"
            : "text-white group-hover:text-emerald-300"
        }`}>
          {movie.title}
        </h3>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center gap-1">
            <BookOpen className={`w-3 h-3 ${theme === "light" ? "text-black" : "text-emerald-400"}`} />
            <span className={`text-xs ${theme === "light" ? "text-black/70" : "text-slate-400"}`}>Fresh Review</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function LatestReviews() {
  const { theme } = useTheme();
  const [latestReviews, setLatestReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);

  // Fetch latest reviews from API
  useEffect(() => {
    const fetchLatestReviews = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://api.thecineprism.com/api/v1/admin/latest-reviews"
        );

        const data = response.data;
        if (data.latestReviews) {
          // Transform API data to match component structure
          const transformedReviews = data.latestReviews.map((review) => ({
            id: review.id,
            title: review.title,
            year: review.year,
            genres: review.genres,
            posterUrl: review.posterImageUrl,
            content: review.content,
            ratingCriteria: review.ratingCategories || [],
            directedBy: review.directedBy,
            streamingAt: review.streamingAt,
          }));
          setLatestReviews(transformedReviews);
        }
      } catch (error) {
        console.error("Error fetching latest reviews:", error);
        setError("Failed to load reviews. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestReviews();
  }, []);

  const handleReviewClick = (reviewId) => {
    navigate(`/post/${reviewId}`);
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      className={`py-12 sm:py-16 md:py-24 relative overflow-hidden transition-colors duration-300 ${
        theme === "light"
          ? "bg-gradient-to-b from-white to-gray-50"
          : "bg-gradient-to-b from-slate-900 to-slate-950"
      }`}
    >
      {/* Ambient Background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className={`absolute inset-0 ${
            theme === "light"
              ? "bg-[radial-gradient(circle_at_30%_40%,rgba(0,0,0,0.03),transparent_50%)]"
              : "bg-[radial-gradient(circle_at_30%_40%,rgba(16,185,129,0.05),transparent_50%)]"
          }`}
        />
        <div
          className={`absolute inset-0 ${
            theme === "light"
              ? "bg-[radial-gradient(circle_at_70%_60%,rgba(0,0,0,0.02),transparent_50%)]"
              : "bg-[radial-gradient(circle_at_70%_60%,rgba(139,92,246,0.05),transparent_50%)]"
          }`}
        />
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 relative">
        {/* Section Header - matching TrendingThisWeek style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <div className="inline-block mb-4 sm:mb-6">
            <span
              className={`backdrop-blur-xl px-3 sm:px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold border-2 flex items-center gap-2 shadow-md ${
                theme === "light"
                  ? "bg-gray-100 text-black border-black/40"
                  : "bg-white/5 text-emerald-400 border-white/10"
              }`}
            >
              <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
              Fresh Reviews
            </span>
          </div>
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 bg-clip-text text-transparent tracking-tight px-4 ${
              theme === "light"
                ? "bg-gradient-to-r from-black via-gray-800 to-gray-600"
                : "bg-gradient-to-r from-white via-slate-200 to-slate-400"
            }`}
          >
            Latest Reviews
          </h2>
          <p
            className={`text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed px-4 ${
              theme === "light" ? "text-black/70" : "text-slate-400"
            }`}
          >
            Our take on the films everyone's talking about
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {isLoading ? (
            <div className="flex justify-center items-center py-12 sm:py-20">
              <div
                className={`animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 ${
                  theme === "light" ? "border-black" : "border-emerald-400"
                }`}
              ></div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-12 sm:py-20">
              <div className="text-center px-4">
                <p className="text-red-400 mb-4 text-sm sm:text-base">
                  {error}
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className={`px-4 py-2 rounded-2xl border transition-all text-sm sm:text-base ${
                    theme === "light"
                      ? "bg-red-200/50 text-red-600 border-red-600/30 hover:bg-red-300/50"
                      : "bg-emerald-500/20 text-emerald-300 border-emerald-400/30 hover:bg-emerald-500/30"
                  }`}
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : latestReviews.length === 0 ? (
            <div className="flex justify-center items-center py-12 sm:py-20">
              <p
                className={`text-sm sm:text-base ${
                  theme === "light" ? "text-black/70" : "text-slate-400"
                }`}
              >
                No reviews available
              </p>
            </div>
          ) : (
            <>
              {/* Navigation Arrows - Desktop Only */}
              <button
                onClick={scrollLeft}
                className={`hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 backdrop-blur-sm rounded-full items-center justify-center border-2 transition-all duration-300 -translate-x-6 shadow-md ${
                  theme === "light"
                    ? "bg-gray-100 border-black/40 hover:bg-black hover:text-white hover:border-black"
                    : "bg-black/60 border-white/20 hover:bg-black/80 hover:border-emerald-400/50"
                }`}
              >
                <ChevronLeft
                  className={`w-6 h-6 ${
                    theme === "light" ? "text-black" : "text-white"
                  }`}
                />
              </button>

              <button
                onClick={scrollRight}
                className={`hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 backdrop-blur-sm rounded-full items-center justify-center border-2 transition-all duration-300 translate-x-6 shadow-md ${
                  theme === "light"
                    ? "bg-gray-100 border-black/40 hover:bg-black hover:text-white hover:border-black"
                    : "bg-black/60 border-white/20 hover:bg-black/80 hover:border-emerald-400/50"
                }`}
              >
                <ChevronRight
                  className={`w-6 h-6 ${
                    theme === "light" ? "text-black" : "text-white"
                  }`}
                />
              </button>

              {/* Fade-out edges */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-r to-transparent z-10 pointer-events-none ${
                  theme === "light" ? "from-gray-50" : "from-slate-950"
                }`}
              />
              <div
                className={`absolute right-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-l to-transparent z-10 pointer-events-none ${
                  theme === "light" ? "from-gray-50" : "from-slate-950"
                }`}
              />

              {/* Horizontal Scrolling Container */}
              <div
                ref={scrollContainerRef}
                className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide pb-4 px-4 sm:px-8"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {latestReviews.map((movie, index) => (
                  <ReviewCard
                    key={movie.id}
                    movie={movie}
                    index={index}
                    onClick={handleReviewClick}
                    theme={theme}
                  />
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
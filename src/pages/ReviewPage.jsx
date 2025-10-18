"use client";

import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  Tag,
  Search,
  Filter,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Helper function for getting score color (shared across components)
const getScoreColor = (score) => {
  if (score >= 95) return "#10b981"; // Emerald
  if (score >= 90) return "#22c55e"; // Green
  if (score >= 85) return "#84cc16"; // Lime
  if (score >= 80) return "#eab308"; // Yellow
  if (score >= 75) return "#f59e0b"; // Amber
  if (score >= 70) return "#f97316"; // Orange
  if (score >= 65) return "#ef4444"; // Red
  if (score >= 60) return "#dc2626"; // Red-600
  if (score >= 55) return "#b91c1c"; // Red-700
  return "#991b1b"; // Red-800
};

// Mini circular progress for individual criteria
const MiniRatingCircle = ({ score, delay = 0 }) => {
  const color = getScoreColor(score);
  const circumference = 2 * Math.PI * 12; // radius = 12
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-8 h-8 flex-shrink-0">
      <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 28 28">
        <circle
          cx="14"
          cy="14"
          r="12"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="2"
          fill="none"
        />
        <motion.circle
          cx="14"
          cy="14"
          r="12"
          stroke={color}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: strokeDashoffset }}
          transition={{ duration: 0.8, ease: "easeOut", delay: delay }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: delay + 0.4 }}
          className="text-white font-semibold text-xs"
          style={{ color, fontSize: "10px" }}
        >
          {score}
        </motion.span>
      </div>
    </div>
  );
};

// Circular progress rating display component
const RatingDisplay = ({ ratingCriteria, isHovered }) => {
  if (!ratingCriteria || ratingCriteria.length === 0) return null;

  const averageScore =
    ratingCriteria.reduce((sum, criteria) => sum + criteria.score, 0) /
    ratingCriteria.length;
  const progress = (averageScore / 100) * 100; // Convert to percentage for circle

  // Color calculation based on score (0-100) - every 5 points
  const getScoreColor = (score) => {
    if (score >= 95)
      return {
        color: "#10b981",
        glow: "drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]",
      }; // Emerald
    if (score >= 90)
      return {
        color: "#22c55e",
        glow: "drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]",
      }; // Green
    if (score >= 85)
      return {
        color: "#84cc16",
        glow: "drop-shadow-[0_0_8px_rgba(132,204,22,0.6)]",
      }; // Lime
    if (score >= 80)
      return {
        color: "#eab308",
        glow: "drop-shadow-[0_0_8px_rgba(234,179,8,0.6)]",
      }; // Yellow
    if (score >= 75)
      return {
        color: "#f59e0b",
        glow: "drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]",
      }; // Amber
    if (score >= 70)
      return {
        color: "#f97316",
        glow: "drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]",
      }; // Orange
    if (score >= 65)
      return {
        color: "#ef4444",
        glow: "drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]",
      }; // Red
    if (score >= 60)
      return {
        color: "#dc2626",
        glow: "drop-shadow-[0_0_8px_rgba(220,38,38,0.6)]",
      }; // Red-600
    if (score >= 55)
      return {
        color: "#b91c1c",
        glow: "drop-shadow-[0_0_8px_rgba(185,28,28,0.6)]",
      }; // Red-700
    return {
      color: "#991b1b",
      glow: "drop-shadow-[0_0_8px_rgba(153,27,27,0.6)]",
    }; // Red-800
  };

  const scoreStyle = getScoreColor(averageScore);
  const circumference = 2 * Math.PI * 18; // radius = 18
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="absolute top-0.5 right-0.5 z-20 group"
    >
      <div className="relative w-12 h-12">
        {/* Background circle */}
        <svg
          className="w-12 h-12 transform -rotate-90 rounded-full"
          viewBox="0 0 40 40"
        >
          <circle
            cx="20"
            cy="20"
            r="18"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="2"
            fill="none"
            className="backdrop-blur-xl"
          />
          {/* Progress circle */}
          <motion.circle
            cx="20"
            cy="20"
            r="18"
            stroke={scoreStyle.color}
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: strokeDashoffset }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className={scoreStyle.glow}
            style={{
              filter: scoreStyle.glow,
            }}
          />
        </svg>

        {/* Score text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-white font-bold text-xs tracking-tight"
            style={{
              color: scoreStyle.color,
              textShadow: `0 0 8px ${scoreStyle.color}40`,
            }}
          >
            {Math.round(averageScore)}
          </motion.span>
        </div>

        {/* Backdrop blur background */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-md rounded-full -z-10" />
      </div>
    </motion.div>
  );
};

// Fixed tooltip component that appears above the hovered card
const FloatingTooltip = ({ ratingCriteria, isVisible }) => {
  if (!ratingCriteria || ratingCriteria.length === 0 || !isVisible) return null;

  const averageScore =
    ratingCriteria.reduce((sum, criteria) => sum + criteria.score, 0) /
    ratingCriteria.length;

  const getScoreColor = (score) => {
    if (score >= 95)
      return {
        color: "#10b981",
        glow: "drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]",
      }; // Emerald
    if (score >= 90)
      return {
        color: "#22c55e",
        glow: "drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]",
      }; // Green
    if (score >= 85)
      return {
        color: "#84cc16",
        glow: "drop-shadow-[0_0_8px_rgba(132,204,22,0.6)]",
      }; // Lime
    if (score >= 80)
      return {
        color: "#eab308",
        glow: "drop-shadow-[0_0_8px_rgba(234,179,8,0.6)]",
      }; // Yellow
    if (score >= 75)
      return {
        color: "#f59e0b",
        glow: "drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]",
      }; // Amber
    if (score >= 70)
      return {
        color: "#f97316",
        glow: "drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]",
      }; // Orange
    if (score >= 65)
      return {
        color: "#ef4444",
        glow: "drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]",
      }; // Red
    if (score >= 60)
      return {
        color: "#dc2626",
        glow: "drop-shadow-[0_0_8px_rgba(220,38,38,0.6)]",
      }; // Red-600
    if (score >= 55)
      return {
        color: "#b91c1c",
        glow: "drop-shadow-[0_0_8px_rgba(185,28,28,0.6)]",
      }; // Red-700
    return {
      color: "#991b1b",
      glow: "drop-shadow-[0_0_8px_rgba(153,27,27,0.6)]",
    }; // Red-800
  };

  const scoreStyle = getScoreColor(averageScore);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.9,
        y: isVisible ? 0 : 10,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="absolute -top-4 left-1/2 transform -translate-x-1/2 -translate-y-full z-50 hidden lg:block pointer-events-none"
      style={{
        visibility: isVisible ? "visible" : "hidden",
      }}
    >
      <div className="relative">
        <div className="bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl p-5 min-w-[320px] shadow-2xl">
          {/* Overall Score Header */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
            <h4 className="text-white font-semibold text-base">
              Rating Breakdown
            </h4>
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: scoreStyle.color }}
              />
              <span className="text-white font-bold text-base">
                {Math.round(averageScore)}/100
              </span>
            </div>
          </div>

          {/* Individual Criteria */}
          <div className="space-y-3">
            {ratingCriteria.map((criteria, index) => (
              <motion.div
                key={criteria.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
                className="flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <MiniRatingCircle
                    score={criteria.score}
                    delay={index * 0.1}
                  />
                  <span className="text-slate-200 text-sm font-medium truncate">
                    {criteria.name}
                  </span>
                </div>
                <span
                  className="text-sm font-semibold tabular-nums flex-shrink-0"
                  style={{
                    color: getScoreColor(criteria.score),
                    textShadow: `0 0 4px ${getScoreColor(criteria.score)}40`,
                  }}
                >
                  {criteria.score}/100
                </span>
              </motion.div>
            ))}
          </div>
        </div>
        {/* Arrow pointing down to the card */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2">
          <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-white/10"></div>
          <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-black/95 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-[1px]"></div>
        </div>
      </div>
    </motion.div>
  );
};

// Review Cards with Focus (Blur effect)
const ReviewCardsWithFocus = ({ filteredReviews }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredReview, setHoveredReview] = useState(null);
  const navigate = useNavigate();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {filteredReviews.map((review, index) => (
          <motion.article
            key={review.id || review.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: hoveredCard !== null && hoveredCard !== index ? 0.3 : 1,
              scale: hoveredCard === index ? 1.02 : 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              opacity: { duration: 0.3 },
              scale: { duration: 0.3 },
            }}
            whileHover={{ y: -8 }}
            onMouseEnter={() => {
              setHoveredCard(index);
              setHoveredReview(review);
            }}
            onMouseLeave={() => {
              setHoveredCard(null);
              setHoveredReview(null);
            }}
            onClick={() => navigate(`/post/${review.id}`)}
            className="group relative aspect-[4/3] sm:aspect-[5/4] lg:aspect-[4/3] rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-visible cursor-pointer"
            style={{
              filter:
                hoveredCard !== null && hoveredCard !== index
                  ? "blur(2px)"
                  : "blur(0px)",
              transition: "filter 0.3s ease-in-out",
            }}
          >
            <div className="absolute inset-0 rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden">
              {/* Rating Display */}
              <RatingDisplay
                ratingCriteria={review.ratingCriteria}
                isHovered={hoveredCard === index}
              />

              <img
                src={review.image || "/placeholder.svg"}
                alt={review.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  e.target.src =
                    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMUUyOTNGIi8+CjxwYXRoIGQ9Ik0xNzUgMTIwSDE3MFYxNjBIMTc1VjEyMFpNMjMwIDEyMEgyMjVWMTYwSDIzMFYxMjBaTTIwMCAxODBDMTgzLjQzMiAxODAgMTcwIDE2Ni41NjggMTcwIDE1MEMxNzAgMTMzLjQzMiAxODMuNDMyIDEyMCAyMDAgMTIwQzIxNi41NjggMTIwIDIzMCAxMzMuNDMyIDIzMCAxNTBDMjMwIDE2Ni41NjggMjE2LjU2OCAxODAgMjAwIDE4MFoiIGZpbGw9IiM0RjQ2RTUiLz4KPHBhdGggZD0iTTIwMCAxNDBDMjA4LjI4NCAxNDAgMjE1IDE0Ni43MTYgMjE1IDE1NUMyMTUgMTYzLjI4NCAyMDguMjg0IDE3MCAyMDAgMTcwQzE5MS43MTYgMTcwIDE4NSAxNjMuMjg0IDE4NSAxNTVDMTg1IDE0Ni43MTYgMTkxLjcxNiAxNDAgMjAwIDE0MFoiIGZpbGw9IiM5QTgyRkIiLz4KPC9zdmc+";
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 sm:from-black/80 sm:via-black/40 sm:to-transparent" />

              <div className="relative h-full flex flex-col justify-end p-4 sm:p-5 md:p-6 lg:p-8">
                <div>
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1 tracking-tight group-hover:text-emerald-300 transition-colors duration-300 leading-tight">
                    {review.title}
                  </h2>

                  <div className="flex items-center gap-2 sm:gap-2 lg:gap-3 text-xs sm:text-sm text-slate-300 mb-1.5">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span>{review.year}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span className="truncate">{review.genre}</span>
                    </div>
                  </div>

                  <p className="text-slate-300 leading-relaxed mb-0 line-clamp-2 text-sm sm:text-base">
                    {review.review}
                  </p>
                </div>
              </div>
            </div>

            {/* Floating tooltip inside the card container for proper positioning */}
            <FloatingTooltip
              ratingCriteria={review.ratingCriteria}
              isVisible={
                hoveredCard === index && review.ratingCriteria?.length > 0
              }
            />
          </motion.article>
        ))}
      </div>
    </>
  );
};

export default function ReviewPage() {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token =
    localStorage.getItem("cineprism_auth_token") ||
    sessionStorage.getItem("cineprism_auth_token") ||
    "";

  // Predefined genres list matching TopPicksPage
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


  // Fetch all reviews (default)
  const fetchAllReviews = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const headers = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await axios.post(
        "https://api.thecineprism.com/api/v1/admin/fetch-posts",
        {},
        {
          withCredentials: true,
          headers,
        }
      );

      if (response.data.posts) {
        setPosts(response.data.posts);
      } else if (response.data.data) {
        setPosts(response.data.data);
      } else {
        console.warn("Unexpected API response structure:", response.data);
        setPosts([]);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);

      // Handle different error status codes
      if (error.response) {
        const status = error.response.status;
        if (status === 400) {
          setError("Bad request. Please try again.");
        } else if (status === 401) {
          setError("Authentication required. Please log in.");
        } else if (status === 403) {
          setError("Access denied. You don't have permission to view reviews.");
        } else if (status === 404) {
          setError("No reviews found.");
        } else if (status === 500) {
          setError("Failed to load reviews. Server error.");
        } else {
          setError("Failed to load reviews. Please try again.");
        }
      } else if (error.request) {
        setError("Network error. Please check your connection.");
      } else {
        setError("Failed to load reviews. Please try again.");
      }
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Search reviews by term
  const searchReviews = async (searchTerm) => {
    if (!searchTerm.trim()) {
      fetchAllReviews();
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const headers = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await axios.get(
        `https://api.thecineprism.com/api/v1/posts/search?filter=${encodeURIComponent(searchTerm)}`,
        {
          withCredentials: true,
          headers,
        }
      );

      if (response.data.posts) {
        setPosts(response.data.posts);
      } else if (response.data.data) {
        setPosts(response.data.data);
      } else {
        console.warn("Unexpected API response structure:", response.data);
        setError("No reviews found matching your search.");
        setPosts([]);
      }
    } catch (error) {
      console.error("Error searching reviews:", error);

      // Handle different error status codes
      if (error.response) {
        const status = error.response.status;
        if (status === 400) {
          setError("Invalid search query. Please try different keywords.");
        } else if (status === 404) {
          setError("No reviews found matching your search.");
        } else if (status === 500) {
          setError("Failed to search reviews. Server error.");
        } else {
          setError("Failed to search reviews. Please try again.");
        }
      } else if (error.request) {
        setError("Network error. Please check your connection.");
      } else {
        setError("Failed to search reviews. Please try again.");
      }
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter reviews by genre
  const filterByGenre = async (genre) => {
    if (genre === "all") {
      fetchAllReviews();
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const headers = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      // Format genre for backend (capitalize first letter, handle special cases)
      let formattedGenre;
      if (genre === "scifi") {
        formattedGenre = "Sci-fi";
      } else {
        formattedGenre = genre.charAt(0).toUpperCase() + genre.slice(1).toLowerCase();
      }

      const response = await axios.get(
        `https://api.thecineprism.com/api/v1/posts/search/${formattedGenre}`,
        {
          withCredentials: true,
          headers,
        }
      );

      if (response.data.posts) {
        setPosts(response.data.posts);
      } else if (response.data.data) {
        setPosts(response.data.data);
      } else {
        console.warn("Unexpected API response structure:", response.data);
        setError("No reviews found for this genre.");
        setPosts([]);
      }
    } catch (error) {
      console.error("Error filtering by genre:", error);

      // Handle different error status codes
      if (error.response) {
        const status = error.response.status;
        if (status === 400) {
          setError("No posts found with this genre.");
        } else if (status === 404) {
          setError("No reviews available for this genre.");
        } else if (status === 500) {
          setError("Failed to fetch reviews. Server error.");
        } else {
          setError("Failed to filter reviews. Please try again.");
        }
      } else if (error.request) {
        setError("Network error. Please check your connection.");
      } else {
        setError("Failed to filter reviews. Please try again.");
      }
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchAllReviews();
  }, []);

  // Handle search input changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.trim()) {
        // Reset genre selection when searching
        if (selectedGenre !== "all") {
          setSelectedGenre("all");
        }
        searchReviews(searchTerm);
      } else if (selectedGenre !== "all") {
        // If search is cleared but genre is selected, apply genre filter
        filterByGenre(selectedGenre);
      } else {
        // If both search and genre are cleared, fetch all reviews
        fetchAllReviews();
      }
    }, 500); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Convert API data to match the review format
  const reviews = useMemo(() => {
    return posts.map((post) => {
      // Calculate average rating from ratingCategories
      const averageRating =
        post.ratingCategories && post.ratingCategories.length > 0
          ? post.ratingCategories.reduce((sum, c) => sum + c.score, 0) /
            post.ratingCategories.length
          : 0;

      return {
        title: post.title,
        year: post.year,
        genre: post.genres ? post.genres.join(", ") : "Unknown",
        rating: averageRating,
        image: post.reviewPosterImageUrl || "/placeholder-poster.jpg",
        review: post.content,
        id: post.id,
        ratingCriteria: post.ratingCategories
          ? post.ratingCategories.map((category) => ({
              name: category.category,
              score: category.score,
            }))
          : [],
      };
    });
  }, [posts]);

  // Filter and sort reviews - only frontend sorting since API handles search and genre filter
  const filteredReviews = useMemo(() => {
    let filtered = reviews;

    // No frontend filtering needed since API handles search and genre filtering

    // Sort reviews by rating (highest first) as default
    filtered.sort((a, b) => b.rating - a.rating);

    return filtered;
  }, [reviews, searchTerm, selectedGenre, genres]);

  const handleGenreSelect = (genreKey) => {
    setSelectedGenre(genreKey);

    // Clear search term when selecting a genre to avoid conflicts
    if (searchTerm.trim()) {
      setSearchTerm("");
    }

    if (genreKey !== "all") {
      // Use API for genre filtering
      filterByGenre(genreKey);
    } else {
      // Reset to all reviews
      fetchAllReviews();
    }
  };


  const activeGenreLabel =
    genres.find((g) => g.key === selectedGenre)?.label || "All Genres";

  // Loading state
  if (isLoading) {
    return (
      <div className={`min-h-screen pt-20 flex items-center justify-center transition-colors duration-300 ${
        theme === "light" ? "bg-white text-black" : "bg-slate-950 text-white"
      }`}>
        <div className="text-center">
          <div className={`w-12 h-12 border-4 rounded-full animate-spin mx-auto mb-4 ${
            theme === "light"
              ? "border-gray-300 border-t-black"
              : "border-emerald-500/30 border-t-emerald-500"
          }`} />
          <p className={`text-lg ${theme === "light" ? "text-gray-600" : "text-slate-400"}`}>Loading reviews...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={`min-h-screen pt-20 flex items-center justify-center transition-colors duration-300 ${
        theme === "light" ? "bg-white text-black" : "bg-slate-950 text-white"
      }`}>
        <div className="text-center">
          <div className={`border rounded-2xl p-8 max-w-md mx-auto ${
            theme === "light"
              ? "bg-red-50 border-red-300"
              : "bg-red-500/10 border-red-500/30"
          }`}>
            <h3 className={`text-2xl font-bold mb-4 ${
              theme === "light" ? "text-red-700" : "text-red-400"
            }`}>Error</h3>
            <p className={`mb-6 ${theme === "light" ? "text-gray-700" : "text-slate-400"}`}>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                theme === "light"
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-gradient-to-r from-red-500/80 to-red-600/80 hover:from-red-500 hover:to-red-600 text-white"
              }`}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-20 transition-colors duration-300 ${
      theme === "light" ? "bg-white text-black" : "bg-slate-950 text-white"
    }`}>
      {/* Ambient Background */}
      <div className="absolute inset-0 opacity-20">
        <div className={`absolute inset-0 ${
          theme === "light"
            ? "bg-[radial-gradient(circle_at_25%_25%,rgba(0,0,0,0.03),transparent_50%)]"
            : "bg-[radial-gradient(circle_at_25%_25%,rgba(16,185,129,0.03),transparent_50%)]"
        }`} />
        <div className={`absolute inset-0 ${
          theme === "light"
            ? "bg-[radial-gradient(circle_at_75%_75%,rgba(0,0,0,0.02),transparent_50%)]"
            : "bg-[radial-gradient(circle_at_75%_75%,rgba(139,92,246,0.03),transparent_50%)]"
        }`} />
      </div>

      {/* Header Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-block mb-6">
              <span className={`backdrop-blur-xl px-4 py-2 rounded-2xl text-sm font-semibold border-2 shadow-md ${
                theme === "light"
                  ? "bg-gray-100 text-black border-black/40"
                  : "bg-white/5 text-emerald-400 border-white/10"
              }`}>
                📝 All Reviews
              </span>
            </div>
            <h1 className={`text-5xl md:text-7xl font-black mb-6 bg-clip-text text-transparent tracking-tight ${
              theme === "light"
                ? "bg-gradient-to-r from-black via-gray-800 to-gray-600"
                : "bg-gradient-to-r from-white via-slate-200 to-slate-400"
            }`}>
              Reviews
            </h1>
            <p className={`text-xl max-w-2xl mx-auto leading-relaxed ${
              theme === "light" ? "text-black/70" : "text-slate-400"
            }`}>
              With every good film I see, I feel reborn.
            </p>
          </motion.div>

          {/* Search and Filter Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto space-y-4"
          >
            {/* Search Bar */}
            <div className="relative">
              <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 z-10 ${
                theme === "light" ? "text-gray-600" : "text-slate-400"
              }`} />
              <input
                type="text"
                placeholder="Search for a movie..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-12 pr-4 py-3 sm:py-4 backdrop-blur-xl border rounded-xl transition-all duration-300 text-sm sm:text-base focus:outline-none ${
                  theme === "light"
                    ? "bg-gray-100/70 border-gray-300 text-black placeholder-gray-500 focus:border-black focus:bg-gray-100"
                    : "bg-white/5 border-white/10 text-white placeholder-slate-400 focus:border-emerald-400/50 focus:bg-white/10"
                }`}
              />
            </div>

            {/* Genre Filter - Full Width on Mobile */}
            <div className="w-full">
              <DropdownMenu>
                <DropdownMenuTrigger className={`flex items-center justify-between w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl backdrop-blur-xl border transition-all duration-300 focus:outline-none focus:ring-2 ${
                  theme === "light"
                    ? "bg-gray-100/70 border-gray-300 text-black hover:bg-gray-200 hover:border-black/40 focus:ring-black/50"
                    : "bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-emerald-500/50 focus:ring-emerald-500/50"
                }`}>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Filter className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="font-medium text-sm sm:text-base">{activeGenreLabel}</span>
                  </div>
                  <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className={`w-full sm:w-80 max-h-80 overflow-y-auto backdrop-blur-xl ${
                  theme === "light"
                    ? "bg-white/98 border-gray-300"
                    : "bg-slate-900/98 border-white/10"
                }`}>
                  <DropdownMenuLabel className={`font-semibold px-4 py-2 text-sm sm:text-base ${
                    theme === "light" ? "text-gray-800" : "text-slate-300"
                  }`}>
                    Filter by Genre
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className={theme === "light" ? "bg-gray-300" : "bg-white/10"} />
                  {genres.map((genre) => (
                    <DropdownMenuItem
                      key={genre.key}
                      onClick={() => handleGenreSelect(genre.key)}
                      className={`cursor-pointer transition-colors px-4 py-3 text-sm sm:text-base ${
                        selectedGenre === genre.key
                          ? theme === "light"
                            ? "bg-black/10 text-black hover:bg-black/20 focus:bg-black/20"
                            : "bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 focus:bg-emerald-500/30"
                          : theme === "light"
                          ? "text-gray-700 hover:text-black hover:bg-gray-100 focus:bg-gray-100 focus:text-black"
                          : "text-slate-300 hover:text-emerald-200 hover:bg-emerald-500/10 focus:bg-emerald-500/10 focus:text-emerald-200"
                      }`}
                    >
                      {genre.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </motion.div>

          {/* Results Summary */}
          {(searchTerm || selectedGenre !== "all") && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 text-center"
            >
              <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-slate-400"}`}>
                {filteredReviews.length > 0
                  ? `Found ${filteredReviews.length} review${
                      filteredReviews.length !== 1 ? "s" : ""
                    }`
                  : "No reviews found"}
                {searchTerm && ` matching "${searchTerm}"`}
                {selectedGenre !== "all" && ` in ${activeGenreLabel}`}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="pb-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredReviews.length > 0 ? (
            <ReviewCardsWithFocus filteredReviews={filteredReviews} />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <div className={`text-lg ${theme === "light" ? "text-gray-600" : "text-slate-400"}`}>
                {searchTerm || selectedGenre !== "all"
                  ? "No reviews found matching your criteria."
                  : "No reviews available."}
              </div>
              {(searchTerm || selectedGenre !== "all") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedGenre("all");
                    fetchAllReviews();
                  }}
                  className={`mt-4 transition-colors duration-200 text-sm underline ${
                    theme === "light"
                      ? "text-black hover:text-gray-700"
                      : "text-emerald-400 hover:text-emerald-300"
                  }`}
                >
                  Clear filters and show all reviews
                </button>
              )}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
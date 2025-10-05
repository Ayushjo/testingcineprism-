"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Film, Eye, MessageCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";

const MobileHeroSection = () => {
  const { theme } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroPosters, setHeroPosters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();

  // Fetch latest reviews from API for hero posters
  useEffect(() => {
    const fetchHeroPosters = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await axios.get(
          "https://testingcineprismbackend-production.up.railway.app/api/v1/admin/latest-reviews"
        );

        const data = response.data;
        if (data.latestReviews && Array.isArray(data.latestReviews)) {
          // Transform API data to match component structure
          const transformedPosters = data.latestReviews.slice(0, 6).map((review) => ({
            id: review.id,
            image: review.reviewPosterImageUrl || review.posterImageUrl || "/placeholder.svg",
            title: review.title || "Untitled",
            subtitle: review.shortDescription || "No description available",
            year: review.year || "Unknown",
            rating: review.averageRating || 0,
            genre: review.genres?.[0] || "Unknown",
          }));
          setHeroPosters(transformedPosters);
        } else {
          setError("No reviews available");
        }
      } catch (error) {
        console.error("Error fetching hero posters:", error);
        setError("Failed to load reviews. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchHeroPosters();
  }, []);

  // Fetch quotes from API
  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios.get(
          "https://testingcineprismbackend-production.up.railway.app/api/v1/admin/fetch-quotes"
        );
        if (response.data.quotes && Array.isArray(response.data.quotes)) {
          setQuotes(response.data.quotes);
        }
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    };
    fetchQuotes();
  }, []);

  // Auto-rotate quotes every 5 seconds
  useEffect(() => {
    if (quotes.length === 0) return;
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [quotes.length]);

  // Auto-slide effect - one poster at a time (pause when dragging)
  useEffect(() => {
    if (isDragging) return; // Don't auto-slide while dragging

    const interval = setInterval(() => {
      setCurrentSlide(
        (prev) => (prev + 1) % heroPosters.length
      );
    }, 5000); // Slower transition for full-width viewing
    return () => clearInterval(interval);
  }, [heroPosters.length, isDragging]);

  // Custom scrollbar hide styles
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');
        .font-serif { font-family: 'Crimson Text', 'Times New Roman', serif; }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-delay-200 { animation-delay: 0.2s; }
        .animate-delay-400 { animation-delay: 0.4s; }
        .animate-delay-600 { animation-delay: 0.6s; }
        .animate-delay-800 { animation-delay: 0.8s; }
        .animate-delay-1000 { animation-delay: 1.0s; }

        /* Enhanced mobile responsiveness */
        @media (max-width: 640px) {
          .hero-title-small { font-size: 2.5rem; }
          .hero-title-large { font-size: 3rem; }
        }

        @media (min-width: 641px) and (max-width: 768px) {
          .hero-title-small { font-size: 3rem; }
          .hero-title-large { font-size: 3.5rem; }
        }

        @media (min-width: 769px) {
          .hero-title-small { font-size: 3.5rem; }
          .hero-title-large { font-size: 4rem; }
        }
      `}</style>

      <section className={`relative overflow-hidden min-h-screen transition-colors duration-300 ${
        theme === "light"
          ? "bg-white text-black"
          : "bg-slate-950 text-white"
      }`}>

        <div className="relative z-10 pt-[4.5rem] sm:pt-[4.5rem] md:pt-[4.5rem] px-4 sm:px-6 md:px-8 flex flex-col min-h-screen justify-center pb-4">

          {/* Hero Title Section - Always visible */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center flex-shrink-0 mb-14 sm:mb-12 md:mb-14"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative"
            >
              <h1 className="leading-[0.9] tracking-tight mb-6 sm:mb-6 md:mb-8">
                <span className={`block font-light mb-2 sm:mb-3 hero-title-small ${
                  theme === "light" ? "text-black" : "text-slate-100"
                }`}>
                  Cinema for
                </span>
                <span className={`block font-bold hero-title-large ${
                  theme === "light"
                    ? "bg-gradient-to-r from-gray-900 via-black to-gray-800 bg-clip-text text-transparent"
                    : "bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent"
                }`} style={theme === "light" ? {
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))'
                } : {}}>
                  Acquired Taste
                </span>
              </h1>

              {/* Rotating Quotes Section */}
              <div className="min-h-[120px] sm:min-h-[140px] md:min-h-[160px] flex items-center justify-center max-w-2xl mx-auto">
                {quotes.length > 0 ? (
                  <motion.div
                    key={currentQuoteIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6 }}
                    className="text-center px-4"
                  >
                    <div className="relative">
                      <p className={`text-base sm:text-lg md:text-xl leading-relaxed font-light italic pl-6 sm:pl-8 ${
                        theme === "light" ? "text-black/80" : "text-slate-300"
                      }`}>
                        "{quotes[currentQuoteIndex]?.quote}"
                      </p>
                      <p className={`text-sm sm:text-base md:text-lg mt-4 font-semibold ${
                        theme === "light" ? "text-gray-900" : "text-slate-400"
                      }`}>
                        — {quotes[currentQuoteIndex]?.author}
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className={`text-base sm:text-lg md:text-xl leading-relaxed max-w-lg mx-auto font-light ${
                      theme === "light" ? "text-black/80" : "text-slate-300"
                    }`}
                  >
                    Deep dives, critical essays, and curated collections that celebrate the art of film.
                  </motion.p>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex-1 flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <div className={`w-12 h-12 border-4 rounded-full animate-spin ${
                  theme === "light"
                    ? "border-gray-200 border-t-black"
                    : "border-white/20 border-t-white"
                }`}></div>
                <p className={`text-sm sm:text-base ${
                  theme === "light" ? "text-black/70" : "text-slate-400"
                }`}>Loading latest reviews...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center max-w-md mx-auto">
                <div className={`rounded-2xl p-6 sm:p-8 ${
                  theme === "light"
                    ? "bg-red-100/50 border border-red-600/30"
                    : "bg-red-500/10 border border-red-500/30"
                }`}>
                  <h3 className={`text-xl font-bold mb-4 ${
                    theme === "light" ? "text-red-600" : "text-red-400"
                  }`}>
                    Error Loading Reviews
                  </h3>
                  <p className={`mb-6 ${
                    theme === "light" ? "text-black/70" : "text-slate-400"
                  }`}>{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className={`px-4 py-2 rounded-2xl border transition-all ${
                      theme === "light"
                        ? "bg-red-200/50 text-red-600 border-red-600/30 hover:bg-red-300/50"
                        : "bg-red-500/20 text-red-300 border-red-500/30 hover:bg-red-500/30"
                    }`}
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Full-Width Single Poster Display */}
          {!isLoading && !error && heroPosters.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex-shrink-0 mb-10 sm:mb-8 md:mb-10"
          >
            <div className="relative overflow-hidden rounded-2xl aspect-[16/9] max-w-4xl mx-auto w-full mb-8">
              {/* Single Poster Container */}
              <div className="relative w-full h-full">
                {heroPosters.map((poster, index) => (
                  <motion.div
                    key={poster.id}
                    initial={{ opacity: 0, x: 300 }}
                    animate={{
                      opacity: index === currentSlide ? 1 : 0,
                      x: index === currentSlide ? 0 : index > currentSlide ? 300 : -300,
                      scale: index === currentSlide ? 1 : 0.8
                    }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className={`absolute inset-0 w-full h-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} ${index === currentSlide ? 'z-10' : 'z-0'}`}
                    onClick={(e) => {
                      if (!isDragging) navigate(`/post/${poster.id}`);
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={(e, info) => {
                      const dragDistance = info.offset.x;
                      const threshold = 50;

                      if (Math.abs(dragDistance) > threshold) {
                        if (dragDistance < 0) {
                          // Dragged left - go to next slide
                          setCurrentSlide((prev) => (prev + 1) % heroPosters.length);
                        } else {
                          // Dragged right - go to previous slide
                          setCurrentSlide((prev) => (prev - 1 + heroPosters.length) % heroPosters.length);
                        }
                      }
                      setIsDragging(false);
                    }}
                  >
                    {/* Main Rectangular Poster */}
                    <div className="relative z-10 w-full h-full">
                      <div className={`relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-3xl ${
                        theme === "light"
                          ? "border-black/40 hover:border-black/80 hover:shadow-black/20"
                          : "border-white/20 hover:border-white/40"
                      }`}>
                        <img
                          src={poster.image || "/placeholder.svg"}
                          alt={poster.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />

                        {/* Dark overlay for text readability - smaller area */}
                        <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-36 md:h-40 bg-gradient-to-t from-black/95 via-black/60 to-transparent" />

                        {/* Poster Info Overlay - Compact and lower */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6">
                          <div className="flex items-center justify-between text-white">
                            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                              {poster.title}
                            </h3>
                            <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm flex-shrink-0 ml-4 text-slate-200">
                              <div className="flex items-center gap-1.5">
                                <span className={`w-1.5 h-1.5 rounded-full ${
                                  theme === "light" ? "bg-emerald-400" : "bg-emerald-400"
                                }`}></span>
                                <span>{poster.year}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <span className={`w-1.5 h-1.5 rounded-full ${
                                  theme === "light" ? "bg-blue-400" : "bg-blue-400"
                                }`}></span>
                                <span>{poster.genre}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Read Review Button */}
              <div className="absolute top-4 right-4 z-20">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/post/${heroPosters[currentSlide]?.id}`)}
                  className={`backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold border-2 transition-all duration-300 flex items-center gap-1 shadow-lg ${
                    theme === "light"
                      ? "bg-white/90 text-black border-black/60 hover:bg-black hover:text-white hover:border-black"
                      : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                  }`}
                >
                  <span>Read Review</span>
                  <ArrowRight className="w-3 h-3" />
                </motion.button>
              </div>
            </div>

            {/* Slide Indicators - Below poster */}
            <div className="flex justify-center gap-2 mt-4">
              {heroPosters.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? theme === "light"
                        ? "bg-black shadow-lg shadow-black/50 scale-125 ring-2 ring-gray-300"
                        : "bg-white shadow-lg scale-125"
                      : theme === "light"
                      ? "bg-gray-300 hover:bg-gray-500"
                      : "bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </motion.div>
          )}

          {/* CTA Section */}
          {!isLoading && !error && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-center flex-shrink-0 px-4"
          >
            {/* CTA Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className={`text-sm sm:text-base leading-relaxed max-w-md mx-auto mb-4 sm:mb-6 font-medium ${
                theme === "light" ? "text-black/70" : "text-slate-400"
              }`}
            >
              Ready to discover your next favorite film? Explore our carefully curated top picks and trending recommendations.
            </motion.p>

            {/* Enhanced CTA Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/recommendations-page")}
              className={`group relative px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 rounded-2xl font-bold transition-all duration-300 flex items-center gap-3 mx-auto text-base sm:text-lg md:text-xl shadow-2xl overflow-hidden border-2 ${
                theme === "light"
                  ? "bg-black text-white hover:bg-gray-900 hover:shadow-black/40 border-black hover:scale-105"
                  : "bg-white text-slate-950 hover:bg-slate-100 hover:shadow-white/20 border-white/20"
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${
                theme === "light"
                  ? "from-white via-gray-200 to-white"
                  : "from-white via-slate-50 to-white"
              }`} />
              <span className="relative z-10">Start Exploring</span>
              <ArrowRight className="relative z-10 w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </motion.button>
          </motion.div>
          )}

        </div>
      </section>
    </>
  );
};

export default MobileHeroSection;
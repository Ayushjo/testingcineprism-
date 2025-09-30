"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Film, Eye, MessageCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MobileHeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroPosters, setHeroPosters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
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

  // Auto-slide effect - one poster at a time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(
        (prev) => (prev + 1) % heroPosters.length
      );
    }, 5000); // Slower transition for full-width viewing
    return () => clearInterval(interval);
  }, [heroPosters.length]);

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

      <section className="relative bg-slate-950 text-white overflow-hidden min-h-screen">

        <div className="relative z-10 pt-14 sm:pt-14 md:pt-14 px-4 sm:px-6 md:px-8 flex flex-col min-h-screen justify-center pb-4">

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
                <span className="block text-slate-100 font-light mb-2 sm:mb-3 hero-title-small">
                  Cinema for
                </span>
                <span className="block bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent font-bold hero-title-large">
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
                      <svg
                        className="absolute -top-2 -left-2 w-8 h-8 sm:w-10 sm:h-10 text-emerald-500/20"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                      </svg>
                      <p className="text-slate-300 text-base sm:text-lg md:text-xl leading-relaxed font-light italic pl-6 sm:pl-8">
                        "{quotes[currentQuoteIndex]?.quote}"
                      </p>
                      <p className="text-slate-400 text-sm sm:text-base md:text-lg mt-4 font-medium">
                        — {quotes[currentQuoteIndex]?.author}
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-slate-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-lg mx-auto font-light"
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
                <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                <p className="text-slate-400 text-sm sm:text-base">Loading latest reviews...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center max-w-md mx-auto">
                <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 sm:p-8">
                  <h3 className="text-xl font-bold text-red-400 mb-4">
                    Error Loading Reviews
                  </h3>
                  <p className="text-slate-400 mb-6">{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="bg-red-500/20 text-red-300 px-4 py-2 rounded-2xl border border-red-500/30 hover:bg-red-500/30 transition-all"
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
                    className={`absolute inset-0 w-full h-full cursor-pointer ${index === currentSlide ? 'z-10' : 'z-0'}`}
                    onClick={() => navigate(`/post/${poster.id}`)}
                  >
                    {/* Main Rectangular Poster */}
                    <div className="relative z-10 w-full h-full">
                      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-3xl hover:border-white/40">
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
                            <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-300 flex-shrink-0 ml-4">
                              <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                                <span>{poster.year}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
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
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(`/post/${heroPosters[currentSlide]?.id}`)}
                  className="bg-white/10 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center gap-1"
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
                      ? "bg-white shadow-lg scale-125"
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
              className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-md mx-auto mb-4 sm:mb-6 font-medium"
            >
              Ready to discover your next favorite film? Explore our carefully curated top picks and trending recommendations.
            </motion.p>

            {/* Enhanced CTA Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/recommendations-page")}
              className="group relative bg-white text-slate-950 px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 rounded-2xl font-semibold hover:bg-slate-100 transition-all duration-300 flex items-center gap-3 mx-auto text-base sm:text-lg md:text-xl shadow-2xl hover:shadow-white/20 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white via-slate-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
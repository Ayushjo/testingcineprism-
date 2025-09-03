import { motion, useMotionValue } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LatestReviews() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [latestReviews, setLatestReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  const x = useMotionValue(0);
  const dragConstraints = useRef({ left: 0, right: 0 });
  // Fetch latest reviews from API
  useEffect(() => {
    const fetchLatestReviews = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://testingcineprismbackend-production.up.railway.app/api/v1/admin/latest-reviews"
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

  // Update scroll constraints and button states
  useEffect(() => {
    const updateConstraints = () => {
      if (scrollRef.current) {
        const container = scrollRef.current;
        const scrollWidth = container.scrollWidth;
        const clientWidth = container.clientWidth;
        const maxScroll = scrollWidth - clientWidth;

        dragConstraints.current = {
          left: -maxScroll,
          right: 0,
        };

        const currentX = x.get();
        setCanScrollLeft(currentX < 0);
        setCanScrollRight(Math.abs(currentX) < maxScroll - 10);
      }
    };

    updateConstraints();
    window.addEventListener("resize", updateConstraints);

    const unsubscribe = x.onChange(updateConstraints);

    return () => {
      window.removeEventListener("resize", updateConstraints);
      unsubscribe();
    };
  }, [x, latestReviews]);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const scrollLeft = () => {
    const newX = Math.min(x.get() + 320, 0);
    x.set(newX);
  };

  const scrollRight = () => {
    const newX = Math.max(x.get() - 320, dragConstraints.current.left);
    x.set(newX);
  };

  const handleCardClick = (reviewId) => {
    if (!isDragging) {
      navigate(`/post/${reviewId}`);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400 text-lg">Loading latest reviews...</p>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8 max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-red-400 mb-4">Error</h3>
            <p className="text-slate-400 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-red-500/80 to-red-600/80 hover:from-red-500 hover:to-red-600 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Empty state
  if (latestReviews.length === 0) {
    return (
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-400 text-lg">No reviews available</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(16,185,129,0.03),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(139,92,246,0.03),transparent_50%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-6">
            <span className="bg-white/5 backdrop-blur-xl text-emerald-400 px-4 py-2 rounded-2xl text-sm font-semibold border border-white/10">
              🎬 Fresh Reviews
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent tracking-tight">
            Latest Reviews
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Our newest takes on the films everyone's talking about
          </p>
        </motion.div>

        {/* Carousel Container */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Navigation Buttons */}
          <motion.button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full backdrop-blur-xl border transition-all duration-300 ${
              canScrollLeft
                ? "bg-white/10 border-white/20 text-white hover:bg-white/20 hover:scale-110"
                : "bg-white/5 border-white/10 text-white/30 cursor-not-allowed"
            }`}
            whileHover={canScrollLeft ? { scale: 1.1 } : {}}
            whileTap={canScrollLeft ? { scale: 0.95 } : {}}
          >
            <ChevronLeft className="w-6 h-6 mx-auto" />
          </motion.button>

          <motion.button
            onClick={scrollRight}
            disabled={!canScrollRight}
            className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full backdrop-blur-xl border transition-all duration-300 ${
              canScrollRight
                ? "bg-white/10 border-white/20 text-white hover:bg-white/20 hover:scale-110"
                : "bg-white/5 border-white/10 text-white/30 cursor-not-allowed"
            }`}
            whileHover={canScrollRight ? { scale: 1.1 } : {}}
            whileTap={canScrollRight ? { scale: 0.95 } : {}}
          >
            <ChevronRight className="w-6 h-6 mx-auto" />
          </motion.button>

          {/* Draggable Carousel */}
          <div className="overflow-hidden mx-16">
            <motion.div
              ref={scrollRef}
              drag="x"
              dragConstraints={dragConstraints.current}
              dragElastic={0.1}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              style={{ x }}
              className={`flex gap-6 ${
                isDragging ? "cursor-grabbing" : "cursor-grab"
              }`}
              whileTap={{ cursor: "grabbing" }}
            >
              {latestReviews.map((movie, index) => (
                <motion.div
                  key={movie.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={!isDragging ? { y: -10, scale: 1.02 } : {}}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => handleCardClick(movie.id)}
                  className="group relative flex-shrink-0 w-64 select-none cursor-pointer"
                  style={{ pointerEvents: isDragging ? "none" : "auto" }}
                >
                  <div className="aspect-[2/3] relative rounded-2xl overflow-hidden shadow-2xl group-hover:shadow-emerald-500/20 transition-all duration-500">
                    {/* Rating Display */}

                    <img
                      src={movie.posterUrl || "/placeholder.svg"}
                      alt={movie.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      draggable={false}
                      onError={(e) => {
                        e.target.src = "/placeholder.svg";
                      }}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    {/* Movie Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white font-bold text-lg mb-2 leading-tight tracking-tight">
                        {movie.title}
                      </h3>
                      <div className="flex items-center gap-2 text-slate-300 text-sm mb-2">
                        <span>{movie.year}</span>
                        {movie.genres && movie.genres.length > 0 && (
                          <>
                            <span>•</span>
                            <span>{movie.genres[0]}</span>
                          </>
                        )}
                      </div>
                      {movie.directedBy && (
                        <p className="text-slate-400 text-xs">
                          Directed by {movie.directedBy}
                        </p>
                      )}
                    </div>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Scroll Fade Edges */}
          <div className="absolute left-16 top-0 bottom-0 w-12 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none" />
          <div className="absolute right-16 top-0 bottom-0 w-12 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none" />

          {/* Scroll Indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({
              length: Math.ceil(latestReviews.length / 3),
            }).map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-white/20 transition-all duration-300"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

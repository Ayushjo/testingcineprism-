import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Award, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const PickCard = ({ movie, index, onClick, theme }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      onClick={onClick}
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

        

        {/* Rank Number */}
        <div className="absolute top-3 right-3">
          <div className={`w-8 h-8 sm:w-10 sm:h-10 backdrop-blur-sm rounded-full flex items-center justify-center border-2 shadow-lg ${
            theme === "light"
              ? "bg-white/90 border-black/60"
              : "bg-black/60 border-white/20"
          }`}>
            <span className={`font-bold text-sm sm:text-base ${
              theme === "light" ? "text-black" : "text-white"
            }`}>
              #{index + 1}
            </span>
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
          <h3 className={`font-bold text-sm leading-tight mb-1 ${
            theme === "light" ? "text-white" : "text-white"
          }`}>
            {movie.title}
          </h3>
          <div className={`flex items-center gap-2 text-xs ${
            theme === "light" ? "text-slate-200" : "text-slate-300"
          }`}>
            <span>{movie.year}</span>
          </div>
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

      </div>
    </motion.div>
  );
};

export default function Top5Picks() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);

  // Top 5 movie picks
  const topPicks = [
    {
      id: 1,
      title: "Citizen Kane",
      year: 1941,
      posterUrl:
        "https://thecineprismimages.s3.ap-south-1.amazonaws.com/manual-uploads/gzYbXKwFMBBoE5lTtGsyLBYwvMs.webp",
    },
    {
      id: 2,
      title: "Taxi Driver",
      year: 1976,
      posterUrl:
        "https://thecineprismimages.s3.ap-south-1.amazonaws.com/manual-uploads/vCNTbg9I859M4a2xgx1Q5ipAE0e.webp",
    },
    {
      id: 3,
      title: "Ran",
      year: 1985,
      posterUrl:
        "https://thecineprismimages.s3.ap-south-1.amazonaws.com/manual-uploads/iYQcDhuHrdPOHLUUxXaFChFrc97.webp",
    },
    {
      id: 4,
      title: "Ardh Satya",
      year: 1983,
      posterUrl:
        "https://thecineprismimages.s3.ap-south-1.amazonaws.com/manual-uploads/uBefh0aCQ3OJu48Fzk5CWPvBAhg.webp",
    },
    {
      id: 5,
      title: "Breathless",
      year: 1960,
      posterUrl:
        "https://thecineprismimages.s3.ap-south-1.amazonaws.com/manual-uploads/8dq0fHED6eq4mG3wVnMP8oXXbEH.webp",
    },
  ];

  const handlePickClick = () => {
    navigate("/recommendations-page");
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
        {/* Section Header */}
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
              <Award className="w-3 h-3 sm:w-4 sm:h-4" />
              Curated Masterpieces
            </span>
          </div>
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 bg-clip-text text-transparent tracking-tight px-4 ${
              theme === "light"
                ? "bg-gradient-to-r from-black via-gray-800 to-gray-600"
                : "bg-gradient-to-r from-white via-slate-200 to-slate-400"
            }`}
          >
            Top 5 Recommendations
          </h2>
          <p
            className={`text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed px-4 ${
              theme === "light" ? "text-black/70" : "text-slate-400"
            }`}
          >
            Essential films every cinephile must watch at least once
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
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
            {topPicks.map((movie, index) => (
              <PickCard
                key={movie.id}
                movie={movie}
                index={index}
                onClick={handlePickClick}
                theme={theme}
              />
            ))}
          </div>
        </motion.div>

        {/* Explore More Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <motion.button
            onClick={() => navigate("/recommendations-page")}
            whileTap={{ scale: 0.98 }}
            className={`group relative inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl border-2 transition-all duration-300 shadow-lg font-semibold text-sm sm:text-base ${
              theme === "light"
                ? "bg-black text-white hover:bg-gray-900 border-black hover:shadow-black/40 hover:scale-105"
                : "bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border-emerald-400/30 hover:border-emerald-400/50 hover:shadow-emerald-500/20"
            }`}
          >
            <span>View All Recommendations</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />

            {/* Glow effect on hover */}
            <div
              className={`absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 ${
                theme === "light"
                  ? "from-gray-800/10 via-gray-700/10 to-gray-800/10"
                  : "from-emerald-500/10 via-emerald-400/10 to-emerald-500/10"
              }`}
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

"use client";
import { motion } from "framer-motion";
import { Film, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import ActionImage from "../assets/action.jpg";
import ThrillerImage from "../assets/thriller.jpg"
import DramaImage from "../assets/drama.jpg"
import HorrorImage from "../assets/horror.jpg"
import AnimationImage from "../assets/animation.jpg"
const genresData = [
  {
    id: 1,
    name: "Sci-Fi",
    imageUrl: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986",
  },
  {
    id: 2,
    name: "Action",
    imageUrl: ActionImage,
  },
  {
    id: 3,
    name: "Thriller",
    imageUrl: ThrillerImage,
  },
  {
    id: 4,
    name: "Drama",
    imageUrl: DramaImage,
  },
  {
    id: 5,
    name: "Horror",
    imageUrl: HorrorImage,
  },
  {
    id: 6,
    name: "Animation",
    imageUrl: AnimationImage,
  },
];

export default function ExploreByGenre() {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleGenreClick = (genreName) => {
    // Map genre names to URL-friendly paths
    const genreRoutes = {
      "Sci-Fi": "/sci-fi",
      "Action": "/action",
      "Thriller": "/thriller",
      "Drama": "/drama",
      "Horror": "/horror",
      "Animation": "/animation",
      "Comedy": "/comedy",
      "War": "/war",
    };

    navigate(genreRoutes[genreName] || `/genre/${genreName}`);
  };

  return (
    <section className={`py-24 relative overflow-hidden transition-colors duration-300 ${
      theme === "light"
        ? "bg-gradient-to-b from-white to-gray-50"
        : "bg-gradient-to-b from-slate-950 to-slate-900"
    }`}>
      {/* Ambient Background */}
      <div className="absolute inset-0 opacity-20">
        <div className={`absolute inset-0 ${
          theme === "light"
            ? "bg-[radial-gradient(circle_at_25%_25%,rgba(0,0,0,0.03),transparent_50%)]"
            : "bg-[radial-gradient(circle_at_25%_25%,rgba(16,185,129,0.04),transparent_50%)]"
        }`} />
        <div className={`absolute inset-0 ${
          theme === "light"
            ? "bg-[radial-gradient(circle_at_75%_75%,rgba(0,0,0,0.02),transparent_50%)]"
            : "bg-[radial-gradient(circle_at_75%_75%,rgba(139,92,246,0.04),transparent_50%)]"
        }`} />
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
            <span className={`backdrop-blur-xl px-4 py-2 rounded-2xl text-sm font-semibold border-2 flex items-center gap-2 shadow-md ${
              theme === "light"
                ? "bg-gray-100 text-black border-black/40"
                : "bg-white/5 text-emerald-400 border-white/10"
            }`}>
              <Film className="w-4 h-4" />
              Browse Categories
            </span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-black mb-6 bg-clip-text text-transparent tracking-tight ${
            theme === "light"
              ? "bg-gradient-to-r from-black via-gray-800 to-gray-600"
              : "bg-gradient-to-r from-white via-slate-200 to-slate-400"
          }`}>
            Explore by Genre
          </h2>
          <p className={`text-xl max-w-2xl mx-auto leading-relaxed ${
            theme === "light" ? "text-black/70" : "text-slate-400"
          }`}>
            Discover your next favorite film through our curated genre
            collections
          </p>
        </motion.div>

        {/* Genre Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {genresData.map((genre, index) => (
            <motion.div
              onClick={() => handleGenreClick(genre.name)}
              key={genre.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`group relative h-64 rounded-3xl overflow-hidden cursor-pointer shadow-2xl transition-all duration-500 border-2 ${
                theme === "light"
                  ? "border-black/40 hover:shadow-black/20 hover:border-black/80"
                  : "border-white/20 hover:shadow-emerald-500/20"
              }`}
            >
              {/* Background Image */}
              <img
                src={genre.imageUrl || "/placeholder.svg"}
                alt={genre.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-300" />

              {/* Genre Name */}
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-2xl md:text-3xl font-black text-white text-center tracking-tight group-hover:scale-110 transition-transform duration-300">
                  {genre.name}
                </h3>
              </div>

              {/* Hover Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl ${
                theme === "light"
                  ? "from-gray-400/20 to-gray-600/20"
                  : "from-emerald-500/20 to-purple-500/20"
              }`} />

              {/* Subtle Border */}
              <div className={`absolute inset-0 rounded-3xl transition-colors duration-300 ${
                theme === "light"
                  ? ""
                  : ""
              }`} />
            </motion.div>
          ))}
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
            onClick={() => navigate('/explore-genres')}
            whileTap={{ scale: 0.98 }}
            className={`group relative inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl border-2 transition-all duration-300 shadow-lg font-semibold text-sm sm:text-base ${
              theme === "light"
                ? "bg-black text-white hover:bg-gray-900 border-black hover:shadow-black/40 hover:scale-105"
                : "bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border-emerald-400/30 hover:border-emerald-400/50 hover:shadow-emerald-500/20"
            }`}
          >
            <span>Explore More Genres</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />

            {/* Glow effect on hover */}
            <div className={`absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 ${
              theme === "light"
                ? "from-gray-800/10 via-gray-700/10 to-gray-800/10"
                : "from-emerald-500/10 via-emerald-400/10 to-emerald-500/10"
            }`} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

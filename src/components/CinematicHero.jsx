"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Star,
  Film,
  Award,
  ChevronDown,
  Calendar,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import OppenHeimerFire from "../assets/oppenheimerfire.jpg";
import OppenheimerImage from "../assets/oppenheimer.jpg";
import DunePoster from "../assets/dunefan.jpg";
import Dune from "../assets/Dune.jpg";
import AvatarPoster from "../assets/AvatarPoster.jpg";
import AvatarBackdrop from "../assets/AvatarBackdrop.jpg";
export default function ElegantCinemaHeroSection() {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const featuredFilms = [
    {
      id: 1,
      title: "Dune: Part Two",
      director: "Denis Villeneuve",
      year: "2024",
      rating: 8.8,
      genre: "Sci-Fi Epic",
      runtime: "166 min",
      poster: DunePoster,
      backdrop: Dune,
      tagline: "Power belongs to those who take it",
      color: "from-amber-500/10 via-orange-500/5 to-transparent",
      accent: "border-amber-500/20 text-amber-400",
    },
    {
      id: 2,
      title: "Oppenheimer",
      director: "Christopher Nolan",
      year: "2023",
      rating: 8.3,
      genre: "Historical Drama",
      runtime: "180 min",
      poster: OppenheimerImage,
      backdrop: OppenHeimerFire,
      tagline: "The world forever changes",
      color: "from-red-500/10 via-orange-500/5 to-transparent",
      accent: "border-red-500/20 text-red-400",
    },
    {
      id: 3,
      title: "Avatar: The Way of Water",
      director: "James Cameron",
      year: "2022",
      rating: 7.6,
      genre: "Epic Science Fiction",
      runtime: "192 min",
      poster: AvatarPoster,
      backdrop: AvatarBackdrop,
      tagline: "Return to Pandora",
      color: "from-cyan-500/10 via-blue-500/5 to-transparent",
      accent: "border-cyan-500/20 text-cyan-400",
    },
  ];

  // Refined mouse tracking for subtle parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width - 0.5,
          y: (e.clientY - rect.top) / rect.height - 0.5,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      return () => container.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  // Auto-advance frames with longer intervals for elegance
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % featuredFilms.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [featuredFilms.length]);

  const currentFilm = featuredFilms[currentFrame];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-12"
    >
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Refined Film Strip Decoration */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-slate-800/20 to-transparent opacity-30">
        <div className="absolute left-2 top-0 bottom-0 w-1 bg-gradient-to-b from-slate-600/30 via-slate-500/20 to-slate-600/30">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, delay: i * 0.1, repeat: Infinity }}
              className="absolute w-full h-6 bg-slate-900/50"
              style={{ top: `${i * 5}%` }}
            />
          ))}
        </div>
      </div>

      {/* Dynamic Background with Subtle Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentFilm.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/95 to-slate-950/80" />
          <img
            src={currentFilm.backdrop}
            alt={currentFilm.title}
            className="w-full h-full object-cover opacity-20"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-br ${currentFilm.color}`}
          />
        </motion.div>
      </AnimatePresence>

      {/* Main Content Container */}
      <div className="relative z-20 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            {/* Left Content - 7 columns */}
            <div className="lg:col-span-7 space-y-10">
              {/* Refined Cinema Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center gap-3 bg-slate-800/30 backdrop-blur-xl border border-slate-700/30 px-5 py-2.5 rounded-full text-sm font-medium text-slate-300"
              >
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span>Premium Cinema Experience</span>
                <Film className="w-4 h-4 text-emerald-400" />
              </motion.div>

              {/* Elegant Main Title */}
              <div className="space-y-6">
                <motion.h1
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="text-7xl md:text-8xl lg:text-9xl font-light leading-[0.9] tracking-tight"
                >
                  <span className="text-slate-100 font-extralight">The</span>
                  <br />
                  <span className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-500 bg-clip-text text-transparent font-normal">
                    Cinéprism
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-lg md:text-xl text-slate-400 font-light leading-relaxed max-w-2xl"
                >
                  Where every frame tells a story, and every story shapes
                  cinema.
                </motion.p>
              </div>

              {/* Sophisticated Featured Film Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFilm.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 1 }}
                  className="relative group"
                  onHoverStart={() => setIsHovered(true)}
                  onHoverEnd={() => setIsHovered(false)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

                  <div className="relative bg-slate-800/20 backdrop-blur-2xl border border-slate-700/30 rounded-3xl p-8 transition-all duration-500 group-hover:border-emerald-500/20">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <p className="text-sm text-emerald-400 font-medium mb-2 uppercase tracking-wider">
                          Featured Review
                        </p>
                        <h3 className="text-2xl font-light text-slate-100 mb-1">
                          {currentFilm.title}
                        </h3>
                        <p className="text-slate-400 text-sm">
                          {currentFilm.director} • {currentFilm.year}
                        </p>
                      </div>

                      <div
                        className={`flex items-center gap-2 bg-slate-800/40 backdrop-blur-xl border ${currentFilm.accent} px-4 py-2 rounded-full`}
                      >
                        <Star
                          className={`w-4 h-4 fill-current ${
                            currentFilm.accent.split(" ")[1]
                          }`}
                        />
                        <span
                          className={`text-sm font-semibold ${
                            currentFilm.accent.split(" ")[1]
                          }`}
                        >
                          {currentFilm.rating}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-slate-400 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{currentFilm.genre}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{currentFilm.runtime}</span>
                      </div>
                    </div>

                    <p className="text-slate-300 italic text-base leading-relaxed">
                      "{currentFilm.tagline}"
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Refined Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  size="lg"
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-8 py-4 rounded-2xl font-medium text-base shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105"
                >
                  <Play className="w-5 h-5 mr-3 fill-current" />
                  Explore Collection
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="bg-slate-800/20 hover:bg-slate-800/40 border-slate-600/30 hover:border-emerald-500/30 text-slate-200 px-8 py-4 rounded-2xl font-medium text-base backdrop-blur-xl transition-all duration-300"
                >
                  <Award className="w-5 h-5 mr-3" />
                  Critics' Choice
                </Button>
              </motion.div>

              {/* Minimalist Film Navigation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex items-center gap-3"
              >
                {featuredFilms.map((film, index) => (
                  <motion.button
                    key={film.id}
                    onClick={() => setCurrentFrame(index)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative w-16 h-10 rounded-lg border-2 transition-all duration-500 overflow-hidden group ${
                      index === currentFrame
                        ? "border-emerald-400 shadow-lg shadow-emerald-400/20"
                        : "border-slate-600/40 hover:border-slate-500/60"
                    }`}
                  >
                    <img
                      src={film.poster}
                      alt={film.title}
                      className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110"
                    />
                    <div
                      className={`absolute inset-0 transition-opacity duration-300 ${
                        index === currentFrame
                          ? "bg-emerald-400/20"
                          : "bg-slate-900/40 group-hover:bg-slate-900/20"
                      }`}
                    />
                  </motion.button>
                ))}
              </motion.div>
            </div>

            {/* Right Content - Floating Poster - 5 columns */}
            <div className="lg:col-span-5 relative hidden lg:block">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFilm.id}
                  initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotateY: 0,
                    x: mousePosition.x * 10,
                    y: mousePosition.y * 10,
                  }}
                  exit={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                  transition={{
                    duration: 1.2,
                    ease: "easeOut",
                    x: { type: "spring", stiffness: 50, damping: 20 },
                    y: { type: "spring", stiffness: 50, damping: 20 },
                  }}
                  className="relative mx-auto w-80"
                >
                  <div className="aspect-[2/3] relative">
                    {/* Elegant Glow Effect */}
                    <div className="absolute -inset-4 bg-gradient-to-br from-emerald-400/20 via-transparent to-slate-600/20 rounded-3xl blur-2xl opacity-60" />

                    {/* Main Poster Container */}
                    <motion.div
                      className="relative bg-slate-800/10 backdrop-blur-2xl border border-slate-700/20 rounded-3xl p-3 shadow-2xl"
                      whileHover={{
                        scale: 1.02,
                        borderColor: "rgba(52, 211, 153, 0.3)",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={currentFilm.poster}
                        alt={currentFilm.title}
                        className="w-full h-full object-cover rounded-2xl shadow-xl"
                      />

                      {/* Subtle Film Strip Edge */}
                      <div className="absolute -left-1 top-4 bottom-4 w-2 bg-gradient-to-b from-emerald-400/30 via-emerald-500/20 to-emerald-400/30 rounded-l-sm">
                        {Array.from({ length: 8 }).map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-full h-3 bg-slate-900/60"
                            style={{ top: `${i * 12.5}%` }}
                          />
                        ))}
                      </div>

                      {/* Rating Badge */}
                      <div className="absolute top-6 right-6 bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-full px-3 py-1.5">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-emerald-400 fill-current" />
                          <span className="text-xs font-semibold text-emerald-400">
                            {currentFilm.rating}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Refined Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <p className="text-xs text-slate-500 uppercase tracking-wider">
            Discover
          </p>
          <ChevronDown className="w-5 h-5 text-emerald-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}

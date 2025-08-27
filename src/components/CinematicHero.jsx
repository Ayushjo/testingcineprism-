"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Star, Film, Award, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import OppenHeimerFire from "../assets/oppenheimerfire.jpg";
import OppenheimerImage from "../assets/oppenheimer.jpg";
import DunePoster from "../assets/dunefan.jpg";
import Dune from "../assets/Dune.jpg";
export default function CinematicHeroSection() {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
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
      poster: DunePoster,
      backdrop: Dune,
      tagline: "Power belongs to those who take it",
      color: "from-orange-500/20 to-amber-600/20",
    },
    {
      id: 2,
      title: "Oppenheimer",
      director: "Christopher Nolan",
      year: "2023",
      rating: 8.3,
      genre: "Historical Drama",
      poster: OppenheimerImage,
      backdrop: OppenHeimerFire,
      tagline: "The world forever changes",
      color: "from-red-500/20 to-orange-600/20",
    },
    {
      id: 3,
      title: "Everything Everywhere All at Once",
      director: "Daniels",
      year: "2022",
      rating: 7.8,
      genre: "Multiverse Adventure",
      poster: "/eeaao-poster.png",
      backdrop: "/multiverse-colorful-abstract-cinematic.png",
      tagline: "The universe is so much bigger than you realize",
      color: "from-purple-500/20 to-pink-600/20",
    },
  ];

  // Film strip frames for background animation
  const filmFrames = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    image: `/placeholder.svg?height=120&width=80&query=vintage film frame ${
      i + 1
    }`,
  }));

  // Mouse tracking for parallax
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

  // Auto-advance frames
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % featuredFilms.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [featuredFilms.length]);

  const currentFilm = featuredFilms[currentFrame];

  return (
    <section
      ref={containerRef}
      className="relative h-screen overflow-hidden bg-background cinema-vignette"
    >
      {/* Animated Film Strip Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-[200%] h-full flex film-strip">
          {[...filmFrames, ...filmFrames].map((frame, index) => (
            <div
              key={`${frame.id}-${index}`}
              className="flex-shrink-0 w-20 h-full border-r border-white/10 relative"
            >
              <div className="absolute top-4 left-2 right-2 bottom-4 bg-white/5 rounded-sm">
                <img
                  src={frame.image || "/placeholder.svg"}
                  alt={`Film frame ${frame.id}`}
                  className="w-full h-full object-cover rounded-sm opacity-30"
                />
              </div>
              {/* Film perforations */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/10">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-full h-4 bg-background"
                    style={{ top: `${i * 12.5}%` }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Film Grain Texture */}
      <div className="absolute inset-0 film-grain opacity-30" />

      {/* Dynamic Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentFilm.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={currentFilm.backdrop || "/placeholder.svg"}
            alt={currentFilm.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div
            className={`absolute inset-0 bg-gradient-to-t ${currentFilm.color}`}
          />
        </motion.div>
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="space-y-8"
            >
              {/* Cinema Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="inline-flex items-center gap-2 bg-card backdrop-blur-xl border border-border px-4 py-2 rounded-full text-sm font-medium text-accent"
              >
                <Film className="w-4 h-4" />
                <span>Curating Cinema Since 2024</span>
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              </motion.div>

              {/* Main Title */}
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="text-6xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight"
                >
                  <span className="text-slate-200">The</span>
                  <br />
                  <span className="bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">
                    Cinéprism
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="text-xl md:text-2xl text-muted-foreground font-light tracking-wide max-w-lg"
                >
                  Where every frame tells a story, and every story shapes
                  cinema.
                </motion.p>
              </div>

              {/* Featured Film Info */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFilm.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8 }}
                  className="bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-6 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-foreground">
                        Featured Review
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Now Screening
                      </p>
                    </div>
                    <div className="flex items-center gap-1 bg-accent/20 px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 text-accent fill-current" />
                      <span className="text-sm font-semibold text-accent">
                        {currentFilm.rating}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-foreground mb-1">
                      {currentFilm.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Directed by {currentFilm.director} • {currentFilm.year} •{" "}
                      {currentFilm.genre}
                    </p>
                    <p className="text-sm text-foreground/80 italic">
                      "{currentFilm.tagline}"
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-primary/25 transition-all duration-300"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Explore Reviews
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="bg-card/50 hover:bg-card border-border hover:border-accent/50 text-foreground px-8 py-4 rounded-2xl font-semibold text-lg backdrop-blur-xl transition-all duration-300"
                >
                  <Award className="w-5 h-5 mr-2" />
                  Latest Articles
                </Button>
              </motion.div>

              {/* Film Strip Navigation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="flex items-center gap-2"
              >
                {featuredFilms.map((film, index) => (
                  <button
                    key={film.id}
                    onClick={() => setCurrentFrame(index)}
                    className={`w-12 h-8 rounded border-2 transition-all duration-300 ${
                      index === currentFrame
                        ? "border-accent bg-accent/20"
                        : "border-border bg-card/30 hover:border-accent/50"
                    }`}
                  >
                    <img
                      src={film.poster || "/placeholder.svg"}
                      alt={film.title}
                      className="w-full h-full object-cover rounded-sm opacity-60"
                    />
                  </button>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Content - Featured Poster */}
            <motion.div
              initial={{ opacity: 0, x: 50, rotateY: -15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="relative hidden lg:block"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFilm.id}
                  initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="relative"
                >
                  <div className="aspect-[2/3] w-80 mx-auto relative">
                    {/* Poster Shadow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-secondary/20 rounded-3xl blur-2xl transform translate-y-8 scale-105" />

                    {/* Poster Frame */}
                    <div className="relative bg-card/20 backdrop-blur-xl border border-border rounded-3xl p-4 shadow-2xl">
                      <img
                        src={currentFilm.poster || "/placeholder.svg"}
                        alt={currentFilm.title}
                        className="w-full h-full object-cover rounded-2xl"
                      />

                      {/* Film Strip Decoration */}
                      <div className="absolute -left-2 top-0 bottom-0 w-4 bg-gradient-to-b from-accent/30 to-secondary/30 rounded-l-lg">
                        {Array.from({ length: 12 }).map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-full h-4 bg-background/50"
                            style={{ top: `${i * 8.33}%` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
      >
        <p className="text-sm text-muted-foreground mb-2">Discover More</p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <ChevronDown className="w-6 h-6 text-accent mx-auto" />
        </motion.div>
      </motion.div>
    </section>
  );
}

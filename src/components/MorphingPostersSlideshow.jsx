import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Play } from "lucide-react";

// Your exact imports
import DuneImage from "../assets/Dune.jpg";
import InterstellarImage from "../assets/Interstellar.jpg";
import HowToLoseImage from "../assets/howtoloseaguys.jpg";
import OppenHeimerImage from "../assets/oppenheimer.jpg";
import OppenHeimerFireImage from "../assets/oppenheimerfire.jpg";
import FleabagImage2 from "../assets/fleebag2.jpg";
import PastLivesImage from "../assets/pastlives.jpg";
import SpiderManImage from "../assets/spiderman.jpg";
import BatmanImage from "../assets/batman.jpg";
import BladeRunnerImg from "../assets/bladerunner.jpg";
import DuneFanImage from "../assets/dunefan.jpg";
import SinnerImage from "../assets/sinners.jpg";
import TennetImage from "../assets/tennet.jpg";
import AliceImage from "../assets/alicedarling.jpg";
import DarkKnightImage from "../assets/darkknight.jpg";
import DunkKirkImage from "../assets/dunkirk.jpg";

export default function MorphingPosterSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Hero posters data with your imports
  const heroPosters = [
    {
      image: FleabagImage2,
      title: "Fleabag",
      subtitle: "Brilliant, Bold, and Brutally Honest",
      year: "2016",
      rating: 8.7,
      genre: "Drama/Comedy",
      director: "Phoebe Waller-Bridge",
      color: "from-rose-500/20 to-pink-600/20",
    },
    {
      image: DuneFanImage,
      title: "Dune: Part Two",
      subtitle: "Epic Sci-Fi Continuation",
      year: "2024",
      rating: 8.8,
      genre: "Sci-Fi",
      director: "Denis Villeneuve",
      color: "from-orange-500/20 to-amber-600/20",
    },
    {
      image: InterstellarImage,
      title: "Interstellar",
      subtitle: "Space Odyssey Masterpiece",
      year: "2014",
      rating: 8.6,
      genre: "Sci-Fi",
      director: "Christopher Nolan",
      color: "from-blue-500/20 to-indigo-600/20",
    },
    {
      image: OppenHeimerImage,
      title: "Oppenheimer",
      subtitle: "The Story of the Atomic Bomb",
      year: "2023",
      rating: 8.3,
      genre: "Biography/Drama",
      director: "Christopher Nolan",
      color: "from-red-500/20 to-orange-600/20",
    },
    {
      image: DarkKnightImage,
      title: "The Dark Knight",
      subtitle: "Batman's Greatest Challenge",
      year: "2008",
      rating: 9.0,
      genre: "Action/Crime",
      director: "Christopher Nolan",
      color: "from-gray-500/20 to-slate-600/20",
    },
    {
      image: BladeRunnerImg,
      title: "Blade Runner 2049",
      subtitle: "Neo-Noir Sci-Fi Masterpiece",
      year: "2017",
      rating: 8.0,
      genre: "Sci-Fi/Thriller",
      director: "Denis Villeneuve",
      color: "from-purple-500/20 to-violet-600/20",
    },
  ];

  // Auto-advance slides
  useEffect(() => {
    if (!isHovering) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroPosters.length);
      }, 7000);
      return () => clearInterval(interval);
    }
  }, [heroPosters.length, isHovering]);

  return (
    <section className="relative h-screen overflow-hidden pt-20 bg-slate-950">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* Dynamic Ambient Glow that changes with each slide */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`glow-${currentSlide}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 overflow-hidden"
        >
          <div
            className={`absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r ${heroPosters[currentSlide].color} rounded-full blur-3xl`}
          />
          <div
            className={`absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-l ${heroPosters[currentSlide].color} rounded-full blur-3xl`}
          />
        </motion.div>
      </AnimatePresence>

      {/* Main Content Container */}
      <div className="relative z-20 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Brand Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-center lg:text-left space-y-8"
            >
              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-5xl md:text-7xl lg:text-6xl xl:text-7xl font-black leading-none tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent"
              >
                The Cinéprism
              </motion.h1>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="text-xl md:text-2xl text-slate-300 tracking-wider leading-relaxed"
              >
                Good films make your life better.
              </motion.p>

              {/* Current Film Info */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`info-${currentSlide}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-2 justify-center lg:justify-start">
                    <span className="bg-white/10 backdrop-blur-xl text-emerald-400 px-4 py-2 rounded-2xl text-sm font-medium border border-white/10">
                      Now Featuring
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    {heroPosters[currentSlide].title}
                  </h3>

                  <p className="text-slate-400 text-lg">
                    {heroPosters[currentSlide].subtitle}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-slate-500 justify-center lg:justify-start">
                    <span>{heroPosters[currentSlide].year}</span>
                    <span>•</span>
                    <span>{heroPosters[currentSlide].genre}</span>
                    <span>•</span>
                    <span>{heroPosters[currentSlide].director}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Right Side - Morphing Poster */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="aspect-[3/4] relative rounded-3xl overflow-hidden shadow-2xl max-w-md mx-auto">
                {/* Morphing Poster Images with Ken Burns Effect */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`poster-${currentSlide}`}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{
                      opacity: 1,
                      scale: isHovering ? 1.05 : 1.02,
                    }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      opacity: { duration: 1.2 },
                      scale: { duration: 7, ease: "easeInOut" },
                    }}
                    className="absolute inset-0"
                  >
                    {/* Ken Burns Effect Container */}
                    <motion.div
                      animate={{
                        x: [0, -20, 0],
                        y: [0, -15, 0],
                        scale: [1.02, 1.08, 1.02],
                      }}
                      transition={{
                        duration: 12,
                        ease: "easeInOut",
                        repeat: Infinity,
                      }}
                      className="w-full h-full"
                    >
                      <img
                        src={heroPosters[currentSlide].image}
                        alt={heroPosters[currentSlide].title}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </motion.div>
                </AnimatePresence>

                {/* Elegant Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                {/* Rating Badge */}
                <motion.div
                  className="absolute top-6 right-6 z-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="flex items-center gap-1 bg-black/40 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/20">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white font-semibold text-sm">
                      {heroPosters[currentSlide].rating}
                    </span>
                  </div>
                </motion.div>

                {/* Play Button Overlay on Hover */}
                <AnimatePresence>
                  {isHovering && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm"
                    >
                      <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30 shadow-2xl">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bottom Film Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`overlay-${currentSlide}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className="space-y-2"
                    >
                      <h3 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight">
                        {heroPosters[currentSlide].title}
                      </h3>
                      <p className="text-slate-300 text-base leading-relaxed">
                        {heroPosters[currentSlide].subtitle}
                      </p>
                      <div className="flex items-center gap-3 text-sm text-slate-400 pt-2">
                        <span>{heroPosters[currentSlide].year}</span>
                        <span>•</span>
                        <span>{heroPosters[currentSlide].genre}</span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Slide Indicators */}
              <div className="flex justify-center gap-3 mt-8">
                {heroPosters.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className="group relative"
                  >
                    <div
                      className={`w-2 h-2 rounded-full transition-all duration-500 ${
                        index === currentSlide
                          ? "bg-emerald-400 scale-125"
                          : "bg-white/30 hover:bg-white/50"
                      }`}
                    />
                    {index === currentSlide && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute -inset-2 rounded-full border border-emerald-400/50"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-emerald-400 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 7,
              ease: "linear",
              repeat: Infinity,
            }}
            key={currentSlide}
          />
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-5">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 6 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </section>
  );
}

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Film,
  Play,
  Eye,
  MessageCircle,
  Heart,
  ArrowRight,
} from "lucide-react";

const MobileHeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sample data - replace with your actual heroPosters
  const heroPosters = [
    {
      image: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
      title: "Fleabag",
      subtitle: "Brilliant, Bold, and Brutally Honest",
      year: "2016",
      rating: 8.7,
      genre: "Drama/Comedy",
    },
    {
      image: "https://image.tmdb.org/t/p/w500/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
      title: "Dune: Part Two",
      subtitle: "Epic Sci-Fi Continuation",
      year: "2024",
      rating: 8.8,
      genre: "Sci-Fi",
    },
    {
      image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      title: "Interstellar",
      subtitle: "Space Odyssey Masterpiece",
      year: "2014",
      rating: 8.6,
      genre: "Sci-Fi",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroPosters.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroPosters.length]);

  return (
    <section className="relative min-h-screen bg-slate-950 text-white overflow-hidden md:hidden">
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Ambient glow effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-slate-200/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 pt-20 px-6 h-screen flex flex-col">
        {/* Main Headline - Taking inspiration from the image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12 pt-8"
        >
          <h1 className="text-4xl sm:text-5xl font-light leading-[1.1] tracking-tight mb-6">
            <span className="block text-slate-100 font-extralight mb-2">
              Exploring Cinema
            </span>
            <span className="block bg-gradient-to-r from-slate-100 via-white to-slate-200 bg-clip-text text-transparent font-normal">
              Beyond the Screen
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto mb-8"
          >
            Reviews, interviews, archives, and the art of storytelling — curated
            for cinephiles.
          </motion.p>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-slate-200 text-slate-950 px-6 py-3 rounded-2xl font-medium hover:bg-white transition-all duration-300 flex items-center gap-2 mx-auto text-sm"
          >
            <span>Start Exploring</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>

        {/* Three Column Layout - Inspired by the image structure */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex-1 flex flex-col justify-center"
        >
          {/* Featured Film */}
          <div className="text-center mb-8">
            <div className="relative w-48 h-72 mx-auto rounded-2xl overflow-hidden shadow-2xl mb-4">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSlide}
                  src={heroPosters[currentSlide].image}
                  alt={heroPosters[currentSlide].title}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6 }}
                />
              </AnimatePresence>

              {/* Rating Badge */}
              <div className="absolute top-3 right-3">
                <div className="flex items-center gap-1 bg-black/50 backdrop-blur-xl px-2 py-1 rounded-lg border border-white/10">
                  <Star className="w-3 h-3 text-slate-200 fill-current" />
                  <span className="text-white font-semibold text-xs">
                    {heroPosters[currentSlide].rating}
                  </span>
                </div>
              </div>

              {/* Film info overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-center">
                <motion.h2
                  key={`title-${currentSlide}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-lg font-bold mb-1"
                >
                  {heroPosters[currentSlide].title}
                </motion.h2>
                <motion.p
                  key={`year-${currentSlide}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="text-slate-300 text-xs"
                >
                  {heroPosters[currentSlide].year} •{" "}
                  {heroPosters[currentSlide].genre}
                </motion.p>
              </div>
            </div>

            {/* Film Navigation */}
            <div className="flex items-center justify-center gap-2 mb-6">
              {heroPosters.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "bg-slate-200" : "bg-slate-600/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Three Sections - Inspired by the image layout */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="grid grid-cols-3 gap-4"
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-slate-800/30 border border-slate-700/30 flex items-center justify-center">
                <Eye className="w-6 h-6 text-slate-300" />
              </div>
              <h3 className="text-sm font-semibold text-slate-200 mb-1">
                Reviews
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                In-depth analysis of films from classics to new releases.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-slate-800/30 border border-slate-700/30 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-slate-300" />
              </div>
              <h3 className="text-sm font-semibold text-slate-200 mb-1">
                Interviews
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Conversations with filmmakers, actors, and industry voices.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-slate-800/30 border border-slate-700/30 flex items-center justify-center">
                <Film className="w-6 h-6 text-slate-300" />
              </div>
              <h3 className="text-sm font-semibold text-slate-200 mb-1">
                Archives
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Preserving the history of cinema through rare insights
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MobileHeroSection;

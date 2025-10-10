"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OptimizedImage from "./OptimizedImage";
import imiGame from "../assets/imigame.jpg";
import whiImage from "../assets/whiimage.jpg";
import theoryImage from "../assets/theory.jpg";
import duneImage from "../assets/Dune.jpg";

// Movie data matching the reference images
const heroMovies = [
  {
    id: "m3",
    title: "Whiplash",
    year: 2014,
    duration: "1h 46m",
    overview:
      "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential.",
    imdb: 8.5,
    cast: ["Miles Teller", "J.K. Simmons"],
    posterUrl: whiImage,
  },
  {
    id: "m1",
    title: "The Imitation Game",
    year: 2014,
    duration: "1h 54m",
    overview:
      "During World War II, the English mathematical genius Alan Turing tries to crack the German Enigma code with help from fellow mathematicians while attempting to solve the puzzle of his complicated private life.",
    imdb: 8.0,
    cast: ["Benedict Cumberbatch", "Keira Knightley"],
    posterUrl: imiGame,
  },
  {
    id: "m2",
    title: "The Theory of Everything",
    year: 2014,
    duration: "2h 3m",
    overview:
      "Stephen Hawking gets unprecedented access to he and his ex-wife Jane's private archive, and with her blessing this is their remarkable story.",
    imdb: 7.7,
    cast: ["Eddie Redmayne", "Felicity Jones"],
    posterUrl: theoryImage,
  },
  {
    id: "m5",
    title: "Dune",
    year: 2021,
    duration: "2h 35m",
    overview:
      "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people.",
    imdb: 8.0,
    cast: [
      "Timothée Chalamet",
      "Rebecca Ferguson",
      "Oscar Isaac",
      "Josh Brolin",
      "Stellan Skarsgård",
      "Zendaya",
    ],
    posterUrl: duneImage,
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      duration: 0.6,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
      duration: 0.4,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: "blur(4px)",
    transition: {
      duration: 0.4,
    },
  },
};

const backgroundVariants = {
  hidden: {
    opacity: 0,
    scale: 1.1,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    filter: "blur(4px)",
    transition: {
      duration: 0.6,
    },
  },
};

const carouselItemVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function HeroMoviesHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoRef = useRef(null);

  const featured = heroMovies[activeIndex];
  const carouselItems = useMemo(() => {
    return heroMovies.filter((_, idx) => idx !== activeIndex);
  }, [activeIndex]);

  // Auto-advance functionality
  useEffect(() => {
    autoRef.current = setInterval(() => {
      if (!isTransitioning) {
        setActiveIndex((prev) => (prev + 1) % heroMovies.length);
      }
    }, 10000);
    return () => clearInterval(autoRef.current);
  }, [isTransitioning]);

  const changeSlide = (newIndex) => {
    if (isTransitioning || newIndex === activeIndex) return;

    setIsTransitioning(true);
    if (autoRef.current) clearInterval(autoRef.current);

    setTimeout(() => {
      setActiveIndex(newIndex);
      setIsTransitioning(false);
    }, 600);
  };

  const goNext = () => {
    const nextIndex = (activeIndex + 1) % heroMovies.length;
    changeSlide(nextIndex);
  };

  const goPrev = () => {
    const prevIndex = (activeIndex - 1 + heroMovies.length) % heroMovies.length;
    changeSlide(prevIndex);
  };

  return (
    <section className="relative min-h-screen w-full bg-slate-950 text-white overflow-hidden">
      {/* Background Image with AnimatePresence */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${featured.id}-${activeIndex}`}
            className="w-full h-full"
            variants={backgroundVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <OptimizedImage
              src={featured.posterUrl || "/placeholder.svg"}
              alt={featured.title}
              className="w-full h-full object-cover"
              priority={true}
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col justify-center min-h-screen">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="max-w-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`content-${activeIndex}`}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {/* Title */}
                    <motion.h1
                      variants={itemVariants}
                      className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4"
                    >
                      {featured.title.toUpperCase()}
                    </motion.h1>

                    {/* Meta Information */}
                    <motion.div
                      variants={itemVariants}
                      className="flex items-center space-x-4 text-white/90 mb-6"
                    >
                      <span>{featured.year}</span>
                      <span>•</span>
                      <span>{featured.duration}</span>
                    </motion.div>

                    {/* Overview */}
                    <motion.p
                      variants={itemVariants}
                      className="text-white/80 text-lg leading-relaxed mb-8 max-w-lg"
                    >
                      {featured.overview}
                    </motion.p>

                    {/* Rating */}
                    <motion.div variants={itemVariants} className="mb-8">
                      <span className="text-white/60 text-sm">IMDB </span>
                      <span className="text-white font-semibold">
                        {featured.imdb}
                      </span>
                    </motion.div>

                    {/* Cast */}
                    <motion.div variants={itemVariants} className="mb-8">
                      <div className="flex flex-wrap gap-4">
                        {featured.cast.map((actor, index) => (
                          <motion.span
                            key={index}
                            className="text-white/80 underline decoration-white/40 underline-offset-4 hover:text-white cursor-pointer transition-colors duration-300"
                            whileHover={{
                              scale: 1.05,
                              transition: { duration: 0.2 },
                            }}
                          >
                            {actor}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>

                    {/* Website Motto */}
                    <motion.div
                      variants={itemVariants}
                      className="flex items-center gap-3"
                    >
                      <motion.div
                        className="w-8 h-px bg-white/40"
                        initial={{ width: 0 }}
                        animate={{ width: 32 }}
                        transition={{ delay: 2, duration: 0.8 }}
                      />
                      <span className="text-white/70 text-sm italic tracking-wide">
                        Cinema for acquired taste.
                      </span>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right Side - Carousel (Desktop Only) */}
            <div className="hidden lg:block absolute z-20 right-12 bottom-12 pointer-events-auto">
              {/* "More to Explore" Label */}
              <motion.div
                className="text-right mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.6 }}
              >
                <span className="text-white/60 text-xs tracking-wider uppercase">
                  MORE TO EXPLORE
                </span>
              </motion.div>

              {/* Navigation + Posters */}
              <motion.div
                className="flex items-end space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.8 }}
              >
                {/* Previous Button */}
                <motion.button
                  onClick={goPrev}
                  className="w-10 h-10 rounded-full bg-black/40 border border-white/30 flex items-center justify-center hover:bg-black/60 transition-all duration-300"
                  aria-label="Previous"
                  disabled={isTransitioning}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(0,0,0,0.7)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L8.414 10l4.293 4.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">Previous</span>
                </motion.button>

                {/* Movie Posters */}
                <div className="flex items-end">
                  <AnimatePresence mode="wait">
                    {carouselItems.map((movie, index) => (
                      <motion.div
                        key={movie.id}
                        className={`relative cursor-pointer ${
                          index > 0 ? "-ml-12" : ""
                        }`}
                        variants={carouselItemVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={{ delay: index * 0.1 }}
                        onClick={() =>
                          changeSlide(
                            heroMovies.findIndex((m) => m.id === movie.id)
                          )
                        }
                        whileHover={{
                          scale: 1.05,
                          zIndex: 10,
                          transition: { duration: 0.3 },
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="w-36 h-52 rounded overflow-hidden shadow-2xl ring-1 ring-white/20">
                          <img
                            src={movie.posterUrl || "/placeholder.svg"}
                            alt={movie.title}
                            className="w-full h-full object-cover"
                          />
                          {/* Title Overlay */}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3">
                            <p className="text-white text-xs font-semibold uppercase">
                              {movie.title}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Next Button */}
                <motion.button
                  onClick={goNext}
                  className="w-10 h-10 rounded-full bg-black/40 border border-white/30 flex items-center justify-center hover:bg-black/60 transition-all duration-300"
                  aria-label="Next"
                  disabled={isTransitioning}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(0,0,0,0.7)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L11.586 10 7.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">Next</span>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Mobile Carousel */}
        <motion.div
          className="lg:hidden mt-12 px-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <div className="mb-4">
            <span className="text-white/60 text-xs tracking-wider uppercase">
              MORE TO EXPLORE
            </span>
          </div>
          <div className="flex space-x-4 overflow-x-auto pb-4 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {carouselItems.map((movie, index) => (
              <motion.div
                key={movie.id}
                className="flex-none w-28 h-40 rounded-lg overflow-hidden cursor-pointer backdrop-blur-sm bg-white/10 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.2 + index * 0.1, duration: 0.6 }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255,255,255,0.15)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  changeSlide(heroMovies.findIndex((m) => m.id === movie.id))
                }
              >
                <img
                  src={movie.posterUrl || "/placeholder.svg"}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-2 backdrop-blur-sm">
                  <p className="text-white text-xs font-semibold uppercase drop-shadow-lg">
                    {movie.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

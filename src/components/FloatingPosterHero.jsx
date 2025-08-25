import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Play, X } from "lucide-react";

// Your exact imports from the code
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

export default function FloatingPosterHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredPoster, setHoveredPoster] = useState(null);
  const [selectedPoster, setSelectedPoster] = useState(null);
  const containerRef = useRef(null);

  // Enhanced floating posters data with movie details
  const floatingPosters = [
    {
      id: 1,
      image: DuneImage,
      title: "Dune",
      subtitle: "Epic Sci-Fi Saga",
      year: "2021",
      rating: 8.0,
      genre: "Sci-Fi",
      x: 15,
      y: 20,
      scale: 0.9,
      rotation: -5,
      zIndex: 12,
      parallaxSpeed: 0.3,
    },
    {
      id: 2,
      image: InterstellarImage,
      title: "Interstellar",
      subtitle: "Space Odyssey Masterpiece",
      year: "2014",
      rating: 8.6,
      genre: "Sci-Fi",
      x: 70,
      y: 15,
      scale: 1.0,
      rotation: 8,
      zIndex: 14,
      parallaxSpeed: 0.5,
    },
    {
      id: 3,
      image: OppenHeimerImage,
      title: "Oppenheimer",
      subtitle: "The Story of the Atomic Bomb",
      year: "2023",
      rating: 8.3,
      genre: "Biography",
      x: 25,
      y: 60,
      scale: 0.85,
      rotation: -12,
      zIndex: 10,
      parallaxSpeed: 0.2,
    },
    {
      id: 4,
      image: FleabagImage2,
      title: "Fleabag",
      subtitle: "Brilliant, Bold, and Brutally Honest",
      year: "2016",
      rating: 8.7,
      genre: "Comedy",
      x: 80,
      y: 65,
      scale: 0.9,
      rotation: 15,
      zIndex: 13,
      parallaxSpeed: 0.4,
    },
    {
      id: 5,
      image: DarkKnightImage,
      title: "The Dark Knight",
      subtitle: "Batman's Greatest Challenge",
      year: "2008",
      rating: 9.0,
      genre: "Action",
      x: 10,
      y: 45,
      scale: 0.8,
      rotation: -8,
      zIndex: 9,
      parallaxSpeed: 0.6,
    },
    {
      id: 6,
      image: BladeRunnerImg,
      title: "Blade Runner 2049",
      subtitle: "Neo-Noir Sci-Fi Masterpiece",
      year: "2017",
      rating: 8.0,
      genre: "Sci-Fi",
      x: 75,
      y: 40,
      scale: 0.85,
      rotation: 10,
      zIndex: 11,
      parallaxSpeed: 0.35,
    },
    {
      id: 7,
      image: PastLivesImage,
      title: "Past Lives",
      subtitle: "A Heartbreaking Reunion",
      year: "2023",
      rating: 7.8,
      genre: "Drama",
      x: 45,
      y: 25,
      scale: 0.75,
      rotation: -3,
      zIndex: 8,
      parallaxSpeed: 0.25,
    },
    {
      id: 8,
      image: TennetImage,
      title: "Tenet",
      subtitle: "Time Inversion Thriller",
      year: "2020",
      rating: 7.3,
      genre: "Action",
      x: 85,
      y: 80,
      scale: 0.8,
      rotation: -18,
      zIndex: 10,
      parallaxSpeed: 0.45,
    },
    {
      id: 9,
      image: SpiderManImage,
      title: "Spider-Man",
      subtitle: "Your Friendly Neighborhood Hero",
      year: "2021",
      rating: 8.4,
      genre: "Action",
      x: 35,
      y: 80,
      scale: 0.7,
      rotation: 12,
      zIndex: 7,
      parallaxSpeed: 0.3,
    },
    {
      id: 10,
      image: AliceImage,
      title: "Alice Darling",
      subtitle: "Psychological Drama",
      year: "2022",
      rating: 6.8,
      genre: "Drama",
      x: 60,
      y: 70,
      scale: 0.75,
      rotation: -6,
      zIndex: 9,
      parallaxSpeed: 0.4,
    },
    {
      id: 11,
      image: DunkKirkImage,
      title: "Dunkirk",
      subtitle: "War Epic",
      year: "2017",
      rating: 7.8,
      genre: "War",
      x: 5,
      y: 75,
      scale: 0.7,
      rotation: -15,
      zIndex: 8,
      parallaxSpeed: 0.35,
    },
    {
      id: 12,
      image: SinnerImage,
      title: "The Sinner",
      subtitle: "Dark Psychological Thriller",
      year: "2017",
      rating: 7.9,
      genre: "Thriller",
      x: 90,
      y: 25,
      scale: 0.75,
      rotation: 20,
      zIndex: 9,
      parallaxSpeed: 0.25,
    },
  ];

  // Mouse tracking for parallax effect
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

  return (
    <section
      ref={containerRef}
      className="relative h-screen overflow-hidden pt-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* Ambient Glow Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-purple-500/3 rounded-full blur-3xl" />
      </div>

      {/* Floating Movie Posters Background */}
      <div className="absolute inset-0 z-20">
        {floatingPosters.map((poster) => (
          <motion.div
            key={poster.id}
            className="absolute cursor-pointer select-none"
            style={{
              left: `${poster.x}%`,
              top: `${poster.y}%`,
              zIndex: selectedPoster
                ? selectedPoster.id === poster.id
                  ? 100
                  : 1
                : poster.zIndex,
              pointerEvents: "auto",
            }}
            initial={{
              opacity: 0,
              scale: 0,
              rotate: poster.rotation,
            }}
            animate={{
              opacity: selectedPoster
                ? selectedPoster.id === poster.id
                  ? 0
                  : 0.4 + poster.zIndex / 40
                : 0.4 + poster.zIndex / 40,
              scale: selectedPoster
                ? selectedPoster.id === poster.id
                  ? 0
                  : poster.scale
                : poster.scale,
              rotate: poster.rotation,
              x: mousePosition.x * poster.parallaxSpeed * 25,
              y: mousePosition.y * poster.parallaxSpeed * 20,
            }}
            transition={{
              duration: 1.5,
              delay: poster.id * 0.15,
              type: "spring",
              stiffness: 80,
              damping: 25,
            }}
            whileHover={{
              scale: poster.scale * 1.2,
              opacity: 0.85,
              rotate: poster.rotation + 3,
              zIndex: 50,
              transition: { duration: 0.4 },
            }}
            onHoverStart={() => setHoveredPoster(poster.id)}
            onHoverEnd={() => setHoveredPoster(null)}
            onTap={() => {
              console.log("Clicked poster:", poster.title);
              setSelectedPoster(poster);
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log("Clicked poster:", poster.title);
              setSelectedPoster(poster);
            }}
          >
            <motion.div
              className="aspect-[2/3] w-28 md:w-36 lg:w-44 relative rounded-xl overflow-hidden shadow-2xl border border-white/10"
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                duration: 4 + poster.id * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <img
                src={poster.image}
                alt={poster.title}
                className="w-full h-full object-cover transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

              {/* Hover overlay with title */}
              <AnimatePresence>
                {hoveredPoster === poster.id && !selectedPoster && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center"
                  >
                    <div className="text-center text-white">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 shadow-lg mb-2 mx-auto"
                      >
                        <Play className="w-5 h-5 text-white ml-1" />
                      </motion.div>
                      <p className="text-xs font-semibold">{poster.title}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Selected Poster Pop-up Modal */}
      <AnimatePresence>
        {selectedPoster && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl"
            onClick={() => setSelectedPoster(null)}
          >
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotateY: -15 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotateY: 15 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                opacity: { duration: 0.3 },
              }}
              className="relative max-w-md mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPoster(null)}
                className="absolute -top-4 -right-4 z-10 w-10 h-10 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Poster Card */}
              <div className="aspect-[2/3] relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={selectedPoster.image}
                  alt={selectedPoster.title}
                  className="w-full h-full object-cover"
                />

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="flex items-center gap-1 bg-black/60 backdrop-blur-xl px-3 py-2 rounded-2xl border border-white/20">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white font-semibold text-sm">
                      {selectedPoster.rating}
                    </span>
                  </div>
                </div>

                {/* Information Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl font-bold mb-2 tracking-tight"
                  >
                    {selectedPoster.title}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-slate-300 mb-3 leading-relaxed"
                  >
                    {selectedPoster.subtitle}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-3 text-sm text-slate-400"
                  >
                    <span>{selectedPoster.year}</span>
                    <span>•</span>
                    <span>{selectedPoster.genre}</span>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex gap-3 mt-4"
                  >
                    <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-xl transition-all duration-300 text-sm">
                      Read Review
                    </button>
                    <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 backdrop-blur-xl transition-all duration-300 text-sm">
                      Watch Trailer
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dark overlay to ensure text readability */}
      <motion.div
        className="absolute inset-0 bg-slate-950/50 z-10"
        animate={{ opacity: selectedPoster ? 0.2 : 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Hero Content */}
      <motion.div
        className="relative z-30 h-full flex items-center pointer-events-none"
        animate={{ opacity: selectedPoster ? 0.3 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="text-center space-y-8">
            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent"
            >
              The Cinéprism
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-xl md:text-2xl text-slate-300 tracking-wider max-w-2xl mx-auto"
            >
              Good films make your life better.
            </motion.p>

            {/* Featured Film Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="inline-block"
            >
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl text-emerald-400 px-6 py-3 rounded-2xl text-sm font-medium border border-white/20 shadow-xl">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                Curating Cinema Since 2024
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 pointer-events-auto"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-emerald-500/25"
              >
                Explore Reviews
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-2xl border border-white/20 backdrop-blur-xl transition-all duration-300"
              >
                Latest Articles
              </motion.button>
            </motion.div>

            {/* Instruction Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="text-sm text-slate-500 mt-8"
            >
              Click on any poster to explore
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Floating particles for extra ambiance */}
      <div className="absolute inset-0 z-5">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </section>
  );
}

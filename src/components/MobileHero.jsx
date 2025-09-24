"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Film, Eye, MessageCircle, ArrowRight } from "lucide-react";
import OppenHeimerImage from "../assets/oppenheimer.jpg";
import FleabagImage2 from "../assets/fleebag2.jpg";
import PastLivesImage from "../assets/pastlives.jpg";
import DuneFanImage from "../assets/dunefan.jpg";
import SinnerImage from "../assets/sinners.jpg";
import TennetImage from "../assets/tennet.jpg";
import AliceImage from "../assets/alicedarling.jpg";
import DarkKnightImage from "../assets/darkknight.jpg";
import DunkKirkImage from "../assets/dunkirk.jpg";

const MobileHeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hero posters data
  const heroPosters = [
    {
      id: 1,
      title: "Fleabag",
      subtitle: "Phoebe Waller-Bridge's Masterpiece",
      image: FleabagImage2,
      year: "2016",
      rating: 8.7,
      genre: "Drama/Comedy",
    },
    {
      id: 2,
      title: "Dune: Part Two",
      subtitle: "The Sci-Fi Epic Continues",
      image: DuneFanImage,
      year: "2024",
      rating: 8.8,
      genre: "Sci-Fi",
    },
    {
      id: 3,
      title: "Alice Darling",
      subtitle: "A Haunting Psychological Drama",
      image: AliceImage,
      year: "2022",
      rating: 7.2,
      genre: "Drama/Thriller",
    },
    {
      id: 4,
      title: "Past Lives",
      subtitle: "A Heartbreaking Reunion",
      image: PastLivesImage,
      year: "2023",
      rating: 8.4,
      genre: "Drama/Romance",
    },
    {
      id: 5,
      title: "Sinners",
      subtitle: "Dark Crime Thriller",
      image: SinnerImage,
      year: "2024",
      rating: 7.8,
      genre: "Crime/Thriller",
    },
    {
      id: 6,
      title: "Dark Knight",
      subtitle: "Batman's Greatest Challenge",
      image: DarkKnightImage,
      year: "2008",
      rating: 9.0,
      genre: "Action/Crime",
    },
    {
      id: 7,
      title: "Dunkirk",
      subtitle: "War Epic Masterpiece",
      image: DunkKirkImage,
      year: "2017",
      rating: 7.8,
      genre: "War/Drama",
    },
    {
      id: 8,
      title: "Parasite",
      subtitle: "Bong Joon-ho's Masterwork",
      image: "https://image.tmdb.org/t/p/w342/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
      year: "2019",
      rating: 8.6,
      genre: "Thriller/Drama",
    },
    {
      id: 9,
      title: "Interstellar",
      subtitle: "Space Odyssey Reimagined",
      image: "https://image.tmdb.org/t/p/w342/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      year: "2014",
      rating: 8.6,
      genre: "Sci-Fi/Drama",
    },
    {
      id: 10,
      title: "Tenet",
      subtitle: "Time Inversion Thriller",
      image: TennetImage,
      year: "2020",
      rating: 7.3,
      genre: "Action/Sci-Fi",
    },
    {
      id: 11,
      title: "Everything Everywhere All at Once",
      subtitle: "Multiverse Adventure",
      image: "https://image.tmdb.org/t/p/w342/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",
      year: "2022",
      rating: 7.8,
      genre: "Action/Comedy",
    },
    {
      id: 12,
      title: "Oppenheimer",
      subtitle: "Nolan's Atomic Masterpiece",
      image: OppenHeimerImage,
      year: "2023",
      rating: 8.3,
      genre: "Biography/Drama",
    },
  ];

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(
        (prev) => (prev + 1) % Math.max(1, heroPosters.length - 2)
      );
    }, 6000);
    return () => clearInterval(interval);
  }, [heroPosters.length]);

  // Get visible posters for carousel (3 at a time)
  const getVisiblePosters = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentSlide + i) % heroPosters.length;
      visible.push({ ...heroPosters[index], slideIndex: index });
    }
    return visible;
  };

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

      <section className="relative min-h-[100dvh] bg-slate-950 text-white overflow-hidden">
        {/* Background with subtle pattern */}
        <div className="absolute inset-0 opacity-5 pt-12">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:50px_50px] md:bg-[size:60px_60px]" />
        </div>

        {/* Ambient glow effects - Responsive sizing */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-48 sm:w-64 md:w-80 h-48 sm:h-64 md:h-80 bg-white/3 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-64 md:w-80 h-48 sm:h-64 md:h-80 bg-slate-200/3 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 pt-24 sm:pt-20 md:pt-24 px-4 sm:px-6 md:px-8 min-h-[100dvh] flex flex-col">
          {/* Featured Film Carousel - Now at the top with bigger posters */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-shrink-0 mb-8 sm:mb-12 md:mb-16"
          >
            <div className="text-center">
              <div className="flex justify-center items-center gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 px-2">
                {getVisiblePosters().map((poster, index) => (
                  <motion.div
                    key={`${poster.slideIndex}-${currentSlide}`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                      scale: index === 1 ? 1.1 : 0.95,
                      opacity: index === 1 ? 1 : 0.7,
                    }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    className={`relative rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 ease-in-out border border-slate-700/20 ${
                      index === 1
                        ? "w-36 sm:w-48 md:w-56 lg:w-64 h-48 sm:h-64 md:h-80 lg:h-88 z-20" // Center (featured) - much larger
                        : "w-28 sm:w-36 md:w-44 lg:w-52 h-36 sm:h-48 md:h-60 lg:h-72 z-10" // Sides - larger
                    }`}
                  >
                    <img
                      src={poster.image || "/placeholder.svg"}
                      alt={poster.title}
                      className="w-full h-full object-cover transition-all duration-700"
                      loading="lazy"
                    />

                    {/* Enhanced film info overlay - only on center film */}
                    {index === 1 && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 text-white">
                          <div className="text-center">
                            <div className="inline-block px-2 py-1 bg-slate-200/20 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium mb-2 border border-slate-300/20">
                              {poster.genre}
                            </div>
                            <h2 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold mb-1 sm:mb-2">
                              {poster.title}
                            </h2>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Subtle glow effect for center poster */}
                    {index === 1 && (
                      <div className="absolute -inset-1 bg-gradient-to-r from-slate-400/20 via-white/10 to-slate-400/20 rounded-xl sm:rounded-2xl md:rounded-3xl blur-sm -z-10" />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Enhanced Film Navigation */}
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                {Array.from({
                  length: Math.max(1, heroPosters.length - 2),
                }).map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    whileHover={{ scale: 1.4 }}
                    whileTap={{ scale: 0.8 }}
                    className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "bg-slate-200 shadow-lg shadow-slate-200/50 scale-125"
                        : "bg-slate-600/50 hover:bg-slate-500/70"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mb-8 sm:mb-12 md:mb-16 flex-shrink-0"
          >
            <h1 className="leading-[1.1] tracking-tight mb-4 sm:mb-6 md:mb-8">
              <span className="block text-slate-100 font-extralight mb-1 sm:mb-2 hero-title-small">
                Cinema for
              </span>
              <span className="block bg-gradient-to-r from-slate-100 via-white to-slate-200 bg-clip-text text-transparent font-normal hero-title-large">
                Acquired Taste
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto mb-6 sm:mb-8 md:mb-10"
            >
              Deep dives, critical essays, and curated collections that
              celebrate the art of film. A dedicated space for cinephiles who
              find beauty in the details and meaning beyond the mainstream.
            </motion.p>

            {/* Enhanced CTA Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-slate-200 text-slate-950 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-xl sm:rounded-2xl font-semibold hover:bg-white transition-all duration-300 flex items-center gap-2 mx-auto text-sm sm:text-base md:text-lg shadow-xl hover:shadow-2xl group"
            >
              <span>Start Exploring</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 px-2 sm:px-4 md:px-6 max-w-5xl mx-auto pb-8 sm:pb-12 md:pb-16 flex-shrink-0"
          >
            {/* Reviews Section */}
            <motion.div
              className="text-center group cursor-pointer"
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-16 sm:w-20 md:w-24 lg:w-28 h-16 sm:h-20 md:h-24 lg:h-28 mx-auto mb-3 sm:mb-4 md:mb-6 rounded-xl sm:rounded-2xl md:rounded-3xl bg-slate-800/40 border border-slate-700/40 flex items-center justify-center group-hover:bg-slate-700/50 group-hover:border-slate-600/50 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                <Eye className="w-6 sm:w-8 md:w-10 lg:w-12 h-6 sm:h-8 md:h-10 lg:h-12 text-slate-300 group-hover:text-slate-200 transition-colors duration-300" />
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-slate-200 mb-2 sm:mb-3 md:mb-4">
                Reviews
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-slate-400 leading-relaxed">
                In-depth analysis of films from classics to new releases.
              </p>
            </motion.div>

            {/* Interviews Section */}
            <motion.div
              className="text-center group cursor-pointer"
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-16 sm:w-20 md:w-24 lg:w-28 h-16 sm:h-20 md:h-24 lg:h-28 mx-auto mb-3 sm:mb-4 md:mb-6 rounded-xl sm:rounded-2xl md:rounded-3xl bg-slate-800/40 border border-slate-700/40 flex items-center justify-center group-hover:bg-slate-700/50 group-hover:border-slate-600/50 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                <MessageCircle className="w-6 sm:w-8 md:w-10 lg:w-12 h-6 sm:h-8 md:h-10 lg:h-12 text-slate-300 group-hover:text-slate-200 transition-colors duration-300" />
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-slate-200 mb-2 sm:mb-3 md:mb-4">
                Interviews
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-slate-400 leading-relaxed">
                Conversations with filmmakers, actors, and industry voices.
              </p>
            </motion.div>

            {/* Archives Section */}
            <motion.div
              className="text-center group cursor-pointer"
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-16 sm:w-20 md:w-24 lg:w-28 h-16 sm:h-20 md:h-24 lg:h-28 mx-auto mb-3 sm:mb-4 md:mb-6 rounded-xl sm:rounded-2xl md:rounded-3xl bg-slate-800/40 border border-slate-700/40 flex items-center justify-center group-hover:bg-slate-700/50 group-hover:border-slate-600/50 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                <Film className="w-6 sm:w-8 md:w-10 lg:w-12 h-6 sm:h-8 md:h-10 lg:h-12 text-slate-300 group-hover:text-slate-200 transition-colors duration-300" />
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-slate-200 mb-2 sm:mb-3 md:mb-4">
                Archives
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-slate-400 leading-relaxed">
                Preserving the history of cinema through rare insights.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default MobileHeroSection;

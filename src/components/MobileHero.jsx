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

  // Auto-slide effect for horizontal carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(
        (prev) => (prev + 1) % (heroPosters.length - 3)
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [heroPosters.length]);

  // Custom scrollbar hide styles
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

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
            className="flex-shrink-0 mb-8 sm:mb-12 md:mb-16 h-[36vh] sm:h-[40vh] md:h-[42vh]"
          >
            <div className="h-full relative">
              {/* Horizontal Scrolling Container */}
              <div className="h-full overflow-x-auto overflow-y-hidden scrollbar-hide relative">
                <div
                  className="flex gap-4 sm:gap-6 md:gap-8 h-full transition-transform duration-700 ease-in-out px-4 sm:px-8"
                  style={{
                    transform: `translateX(-${currentSlide * 20}%)`,
                    width: `${heroPosters.length * 20}%`
                  }}
                >
                  {heroPosters.map((poster, index) => (
                    <motion.div
                      key={poster.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="relative flex-shrink-0 w-32 sm:w-40 md:w-44 lg:w-48 aspect-[2/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-slate-700/20 group cursor-pointer"
                      whileHover={{ scale: 1.05, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={poster.image || "/placeholder.svg"}
                        alt={poster.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />

                      {/* Glow effect on hover */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-slate-400/20 via-white/10 to-slate-400/20 rounded-2xl sm:rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Fade edges */}
              <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />
            </div>
          </motion.div>

          {/* Hero Content Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mb-12 sm:mb-16 md:mb-20 flex-shrink-0 px-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative"
            >
              <h1 className="leading-[0.9] tracking-tight mb-6 sm:mb-8 md:mb-10">
                <span className="block text-slate-100 font-light mb-2 sm:mb-3 hero-title-small">
                  Cinema for
                </span>
                <span className="block bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent font-bold hero-title-large">
                  Acquired Taste
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-slate-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-lg mx-auto mb-8 sm:mb-10 md:mb-12 font-light"
              >
                Deep dives, critical essays, and curated collections that celebrate the art of film.
              </motion.p>

              {/* Enhanced CTA Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="group relative bg-white text-slate-950 px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 rounded-2xl font-semibold hover:bg-slate-100 transition-all duration-300 flex items-center gap-3 mx-auto text-base sm:text-lg md:text-xl shadow-2xl hover:shadow-white/20 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white via-slate-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">Start Exploring</span>
                <ArrowRight className="relative z-10 w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Feature Cards Section - Redesigned */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="px-4 sm:px-6 md:px-8 max-w-4xl mx-auto pb-12 sm:pb-16 md:pb-20 flex-shrink-0"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              {/* Reviews Section */}
              <motion.div
                className="group cursor-pointer"
                whileHover={{ y: -12, scale: 1.03 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className="relative bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-3xl p-6 sm:p-8 h-full overflow-hidden group-hover:border-slate-600/50 transition-all duration-500">
                  {/* Background glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10 text-center">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Eye className="w-10 h-10 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-emerald-300 transition-colors duration-300">
                      Reviews
                    </h3>
                    <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                      In-depth analysis of films from classics to new releases
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Interviews Section */}
              <motion.div
                className="group cursor-pointer"
                whileHover={{ y: -12, scale: 1.03 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className="relative bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-3xl p-6 sm:p-8 h-full overflow-hidden group-hover:border-slate-600/50 transition-all duration-500">
                  {/* Background glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10 text-center">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <MessageCircle className="w-10 h-10 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors duration-300">
                      Interviews
                    </h3>
                    <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                      Conversations with filmmakers, actors, and industry voices
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Archives Section */}
              <motion.div
                className="group cursor-pointer"
                whileHover={{ y: -12, scale: 1.03 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className="relative bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-3xl p-6 sm:p-8 h-full overflow-hidden group-hover:border-slate-600/50 transition-all duration-500">
                  {/* Background glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10 text-center">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Film className="w-10 h-10 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors duration-300">
                      Archives
                    </h3>
                    <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                      Preserving the history of cinema through rare insights
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default MobileHeroSection;

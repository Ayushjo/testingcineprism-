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
import ParasitImage from "../assets/parasite.webp";
import BladeRunnerImage from "../assets/bladerunner.jpg";
import SinnersImage from "../assets/sinners.jpg";
import InterstellarImage from "../assets/Interstellar.jpg";
import HowToLoseImage from "../assets/howtoloseaguys.jpg";
import OppenHeimerImage from "../assets/oppenheimer.jpg";
import OppenHeimerFireImage from "../assets/oppenheimerfire.jpg";
import Tilt from "react-parallax-tilt";
import { DesktopHero } from "@/components/ScriptHeroSections";
import LatestReviews from "../components/LatestReviews";
import TrendingThisWeek from "../components/TrendingThisWeek";
import ExploreByGenre from "../components/ExploreByGenre";
import NewsletterCTA from "../components/NewsLetterCTA";
import FleabagImage2 from "../assets/fleebag2.jpg";
import PastLivesImage from "../assets/pastlives.jpg";
import SpiderManImage from "../assets/spiderman.jpg";
import BatmanImage from "../assets/batman.jpg";
import BladeRunnerImg from "../assets/bladerunner.jpg";
import DuneFanImage from "../assets/dunefan.jpg";
import SinnerImage from "../assets/sinners.jpg";
import MobileHero from "@/components/MobileHero";
import TennetImage from "../assets/tennet.jpg";
import AliceImage from "../assets/alicedarling.jpg";
import Marquee from "../components/Marquee";
import Coverflow from "../components/Coverflow";
import CoverflowMarquee from "../components/CoverflowMarquee";
import DarkKnightImage from "../assets/darkknight.jpg";
import DunkKirkImage from "../assets/dunkirk.jpg";
import InteractiveVideoGrid from "../components/InteractiveVideoGrid";
import ArticleSection from "../components/ArticleSection";

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

      <section className="relative min-h-screen bg-slate-950 text-white overflow-hidden">
        {/* Background with subtle pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:50px_50px] md:bg-[size:60px_60px]" />
        </div>

        {/* Ambient glow effects - Responsive sizing */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-48 sm:w-64 md:w-80 h-48 sm:h-64 md:h-80 bg-white/3 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-64 md:w-80 h-48 sm:h-64 md:h-80 bg-slate-200/3 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 pt-16 sm:pt-20 md:pt-24 px-4 sm:px-6 md:px-8 h-screen flex flex-col">
          {/* Main Headline - Enhanced responsive design */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-8 sm:mb-12 md:mb-16 pt-4 sm:pt-6 md:pt-8"
          >
            <h1 className="leading-[1.1] tracking-tight mb-4 sm:mb-6 md:mb-8">
              <span className="block text-slate-100 font-extralight mb-1 sm:mb-2 hero-title-small">
                Exploring Cinema
              </span>
              <span className="block bg-gradient-to-r from-slate-100 via-white to-slate-200 bg-clip-text text-transparent font-normal hero-title-large">
                Beyond the Screen
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto mb-6 sm:mb-8 md:mb-10"
            >
              Reviews, interviews, archives, and the art of storytelling —
              curated for cinephiles who appreciate cinema beyond entertainment.
            </motion.p>

            {/* CTA Button - Enhanced responsive design */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-slate-200 text-slate-950 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-xl sm:rounded-2xl font-medium hover:bg-white transition-all duration-300 flex items-center gap-2 mx-auto text-sm sm:text-base md:text-lg shadow-lg hover:shadow-xl"
            >
              <span>Start Exploring</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          </motion.div>

          {/* Featured content carousel - Enhanced responsive design */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex-1 flex flex-col justify-center max-w-6xl mx-auto w-full"
          >
            {/* Featured Film Carousel */}
            <div className="text-center mb-6 sm:mb-8 md:mb-10">
              <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8 px-2">
                {getVisiblePosters().map((poster, index) => (
                  <motion.div
                    key={`${poster.slideIndex}-${currentSlide}`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                      scale: index === 1 ? 1.05 : 1,
                      opacity: index === 1 ? 1 : 0.75,
                    }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    className={`relative rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-xl transition-all duration-700 ease-in-out ${
                      index === 1
                        ? "w-28 sm:w-36 md:w-44 lg:w-48 h-40 sm:h-52 md:h-64 lg:h-72 z-20" // Center (featured)
                        : "w-20 sm:w-28 md:w-36 lg:w-40 h-32 sm:h-40 md:h-52 lg:h-60 z-10" // Sides
                    }`}
                  >
                    <img
                      src={poster.image}
                      alt={poster.title}
                      className="w-full h-full object-cover transition-all duration-700"
                      loading="lazy"
                    />

                    {/* Film info overlay - only on center film */}
                    {index === 1 && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 text-white text-center">
                          <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-1 sm:mb-2">
                            {poster.title}
                          </h2>
                        </div>
                      </>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Film Navigation - Enhanced design */}
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 md:mb-10">
                {Array.from({
                  length: Math.max(1, heroPosters.length - 2),
                }).map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "bg-slate-200 shadow-lg shadow-slate-200/50"
                        : "bg-slate-600/50 hover:bg-slate-500/70"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Three Feature Sections - Enhanced responsive grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 px-2 sm:px-4 md:px-6 max-w-4xl mx-auto"
            >
              {/* Reviews Section */}
              <motion.div
                className="text-center group"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-14 sm:w-16 md:w-20 h-14 sm:h-16 md:h-20 mx-auto mb-3 sm:mb-4 rounded-xl sm:rounded-2xl bg-slate-800/30 border border-slate-700/30 flex items-center justify-center group-hover:bg-slate-700/40 transition-all duration-300">
                  <Eye className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-slate-300 group-hover:text-slate-200 transition-colors duration-300" />
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-slate-200 mb-2 sm:mb-3">
                  Reviews
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-slate-400 leading-relaxed">
                  In-depth analysis of films from classics to new releases.
                </p>
              </motion.div>

              {/* Interviews Section */}
              <motion.div
                className="text-center group"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-14 sm:w-16 md:w-20 h-14 sm:h-16 md:h-20 mx-auto mb-3 sm:mb-4 rounded-xl sm:rounded-2xl bg-slate-800/30 border border-slate-700/30 flex items-center justify-center group-hover:bg-slate-700/40 transition-all duration-300">
                  <MessageCircle className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-slate-300 group-hover:text-slate-200 transition-colors duration-300" />
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-slate-200 mb-2 sm:mb-3">
                  Interviews
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-slate-400 leading-relaxed">
                  Conversations with filmmakers, actors, and industry voices.
                </p>
              </motion.div>

              {/* Archives Section */}
              <motion.div
                className="text-center group"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-14 sm:w-16 md:w-20 h-14 sm:h-16 md:h-20 mx-auto mb-3 sm:mb-4 rounded-xl sm:rounded-2xl bg-slate-800/30 border border-slate-700/30 flex items-center justify-center group-hover:bg-slate-700/40 transition-all duration-300">
                  <Film className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-slate-300 group-hover:text-slate-200 transition-colors duration-300" />
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-slate-200 mb-2 sm:mb-3">
                  Archives
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-slate-400 leading-relaxed">
                  Preserving the history of cinema through rare insights.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default MobileHeroSection;

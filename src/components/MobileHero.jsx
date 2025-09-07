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

  // Expanded sample data - replace with your actual heroPosters
  // const heroPosters = [
  //   {
  //     image: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
  //     title: "Fleabag",
      
  //   },
  //   {
  //     image: "https://image.tmdb.org/t/p/w500/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
  //     title: "Dune: Part Two",
      
  //   },
  //   {
  //     image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
  //     title: "Interstellar",
      
  //   },
  //   {
  //     image: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
  //     title: "The Godfather",
      
  //   },
  //   {
  //     image: ParasitImage,
  //     title: "Parasite",
      
  //   },
  //   {
  //     image: BladeRunnerImage,
  //     title: "Blade Runner 2049",
      
  //   },
  //   {
  //     image: PastLivesImage,
  //     title: "Past Lives",
      
  //   },
  //   {
  //     image: DuneFanImage,
  //     title: "Dune",
      
  //   },
  //   {
  //     image: SinnersImage,
  //     title: "Sinners",
      
  //   },
  // ];
  const heroPosters = [
    {
      id: 1,
      title: "Fleabag",
      subtitle: "Phoebe Waller-Bridge's Masterpiece",
      image: FleabagImage2,
    },
    {
      id: 2,
      title: "Dune: Part Two",
      subtitle: "The Sci-Fi Epic Continues",
      image: DuneFanImage,
    },
    {
      id: 3,
      title: "Alice Darling",
      subtitle: "A Heartbreaking Reunion",
      image: AliceImage,
    },
    {
      id: 4,
      title: "Past Lives",
      subtitle: "A Heartbreaking Reunion",
      image: PastLivesImage,
    },
    {
      id: 5,
      title: "Sinners",
      subtitle: "A Heartbreaking Reunion",
      image: SinnerImage,
    },
    {
      id: 6,
      title: "Dark Knight",
      subtitle: "A Heartbreaking Reunion",
      image: DarkKnightImage,
    },
    {
      id: 7,
      title: "Dunkirk",
      subtitle: "A Heartbreaking Reunion",
      image: DunkKirkImage,
    },
    {
      id: 8,
      title: "Parasite",
      subtitle: "A Heartbreaking Reunion",
      image: "https://image.tmdb.org/t/p/w342/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    },
    {
      id: 9,
      title: "Interstellar",
      subtitle: "A Heartbreaking Reunion",
      image: "https://image.tmdb.org/t/p/w342/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    },
    {
      id: 10,
      title: "Tennet",
      subtitle: "A Heartbreaking Reunion",
      image: TennetImage,
    },
    {
      id: 11,
      title: "Everything Everywhere All at Once",
      subtitle: "A Heartbreaking Reunion",
      image: "https://image.tmdb.org/t/p/w342/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",
    },
    {
      id: 12,
      title: "Oppenheimer",
      subtitle: "Nolan's Atomic Masterpiece",
      image: OppenHeimerImage,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(
        (prev) => (prev + 1) % Math.max(1, heroPosters.length - 2)
      );
    }, 6000);
    return () => clearInterval(interval);
  }, [heroPosters.length]);

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
      `}</style>
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
              Reviews, interviews, archives, and the art of storytelling —
              curated for cinephiles.
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
            <div className="text-center mb-6">
              <div className="flex justify-center items-center gap-3 mb-6">
                {getVisiblePosters().map((poster, index) => (
                  <div
                    key={`${poster.slideIndex}-${currentSlide}`}
                    className={`relative rounded-xl overflow-hidden shadow-xl transition-all duration-700 ease-in-out ${
                      index === 1
                        ? "w-36 h-52 z-20 scale-105" // Center (featured)
                        : "w-28 h-40 z-10 opacity-75" // Sides
                    }`}
                  >
                    <img
                      src={poster.image}
                      alt={poster.title}
                      className="w-full h-full object-cover transition-all duration-700"
                    />



                    {/* Film info overlay - only on center film */}
                    {index === 1 && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-3 text-white text-center">
                          <h2 className="text-base font-bold mb-1 ">
                            {poster.title}
                          </h2>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>

              {/* Film Navigation */}
              <div className="flex items-center justify-center gap-2 mb-6">
                {Array.from({
                  length: Math.max(1, heroPosters.length - 2),
                }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 hover:scale-125 ${
                      index === currentSlide
                        ? "bg-slate-200"
                        : "bg-slate-600/50"
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
    </>
  );
};

export default MobileHeroSection;

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
      image:
        "https://res.cloudinary.com/dapu22gee/image/upload/v1759088370/dunem_twdbaq.jpg",
      year: "2024",
      rating: 8.8,
      genre: "Sci-Fi",
    },
    {
      id: 3,
      title: "Alice Darling",
      subtitle: "A Haunting Psychological Drama",
      image:
        "https://res.cloudinary.com/dapu22gee/image/upload/v1759088524/alicem_d0enu4.jpg",
      year: "2022",
      rating: 7.2,
      genre: "Drama/Thriller",
    },
    {
      id: 4,
      title: "Past Lives",
      subtitle: "A Heartbreaking Reunion",
      image:
        "https://res.cloudinary.com/dapu22gee/image/upload/v1759088625/pastm_z97xbq.jpg",
      year: "2023",
      rating: 8.4,
      genre: "Drama/Romance",
    },
    {
      id: 5,
      title: "Sinners",
      subtitle: "Dark Crime Thriller",
      image:
        "https://res.cloudinary.com/dapu22gee/image/upload/v1759088800/sinnersm_avdqxv.jpg",
      year: "2024",
      rating: 7.8,
      genre: "Crime/Thriller",
    },
    {
      id: 6,
      title: "Dark Knight",
      subtitle: "Batman's Greatest Challenge",
      image:
        "https://res.cloudinary.com/dapu22gee/image/upload/v1759088712/darkm_pb2ygj.jpg",
      year: "2008",
      rating: 9.0,
      genre: "Action/Crime",
    },
    {
      id: 7,
      title: "Dunkirk",
      subtitle: "War Epic Masterpiece",
      image:
        "https://res.cloudinary.com/dapu22gee/image/upload/v1759088849/image_2025-09-29_011725320_ono8md.png",
      year: "2017",
      rating: 7.8,
      genre: "War/Drama",
    },
    {
      id: 8,
      title: "Parasite",
      subtitle: "Bong Joon-ho's Masterwork",
      image:
        "https://res.cloudinary.com/dapu22gee/image/upload/v1759088930/param_a4x1k2.jpg",
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
      title: "Tennet",
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

  // Auto-slide effect - one poster at a time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(
        (prev) => (prev + 1) % heroPosters.length
      );
    }, 5000); // Slower transition for full-width viewing
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
          {/* Full-Width Single Poster Display */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-shrink-0 mb-8 sm:mb-12 md:mb-16 h-[50vh] sm:h-[55vh] md:h-[60vh]"
          >
            <div className="h-full relative overflow-hidden rounded-3xl">
              {/* Single Poster Container */}
              <div className="relative w-full h-full">
                {heroPosters.map((poster, index) => (
                  <motion.div
                    key={poster.id}
                    initial={{ opacity: 0, x: 300 }}
                    animate={{
                      opacity: index === currentSlide ? 1 : 0,
                      x: index === currentSlide ? 0 : index > currentSlide ? 300 : -300,
                      scale: index === currentSlide ? 1 : 0.8
                    }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className={`absolute inset-0 w-full h-full ${index === currentSlide ? 'z-10' : 'z-0'}`}
                  >
                    {/* Background Image with Blur */}
                    <div className="absolute inset-0 w-full h-full">
                      <img
                        src={poster.image || "/placeholder.svg"}
                        alt={poster.title}
                        className="w-full h-full object-cover blur-md scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/60" />
                    </div>

                    {/* Main Rectangular Poster */}
                    <div className="relative z-10 flex items-center justify-center h-full p-4 sm:p-6 md:p-8">
                      <div className="relative w-full max-w-4xl aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border border-white/20">
                        <img
                          src={poster.image || "/placeholder.svg"}
                          alt={poster.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />

                        {/* Dark overlay for text readability - smaller area */}
                        <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-36 md:h-40 bg-gradient-to-t from-black/95 via-black/60 to-transparent" />

                        {/* Poster Info Overlay - Compact and lower */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6">
                          <div className="text-left text-white max-w-2xl">
                            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 leading-tight">
                              {poster.title}
                            </h3>
                            <p className="text-sm sm:text-base md:text-lg text-slate-200 mb-2 sm:mb-3 leading-relaxed">
                              {poster.subtitle}
                            </p>
                            <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-300">
                              <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                                <span>{poster.year}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                                <span>{poster.genre}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Glow effect */}
                        <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 via-white/10 to-emerald-500/20 rounded-3xl blur-lg opacity-50 -z-10" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Slide Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                {heroPosters.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "bg-white shadow-lg scale-125"
                        : "bg-white/40 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
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

          {/* Cinema Art SVG Illustration */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="px-4 sm:px-6 md:px-8 max-w-4xl mx-auto pb-12 sm:pb-16 md:pb-20 flex-shrink-0"
          >
            <div className="relative bg-slate-800/20 backdrop-blur-sm border border-slate-700/30 rounded-3xl p-8 sm:p-12 overflow-hidden">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800/30 via-slate-900/20 to-slate-800/30" />

              <div className="relative z-10 text-center">
                {/* Simple & Clear Cinema Illustration */}
                <div className="mb-8 flex justify-center">
                  <svg width="500" height="300" viewBox="0 0 500 300" className="max-w-full h-auto">
                    {/* Background */}
                    <rect width="500" height="300" fill="#0f172a" rx="20"/>

                    {/* Movie Theater Setup */}
                    {/* Large Movie Screen */}
                    <rect x="100" y="40" width="300" height="180" rx="15" fill="#1e293b" stroke="#10b981" strokeWidth="3"/>
                    <rect x="110" y="50" width="280" height="160" rx="10" fill="#000">
                      <animate attributeName="fill" values="#000;#0a0a23;#000" dur="4s" repeatCount="indefinite"/>
                    </rect>

                    {/* Movie Playing on Screen - Simple Scene */}
                    <defs>
                      <radialGradient id="movieGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3"/>
                        <stop offset="70%" stopColor="#10b981" stopOpacity="0.2"/>
                        <stop offset="100%" stopColor="#000000" stopOpacity="0.1"/>
                      </radialGradient>
                    </defs>
                    <rect x="110" y="50" width="280" height="160" fill="url(#movieGlow)" opacity="0.8">
                      <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite"/>
                    </rect>

                    {/* Simple Movie Scene - A person watching */}
                    <g opacity="0.6">
                      {/* Simple character silhouette on screen */}
                      <circle cx="200" cy="120" r="20" fill="#fbbf24" opacity="0.7"/>
                      <ellipse cx="200" cy="150" rx="15" ry="30" fill="#fbbf24" opacity="0.7"/>

                      {/* Another character */}
                      <circle cx="280" cy="130" r="18" fill="#10b981" opacity="0.7"/>
                      <ellipse cx="280" cy="160" rx="12" ry="25" fill="#10b981" opacity="0.7"/>

                      {/* Simple background elements */}
                      <rect x="320" y="100" width="60" height="80" fill="#8b5cf6" opacity="0.4" rx="5"/>
                    </g>

                    {/* Text on Screen */}
                    <text x="250" y="200" fontSize="12" fill="#10b981" textAnchor="middle" opacity="0.8">NOW PLAYING</text>

                    {/* Projector at the Back */}
                    <g transform="translate(220, 20)">
                      <rect x="0" y="0" width="60" height="25" rx="5" fill="#374151" stroke="#6b7280" strokeWidth="2"/>
                      <circle cx="30" cy="12" r="8" fill="#fbbf24" opacity="0.9">
                        <animate attributeName="opacity" values="0.9;1;0.9" dur="2s" repeatCount="indefinite"/>
                      </circle>
                      <text x="30" y="35" fontSize="8" fill="#6b7280" textAnchor="middle">PROJECTOR</text>

                      {/* Clear Projector Beam */}
                      <polygon points="20,25 40,25 280,50 120,50" fill="#fbbf24" opacity="0.15">
                        <animate attributeName="opacity" values="0.15;0.25;0.15" dur="3s" repeatCount="indefinite"/>
                      </polygon>
                    </g>

                    {/* Theater Seats - Clear Rows */}
                    <g>
                      {/* Front Row */}
                      {Array.from({length: 8}).map((_, i) => (
                        <g key={`front-${i}`} transform={`translate(${140 + i * 30}, 240)`}>
                          <rect x="0" y="0" width="20" height="25" rx="3" fill="#7c2d12"/>
                          <rect x="2" y="2" width="16" height="15" rx="2" fill="#991b1b"/>
                        </g>
                      ))}

                      {/* Back Row */}
                      {Array.from({length: 10}).map((_, i) => (
                        <g key={`back-${i}`} transform={`translate(${100 + i * 30}, 265)`}>
                          <rect x="0" y="0" width="18" height="20" rx="2" fill="#7c2d12"/>
                          <rect x="2" y="2" width="14" height="12" rx="2" fill="#991b1b"/>
                        </g>
                      ))}
                    </g>

                    {/* Audience - Simple silhouettes */}
                    {Array.from({length: 6}).map((_, i) => (
                      <g key={`audience-${i}`} transform={`translate(${150 + i * 30}, 235)`}>
                        <circle cx="0" cy="0" r="5" fill="#1f2937"/>
                        <ellipse cx="0" cy="8" rx="4" ry="8" fill="#1f2937"/>
                      </g>
                    ))}

                    {/* Film Reels - Side decoration */}
                    <g transform="translate(30, 60)">
                      <circle cx="0" cy="0" r="25" fill="none" stroke="#6b7280" strokeWidth="3">
                        <animateTransform attributeName="transform" type="rotate" values="0 0 0;360 0 0" dur="8s" repeatCount="indefinite"/>
                      </circle>
                      <circle cx="0" cy="0" r="5" fill="#374151"/>
                      {Array.from({length: 8}).map((_, i) => (
                        <line key={i} x1="0" y1="0" x2={20 * Math.cos(i * Math.PI / 4)} y2={20 * Math.sin(i * Math.PI / 4)} stroke="#6b7280" strokeWidth="2"/>
                      ))}
                      <text x="0" y="45" fontSize="10" fill="#6b7280" textAnchor="middle">FILM REEL</text>
                    </g>

                    <g transform="translate(450, 80)">
                      <circle cx="0" cy="0" r="20" fill="none" stroke="#6b7280" strokeWidth="3">
                        <animateTransform attributeName="transform" type="rotate" values="360 0 0;0 0 0" dur="6s" repeatCount="indefinite"/>
                      </circle>
                      <circle cx="0" cy="0" r="4" fill="#374151"/>
                      {Array.from({length: 6}).map((_, i) => (
                        <line key={i} x1="0" y1="0" x2={15 * Math.cos(i * Math.PI / 3)} y2={15 * Math.sin(i * Math.PI / 3)} stroke="#6b7280" strokeWidth="2"/>
                      ))}
                    </g>

                    {/* Professional Camera */}
                    <g transform="translate(40, 200)">
                      <rect x="0" y="0" width="50" height="30" rx="5" fill="#374151" stroke="#6b7280" strokeWidth="2"/>
                      <circle cx="25" cy="15" r="10" fill="#1f2937" stroke="#6b7280" strokeWidth="2"/>
                      <circle cx="25" cy="15" r="5" fill="#000"/>
                      <rect x="10" y="5" width="8" height="5" rx="1" fill="#ef4444"/>
                      <text x="25" y="45" fontSize="8" fill="#6b7280" textAnchor="middle">CAMERA</text>

                      {/* Tripod */}
                      <line x1="25" y1="30" x2="15" y2="55" stroke="#4b5563" strokeWidth="3"/>
                      <line x1="25" y1="30" x2="35" y2="55" stroke="#4b5563" strokeWidth="3"/>
                      <line x1="25" y1="30" x2="25" y2="60" stroke="#4b5563" strokeWidth="3"/>
                    </g>

                    {/* Director's Clapperboard */}
                    <g transform="translate(400, 200)">
                      <rect x="0" y="0" width="70" height="45" rx="5" fill="#1f2937" stroke="#6b7280" strokeWidth="2"/>
                      <rect x="0" y="0" width="70" height="15" fill="#000"/>
                      {Array.from({length: 5}).map((_, i) => (
                        <rect key={i} x={i * 14} y="0" width="12" height="15" fill={i % 2 === 0 ? '#ffffff' : '#000'}/>
                      ))}
                      <text x="35" y="30" fontSize="10" fill="#10b981" textAnchor="middle" fontWeight="bold">SCENE 1</text>
                      <text x="35" y="40" fontSize="8" fill="#6b7280" textAnchor="middle">TAKE 1</text>
                      <text x="35" y="60" fontSize="8" fill="#6b7280" textAnchor="middle">CLAPPERBOARD</text>
                    </g>

                    {/* Studio Lights */}
                    <g transform="translate(80, 20)">
                      <ellipse cx="0" cy="0" rx="30" ry="15" fill="#fbbf24" opacity="0.2">
                        <animate attributeName="opacity" values="0.2;0.4;0.2" dur="4s" repeatCount="indefinite"/>
                      </ellipse>
                      <circle cx="0" cy="0" r="12" fill="#374151" stroke="#6b7280" strokeWidth="2"/>
                      <circle cx="0" cy="0" r="7" fill="#fbbf24" opacity="0.8">
                        <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite"/>
                      </circle>
                      <text x="0" y="25" fontSize="8" fill="#6b7280" textAnchor="middle">STUDIO LIGHT</text>
                    </g>

                    <g transform="translate(400, 20)">
                      <ellipse cx="0" cy="0" rx="25" ry="12" fill="#3b82f6" opacity="0.2">
                        <animate attributeName="opacity" values="0.2;0.4;0.2" dur="3s" repeatCount="indefinite"/>
                      </ellipse>
                      <circle cx="0" cy="0" r="10" fill="#374151" stroke="#6b7280" strokeWidth="2"/>
                      <circle cx="0" cy="0" r="6" fill="#3b82f6" opacity="0.8">
                        <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite"/>
                      </circle>
                    </g>

                  </svg>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.5 }}
                  className="text-center"
                >
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                    Where Cinema Comes Alive
                  </h3>
                  <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">
                    Experience the magic of storytelling through our carefully curated collection of cinematic masterpieces that challenge, inspire, and transform.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default MobileHeroSection;
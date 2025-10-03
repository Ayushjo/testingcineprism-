"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FleabagImage2 from "../assets/fleebag2.jpg";
import PastLivesImage from "../assets/pastlives.jpg";
import DunkKirkImage from "../assets/dunkirk.jpg";
import OppenHeimerImage from "../assets/oppenheimer.jpg";



const gridItems = [
  { id: 1, poster: FleabagImage2 },
  { id: 2, poster: DunkKirkImage },
  { id: 3, poster: PastLivesImage },
  { id: 4, poster: OppenHeimerImage },
];

const backgroundVideo =
  "https://res.cloudinary.com/dapu22gee/video/upload/v1754633004/dunevideo2_bminv6.mp4";
const motto = "Good films make your life better.";

export default function InteractiveVideoGrid() {
  const [showIntro, setShowIntro] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [clapboardClosed, setClapboardClosed] = useState(false);
  const backgroundVideoRef = useRef(null);

  // Sound function is removed as requested

  useEffect(() => {
    // Timer to trigger the clap animation
    const timer1 = setTimeout(() => {
      setClapboardClosed(true);
    }, 1200);

    // Timer to start fading out the clapboard
    const timer2 = setTimeout(() => {
      setShowIntro(false);
    }, 2800);;

    // Timer to start fading in the main content
    const timer3 = setTimeout(() => {
      setShowContent(true);
    }, 2200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  useEffect(() => {
    if (showContent && backgroundVideoRef.current) {
      backgroundVideoRef.current.play().catch(console.error);
    }
  }, [showContent]);

  const mottoWords = motto.split(" ");

  return (
    <div className="relative w-full h-screen bg-slate-950 overflow-hidden">
      {/* Background Video */}
      <AnimatePresence>
        {showContent && (
          <motion.video
            ref={backgroundVideoRef}
            key="background-video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 w-full h-full object-cover"
            src={backgroundVideo}
            muted
            loop
            playsInline
          />
        )}
      </AnimatePresence>

      {/* --- ENHANCED & MORE REALISTIC CLAPBOARD (NO SOUND) --- */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-50"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 0.6,
              rotateY: 15,
              filter: "blur(10px)",
            }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-96 h-80 rounded-2xl bg-gradient-to-r from-amber-400/20 to-orange-500/20 blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            <div className="relative" style={{ perspective: "1200px" }}>
              {/* Enhanced Clapboard Base */}
              <motion.div
                className="w-96 h-72 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl shadow-2xl border border-gray-600/50 relative overflow-hidden font-mono backdrop-blur-sm"
                initial={{ rotateX: 10, rotateY: -5 }}
                animate={{ rotateX: 0, rotateY: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {/* Inner glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl" />

                <div className="p-6 space-y-4 relative z-10">
                  <div className="flex justify-between border-b border-gray-500/30 pb-3">
                    <span className="text-gray-400 text-sm font-medium tracking-wide">
                      PRODUCTION
                    </span>
                    <span className="text-white font-bold tracking-wider text-lg bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                      The Cinéprism
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-gray-500/30 pb-3">
                    <span className="text-gray-400 text-sm font-medium tracking-wide">
                      SCENE
                    </span>
                    <span className="text-white font-bold tracking-wider text-lg">
                      01
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-gray-500/30 pb-3">
                    <span className="text-gray-400 text-sm font-medium tracking-wide">
                      TAKE
                    </span>
                    <span className="text-white font-bold tracking-wider text-lg">
                      01
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm font-medium tracking-wide">
                      DIRECTOR
                    </span>
                    <span className="text-white font-bold tracking-wider text-lg">
                      You
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Enhanced Clapboard Top */}
              <motion.div
                className="absolute -top-2 left-0 w-96 h-20 bg-gradient-to-r from-gray-900 to-black origin-bottom shadow-2xl flex items-center p-3 rounded-t-xl border-b-2 border-gray-600"
                initial={{ rotateX: -70 }}
                animate={{ rotateX: clapboardClosed ? 0 : -70 }}
                transition={{
                  duration: 0.2,
                  ease: "easeOut",
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="flex-1 h-full flex rounded-lg overflow-hidden shadow-inner">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`flex-1 h-full ${
                        i % 2 === 0 ? "bg-gray-100" : "bg-gray-900"
                      }`}
                      animate={{
                        scaleY: clapboardClosed ? [1, 0.8, 1] : 1,
                      }}
                      transition={{
                        duration: 0.1,
                        delay: i * 0.02,
                      }}
                    />
                  ))}
                </div>

                {/* Enhanced Hinge */}
                <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 ml-3 rounded-full flex items-center justify-center shadow-2xl border-2 border-gray-500">
                  <div className="w-4 h-4 bg-gray-900 rounded-full border border-gray-700" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center p-8 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <div className="relative w-full max-w-7xl">
              {/* Poster Grid is now HIDDEN on mobile */}
              <div className="hidden xl:grid grid-cols-4 gap-8">
                {gridItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-2xl group cursor-pointer"
                    initial={{ opacity: 0, y: 60, rotateY: -15 }}
                    animate={{ opacity: 1, y: 0, rotateY: 0 }}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.3 },
                    }}
                    transition={{
                      duration: 1,
                      delay: index * 0.15,
                      ease: "easeOut",
                    }}
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url(${item.poster})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent" />
                    <motion.div
                      className="absolute inset-0 border-2 border-transparent rounded-xl"
                      whileHover={{
                        borderColor: "rgba(255, 255, 255, 0.3)",
                        boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)",
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                ))}
              </div>

              <div className="hidden xl:flex absolute inset-0 items-center justify-center pointer-events-none">
                <div className="text-center">
                  <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
                    {mottoWords.map((word, index) => (
                      <motion.span
                        key={index}
                        className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white"
                        style={{
                          textShadow:
                            "0 0 30px rgba(0,0,0,0.9), 0 4px 12px rgba(0,0,0,0.8)",
                        }}
                        initial={{ opacity: 0, y: 40, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          duration: 0.8,
                          delay: 1.8 + index * 0.1,
                          ease: "easeOut",
                          type: "spring",
                          stiffness: 120,
                          damping: 12,
                        }}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>

              {/* --- START: ENHANCED MOBILE-ONLY FEATURE CARD --- */}
              <div className="xl:hidden absolute inset-0 flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 1,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 1,
                  }}
                  className="w-full max-w-md bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={gridItems[0].poster}
                      alt="Featured Poster"
                      className="w-full h-48 object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent" />
                  </div>
                  <div className="p-6 -mt-16 relative z-10">
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      transition={{ staggerChildren: 0.2 }}
                    >
                      <div className="flex flex-wrap">
                        {mottoWords.map((word, index) => (
                          <motion.span
                            key={index}
                            variants={{
                              hidden: { opacity: 0, y: 20 },
                              visible: { opacity: 1, y: 0 },
                            }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="text-3xl font-black text-white mr-3"
                            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
                          >
                            {word}
                          </motion.span>
                        ))}
                      </div>
                      <motion.p
                        variants={{
                          hidden: { opacity: 0 },
                          visible: { opacity: 1 },
                        }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="text-sm text-slate-400 mt-2"
                      >
                        Explore our curated collection of reviews.
                      </motion.p>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
              {/* --- END: ENHANCED MOBILE-ONLY FEATURE CARD --- */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

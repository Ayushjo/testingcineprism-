"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FleabagImage2 from "../assets/fleebag2.jpg";
import PastLivesImage from "../assets/pastlives.jpg";
import DunkKirkImage from "../assets/dunkirk.jpg";
import OppenHeimerImage from "../assets/oppenheimer.jpg";

// This is your local video file from the assets folder
import duneVideo from "../assets/dunevideo.mp4";

const gridItems = [
  { id: 1, poster: FleabagImage2 },
  { id: 2, poster: DunkKirkImage },
  { id: 3, poster: PastLivesImage },
  { id: 4, poster: OppenHeimerImage },
];

const backgroundVideo = duneVideo;
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
      // playClapSound(); // Sound call removed
    }, 1200);

    // Timer to start fading out the clapboard
    const timer2 = setTimeout(() => {
      setShowIntro(false);
    }, 2800);

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
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <div className="relative" style={{ perspective: "1000px" }}>
              {/* Clapboard Base */}
              <div className="w-80 h-64 bg-[#1a1a1a] rounded-lg shadow-2xl border-t-2 border-gray-700 relative overflow-hidden font-mono">
                <div className="p-4 space-y-2">
                  <div className="flex justify-between border-b border-gray-600 pb-2">
                    <span className="text-gray-400 text-sm">PROD.</span>
                    <span className="text-white font-bold tracking-wider">
                      The Cinéprism
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-gray-600 pb-2">
                    <span className="text-gray-400 text-sm">SCENE</span>
                    <span className="text-white font-bold tracking-wider">
                      01
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-gray-600 pb-2">
                    <span className="text-gray-400 text-sm">TAKE</span>
                    <span className="text-white font-bold tracking-wider">
                      01
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">DIRECTOR</span>
                    <span className="text-white font-bold tracking-wider">
                      You
                    </span>
                  </div>
                </div>
              </div>

              {/* Clapboard Top (Clapper) */}
              <motion.div
                className="absolute -top-1 left-0 w-80 h-16 bg-black origin-bottom shadow-2xl flex items-center p-2"
                initial={{ rotateX: -60 }}
                animate={{ rotateX: clapboardClosed ? 0 : -60 }}
                transition={{
                  duration: 0.15,
                  ease: "easeOut",
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="flex-1 h-full flex">
                  {[...Array(7)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-1/4 h-full ${
                        i % 2 === 0 ? "bg-white" : "bg-black"
                      }`}
                    />
                  ))}
                </div>
                {/* Hinge Detail */}
                <div className="w-8 h-8 bg-gray-700 ml-2 rounded-full flex items-center justify-center shadow-inner border-2 border-gray-500">
                  <div className="w-3 h-3 bg-gray-800 rounded-full border-2 border-gray-900" />
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

              {/* Central Motto */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

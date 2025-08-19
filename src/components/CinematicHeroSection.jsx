"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// STEP 1: Replace AbstractIntroAnimation with SpotlightIntro
const SpotlightIntro = ({ onComplete }) => {
  const [isSearching, setIsSearching] = useState(false);
  const [hasFoundTarget, setHasFoundTarget] = useState(false);
  const [revealPhase, setRevealPhase] = useState(false);

  useEffect(() => {
    const sequence = async () => {
      // Start with pure black for 500ms
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Begin continuous searching movement
      setIsSearching(true);
      await new Promise((resolve) => setTimeout(resolve, 2800)); // Extended search time

      // Found target - settle in center
      setHasFoundTarget(true);
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Begin reveal - expand spotlight
      setRevealPhase(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Complete
      onComplete();
    };

    sequence();
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: revealPhase ? 0 : 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      {/* Main Searching Spotlight with continuous movement */}
      <motion.div
        className="absolute w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, 
            rgba(255, 255, 255, 0.2) 0%, 
            rgba(255, 147, 51, 0.15) 25%, 
            rgba(255, 165, 79, 0.08) 45%, 
            rgba(245, 101, 35, 0.04) 65%,
            transparent 80%
          )`,
          filter: "blur(1.5px)",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
        initial={{
          opacity: 0,
          scale: 0.3,
          x: "-300px",
          y: "-200px",
        }}
        animate={{
          opacity: isSearching ? 1 : 0,
          scale: revealPhase ? 12 : hasFoundTarget ? 1.4 : 0.8,
          x:
            isSearching && !hasFoundTarget
              ? [
                  "-300px",
                  "-180px",
                  "120px",
                  "200px",
                  "-80px",
                  "150px",
                  "-120px",
                  "80px",
                  "0px",
                ]
              : "0px",
          y:
            isSearching && !hasFoundTarget
              ? [
                  "-200px",
                  "180px",
                  "-150px",
                  "100px",
                  "220px",
                  "-180px",
                  "160px",
                  "-100px",
                  "0px",
                ]
              : "0px",
        }}
        transition={{
          opacity: { duration: 0.8, ease: "easeOut" },
          scale: {
            duration: revealPhase ? 1 : 0.6,
            ease: revealPhase ? "easeIn" : "easeOut",
          },
          x: {
            duration: isSearching && !hasFoundTarget ? 2.8 : 0.8,
            ease: "easeInOut",
            times:
              isSearching && !hasFoundTarget
                ? [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.85, 0.95, 1]
                : undefined,
          },
          y: {
            duration: isSearching && !hasFoundTarget ? 2.8 : 0.8,
            ease: "easeInOut",
            times:
              isSearching && !hasFoundTarget
                ? [0, 0.12, 0.28, 0.42, 0.58, 0.72, 0.82, 0.92, 1]
                : undefined,
          },
        }}
      />

      {/* Inner bright core that follows the main spotlight */}
      <motion.div
        className="absolute w-40 h-40 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, 
            rgba(255, 255, 255, 0.4) 0%, 
            rgba(255, 147, 51, 0.35) 30%, 
            rgba(255, 165, 79, 0.15) 60%,
            transparent 80%
          )`,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
        initial={{
          opacity: 0,
          scale: 0.2,
          x: "-300px",
          y: "-200px",
        }}
        animate={{
          opacity: isSearching ? (hasFoundTarget ? 0.8 : 0.6) : 0,
          scale: revealPhase ? 15 : hasFoundTarget ? 1.8 : 0.6,
          x:
            isSearching && !hasFoundTarget
              ? [
                  "-300px",
                  "-180px",
                  "120px",
                  "200px",
                  "-80px",
                  "150px",
                  "-120px",
                  "80px",
                  "0px",
                ]
              : "0px",
          y:
            isSearching && !hasFoundTarget
              ? [
                  "-200px",
                  "180px",
                  "-150px",
                  "100px",
                  "220px",
                  "-180px",
                  "160px",
                  "-100px",
                  "0px",
                ]
              : "0px",
        }}
        transition={{
          opacity: { duration: 0.6, ease: "easeOut" },
          scale: {
            duration: revealPhase ? 1 : 0.6,
            ease: revealPhase ? "easeIn" : "easeOut",
          },
          x: {
            duration: isSearching && !hasFoundTarget ? 2.8 : 0.8,
            ease: "easeInOut",
            times:
              isSearching && !hasFoundTarget
                ? [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.85, 0.95, 1]
                : undefined,
          },
          y: {
            duration: isSearching && !hasFoundTarget ? 2.8 : 0.8,
            ease: "easeInOut",
            times:
              isSearching && !hasFoundTarget
                ? [0, 0.12, 0.28, 0.42, 0.58, 0.72, 0.82, 0.92, 1]
                : undefined,
          },
        }}
      />

      {/* Floating particles in the light beam */}
      {isSearching && (
        <motion.div
          className="absolute pointer-events-none"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "320px",
            height: "320px",
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: hasFoundTarget ? 0.6 : 0.3,
            x:
              isSearching && !hasFoundTarget
                ? [
                    "-300px",
                    "-180px",
                    "120px",
                    "200px",
                    "-80px",
                    "150px",
                    "-120px",
                    "80px",
                    "0px",
                  ]
                : "0px",
            y:
              isSearching && !hasFoundTarget
                ? [
                    "-200px",
                    "180px",
                    "-150px",
                    "100px",
                    "220px",
                    "-180px",
                    "160px",
                    "-100px",
                    "0px",
                  ]
                : "0px",
          }}
          transition={{
            opacity: { duration: 0.8 },
            x: {
              duration: isSearching && !hasFoundTarget ? 2.8 : 0.8,
              ease: "easeInOut",
              times:
                isSearching && !hasFoundTarget
                  ? [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.85, 0.95, 1]
                  : undefined,
            },
            y: {
              duration: isSearching && !hasFoundTarget ? 2.8 : 0.8,
              ease: "easeInOut",
              times:
                isSearching && !hasFoundTarget
                  ? [0, 0.12, 0.28, 0.42, 0.58, 0.72, 0.82, 0.92, 1]
                  : undefined,
            },
          }}
        >
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white/30 rounded-full"
              style={{
                width: `${2 + (i % 3)}px`,
                height: `${2 + (i % 3)}px`,
                left: `${15 + ((i * 8) % 70)}%`,
                top: `${20 + ((i * 12) % 60)}%`,
              }}
              animate={{
                opacity: [0.1, 0.7, 0.1],
                scale: [0.8, 1.4, 0.8],
                x: [0, Math.sin(i) * 10, 0],
                y: [0, Math.cos(i) * 8, 0],
              }}
              transition={{
                duration: 2.5 + i * 0.3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Subtle light rays emanating from center when found */}
      {hasFoundTarget && (
        <motion.div
          className="absolute pointer-events-none"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "100vw",
            height: "100vh",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 0.8 }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-gradient-to-r from-transparent via-orange-400/20 to-transparent"
              style={{
                width: "2px",
                height: "120vh",
                left: "50%",
                top: "50%",
                transformOrigin: "center center",
                transform: `translate(-50%, -50%) rotate(${i * 30}deg)`,
              }}
              animate={{
                opacity: [0, 0.4, 0],
                scaleY: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Searching status indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-white/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: isSearching && !hasFoundTarget ? 0.8 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center space-x-3">
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 bg-orange-400 rounded-full"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
          <span className="text-xs tracking-wider font-light">SEARCHING</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

const CinematicHeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  const quote = "Good films make your life better.";
  const words = quote.split(" ");

  const handleLoadingComplete = () => {
    setShowLoading(false);
    setIsLoaded(true);
  };

  // Staggered word animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      {/* STEP 2: Replace AbstractIntroAnimation with SpotlightIntro */}
      <AnimatePresence>
        {showLoading && <SpotlightIntro onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {/* Main Hero Section - UNCHANGED */}
      <section className="relative h-screen overflow-hidden hidden md:block">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            src="https://res.cloudinary.com/dapu22gee/video/upload/v1754793790/bgvideo_xxx4qx.mp4"
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Central Quote */}
        <div className="relative z-20 h-full flex items-center justify-center">
          <div className="text-center px-8">
            {/* Brand name */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="text-2xl md:text-3xl font-light text-white/80 tracking-[0.3em] mb-2">
                THE CINÉPRISM
              </h1>
              <div className="w-24 h-px bg-emerald-400 mx-auto" />
            </motion.div>

            {/* Main Quote with Staggered Animation */}
            <motion.div
              className="max-w-4xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
            >
              <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
                {words.map((word, index) => (
                  <motion.span
                    key={index}
                    variants={wordVariants}
                    className="text-4xl md:text-6xl lg:text-7xl font-light text-white"
                    style={{
                      textShadow:
                        "2px 2px 20px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.5)",
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Subtle accent line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isLoaded ? { scaleX: 1 } : {}}
              transition={{ duration: 1.5, delay: 3 }}
              className="mt-12 w-32 h-px bg-white/30 mx-auto origin-center"
            />
          </div>
        </div>

        {/* Carousel Indicators */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 3.5 }}
        >
          <div className="flex space-x-3">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === 0
                    ? "bg-emerald-400 scale-125"
                    : "bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 right-8 z-30"
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 4 }}
        >
          <div className="flex flex-col items-center text-white/60">
            <span className="text-xs tracking-wider mb-2 rotate-90 origin-center">
              SCROLL
            </span>
            <div className="w-px h-8 bg-white/40" />
          </div>
        </motion.div>

        {/* Corner accents */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 4.5 }}
        >
          <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-white/20 z-30" />
          <div className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-white/20 z-30" />
          <div className="absolute bottom-16 left-8 w-12 h-12 border-l-2 border-b-2 border-white/20 z-30" />
          <div className="absolute bottom-16 right-8 w-12 h-12 border-r-2 border-b-2 border-white/20 z-30" />
        </motion.div>
      </section>
    </>
  );
};

export default CinematicHeroSection;

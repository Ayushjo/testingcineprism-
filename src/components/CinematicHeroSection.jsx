import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FilmProjectorLoading = ({ onComplete }) => {
  const [currentNumber, setCurrentNumber] = useState(3);
  const [showFlash, setShowFlash] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const sequence = async () => {
      // Countdown sequence
      for (let i = 3; i >= 1; i--) {
        setCurrentNumber(i);
        await new Promise(resolve => setTimeout(resolve, 800));
      }
      
      // Projector flash
      setShowFlash(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      setShowFlash(false);
      
      // Complete loading
      await new Promise(resolve => setTimeout(resolve, 200));
      setIsComplete(true);
      
      // Fade out and call onComplete
      await new Promise(resolve => setTimeout(resolve, 800));
      onComplete();
    };

    sequence();
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: isComplete ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Film grain overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full bg-gray-900 bg-opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            animation: "grain 0.2s infinite",
          }}
        />
      </div>

      {/* Countdown numbers */}
      <AnimatePresence mode="wait">
        {!showFlash && !isComplete && (
          <motion.div
            key={currentNumber}
            className="relative"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Film countdown circle */}
            <div className="relative w-48 h-48 border-4 border-white rounded-full flex items-center justify-center">
              {/* Corner markers */}
              <div className="absolute top-2 left-2 w-4 h-4 bg-white" />
              <div className="absolute top-2 right-2 w-4 h-4 bg-white" />
              <div className="absolute bottom-2 left-2 w-4 h-4 bg-white" />
              <div className="absolute bottom-2 right-2 w-4 h-4 bg-white" />

              {/* Number */}
              <span className="text-8xl font-black text-white font-mono">
                {currentNumber}
              </span>
            </div>

            {/* Film sprocket holes */}
            <div className="absolute -left-8 top-0 h-full flex flex-col justify-around">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-4 h-6 bg-white rounded-sm" />
              ))}
            </div>
            <div className="absolute -right-8 top-0 h-full flex flex-col justify-around">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-4 h-6 bg-white rounded-sm" />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Projector flash */}
      <AnimatePresence>
        {showFlash && (
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, times: [0, 0.5, 1] }}
          />
        )}
      </AnimatePresence>

      {/* Loading text */}
      <motion.div
        className="absolute bottom-16 text-white text-sm tracking-wider"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        STARTING PROJECTION...
      </motion.div>
    </motion.div>
  );
};

const CinematicHeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  const quote = "Good films make your life better.";
  const words = quote.split(' ');

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
      }
    }
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      filter: "blur(10px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      {/* Film Projector Loading Animation */}
      <AnimatePresence>
        {showLoading && (
          <FilmProjectorLoading onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      {/* Main Hero Section */}
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
                      textShadow: "2px 2px 20px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.5)"
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
                    ? 'bg-emerald-400 scale-125' 
                    : 'bg-white/40 hover:bg-white/60'
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
            <span className="text-xs tracking-wider mb-2 rotate-90 origin-center">SCROLL</span>
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
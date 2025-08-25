import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MobileFilmProjectorLoading = ({ onComplete }) => {
  const [currentNumber, setCurrentNumber] = useState(3);
  const [showFlash, setShowFlash] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const sequence = async () => {
      // Countdown sequence
      for (let i = 3; i >= 1; i--) {
        setCurrentNumber(i);
        await new Promise((resolve) => setTimeout(resolve, 700));
      }

      // Projector flash
      setShowFlash(true);
      await new Promise((resolve) => setTimeout(resolve, 250));
      setShowFlash(false);

      // Complete loading
      await new Promise((resolve) => setTimeout(resolve, 150));
      setIsComplete(true);

      // Fade out and call onComplete
      await new Promise((resolve) => setTimeout(resolve, 600));
      onComplete();
    };

    sequence();
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-black z-50 flex items-center justify-center block md:hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: isComplete ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Mobile film grain overlay */}
      <div className="absolute inset-0 opacity-15">
        <div
          className="w-full h-full animate-pulse"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Mobile countdown numbers */}
      <AnimatePresence mode="wait">
        {!showFlash && !isComplete && (
          <motion.div
            key={currentNumber}
            className="relative"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.3, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            {/* Mobile film countdown circle - smaller */}
            <div className="relative w-32 h-32 border-3 border-white rounded-full flex items-center justify-center">
              {/* Corner markers - smaller */}
              <div className="absolute top-1 left-1 w-3 h-3 bg-white" />
              <div className="absolute top-1 right-1 w-3 h-3 bg-white" />
              <div className="absolute bottom-1 left-1 w-3 h-3 bg-white" />
              <div className="absolute bottom-1 right-1 w-3 h-3 bg-white" />

              {/* Number - smaller for mobile */}
              <span className="text-5xl font-black text-white font-mono">
                {currentNumber}
              </span>
            </div>

            {/* Mobile film sprocket holes - smaller */}
            <div className="absolute -left-6 top-0 h-full flex flex-col justify-around">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-3 h-4 bg-white rounded-sm" />
              ))}
            </div>
            <div className="absolute -right-6 top-0 h-full flex flex-col justify-around">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-3 h-4 bg-white rounded-sm" />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile projector flash */}
      <AnimatePresence>
        {showFlash && (
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, times: [0, 0.5, 1] }}
          />
        )}
      </AnimatePresence>

      {/* Mobile loading text */}
      <motion.div
        className="absolute bottom-20 text-white text-xs tracking-wider text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        STARTING PROJECTION...
      </motion.div>
    </motion.div>
  );
};

const MobileCinematicHeroSection = ({ featuredCarouselData }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  const quote = "Good films make your life better.";
  const words = quote.split(" ");

  const handleLoadingComplete = () => {
    setShowLoading(false);
    setIsLoaded(true);
  };

  // Mobile staggered word animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.3,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      {/* Mobile Film Projector Loading Animation */}
      <AnimatePresence>
        {showLoading && (
          <MobileFilmProjectorLoading onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      {/* Mobile Hero Section */}
      <div className="block md:hidden pt-20">
        <section className="relative min-h-screen overflow-hidden">
          {/* Mobile Background Video */}
          <div className="absolute inset-0 z-0">
            <video
              src="https://res.cloudinary.com/dapu22gee/video/upload/v1756057983/A_cinematic_montage_202508242322_upscaled_eorqqp.mp4"
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
            {/* Mobile dark overlay - slightly darker for better text readability */}
            <div className="absolute inset-0 bg-black/50" />
          </div>

          {/* Mobile Content Layout */}
          <div className="relative z-20 min-h-screen flex flex-col">
            {/* Top Section - Brand and Quote */}
            <div className="flex-1 flex items-center justify-center px-6 py-8">
              <div className="text-center max-w-sm">
                {/* Mobile Brand name */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mb-8"
                >
                  <h1 className="text-lg font-light text-white/80 tracking-[0.2em] mb-2">
                    THE CINÉPRISM
                  </h1>
                  <div className="w-16 h-px bg-emerald-400 mx-auto" />
                </motion.div>

                {/* Mobile Main Quote with Staggered Animation */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate={isLoaded ? "visible" : "hidden"}
                  className="mb-8"
                >
                  <div className="flex flex-wrap justify-center items-center gap-2">
                    {words.map((word, index) => (
                      <motion.span
                        key={index}
                        variants={wordVariants}
                        className="text-2xl sm:text-3xl font-light text-white leading-tight"
                        style={{
                          textShadow:
                            "1px 1px 15px rgba(0,0,0,0.8), 0 0 30px rgba(0,0,0,0.6)",
                        }}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Mobile subtle accent line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={isLoaded ? { scaleX: 1 } : {}}
                  transition={{ duration: 1.2, delay: 2.5 }}
                  className="w-20 h-px bg-white/30 mx-auto origin-center"
                />
              </div>
            </div>

            {/* Bottom Section - Featured Carousel */}

            {/* Mobile Carousel Indicators */}
            <motion.div
              className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30"
              initial={{ opacity: 0 }}
              animate={isLoaded ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 3.5 }}
            >
              <div className="flex space-x-2">
                {[0, 1, 2, 3].map((index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      index === 0 ? "bg-emerald-400 scale-125" : "bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            {/* Mobile corner accents */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isLoaded ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 4 }}
            >
              <div className="absolute top-24 left-4 w-8 h-8 border-l border-t border-white/20 z-30" />
              <div className="absolute top-24 right-4 w-8 h-8 border-r border-t border-white/20 z-30" />
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default MobileCinematicHeroSection;

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Film, Play, Star, ArrowRight } from "lucide-react";

// Enhanced typewriter hook with better animations
const useTypewriter = (text, speed = 50) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
    }
  }, [currentIndex, text, speed]);

  return { displayText, isComplete };
};

// Desktop Hero Section - Updated with proper theme colors
const DesktopHero = ({ heroPosters, currentSlide, setCurrentSlide }) => {
  const scriptText = `FADE IN:

A world where movies matter.
For cinephiles, by cinephiles.

THE CINÉPRISM`;

  const { displayText, isComplete } = useTypewriter(scriptText, 60);

  return (
    <section className="relative h-screen overflow-hidden pt-20 hidden md:block">
      {/* Dark Screenplay Paper Background - matching your theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
        {/* Subtle paper lines - darker theme */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background: `
              linear-gradient(to bottom, 
                transparent 0px, 
                transparent 19px, 
                #64748b 19px, 
                #64748b 21px, 
                transparent 21px
              )
            `,
            backgroundSize: "100% 24px",
          }}
        />

        {/* 3-hole punch marks - emerald theme */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute left-12 top-0 bottom-0 w-4 flex flex-col justify-center gap-20"
        >
          <div className="w-4 h-4 bg-emerald-400 rounded-full opacity-60 shadow-lg shadow-emerald-400/20"></div>
          <div className="w-4 h-4 bg-emerald-400 rounded-full opacity-60 shadow-lg shadow-emerald-400/20"></div>
          <div className="w-4 h-4 bg-emerald-400 rounded-full opacity-60 shadow-lg shadow-emerald-400/20"></div>
        </motion.div>

        {/* Ambient glow effects - matching your theme */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              opacity: [0.05, 0.1, 0.05],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              opacity: [0.03, 0.08, 0.03],
              scale: [1.1, 1, 1.1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-slate-400/10 rounded-full blur-3xl"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Enhanced Screenplay Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              className="text-left ml-20"
            >
              {/* Screenplay Format */}
              <div className="font-mono text-white text-lg leading-relaxed tracking-wide">
                {/* Scene Header with better animation */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                  className="mb-8 text-sm text-emerald-400 uppercase tracking-wider font-semibold"
                >
                  SCENE 001 - THE CINÉPRISM - CONTINUOUS
                </motion.div>

                {/* Enhanced Typewriter Text */}
                <div className="relative">
                  <motion.pre
                    className="whitespace-pre-wrap text-slate-100 leading-8 font-light"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                  >
                    {displayText}
                  </motion.pre>
                  {/* Enhanced blinking cursor */}
                  {!isComplete && (
                    <motion.span
                      animate={{
                        opacity: [1, 1, 0, 0],
                        scaleY: [1, 1, 0.8, 0.8],
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="inline-block w-0.5 h-6 bg-emerald-400 ml-1 shadow-sm shadow-emerald-400/50"
                    />
                  )}
                </div>

                {/* Enhanced Scene Direction */}
                <AnimatePresence>
                  {isComplete && (
                    <motion.div
                      initial={{ opacity: 0, y: 30, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                      className="mt-8 italic text-slate-300 leading-relaxed"
                    >
                      <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2, duration: 0.6 }}
                        className="mb-4"
                      >
                        Cinema for acquired taste.
                      </motion.p>
                      <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.5, duration: 0.6 }}
                      >
                        Where every frame tells a story worth discovering.
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Enhanced Action Buttons */}
                <AnimatePresence>
                  {isComplete && (
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.8,
                        delay: 1.8,
                        ease: "easeOut",
                      }}
                      className="flex items-center gap-4 mt-12"
                    >
                      <motion.button
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)",
                          backgroundColor: "rgba(16, 185, 129, 0.9)",
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 shadow-lg shadow-emerald-500/25 border border-emerald-400/20"
                      >
                        <Play className="w-5 h-5" fill="currentColor" />
                        Start Reading
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      </motion.button>

                      <motion.button
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: "rgba(16, 185, 129, 0.1)",
                          borderColor: "rgba(16, 185, 129, 0.6)",
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="border-2 border-slate-600 hover:border-emerald-400 text-slate-200 hover:text-emerald-300 px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 backdrop-blur-sm"
                      >
                        <Film className="w-5 h-5" />
                        Explore Reviews
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Right Side - Enhanced Featured Film Poster */}
            <motion.div
              initial={{ opacity: 0, x: 50, rotateY: 15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
              className="hidden lg:block"
            >
              {isComplete && (
                <motion.div
                  className="relative group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Enhanced "Featured Review" Label */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, duration: 0.6 }}
                    className="absolute -top-6 left-4 z-20"
                  >
                    <div className="bg-slate-900 border border-emerald-400/30 text-emerald-300 px-4 py-2 rounded-t-lg text-sm font-semibold shadow-lg shadow-slate-900/50">
                      FEATURED REVIEW
                    </div>
                  </motion.div>

                  {/* Enhanced Movie Poster Card */}
                  <motion.div
                    className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-slate-700/50 hover:border-emerald-400/30 transition-all duration-500"
                    whileHover={{
                      y: -5,
                      boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    <div className="aspect-[3/4] relative overflow-hidden">
                      <motion.img
                        src={heroPosters[currentSlide].image}
                        alt={heroPosters[currentSlide].title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />

                      {/* Enhanced Rating Badge */}
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          delay: 2.2,
                          duration: 0.6,
                          ease: "backOut",
                        }}
                        className="absolute top-4 right-4"
                      >
                        <div className="flex items-center gap-1 bg-slate-900/80 backdrop-blur-sm text-white px-3 py-2 rounded-full border border-emerald-400/30 shadow-lg">
                          <Star className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                          <span className="font-bold text-sm text-emerald-300">
                            {heroPosters[currentSlide].rating}
                          </span>
                        </div>
                      </motion.div>

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                    </div>

                    {/* Enhanced Film Info */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2.4, duration: 0.6 }}
                      className="p-6 bg-slate-800/70 backdrop-blur-sm"
                    >
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors duration-300">
                        {heroPosters[currentSlide].title}
                      </h3>
                      <p className="text-slate-300 mb-3 leading-relaxed">
                        {heroPosters[currentSlide].subtitle}
                      </p>
                      <div className="flex items-center gap-3 text-sm text-slate-400">
                        <span className="text-emerald-400 font-medium">
                          {heroPosters[currentSlide].year}
                        </span>
                        <span>•</span>
                        <span>{heroPosters[currentSlide].genre}</span>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Enhanced Film Navigation Dots */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.6, duration: 0.6 }}
                    className="flex items-center justify-center gap-3 mt-6"
                  >
                    {heroPosters.map((_, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        whileHover={{ scale: 1.3 }}
                        whileTap={{ scale: 0.9 }}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentSlide
                            ? "bg-emerald-400 shadow-lg shadow-emerald-400/50"
                            : "bg-slate-600 hover:bg-slate-500"
                        }`}
                      />
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Mobile Hero Section - Enhanced with proper theme colors
const MobileHero = ({ heroPosters, currentSlide, setCurrentSlide }) => {
  const scriptText = `FADE IN:

A world where movies matter.
For cinephiles, by cinephiles.

THE CINÉPRISM`;

  const { displayText, isComplete } = useTypewriter(scriptText, 70);

  return (
    <section className="relative min-h-screen overflow-hidden pt-20 block md:hidden">
      {/* Dark Screenplay Paper Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
        {/* Paper texture - mobile optimized */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background: `
              linear-gradient(to bottom, 
                transparent 0px, 
                transparent 14px, 
                #64748b 14px, 
                #64748b 16px, 
                transparent 16px
              )
            `,
            backgroundSize: "100% 18px",
          }}
        />

        {/* 3-hole punch marks for mobile */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute left-6 top-0 bottom-0 w-3 flex flex-col justify-center gap-16"
        >
          <div className="w-3 h-3 bg-emerald-400 rounded-full opacity-60 shadow-md shadow-emerald-400/20"></div>
          <div className="w-3 h-3 bg-emerald-400 rounded-full opacity-60 shadow-md shadow-emerald-400/20"></div>
          <div className="w-3 h-3 bg-emerald-400 rounded-full opacity-60 shadow-md shadow-emerald-400/20"></div>
        </motion.div>

        {/* Mobile ambient effects */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              opacity: [0.03, 0.08, 0.03],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/3 left-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl transform -translate-x-1/2"
          />
        </div>
      </div>

      {/* Mobile Content */}
      <div className="relative z-20 min-h-screen flex items-center">
        <div className="max-w-lg mx-auto px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-left"
          >
            {/* Mobile Screenplay Format */}
            <div className="font-mono text-white text-sm leading-relaxed tracking-wide">
              {/* Scene Header */}
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="mb-6 text-xs text-emerald-400 uppercase tracking-wider font-semibold"
              >
                SCENE 001 - THE CINÉPRISM
              </motion.div>

              {/* Mobile Typewriter Text */}
              <div className="relative">
                <motion.pre
                  className="whitespace-pre-wrap text-slate-100 leading-7 text-sm font-light"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  {displayText}
                </motion.pre>
                {!isComplete && (
                  <motion.span
                    animate={{
                      opacity: [1, 1, 0, 0],
                      scaleY: [1, 1, 0.8, 0.8],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                    }}
                    className="inline-block w-0.5 h-5 bg-emerald-400 ml-1 shadow-sm shadow-emerald-400/50"
                  />
                )}
              </div>

              {/* Mobile Scene Direction */}
              <AnimatePresence>
                {isComplete && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    className="mt-6 italic text-slate-300 text-sm leading-relaxed"
                  >
                    <motion.p
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1, duration: 0.5 }}
                      className="mb-3"
                    >
                      Cinema for acquired taste.
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2, duration: 0.5 }}
                    >
                      Where every frame tells a story worth discovering.
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Mobile Action Buttons */}
              <AnimatePresence>
                {isComplete && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.4 }}
                    className="flex flex-col gap-3 mt-8"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-3 shadow-lg shadow-emerald-500/25 border border-emerald-400/20 transition-all duration-300"
                    >
                      <Play className="w-4 h-4" fill="currentColor" />
                      Start Reading
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="border-2 border-slate-600 hover:border-emerald-400 text-slate-200 hover:text-emerald-300 px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-3 backdrop-blur-sm transition-all duration-300"
                    >
                      <Film className="w-4 h-4" />
                      Explore Reviews
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Enhanced Mobile Featured Film Card */}
            {isComplete && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
                className="mt-8 bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-slate-700/50"
              >
                <div className="aspect-[16/9] relative overflow-hidden">
                  <motion.img
                    src={heroPosters[currentSlide].image}
                    alt={heroPosters[currentSlide].title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8 }}
                  />

                  <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 2, duration: 0.5, ease: "backOut" }}
                    className="absolute top-3 right-3"
                  >
                    <div className="flex items-center gap-1 bg-slate-900/80 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs border border-emerald-400/30">
                      <Star className="w-3 h-3 fill-emerald-400 text-emerald-400" />
                      <span className="font-bold text-emerald-300">
                        {heroPosters[currentSlide].rating}
                      </span>
                    </div>
                  </motion.div>

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.2, duration: 0.6 }}
                  className="p-4 bg-slate-800/70"
                >
                  <h3 className="font-bold text-white mb-1">
                    {heroPosters[currentSlide].title}
                  </h3>
                  <p className="text-slate-300 text-sm mb-2 leading-relaxed">
                    {heroPosters[currentSlide].subtitle}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="text-emerald-400 font-medium">
                      {heroPosters[currentSlide].year}
                    </span>
                    <span>•</span>
                    <span>{heroPosters[currentSlide].genre}</span>
                  </div>
                </motion.div>

                {/* Mobile Film Navigation */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.4, duration: 0.6 }}
                  className="flex items-center justify-center gap-2 pb-4"
                >
                  {heroPosters.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.8 }}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentSlide
                          ? "bg-emerald-400 shadow-md shadow-emerald-400/50"
                          : "bg-slate-600"
                      }`}
                    />
                  ))}
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { DesktopHero, MobileHero, useTypewriter };

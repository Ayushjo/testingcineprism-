import React from "react";


const FloatingCinemaParticles = () => {
  // Film Strip Particle Component
  const FilmStrip = ({ delay = 0, duration = 20, direction = "up" }) => (
    <motion.div
      className="absolute opacity-10"
      initial={{
        y: direction === "up" ? "100vh" : "-20vh",
        x: Math.random() * window.innerWidth,
      }}
      animate={{
        y: direction === "up" ? "-20vh" : "100vh",
        x: Math.random() * window.innerWidth * 0.3,
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {/* Film Strip SVG */}
      <svg
        width="16"
        height="40"
        viewBox="0 0 16 40"
        className="text-emerald-500/20"
      >
        <rect width="16" height="40" fill="currentColor" rx="1" />
        {/* Film perforations */}
        {[0, 8, 16, 24, 32].map((y) => (
          <rect
            key={y}
            x="2"
            y={y}
            width="3"
            height="3"
            fill="rgba(15, 23, 42, 0.8)"
            rx="1"
          />
        ))}
        {[0, 8, 16, 24, 32].map((y) => (
          <rect
            key={`r-${y}`}
            x="11"
            y={y}
            width="3"
            height="3"
            fill="rgba(15, 23, 42, 0.8)"
            rx="1"
          />
        ))}
      </svg>
    </motion.div>
  );

  // Cinema Star Particle Component
  const CinemaStar = ({ delay = 0, duration = 25, direction = "up" }) => (
    <motion.div
      className="absolute opacity-15"
      initial={{
        y: direction === "up" ? "100vh" : "-10vh",
        x: Math.random() * window.innerWidth,
        rotate: 0,
        scale: 0.5,
      }}
      animate={{
        y: direction === "up" ? "-10vh" : "100vh",
        x: Math.random() * window.innerWidth * 0.4,
        rotate: 360,
        scale: [0.5, 1, 0.5],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {/* 4-point star SVG */}
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        className="text-blue-400/25"
      >
        <path
          d="M6 0 L7.5 4.5 L12 6 L7.5 7.5 L6 12 L4.5 7.5 L0 6 L4.5 4.5 Z"
          fill="currentColor"
        />
      </svg>
    </motion.div>
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {/* Film Strip Particles */}
      <FilmStrip delay={0} duration={22} direction="up" />
      <FilmStrip delay={5} duration={25} direction="down" />
      <FilmStrip delay={10} duration={20} direction="up" />
      <FilmStrip delay={15} duration={23} direction="down" />

      {/* Cinema Star Particles */}
      <CinemaStar delay={2} duration={28} direction="up" />
      <CinemaStar delay={8} duration={24} direction="down" />
      <CinemaStar delay={12} duration={26} direction="up" />
      <CinemaStar delay={18} duration={22} direction="down" />
      <CinemaStar delay={22} duration={30} direction="up" />
    </div>
  );
};

export default FloatingCinemaParticles;

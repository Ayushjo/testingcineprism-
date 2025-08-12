"use client";
import { motion } from "framer-motion";

const RatingMeter = ({ category }) => {
  // Define the rating configurations with more elegant styling
  const ratingConfig = {
    LEAST_RECOMMENDED: {
      needleAngle: -50, // Points to red section (left)
      activeColor: "rgb(248 113 113)", // red-400 - softer red
      glowColor: "rgba(248, 113, 113, 0.3)",
    },
    RECOMMENDED: {
      needleAngle: 0, // Points to amber section (middle)
      activeColor: "rgb(251 191 36)", // amber-400 - warmer amber
      glowColor: "rgba(251, 191, 36, 0.3)",
    },
    HIGHLY_RECOMMENDED: {
      needleAngle: 50, // Points to emerald section (right)
      activeColor: "rgb(52 211 153)", // emerald-400 - matches site theme
      glowColor: "rgba(52, 211, 153, 0.3)",
    },
  };

  const config = ratingConfig[category] || ratingConfig.RECOMMENDED;

  return (
    <div className="relative w-20 h-10 flex items-end justify-center">
      {/* SVG Gauge with refined styling */}
      <svg viewBox="0 0 140 70" className="w-full h-full">
        {/* Subtle background glow */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Gradient for active section */}
          <linearGradient id="activeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              stopColor={config.activeColor}
              stopOpacity="0.8"
            />
            <stop offset="50%" stopColor={config.activeColor} stopOpacity="1" />
            <stop
              offset="100%"
              stopColor={config.activeColor}
              stopOpacity="0.8"
            />
          </linearGradient>
        </defs>

        {/* Background arc - more subtle */}
        <path
          d="M 20 55 A 50 50 0 0 1 120 55"
          fill="none"
          stroke="rgb(71 85 105)" // slate-600
          strokeWidth="6"
          strokeLinecap="round"
          className="opacity-20"
        />

        {/* Red section (Least Recommended) - refined */}
        <motion.path
          d="M 20 55 A 50 50 0 0 1 55 25"
          fill="none"
          stroke={
            category === "LEAST_RECOMMENDED"
              ? "url(#activeGradient)"
              : "rgb(248 113 113)"
          }
          strokeWidth="6"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={
            category === "LEAST_RECOMMENDED" ? "opacity-100" : "opacity-25"
          }
          filter={category === "LEAST_RECOMMENDED" ? "url(#glow)" : "none"}
        />

        {/* Amber section (Recommended) - refined */}
        <motion.path
          d="M 55 25 A 50 50 0 0 1 85 25"
          fill="none"
          stroke={
            category === "RECOMMENDED"
              ? "url(#activeGradient)"
              : "rgb(251 191 36)"
          }
          strokeWidth="6"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className={category === "RECOMMENDED" ? "opacity-100" : "opacity-25"}
          filter={category === "RECOMMENDED" ? "url(#glow)" : "none"}
        />

        {/* Emerald section (Highly Recommended) - refined */}
        <motion.path
          d="M 85 25 A 50 50 0 0 1 120 55"
          fill="none"
          stroke={
            category === "HIGHLY_RECOMMENDED"
              ? "url(#activeGradient)"
              : "rgb(52 211 153)"
          }
          strokeWidth="6"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className={
            category === "HIGHLY_RECOMMENDED" ? "opacity-100" : "opacity-25"
          }
          filter={category === "HIGHLY_RECOMMENDED" ? "url(#glow)" : "none"}
        />
      </svg>

      {/* Elegant needle design */}
      <motion.div
        className="absolute bottom-0 left-1/2"
        style={{ transformOrigin: "50% 100%" }}
        initial={{ rotate: 0, scale: 0 }}
        animate={{
          rotate: config.needleAngle,
          scale: 1,
        }}
        transition={{
          duration: 1.2,
          delay: 0.6,
          type: "spring",
          stiffness: 120,
          damping: 12,
        }}
      >
        {/* Simplified, elegant needle */}
        <div className="relative -translate-x-1/2">
          {/* Main needle body */}
          <div className="w-0.5 h-6 bg-gradient-to-t from-slate-400 to-slate-300 rounded-full shadow-lg" />

          {/* Needle tip */}
          <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-slate-300 rounded-full shadow-sm" />

          {/* Center pivot - clean and minimal */}
          <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-gradient-to-br from-slate-300 to-slate-400 rounded-full shadow-md border border-slate-500/30">
            <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white/40 rounded-full" />
          </div>
        </div>
      </motion.div>

      {/* Subtle active section glow effect */}
      {category && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(ellipse at center bottom, ${config.glowColor} 0%, transparent 70%)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        />
      )}
    </div>
  );
};

export default RatingMeter;

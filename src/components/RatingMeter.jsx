"use client";
import { motion } from "framer-motion";

const RatingMeter = ({ category }) => {
  const ratingConfig = {
    LEAST_RECOMMENDED: {
      needleAngle: -50,
      activeColor: "rgb(185 28 28)",
    },
    RECOMMENDED: {
      needleAngle: 0,
      activeColor: "rgb(180 83 9)",
    },
    HIGHLY_RECOMMENDED: {
      needleAngle: 50,
      activeColor: "rgb(5 150 105)",
    },
  };

  const config = ratingConfig[category] || ratingConfig.RECOMMENDED;

  return (
    <div className="relative w-20 h-10 flex items-end justify-center">
      {/* SVG Gauge */}
      <svg viewBox="0 0 140 70" className="w-full h-full overflow-visible">
        <defs>
          {/* Gradients */}
          <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(153 27 27)" />
            <stop offset="50%" stopColor="rgb(185 28 28)" />
            <stop offset="100%" stopColor="rgb(220 38 38)" />
          </linearGradient>

          <linearGradient id="yellowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(161 98 7)" />
            <stop offset="50%" stopColor="rgb(180 83 9)" />
            <stop offset="100%" stopColor="rgb(217 119 6)" />
          </linearGradient>

          <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(6 95 70)" />
            <stop offset="50%" stopColor="rgb(5 150 105)" />
            <stop offset="100%" stopColor="rgb(16 185 129)" />
          </linearGradient>

          <linearGradient id="activeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              stopColor={config.activeColor}
              stopOpacity="0.9"
            />
            <stop offset="50%" stopColor={config.activeColor} stopOpacity="1" />
            <stop
              offset="100%"
              stopColor={config.activeColor}
              stopOpacity="0.9"
            />
          </linearGradient>
        </defs>

        {/* Sections */}
        <motion.path
          d="M 20 55 A 50 50 0 0 1 55 25"
          fill="none"
          stroke={
            category === "LEAST_RECOMMENDED"
              ? "url(#activeGradient)"
              : "url(#redGradient)"
          }
          strokeWidth="8"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={
            category === "LEAST_RECOMMENDED" ? "opacity-100" : "opacity-40"
          }
        />

        <motion.path
          d="M 55 25 A 50 50 0 0 1 85 25"
          fill="none"
          stroke={
            category === "RECOMMENDED"
              ? "url(#activeGradient)"
              : "url(#yellowGradient)"
          }
          strokeWidth="8"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className={category === "RECOMMENDED" ? "opacity-100" : "opacity-40"}
        />

        <motion.path
          d="M 85 25 A 50 50 0 0 1 120 55"
          fill="none"
          stroke={
            category === "HIGHLY_RECOMMENDED"
              ? "url(#activeGradient)"
              : "url(#greenGradient)"
          }
          strokeWidth="8"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className={
            category === "HIGHLY_RECOMMENDED" ? "opacity-100" : "opacity-40"
          }
        />

        {/* Emoji icons */}
        <motion.circle
          cx="38"
          cy="48"
          r="10"
          fill="white"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className={
            category === "LEAST_RECOMMENDED" ? "opacity-100" : "opacity-60"
          }
        />
        <motion.text
          x="38"
          y="54"
          textAnchor="middle"
          fontSize="24"
          fontWeight="bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          😞
        </motion.text>

        <motion.circle
          cx="70"
          cy="25"
          r="10"
          fill="white"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className={category === "RECOMMENDED" ? "opacity-100" : "opacity-60"}
        />
        <motion.text
          x="70"
          y="31"
          textAnchor="middle"
          fontSize="24"
          fontWeight="bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          😐
        </motion.text>

        <motion.circle
          cx="102"
          cy="48"
          r="10"
          fill="white"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className={
            category === "HIGHLY_RECOMMENDED" ? "opacity-100" : "opacity-60"
          }
        />
        <motion.text
          x="102"
          y="54"
          textAnchor="middle"
          fontSize="24"
          fontWeight="bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          😊
        </motion.text>
      </svg>

      {/* Clean Needle */}
      <motion.div
        className="absolute bottom-0 left-1/2"
        style={{ transformOrigin: "50% 100%" }}
        initial={{ rotate: -90, scale: 0 }}
        animate={{ rotate: config.needleAngle, scale: 1 }}
        transition={{
          duration: 1.2,
          delay: 0.6,
          type: "spring",
          stiffness: 120,
          damping: 12,
        }}
      >
        <div className="relative -translate-x-1/2">
          {/* Sleek needle shaft */}
          <div className="w-0.5 h-7 bg-gradient-to-t from-gray-900 to-gray-500 rounded-full" />
          {/* Needle tip */}
          <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rounded-full" />
          {/* Needle base */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-gray-700 rounded-full border border-gray-900" />
        </div>
      </motion.div>
    </div>
  );
};

export default RatingMeter;

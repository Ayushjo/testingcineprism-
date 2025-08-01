"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function SaturnCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  // --- CHANGE: Increased all sizes for more presence ---
  const outerRadius = 16;
  const innerRadius = 4;
  const flareWidth = 32;

  return (
    <>
      {/* The Circular Boundary (Saturn's Ring) */}
      <motion.div
        // --- CHANGE: Added a larger, soft white shadow for a glow effect ---
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border border-white/30 shadow-lg shadow-white/10"
        style={{
          width: outerRadius * 2,
          height: outerRadius * 2,
          x: mousePosition.x - outerRadius,
          y: mousePosition.y - outerRadius,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 25 }}
      />

      {/* The Flare (The wider, fainter ring extension) */}
      <motion.div
        // --- CHANGE: Made flare wider and added a white drop-shadow for a glow ---
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-px w-16 bg-gradient-to-r from-transparent via-white/50 to-transparent drop-shadow-[0_0_4px_rgba(255,255,255,0.5)]"
        style={{
          x: mousePosition.x - flareWidth,
          y: mousePosition.y,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      />

      {/* The Inner Dot (Saturn's core) */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full bg-white"
        style={{
          width: innerRadius * 2,
          height: innerRadius * 2,
          x: mousePosition.x - innerRadius,
          y: mousePosition.y - innerRadius,
        }}
        transition={{ type: "spring", stiffness: 800, damping: 30 }}
      />
    </>
  );
}

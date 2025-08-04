"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function GradientCursor() {
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

  const cursorSize = 20; // Size of the main dot
  const glowSize = 150; // Size of the gradient glow

  return (
    <>
      {/* The Gradient Glow (the large, soft, trailing element) */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full"
        style={{
          x: mousePosition.x - glowSize / 2,
          y: mousePosition.y - glowSize / 2,
          width: glowSize,
          height: glowSize,
          // This gradient uses your site's emerald and indigo colors
          background:
            "radial-gradient(circle, rgba(16,185,129,0.3), rgba(79,70,229,0.2), transparent 70%)",
          filter: "blur(40px)",
        }}
        // The transition creates the smooth, delayed "follow" effect
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
      />

      {/* The Main Dot (the small, precise pointer) */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-white"
        style={{
          x: mousePosition.x - 4, // Center the dot
          y: mousePosition.y - 4,
        }}
        // This transition is very fast, so the dot feels responsive
        transition={{ type: "spring", stiffness: 800, damping: 30 }}
      />
    </>
  );
}

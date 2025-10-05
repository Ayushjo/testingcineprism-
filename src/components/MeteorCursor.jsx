"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function GradientCursor() {
  const { theme } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Function to check if device is desktop
    const checkIsDesktop = () => {
      // Check screen width (1024px and up) AND pointer type (fine for mouse)
      const hasLargeScreen = window.innerWidth >= 1024;
      const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
      return hasLargeScreen && hasFinePointer;
    };

    // Set initial state
    setIsDesktop(checkIsDesktop());

    // Update mouse position
    const updateMousePosition = (e) => {
      if (checkIsDesktop()) {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    // Handle resize events
    const handleResize = () => {
      setIsDesktop(checkIsDesktop());
    };

    // Add event listeners
    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("resize", handleResize);

    // Listen for pointer type changes (for hybrid devices)
    const pointerQuery = window.matchMedia("(pointer: fine)");
    pointerQuery.addEventListener("change", handleResize);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("resize", handleResize);
      pointerQuery.removeEventListener("change", handleResize);
    };
  }, []);

  // Don't render cursor on mobile/tablet or touch devices
  if (!isDesktop) {
    return null;
  }

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
          background:
            theme === "light"
              ? "radial-gradient(circle, rgba(0,0,0,0.08), rgba(75,85,99,0.06), transparent 70%)"
              : "radial-gradient(circle, rgba(16,185,129,0.3), rgba(79,70,229,0.2), transparent 70%)",
          filter: "blur(40px)",
        }}
        // The transition creates the smooth, delayed "follow" effect
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
      />

      {/* The Main Dot (the small, precise pointer) */}
      <motion.div
        className={`pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full ${
          theme === "light" ? "bg-black" : "bg-white"
        }`}
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

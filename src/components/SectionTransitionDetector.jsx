"use client";

import { useEffect, useState } from "react";

export default function SectionTransitionDetector({ onTransition }) {
  const [currentSection, setCurrentSection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollProgress = window.scrollY / window.innerHeight;
      const newSection = Math.floor(scrollProgress);
      const sectionProgress = scrollProgress - newSection;

      // Detect section transitions
      if (newSection !== currentSection && !isTransitioning) {
        setIsTransitioning(true);

        // Choose transition type based on section
        const transitionTypes = ["fade", "iris", "burn", "fade"];
        const transitionType =
          transitionTypes[newSection % transitionTypes.length];

        onTransition(newSection, transitionType);
        setCurrentSection(newSection);

        // End transition after animation
        setTimeout(() => {
          setIsTransitioning(false);
        }, 1000);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentSection, isTransitioning, onTransition]);

  return null;
}

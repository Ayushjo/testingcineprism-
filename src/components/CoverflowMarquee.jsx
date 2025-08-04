"use client";

import React, { useRef, Children, useEffect, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

// This is the individual card that will have the 3D effect
const Card = ({ movie }) => {
  const cardRef = useRef(null);
  const [viewportCenter, setViewportCenter] = useState(0);

  // Motion values to hold the card's state
  const offset = useMotionValue(0);

  // Update the viewport center on resize
  useEffect(() => {
    const updateCenter = () => setViewportCenter(window.innerWidth / 2);
    updateCenter();
    window.addEventListener("resize", updateCenter);
    return () => window.removeEventListener("resize", updateCenter);
  }, []);

  // On each animation frame, calculate the card's distance from the center
  useAnimationFrame(() => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cardCenter = rect.left + rect.width / 2;
    offset.set(cardCenter - viewportCenter);
  });

  // Map the offset (in pixels) to scale and rotation values
  const scale = useTransform(offset, [-300, 0, 300], [0.7, 1, 0.7]);
  const rotateY = useTransform(offset, [-300, 0, 300], [45, 0, -45]);

  return (
    <motion.div
      ref={cardRef}
      style={{
        scale,
        rotateY,
        transformPerspective: "1000px",
      }}
      className="w-48 flex-shrink-0 cursor-pointer group"
    >
      <div className="aspect-[2/3] relative rounded-2xl overflow-hidden shadow-2xl">
        <img
          alt={movie.title}
          src={movie.posterUrl.src ? movie.posterUrl.src : movie.posterUrl}
          effect="blur"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />
      </div>
    </motion.div>
  );
};

// This is the main container that drives the marquee
export default function CoverflowMarquee({ items, speed =50 }) {
  const marqueeRef = useRef(null);
  const isHovering = useRef(false);
  const x = useRef(0);

  useAnimationFrame((time, delta) => {
    if (!marqueeRef.current || isHovering.current) return;

    const moveBy = (delta / 1000) * speed;
    x.current -= moveBy;

    // Reset position for infinite loop
    if (x.current <= -marqueeRef.current.scrollWidth / 2) {
      x.current += marqueeRef.current.scrollWidth / 2;
    }

    marqueeRef.current.style.transform = `translateX(${x.current}px)`;
  });

  return (
    <section className="relative py-16 bg-slate-950 overflow-hidden">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-black text-white bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent tracking-tight">
          Trending
        </h2>
      </div>

      <div
        className="w-full"
        onMouseEnter={() => (isHovering.current = true)}
        onMouseLeave={() => (isHovering.current = false)}
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
        }}
      >
        <motion.div ref={marqueeRef} className="flex gap-8 w-max">
          {/* Render items twice for the seamless loop */}
          {items.map((item) => (
            <Card key={item.id} movie={item} />
          ))}
          {items.map((item) => (
            <Card key={`${item.id}-duplicate`} movie={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import React, { useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import OptimizedImage from "./OptimizedImage";

// This is the individual card that will have the 3D effect
const Card = ({ movie, index, totalItems, scrollXProgress }) => {
  // Create an input range based on the card's position in the array
  const inputRange = [
    (index - 1) / totalItems,
    index / totalItems,
    (index + 1) / totalItems,
  ];

  // Map the scroll progress to scale and rotation values
  const scale = useTransform(scrollXProgress, inputRange, [0.8, 1, 0.8]);
  const rotateY = useTransform(scrollXProgress, inputRange, [45, 0, -45]);

  return (
    <motion.div
      style={{
        scale,
        rotateY,
        transformPerspective: "1000px", // Enables the 3D effect
      }}
      className="w-48 flex-shrink-0 cursor-pointer group"
    >
      <div className="aspect-[2/3] relative rounded-2xl overflow-hidden shadow-2xl">
        <OptimizedImage
          alt={movie.title}
          src={movie.image? movie.image : movie.posterUrl}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />
      </div>
    </motion.div>
  );
};

// This is the main container component for the Coverflow effect
export default function Coverflow({ items }) {
  const carouselRef = useRef(null);
  const { scrollXProgress } = useScroll({ container: carouselRef });

  return (
    <section className="relative py-16 bg-slate-950">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-black text-white bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent tracking-tight">
          Trending
        </h2>
      </div>

      <div
        ref={carouselRef}
        className="overflow-x-scroll scrollbar-hide flex gap-8 px-[calc(50%-6rem)]" // This padding trick helps center the items
      >
        {items.map((item, index) => (
          <Card
            key={item.id}
            movie={item}
            index={index}
            totalItems={items.length}
            scrollXProgress={scrollXProgress}
          />
        ))}
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Star, Calendar, Tag, ArrowRight } from "lucide-react";
import MissionImpossibleImage from "../assets/missionimpossible.jpg";
import JohnWickImage from "../assets/JohnWick2.jpg";
import GladiatorImage from "../assets/gladiator.jpg";
const actionReviewsData = [
  {
    title: "John Wick: Chapter 4",
    year: 2023,
    genre: "Action, Thriller, Crime",
    rating: 7.8,
    image: {
      src: JohnWickImage,
    },
    review:
      "A breathtaking ballet of ballistics and brawls. This chapter elevates the franchise's signature action to an art form with stunning set pieces and relentless pacing.",
  },
  {
    title: "Mad Max: Fury Road",
    year: 2015,
    genre: "Action, Sci-Fi",
    rating: 8.1,
    image: {
      src: "https://image.tmdb.org/t/p/original/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg",
    },
    review:
      "A visceral, non-stop two-hour chase sequence that is a masterpiece of practical effects, world-building, and pure cinematic adrenaline.",
  },
  {
    title: "The Dark Knight",
    year: 2008,
    genre: "Action, Crime, Drama",
    rating: 9.0,
    image: {
      src: "https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    },
    review:
      "More than a superhero movie, it's a gripping crime saga featuring a legendary, Oscar-winning performance from Heath Ledger as the Joker.",
  },
  {
    title: "Top Gun: Maverick",
    year: 2022,
    genre: "Action, Drama",
    rating: 8.3,
    image: {
      src: "https://image.tmdb.org/t/p/original/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
    },
    review:
      "A stunning feat of aerial cinematography and heartfelt storytelling. This sequel surpasses the original with breathtaking practical stunts and emotional weight.",
  },
  {
    title: "Mission: Impossible - Fallout",
    year: 2018,
    genre: "Action, Adventure",
    rating: 7.9,
    image: {
      src: MissionImpossibleImage,
    },
    review:
      "Tom Cruise continues to defy age and physics in this spectacular entry, featuring some of the most intricate and daring stunt work ever put to film.",
  },
  {
    title: "Gladiator",
    year: 2000,
    genre: "Action, Drama, Adventure",
    rating: 8.5,
    image: {
      src: GladiatorImage,
    },
    review:
      "A powerful and epic tale of revenge and honor, anchored by a commanding performance from Russell Crowe and Ridley Scott's masterful direction.",
  },
];

export default function ActionPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white pt-20">
      {/* Section 1: Thematic Genre Header */}
      <section className="relative h-96 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
          }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Ambient Glow Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <span className="bg-white/10 backdrop-blur-xl text-red-400 px-4 py-2 rounded-2xl text-sm font-semibold border border-white/20">
                💥 Genre Collection
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl font-black text-white mb-6 bg-gradient-to-r from-white via-red-200 to-orange-300 bg-clip-text text-transparent tracking-tight"
            >
              Action
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
            >
              Heart-pounding thrills, explosive set pieces, and unforgettable
              heroes.
            </motion.p>
          </div>
        </div>

        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>
      </section>

      {/* Section 2: Reviews Grid */}
      <section className="py-24 relative">
        {/* Ambient Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(239,68,68,0.03),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(249,115,22,0.03),transparent_50%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {actionReviewsData.map((review, index) => (
              <motion.article
                key={review.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative h-96 rounded-2xl overflow-hidden shadow-2xl hover:shadow-red-500/20 transition-all duration-500 cursor-pointer"
                style={{
                  backgroundImage: `url(${
                    review.image.src || "/placeholder.svg?height=400&width=300"
                  })`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Background Image with Hover Effect */}
                <div
                  className="absolute inset-0 transition-transform duration-300 group-hover:scale-105"
                  style={{
                    backgroundImage: `url(${
                      review.image.src ||
                      "/placeholder.svg?height=400&width=300"
                    })`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />

                {/* Rating Badge - Top Right */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="flex items-center gap-1 bg-black/60 backdrop-blur-xl px-3 py-1.5 rounded-2xl border border-white/10">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white font-semibold text-sm">
                      {review.rating}
                    </span>
                  </div>
                </div>

                {/* Content - Bottom */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                  <h2 className="text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-red-300 transition-colors duration-300">
                    {review.title}
                  </h2>

                  <div className="flex items-center gap-4 text-sm text-slate-300 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{review.year}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Tag className="w-4 h-4" />
                      <span>{review.genre}</span>
                    </div>
                  </div>

                  <p className="text-slate-200 leading-relaxed mb-4 line-clamp-3 text-sm">
                    {review.review}
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className="group/btn inline-flex items-center gap-2 text-red-400 hover:text-red-300 font-semibold transition-all duration-300 self-start"
                  >
                    Read Full Review
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

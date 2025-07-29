"use client";

import { motion } from "framer-motion";
import { Star, TrendingUp } from "lucide-react";
import SpiderManIntoTheSpiderVerseImage from "../assets/spidermanintothespiderverse.webp";
const trendingData = [
  {
    id: 1,
    rank: "01",
    title: "Parasite",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    rating: 8.5,
    subtitle: "Most viewed this week",
  },
  {
    id: 2,
    rank: "02",
    title: "Oppenheimer",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    rating: 8.2,
    subtitle: "Most viewed this week",
  },
  {
    id: 3,
    rank: "03",
    title: "Interstellar",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    rating: 8.6,
    subtitle: "Most viewed this week",
  },
  {
    id: 4,
    rank: "04",
    title: "Dune: Part Two",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    rating: 8.8,
    subtitle: "Most viewed this week",
  },
  {
    id: 5,
    rank: "05",
    title: "The Dark Knight",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    rating: 9.0,
    subtitle: "Most viewed this week",
  },
  {
    id: 6,
    rank: "06",
    title: "Joker",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
    rating: 8.4,
    subtitle: "Most viewed this week",
  },
  {
    id: 7,
    rank: "07",
    title: "Spider-Man: Into the Spider-Verse",
    posterUrl:
      SpiderManIntoTheSpiderVerseImage,
    rating: 8.4,
    subtitle: "Most viewed this week",
  },
];

export default function TrendingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b pt-8 from-slate-950 to-slate-900 relative overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(139,92,246,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(16,185,129,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(236,72,153,0.03),transparent_50%)]" />
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute top-3/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"
        />
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative py-12">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-6">
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/5 backdrop-blur-xl text-purple-400 px-4 py-2 rounded-2xl text-sm font-semibold border border-white/10 flex items-center gap-2"
            >
              <TrendingUp className="w-4 h-4" />
              Hot Right Now
            </motion.span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent tracking-tight"
          >
            Trending This Week
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            The most popular reviews our community can't stop talking about
          </motion.p>
        </motion.div>

        {/* Trending List */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="space-y-4"
        >
          {trendingData.map((movie, index) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.02, x: 10 }}
              className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
            >
              <div className="flex items-center gap-6">
                {/* Rank Number */}
                <div className="flex-shrink-0">
                  <span className="text-6xl md:text-7xl font-black text-white/20 group-hover:text-purple-400/40 transition-colors duration-300 tracking-tighter">
                    {movie.rank}
                  </span>
                </div>

                {/* Movie Poster */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-24 md:w-20 md:h-30 rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={movie.posterUrl || "/placeholder.svg"}
                      alt={`${movie.title} poster`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Movie Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1 tracking-tight group-hover:text-purple-300 transition-colors duration-300">
                    {movie.title}
                  </h3>
                  <p className="text-slate-400 text-sm md:text-base">
                    {movie.subtitle}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex-shrink-0 flex items-center gap-2 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-2xl border border-white/10">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-white font-semibold text-sm md:text-base">
                    {movie.rating}
                  </span>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

              {/* Subtle Border Glow on Hover */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-purple-500/20 via-transparent to-emerald-500/20 blur-sm -z-10" />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Fade Effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 text-slate-500 text-sm">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-slate-500" />
            <span>Updated every hour</span>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-slate-500" />
          </div>
        </motion.div>
      </main>
    </div>
  );
}

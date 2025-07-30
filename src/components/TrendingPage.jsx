"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, TrendingUp } from "lucide-react";
import SpiderManImage from "../assets/spiderman.jpeg";
import DangalImage from "../assets/dangal.jpg";
import IdiotsImage from "../assets/3idiots.jpg";
import RRRImage from "../assets/rrr.jpg";
import ZNMDImage from "../assets/znmd.jpg";
import QueenImage from "../assets/queen.webp";
import BahubaliImage from "../assets/bahubali.webp";
import PushpaImage from "../assets/pushpa.webp";
import ArjunReddyImage from "../assets/arjunreddy.webp";
import EegaImage from "../assets/eega.webp";
import MagdheeraImage from "../assets/magdheera.webp";
import VikramImage from "../assets/vikram.webp";
import NinetySixImage from "../assets/96.webp";
import SuperDeluxeImage from "../assets/superdeluxe.webp";
import KaakaMuttaiImage from "../assets/kaakamuttai.webp";
import AsuranImage from "../assets/asuran.webp";
import OldBoyImage from "../assets/oldboy.webp";
import TrainToBusanImage from "../assets/traintobusan.webp";
import TheHandMaidenImage from "../assets/thehandmaiden.webp";
import BurningImage from "../assets/burning.webp";
// --- CHANGE 1: Added 'origin' property to each movie object ---
const trendingData = {
  hollywood: [
    {
      id: 1,
      rank: "01",
      title: "Oppenheimer",
      posterUrl:
        "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
      rating: 8.2,
      origin: "Hollywood",
    },
    {
      id: 2,
      rank: "02",
      title: "The Dark Knight",
      posterUrl:
        "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      rating: 9.0,
      origin: "Hollywood",
    },
    {
      id: 3,
      rank: "03",
      title: "Interstellar",
      posterUrl:
        "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      rating: 8.6,
      origin: "Hollywood",
    },
    {
      id: 4,
      rank: "04",
      title: "Dune: Part Two",
      posterUrl:
        "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
      rating: 8.8,
      origin: "Hollywood",
    },
    {
      id: 5,
      rank: "05",
      title: "Spider-Man: Into the Spider-Verse",
      posterUrl: SpiderManImage,
      rating: 8.4,
      origin: "Hollywood",
    },
  ],
  bollywood: [
    {
      id: 1,
      rank: "01",
      title: "RRR",
      posterUrl: RRRImage,
      rating: 8.8,
      origin: "Bollywood",
    },
    {
      id: 2,
      rank: "02",
      title: "3 Idiots",
      posterUrl: IdiotsImage,
      rating: 8.4,
      origin: "Bollywood",
    },
    {
      id: 3,
      rank: "03",
      title: "Dangal",
      posterUrl: DangalImage,
      rating: 8.3,
      origin: "Bollywood",
    },
    {
      id: 4,
      rank: "04",
      title: "Zindagi Na Milegi Dobara",
      posterUrl: ZNMDImage,
      rating: 8.1,
      origin: "Bollywood",
    },
    {
      id: 5,
      rank: "05",
      title: "Queen",
      posterUrl: QueenImage,
      rating: 8.2,
      origin: "Bollywood",
    },
  ],
  tollywood: [
    {
      id: 1,
      rank: "01",
      title: "Baahubali 2: The Conclusion",
      posterUrl: BahubaliImage,
      rating: 8.7,
      origin: "Tollywood",
    },
    {
      id: 2,
      rank: "02",
      title: "Pushpa: The Rise",
      posterUrl: PushpaImage,
      rating: 7.6,
      origin: "Tollywood",
    },
    {
      id: 3,
      rank: "03",
      title: "Arjun Reddy",
      posterUrl: ArjunReddyImage,
      rating: 8.1,
      origin: "Tollywood",
    },
    {
      id: 4,
      rank: "04",
      title: "Eega",
      posterUrl: EegaImage,
      rating: 7.7,
      origin: "Tollywood",
    },
    {
      id: 5,
      rank: "05",
      title: "Magadheera",
      posterUrl: MagdheeraImage,
      rating: 7.9,
      origin: "Tollywood",
    },
  ],
  kollywood: [
    {
      id: 1,
      rank: "01",
      title: "Vikram",
      posterUrl: VikramImage,
      rating: 8.4,
      origin: "Kollywood",
    },
    {
      id: 2,
      rank: "02",
      title: "96",
      posterUrl: NinetySixImage,
      rating: 8.5,
      origin: "Kollywood",
    },
    {
      id: 3,
      rank: "03",
      title: "Super Deluxe",
      posterUrl: SuperDeluxeImage,
      rating: 8.3,
      origin: "Kollywood",
    },
    {
      id: 4,
      rank: "04",
      title: "Kaaka Muttai",
      posterUrl: KaakaMuttaiImage,
      rating: 8.2,
      origin: "Kollywood",
    },
    {
      id: 5,
      rank: "05",
      title: "Asuran",
      posterUrl: AsuranImage,
      rating: 8.4,
      origin: "Kollywood",
    },
  ],
  korean: [
    {
      id: 1,
      rank: "01",
      title: "Parasite",
      posterUrl:
        "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
      rating: 8.5,
      origin: "Korean",
    },
    {
      id: 2,
      rank: "02",
      title: "Oldboy",
      posterUrl: OldBoyImage,
      rating: 8.4,
      origin: "Korean",
    },
    {
      id: 3,
      rank: "03",
      title: "Train to Busan",
      posterUrl: TrainToBusanImage,
      rating: 7.6,
      origin: "Korean",
    },
    {
      id: 4,
      rank: "04",
      title: "The Handmaiden",
      posterUrl: TheHandMaidenImage,
      rating: 8.1,
      origin: "Korean",
    },
    {
      id: 5,
      rank: "05",
      title: "Burning",
      posterUrl: BurningImage,
      rating: 7.5,
      origin: "Korean",
    },
  ],
};

const categories = [
  { id: "hollywood", name: "Hollywood", flag: "🇺🇸" },
  { id: "bollywood", name: "Bollywood", flag: "🇮🇳" },
  { id: "tollywood", name: "Tollywood", flag: "🎬" },
  { id: "kollywood", name: "Kollywood", flag: "🎭" },
  { id: "korean", name: "Korean", flag: "🇰🇷" },
];

export default function TrendingPage() {
  const [activeCategory, setActiveCategory] = useState("hollywood");

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

        {/* Category Selector */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
                activeCategory === category.id
                  ? "bg-purple-500/20 text-purple-300 border border-purple-400/30 shadow-lg shadow-purple-500/10"
                  : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20"
              }`}
            >
              <span className="text-lg">{category.flag}</span>
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Trending List */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4"
        >
          {trendingData[activeCategory].map((movie, index) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
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
                  {/* --- CHANGE 2: Displaying the new 'origin' property --- */}
                  <p className="text-slate-400 text-sm md:text-base">
                    {movie.origin}
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

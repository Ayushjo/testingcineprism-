import DuneImage from "../assets/Dune.jpg";
import InterstellarImage from "../assets/Interstellar.jpg";
import HowToLoseImage from "../assets/howtoloseaguys.jpg";
import OppenHeimerImage from "../assets/oppenheimer.jpg";
import OppenHeimerFireImage from "../assets/oppenheimerfire.jpg";
import FleabagImage2 from "../assets/fleebag2.jpg";
import PastLivesImage from "../assets/pastlives.jpg";
import SpiderManImage from "../assets/spiderman.jpg";
import BatmanImage from "../assets/batman.jpg";
import BladeRunnerImg from "../assets/bladerunner.jpg";
import DuneFanImage from "../assets/dunefan.jpg";
import SinnerImage from "../assets/sinners.jpg";
import TennetImage from "../assets/tennet.jpg";
import AliceImage from "../assets/alicedarling.jpg";
import DarkKnightImage from "../assets/darkknight.jpg";
import DunkKirkImage from "../assets/dunkirk.jpg";
import { motion } from "motion/react";
import { ThreeDMarquee } from "./ThreeDMarquee";
import { cn } from "@/lib/utils";

export default function FullscreenMarqueeHero() {
  const moviePosters = [
    DuneImage,
    InterstellarImage,
    HowToLoseImage,
    OppenHeimerImage,
    OppenHeimerFireImage,
    FleabagImage2,
    PastLivesImage,
    SpiderManImage,
    BatmanImage,
    BladeRunnerImg,
    DuneFanImage,
    SinnerImage,
    TennetImage,
    AliceImage,
    DarkKnightImage,
    DunkKirkImage,
  ];

  return (
    <section className="relative h-screen overflow-hidden pt-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* 3D Marquee Background - Full Screen */}
      <div className="absolute inset-0 z-0">
        <ThreeDMarquee images={moviePosters} className="h-full w-full" />
      </div>

      {/* Dark Overlay for Text Readability - Reduced opacity */}
      <div className="absolute inset-0 bg-slate-950/40 z-10" />

      {/* Subtle gradient overlay for depth - Much lighter */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-slate-950/30 z-15" />

      {/* Hero Content Overlay */}
      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 text-center">
          {/* Main Brand Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-8"
          >
            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="text-6xl md:text-8xl lg:text-9xl font-black leading-none tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent"
            >
              The Cinéprism
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="text-2xl md:text-3xl text-slate-300 tracking-wider leading-relaxed font-light"
            >
              Good films make your life better.
            </motion.p>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="inline-block"
            >
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl text-emerald-400 px-6 py-3 rounded-2xl text-sm font-medium border border-white/20 shadow-xl">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                Curating Cinema Since 2024
              </div>
            </motion.div>

            {/* Call to Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 backdrop-blur-xl"
              >
                Explore Reviews
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-2xl border border-white/20 backdrop-blur-xl transition-all duration-300"
              >
                Latest Articles
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
        </motion.div>
      </motion.div>

      {/* Ambient particles */}
      <div className="absolute inset-0 z-5">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </section>
  );
}

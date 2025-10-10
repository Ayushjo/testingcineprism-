import { motion } from "framer-motion";
import { useState } from "react";
import OptimizedImage from "./OptimizedImage";

// Your exact imports
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

// Utility function to merge classes
function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}

const GridLineHorizontal = ({ className, offset }) => {
  return (
    <div
      style={{
        "--background": "#ffffff",
        "--color": "rgba(255, 255, 255, 0.1)",
        "--height": "1px",
        "--width": "5px",
        "--fade-stop": "90%",
        "--offset": offset || "200px",
        "--color-dark": "rgba(255, 255, 255, 0.1)",
        maskComposite: "exclude",
      }}
      className={cn(
        "absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))]",
        "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className
      )}
    />
  );
};

const GridLineVertical = ({ className, offset }) => {
  return (
    <div
      style={{
        "--background": "#ffffff",
        "--color": "rgba(255, 255, 255, 0.1)",
        "--height": "5px",
        "--width": "1px",
        "--fade-stop": "90%",
        "--offset": offset || "150px",
        "--color-dark": "rgba(255, 255, 255, 0.1)",
        maskComposite: "exclude",
      }}
      className={cn(
        "absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)]",
        "bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className
      )}
    />
  );
};

export default function ThreeDPosterMarquee() {
  // All your movie poster images
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

  // Split the images array into 4 equal parts
  const chunkSize = Math.ceil(moviePosters.length / 4);
  const chunks = Array.from({ length: 4 }, (_, colIndex) => {
    const start = colIndex * chunkSize;
    return moviePosters.slice(start, start + chunkSize);
  });

  return (
    <section className="relative h-screen overflow-hidden pt-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Ambient Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(16,185,129,0.03),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(59,130,246,0.03),transparent_50%)]" />
      </div>

      {/* Hero Content - Brand Section */}
      <div className="relative z-30 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Brand Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-center lg:text-left space-y-8"
            >
              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-5xl md:text-7xl lg:text-6xl xl:text-7xl font-black leading-none tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent"
              >
                The Cinéprism
              </motion.h1>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="text-xl md:text-2xl text-slate-300 tracking-wider leading-relaxed"
              >
                Good films make your life better.
              </motion.p>

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="inline-block"
              >
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl text-emerald-400 px-6 py-3 rounded-2xl text-sm font-medium border border-white/20 shadow-xl">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  Curating Cinema Since 2024
                </div>
              </motion.div>

              {/* Call to Action */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center pt-8"
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-emerald-500/25"
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

            {/* Right Side - 3D Marquee */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative"
            >
              {/* 3D Poster Marquee */}
              <div className="mx-auto block h-[600px] overflow-hidden rounded-2xl max-sm:h-[400px]">
                <div className="flex size-full items-center justify-center">
                  <div className="size-[1200px] shrink-0 scale-50 sm:scale-75 lg:scale-90">
                    <div
                      style={{
                        transform:
                          "rotateX(55deg) rotateY(0deg) rotateZ(-45deg)",
                      }}
                      className="relative top-96 right-[50%] grid size-full origin-top-left grid-cols-4 gap-6 transform-3d"
                    >
                      {chunks.map((subarray, colIndex) => (
                        <motion.div
                          animate={{ y: colIndex % 2 === 0 ? 100 : -100 }}
                          transition={{
                            duration: colIndex % 2 === 0 ? 12 : 18,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                          }}
                          key={colIndex + "marquee"}
                          className="flex flex-col items-start gap-6"
                        >
                          <GridLineVertical className="-left-4" offset="80px" />
                          {subarray.map((image, imageIndex) => (
                            <div className="relative" key={imageIndex + image}>
                              <GridLineHorizontal
                                className="-top-4"
                                offset="20px"
                              />
                              <motion.div
                                whileHover={{
                                  y: -15,
                                  scale: 1.05,
                                  rotateY: 5,
                                }}
                                transition={{
                                  duration: 0.4,
                                  ease: "easeInOut",
                                }}
                                key={imageIndex + image}
                              >
                                <OptimizedImage
                                  src={image}
                                  alt={`Movie Poster ${imageIndex + 1}`}
                                  className="aspect-[2/3] w-32 rounded-xl object-cover ring-2 ring-white/10 hover:ring-emerald-400/30 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300"
                                  width={128}
                                  height={192}
                                />
                              </motion.div>
                            </div>
                          ))}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-slate-950/30 z-10" />
    </section>
  );
}

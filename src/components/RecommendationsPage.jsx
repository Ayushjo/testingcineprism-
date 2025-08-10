import React from "react";
import { motion,AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import SpiderManImage from "../assets/spiderman.jpg";
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
import AndhaDhunImage from "../assets/andhadhun.webp";
import GangsOfWaseypurImage from "../assets/gangsof.webp";
import KGFImage from "../assets/kgf.webp";
import TheIntouchablesImage from "../assets/intouchables.webp";
import PortraitOfALadyOnFire from "../assets/portraitofalady.webp";
import MoonLightImage from "../assets/moonlight.webp";
import LadyBirdImage from "../assets/ladybird.webp";
import AfterSunImage from "../assets/aftersun.jpg";
import TheFloridaProject from "../assets/thefloridaproject.webp";
import SpiritedAwayImage from "../assets/spiritedaway.jpg";
import YourNameImage from "../assets/yourname.webp";
import AkiraImage from "../assets/akira.webp";
import JJKImage from "../assets/jjk.webp";
import GhostInTheShellImage from "../assets/ghostintheshell.webp";
import FleabagImage from "../assets/fleebag.png";
import ChernobylMovie from "../assets/chernobyl.webp";
function getScoreColor(score) {
  if (score >= 90) return "emerald"; // Green
  if (score >= 80) return "amber"; // Yellow
  if (score >= 70) return "red"; // Red
  return "gray"; // Gray
}

// Get score color classes
function getScoreColorClasses(score) {
  const color = getScoreColor(score);
  return {
    border: `border-${color}-500/40`,
    bg: `bg-${color}-500/10`,
    text: `text-${color}-400`,
    shadow: `shadow-[0_0_30px_rgba(${
      color === "emerald"
        ? "16,185,129"
        : color === "amber"
        ? "245,158,11"
        : color === "red"
        ? "239,68,68"
        : "156,163,175"
    },0.2)]`,
    glow:
      color === "emerald"
        ? "shadow-emerald-500/20"
        : color === "amber"
        ? "shadow-amber-500/20"
        : color === "red"
        ? "shadow-red-500/20"
        : "shadow-gray-500/20",
  };
}

// Score Circle Component
function ScoreCircle({ total, hovered }) {
  const colorClasses = getScoreColorClasses(total);

  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      animate={{
        opacity: hovered ? 0 : 1,
        scale: hovered ? 0.85 : 1,
        rotateY: hovered ? 180 : 0,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`
        h-16 w-16 rounded-full border-2 backdrop-blur-sm 
        flex items-center justify-center relative
        ${colorClasses.border} ${colorClasses.bg} ${colorClasses.shadow}
      `}
    >
      {/* Inner glow ring */}
      <div
        className={`absolute inset-1 rounded-full border ${colorClasses.border} opacity-50`}
      />

      <span
        className={`text-xl font-black tracking-tight ${colorClasses.text}`}
      >
        {total}
      </span>

      {/* Subtle pulse animation for high scores */}
      {total >= 85 && (
        <motion.div
          className={`absolute inset-0 rounded-full border-2 ${colorClasses.border}`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      )}
    </motion.div>
  );
}

// Score Breakdown Component
function ScoreBreakdown({ breakdown, hovered, totalScore }) {
  const entries = Object.entries(breakdown).slice(0, 3);
  const colorClasses = getScoreColorClasses(totalScore);

  return (
    <AnimatePresence mode="wait">
      {hovered && (
        <motion.div
          key="breakdown"
          initial={{ opacity: 0, x: -10, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -10, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full"
        >
          <div className="space-y-2">
            {entries.map(([category, score], index) => {
              const itemColorClasses = getScoreColorClasses(score);
              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  className="flex items-center justify-between rounded-lg px-3 py-2 bg-slate-800/60 border border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/80 transition-colors duration-200"
                >
                  <span className="text-slate-300 text-sm font-medium capitalize">
                    {category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-bold text-sm ${itemColorClasses.text}`}
                    >
                      {score}
                    </span>
                    <div
                      className={`w-2 h-2 rounded-full ${itemColorClasses.bg} ${itemColorClasses.border}`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Enhanced Recommendation Card
function RecommendationCard({ movie }) {
  const [hovered, setHovered] = React.useState(false);
  const colorClasses = getScoreColorClasses(movie.score.total);

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex-shrink-0 w-44 sm:w-52 cursor-pointer group"
    >
      {/* Poster Container */}
      <div className="aspect-[2/3] mb-4 relative rounded-2xl overflow-hidden">
        <img
          src={
            typeof movie.poster === "string"
              ? movie.poster
              : "/placeholder.svg?height=300&width=200"
          }
          alt={movie.title}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
        />

        {/* Enhanced overlay effects */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Hover border glow */}
        <motion.div
          className={`absolute inset-0 rounded-2xl border-2 border-transparent`}
          animate={{
            borderColor: hovered
              ? `rgba(${
                  colorClasses.border.includes("emerald")
                    ? "16,185,129"
                    : colorClasses.border.includes("amber")
                    ? "245,158,11"
                    : colorClasses.border.includes("red")
                    ? "239,68,68"
                    : "156,163,175"
                }, 0.4)`
              : "transparent",
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Score badge in top right */}
        <div className="absolute top-3 right-3">
          <div
            className={`
            px-2 py-1 rounded-lg backdrop-blur-md border
            ${colorClasses.bg} ${colorClasses.border} ${colorClasses.shadow}
          `}
          >
            <span className={`text-xs font-bold ${colorClasses.text}`}>
              {movie.score.total}
            </span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="space-y-3">
        {/* Title */}
        <div className="min-h-[3.5rem] flex items-start">
          <h3 className="text-lg font-bold text-white leading-tight line-clamp-2 group-hover:text-slate-100 transition-colors duration-200">
            {movie.title}
          </h3>
        </div>

        {/* Score Section - Fixed Height Container */}
        <div className="h-20 flex items-center gap-4">
          {/* Score Circle */}
          <div className="flex-shrink-0">
            <ScoreCircle total={movie.score.total} hovered={hovered} />
          </div>

          {/* Score Info Area */}
          <div className="flex-1 min-w-0 h-full flex flex-col justify-center">
            {/* Breakdown (shows on hover) */}
            <ScoreBreakdown
              breakdown={movie.score.breakdown}
              hovered={hovered}
              totalScore={movie.score.total}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Updated recommendations data
const recommendationsData = {
  hindi: [
    {
      id: "h1",
      title: "3 Idiots",
      poster: IdiotsImage,
      score: { total: 92, breakdown: { Story: 95, Emotion: 90, Rewatch: 91 } },
    },
    {
      id: "h2",
      title: "Dangal",
      poster: DangalImage,
      score: { total: 90, breakdown: { Story: 92, Acting: 95, Impact: 88 } },
    },
    {
      id: "h3",
      title: "RRR",
      poster: RRRImage,
      score: {
        total: 94,
        breakdown: { Action: 98, Visuals: 95, Spectacle: 90 },
      },
    },
    {
      id: "h4",
      title: "Zindagi Na Milegi Dobara",
      poster: ZNMDImage,
      score: {
        total: 89,
        breakdown: { Chemistry: 94, Scenery: 92, Story: 82 },
      },
    },
    {
      id: "h5",
      title: "Andhadhun",
      poster: AndhaDhunImage,
      score: { total: 91, breakdown: { Twist: 98, Pacing: 90, Acting: 88 } },
    },
    {
      id: "h6",
      title: "Gangs of Wasseypur",
      poster: GangsOfWaseypurImage,
      score: {
        total: 93,
        breakdown: { Dialogue: 96, Grit: 95, Characters: 90 },
      },
    },
  ],
  southIndian: [
    {
      id: "s1",
      title: "Baahubali 2",
      poster: BahubaliImage,
      score: { total: 88, breakdown: { Visuals: 96, Scale: 92, Story: 78 } },
    },
    {
      id: "s2",
      title: "Vikram",
      poster: VikramImage,
      score: { total: 91, breakdown: { Action: 94, Pacing: 90, Style: 90 } },
    },
    {
      id: "s3",
      title: "K.G.F: Chapter 2",
      poster: KGFImage,
      score: { total: 89, breakdown: { Action: 95, Style: 92, Story: 80 } },
    },
    {
      id: "s4",
      title: "96",
      poster: NinetySixImage,
      score: {
        total: 92,
        breakdown: { Emotion: 98, Music: 95, Nostalgia: 90 },
      },
    },
    {
      id: "s5",
      title: "Pushpa: The Rise",
      poster: PushpaImage,
      score: { total: 85, breakdown: { Style: 94, Action: 88, Music: 82 } },
    },
    {
      id: "s6",
      title: "Asuran",
      poster: AsuranImage,
      score: { total: 90, breakdown: { Acting: 96, Impact: 92, Story: 85 } },
    },
  ],
  worldCinema: [
    {
      id: "w1",
      title: "Parasite",
      poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
      score: { total: 98, breakdown: { Script: 100, Tension: 98, Social: 97 } },
    },
    {
      id: "w2",
      title: "Oldboy",
      poster: OldBoyImage,
      score: { total: 93, breakdown: { Twist: 99, Style: 95, Impact: 90 } },
    },
    {
      id: "w3",
      title: "The Intouchables",
      poster: TheIntouchablesImage,
      score: { total: 91, breakdown: { Heart: 96, Humor: 92, Chemistry: 90 } },
    },
    {
      id: "w4",
      title: "Portrait of a Lady on Fire",
      poster: PortraitOfALadyOnFire,
      score: {
        total: 94,
        breakdown: { Visuals: 98, Romance: 95, Tension: 92 },
      },
    },
    {
      id: "w5",
      title: "Train to Busan",
      poster: TrainToBusanImage,
      score: { total: 87, breakdown: { Thrills: 94, Emotion: 88, Action: 85 } },
    },
  ],
  indieFilms: [
    {
      id: "i1",
      title: "Everything Everywhere All at Once",
      poster: "https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",
      score: {
        total: 95,
        breakdown: { Creativity: 100, Emotion: 94, Action: 92 },
      },
    },
    {
      id: "i2",
      title: "Moonlight",
      poster: MoonLightImage,
      score: {
        total: 92,
        breakdown: { Cinematography: 98, Acting: 95, Story: 89 },
      },
    },
    {
      id: "i3",
      title: "Lady Bird",
      poster: LadyBirdImage,
      score: { total: 88, breakdown: { Script: 94, Acting: 90, Heart: 85 } },
    },
    {
      id: "i4",
      title: "Aftersun",
      poster: AfterSunImage,
      score: {
        total: 90,
        breakdown: { Emotion: 96, Subtlety: 92, Acting: 88 },
      },
    },
    {
      id: "i5",
      title: "The Florida Project",
      poster: TheFloridaProject,
      score: { total: 87, breakdown: { Realism: 94, Visuals: 90, Acting: 85 } },
    },
  ],
  anime: [
    {
      id: "a1",
      title: "Spirited Away",
      poster: SpiritedAwayImage,
      score: {
        total: 96,
        breakdown: { Imagination: 100, Art: 98, Wonder: 95 },
      },
    },
    {
      id: "a2",
      title: "Your Name.",
      poster: YourNameImage,
      score: { total: 94, breakdown: { Visuals: 99, Emotion: 95, Music: 92 } },
    },
    {
      id: "a3",
      title: "Akira",
      poster: AkiraImage,
      score: { total: 91, breakdown: { Animation: 98, Impact: 92, Scale: 88 } },
    },
    {
      id: "a4",
      title: "Jujutsu Kaisen 0",
      poster: JJKImage,
      score: {
        total: 89,
        breakdown: { Action: 96, Animation: 92, Pacing: 85 },
      },
    },
    {
      id: "a5",
      title: "Ghost in the Shell",
      poster: GhostInTheShellImage,
      score: {
        total: 93,
        breakdown: { Philosophy: 98, Visuals: 95, Influence: 90 },
      },
    },
  ],
  tvShows: [
    {
      id: "t1",
      title: "Breaking Bad",
      poster: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
      score: {
        total: 99,
        breakdown: { Writing: 100, Tension: 99, Acting: 98 },
      },
    },
    {
      id: "t2",
      title: "Fleabag",
      poster: FleabagImage,
      score: { total: 95, breakdown: { Script: 98, Humor: 96, Emotion: 94 } },
    },
    {
      id: "t3",
      title: "Chernobyl",
      poster: ChernobylMovie,
      score: { total: 96, breakdown: { Tension: 98, Realism: 97, Impact: 95 } },
    },
    {
      id: "t4",
      title: "Arcane",
      poster: "https://image.tmdb.org/t/p/w500/fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg",
      score: { total: 97, breakdown: { Animation: 100, Story: 98, World: 95 } },
    },
  ],
};

// Updated genre display names mapping
const genreDisplayNames = {
  hindi: "Top in Hindi",
  southIndian: "Top in South Indian",
  worldCinema: "Top in World Cinema",
  indieFilms: "Top in Indie Films",
  anime: "Top in Anime",
  tvShows: "Top TV Shows",
};

export default function RecommendationsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white pt-20">
      {/* Ambient Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(16,185,129,0.03),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(139,92,246,0.03),transparent_50%)]" />
      </div>

      <div className="relative">
        {/* Section 1: Page Header */}
        <section className="py-16 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block mb-6">
                <span className="bg-white/5 backdrop-blur-xl text-emerald-400 px-4 py-2 rounded-2xl text-sm font-semibold border border-white/10">
                  🎬 Curated Collection
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent tracking-tight">
                Cinéprism Selects
              </h1>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Our top recommendations, curated for every taste.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Section 2: Genre Carousels */}
        <section className="pb-24">
          <div className="space-y-12">
            {Object.entries(recommendationsData).map(
              ([genreKey, movies], sectionIndex) => (
                <motion.div
                  key={genreKey}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                >
                  {/* Section Title */}
                  <div className="px-4 sm:px-6 lg:px-8 mb-6">
                    <div className="max-w-7xl mx-auto">
                      <h2 className="text-2xl md:text-3xl font-bold text-white">
                        {genreDisplayNames[genreKey]}
                      </h2>
                    </div>
                  </div>

                  {/* Horizontal Carousel */}
                  <div className="relative">
                    <div className="overflow-x-auto scrollbar-hide">
                      <div className="flex gap-6 px-4 sm:px-6 lg:px-8 pb-4">
                        <div className="flex gap-6 mx-auto max-w-7xl">
                          {movies.map((movie, movieIndex) => (
                            <motion.div
                              key={movie.id}
                              initial={{ opacity: 0, x: 50 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.6,
                                delay: sectionIndex * 0.1 + movieIndex * 0.05,
                              }}
                            >
                              <RecommendationCard movie={movie} />
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Fade edges for desktop */}
                    <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none" />
                    <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none" />
                  </div>
                </motion.div>
              )
            )}
          </div>
        </section>
      </div>

      {/* Custom scrollbar + line clamp styles */}
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
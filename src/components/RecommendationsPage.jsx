"use client";

import React from "react";
import RatingMeter from "./RatingMeter";
import { motion } from "framer-motion";

// Local asset imports
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

const recommendationsData = {
  hindi: [
    {
      id: "h1",
      title: "3 Idiots",
      poster: IdiotsImage,
      ratingCategory: "HIGHLY_RECOMMENDED",
    },
    {
      id: "h2",
      title: "Dangal",
      poster: DangalImage,
      ratingCategory: "HIGHLY_RECOMMENDED",
    },
    {
      id: "h3",
      title: "RRR",
      poster: RRRImage,
      ratingCategory: "HIGHLY_RECOMMENDED",
    },
    {
      id: "h4",
      title: "Zindagi Na Milegi Dobara",
      poster: ZNMDImage,
      ratingCategory: "RECOMMENDED",
    },
    {
      id: "h5",
      title: "Andhadhun",
      rating:67,
      poster: AndhaDhunImage,
      ratingCategory: "HIGHLY_RECOMMENDED",
    },
    {
      id: "h6",
      title: "Gangs of Wasseypur",
      poster: GangsOfWaseypurImage,
      ratingCategory: "HIGHLY_RECOMMENDED",
    },
  ],
  southIndian: [
    {
      id: "s1",
      title: "Baahubali 2",
      poster: BahubaliImage,
      ratingCategory: "RECOMMENDED",
    },
    {
      id: "s2",
      title: "Vikram",
      poster: VikramImage,
      ratingCategory: "HIGHLY_RECOMMENDED",
    },
    {
      id: "s3",
      title: "K.G.F: Chapter 2",
      poster: KGFImage,
      ratingCategory: "RECOMMENDED",
    },
    {
      id: "s4",
      title: "96",
      poster: NinetySixImage,
      ratingCategory: "HIGHLY_RECOMMENDED",
    },
    {
      id: "s5",
      title: "Pushpa: The Rise",
      poster: PushpaImage,
      ratingCategory: "RECOMMENDED",
    },
    {
      id: "s6",
      title: "Asuran",
      poster: AsuranImage,
      ratingCategory: "HIGHLY_RECOMMENDED",
    },
  ],
  worldCinema: [
    {
      id: "w1",
      title: "Parasite",
      poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
      ratingCategory: "HIGHLY_RECOMMENDED",
    },
    {
      id: "w2",
      title: "Oldboy",
      poster: OldBoyImage,
      ratingCategory: "HIGHLY_RECOMMENDED",
    },
    {
      id: "w3",
      title: "The Intouchables",
      poster: TheIntouchablesImage,
      ratingCategory: "HIGHLY_RECOMMENDED",
    },
    {
      id: "w4",
      title: "Portrait of a Lady on Fire",
      poster: PortraitOfALadyOnFire,
      ratingCategory: "HIGHLY_RECOMMENDED",
    },
    {
      id: "w5",
      title: "Train to Busan",
      poster: TrainToBusanImage,
      ratingCategory: "RECOMMENDED",
    },
  ],
  indieFilms: [
    {
      id: "i1",
      title: "Everything Everywhere All at Once",
      poster: "https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",
      ratingCategory: "HIGHLY_RECOMMENDED",
    },
    {
      id: "i2",
      title: "Moonlight",
      poster: MoonLightImage,
      ratingCategory: "HIGHLY_RECOMMENDED",
    },
    {
      id: "i3",
      title: "Lady Bird",
      poster: LadyBirdImage,
      ratingCategory: "RECOMMENDED",
    },
    {
      id: "i4",
      title: "Aftersun",
      poster: AfterSunImage,
      ratingCategory: "HIGHLY_RECOMMENDED",
    },
    {
      id: "i5",
      title: "The Florida Project",
      poster: TheFloridaProject,
      ratingCategory: "RECOMMENDED",
    },
  ],
  anime: [
    {
      id: "a1",
      title: "Spirited Away",
      poster: SpiritedAwayImage,
      ratingCategory: "HIGHLY_RECOMMENDED",
    },
    {
      id: "a2",
      title: "Your Name.",
      poster: YourNameImage,
      ratingCategory: "HIGHLY_RECOMMENDED",
    },
    {
      id: "a3",
      title: "Akira",
      poster: AkiraImage,
      ratingCategory: "HIGHLY_RECOMMENDED",
    },
    {
      id: "a4",
      title: "Jujutsu Kaisen 0",
      poster: JJKImage,
      ratingCategory: "RECOMMENDED",
    },
    {
      id: "a5",
      title: "Ghost in the Shell",
      poster: GhostInTheShellImage,
      ratingCategory: "HIGHLY_RECOMMENDED",
    },
  ],
  tvShows: [
    {
      id: "t1",
      title: "Breaking Bad",
      poster: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
      ratingCategory: "HIGHLY_RECOMMENDED",
    },
    {
      id: "t2",
      title: "Fleabag",
      poster: FleabagImage,
      ratingCategory: "HIGHLY_RECOMMENDED",
    },
    {
      id: "t3",
      title: "Chernobyl",
      poster: ChernobylMovie,
      ratingCategory: "HIGHLY_RECOMMENDED",
    },
    {
      id: "t4",
      title: "Arcane",
      poster: "https://image.tmdb.org/t/p/w500/fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg",
      ratingCategory: "HIGHLY_RECOMMENDED",
    },
  ],
};

// Genre display names mapping stays the same
const genreDisplayNames = {
  hindi: "Top in Hindi",
  southIndian: "Top in South Indian",
  worldCinema: "Top in World Cinema",
  indieFilms: "Top in Indie Films",
  anime: "Top in Anime",
  tvShows: "Top TV Shows",
};

function RecommendationCard({ movie }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="flex-shrink-0 w-40 sm:w-48 cursor-pointer group"
    >
      {/* Poster Image */}
      <div className="aspect-[2/3] mb-3 relative rounded-xl overflow-hidden">
        <img
          src={
            typeof movie.poster === "string"
              ? movie.poster
              : "/placeholder.svg?height=300&width=200"
          }
          alt={movie.title}
          className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
        />
        {/* Subtle overlay + border glow on hover */}
        <div className="absolute inset-0 pointer-events-none rounded-xl ring-0 group-hover:ring-1 ring-emerald-400/30 transition-all duration-300" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-90" />
      </div>

      {/* Text Content Below Image */}
      <div className="space-y-3">
        <div className="h-14 flex items-start">
          <h3 className="text-lg font-semibold text-white leading-tight line-clamp-2">
            {movie.title}
          </h3>
        </div>

        <div className="h-8 flex items-center justify-center">
          <RatingMeter category={movie.ratingCategory} rating={movie.rating} />
        </div>
      </div>
    </motion.div>
  );
}

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
                      <div className="flex gap-4 px-4 sm:px-6 lg:px-8 pb-4">
                        <div className="flex gap-4 mx-auto max-w-7xl">
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

      {/* Custom scrollbar + line clamp (scoped) */}
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


import { motion } from "framer-motion";
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
const recommendationsData = {
  hindi: [
    {
      id: "h1",
      title: "3 Idiots",
      rating: 8.4,
      poster: IdiotsImage,
    },
    {
      id: "h2",
      title: "Dangal",
      rating: 8.3,
      poster: DangalImage,
    },
    {
      id: "h3",
      title: "RRR",
      rating: 8.8,
      poster: RRRImage,
    },
    {
      id: "h4",
      title: "Zindagi Na Milegi Dobara",
      rating: 8.1,
      poster: ZNMDImage,
    },
    {
      id: "h5",
      title: "Andhadhun",
      rating: 8.2,
      poster: AndhaDhunImage,
    },
    {
      id: "h6",
      title: "Gangs of Wasseypur",
      rating: 8.4,
      poster: GangsOfWaseypurImage,
    },
  ],
  southIndian: [
    {
      id: "s1",
      title: "Baahubali 2",
      rating: 7.6,
      poster: BahubaliImage,
    },
    {
      id: "s2",
      title: "Vikram",
      rating: 8.4,
      poster: VikramImage,
    },
    {
      id: "s3",
      title: "K.G.F: Chapter 2",
      rating: 8.4,
      poster: KGFImage,
    },
    {
      id: "s4",
      title: "96",
      rating: 8.5,
      poster: NinetySixImage,
    },
    {
      id: "s5",
      title: "Pushpa: The Rise",
      rating: 7.6,
      poster: PushpaImage,
    },
    {
      id: "s6",
      title: "Asuran",
      rating: 8.4,
      poster: AsuranImage,
    },
  ],
  worldCinema: [
    {
      id: "w1",
      title: "Parasite",
      rating: 8.5,
      poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    },
    {
      id: "w2",
      title: "Oldboy",
      rating: 8.4,
      poster: OldBoyImage,
    },
    {
      id: "w3",
      title: "The Intouchables",
      rating: 8.5,
      poster: TheIntouchablesImage,
    },
    {
      id: "w4",
      title: "Portrait of a Lady on Fire",
      rating: 8.1,
      poster: PortraitOfALadyOnFire,
    },
    {
      id: "w5",
      title: "Train to Busan",
      rating: 7.6,
      poster: TrainToBusanImage,
    },
  ],
  indieFilms: [
    {
      id: "i1",
      title: "Everything Everywhere All at Once",
      rating: 8.0,
      poster: "https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",
    },
    {
      id: "i2",
      title: "Moonlight",
      rating: 7.2,
      poster: MoonLightImage,
    },
    {
      id: "i3",
      title: "Lady Bird",
      rating: 7.3,
      poster: LadyBirdImage,
    },
    {
      id: "i4",
      title: "Aftersun",
      rating: 7.7,
      poster: AfterSunImage,
    },
    {
      id: "i5",
      title: "The Florida Project",
      rating: 7.4,
      poster: TheFloridaProject,
    },
  ],
  anime: [
    {
      id: "a1",
      title: "Spirited Away",
      rating: 8.5,
      poster: SpiritedAwayImage,
    },
    {
      id: "a2",
      title: "Your Name.",
      rating: 8.5,
      poster: YourNameImage,
    },
    {
      id: "a3",
      title: "Akira",
      rating: 8.1,
      poster: AkiraImage,
    },
    {
      id: "a4",
      title: "Jujutsu Kaisen 0",
      rating: 7.8,
      poster: JJKImage,
    },
    {
      id: "a5",
      title: "Ghost in the Shell",
      rating: 7.9,
      poster:GhostInTheShellImage,
    },
  ],
  tvShows: [
    {
      id: "t1",
      title: "Breaking Bad",
      rating: 9.5,
      poster: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
    },
    {
      id: "t2",
      title: "Fleabag",
      rating: 8.2,
      poster: FleabagImage,
    },
    {
      id: "t3",
      title: "Chernobyl",
      rating: 8.6,
      poster: ChernobylMovie,
    },
    {
      id: "t4",
      title: "Arcane",
      rating: 8.7,
      poster: "https://image.tmdb.org/t/p/w500/fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg",
    },
  ],
};

// Genre display names mapping
const genreDisplayNames = {
  hindi: "Top in Hindi",
  southIndian: "Top in South Indian",
  worldCinema: "Top in World Cinema",
  indieFilms: "Top in Indie Films",
  anime: "Top in Anime",
  tvShows: "Top TV Shows",
};

// Recommendation Card Component
const RecommendationCard = ({ movie }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="flex-shrink-0 w-40 sm:w-48 cursor-pointer"
    >
      {/* Poster Image */}
      <div className="aspect-[2/3] mb-3">
        <img
          src={movie.poster || "/placeholder.svg?height=300&width=200"}
          alt={movie.title}
          className="w-full h-full object-cover rounded-xl shadow-lg"
        />
      </div>

      {/* --- CHANGE: The text container is now a flex column with a fixed height --- */}
      <div className="flex flex-col justify-between h-[72px]">
        {/* The title no longer needs flex-grow */}
        <h3 className="text-lg font-medium text-white leading-tight line-clamp-2">
          {movie.title}
        </h3>

        {/* This is now pushed to the bottom of the h-20 container */}
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current flex-shrink-0" />
          <span className="text-sm text-slate-400">{movie.rating}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default function RecommendationsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white pt-20">
      {/* Ambient Background */}
      <div className="absolute inset-0 opacity-20">
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

      {/* Custom scrollbar styles */}
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

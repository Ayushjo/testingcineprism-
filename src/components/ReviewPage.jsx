"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Calendar, Tag, Search, Filter, ArrowRight } from "lucide-react";
import InterstellarImage from "../assets/Interstellar.jpg";
import HowToLoseImage from "../assets/howtoloseaguys.jpg";
import OppenHeimerImage from "../assets/oppenheimer.jpg";
import FleabagImage2 from "../assets/fleebag2.jpg";
import DuneImage from "../assets/Dune.jpg";
import BladeRunnerImg from "../assets/bladerunner.jpg";
import SpiderManImage from "../assets/spiderman.jpeg";
import BatmanImage from "../assets/batman.jpg";
import ArrivalImage from "../assets/arrival.jpg";
import JohnWickImage from "../assets/JohnWick2.jpg";

const reviews = [
  {
    title: "Arrival",
    year: 2016,
    genre: "Sci-Fi, Drama",
    rating: 8.3,
    image: ArrivalImage,
    review:
      "Denis Villeneuve's *Arrival* is a masterclass in emotional storytelling within the sci-fi genre. The film balances intelligent alien-contact concepts with deeply human themes of loss, communication, and destiny. Amy Adams delivers a hauntingly powerful performance, and Jóhann Jóhannsson's score elevates the atmosphere to a whole new level. This isn't your typical alien movie—it's a meditation on time, language, and the choices we make.",
  },
  {
    title: "Blade Runner 2049",
    year: 2017,
    genre: "Sci-Fi, Action",
    rating: 8.0,
    image: BladeRunnerImg,
    review:
      "*Blade Runner 2049* is a visual symphony and a philosophical triumph. The cinematography by Roger Deakins is spellbinding, creating a bleak yet beautiful dystopia. Ryan Gosling anchors the narrative with restraint, and Harrison Ford's return adds depth. This sequel not only respects Ridley Scott's original but expands on its themes of identity, humanity, and reality. A slow-burn epic that rewards patience.",
  },
  {
    title: "Fleabag",
    year: 2016,
    genre: "Drama, Comedy",
    rating: 9.0,
    image: FleabagImage2,
    review:
      "Phoebe Waller-Bridge's *Fleabag* is a groundbreaking series that blends dark humor, raw emotion, and fourth-wall-breaking brilliance. With biting wit and vulnerability, the show delves into grief, guilt, and self-worth in a way few series dare to. Each episode peels back another layer of the protagonist's psyche, leaving you laughing one moment and gutted the next. It's comedy—and storytelling—at its most fearless.",
  },
  {
    title: "How to Lose a Guy in 10 Days",
    year: 2003,
    genre: "Romantic Comedy",
    rating: 6.4,
    image: HowToLoseImage,
    review:
      "*How to Lose a Guy in 10 Days* is a quintessential early-2000s rom-com. Kate Hudson and Matthew McConaughey have undeniable chemistry that fuels the film's charm. The plot is delightfully ridiculous but manages to find genuine moments of warmth and humor. While predictable, its vibrant energy, memorable outfits, and classic 'love vs. bet' trope make it an entertaining comfort watch.",
  },
  {
    title: "Interstellar",
    year: 2014,
    genre: "Sci-Fi, Drama",
    rating: 8.6,
    image: InterstellarImage,
    review:
      "Christopher Nolan's *Interstellar* is a visually stunning and emotionally resonant exploration of time, space, and love. The film dives into complex scientific concepts like relativity and wormholes while grounding the story in a father's desperate journey to save humanity and reconnect with his daughter. Hans Zimmer's score is transcendent, and the visuals—especially the black hole—are awe-inspiring. A cinematic experience that lingers in your mind.",
  },
  {
    title: "Spiderman: No Way Home",
    year: 2021,
    genre: "Action, Superhero",
    rating: 8.4,
    image: SpiderManImage,
    review:
      "*Spiderman: No Way Home* is both a fan-service juggernaut and an emotional rollercoaster. It unites generations of Spider-Men while giving Tom Holland's Peter Parker a rich and transformative arc. The film masterfully blends action, humor, and heartbreak, solidifying its place as one of the best superhero films in recent memory. An unforgettable love letter to Spidey fans.",
  },
  {
    title: "Dune: Part One",
    year: 2021,
    genre: "Sci-Fi, Adventure",
    rating: 8.1,
    image: DuneImage,
    review:
      "Denis Villeneuve's *Dune* is a monumental adaptation of Frank Herbert's dense novel. With a hypnotic score by Hans Zimmer and stunning visuals, the film creates a believable alien world rich in culture and politics. Timothée Chalamet leads an ensemble cast with subtle strength. While it's only the first half of the story, it lays an epic foundation that leaves you wanting more.",
  },
  {
    title: "John Wick",
    year: 2014,
    genre: "Action, Crime",
    rating: 7.4,
    image: JohnWickImage,
    review:
      "*John Wick* reinvigorated action cinema with its sleek style and brutal choreography. Keanu Reeves' stoic, grieving assassin is iconic, and the film's \"gun-fu\" combat scenes are meticulously crafted. More than just a revenge thriller, it builds a compelling underworld mythology that would grow with each sequel. It's fast-paced, tightly directed, and endlessly watchable.",
  },
  {
    title: "Batman Begins",
    year: 2005,
    genre: "Action, Superhero",
    rating: 8.2,
    image: BatmanImage,
    review:
      "With *Batman Begins*, Christopher Nolan redefined the superhero genre, grounding Gotham's vigilante in psychological realism. Christian Bale's brooding portrayal, paired with a strong supporting cast and Hans Zimmer's intense score, delivers a rich origin story. It's a mature, layered take that paves the way for one of cinema's greatest trilogies.",
  },
];

export default function ReviewPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortBy, setSortBy] = useState("rating");

  // Get unique genres
  const genres = [
    "All",
    ...new Set(reviews.flatMap((review) => review.genre.split(", "))),
  ];

  // Filter and sort reviews
  const filteredReviews = reviews
    .filter(
      (review) =>
        review.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedGenre === "All" || review.genre.includes(selectedGenre))
    )
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "year") return b.year - a.year;
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return 0;
    });

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-20">
      {/* Ambient Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(16,185,129,0.03),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(139,92,246,0.03),transparent_50%)]" />
      </div>

      {/* Header Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-block mb-6">
              <span className="bg-white/5 backdrop-blur-xl text-emerald-400 px-4 py-2 rounded-2xl text-sm font-semibold border border-white/10">
                📝 All Reviews
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent tracking-tight">
              Reviews
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Our complete collection of honest takes, sharp insights, and
              cinematic deep dives
            </p>
          </motion.div>

          {/* Search and Filter Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col md:flex-row gap-4 mb-12"
          >
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400/50 focus:bg-white/10 transition-all duration-300"
              />
            </div>

            {/* Genre Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="pl-12 pr-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-white focus:outline-none focus:border-emerald-400/50 focus:bg-white/10 transition-all duration-300 appearance-none cursor-pointer"
              >
                {genres.map((genre) => (
                  <option key={genre} value={genre} className="bg-slate-900">
                    {genre}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-6 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-white focus:outline-none focus:border-emerald-400/50 focus:bg-white/10 transition-all duration-300 appearance-none cursor-pointer"
              >
                <option value="rating" className="bg-slate-900">
                  Highest Rated
                </option>
                <option value="year" className="bg-slate-900">
                  Newest First
                </option>
                <option value="title" className="bg-slate-900">
                  A-Z
                </option>
              </select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="pb-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredReviews.map((review, index) => (
              // --- START: NEW FULL-BLEED CARD ---
              <motion.article
                key={review.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative aspect-[4/3] rounded-3xl overflow-hidden"
              >
                {/* Use a dedicated img tag for the background. This is more reliable. */}
                <img
                  src={review.image}
                  alt={review.title}
                  className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                    review.title === "Arrival" ? "object-[100%_center]" : ""
                  }`}
                />

                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Rating Badge (Top Right) */}
                <div className="absolute top-6 right-6">
                  <div className="flex items-center gap-1 bg-black/60 backdrop-blur-xl px-3 py-1.5 rounded-2xl border border-white/10">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white font-semibold text-sm">
                      {review.rating}
                    </span>
                  </div>
                </div>

                {/* Content Container */}
                <div className="relative h-full flex flex-col justify-end p-8">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-emerald-300 transition-colors duration-300">
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
                    <p className="text-slate-300 leading-relaxed mb-6 line-clamp-2">
                      {review.review}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      className="group/btn inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold transition-all duration-300"
                    >
                      Read Full Review
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>
                </div>
              </motion.article>
              // --- END: NEW FULL-BLEED CARD ---
            ))}
          </div>

          {/* No Results Message */}
          {filteredReviews.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 max-w-md mx-auto">
                <h3 className="text-2xl font-bold text-white mb-4">
                  No reviews found
                </h3>
                <p className="text-slate-400 mb-6">
                  Try adjusting your search terms or filters to find what you're
                  looking for.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedGenre("All");
                  }}
                  className="bg-gradient-to-r from-emerald-500/80 to-teal-600/80 hover:from-emerald-500 hover:to-teal-600 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300"
                >
                  Clear Filters
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}

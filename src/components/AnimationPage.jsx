"use client";

import { motion } from "framer-motion";
import { Star, Calendar, Tag, ArrowRight } from "lucide-react";
import SpiderManIntoTheSpiderVerseImage from "../assets/spidermanintothespiderverse.webp";
import SpiritedAwayImage from "../assets/spiritedaway.jpg";
import KlausImage from "../assets/klaus.png";
import WallEImage from "../assets/walle.jpg";
const animationReviewsData = [
  {
    title: "Spider-Man: Into the Spider-Verse",
    year: 2018,
    genre: "Animation, Action, Adventure",
    rating: 8.4,
    image: {
      src: SpiderManIntoTheSpiderVerseImage,
    },
    review:
      "A visually groundbreaking masterpiece that redefined what's possible in animated filmmaking, with a heartfelt story and incredible style.",
  },
  {
    title: "Spirited Away",
    year: 2001,
    genre: "Animation, Family, Fantasy",
    rating: 8.5,
    image: {
      src: SpiritedAwayImage,
    },
    review:
      "Hayao Miyazaki's magnum opus is a breathtakingly imaginative and enchanting journey into a world of spirits, gods, and monsters.",
  },
  {
    title: "Arcane",
    year: 2021,
    genre: "Animation, Sci-Fi, Action",
    rating: 9.0,
    image: {
      src: "https://image.tmdb.org/t/p/original/fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg",
    },
    review:
      "A landmark in television animation, with a mature, emotionally complex story and a stunning, painterly art style that sets a new standard.",
  },
  {
    title: "Klaus",
    year: 2019,
    genre: "Animation, Family, Comedy",
    rating: 8.2,
    image: {
      src: KlausImage,
    },
    review:
      "A heartwarming and visually innovative take on the Santa Claus origin story, featuring gorgeous traditional animation and lighting.",
  },
  {
    title: "Your Name.",
    year: 2016,
    genre: "Animation, Romance, Drama",
    rating: 8.5,
    image: {
      src: "https://image.tmdb.org/t/p/original/q719jXXEzOoYaps6babgKnONONX.jpg",
    },
    review:
      "A beautifully animated and emotionally powerful film that blends teen romance with sci-fi and fantasy elements to stunning effect.",
  },
  {
    title: "WALL·E",
    year: 2008,
    genre: "Animation, Family, Sci-Fi",
    rating: 8.1,
    image: {
      src: WallEImage,
    },
    review:
      "A remarkable achievement in storytelling, conveying deep emotion and a powerful message with minimal dialogue, led by an unforgettable robot protagonist.",
  },
];

export default function AnimationPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white pt-20">
      {/* Section 1: Thematic Genre Header */}
      <section className="relative h-96 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
          }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Ambient Glow Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
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
              <span className="bg-white/10 backdrop-blur-xl text-purple-400 px-4 py-2 rounded-2xl text-sm font-semibold border border-white/20">
                🎨 Genre Collection
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl font-black text-white mb-6 bg-gradient-to-r from-white via-purple-200 to-violet-300 bg-clip-text text-transparent tracking-tight"
            >
              Animation
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
            >
              Beyond reality. Stories brought to life through artistry and
              imagination.
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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(147,51,234,0.03),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(139,92,246,0.03),transparent_50%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {animationReviewsData.map((review, index) => (
              <motion.article
                key={review.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative h-96 rounded-2xl overflow-hidden shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 cursor-pointer"
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
                  <h2 className="text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-purple-300 transition-colors duration-300">
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
                    className="group/btn inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold transition-all duration-300 self-start"
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

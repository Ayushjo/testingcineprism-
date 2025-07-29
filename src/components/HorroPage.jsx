"use client";

import { motion } from "framer-motion";
import { Star, Calendar, Tag, ArrowRight } from "lucide-react";
import HereditaryImage from "../assets/herediatry.jpg";
import GetOutImage from "../assets/getout.jpg";
import TheShiningImage from "../assets/theshining.jpg";
import TheConjuringImage from "../assets/theconjuring.jpg";
const horrorReviewsData = [
  {
    title: "Hereditary",
    year: 2018,
    genre: "Horror, Drama, Mystery",
    rating: 7.2,
    image: {
      src: HereditaryImage,
    },
    review:
      "A deeply unsettling and masterfully crafted horror film that burrows under your skin with its exploration of grief and terrifying family secrets.",
  },
  {
    title: "Get Out",
    year: 2017,
    genre: "Horror, Thriller, Mystery",
    rating: 7.6,
    image: {
      src: GetOutImage,
    },
    review:
      "Jordan Peele's directorial debut is a brilliant and sharp social thriller that is as thought-provoking as it is terrifying.",
  },
  {
    title: "The Shining",
    year: 1980,
    genre: "Horror, Thriller",
    rating: 8.2,
    image: {
      src: TheShiningImage,
    },
    review:
      "Stanley Kubrick's iconic adaptation is a masterpiece of atmospheric horror, creating a palpable sense of dread and psychological decay.",
  },
  {
    title: "A Quiet Place",
    year: 2018,
    genre: "Horror, Sci-Fi, Thriller",
    rating: 7.4,
    image: {
      src: "https://image.tmdb.org/t/p/original/nAU74GmpUk7t5iklEp3bufwDq4n.jpg",
    },
    review:
      "A stunningly effective and innovative horror film that uses sound—and the lack thereof—to create unbearable, edge-of-your-seat tension.",
  },
  {
    title: "The Conjuring",
    year: 2013,
    genre: "Horror, Thriller",
    rating: 7.5,
    image: {
      src: TheConjuringImage,
    },
    review:
      "James Wan directs a modern horror classic, expertly using classic ghost story tropes to deliver genuine, well-earned scares.",
  },
  {
    title: "It (2017)",
    year: 2017,
    genre: "Horror, Adventure",
    rating: 7.2,
    image: {
      src: "https://image.tmdb.org/t/p/original/9E2y5Q7WlCVNEhP5GiVTjhEhx1o.jpg",
    },
    review:
      "A terrifying and heartfelt adaptation of Stephen King's novel, blending coming-of-age charm with nightmarish imagery led by Bill Skarsgård's chilling Pennywise.",
  },
];

export default function HorrorPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white pt-20">
      {/* Section 1: Thematic Genre Header */}
      <section className="relative h-96 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1520637836862-4d197d17c90a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
          }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Ambient Glow Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/15 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-800/20 rounded-full blur-3xl" />
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
                👻 Genre Collection
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl font-black text-white mb-6 bg-gradient-to-r from-white via-red-200 to-gray-400 bg-clip-text text-transparent tracking-tight"
            >
              Horror
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
            >
              Unforgettable frights, chilling atmospheres, and stories that
              haunt your dreams.
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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(220,38,38,0.04),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(75,85,99,0.04),transparent_50%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {horrorReviewsData.map((review, index) => (
              <motion.article
                key={review.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative h-96 rounded-2xl overflow-hidden shadow-2xl hover:shadow-red-600/20 transition-all duration-500 cursor-pointer"
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

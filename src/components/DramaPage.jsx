"use client";
import { Star, Calendar, Tag, ArrowRight } from "lucide-react";
import GoodWillHuntingImage from "../assets/goodwillhunting.jpg";
import ForestGumpImage from "../assets/forestgump.jpg";
import NomadLandImage from "../assets/nomadland.jpg";
import ManchesterByTheSea from "../assets/manchesterbythesea.jpg";
const dramaReviewsData = [
  {
    title: "The Shawshank Redemption",
    year: 1994,
    genre: "Drama, Crime",
    rating: 9.3,
    image: {
      src: "https://image.tmdb.org/t/p/original/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    },
    review:
      "A powerful and uplifting story of hope and friendship against all odds, widely regarded as one of the greatest films ever made.",
  },
  {
    title: "The Godfather",
    year: 1972,
    genre: "Drama, Crime",
    rating: 9.2,
    image: {
      src: "https://image.tmdb.org/t/p/original/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    },
    review:
      "Francis Ford Coppola's epic is a masterwork of filmmaking, featuring iconic performances and a rich, complex narrative of family, power, and betrayal.",
  },
  {
    title: "Forrest Gump",
    year: 1994,
    genre: "Drama, Comedy, Romance",
    rating: 8.8,
    image: {
      src: ForestGumpImage,
    },
    review:
      "A heartfelt and sweeping journey through American history, carried by a truly unforgettable performance from Tom Hanks.",
  },
  {
    title: "Good Will Hunting",
    year: 1997,
    genre: "Drama",
    rating: 8.1,
    image: {
      src: GoodWillHuntingImage,
    },
    review:
      "An emotionally intelligent film with a brilliant, Oscar-winning script and powerful performances from Robin Williams and Matt Damon.",
  },
  {
    title: "Nomadland",
    year: 2020,
    genre: "Drama",
    rating: 7.3,
    image: {
      src: NomadLandImage,
    },
    review:
      "A quiet, contemplative, and beautiful portrait of life on the margins of American society, featuring a stunning central performance by Frances McDormand.",
  },
  {
    title: "Manchester by the Sea",
    year: 2016,
    genre: "Drama",
    rating: 7.5,
    image: {
      src: ManchesterByTheSea,
    },
    review:
      "A profoundly moving and unflinching exploration of grief, anchored by an Oscar-winning performance from Casey Affleck.",
  },
];

export default function DramaPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white pt-20">
      {/* Section 1: Thematic Genre Header */}
      <section className="relative h-96 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
          }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Ambient Glow Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl" />
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
              <span className="bg-white/10 backdrop-blur-xl text-amber-400 px-4 py-2 rounded-2xl text-sm font-semibold border border-white/20">
                🎭 Genre Collection
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl font-black text-white mb-6 bg-gradient-to-r from-white via-amber-200 to-rose-300 bg-clip-text text-transparent tracking-tight"
            >
              Drama
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
            >
              Compelling characters, powerful performances, and stories that
              resonate.
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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(245,158,11,0.03),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(244,63,94,0.03),transparent_50%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {dramaReviewsData.map((review, index) => (
              <motion.article
                key={review.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative h-96 rounded-2xl overflow-hidden shadow-2xl hover:shadow-amber-500/20 transition-all duration-500 cursor-pointer"
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
                  <h2 className="text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-amber-300 transition-colors duration-300">
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
                    className="group/btn inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold transition-all duration-300 self-start"
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

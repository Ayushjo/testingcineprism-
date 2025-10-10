"use client";
import { motion } from "framer-motion";
import { Film, Sparkles, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import ActionImage from "../assets/action.jpg";
import ThrillerImage from "../assets/thriller.jpg";
import DramaImage from "../assets/drama.jpg";
import HorrorImage from "../assets/horror.jpg";
import AnimationImage from "../assets/animation.jpg";

const genresData = [
  {
    id: 1,
    name: "Sci-Fi",
    imageUrl: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986",
    description: "Explore futuristic worlds and mind-bending concepts",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: 2,
    name: "Action",
    imageUrl: ActionImage,
    description: "High-octane thrills and explosive sequences",
    color: "from-red-500/20 to-orange-500/20",
  },
  {
    id: 3,
    name: "Thriller",
    imageUrl: ThrillerImage,
    description: "Edge-of-your-seat suspense and intrigue",
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: 4,
    name: "Drama",
    imageUrl: DramaImage,
    description: "Powerful stories that move the soul",
    color: "from-emerald-500/20 to-teal-500/20",
  },
  {
    id: 5,
    name: "Horror",
    imageUrl: HorrorImage,
    description: "Spine-chilling tales of terror",
    color: "from-gray-500/20 to-slate-500/20",
  },
  {
    id: 6,
    name: "Animation",
    imageUrl: AnimationImage,
    description: "Imaginative worlds brought to life",
    color: "from-yellow-500/20 to-amber-500/20",
  },
  {
    id: 7,
    name: "Comedy",
    imageUrl:
      "https://t3.ftcdn.net/jpg/10/42/97/30/240_F_1042973068_eFm2x9Q62j5RUgqf1bEh1qVKNzLV8B3N.jpg",
    description: "Laughter, wit, and heartwarming moments",
    color: "from-pink-500/20 to-rose-500/20",
  },
  {
    id: 8,
    name: "War",
    imageUrl:
      "https://t3.ftcdn.net/jpg/02/57/08/22/240_F_257082284_d14fGehoNkhvw0vnNJpkuPGbQqCbdpd7.jpg",
    description: "Epic battles and stories of courage",
    color: "from-amber-500/20 to-orange-500/20",
  },
  {
    id: 9,
    name: "Crime",
    imageUrl:
      "https://t4.ftcdn.net/jpg/02/82/73/97/240_F_282739755_TI9j2FVXnxfFFAASqpU58HXE04vaZuAt.jpg",
    description: "Gripping tales of mystery and justice",
    color: "from-indigo-500/20 to-violet-500/20",
  },
];

export default function ExploreGenresPage() {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleGenreClick = (genreName) => {
    navigate(`/genre/${genreName}`);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b relative overflow-hidden pt-24 pb-16 transition-colors duration-300 ${
      theme === "light"
        ? "from-white via-gray-50 to-white"
        : "from-slate-950 via-slate-900 to-slate-950"
    }`}>
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className={`absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl ${
          theme === "light" ? "bg-gray-300/15" : "bg-emerald-500/10"
        }`} />
        <div className={`absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl ${
          theme === "light" ? "bg-gray-200/15" : "bg-purple-500/10"
        }`} />
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl ${
          theme === "light" ? "bg-gray-400/8" : "bg-blue-500/5"
        }`} />
      </div>

      {/* Background Pattern */}
      <div className={`absolute inset-0 ${theme === "light" ? "opacity-3" : "opacity-5"}`}>
        <div className={`absolute inset-0 bg-[size:60px_60px] ${
          theme === "light"
            ? "bg-[linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px)]"
            : "bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)]"
        }`} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Page Header */}
        <div className="text-center mb-16 sm:mb-20 animate-fade-in-up">
          <div className="inline-block mb-6 animate-scale-in-center animation-delay-200">
            <span
              className={`backdrop-blur-xl px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl text-sm sm:text-base font-semibold border-2 inline-flex items-center gap-2 shadow-lg ${
                theme === "light"
                  ? "bg-gray-100 text-black border-black/40 shadow-black/10"
                  : "bg-white/5 text-emerald-400 border-white/10 shadow-emerald-500/10"
              }`}
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              Discover Your Genre
            </span>
          </div>
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 bg-clip-text text-transparent tracking-tight px-4 animate-fade-in-up animation-delay-300 ${
              theme === "light"
                ? "bg-gradient-to-r from-black via-gray-800 to-black"
                : "bg-gradient-to-r from-white via-emerald-200 to-white"
            }`}
          >
            Explore by Genre
          </h1>
          <p
            className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed px-4 animate-fade-in-up animation-delay-400 ${
              theme === "light" ? "text-black/70" : "text-slate-400"
            }`}
          >
            Dive into our carefully curated collections. Each genre offers a
            unique cinematic journey waiting to be discovered.
          </p>
        </div>

        {/* Genres Grid - Bento Box Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 stagger-children">
          {genresData.map((genre, index) => (
            <motion.div
              key={genre.id}
              whileHover={{ scale: 1.03, y: -8 }}
              onClick={() => handleGenreClick(genre.name)}
              className={`group relative overflow-hidden rounded-3xl cursor-pointer shadow-2xl transition-all duration-500 border-2 hover:scale-105 hover:-translate-y-2 ${
                theme === "light"
                  ? "border-black/40 hover:shadow-black/20 hover:border-black/80"
                  : "border-white/20 hover:shadow-emerald-500/20"
              } ${index === 0 ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""}`}
              style={{ minHeight: index === 0 ? "500px" : "280px", opacity: 0 }}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={genre.imageUrl || "/placeholder.svg"}
                  alt={genre.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${genre.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
              </div>

              {/* Content */}
              <div className="relative h-full flex flex-col justify-between p-6 sm:p-8">
                {/* Top Badge */}
                <div className="flex justify-between items-start">
                  <div
                    className={`backdrop-blur-xl border rounded-2xl px-3 py-1.5 sm:px-4 sm:py-2 ${
                      theme === "light"
                        ? "bg-white/80 border-black/30"
                        : "bg-white/10 border-white/20"
                    }`}
                  >
                    <Film className={`w-4 h-4 sm:w-5 sm:h-5 ${
                      theme === "light" ? "text-black" : "text-emerald-400"
                    }`} />
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110">
                    <div className={`backdrop-blur-xl border rounded-full p-2 sm:p-3 ${
                      theme === "light"
                        ? "bg-black/10 border-black/40"
                        : "bg-emerald-500/20 border-emerald-400/30"
                    }`}>
                      <ArrowRight className={`w-4 h-4 sm:w-5 sm:h-5 ${
                        theme === "light" ? "text-black" : "text-emerald-400"
                      }`} />
                    </div>
                  </div>
                </div>

                {/* Bottom Content */}
                <div>
                  <h3
                    className={`font-black mb-2 sm:mb-3 tracking-tight leading-tight transition-colors duration-300 ${
                      theme === "light"
                        ? "text-white group-hover:text-gray-200"
                        : "text-white group-hover:text-emerald-300"
                    } ${
                      index === 0
                        ? "text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
                        : "text-2xl sm:text-3xl md:text-4xl"
                    }`}
                  >
                    {genre.name}
                  </h3>
                  <p
                    className={`leading-relaxed ${
                      theme === "light" ? "text-slate-200" : "text-slate-300"
                    } ${
                      index === 0
                        ? "text-sm sm:text-base md:text-lg"
                        : "text-xs sm:text-sm"
                    }`}
                  >
                    {genre.description}
                  </p>

                  {/* Hover Indicator Line */}
                  <div
                    className={`h-1 rounded-full mt-4 sm:mt-6 w-0 group-hover:w-full transition-all duration-500 ${
                      theme === "light"
                        ? "bg-gradient-to-r from-black to-gray-700"
                        : "bg-gradient-to-r from-emerald-400 to-cyan-400"
                    }`}
                  />
                </div>
              </div>

              {/* Border Glow */}
              <div className={`absolute inset-0 border-2 border-transparent rounded-3xl transition-colors duration-500 ${
                theme === "light"
                  ? "group-hover:border-black/30"
                  : "group-hover:border-emerald-400/30"
              }`} />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 sm:mt-20 text-center animate-fade-in animation-delay-1000">
          <div className={`inline-flex items-center gap-2 text-xs sm:text-sm ${
            theme === "light" ? "text-gray-500" : "text-slate-500"
          }`}>
            <div className={`w-8 sm:w-12 h-px ${
              theme === "light"
                ? "bg-gradient-to-r from-transparent to-gray-400"
                : "bg-gradient-to-r from-transparent to-slate-500"
            }`} />
            <span>More genres coming soon</span>
            <div className={`w-8 sm:w-12 h-px ${
              theme === "light"
                ? "bg-gradient-to-l from-transparent to-gray-400"
                : "bg-gradient-to-l from-transparent to-slate-500"
            }`} />
          </div>
        </div>
      </div>
    </div>
  );
}

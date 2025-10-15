"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Globe, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import MovieDetailsModal from "../components/MovieDetailsModal";

// Article Card Component (reusable from ArticleSection)
const ArticleCard = ({ article, index, hoveredCard, setHoveredCard }) => {
  const { theme } = useTheme();

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      }}
      animate={{
        opacity: hoveredCard !== null && hoveredCard !== index ? 0.3 : 1,
        scale: hoveredCard === index ? 1.02 : 1,
      }}
      whileHover={{ y: -8 }}
      onMouseEnter={() => setHoveredCard(index)}
      onMouseLeave={() => setHoveredCard(null)}
      className="group relative aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-visible cursor-pointer"
      style={{
        filter:
          hoveredCard !== null && hoveredCard !== index
            ? "blur(2px)"
            : "blur(0px)",
        transition: "filter 0.3s ease-in-out",
      }}
    >
      <div className="absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden">
        <img
          src={article.imageUrl || "/placeholder.svg"}
          alt={article.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div
          className={`absolute inset-0 transition-all duration-300 ${
            theme === "light"
              ? "bg-gradient-to-t from-black/80 via-black/40 to-black/20"
              : "bg-gradient-to-t from-black/90 via-black/50 to-black/20"
          }`}
        />

        <div className="relative h-full flex flex-col justify-end p-5 sm:p-6 lg:p-8">
          <div>
            {article.category && (
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 backdrop-blur-sm border ${
                  theme === "light"
                    ? "bg-white/20 text-white border-white/30"
                    : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                }`}
              >
                {article.category}
              </span>
            )}
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-2 tracking-tight group-hover:text-emerald-300 transition-colors duration-300 leading-tight">
              {article.title}
            </h2>
            <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-2 text-xs sm:text-sm text-slate-300">
              <span>{article.author}</span>
              <span className="text-slate-500">•</span>
              <span>
                {new Date(article.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
              {article.viewCount && (
                <>
                  <span className="text-slate-500">•</span>
                  <span>
                    {article.viewCount >= 1000
                      ? `${(article.viewCount / 1000).toFixed(1)}k`
                      : article.viewCount}{" "}
                    views
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

// Movie Poster Card with Rank
const MoviePosterCard = ({ movie, onClick, index }) => {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onClick={() => onClick(movie)}
      className="group relative flex-shrink-0 w-40 sm:w-48 md:w-56 cursor-pointer"
    >
      {/* Card Container with Dotted Border */}
      <div
        className={`relative overflow-hidden rounded-2xl border-2 border-dashed backdrop-blur-sm transition-all duration-300 ${
          theme === "light"
            ? "border-gray-300 bg-gray-50 hover:border-black/60 hover:shadow-lg hover:shadow-black/10"
            : "border-slate-700/50 bg-slate-900/30 hover:border-amber-400/50 hover:shadow-lg hover:shadow-amber-400/10"
        }`}
      >
        {/* Poster Image */}
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={movie.posterUrl || "/placeholder.svg"}
            alt={movie.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Rank Badge */}
          <div className="absolute top-3 left-3">
            <div
              className={`w-10 h-10 rounded-full backdrop-blur-xl border flex items-center justify-center ${
                theme === "light"
                  ? "bg-white/90 border-gray-300"
                  : "bg-black/60 border-white/20"
              }`}
            >
              <span
                className={`text-sm font-black ${
                  theme === "light" ? "text-black" : "text-amber-400"
                }`}
              >
                {movie.rank}
              </span>
            </div>
          </div>
        </div>

        {/* Movie Info */}
        <div className="p-3">
          <h3
            className={`text-sm font-bold line-clamp-2 transition-colors ${
              theme === "light"
                ? "text-black group-hover:text-gray-700"
                : "text-white group-hover:text-amber-400"
            }`}
          >
            {movie.title}
          </h3>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div
            className={`absolute inset-0 rounded-2xl ${
              theme === "light"
                ? "bg-gradient-to-r from-black/5 to-gray-600/5"
                : "bg-gradient-to-r from-amber-400/5 to-emerald-400/5"
            }`}
          />
        </div>
      </div>
    </motion.div>
  );
};

// Category Card Component
const CategoryCard = ({ icon: Icon, title, to }) => {
  const { theme } = useTheme();

  // Different background images for each category
  const bgImages = {
    Indian: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80",
    World: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80"
  };

  return (
    <Link to={to} aria-label={`${title} films`}>
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.3 }}
        className="group relative overflow-hidden rounded-3xl min-h-[280px] sm:min-h-[320px] cursor-pointer"
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={bgImages[title]}
            alt={`${title} cinema`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Dark gradient overlay */}
          <div className={`absolute inset-0 transition-all duration-500 ${
            theme === "light"
              ? "bg-gradient-to-br from-black/70 via-black/50 to-black/70 group-hover:from-black/60 group-hover:via-black/40 group-hover:to-black/60"
              : "bg-gradient-to-br from-black/80 via-black/60 to-black/80 group-hover:from-black/70 group-hover:via-black/50 group-hover:to-black/70"
          }`} />

          {/* Noise texture for film grain effect */}
          <div
            className="absolute inset-0 opacity-20 mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Glowing border effect */}
        <div className={`absolute inset-0 rounded-3xl border-2 transition-all duration-300 ${
          theme === "light"
            ? "border-white/20 group-hover:border-[#8B4513]/60 group-hover:shadow-[0_0_40px_rgba(139,69,19,0.4)]"
            : "border-white/10 group-hover:border-emerald-400/60 group-hover:shadow-[0_0_40px_rgba(16,185,129,0.3)]"
        }`} />

        {/* Content */}
        <div className="relative h-full flex flex-col justify-between p-8 sm:p-10">
          {/* Icon Badge */}
          <div className="flex justify-start">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl backdrop-blur-xl border-2 flex items-center justify-center transition-all duration-300 ${
                theme === "light"
                  ? "bg-white/20 border-white/40 group-hover:bg-white/30 group-hover:border-white/60"
                  : "bg-white/10 border-white/20 group-hover:bg-white/20 group-hover:border-white/40"
              }`}
            >
              <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-lg" />
            </motion.div>
          </div>

          {/* Title and Arrow */}
          <div className="flex items-end justify-between gap-4">
            <div>
              <motion.h3
                className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-none mb-2 drop-shadow-2xl"
                style={{
                  textShadow: "0 4px 20px rgba(0,0,0,0.5)"
                }}
              >
                {title}
              </motion.h3>
              <p className="text-white/80 text-sm sm:text-base font-medium">
                Explore {title.toLowerCase()} indie films
              </p>
            </div>

            {/* Arrow with animated background */}
            <motion.div
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full backdrop-blur-xl border-2 flex items-center justify-center transition-all duration-300 ${
                theme === "light"
                  ? "bg-white/20 border-white/40 group-hover:bg-white/30 group-hover:border-white/60"
                  : "bg-white/10 border-white/20 group-hover:bg-emerald-400/30 group-hover:border-emerald-400/60"
              }`}
            >
              <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 text-white drop-shadow-lg" />
            </motion.div>
          </div>
        </div>

        {/* Animated shimmer effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className={`absolute inset-0 ${
            theme === "light"
              ? "bg-gradient-to-r from-transparent via-white/10 to-transparent"
              : "bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent"
          } translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000`} />
        </div>
      </motion.div>
    </Link>
  );
};

export default function IndiePage() {
  const { token } = useAuth();
  const { theme } = useTheme();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showMovieModal, setShowMovieModal] = useState(false);
  const [hoveredArticle, setHoveredArticle] = useState(null);
  const [topIndieFilms, setTopIndieFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const scrollContainerRef = useRef(null);

  // Fetch Thriller movies as dummy data for Top 25
  useEffect(() => {
    const fetchTop25IndieFilms = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://testingcineprismbackend-production.up.railway.app/api/v1/admin/fetch-byGenre/Thriller`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.genrePosts) {
          // Take first 25 movies and add rank
          const rankedMovies = response.data.genrePosts
            .slice(0, 25)
            .map((movie, index) => ({
              ...movie,
              rank: index + 1,
              posterUrl: movie.posterImageUrl,
            }));
          setTopIndieFilms(rankedMovies);
        }
      } catch (err) {
        console.error("Error fetching top indie films:", err);
        // Keep empty array on error
        setTopIndieFilms([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTop25IndieFilms();
  }, [token]);

  // Dummy Data (keeping old structure as fallback)
  const fallbackFilms = [
    {
      rank: 1,
      title: "Everything Everywhere All at Once",
      posterUrl:
        "https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",
      tmdb_id: 545611,
      genre_ids: [28, 12, 878],
      overview:
        "An aging Chinese immigrant is swept up in an insane adventure, where she alone can save what's important to her by connecting with the lives she could have led in other universes.",
      release_date: "2022-03-24",
      vote_count: 8234,
      popularity: 342.5,
    },
    {
      rank: 2,
      title: "Parasite",
      posterUrl:
        "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
      tmdb_id: 496243,
      genre_ids: [35, 53, 18],
      overview:
        "All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident.",
      release_date: "2019-05-30",
      vote_count: 16789,
      popularity: 298.7,
    },
    {
      rank: 3,
      title: "Moonlight",
      posterUrl:
        "https://image.tmdb.org/t/p/w500/4911T5FbJ9eD2faz5Z8L7IvV5wz.jpg",
      tmdb_id: 376867,
      genre_ids: [18],
      overview:
        "The tender, heartbreaking story of a young man's struggle to find himself, told across three defining chapters in his life as he experiences the ecstasy, pain, and beauty of falling in love, while grappling with his own sexuality.",
      release_date: "2016-10-21",
      vote_count: 7234,
      popularity: 245.3,
    },
    {
      rank: 4,
      title: "The Farewell",
      posterUrl:
        "https://image.tmdb.org/t/p/w500/7i2a18tPHbA0a3z2K0H3hW3A0s.jpg",
      tmdb_id: 565311,
      genre_ids: [18, 35],
      overview:
        "A headstrong Chinese-American woman returns to China when her beloved grandmother is given a terminal diagnosis. Billi struggles with her family's decision to keep grandma in the dark about her own illness as they all stage an impromptu wedding to see grandma one last time.",
      release_date: "2019-07-12",
      vote_count: 1876,
      popularity: 178.9,
    },
    {
      rank: 5,
      title: "Past Lives",
      posterUrl:
        "https://image.tmdb.org/t/p/w500/k3bs0347I1K5e2e4J3t3GP2H2S.jpg",
      tmdb_id: 666277,
      genre_ids: [18, 10749],
      overview:
        "Nora and Hae Sung, two deeply connected childhood friends, are wrested apart after Nora's family emigrates from South Korea. Twenty years later, they are reunited for one fateful week as they confront notions of love and destiny.",
      release_date: "2023-06-02",
      vote_count: 982,
      popularity: 267.4,
    },
    {
      rank: 6,
      title: "The Lighthouse",
      posterUrl:
        "https://image.tmdb.org/t/p/w500/3nk9UoepYmv1G9oP18q6JJCeYwN.jpg",
      tmdb_id: 503919,
      genre_ids: [18, 27, 9648],
      overview:
        "Two lighthouse keepers try to maintain their sanity while living on a remote and mysterious New England island in the 1890s.",
      release_date: "2019-10-18",
      vote_count: 4567,
      popularity: 198.2,
    },
    {
      rank: 7,
      title: "Lady Bird",
      posterUrl:
        "https://image.tmdb.org/t/p/w500/iKQQw2yap7ZMFyGVnfHKbdwFFDt.jpg",
      tmdb_id: 391713,
      genre_ids: [18, 35],
      overview:
        "Lady Bird McPherson, a strong willed, deeply opinionated, artistic 17 year old comes of age in Sacramento. Her relationship with her mother and her upbringing are questioned and tested as she plans to head off to college.",
      release_date: "2017-11-03",
      vote_count: 9876,
      popularity: 287.6,
    },
    {
      rank: 8,
      title: "The Florida Project",
      posterUrl:
        "https://image.tmdb.org/t/p/w500/bnSTP1PY2fDyat0eUa4QouuGV7F.jpg",
      tmdb_id: 394117,
      genre_ids: [18],
      overview:
        "The story of a precocious six year-old and her ragtag group of friends whose summer break is filled with childhood wonder, possibility and a sense of adventure while the adults around them struggle with hard times.",
      release_date: "2017-10-06",
      vote_count: 3421,
      popularity: 156.8,
    },
    {
      rank: 9,
      title: "Hereditary",
      posterUrl:
        "https://image.tmdb.org/t/p/w500/p1RMJBSXxD8zLNZoGFTlLhLCVP1.jpg",
      tmdb_id: 493922,
      genre_ids: [27, 9648, 53],
      overview:
        "When Ellen, the matriarch of the Graham family, passes away, her daughter's family begins to unravel cryptic and increasingly terrifying secrets about their ancestry.",
      release_date: "2018-06-04",
      vote_count: 8234,
      popularity: 312.4,
    },
    {
      rank: 10,
      title: "Uncut Gems",
      posterUrl:
        "https://image.tmdb.org/t/p/w500/6XN1vxHc7kUSqNW2ODjN9a0aZYZ.jpg",
      tmdb_id: 473033,
      genre_ids: [18, 53, 80],
      overview:
        "A charismatic New York City jeweler always on the lookout for the next big score makes a series of high-stakes bets that could lead to the windfall of a lifetime. Howard must perform a precarious high-wire act, balancing business, family, and encroaching adversaries on all sides in his relentless pursuit of the ultimate win.",
      release_date: "2019-12-13",
      vote_count: 5678,
      popularity: 234.9,
    },
    {
      rank: 11,
      title: "The Witch",
      posterUrl:
        "https://image.tmdb.org/t/p/w500/zap5hpFCWSvdWSuPGAQyjUv2wAC.jpg",
      tmdb_id: 303857,
      genre_ids: [27, 9648],
      overview:
        "In 1630, a farmer relocates his family to a remote plot of land on the edge of a forest where strange, unsettling things happen. With suspicion and paranoia mounting, each family member's faith, loyalty and love are tested in shocking ways.",
      release_date: "2015-12-27",
      vote_count: 6543,
      popularity: 201.7,
    },
    {
      rank: 12,
      title: "A Ghost Story",
      posterUrl:
        "https://image.tmdb.org/t/p/w500/v4JcGbC8MNiYlgf1Uz9wVX83yqL.jpg",
      tmdb_id: 409817,
      genre_ids: [18, 14],
      overview:
        "Recently deceased, a white-sheeted ghost returns to his suburban home to console his bereft wife, only to find that in his spectral state he has become unstuck in time, forced to watch passively as the life he knew and the woman he loves slowly slip away.",
      release_date: "2017-07-07",
      vote_count: 2345,
      popularity: 143.2,
    },
    {
      rank: 13,
      title: "Swiss Army Man",
      posterUrl:
        "https://image.tmdb.org/t/p/w500/7XBt3R6sVbpWJMGLFwvQk9sXAV.jpg",
      tmdb_id: 334521,
      genre_ids: [35, 18, 14],
      overview:
        "Alone on a tiny deserted island, Hank has given up all hope of ever making it home again. But one day everything changes when a dead body washes ashore, and he soon realizes it may be his last opportunity to escape certain death.",
      release_date: "2016-06-24",
      vote_count: 4567,
      popularity: 187.3,
    },
    {
      rank: 14,
      title: "The Lobster",
      posterUrl:
        "https://image.tmdb.org/t/p/w500/4WmVGGnCRjAxQUKQr6cAjqNz37u.jpg",
      tmdb_id: 254470,
      genre_ids: [35, 18, 10749],
      overview:
        "In a dystopian near future, single people, according to the laws of The City, are taken to The Hotel, where they are obliged to find a romantic partner in forty-five days or are transformed into beasts and sent off into The Woods.",
      release_date: "2015-10-16",
      vote_count: 5432,
      popularity: 176.8,
    },
    {
      rank: 15,
      title: "Good Time",
      posterUrl:
        "https://image.tmdb.org/t/p/w500/gPmkOTi4TivtVZ8lniDsV7DXS7R.jpg",
      tmdb_id: 394356,
      genre_ids: [80, 18, 53],
      overview:
        "After a botched bank robbery lands his younger brother in prison, Connie Nikas embarks on a twisted odyssey through New York City's underworld to get his brother Nick out of jail.",
      release_date: "2017-08-11",
      vote_count: 3456,
      popularity: 162.4,
    },
    {
      rank: 16,
      title: "The Rider",
      posterUrl:
        "https://image.tmdb.org/t/p/w500/1p9cEnZh8VaHT0gWxUBnLVwGKmq.jpg",
      tmdb_id: 486589,
      genre_ids: [18, 37],
      overview:
        "Once a rising star of the rodeo circuit, and a gifted horse trainer, young cowboy Brady is warned that his riding days are over after a horse crushed his skull at a rodeo. In an attempt to regain control of his own fate, Brady undertakes a search for a new identity and what it means to be a man in the heartland of the United States.",
      release_date: "2017-05-20",
      vote_count: 1234,
      popularity: 134.7,
    },
    {
      rank: 17,
      title: "First Cow",
      posterUrl:
        "https://image.tmdb.org/t/p/w500/g4z7mDmJmx23vsVg6XNWcnXSCeZ.jpg",
      tmdb_id: 492188,
      genre_ids: [18, 37],
      overview:
        "In the 1820s, a taciturn loner and skilled cook travels west to Oregon Territory, where he meets a Chinese immigrant also seeking his fortune. Soon the two team up on a dangerous scheme to steal milk from the wealthy landowner's prized Jersey cow – the first, and only, in the territory.",
      release_date: "2020-03-06",
      vote_count: 987,
      popularity: 128.3,
    },
    {
      rank: 18,
      title: "Midsommar",
      posterUrl:
        "https://image.tmdb.org/t/p/w500/7LEI8ulZzO5gy9Ww2NVCrKmHeDZ.jpg",
      tmdb_id: 530385,
      genre_ids: [27, 18, 9648],
      overview:
        "Several friends travel to Sweden to study as anthropologists a summer festival that is held every ninety years in the remote hometown of one of them. What begins as a dream vacation in a place where the sun never sets, gradually turns into a dark nightmare as the mysterious inhabitants invite them to participate in their disturbing festive activities.",
      release_date: "2019-07-03",
      vote_count: 7654,
      popularity: 298.5,
    },
    {
      rank: 19,
      title: "Eighth Grade",
      posterUrl:
        "https://image.tmdb.org/t/p/w500/xTa9cLhGHfQ7084UvoPQ2bBXKqd.jpg",
      tmdb_id: 514439,
      genre_ids: [18, 35],
      overview:
        "Thirteen-year-old Kayla endures the tidal wave of contemporary suburban adolescence as she makes her way through the last week of middle school—the end of her thus far disastrous eighth grade year—before she begins high school.",
      release_date: "2018-07-13",
      vote_count: 2345,
      popularity: 156.2,
    },
    {
      rank: 20,
      title: "The Handmaiden",
      posterUrl:
        "https://image.tmdb.org/t/p/w500/dLlH4aNHdnmf62umnInL8xPlPzw.jpg",
      tmdb_id: 290098,
      genre_ids: [18, 10749, 53],
      overview:
        "In 1930s Korea, a swindler and a young woman pose as a Japanese count and a handmaiden to seduce a Japanese heiress and steal her fortune.",
      release_date: "2016-06-01",
      vote_count: 4321,
      popularity: 212.8,
    },
    {
      rank: 21,
      title: "A24's The Green Knight",
      posterUrl:
        "https://image.tmdb.org/t/p/w500/if4hw3Ou5Sav9Em7WWHj66mnywp.jpg",
      tmdb_id: 559969,
      genre_ids: [12, 18, 14],
      overview:
        "An epic fantasy adventure based on the timeless Arthurian legend, The Green Knight tells the story of Sir Gawain, King Arthur's reckless and headstrong nephew, who embarks on a daring quest to confront the eponymous Green Knight, a gigantic emerald-skinned stranger and tester of men.",
      release_date: "2021-07-29",
      vote_count: 3456,
      popularity: 189.7,
    },
    {
      rank: 22,
      title: "Minari",
      posterUrl:
        "https://image.tmdb.org/t/p/w500/6FzOcNh6hdn4chCZMI4fkBZ7p7J.jpg",
      tmdb_id: 588228,
      genre_ids: [18],
      overview:
        "A Korean-American family moves to an Arkansas farm in search of their own American Dream. Amidst the challenges of this new life in the strange and rugged Ozarks, they discover the undeniable resilience of family and what really makes a home.",
      release_date: "2020-12-11",
      vote_count: 2987,
      popularity: 201.4,
    },
    {
      rank: 23,
      title: "Waves",
      posterUrl:
        "https://image.tmdb.org/t/p/w500/jIxcoI7RNjUZHb7gwS7b7lEr2dh.jpg",
      tmdb_id: 512196,
      genre_ids: [18, 10749],
      overview:
        "The epic emotional journey of a suburban African-American family as they navigate love, forgiveness and coming together in the aftermath of a tragic loss.",
      release_date: "2019-11-15",
      vote_count: 1876,
      popularity: 143.9,
    },
    {
      rank: 24,
      title: "Sound of Metal",
      posterUrl:
        "https://image.tmdb.org/t/p/w500/y89kFMNYXNKMdlJ8bRIRUMKzNTd.jpg",
      tmdb_id: 525662,
      genre_ids: [18],
      overview:
        "Metal drummer Ruben begins to lose his hearing. When a doctor tells him his condition will worsen, he thinks his career and life is over. His girlfriend Lou checks the former addict into a rehab for the deaf hoping it will prevent a relapse and help him adapt to his new life. After being welcomed and accepted just as he is, Ruben must choose between his new normal and the life he once knew.",
      release_date: "2020-09-06",
      vote_count: 4567,
      popularity: 223.6,
    },
    {
      rank: 25,
      title: "The Worst Person in the World",
      posterUrl:
        "https://image.tmdb.org/t/p/w500/dB4rx0MbAe1EAOsjLrHu4nBaI6i.jpg",
      tmdb_id: 640043,
      genre_ids: [18, 10749, 35],
      overview:
        "The chronicles of four years in the life of Julie, a young woman who navigates the troubled waters of her love life and struggles to find her career path, leading her to take a realistic look at who she really is.",
      release_date: "2021-10-13",
      vote_count: 2345,
      popularity: 187.2,
    },
  ];

  const featuredIndieArticles = [
    {
      id: "art1",
      title: "The Rise of A24: A Decade of Independent Excellence",
      author: "Jane Doe",
      publishedAt: "2025-10-15T00:00:00.000Z",
      imageUrl:
        "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=800&q=80",
      viewCount: 1254,
      category: "Analysis",
    },
    {
      id: "art2",
      title: "How 'Masaan' Redefined Modern Indian Indie Cinema",
      author: "Rohan Kumar",
      publishedAt: "2025-10-12T00:00:00.000Z",
      imageUrl:
        "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80",
      viewCount: 2345,
      category: "Deep Dive",
    },
    {
      id: "art3",
      title: "A Guide to the Korean New Wave for Beginners",
      author: "Emily Chen",
      publishedAt: "2025-10-10T00:00:00.000Z",
      imageUrl:
        "https://images.unsplash.com/photo-1574267432644-f71916e8eeb0?w=800&q=80",
      viewCount: 987,
      category: "Guide",
    },
  ];

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setShowMovieModal(true);
  };

  const closeMovieModal = () => {
    setShowMovieModal(false);
    setSelectedMovie(null);
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className={`min-h-screen pt-20 transition-colors duration-300 ${
        theme === "light" ? "bg-white" : "bg-slate-950"
      }`}
    >
      {/* Ambient Background */}
      <div className="absolute inset-0 opacity-20">
        {theme === "light" ? (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(0,0,0,0.03),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(0,0,0,0.03),transparent_50%)]" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(16,185,129,0.03),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(245,158,11,0.03),transparent_50%)]" />
          </>
        )}
      </div>

      {/* Main Content */}
      <div className="relative pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section 1: Main Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 sm:mb-20"
          >
            <h1
              className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 bg-clip-text text-transparent tracking-tight ${
                theme === "light"
                  ? "bg-gradient-to-r from-black via-gray-800 to-gray-600"
                  : "bg-gradient-to-r from-white via-slate-200 to-slate-400"
              }`}
            >
              Indie Cinema
            </h1>
            <p
              className={`text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed ${
                theme === "light" ? "text-black/70" : "text-slate-400"
              }`}
            >
              Exploring the boldest voices and most unique stories from outside
              the studio system.
            </p>
          </motion.div>

          {/* Section 2: Top 25 Indie Films Carousel */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-20 sm:mb-24"
          >
            <div className="mb-8">
              <h2
                className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight ${
                  theme === "light" ? "text-black" : "text-white"
                }`}
              >
                Cinéprism Top 25
              </h2>
            </div>

            {/* Carousel Container */}
            <div className="relative group">
              {/* Left Arrow */}
              <button
                onClick={() => scroll("left")}
                className={`hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-12 h-12 rounded-full backdrop-blur-xl border-2 transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-1/2 ${
                  theme === "light"
                    ? "bg-white/80 border-gray-300 hover:bg-white hover:border-[#8B4513]"
                    : "bg-white/10 border-white/20 hover:bg-white/20 hover:border-emerald-400"
                }`}
              >
                <ChevronLeft
                  className={`w-6 h-6 ${
                    theme === "light" ? "text-black" : "text-white"
                  }`}
                />
              </button>

              {/* Right Arrow */}
              <button
                onClick={() => scroll("right")}
                className={`hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-12 h-12 rounded-full backdrop-blur-xl border-2 transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-1/2 ${
                  theme === "light"
                    ? "bg-white/80 border-gray-300 hover:bg-white hover:border-[#8B4513]"
                    : "bg-white/10 border-white/20 hover:bg-white/20 hover:border-emerald-400"
                }`}
              >
                <ChevronRight
                  className={`w-6 h-6 ${
                    theme === "light" ? "text-black" : "text-white"
                  }`}
                />
              </button>

              {/* Scrollable Container */}
              <div
                ref={scrollContainerRef}
                className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center w-full py-12">
                    <div
                      className={`animate-spin rounded-full h-12 w-12 border-b-2 ${
                        theme === "light" ? "border-black" : "border-emerald-400"
                      }`}
                    ></div>
                  </div>
                ) : topIndieFilms.length > 0 ? (
                  topIndieFilms.map((film, index) => (
                    <MoviePosterCard
                      key={film.id || film.tmdb_id}
                      movie={film}
                      index={index}
                      onClick={handleMovieClick}
                    />
                  ))
                ) : (
                  <div className="flex items-center justify-center w-full py-12">
                    <p
                      className={`text-sm ${
                        theme === "light" ? "text-black/70" : "text-slate-400"
                      }`}
                    >
                      No movies available
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.section>

          {/* Section 3: Regional Navigation Cards */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-20 sm:mb-24"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CategoryCard icon={MapPin} title="Indian" to="/indie/indian" />
              <CategoryCard icon={Globe} title="World" to="/indie/world" />
            </div>
          </motion.section>

          {/* Section 4: Featured Articles */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="mb-8">
              <h2
                className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight ${
                  theme === "light" ? "text-black" : "text-white"
                }`}
              >
                Featured Articles
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredIndieArticles.map((article, index) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  index={index}
                  hoveredCard={hoveredArticle}
                  setHoveredCard={setHoveredArticle}
                />
              ))}
            </div>
          </motion.section>
        </div>
      </div>

      {/* Movie Details Modal */}
      {showMovieModal && (
        <MovieDetailsModal movie={selectedMovie} onClose={closeMovieModal} />
      )}
    </div>
  );
}

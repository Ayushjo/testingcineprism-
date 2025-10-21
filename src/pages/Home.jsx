import OptimizedImage from "../components/OptimizedImage";
import DuneImage from "../assets/Dune.jpg";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import {
  Star,
  Heart,
  MessageCircle,
  Play,
  TrendingUp,
  Award,
  Film,
  Users,
  Eye,
  ArrowUpRight,
  Calendar,
  Clock,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InterstellarImage from "../assets/Interstellar.jpg";
import HowToLoseImage from "../assets/howtoloseaguys.jpg";
import OppenHeimerImage from "../assets/oppenheimer.jpg";
import OppenHeimerFireImage from "../assets/oppenheimerfire.jpg";
import GodImage from "../assets/god.webp";
import Tilt from "react-parallax-tilt";
import { DesktopHero, } from "@/components/ScriptHeroSections";
import LatestReviews from "../components/LatestReviews";
import TrendingThisWeek from "../components/TrendingThisWeek";
import ExploreByGenre from "../components/ExploreByGenre";
import NewsletterCTA from "../components/NewsLetterCTA";
import FleabagImage2 from "../assets/fleebag2.jpg";
import PastLivesImage from "../assets/pastlives.jpg";
import { AnimatePresence } from "framer-motion";
import SpiderManImage from "../assets/spiderman.jpg";
import BatmanImage from "../assets/batman.jpg";
import BladeRunnerImg from "../assets/bladerunner.jpg";
import DuneFanImage from "../assets/dunefan.jpg";
import SinnerImage from "../assets/sinners.jpg";
import MobileHero from "@/components/MobileHero";
import TennetImage from "../assets/tennet.jpg";
import AliceImage from "../assets/alicedarling.jpg";
import Marquee from "../components/Marquee";
import Coverflow from "../components/Coverflow";
import CoverflowMarquee from "../components/CoverflowMarquee";
import DarkKnightImage from "../assets/darkknight.jpg";
import DunkKirkImage from "../assets/dunkirk.jpg";
import InteractiveVideoGrid from "../components/InteractiveVideoGrid";
import ArticleSection from "../components/ArticleSection";
import Top5Picks from "../components/Top5Picks";

export default function Homepage() {
  const { theme } = useTheme();
  const [activeCard, setActiveCard] = useState(null);
  const navigate = useNavigate();
  const [quotes, setQuotes] = useState([]);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [latestReviews, setLatestReviews] = useState([]);

  const heroPosters = [
    {
      image: FleabagImage2,
      title: "Fleabag",
      subtitle: "Brilliant, Bold, and Brutally Honest",
      year: "2016",
      rating: 8.7,
      genre: "Drama/Comedy",
    },
    {
      image: DuneImage,
      title: "Dune: Part Two",
      subtitle: "Epic Sci-Fi Continuation",
      year: "2024",
      rating: 8.8,
      genre: "Sci-Fi",
    },
    {
      image: GodImage,
      title: "The Godfather",
      subtitle: "An Offer You Can't Refuse",
      year: "1972",
      rating: 9.2,
      genre: "Crime/Drama",
    },
    {
      image: HowToLoseImage,
      title: "How to Lose a Guy in 10 Days",
      subtitle: "A Romantic Comedy Classic",
      year: "2003",
      rating: 6.4,
      genre: "Romance/Comedy",
    },
  ];

  const backgroundVideoUrl =
    "https://res.cloudinary.com/dapu22gee/video/upload/v1754809621/bgvideo1_ynn0u1.mp4";

  // Extended featured carousel data for mobile film strip (increased length)
  const featuredCarouselData = [
    {
      id: 1,
      title: "Fleabag",
      subtitle: "Phoebe Waller-Bridge's Masterpiece",
      posterUrl: FleabagImage2,
    },
    {
      id: 2,
      title: "Dune: Part Two",
      subtitle: "The Sci-Fi Epic Continues",
      posterUrl: DuneFanImage,
    },
    {
      id: 3,
      title: "Alice Darling",
      subtitle: "A Heartbreaking Reunion",
      posterUrl: AliceImage,
    },
    {
      id: 4,
      title: "Past Lives",
      subtitle: "A Heartbreaking Reunion",
      posterUrl: PastLivesImage,
    },
    {
      id: 5,
      title: "Sinners",
      subtitle: "A Heartbreaking Reunion",
      posterUrl: SinnerImage,
    },
    {
      id: 6,
      title: "Dark Knight",
      subtitle: "A Heartbreaking Reunion",
      posterUrl: DarkKnightImage,
    },
    {
      id: 7,
      title: "Dunkirk",
      subtitle: "A Heartbreaking Reunion",
      posterUrl: DunkKirkImage,
    },
    {
      id: 8,
      title: "Parasite",
      subtitle: "A Heartbreaking Reunion",
      posterUrl:
        "https://image.tmdb.org/t/p/w342/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    },
    {
      id: 9,
      title: "Interstellar",
      subtitle: "A Heartbreaking Reunion",
      posterUrl:
        "https://image.tmdb.org/t/p/w342/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    },
    {
      id: 10,
      title: "Tennet",
      subtitle: "A Heartbreaking Reunion",
      posterUrl: TennetImage,
    },
    {
      id: 11,
      title: "Everything Everywhere All at Once",
      subtitle: "A Heartbreaking Reunion",
      posterUrl:
        "https://image.tmdb.org/t/p/w342/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",
    },
    {
      id: 12,
      title: "Oppenheimer",
      subtitle: "Nolan's Atomic Masterpiece",
      posterUrl: OppenHeimerImage,
    },
  ];

  const [activeFilm, setActiveFilm] = useState(featuredCarouselData[0]);

  const bentoItems = [
    {
      id: 1,
      type: "featured",
      title: "Oppenheimer",
      subtitle: "Nolan's Atomic Masterpiece",
      
      image: OppenHeimerFireImage,
      likes: 1247,
      comments: 189,
      views: "12.4k",
      readTime: "15 min",
      className: "col-span-2 row-span-2",
      gradient: "from-orange-500/10 to-red-600/10",
    },
    {
      id: 2,
      type: "trending",
      title: "Trending Now",
      subtitle: "Most Popular Reviews",
      icon: TrendingUp,
      stats: "2.1M views this week",
      className: "col-span-1 row-span-1",
      gradient: "from-slate-500/10 to-slate-600/10",
    },
    {
      id: 3,
      type: "review",
      title: "Dune: Part Two",
      subtitle: "Sci-Fi Epic Continues",
      
      image: DuneImage,
      likes: 892,
      comments: 156,
      className: "col-span-1 row-span-1",
      gradient: "from-blue-500/10 to-purple-600/10",
    },
    {
      id: 4,
      type: "stats",
      title: "Community",
      subtitle: "Active Readers",
      icon: Users,
      stats: "45.2k members",
      className: "col-span-1 row-span-1",
      gradient: "from-pink-500/10 to-rose-600/10",
    },
    {
      id: 5,
      type: "review",
      title: "Interstellar",
      subtitle: "Space Odyssey Reimagined",
      
      image: InterstellarImage,
      likes: 743,
      comments: 98,
      className: "col-span-1 row-span-1",
      gradient: "from-indigo-500/10 to-blue-600/10",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHoveringCard, setIsHoveringCard] = useState(false);

  // Fetch quotes from API
  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios.get(
          "https://api.thecineprism.com/api/v1/admin/fetch-quotes"
        );
        if (response.data.quotes && Array.isArray(response.data.quotes)) {
          setQuotes(response.data.quotes);
        }
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    };
    fetchQuotes();
  }, []);

  // Auto-rotate quotes every 5 seconds
  useEffect(() => {
    if (quotes.length === 0) return;
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [quotes.length]);

  // Fetch latest reviews from API
  useEffect(() => {
    const fetchLatestReviews = async () => {
      try {
        const response = await axios.get(
          "https://api.thecineprism.com/api/v1/admin/latest-reviews"
        );
        const data = response.data;
        if (data.latestReviews && Array.isArray(data.latestReviews)) {
          const excludedTitles = [
            "heat",
            "kaala patthar",
            "head-on",
            "blue ruins",
          ];
          const filteredReviews = data.latestReviews.filter(
            (review) =>
              !excludedTitles.includes(review.title.trim().toLowerCase())
          );
          setLatestReviews(filteredReviews.slice(0, 6));
        }
      } catch (error) {
        console.error("Error fetching latest reviews:", error);
      }
    };
    fetchLatestReviews();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroPosters.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroPosters.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <>
      <div className={`min-h-screen overflow-hidden transition-colors duration-300 ${
        theme === "light"
          ? "bg-[#FFF8DC] text-black"
          : "bg-slate-950 text-white"
      }`}>
        {/* Desktop Hero Section - Hidden on Mobile */}
        <section className="relative min-h-[900px] xl:h-screen overflow-hidden pt-20 hidden xl:block">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />
          </div>
          {/* Ambient Glow Effects - Optimized */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-2xl will-change-transform" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-slate-200/5 rounded-full blur-2xl will-change-transform" />
          </div>
          {/* Background Video */}
          <div className="absolute inset-0 z-0">
            <video
              src={backgroundVideoUrl}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
            {/* Keep the overlay very light so the video stays visible */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950/20 via-slate-950/15 to-slate-950/20" />
          </div>
          {/* Hero Content */}
          <div className="relative z-20 h-full flex items-center py-12">
            <div className="max-w-7xl mx-auto px-4 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left Side - Brand */}
                <div className="text-center lg:text-left space-y-8 animate-fade-in-left animation-delay-300">
                  {/* Badge */}
                  <div className="hidden md:flex sm:flex-row sm:items-center sm:justify-center md:justify-start animate-fade-in-up animation-delay-500">
                    <span className="inline-flex items-center gap-3 bg-slate-800/30 backdrop-blur-none border border-slate-700/30 px-5 py-2.5 rounded-full text-sm font-medium text-slate-200">
                      <div className="w-2 h-2 bg-slate-200 rounded-full animate-pulse" />
                      Cinema for acquired taste.
                      <Film className="w-4 h-4 text-slate-200" />
                    </span>
                  </div>
                  {/* Title */}
                  <h1 className="text-8xl md:text-8xl lg:text-8xl xl:text-8xl font-light leading-[0.9] tracking-tight animate-fade-in-up animation-delay-700">
                    <span className="text-slate-100 font-extralight">The</span>
                    <br />
                    <span className="bg-gradient-to-r from-slate-100 via-white to-slate-200 bg-clip-text text-transparent font-normal">
                      Cinéprism
                    </span>
                  </h1>

                  {/* Quotes Section - From MobileHero */}
                  <div className="relative max-w-2xl lg:mx-0 animate-fade-in-up animation-delay-900">
                    <style>{`
                      @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&display=swap');
                      .font-editorial { font-family: 'EB Garamond', Georgia, serif; }
                    `}</style>
                    <div className="min-h-[180px] flex items-center">
                      {quotes.length > 0 ? (
                        <motion.div
                          key={currentQuoteIndex}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.6 }}
                          className="w-full"
                        >
                          <div className="relative flex flex-col items-center">
                            {/* Quote text - centered */}
                            <div className="text-center mb-6 relative inline-block">
                              {/* Opening quote mark */}
                              <span className="absolute -left-4 -top-4 text-6xl font-editorial leading-none text-white/20">
                                "
                              </span>

                              <p
                                className="text-xl leading-relaxed font-editorial italic tracking-wide text-slate-200"
                                style={{ fontWeight: 400 }}
                              >
                                {quotes[currentQuoteIndex]?.quote}
                              </p>

                              {/* Closing quote mark */}
                              <span className="absolute -right-4 -bottom-2 text-6xl font-editorial leading-none text-white/20">
                                "
                              </span>
                            </div>

                            {/* Author attribution - centered with lines matching quote width */}
                            <div className="flex items-center gap-3 w-full justify-center">
                              <div className="h-px flex-1 bg-white/30 max-w-[100px]"></div>
                              <p
                                className="text-base font-editorial tracking-wider uppercase text-slate-400 whitespace-nowrap"
                                style={{ letterSpacing: "0.2em", fontWeight: 600 }}
                              >
                                {quotes[currentQuoteIndex]?.author}
                              </p>
                              <div className="h-px flex-1 bg-white/30 max-w-[100px]"></div>
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        <p className="text-lg leading-relaxed text-slate-300 font-light">
                          Deep dives, critical essays, and curated collections that celebrate the art of film.
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Side - Latest Review Card */}
                <div className="hidden lg:block animate-fade-in-right animation-delay-500">
                  <Tilt
                    glareEnable={true}
                    glareMaxOpacity={0.1}
                    glareColor="#f8fafc"
                    tiltMaxAngleX={10}
                    tiltMaxAngleY={10}
                    scale={1.02}
                  >
                    <div className="relative group cursor-pointer">
                      {/* "Latest Review" Badge */}
                      <div className="absolute -top-4 left-4 z-20 animate-fade-in-down animation-delay-800">
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl text-slate-200 px-4 py-2 rounded-2xl text-sm font-medium border border-white/10">
                          <div className="w-2 h-2 bg-slate-200 rounded-full animate-pulse" />
                          Latest Review
                        </div>
                      </div>

                      {/* Movie Poster */}
                      <div className="aspect-[3/4] relative rounded-2xl overflow-hidden shadow-2xl max-w-md mx-auto">
                        <AnimatePresence mode="wait">
                          {latestReviews.length > 0 && (
                            <motion.div
                              key={latestReviews[currentSlide % latestReviews.length]?.id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.5 }}
                              className="w-full h-full"
                            >
                              <img
                                src={
                                  latestReviews[currentSlide % latestReviews.length]
                                    ?.posterImageUrl ||
                                  "/placeholder.svg"
                                }
                                alt={latestReviews[currentSlide % latestReviews.length]?.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Dark overlay for text readability */}
                        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/95 via-black/60 to-transparent" />

                        {/* Information Overlay */}
                        {latestReviews.length > 0 && (
                          <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                            <h3 className="text-2xl font-bold mb-2 tracking-tight">
                              {latestReviews[currentSlide % latestReviews.length]?.title}
                            </h3>
                            <div className="flex items-center justify-between text-xs text-slate-200 mb-3">
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                  <span>{latestReviews[currentSlide % latestReviews.length]?.year}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                                  <span>{latestReviews[currentSlide % latestReviews.length]?.genres?.[0]}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Read Review Button */}
                      {latestReviews.length > 0 && (
                        <div className="absolute top-4 right-4 z-20">
                          <motion.button
                            whileTap={{ scale: 0.98 }}
                            onClick={() =>
                              navigate(`/post/${latestReviews[currentSlide % latestReviews.length]?.id}`)
                            }
                            className="backdrop-blur-md bg-white/90 text-black border-2 border-white/60 hover:bg-white hover:border-white px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-1 shadow-lg"
                          >
                            <span>Read Review</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </motion.button>
                        </div>
                      )}

                      {/* Slide Indicators */}
                      {latestReviews.length > 0 && (
                        <div className="flex justify-center gap-2 mt-4">
                          {latestReviews.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentSlide(index)}
                              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                index === currentSlide % latestReviews.length
                                  ? "bg-white shadow-lg scale-125"
                                  : "bg-white/40 hover:bg-white/70"
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </Tilt>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Hero Section - Only visible on mobile */}
        <div className="xl:hidden">
          <MobileHero heroPosters={heroPosters} currentSlide={currentSlide} />
        </div>
        <Top5Picks />
        <LatestReviews />
        <TrendingThisWeek />
        <ExploreByGenre />




      </div>
    </>
  );
}

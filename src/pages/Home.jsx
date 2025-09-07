import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import DuneImage from "../assets/Dune.jpg";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
import InterstellarImage from "../assets/Interstellar.jpg";
import HowToLoseImage from "../assets/howtoloseaguys.jpg";
import OppenHeimerImage from "../assets/oppenheimer.jpg";
import OppenHeimerFireImage from "../assets/oppenheimerfire.jpg";
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

export default function Homepage() {
  const [activeCard, setActiveCard] = useState(null);

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
      image: InterstellarImage,
      title: "Interstellar",
      subtitle: "Space Odyssey Masterpiece",
      year: "2014",
      rating: 8.6,
      genre: "Sci-Fi",
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
      <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
        {/* Desktop Hero Section - Hidden on Mobile */}
        <section className="relative h-screen overflow-hidden pt-20 hidden lg:block">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />
          </div>
          {/* Ambient Glow Effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-slate-200/5 rounded-full blur-3xl" />
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
          <div className="relative z-20 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left Side - Brand */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-center lg:text-left space-y-8"
                >
                  {/* Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="hidden md:flex sm:flex-row sm:items-center sm:justify-center md:justify-start"
                  >
                    <span className="inline-flex items-center gap-3 bg-slate-800/30 backdrop-blur-none border border-slate-700/30 px-5 py-2.5 rounded-full text-sm font-medium text-slate-200">
                      <div className="w-2 h-2 bg-slate-200 rounded-full animate-pulse" />
                      Cinema for acquired taste.
                      <Film className="w-4 h-4 text-slate-200" />
                    </span>
                  </motion.div>
                  {/* Title */}
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="text-8xl md:text-8xl lg:text-8xl xl:text-8xl font-light leading-[0.9] tracking-tight"
                  >
                    <span className="text-slate-100 font-extralight">The</span>
                    <br />
                    <span className="bg-gradient-to-r from-slate-100 via-white to-slate-200 bg-clip-text text-transparent font-normal">
                      Cinéprism
                    </span>
                  </motion.h1>

                  {/* Desktop Featured Content Card - Added here */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.9 }}
                    className="relative group max-w-md mx-auto lg:mx-0"
                  >
                    <div className="relative bg-slate-800/20 backdrop-blur-sm border border-slate-600/30 rounded-3xl p-6 transition-all duration-500">
                      <div className="flex items-start justify-between mb-4">
                        <div className="text-left">
                          <p className="text-xs text-slate-200 font-medium mb-2 uppercase tracking-wider">
                            Featured Review
                          </p>
                          <h3 className="text-lg font-light text-slate-100 mb-1">
                            {heroPosters[currentSlide].title}
                          </h3>
                          <p className="text-slate-400 text-xs">
                            {heroPosters[currentSlide].year} •{" "}
                            {heroPosters[currentSlide].genre}
                          </p>
                        </div>

                        <div className="flex items-center gap-1 bg-slate-800/40 backdrop-blur-xl border border-slate-600/40 text-slate-200 px-3 py-1.5 rounded-full">
                          <Star className="w-3 h-3 fill-current text-slate-200" />
                          <span className="text-xs font-semibold text-slate-200">
                            {heroPosters[currentSlide].rating}
                          </span>
                        </div>
                      </div>

                      <p className="text-slate-300 italic text-sm leading-relaxed text-left">
                        "{heroPosters[currentSlide].subtitle}"
                      </p>
                    </div>

                    {/* Desktop Film Navigation */}
                    <div className="flex items-center justify-center gap-3 mt-6">
                      {heroPosters.map((poster, index) => (
                        <motion.button
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className={`w-2 h-2 rounded-full transition-all duration-500 ${
                            index === currentSlide
                              ? "bg-slate-200 shadow-lg shadow-slate-200/20"
                              : "bg-slate-600/40 hover:bg-slate-500/60"
                          }`}
                        />
                      ))}
                    </div>
                  </motion.div>
                </motion.div>

                {/* Right Side - Movie Card */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="hidden lg:block"
                >
                  <Tilt
                    glareEnable={true}
                    glareMaxOpacity={0.1}
                    glareColor="#f8fafc"
                    tiltMaxAngleX={10}
                    tiltMaxAngleY={10}
                    scale={1.02}
                  >
                    <div
                      className="relative group cursor-pointer"
                      onMouseEnter={() => setIsHoveringCard(true)}
                      onMouseLeave={() => setIsHoveringCard(false)}
                    >
                      {/* "Now Featuring" Badge */}
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="absolute -top-4 left-4 z-20"
                      >
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl text-slate-200 px-4 py-2 rounded-2xl text-sm font-medium border border-white/10">
                          <div className="w-2 h-2 bg-slate-200 rounded-full animate-pulse" />
                          Now Featuring
                        </div>
                      </motion.div>
                      {/* Movie Poster */}
                      <div className="aspect-[3/4] relative rounded-2xl overflow-hidden shadow-2xl">
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={currentSlide}
                            src={
                              heroPosters[currentSlide].image ||
                              "/placeholder.svg"
                            }
                            alt={heroPosters[currentSlide].title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                          />
                        </AnimatePresence>
                        {/* Rating Badge */}
                        <div className="absolute top-4 right-4 z-10">
                          <div className="flex items-center gap-1 bg-black/40 backdrop-blur-xl px-3 py-1.5 rounded-2xl border border-white/10">
                            <Star className="w-4 h-4 text-slate-200 fill-current" />
                            <span className="text-white font-semibold text-sm">
                              {heroPosters[currentSlide].rating}
                            </span>
                          </div>
                        </div>
                        {/* Information Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                          <motion.h3
                            key={`title-${currentSlide}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-2xl font-bold mb-2 tracking-tight"
                          >
                            {heroPosters[currentSlide].title}
                          </motion.h3>
                          <motion.p
                            key={`subtitle-${currentSlide}`}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-slate-300 mb-3 leading-relaxed"
                          >
                            {heroPosters[currentSlide].subtitle}
                          </motion.p>
                          <motion.div
                            key={`meta-${currentSlide}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex items-center gap-3 text-sm text-slate-400"
                          >
                            <span>{heroPosters[currentSlide].year}</span>
                            <span>•</span>
                            <span>{heroPosters[currentSlide].genre}</span>
                          </motion.div>
                        </div>
                        {/* Hover Play Button */}
                        <AnimatePresence>
                          {isHoveringCard && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{ duration: 0.2 }}
                              className="absolute inset-0 flex items-center justify-center"
                            >
                              <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 shadow-lg">
                                <Play className="w-6 h-6 text-white ml-1" />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </Tilt>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Hero Section - Only visible on mobile */}
        <div className="lg:hidden">
          <MobileHero heroPosters={heroPosters} currentSlide={currentSlide} />
        </div>
        <TrendingThisWeek />
        <LatestReviews />
        {/* Bento Grid Section */}
        {/* Responsive Bento Grid Section */}
        <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
          {/* Ambient Background */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(16,185,129,0.03),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(59,130,246,0.03),transparent_50%)]" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 sm:mb-16 lg:mb-20"
            >
              <div className="inline-block mb-4 sm:mb-6">
                <span className="bg-white/5 backdrop-blur-xl text-emerald-400 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold border border-white/10">
                  🎬 Discover Cinema
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent tracking-tight px-4">
                Featured Content
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed px-4">
                Explore our curated collection of reviews, insights, and
                cinematic discoveries
              </p>
            </motion.div>

            {/* Responsive Bento Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 auto-rows-fr"
            >
              {bentoItems.map((item, index) => {
                // Define responsive grid classes based on item type and position
                let gridClasses = "";

                // Large featured items
                if (
                  item.type === "featured" ||
                  item.className?.includes("col-span-2")
                ) {
                  gridClasses =
                    "col-span-1 sm:col-span-2 lg:col-span-6 row-span-2";
                }
                // Wide items
                else if (
                  item.className?.includes("lg:col-span-2") ||
                  item.type === "wide"
                ) {
                  gridClasses =
                    "col-span-1 sm:col-span-2 lg:col-span-4 row-span-1";
                }
                // Tall items
                else if (
                  item.className?.includes("row-span-2") ||
                  item.type === "tall"
                ) {
                  gridClasses =
                    "col-span-1 sm:col-span-1 lg:col-span-3 row-span-2";
                }
                // Regular items
                else {
                  gridClasses =
                    "col-span-1 sm:col-span-1 lg:col-span-3 row-span-1";
                }

                return (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, y: -5 }}
                    onHoverStart={() => setActiveCard(item.id)}
                    onHoverEnd={() => setActiveCard(null)}
                    className={`${gridClasses} group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br ${item.gradient} backdrop-blur-xl border border-white/5 shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 cursor-pointer min-h-[200px] sm:min-h-[250px] lg:min-h-[300px]`}
                  >
                    {/* Background Image for Review Cards */}
                    {item.type === "review" || item.type === "featured" ? (
                      <div className="absolute inset-0">
                        <img
                          effect="blur"
                          width={"100%"}
                          height={"100%"}
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/70 via-slate-950/50 to-slate-950/80" />
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-white/[0.02]" />
                    )}

                    {/* Content */}
                    <div className="relative z-10 p-4 sm:p-6 h-full flex flex-col justify-between">
                      <div>
                        {/* Icon for Non-Image Cards */}
                        {item.icon && (
                          <div className="mb-3 sm:mb-4">
                            <item.icon className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400/80" />
                          </div>
                        )}

                        {/* Rating Badge */}
                        {item.rating && (
                          <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                            <div className="flex items-center gap-1 bg-black/40 backdrop-blur-xl px-2 sm:px-3 py-1 rounded-xl sm:rounded-2xl border border-white/10">
                              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                              <span className="text-white font-semibold text-xs sm:text-sm">
                                {item.rating}
                              </span>
                            </div>
                          </div>
                        )}

                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 leading-tight tracking-tight line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-slate-300 text-sm sm:text-base mb-3 sm:mb-4 leading-relaxed line-clamp-3">
                          {item.subtitle}
                        </p>

                        {/* Stats */}
                        {item.stats && (
                          <p className="text-emerald-400 font-semibold text-xs sm:text-sm">
                            {item.stats}
                          </p>
                        )}
                      </div>

                      {/* Bottom Content */}
                      <div className="flex items-center justify-between mt-auto">
                        {item.likes && (
                          <div className="flex items-center gap-2 sm:gap-4 text-slate-400 text-xs sm:text-sm">
                            <div className="flex items-center gap-1">
                              <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span className="hidden sm:inline">
                                {item.likes}
                              </span>
                              <span className="sm:hidden">
                                {item.likes.length > 3
                                  ? `${item.likes.slice(0, 3)}...`
                                  : item.likes}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span className="hidden sm:inline">
                                {item.comments}
                              </span>
                              <span className="sm:hidden">
                                {item.comments.length > 2
                                  ? `${item.comments.slice(0, 2)}...`
                                  : item.comments}
                              </span>
                            </div>
                            {item.views && (
                              <div className="hidden sm:flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                <span>{item.views}</span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Hover Arrow */}
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{
                            opacity: activeCard === item.id ? 1 : 0,
                            x: activeCard === item.id ? 0 : -10,
                          }}
                          transition={{ duration: 0.3 }}
                          className="text-emerald-400"
                        >
                          <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Hover Glow Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl sm:rounded-3xl"
                      initial={false}
                      animate={{ opacity: activeCard === item.id ? 1 : 0 }}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
        <ArticleSection />

        {/* New Sections */}

        <ExploreByGenre />
        <NewsletterCTA />
      </div>
    </>
  );
}

"use client";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import DuneImage from "../assets/Dune.jpg";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Heart,
  MessageCircle,
  Twitter,
  Play,
  TrendingUp,
  Award,
  Film,
  Users,
  Eye,
  ArrowUpRight,
} from "lucide-react";

import InterstellarImage from "../assets/Interstellar.jpg";
import HowToLoseImage from "../assets/howtoloseaguys.jpg";
import OppenHeimerImage from "../assets/oppenheimer.jpg";
import Tilt from "react-parallax-tilt";
import { useParallax } from "react-scroll-parallax";
import LatestReviews from "../components/LatestReviews"
import TrendingThisWeek from "../components/TrendingThisWeek"
import ExploreByGenre from "../components/ExploreByGenre"
import NewsletterCTA from "../components/NewsLetterCTA";
import FleabagImage2 from "../assets/fleebag2.jpg"

export default function Homepage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeCard, setActiveCard] = useState(null);
  const [isHoveringCard, setIsHoveringCard] = useState(false);

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


  const bentoItems = [
    {
      id: 1,
      type: "featured",
      title: "Oppenheimer",
      subtitle: "Nolan's Atomic Masterpiece",
      rating: 9.2,
      image: OppenHeimerImage,
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
      gradient: "from-emerald-500/10 to-teal-600/10",
    },
    {
      id: 3,
      type: "review",
      title: "Dune: Part Two",
      subtitle: "Sci-Fi Epic Continues",
      rating: 8.8,
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
      rating: 8.6,
      image: InterstellarImage,
      likes: 743,
      comments: 98,
      className: "col-span-1 row-span-1",
      gradient: "from-indigo-500/10 to-blue-600/10",
    },
    {
      id: 6,
      type: "awards",
      title: "Awards Season",
      subtitle: "Oscar Predictions 2024",
      icon: Award,
      stats: "15 predictions",
      className: "col-span-2 row-span-1",
      gradient: "from-yellow-500/10 to-orange-600/10",
    },
  ];

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
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden pt-20">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        {/* Ambient Glow Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        </div>

        {/* Parallax Background */}
        <div
          ref={useParallax({ speed: -20 }).ref}
          className="absolute inset-0 z-0"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <img
                src={heroPosters[currentSlide].image || "/placeholder.svg"}
                alt={heroPosters[currentSlide].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-950/70 to-slate-950/90" />
            </motion.div>
          </AnimatePresence>
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
                {/* Badge --- CHANGE: Softer text, icon has the accent color --- */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="hidden sm:flex"
                >
                  <span className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl text-slate-300 px-4 py-2 rounded-full text-sm font-medium border border-white/10">
                    <Film className="w-4 h-4 text-emerald-400" />
                    Cinema Reviews
                  </span>
                </motion.div>

                {/* Title - Kept as is, it's perfect */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="text-5xl md:text-7xl lg:text-6xl xl:text-7xl font-black leading-none tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent"
                >
                  The Cinéprism
                </motion.h1>

                {/* Tagline --- CHANGE: Unified color and wider spacing for an airy, premium feel --- */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className=" text-xl md:text-2xl text-slate-400 tracking-wider"
                >
                  Honest reviews. Sharp takes. Cinematic insights.
                </motion.p>

                {/* Buttons --- CHANGE: Modern pill shape and more elegant color scheme/hovers --- */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                  className="hidden"
                >
                  {/* Primary Button - Now an outline style that glows on hover */}
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="group border-2 border-emerald-500 text-emerald-400 hover:text-white hover:bg-emerald-500/10 hover:shadow-lg hover:shadow-emerald-500/20 font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Explore Reviews
                  </motion.button>

                  {/* Secondary Button - Softer border and a clean text color change on hover */}
                  <motion.button
                    whileHover={{
                      scale: 1.02,
                      y: -2,
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="border border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300"
                  >
                    Latest Posts
                  </motion.button>
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
                  glareColor="#10b981"
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
                      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl text-emerald-400 px-4 py-2 rounded-2xl text-sm font-medium border border-white/10">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
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
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
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

        {/* Refined Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
          <div className="flex items-center gap-2 bg-white/5 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/10">
            {heroPosters.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentSlide(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`relative overflow-hidden rounded-full transition-all duration-300 ${
                  index === currentSlide ? "w-8 h-2" : "w-2 h-2"
                }`}
              >
                <div
                  className={`w-full h-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-emerald-400"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                />
                {index === currentSlide && (
                  <motion.div
                    className="absolute inset-0 bg-emerald-300"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 6, ease: "linear" }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grid Section */}
      <section className="py-24 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
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
            className="text-center mb-20"
          >
            <div className="inline-block mb-6">
              <span className="bg-white/5 backdrop-blur-xl text-emerald-400 px-4 py-2 rounded-2xl text-sm font-semibold border border-white/10">
                🎬 Discover Cinema
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent tracking-tight">
              Featured Content
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Explore our curated collection of reviews, insights, and cinematic
              discoveries
            </p>
          </motion.div>

          {/* Bento Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {bentoItems.map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                onHoverStart={() => setActiveCard(item.id)}
                onHoverEnd={() => setActiveCard(null)}
                className={`${item.className} group relative overflow-hidden rounded-3xl bg-gradient-to-br ${item.gradient} backdrop-blur-xl border border-white/5 shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 cursor-pointer`}
              >
                {/* Background Image for Review Cards */}
                {item.type === "review" || item.type === "featured" ? (
                  <div className="absolute inset-0">
                    <LazyLoadImage
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
                <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                  <div>
                    {/* Icon for Non-Image Cards */}
                    {item.icon && (
                      <div className="mb-4">
                        <item.icon className="w-8 h-8 text-emerald-400/80" />
                      </div>
                    )}

                    {/* Rating Badge */}
                    {item.rating && (
                      <div className="absolute top-4 right-4">
                        <div className="flex items-center gap-1 bg-black/40 backdrop-blur-xl px-3 py-1 rounded-2xl border border-white/10">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white font-semibold text-sm">
                            {item.rating}
                          </span>
                        </div>
                      </div>
                    )}

                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-slate-300 text-sm md:text-base mb-4 leading-relaxed">
                      {item.subtitle}
                    </p>

                    {/* Stats */}
                    {item.stats && (
                      <p className="text-emerald-400 font-semibold text-sm">
                        {item.stats}
                      </p>
                    )}
                  </div>

                  {/* Bottom Content */}
                  <div className="flex items-center justify-between">
                    {item.likes && (
                      <div className="flex items-center gap-4 text-slate-400 text-sm">
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          <span>{item.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{item.comments}</span>
                        </div>
                        {item.views && (
                          <div className="flex items-center gap-1">
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
                      <ArrowUpRight className="w-5 h-5" />
                    </motion.div>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                  initial={false}
                  animate={{ opacity: activeCard === item.id ? 1 : 0 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* New Sections */}
      <LatestReviews />
      <TrendingThisWeek />
      <ExploreByGenre />
      <NewsletterCTA />
    </div>
  );
}

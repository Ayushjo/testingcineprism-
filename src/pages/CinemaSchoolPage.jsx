"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Camera,
  Grid,
  Scissors,
  Sun,
  Volume2,
  Award,
  Film,
  Star,
  Play,
  ChevronRight,
} from "lucide-react";

const CinemaSchoolPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeDifficulty, setActiveDifficulty] = useState("All");

  const lessons = [
    {
      id: 1,
      title: "180-Degree Rule",
      category: "Camera Work",
      difficulty: "Beginner",
      icon: "Camera",
      description:
        "The 180° Rule is a core filmmaking principle that keeps your audience oriented. Imagine an invisible line (the 'axis of action') drawn between two characters.",
      example:
        "In Michael Mann's Heat (1995), the famous Pacino–De Niro diner scene perfectly respects the 180° line, keeping audience orientation intact throughout.",
      route: "/180-degree-rule",
    },
    ,
    {
      id: 2,
      title: "Rule of Thirds",
      category: "Composition",
      difficulty: "Beginner",
      icon: "Grid",
      description:
        "Dividing the frame into nine equal sections for balanced and dynamic shots.",
      example: "Placing horizons on the upper or lower third.",
    },
    {
      id: 3,
      title: "Match Cut",
      category: "Editing",
      difficulty: "Intermediate",
      icon: "Scissors",
      description:
        "A cut between two shots that are matched by the action or subject matter.",
      example: "The bone-to-spaceship cut in 2001: A Space Odyssey.",
    },
    {
      id: 4,
      title: "Three-Point Lighting",
      category: "Lighting",
      difficulty: "Intermediate",
      icon: "Sun",
      description:
        "Using a key light, fill light, and back light to create depth and dimension.",
      example: "Classic Hollywood portrait lighting.",
    },
    {
      id: 5,
      title: "Diegetic Sound",
      category: "Sound Design",
      difficulty: "Beginner",
      icon: "Volume2",
      description:
        "Sound whose source is visible on the screen or whose source is implied to be present.",
      example: "Dialogue, footsteps, or music from a radio in the scene.",
    },
  ];

  const userProgress = {
    "Camera Work": { completed: 8, total: 8 },
    Editing: { completed: 4, total: 9 },
    "Sound Design": { completed: 2, total: 10 },
  };

  const userAchievements = [
    { id: 1, title: "Master of the 180° Rule", icon: "Award" },
    { id: 2, title: "Long Take Enthusiast", icon: "Film" },
    { id: 3, title: "Composition Expert", icon: "Star" },
  ];

  const getIcon = (iconName) => {
    const icons = {
      Camera,
      Grid,
      Scissors,
      Sun,
      Volume2,
      Award,
      Film,
      Star,
    };
    const IconComponent = icons[iconName];
    return IconComponent ? <IconComponent className="w-5 h-5" /> : null;
  };

  const categories = [
    "All",
    "Camera Work",
    "Editing",
    "Sound Design",
    "Lighting",
    "Composition",
  ];
  const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

  const filteredLessons = lessons.filter((lesson) => {
    const categoryMatch =
      activeCategory === "All" || lesson.category === activeCategory;
    const difficultyMatch =
      activeDifficulty === "All" || lesson.difficulty === activeDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const LessonCard = ({ lesson, index }) => {
    const handleLearnMore = () => {
      if (lesson.route) {
        // In a real app, you'd use your router here (e.g., Next.js router.push or React Router navigate)
        window.location.href = lesson.route;
      } else {
        // Fallback for lessons without dedicated pages
        alert(`${lesson.title} detailed page coming soon!`);
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group relative bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-emerald-500/30 hover:bg-slate-800/50 transition-all duration-300"
      >
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
            {getIcon(lesson.icon)}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 text-xs font-medium bg-slate-800/50 text-slate-300 rounded-full">
                {lesson.category}
              </span>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  lesson.difficulty === "Beginner"
                    ? "bg-green-500/20 text-green-300"
                    : lesson.difficulty === "Intermediate"
                    ? "bg-yellow-500/20 text-yellow-300"
                    : "bg-red-500/20 text-red-300"
                }`}
              >
                {lesson.difficulty}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-emerald-300 transition-colors">
              {lesson.title}
            </h3>
          </div>
        </div>

        <p className="text-slate-300 mb-3 leading-relaxed">
          {lesson.description}
        </p>

        <div className="mb-6">
          <p className="text-sm text-slate-400">
            <span className="font-medium text-emerald-300">Example:</span>{" "}
            {lesson.example}
          </p>
        </div>

        <button
          onClick={handleLearnMore}
          className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3 text-white font-medium hover:bg-emerald-500/20 hover:border-emerald-500/30 hover:text-emerald-300 transition-all duration-300 flex items-center justify-center gap-2 group"
        >
          Learn More
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-slate-200 to-emerald-300 bg-clip-text text-transparent mb-6">
            Cinema School
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Master the Art and Craft of Filmmaking
          </p>
        </motion.div>

        {/* Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 space-y-4"
        >
          {/* Difficulty Filters */}
          <div className="flex flex-wrap gap-3 justify-center">
            <span className="text-sm font-medium text-slate-400 self-center mr-2">
              Difficulty:
            </span>
            {difficulties.map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => setActiveDifficulty(difficulty)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeDifficulty === difficulty
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "bg-slate-800/50 text-slate-300 border border-slate-700/50 hover:bg-slate-700/50 hover:border-slate-600/50"
                }`}
              >
                {difficulty}
              </button>
            ))}
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 justify-center">
            <span className="text-sm font-medium text-slate-400 self-center mr-2">
              Topic:
            </span>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "bg-slate-800/50 text-slate-300 border border-slate-700/50 hover:bg-slate-700/50 hover:border-slate-600/50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Featured Article */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl overflow-hidden group hover:border-emerald-500/30 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-sm font-medium rounded-full">
                      Featured
                    </span>
                    <span className="px-3 py-1 bg-slate-800/50 text-slate-300 text-sm font-medium rounded-full">
                      Masterclass
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-emerald-300 transition-colors">
                    The Language of Cinema
                  </h2>
                  <p className="text-slate-300 text-lg leading-relaxed mb-6">
                    Discover how directors like Kubrick, Tarkovsky, and Scorsese
                    use visual storytelling techniques to create emotional depth
                    and narrative complexity.
                  </p>
                  <button className="bg-emerald-500/20 backdrop-blur-xl border border-emerald-500/30 rounded-xl px-6 py-3 text-emerald-300 font-medium hover:bg-emerald-500/30 hover:text-white transition-all duration-300 flex items-center gap-2 group">
                    <Play className="w-5 h-5" />
                    Start Learning
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
                <div className="relative">
                  <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 flex items-center justify-center">
                    <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-500/30">
                      <Play className="w-8 h-8 text-emerald-300 ml-1" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Lessons Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
        >
          {filteredLessons.map((lesson, index) => (
            <LessonCard key={lesson.id} lesson={lesson} index={index} />
          ))}
        </motion.div>

        {/* User Gamification */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-2 gap-8"
        >
          {/* Learning Progress */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-white mb-6">
              Your Learning Progress
            </h3>
            <div className="space-y-4">
              {Object.entries(userProgress).map(([topic, progress]) => (
                <div key={topic}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-300 font-medium">{topic}</span>
                    <span className="text-sm text-slate-400">
                      {progress.completed}/{progress.total}
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${
                          (progress.completed / progress.total) * 100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-white mb-6">
              Recent Achievements
            </h3>
            <div className="space-y-3">
              {userAchievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl border border-slate-700/30"
                >
                  <div className="p-2 bg-emerald-500/20 rounded-lg border border-emerald-500/30">
                    {getIcon(achievement.icon)}
                  </div>
                  <span className="text-slate-300 font-medium">
                    {achievement.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CinemaSchoolPage;

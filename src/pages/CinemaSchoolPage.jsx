"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Camera, Grid, Scissors, Sun, Volume2, Award, Film, Star, Play, ChevronRight,
  BookOpen, Target, Eye, Move, Lightbulb, Palette, Settings, Zap, Clock,
  Users, Headphones, Monitor, Edit, Layers, Filter, TrendingUp, Trophy,
  CheckCircle, Lock, ArrowRight, Search, GraduationCap, Badge
} from "lucide-react";

const CinemaSchoolPage = () => {
  const [activeDifficulty, setActiveDifficulty] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Comprehensive Cinema School Curriculum
  const curriculumData = {
    // BEGINNER LEVEL (12 topics)
    beginner: {
      "Camera Fundamentals": [
        {
          id: 1,
          title: "180-Degree Rule",
          category: "Camera Fundamentals",
          difficulty: "Beginner",
          icon: Camera,
          description: "Master the fundamental rule that keeps your audience oriented and your scenes coherent.",
          duration: "15 min",
          lessons: 4,
          route: "/180-degree-rule",
          status: "available",
          progress: 100
        },
        {
          id: 2,
          title: "Basic Camera Movements",
          category: "Camera Fundamentals",
          difficulty: "Beginner",
          icon: Move,
          description: "Learn pan, tilt, dolly, and zoom - the building blocks of dynamic cinematography.",
          duration: "12 min",
          lessons: 3,
          route: "/camera-movements",
          status: "coming-soon"
        },
        {
          id: 3,
          title: "Shot Types & Sizes",
          category: "Camera Fundamentals",
          difficulty: "Beginner",
          icon: Monitor,
          description: "From extreme wide shots to extreme close-ups - when and how to use each shot size.",
          duration: "18 min",
          lessons: 5,
          route: "/shot-types",
          status: "coming-soon"
        }
      ],
      "Composition": [
        {
          id: 4,
          title: "Rule of Thirds",
          category: "Composition",
          difficulty: "Beginner",
          icon: Grid,
          description: "Transform ordinary photos into compelling visual stories with this foundational composition technique.",
          duration: "12 min",
          lessons: 5,
          route: "/rule-of-thirds",
          status: "available",
          progress: 100
        },
        {
          id: 5,
          title: "Leading Lines",
          category: "Composition",
          difficulty: "Beginner",
          icon: Target,
          description: "Use natural and artificial lines to guide your viewer's eye through the frame.",
          duration: "10 min",
          lessons: 3,
          route: "/leading-lines",
          status: "coming-soon"
        },
        {
          id: 6,
          title: "Symmetry & Balance",
          category: "Composition",
          difficulty: "Beginner",
          icon: Layers,
          description: "Create visually pleasing compositions using symmetrical and asymmetrical balance.",
          duration: "14 min",
          lessons: 4,
          route: "/symmetry-balance",
          status: "coming-soon"
        }
      ],
      "Lighting Basics": [
        {
          id: 7,
          title: "Three-Point Lighting",
          category: "Lighting Basics",
          difficulty: "Beginner",
          icon: Sun,
          description: "Master the foundation of professional lighting with key, fill, and back lights.",
          duration: "16 min",
          lessons: 4,
          route: "/three-point-lighting",
          status: "coming-soon"
        },
        {
          id: 8,
          title: "Natural vs Artificial Light",
          category: "Lighting Basics",
          difficulty: "Beginner",
          icon: Lightbulb,
          description: "Understand when to use natural light and how to supplement with artificial sources.",
          duration: "13 min",
          lessons: 3,
          route: "/natural-artificial-light",
          status: "coming-soon"
        }
      ],
      "Sound Fundamentals": [
        {
          id: 9,
          title: "Diegetic vs Non-Diegetic Sound",
          category: "Sound Fundamentals",
          difficulty: "Beginner",
          icon: Volume2,
          description: "Learn the difference between sounds within and outside the story world.",
          duration: "11 min",
          lessons: 3,
          route: "/diegetic-sound",
          status: "coming-soon"
        },
        {
          id: 10,
          title: "Basic Audio Recording",
          category: "Sound Fundamentals",
          difficulty: "Beginner",
          icon: Headphones,
          description: "Essential techniques for capturing clean, professional audio on set.",
          duration: "15 min",
          lessons: 4,
          route: "/audio-recording",
          status: "coming-soon"
        }
      ],
      "Editing Essentials": [
        {
          id: 11,
          title: "Basic Cuts & Transitions",
          category: "Editing Essentials",
          difficulty: "Beginner",
          icon: Scissors,
          description: "Master the fundamental cuts: hard cuts, cross dissolves, and fade transitions.",
          duration: "14 min",
          lessons: 4,
          route: "/basic-cuts",
          status: "coming-soon"
        },
        {
          id: 12,
          title: "Continuity Editing",
          category: "Editing Essentials",
          difficulty: "Beginner",
          icon: Edit,
          description: "Maintain seamless flow and spatial continuity in your edit.",
          duration: "17 min",
          lessons: 5,
          route: "/continuity-editing",
          status: "coming-soon"
        }
      ]
    },

    // INTERMEDIATE LEVEL (15 topics)
    intermediate: {
      "Advanced Camera Work": [
        {
          id: 13,
          title: "Match Cuts & Visual Metaphors",
          category: "Advanced Camera Work",
          difficulty: "Intermediate",
          icon: Eye,
          description: "Create seamless transitions and deeper meaning through strategic match cutting.",
          duration: "20 min",
          lessons: 6,
          route: "/match-cuts",
          status: "coming-soon"
        },
        {
          id: 14,
          title: "Rack Focus Techniques",
          category: "Advanced Camera Work",
          difficulty: "Intermediate",
          icon: Target,
          description: "Guide attention and create dramatic reveals using focus shifts.",
          duration: "18 min",
          lessons: 5,
          route: "/rack-focus",
          status: "coming-soon"
        },
        {
          id: 15,
          title: "Handheld vs Stabilized",
          category: "Advanced Camera Work",
          difficulty: "Intermediate",
          icon: Move,
          description: "Choose the right camera stability for your storytelling needs.",
          duration: "16 min",
          lessons: 4,
          route: "/camera-stability",
          status: "coming-soon"
        }
      ],
      "Color & Visual Style": [
        {
          id: 16,
          title: "Color Theory in Film",
          category: "Color & Visual Style",
          difficulty: "Intermediate",
          icon: Palette,
          description: "Use color psychology to enhance mood and narrative in your films.",
          duration: "22 min",
          lessons: 6,
          route: "/color-theory",
          status: "coming-soon"
        },
        {
          id: 17,
          title: "Creating Visual Mood",
          category: "Color & Visual Style",
          difficulty: "Intermediate",
          icon: Filter,
          description: "Establish atmosphere through lighting, color, and visual texture.",
          duration: "19 min",
          lessons: 5,
          route: "/visual-mood",
          status: "coming-soon"
        }
      ],
      "Sound Design": [
        {
          id: 18,
          title: "Foley & Sound Effects",
          category: "Sound Design",
          difficulty: "Intermediate",
          icon: Volume2,
          description: "Create immersive soundscapes with practical and digital sound effects.",
          duration: "25 min",
          lessons: 7,
          route: "/foley-sound-effects",
          status: "coming-soon"
        },
        {
          id: 19,
          title: "Music & Score Integration",
          category: "Sound Design",
          difficulty: "Intermediate",
          icon: Headphones,
          description: "Blend music seamlessly with dialogue and sound effects.",
          duration: "21 min",
          lessons: 6,
          route: "/music-integration",
          status: "coming-soon"
        }
      ],
      "Advanced Editing": [
        {
          id: 20,
          title: "Rhythm & Pacing",
          category: "Advanced Editing",
          difficulty: "Intermediate",
          icon: Settings,
          description: "Control the emotional flow of your film through precise editing rhythm.",
          duration: "24 min",
          lessons: 7,
          route: "/rhythm-pacing",
          status: "coming-soon"
        },
        {
          id: 21,
          title: "Montage Techniques",
          category: "Advanced Editing",
          difficulty: "Intermediate",
          icon: Layers,
          description: "Master Soviet montage theory and modern montage applications.",
          duration: "26 min",
          lessons: 8,
          route: "/montage-techniques",
          status: "coming-soon"
        }
      ],
      "Lighting Design": [
        {
          id: 22,
          title: "Motivated Lighting",
          category: "Lighting Design",
          difficulty: "Intermediate",
          icon: Sun,
          description: "Create realistic lighting that serves both story and aesthetic.",
          duration: "23 min",
          lessons: 6,
          route: "/motivated-lighting",
          status: "coming-soon"
        },
        {
          id: 23,
          title: "Practical Lighting",
          category: "Lighting Design",
          difficulty: "Intermediate",
          icon: Lightbulb,
          description: "Use available light sources creatively in your scenes.",
          duration: "20 min",
          lessons: 5,
          route: "/practical-lighting",
          status: "coming-soon"
        }
      ]
    },

    // ADVANCED LEVEL (13 topics)
    advanced: {
      "Cinematic Language": [
        {
          id: 24,
          title: "Visual Storytelling",
          category: "Cinematic Language",
          difficulty: "Advanced",
          icon: BookOpen,
          description: "Tell complex stories purely through visual elements without dialogue.",
          duration: "35 min",
          lessons: 10,
          route: "/visual-storytelling",
          status: "coming-soon"
        },
        {
          id: 25,
          title: "Subtext & Symbolism",
          category: "Cinematic Language",
          difficulty: "Advanced",
          icon: Eye,
          description: "Layer deeper meanings into your visuals through symbolic imagery.",
          duration: "32 min",
          lessons: 9,
          route: "/subtext-symbolism",
          status: "coming-soon"
        }
      ],
      "Advanced Techniques": [
        {
          id: 26,
          title: "Long Takes & Sequence Shots",
          category: "Advanced Techniques",
          difficulty: "Advanced",
          icon: Film,
          description: "Master the art of extended single-shot sequences like Tarkovsky and Cuarón.",
          duration: "40 min",
          lessons: 12,
          route: "/long-takes",
          status: "coming-soon"
        },
        {
          id: 27,
          title: "Complex Camera Movements",
          category: "Advanced Techniques",
          difficulty: "Advanced",
          icon: Move,
          description: "Plan and execute sophisticated camera choreography.",
          duration: "38 min",
          lessons: 11,
          route: "/complex-movements",
          status: "coming-soon"
        }
      ],
      "Genre Mastery": [
        {
          id: 28,
          title: "Horror Film Techniques",
          category: "Genre Mastery",
          difficulty: "Advanced",
          icon: Zap,
          description: "Psychological and technical approaches to creating fear and suspense.",
          duration: "42 min",
          lessons: 13,
          route: "/horror-techniques",
          status: "coming-soon"
        },
        {
          id: 29,
          title: "Documentary Filmmaking",
          category: "Genre Mastery",
          difficulty: "Advanced",
          icon: Camera,
          description: "Capture reality with authenticity while maintaining cinematic quality.",
          duration: "45 min",
          lessons: 14,
          route: "/documentary-making",
          status: "coming-soon"
        }
      ],
      "Professional Workflow": [
        {
          id: 30,
          title: "Color Grading Fundamentals",
          category: "Professional Workflow",
          difficulty: "Advanced",
          icon: Palette,
          description: "Transform your footage through professional color correction and grading.",
          duration: "50 min",
          lessons: 15,
          route: "/color-grading",
          status: "coming-soon"
        },
        {
          id: 31,
          title: "Audio Post-Production",
          category: "Professional Workflow",
          difficulty: "Advanced",
          icon: Headphones,
          description: "Professional mixing, mastering, and sound design workflows.",
          duration: "48 min",
          lessons: 14,
          route: "/audio-post",
          status: "coming-soon"
        },
        {
          id: 32,
          title: "Industry Standards & Delivery",
          category: "Professional Workflow",
          difficulty: "Advanced",
          icon: Settings,
          description: "Meet professional delivery requirements for various platforms.",
          duration: "35 min",
          lessons: 10,
          route: "/industry-standards",
          status: "coming-soon"
        }
      ]
    }
  };

  // Flatten all lessons for filtering
  const allLessons = [];
  Object.values(curriculumData).forEach(level => {
    Object.values(level).forEach(categoryLessons => {
      allLessons.push(...categoryLessons);
    });
  });

  const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

  // Filter lessons
  const filteredLessons = allLessons.filter(lesson => {
    const difficultyMatch = activeDifficulty === "All" || lesson.difficulty === activeDifficulty;
    const searchMatch = searchTerm === "" ||
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchTerm.toLowerCase());
    return difficultyMatch && searchMatch;
  });

  // Progress data
  const userProgress = {
    "Camera Fundamentals": { completed: 2, total: 3 },
    "Composition": { completed: 1, total: 3 },
    "Lighting Basics": { completed: 0, total: 2 },
    "Sound Fundamentals": { completed: 0, total: 2 },
    "Editing Essentials": { completed: 0, total: 2 },
    "Advanced Camera Work": { completed: 0, total: 3 },
    "Color & Visual Style": { completed: 0, total: 2 },
    "Sound Design": { completed: 0, total: 2 },
    "Advanced Editing": { completed: 0, total: 2 },
    "Lighting Design": { completed: 0, total: 2 },
    "Cinematic Language": { completed: 0, total: 2 },
    "Advanced Techniques": { completed: 0, total: 2 },
    "Genre Mastery": { completed: 0, total: 2 },
    "Professional Workflow": { completed: 0, total: 3 }
  };

  const userAchievements = [
    { id: 1, title: "180-Degree Rule Master", icon: Camera, earned: true },
    { id: 2, title: "Composition Expert", icon: Grid, earned: true },
    { id: 3, title: "First Steps", icon: Star, earned: true },
    { id: 4, title: "Visual Storyteller", icon: Eye, earned: false },
    { id: 5, title: "Technical Perfectionist", icon: Settings, earned: false }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-500/20 text-green-300 border-green-500/30";
      case "Intermediate": return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "Advanced": return "bg-red-500/20 text-red-300 border-red-500/30";
      default: return "bg-slate-500/20 text-slate-300 border-slate-500/30";
    }
  };

  const getStatusIcon = (status, progress = 0) => {
    if (status === "available") {
      return progress === 100 ? (
        <CheckCircle className="w-4 h-4 text-green-400" />
      ) : (
        <Play className="w-4 h-4 text-emerald-400" />
      );
    }
    return <Lock className="w-4 h-4 text-slate-500" />;
  };

  const LessonCard = ({ lesson, index }) => {
    const handleLearnMore = () => {
      if (lesson.status === "available" && lesson.route) {
        window.location.href = lesson.route;
      } else {
        alert(`${lesson.title} coming soon! We're working hard to bring you this content.`);
      }
    };

    const IconComponent = lesson.icon;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className={`group relative border rounded-xl lg:rounded-2xl p-4 sm:p-6 transition-all duration-300 ${
          lesson.status === "available"
            ? "bg-slate-900/40 border-slate-700/30 hover:border-emerald-500/30 hover:bg-slate-800/50"
            : "bg-slate-900/20 border-slate-700/20 opacity-75"
        }`}
      >
        {/* Status indicator */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
          {getStatusIcon(lesson.status, lesson.progress)}
        </div>

        {/* Progress bar for completed lessons */}
        {lesson.progress > 0 && lesson.progress < 100 && (
          <div className="absolute top-0 left-0 w-full h-1 bg-slate-800 rounded-t-xl overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${lesson.progress}%` }}
            />
          </div>
        )}

        <div className="flex items-start gap-3 sm:gap-4 mb-4">
          <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl border transition-colors ${
            lesson.status === "available"
              ? "bg-emerald-500/10 border-emerald-500/20 group-hover:bg-emerald-500/20"
              : "bg-slate-700/20 border-slate-600/20"
          }`}>
            <IconComponent className={`w-4 h-4 sm:w-5 sm:h-5 ${
              lesson.status === "available" ? "text-emerald-400" : "text-slate-500"
            }`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2 py-1 text-xs font-medium bg-slate-800/50 text-slate-300 rounded-full">
                {lesson.category}
              </span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getDifficultyColor(lesson.difficulty)}`}>
                {lesson.difficulty}
              </span>
            </div>
            <h3 className={`text-lg sm:text-xl font-semibold mb-2 transition-colors ${
              lesson.status === "available"
                ? "text-white group-hover:text-emerald-300"
                : "text-slate-400"
            }`}>
              {lesson.title}
            </h3>
          </div>
        </div>

        <p className={`text-sm sm:text-base leading-relaxed mb-4 ${
          lesson.status === "available" ? "text-slate-300" : "text-slate-500"
        }`}>
          {lesson.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-400">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{lesson.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{lesson.lessons} lessons</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleLearnMore}
          disabled={lesson.status !== "available"}
          className={`w-full px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base ${
            lesson.status === "available"
              ? "bg-white/5 border border-white/10 text-white hover:bg-emerald-500/20 hover:border-emerald-500/30 hover:text-emerald-300"
              : "bg-slate-800/30 border border-slate-700/30 text-slate-500 cursor-not-allowed"
          }`}
        >
          {lesson.status === "available" ? (
            lesson.progress === 100 ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Review
              </>
            ) : (
              <>
                Learn More
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )
          ) : (
            <>
              <Lock className="w-4 h-4" />
              Coming Soon
            </>
          )}
        </button>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 pt-12 md:pt-0"
        >
          <div className="inline-flex items-center gap-2 sm:gap-3 bg-slate-900/60 backdrop-blur-xl px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-slate-700/50 mb-6 sm:mb-8">
            <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
            <span className="text-slate-300 font-medium text-sm sm:text-base">Professional Film Education</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-white via-slate-200 to-emerald-300 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight">
            Cinema School
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed px-4">
            Master the Art and Craft of Filmmaking through our comprehensive curriculum designed by industry professionals
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mt-8 sm:mt-12 text-sm sm:text-base">
            <div className="flex items-center gap-2 text-slate-400">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>32 Comprehensive Lessons</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Users className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>14 Topic Categories</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>3 Skill Levels</span>
            </div>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 sm:mb-12 space-y-4 sm:space-y-6"
        >
          {/* Search */}
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search lessons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-3 bg-slate-900/40 border border-slate-700/30 rounded-lg sm:rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500/50 focus:bg-slate-900/60 transition-all text-sm sm:text-base"
            />
          </div>

          {/* Difficulty Filters */}
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            <span className="text-xs sm:text-sm font-medium text-slate-400 self-center mr-2">
              Level:
            </span>
            {difficulties.map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => setActiveDifficulty(difficulty)}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                  activeDifficulty === difficulty
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "bg-slate-800/50 text-slate-300 border border-slate-700/50 hover:bg-slate-700/50 hover:border-slate-600/50"
                }`}
              >
                {difficulty}
              </button>
            ))}
          </div>

        </motion.div>

        {/* Featured Lesson */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 sm:mb-16"
        >
          <div className="relative bg-slate-900/40 border border-slate-700/30 rounded-2xl lg:rounded-3xl overflow-hidden group hover:border-emerald-500/30 transition-all duration-500 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative p-6 sm:p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-center">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs sm:text-sm font-medium rounded-full">
                      Featured
                    </span>
                    <span className="px-3 py-1 bg-slate-800/50 text-slate-300 text-xs sm:text-sm font-medium rounded-full">
                      Masterclass
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 group-hover:text-emerald-300 transition-colors">
                    Master the Language of Cinema
                  </h2>
                  <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
                    Discover how legendary directors like Kubrick, Tarkovsky, and Scorsese use visual storytelling techniques to create emotional depth and narrative complexity that transcends language barriers.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <button className="bg-emerald-500/20 border border-emerald-500/30 rounded-lg sm:rounded-xl px-4 sm:px-6 py-2 sm:py-3 text-emerald-300 font-medium hover:bg-emerald-500/30 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base">
                      <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                      Start Learning
                    </button>
                    <button className="bg-slate-800/40 border border-slate-700/40 rounded-lg sm:rounded-xl px-4 sm:px-6 py-2 sm:py-3 text-slate-300 font-medium hover:bg-slate-700/50 hover:border-slate-600/50 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base">
                      <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                      Course Overview
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl lg:rounded-2xl border border-slate-700/50 flex items-center justify-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-500/30">
                      <Play className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-300 ml-0.5 sm:ml-1" />
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
          className="mb-12 sm:mb-16"
        >
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {searchTerm || activeDifficulty !== "All"
                ? `Filtered Lessons (${filteredLessons.length})`
                : "All Lessons"}
            </h3>
            {filteredLessons.length > 0 && (
              <p className="text-sm text-slate-400">
                {filteredLessons.filter(l => l.status === "available").length} available
              </p>
            )}
          </div>

          {filteredLessons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {filteredLessons.map((lesson, index) => (
                <LessonCard key={lesson.id} lesson={lesson} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 sm:w-8 sm:h-8 text-slate-500" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-slate-400 mb-2">No lessons found</h3>
              <p className="text-slate-500 text-sm sm:text-base">Try adjusting your filters or search terms</p>
            </div>
          )}
        </motion.div>


      </div>
    </div>
  );
};

export default CinemaSchoolPage;
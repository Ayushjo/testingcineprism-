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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Cinema-themed Background SVG Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Film Strip Background Pattern */}
        <svg className="absolute top-0 left-0 w-full h-full opacity-[0.02]" viewBox="0 0 1200 800">
          <defs>
            <pattern id="filmStrip" x="0" y="0" width="120" height="800" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="120" height="800" fill="none"/>
              <rect x="10" y="0" width="100" height="800" fill="currentColor"/>
              {/* Film perforations */}
              {Array.from({length: 20}).map((_, i) => (
                <g key={i}>
                  <rect x="2" y={i * 40 + 10} width="8" height="20" fill="transparent" stroke="currentColor" strokeWidth="1"/>
                  <rect x="110" y={i * 40 + 10} width="8" height="20" fill="transparent" stroke="currentColor" strokeWidth="1"/>
                </g>
              ))}
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#filmStrip)" className="text-white"/>
        </svg>

        {/* Floating Camera Equipment */}
        <div className="absolute top-20 left-10 opacity-[0.03]">
          <svg width="200" height="200" viewBox="0 0 200 200" className="text-emerald-400">
            <g>
              {/* Vintage Camera */}
              <rect x="60" y="80" width="80" height="60" rx="8" fill="currentColor"/>
              <circle cx="100" cy="110" r="25" fill="none" stroke="currentColor" strokeWidth="3"/>
              <circle cx="100" cy="110" r="15" fill="currentColor" opacity="0.3"/>
              <rect x="70" y="90" width="15" height="6" rx="2" fill="currentColor"/>
              <rect x="115" y="90" width="15" height="6" rx="2" fill="currentColor"/>

              {/* Camera flash */}
              <rect x="85" y="65" width="30" height="15" rx="3" fill="currentColor" opacity="0.5"/>
              <circle cx="100" cy="72" r="4" fill="currentColor"/>

              <animateTransform attributeName="transform" type="rotate" values="0 100 100;5 100 100;0 100 100" dur="8s" repeatCount="indefinite"/>
            </g>
          </svg>
        </div>

        {/* Film Reel */}
        <div className="absolute top-40 right-20 opacity-[0.04]">
          <svg width="180" height="180" viewBox="0 0 180 180" className="text-blue-400">
            <g>
              <circle cx="90" cy="90" r="70" fill="none" stroke="currentColor" strokeWidth="3"/>
              <circle cx="90" cy="90" r="50" fill="none" stroke="currentColor" strokeWidth="2"/>
              <circle cx="90" cy="90" r="30" fill="none" stroke="currentColor" strokeWidth="2"/>
              <circle cx="90" cy="90" r="15" fill="currentColor"/>

              {/* Spokes */}
              {Array.from({length: 8}).map((_, i) => (
                <line key={i} x1="90" y1="90" x2={90 + 45 * Math.cos(i * Math.PI / 4)} y2={90 + 45 * Math.sin(i * Math.PI / 4)} stroke="currentColor" strokeWidth="2"/>
              ))}

              <animateTransform attributeName="transform" type="rotate" values="0 90 90;360 90 90" dur="20s" repeatCount="indefinite"/>
            </g>
          </svg>
        </div>

        {/* Director's Chair */}
        <div className="absolute bottom-40 left-20 opacity-[0.035]">
          <svg width="150" height="150" viewBox="0 0 150 150" className="text-yellow-400">
            <g>
              {/* Chair back */}
              <rect x="40" y="30" width="70" height="60" rx="5" fill="none" stroke="currentColor" strokeWidth="3"/>
              <rect x="45" y="35" width="60" height="50" fill="currentColor" opacity="0.2"/>

              {/* Chair seat */}
              <rect x="45" y="80" width="60" height="30" rx="3" fill="currentColor" opacity="0.3"/>

              {/* Chair legs */}
              <line x1="50" y1="110" x2="45" y2="130" stroke="currentColor" strokeWidth="3"/>
              <line x1="100" y1="110" x2="105" y2="130" stroke="currentColor" strokeWidth="3"/>
              <line x1="50" y1="30" x2="45" y2="15" stroke="currentColor" strokeWidth="3"/>
              <line x1="100" y1="30" x2="105" y2="15" stroke="currentColor" strokeWidth="3"/>

              {/* "DIRECTOR" text */}
              <text x="75" y="58" fontSize="8" fill="currentColor" textAnchor="middle" fontWeight="bold">DIRECTOR</text>
            </g>
          </svg>
        </div>

        {/* Clapperboard */}
        <div className="absolute bottom-20 right-40 opacity-[0.04]">
          <svg width="160" height="120" viewBox="0 0 160 120" className="text-purple-400">
            <g>
              <rect x="20" y="40" width="120" height="70" rx="6" fill="currentColor" opacity="0.3"/>
              <rect x="20" y="20" width="120" height="20" fill="none" stroke="currentColor" strokeWidth="2"/>

              {/* Clapper stripes */}
              {Array.from({length: 6}).map((_, i) => (
                <rect key={i} x={25 + i * 18} y="22" width="16" height="16" fill={i % 2 === 0 ? "currentColor" : "none"} opacity="0.6"/>
              ))}

              {/* Text areas */}
              <rect x="30" y="50" width="50" height="12" fill="none" stroke="currentColor" strokeWidth="1"/>
              <rect x="90" y="50" width="40" height="12" fill="none" stroke="currentColor" strokeWidth="1"/>
              <rect x="30" y="70" width="100" height="12" fill="none" stroke="currentColor" strokeWidth="1"/>
              <rect x="30" y="90" width="100" height="12" fill="none" stroke="currentColor" strokeWidth="1"/>

              <animateTransform attributeName="transform" type="translate" values="0 0;0 -3;0 0" dur="6s" repeatCount="indefinite"/>
            </g>
          </svg>
        </div>

        {/* Spotlight */}
        <div className="absolute top-60 left-1/3 opacity-[0.025]">
          <svg width="200" height="300" viewBox="0 0 200 300" className="text-yellow-300">
            <g>
              {/* Light beam */}
              <polygon points="90,50 110,50 140,250 60,250" fill="currentColor" opacity="0.1"/>

              {/* Spotlight fixture */}
              <ellipse cx="100" cy="40" rx="30" ry="15" fill="currentColor" opacity="0.4"/>
              <circle cx="100" cy="35" r="20" fill="currentColor" opacity="0.6"/>
              <circle cx="100" cy="35" r="12" fill="currentColor"/>

              {/* Support arm */}
              <line x1="100" y1="20" x2="100" y2="5" stroke="currentColor" strokeWidth="4"/>
              <circle cx="100" cy="5" r="6" fill="currentColor"/>

              <animate attributeName="opacity" values="0.025;0.035;0.025" dur="4s" repeatCount="indefinite"/>
            </g>
          </svg>
        </div>

        {/* Film Frames */}
        <div className="absolute top-1/2 right-10 opacity-[0.03]">
          <svg width="100" height="300" viewBox="0 0 100 300" className="text-green-400">
            <g>
              {Array.from({length: 5}).map((_, i) => (
                <g key={i}>
                  <rect x="20" y={i * 60 + 10} width="60" height="40" rx="3" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <rect x="25" y={i * 60 + 15} width="50" height="30" fill="currentColor" opacity="0.1"/>
                  {/* Film perforations */}
                  <rect x="10" y={i * 60 + 15} width="6" height="8" fill="currentColor" opacity="0.3"/>
                  <rect x="10" y={i * 60 + 27} width="6" height="8" fill="currentColor" opacity="0.3"/>
                  <rect x="84" y={i * 60 + 15} width="6" height="8" fill="currentColor" opacity="0.3"/>
                  <rect x="84" y={i * 60 + 27} width="6" height="8" fill="currentColor" opacity="0.3"/>
                </g>
              ))}
              <animateTransform attributeName="transform" type="translateY" values="0;-20;0" dur="10s" repeatCount="indefinite"/>
            </g>
          </svg>
        </div>

        {/* Movie Tickets */}
        <div className="absolute bottom-1/3 left-1/2 opacity-[0.035]">
          <svg width="150" height="100" viewBox="0 0 150 100" className="text-red-400">
            <g>
              {Array.from({length: 3}).map((_, i) => (
                <g key={i} transform={`translate(${i * 15}, ${i * 10}) rotate(${i * 5} 50 30)`}>
                  <rect x="20" y="20" width="80" height="40" rx="5" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1"/>
                  <circle cx="25" cy="40" r="3" fill="none" stroke="currentColor" strokeWidth="1"/>
                  <circle cx="95" cy="40" r="3" fill="none" stroke="currentColor" strokeWidth="1"/>
                  <line x1="30" y1="30" x2="60" y2="30" stroke="currentColor" strokeWidth="1"/>
                  <line x1="30" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="1"/>
                  <text x="75" y="38" fontSize="6" fill="currentColor" textAnchor="middle">CINEMA</text>
                </g>
              ))}
            </g>
          </svg>
        </div>

        {/* Popcorn Container */}
        <div className="absolute top-1/4 right-1/3 opacity-[0.03]">
          <svg width="120" height="180" viewBox="0 0 120 180" className="text-orange-400">
            <g>
              {/* Container */}
              <polygon points="30,60 90,60 85,160 35,160" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="2"/>

              {/* Popcorn pieces */}
              {Array.from({length: 8}).map((_, i) => (
                <circle key={i} cx={40 + (i % 3) * 15} cy={70 + Math.floor(i / 3) * 20} r={3 + Math.random() * 2} fill="currentColor" opacity="0.4"/>
              ))}

              {/* Container stripes */}
              <line x1="30" y1="80" x2="90" y2="80" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
              <line x1="32" y1="120" x2="88" y2="120" stroke="currentColor" strokeWidth="1" opacity="0.5"/>

              <text x="60" y="140" fontSize="8" fill="currentColor" textAnchor="middle">POPCORN</text>
            </g>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 relative z-10">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 pt-12 md:pt-0 relative"
        >
          {/* Background Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <svg className="absolute top-0 left-1/4 w-32 h-32 text-emerald-500/5" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="currentColor">
                <animate attributeName="r" values="40;45;40" dur="4s" repeatCount="indefinite"/>
              </circle>
            </svg>
            <svg className="absolute top-20 right-1/4 w-24 h-24 text-slate-500/5" viewBox="0 0 100 100">
              <rect x="25" y="25" width="50" height="50" fill="currentColor" transform="rotate(45 50 50)">
                <animateTransform attributeName="transform" type="rotate" values="45 50 50;90 50 50;45 50 50" dur="6s" repeatCount="indefinite"/>
              </rect>
            </svg>
          </div>

          <div className="relative z-10">
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

            {/* Stats with Enhanced Icons */}
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mt-8 sm:mt-12 text-sm sm:text-base">
              <div className="flex items-center gap-2 text-slate-400 bg-slate-900/30 rounded-full px-4 py-2 border border-slate-700/30">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
                <span>32 Comprehensive Lessons</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 bg-slate-900/30 rounded-full px-4 py-2 border border-slate-700/30">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span>14 Topic Categories</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 bg-slate-900/30 rounded-full px-4 py-2 border border-slate-700/30">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
                </svg>
                <span>3 Skill Levels</span>
              </div>
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

        {/* Hero Illustration Section */}
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
                  {/* Cinema Equipment SVG Illustration */}
                  <div className="aspect-video bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl lg:rounded-2xl border border-slate-700/50 flex items-center justify-center p-8 overflow-hidden">
                    <svg viewBox="0 0 400 300" className="w-full h-full max-w-sm">
                      {/* Camera Body */}
                      <g>
                        <rect x="120" y="120" width="160" height="100" rx="8" fill="#334155" stroke="#475569" strokeWidth="2"/>
                        <rect x="130" y="130" width="140" height="80" rx="4" fill="#1e293b"/>

                        {/* Lens */}
                        <circle cx="200" cy="170" r="35" fill="#0f172a" stroke="#374151" strokeWidth="2"/>
                        <circle cx="200" cy="170" r="25" fill="#111827" stroke="#4b5563" strokeWidth="1"/>
                        <circle cx="200" cy="170" r="15" fill="#000" opacity="0.8"/>

                        {/* Lens Reflection */}
                        <circle cx="195" cy="165" r="8" fill="#10b981" opacity="0.3"/>
                        <circle cx="192" cy="162" r="3" fill="#ffffff" opacity="0.6"/>

                        {/* Camera Details */}
                        <rect x="140" y="140" width="20" height="8" rx="2" fill="#374151"/>
                        <rect x="240" y="140" width="20" height="8" rx="2" fill="#374151"/>
                        <circle cx="160" cy="200" r="3" fill="#ef4444"/>
                        <circle cx="240" cy="200" r="3" fill="#10b981"/>
                      </g>

                      {/* Film Strip */}
                      <g>
                        <rect x="50" y="80" width="120" height="20" fill="#1f2937" stroke="#374151" strokeWidth="1"/>
                        <rect x="60" y="85" width="8" height="10" fill="#000"/>
                        <rect x="75" y="85" width="8" height="10" fill="#000"/>
                        <rect x="90" y="85" width="8" height="10" fill="#000"/>
                        <rect x="105" y="85" width="8" height="10" fill="#000"/>
                        <rect x="120" y="85" width="8" height="10" fill="#000"/>
                        <rect x="135" y="85" width="8" height="10" fill="#000"/>
                        <rect x="150" y="85" width="8" height="10" fill="#000"/>
                      </g>

                      {/* Director's Clapperboard */}
                      <g>
                        <rect x="280" y="60" width="80" height="60" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="2"/>
                        <rect x="280" y="60" width="80" height="15" fill="#000"/>
                        <rect x="280" y="75" width="80" height="15" fill="#fbbf24"/>
                        <rect x="280" y="90" width="80" height="15" fill="#000"/>
                        <rect x="280" y="105" width="80" height="15" fill="#fbbf24"/>

                        {/* Clapperboard Text */}
                        <text x="320" y="55" fontSize="8" fill="#ffffff" textAnchor="middle" fontWeight="bold">SCENE 1</text>
                        <text x="285" y="135" fontSize="6" fill="#ffffff">TAKE: 3</text>
                        <text x="340" y="135" fontSize="6" fill="#ffffff">CAM: A</text>
                      </g>

                      {/* Tripod */}
                      <g>
                        <line x1="200" y1="220" x2="180" y2="280" stroke="#374151" strokeWidth="3"/>
                        <line x1="200" y1="220" x2="220" y2="280" stroke="#374151" strokeWidth="3"/>
                        <line x1="200" y1="220" x2="200" y2="285" stroke="#374151" strokeWidth="3"/>
                        <circle cx="200" cy="218" r="6" fill="#475569"/>
                      </g>

                      {/* Spotlight */}
                      <g>
                        <ellipse cx="100" cy="40" rx="25" ry="15" fill="#fbbf24" opacity="0.2"/>
                        <circle cx="80" cy="30" r="12" fill="#1e293b" stroke="#475569" strokeWidth="2"/>
                        <circle cx="80" cy="30" r="8" fill="#fbbf24" opacity="0.8"/>
                        <line x1="68" y1="30" x2="40" y2="30" stroke="#374151" strokeWidth="2"/>
                        <circle cx="35" cy="30" r="4" fill="#475569"/>
                      </g>

                      {/* Floating Elements */}
                      <g opacity="0.6">
                        <circle cx="350" cy="180" r="2" fill="#10b981">
                          <animate attributeName="cy" values="180;170;180" dur="3s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="70" cy="160" r="1.5" fill="#fbbf24">
                          <animate attributeName="cy" values="160;150;160" dur="4s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="320" cy="200" r="1" fill="#ef4444">
                          <animate attributeName="cy" values="200;190;200" dur="2.5s" repeatCount="indefinite"/>
                        </circle>
                      </g>

                      {/* Grid Overlay (Rule of Thirds) */}
                      <g opacity="0.1">
                        <line x1="133" y1="20" x2="133" y2="280" stroke="#10b981" strokeWidth="1" strokeDasharray="2,2"/>
                        <line x1="267" y1="20" x2="267" y2="280" stroke="#10b981" strokeWidth="1" strokeDasharray="2,2"/>
                        <line x1="40" y1="100" x2="360" y2="100" stroke="#10b981" strokeWidth="1" strokeDasharray="2,2"/>
                        <line x1="40" y1="200" x2="360" y2="200" stroke="#10b981" strokeWidth="1" strokeDasharray="2,2"/>
                      </g>
                    </svg>
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
              {filteredLessons.map((lesson, index) => {
                // Add visual elements to specific cards
                const isSpecialCard = index % 6 === 2; // Every 3rd card in each row
                return (
                  <div key={lesson.id} className="relative">
                    <LessonCard lesson={lesson} index={index} />
                    {isSpecialCard && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center opacity-80">
                        <svg viewBox="0 0 24 24" className="w-3 h-3 text-white">
                          <path fill="currentColor" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16">
              {/* Enhanced No Results Illustration */}
              <div className="w-32 h-32 mx-auto mb-6 relative">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  {/* Empty Film Reel */}
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#374151" strokeWidth="3" strokeDasharray="10,5"/>
                  <circle cx="100" cy="100" r="20" fill="#1e293b" stroke="#475569" strokeWidth="2"/>
                  <circle cx="100" cy="100" r="12" fill="#0f172a"/>

                  {/* Search Icon */}
                  <circle cx="140" cy="60" r="15" fill="none" stroke="#6b7280" strokeWidth="3"/>
                  <line x1="152" y1="72" x2="165" y2="85" stroke="#6b7280" strokeWidth="3" strokeLinecap="round"/>

                  {/* Sad Face */}
                  <circle cx="85" cy="85" r="2" fill="#6b7280"/>
                  <circle cx="115" cy="85" r="2" fill="#6b7280"/>
                  <path d="M85 120 Q100 110 115 120" stroke="#6b7280" strokeWidth="2" fill="none" strokeLinecap="round"/>
                </svg>
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
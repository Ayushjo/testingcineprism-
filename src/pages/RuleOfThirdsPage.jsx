"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Camera,
  BookOpen,
  Video,
  FileText,
  Eye,
  Grid3X3,
  Move,
  AlertTriangle,
  Lightbulb,
  Target,
  ChevronRight,
  ExternalLink,
  CheckCircle,
  XCircle,
  RotateCcw,
  Trophy,
  Award,
  Clock,
  Star,
  Film,
  Zap,
  ArrowDown,
  Play,
  Quote,
  Image,
  Crop,
  Focus,
} from "lucide-react";

const RuleOfThirdsGuide = () => {
  const [showGrid, setShowGrid] = useState(true);
  const [quizState, setQuizState] = useState({
    currentQuestion: 0,
    selectedAnswers: {},
    showResults: false,
    score: 0,
  });
  const [readingProgress, setReadingProgress] = useState(0);

  // Reading progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(Math.min(progress, 100));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const quizQuestions = [
    {
      id: 1,
      question:
        "What does the Rule of Thirds primarily help with in photography and cinematography?",
      options: [
        {
          id: "a",
          text: "Making colors more vibrant",
          correct: false,
        },
        {
          id: "b",
          text: "Creating more balanced and visually interesting compositions",
          correct: true,
        },
        { id: "c", text: "Improving image sharpness", correct: false },
        {
          id: "d",
          text: "Reducing camera shake",
          correct: false,
        },
      ],
      explanation:
        "The Rule of Thirds creates visual balance and interest by placing important elements along grid lines or at intersection points, making compositions more dynamic than centered subjects.",
    },
    {
      id: 2,
      question:
        "Where should you typically place your main subject when following the Rule of Thirds?",
      options: [
        {
          id: "a",
          text: "Exactly in the center of the frame",
          correct: false,
        },
        {
          id: "b",
          text: "Along the grid lines or at intersection points",
          correct: true,
        },
        {
          id: "c",
          text: "In the corners of the frame",
          correct: false,
        },
        { id: "d", text: "At the very edge of the frame", correct: false },
      ],
      explanation:
        "Placing subjects along the imaginary grid lines or at their intersection points creates more dynamic and visually appealing compositions than centering everything.",
    },
    {
      id: 3,
      question:
        "Which is a good reason to intentionally break the Rule of Thirds?",
      options: [
        {
          id: "a",
          text: "To create symmetry or emphasize centrality",
          correct: true,
        },
        { id: "b", text: "To save storage space", correct: false },
        { id: "c", text: "To make editing faster", correct: false },
        {
          id: "d",
          text: "Because it's easier than following the rule",
          correct: false,
        },
      ],
      explanation:
        "Breaking the rule works well for symmetrical compositions, formal portraits, or when you want to emphasize the central importance of your subject.",
    },
    {
      id: 4,
      question:
        "In landscape photography, where should the horizon typically be placed according to the Rule of Thirds?",
      options: [
        {
          id: "a",
          text: "Always in the exact center",
          correct: false,
        },
        {
          id: "b",
          text: "Along the upper or lower third line",
          correct: true,
        },
        { id: "c", text: "At the very top of the frame", correct: false },
        { id: "d", text: "It doesn't matter", correct: false },
      ],
      explanation:
        "Placing the horizon on the upper third emphasizes the foreground, while the lower third emphasizes the sky. This creates more dynamic compositions than centering the horizon.",
    },
    {
      id: 5,
      question: "What are the 'power points' in the Rule of Thirds?",
      options: [
        { id: "a", text: "The corners of the frame", correct: false },
        {
          id: "b",
          text: "The four intersection points of the grid lines",
          correct: true,
        },
        { id: "c", text: "The center of each third", correct: false },
        { id: "d", text: "The edges of the frame", correct: false },
      ],
      explanation:
        "The power points are the four intersections where the horizontal and vertical grid lines cross. These spots naturally draw the viewer's eye and create strong focal points.",
    },
  ];

  const handleAnswerSelect = (questionIndex, optionId) => {
    setQuizState((prev) => ({
      ...prev,
      selectedAnswers: { ...prev.selectedAnswers, [questionIndex]: optionId },
    }));
  };

  const handleNextQuestion = () => {
    if (quizState.currentQuestion < quizQuestions.length - 1) {
      setQuizState((prev) => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
      }));
    } else {
      const correctAnswers = quizQuestions.reduce((count, question, index) => {
        const selectedOption = quizState.selectedAnswers[index];
        const correctOption = question.options.find((opt) => opt.correct);
        return selectedOption === correctOption.id ? count + 1 : count;
      }, 0);
      setQuizState((prev) => ({
        ...prev,
        showResults: true,
        score: correctAnswers,
      }));
    }
  };

  const resetQuiz = () => {
    setQuizState({
      currentQuestion: 0,
      selectedAnswers: {},
      showResults: false,
      score: 0,
    });
  };

  const InteractiveDiagram = () => {
    const [selectedExample, setSelectedExample] = useState(1);

    const examples = {
      1: {
        title: "Portrait Composition",
        description:
          "Subject positioned on right third line, eyes at upper power point",
        color: "from-blue-400 to-blue-600",
      },
      2: {
        title: "Landscape Composition",
        description: "Horizon on lower third, tree at left power point",
        color: "from-green-400 to-green-600",
      },
      3: {
        title: "Action Shot",
        description: "Moving subject on left third with space to 'move into'",
        color: "from-purple-400 to-purple-600",
      },
    };

    return (
      <div className="my-12 bg-slate-900/30 backdrop-blur-2xl border border-slate-700/30 rounded-3xl p-8 shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Interactive Demonstration
            </h3>
            <p className="text-slate-400">
              Click examples to see the rule in action
            </p>
          </div>
          <button
            onClick={() => setShowGrid(!showGrid)}
            className="px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-xl border border-emerald-500/30 hover:bg-emerald-500/30 transition-all duration-300 font-medium"
          >
            {showGrid ? "Hide Grid" : "Show Grid"}
          </button>
        </div>

        <div className="relative h-96 bg-slate-800/30 rounded-2xl border border-slate-700/20 overflow-hidden mb-6">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="h-full w-full"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 2px 2px, rgba(148,163,184,0.15) 1px, transparent 0)",
                backgroundSize: "32px 32px",
              }}
            />
          </div>

          {/* Rule of Thirds Grid */}
          {showGrid && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0"
            >
              {/* Vertical lines */}
              <div className="absolute left-1/3 top-0 bottom-0 w-0.5 bg-emerald-400/60" />
              <div className="absolute left-2/3 top-0 bottom-0 w-0.5 bg-emerald-400/60" />

              {/* Horizontal lines */}
              <div className="absolute top-1/3 left-0 right-0 h-0.5 bg-emerald-400/60" />
              <div className="absolute top-2/3 left-0 right-0 h-0.5 bg-emerald-400/60" />

              {/* Power points */}
              <div className="absolute top-1/3 left-1/3 w-3 h-3 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50 transform -translate-x-1.5 -translate-y-1.5" />
              <div className="absolute top-1/3 left-2/3 w-3 h-3 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50 transform -translate-x-1.5 -translate-y-1.5" />
              <div className="absolute top-2/3 left-1/3 w-3 h-3 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50 transform -translate-x-1.5 -translate-y-1.5" />
              <div className="absolute top-2/3 left-2/3 w-3 h-3 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50 transform -translate-x-1.5 -translate-y-1.5" />

              <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-emerald-300 text-sm font-semibold whitespace-nowrap bg-slate-900/80 px-3 py-1 rounded-lg border border-emerald-500/30">
                Rule of Thirds Grid
              </div>
            </motion.div>
          )}

          {/* Example compositions */}
          <motion.div
            key={selectedExample}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {selectedExample === 1 && (
              <div className="relative">
                <div
                  className={`w-16 h-20 bg-gradient-to-br ${examples[1].color} rounded-lg shadow-xl absolute left-2/3 top-1/3 transform -translate-x-1/2 -translate-y-1/2`}
                />
                <div className="absolute left-2/3 top-1/3 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-2" />
              </div>
            )}

            {selectedExample === 2 && (
              <div className="relative w-full h-full">
                <div className="absolute bottom-1/3 left-0 right-0 h-0.5 bg-green-400/80" />
                <div
                  className={`w-8 h-24 bg-gradient-to-t ${examples[2].color} rounded-t-lg absolute left-1/3 bottom-1/3 transform -translate-x-1/2`}
                />
              </div>
            )}

            {selectedExample === 3 && (
              <div className="relative">
                <div
                  className={`w-12 h-8 bg-gradient-to-br ${examples[3].color} rounded-lg shadow-xl absolute left-1/3 top-1/2 transform -translate-x-1/2 -translate-y-1/2`}
                />
                <div className="absolute left-1/3 top-1/2 w-8 h-0.5 bg-purple-300/60 transform translate-x-2" />
              </div>
            )}
          </motion.div>

          {/* Example buttons */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
            {[1, 2, 3].map((num) => {
              const isActive = selectedExample === num;
              const example = examples[num];
              return (
                <motion.button
                  key={num}
                  onClick={() => setSelectedExample(num)}
                  className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-lg"
                      : "bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-700/50"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Example {num}
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/30">
          <div className="flex items-center gap-3 mb-2">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
            <span className="font-semibold text-white">
              {examples[selectedExample].title}
            </span>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">
            {examples[selectedExample].description}. Notice how placing elements
            along the grid lines or at intersection points creates more dynamic
            and visually interesting compositions than centering everything.
          </p>
        </div>
      </div>
    );
  };

  const QuizSection = () => {
    const currentQuestion = quizQuestions[quizState.currentQuestion];
    const selectedAnswer = quizState.selectedAnswers[quizState.currentQuestion];
    const hasAnswered = selectedAnswer !== undefined;

    if (quizState.showResults) {
      const percentage = Math.round(
        (quizState.score / quizQuestions.length) * 100
      );
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="bg-slate-900/40 backdrop-blur-2xl border border-slate-700/30 rounded-3xl p-10 shadow-2xl">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-full flex items-center justify-center border-2 border-emerald-500/30 shadow-xl"
            >
              <Trophy className="w-16 h-16 text-emerald-300" />
            </motion.div>

            <h3 className="text-4xl font-bold text-white mb-4">
              Quiz Complete!
            </h3>
            <div className="mb-8">
              <div className="text-6xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-3">
                {quizState.score}/{quizQuestions.length}
              </div>
              <div className="text-2xl text-slate-300">{percentage}% Score</div>
            </div>

            <div className="mb-10">
              {percentage >= 80 ? (
                <div className="text-emerald-300">
                  <CheckCircle className="w-12 h-12 mx-auto mb-4" />
                  <p className="text-2xl font-bold mb-2">Outstanding!</p>
                  <p className="text-slate-400">
                    You've mastered the Rule of Thirds like a pro photographer.
                  </p>
                </div>
              ) : percentage >= 60 ? (
                <div className="text-blue-300">
                  <Award className="w-12 h-12 mx-auto mb-4" />
                  <p className="text-2xl font-bold mb-2">Well Done!</p>
                  <p className="text-slate-400">
                    You have a solid foundation. Keep practicing to perfect your
                    skills.
                  </p>
                </div>
              ) : (
                <div className="text-purple-300">
                  <Lightbulb className="w-12 h-12 mx-auto mb-4" />
                  <p className="text-2xl font-bold mb-2">Keep Learning!</p>
                  <p className="text-slate-400">
                    Review the concepts and try again. Every expert started as a
                    beginner.
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={resetQuiz}
              className="px-8 py-4 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 hover:from-emerald-500/30 hover:to-blue-500/30 text-white font-bold rounded-xl border border-emerald-500/30 transition-all duration-300 flex items-center gap-3 mx-auto shadow-lg"
            >
              <RotateCcw className="w-6 h-6" />
              Take Quiz Again
            </button>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        key={quizState.currentQuestion}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-slate-400 font-medium">
              Question {quizState.currentQuestion + 1} of {quizQuestions.length}
            </span>
            <span className="text-emerald-300 font-bold text-lg">
              {Math.round(
                ((quizState.currentQuestion + 1) / quizQuestions.length) * 100
              )}
              %
            </span>
          </div>
          <div className="w-full bg-slate-800/50 rounded-full h-3 shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${
                  ((quizState.currentQuestion + 1) / quizQuestions.length) * 100
                }%`,
              }}
              className="h-3 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 rounded-full shadow-lg"
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <div className="bg-slate-900/40 backdrop-blur-2xl border border-slate-700/30 rounded-3xl p-8 mb-8 shadow-xl">
          <h3 className="text-2xl font-bold text-white mb-8 leading-relaxed">
            {currentQuestion.question}
          </h3>

          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === option.id;
              const isCorrect = option.correct;
              const showCorrectAnswer = hasAnswered;

              let buttonClass =
                "w-full p-6 rounded-2xl border text-left transition-all duration-300 transform hover:scale-[1.02] ";

              if (showCorrectAnswer) {
                if (isCorrect) {
                  buttonClass +=
                    "bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 border-emerald-500/50 text-emerald-300 shadow-lg shadow-emerald-500/20";
                } else if (isSelected && !isCorrect) {
                  buttonClass +=
                    "bg-gradient-to-r from-red-500/20 to-red-600/20 border-red-500/50 text-red-300 shadow-lg shadow-red-500/20";
                } else {
                  buttonClass +=
                    "bg-slate-800/30 border-slate-700/50 text-slate-400";
                }
              } else if (isSelected) {
                buttonClass +=
                  "bg-gradient-to-r from-blue-500/20 to-blue-600/20 border-blue-500/50 text-blue-300 shadow-lg shadow-blue-500/20";
              } else {
                buttonClass +=
                  "bg-slate-800/20 border-slate-700/40 text-slate-300 hover:bg-slate-700/30 hover:border-slate-600/50 hover:text-white hover:shadow-xl";
              }

              return (
                <motion.button
                  key={option.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() =>
                    !hasAnswered &&
                    handleAnswerSelect(quizState.currentQuestion, option.id)
                  }
                  className={buttonClass}
                  disabled={hasAnswered}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="w-10 h-10 rounded-full border-2 border-current flex items-center justify-center font-bold text-lg">
                        {option.id.toUpperCase()}
                      </span>
                      <span className="text-lg">{option.text}</span>
                    </div>
                    {showCorrectAnswer && (
                      <div>
                        {isCorrect && <CheckCircle className="w-6 h-6" />}
                        {isSelected && !isCorrect && (
                          <XCircle className="w-6 h-6" />
                        )}
                      </div>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {hasAnswered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ delay: 0.3 }}
              className="mt-8 p-6 bg-slate-800/40 rounded-2xl border border-slate-700/30"
            >
              <div className="flex items-start gap-4">
                <Lightbulb className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-white mb-2 text-lg">
                    Explanation
                  </h4>
                  <p className="text-slate-300 leading-relaxed">
                    {currentQuestion.explanation}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {hasAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <button
              onClick={handleNextQuestion}
              className="px-8 py-4 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 hover:from-emerald-500/30 hover:to-blue-500/30 text-white font-bold rounded-xl border border-emerald-500/30 transition-all duration-300 flex items-center gap-3 mx-auto shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {quizState.currentQuestion < quizQuestions.length - 1 ? (
                <>
                  Next Question <ChevronRight className="w-6 h-6" />
                </>
              ) : (
                <>
                  View Results <Trophy className="w-6 h-6" />
                </>
              )}
            </button>
          </motion.div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-800/50 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-emerald-500 to-blue-500"
          style={{ width: `${readingProgress}%` }}
          initial={{ width: 0 }}
        />
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-blue-500/5 to-purple-500/5" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 25%, rgba(16, 185, 129, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
          }}
        />

        <div className="max-w-4xl mx-auto px-6 py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 bg-slate-900/60 backdrop-blur-xl px-6 py-3 rounded-full border border-slate-700/50 mb-8">
              <Camera className="w-5 h-5 text-emerald-400" />
              <span className="text-slate-300 font-medium">
                Photography Masterclass
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-black bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent mb-6 leading-tight">
              The Complete Guide to
              <br />
              <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                The Rule of Thirds
              </span>
            </h1>

            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-12">
              Master the foundational composition technique that transforms
              ordinary photos into compelling visual stories. From basic
              principles to creative applications, learn when to follow the
              rule—and when to break it for artistic impact.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>12 min read</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>Beginner Friendly</span>
              </div>
              <div className="flex items-center gap-2">
                <Image className="w-4 h-4" />
                <span>Interactive Examples</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16 text-center"
          >
            <ArrowDown className="w-6 h-6 text-slate-400 mx-auto animate-bounce" />
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Introduction */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="prose prose-invert prose-lg max-w-none">
            <div className="bg-slate-900/30 backdrop-blur-xl border border-slate-700/30 rounded-3xl p-8 mb-12 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Quote className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xl text-slate-200 leading-relaxed font-medium italic">
                    "The Rule of Thirds is your gateway to better composition.
                    Master it first, then learn when breaking it serves your
                    artistic vision."
                  </p>
                  <p className="text-slate-400 mt-2">
                    — Fundamental principle used by artists and photographers
                    for centuries
                  </p>
                </div>
              </div>
            </div>

            <p className="text-xl text-slate-200 leading-relaxed mb-8 font-medium">
              Imagine looking at a photograph where everything feels perfectly
              balanced and draws your eye naturally through the frame. That's
              the power of the Rule of Thirds at work—a simple yet
              transformative composition technique.
            </p>

            <p className="text-lg text-slate-300 leading-relaxed mb-8">
              The Rule of Thirds is one of the most fundamental principles in
              photography and visual arts, yet it's often dismissed as "just a
              beginner's rule." This comprehensive guide will show you why it
              works, how to apply it effectively, and most importantly, when
              breaking it creates even more powerful images.
            </p>
          </div>
        </motion.section>

        {/* What is the Rule of Thirds */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-white mb-8 flex items-center gap-3">
            <Grid3X3 className="w-8 h-8 text-emerald-400" />
            What is the Rule of Thirds?
          </h2>

          <div className="bg-slate-900/30 backdrop-blur-xl border border-slate-700/30 rounded-3xl p-8 mb-8 shadow-xl">
            <p className="text-lg text-slate-200 leading-relaxed mb-6">
              The Rule of Thirds divides your frame into nine equal sections
              with two horizontal and two vertical lines. Instead of placing
              your subject dead center, you position key elements along these
              lines or at their{" "}
              <strong className="text-emerald-300">intersection points</strong>
              —known as <strong className="text-blue-300">power points</strong>.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-slate-800/40 rounded-2xl p-6 border border-slate-700/30">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="font-bold text-white">Following the Rule</h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Place important elements along grid lines or at intersection
                  points. This creates visual balance, draws the eye naturally,
                  and makes compositions more dynamic than centered subjects.
                </p>
              </div>

              <div className="bg-slate-800/40 rounded-2xl p-6 border border-slate-700/30">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="font-bold text-white">Power Points</h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  The four intersection points are the strongest positions in
                  your frame. Placing subjects here creates immediate visual
                  impact and natural focal points.
                </p>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-blue-300 mb-2">Key Insight</h4>
                  <p className="text-slate-300 leading-relaxed">
                    The rule works because it mimics how our eyes naturally scan
                    images—we don't look at the center first, but rather follow
                    a Z-pattern that hits these key intersection points.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Interactive Demonstration */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-white mb-8 flex items-center gap-3">
            <Play className="w-8 h-8 text-emerald-400" />
            See It in Action
          </h2>

          <InteractiveDiagram />
        </motion.section>

        {/* Why It Matters */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-white mb-8 flex items-center gap-3">
            <Eye className="w-8 h-8 text-emerald-400" />
            Why It Matters: The Psychology of Visual Balance
          </h2>

          <div className="prose prose-invert prose-lg max-w-none mb-8">
            <p className="text-lg text-slate-200 leading-relaxed mb-6">
              Our brains are hardwired to find asymmetrical compositions more
              engaging than perfectly centered ones. The Rule of Thirds creates
              visual tension and balance that keeps viewers interested and
              guides their eye through the frame naturally.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/30 rounded-2xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Visual Balance
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Creates harmonious compositions that feel natural and pleasing
                to the eye, even when elements aren't perfectly symmetrical.
              </p>
            </div>

            <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/30 rounded-2xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Eye Movement
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Guides the viewer's gaze through your image in a natural,
                flowing way that creates visual interest and engagement.
              </p>
            </div>

            <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/30 rounded-2xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                <Focus className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Subject Emphasis
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Makes your main subject stand out while maintaining context with
                the surrounding environment and supporting elements.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Real-World Examples */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-white mb-8 flex items-center gap-3">
            <Image className="w-8 h-8 text-emerald-400" />
            Masterclass Examples
          </h2>

          <div className="mb-12">
            <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/30 rounded-3xl overflow-hidden shadow-2xl">
              <div className="aspect-video bg-slate-800 relative">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/T1C4eSZface"
                  title="Rule of Thirds Photography Tutorial"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      Rule of Thirds - Photography Composition
                    </h3>
                    <p className="text-slate-400">
                      Professional techniques explained
                    </p>
                  </div>
                </div>
                <p className="text-slate-300 leading-relaxed mb-4">
                  See how professional photographers use the Rule of Thirds
                  across different genres—from portraits and landscapes to
                  street photography and architecture. Notice how the technique
                  adapts to different subjects while maintaining its
                  effectiveness.
                </p>
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <p className="text-sm text-slate-400 italic">
                    "This video demonstrates the versatility of the Rule of
                    Thirds and shows why it remains one of the most reliable
                    composition tools in visual arts."
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/30 rounded-2xl overflow-hidden shadow-xl">
              <div className="aspect-video bg-slate-800">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/7ZVyNjKSr0M"
                  title="Rule of Thirds in Famous Paintings"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-6">
                <h4 className="text-lg font-bold text-white mb-2">
                  Art History Analysis
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Discover how master painters have used the Rule of Thirds for
                  centuries, long before photography existed.
                </p>
              </div>
            </div>

            <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/30 rounded-2xl overflow-hidden shadow-xl">
              <div className="aspect-video bg-slate-800">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/MdQF0OqslZ8"
                  title="Landscape Photography Rule of Thirds"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-6">
                <h4 className="text-lg font-bold text-white mb-2">
                  Landscape Applications
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Learn how to apply the rule to horizons, leading lines, and
                  natural elements in outdoor photography.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* When to Break the Rule */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-white mb-8 flex items-center gap-3">
            <AlertTriangle className="w-8 h-8 text-red-400" />
            Breaking the Rule: When and Why
          </h2>

          <div className="bg-red-500/10 border border-red-500/20 rounded-3xl p-8 mb-8 shadow-xl">
            <div className="flex items-start gap-4">
              <Zap className="w-8 h-8 text-red-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Advanced Technique: Creative Rule Breaking
                </h3>
                <p className="text-lg text-slate-200 leading-relaxed mb-6">
                  Once you understand why the Rule of Thirds works, you can
                  break it intentionally for artistic effect. Centered
                  compositions can be powerful when they serve a specific
                  purpose.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6 mb-10">
            <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/30 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-white mb-6">
                When Breaking the Rule Works Best
              </h3>

              <div className="space-y-6">
                <div className="border-l-4 border-purple-500 pl-6 bg-purple-500/5 rounded-r-xl p-4">
                  <h4 className="text-xl font-bold text-purple-300 mb-2">
                    Symmetrical Compositions
                  </h4>
                  <p className="text-slate-300 leading-relaxed mb-3">
                    Perfect symmetry demands centered subjects. Architecture,
                    reflections, and formal portraits often work better when
                    perfectly balanced and centered.
                  </p>
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <p className="text-sm text-slate-400 italic">
                      "Symmetry creates a sense of order, formality, and
                      timeless elegance that off-center compositions can't
                      achieve."
                    </p>
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 pl-6 bg-blue-500/5 rounded-r-xl p-4">
                  <h4 className="text-xl font-bold text-blue-300 mb-2">
                    Patterns and Textures
                  </h4>
                  <p className="text-slate-300 leading-relaxed mb-3">
                    When the entire frame is your subject—like repeating
                    patterns or detailed textures—centering the composition can
                    emphasize the uniformity and create meditative images.
                  </p>
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <p className="text-sm text-slate-400 italic">
                      "Pattern photography often benefits from central framing
                      to showcase the repetitive elements equally across the
                      frame."
                    </p>
                  </div>
                </div>

                <div className="border-l-4 border-emerald-500 pl-6 bg-emerald-500/5 rounded-r-xl p-4">
                  <h4 className="text-xl font-bold text-emerald-300 mb-2">
                    Minimalist Photography
                  </h4>
                  <p className="text-slate-300 leading-relaxed mb-3">
                    In minimalist compositions with lots of negative space,
                    centering your single subject can create powerful isolation
                    and emphasize the emptiness around it.
                  </p>
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <p className="text-sm text-slate-400 italic">
                      "Centered subjects in minimal compositions create
                      contemplative images that emphasize solitude and space."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/30 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Crop className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl font-bold text-white">
                  Alternative Compositions
                </h3>
              </div>
              <p className="text-slate-300 leading-relaxed mb-4">
                Explore other composition techniques:
              </p>
              <ul className="text-slate-300 space-y-2 text-sm">
                <li>• Golden ratio for more refined proportions</li>
                <li>• Central composition for formal balance</li>
                <li>• Dynamic symmetry for classical elegance</li>
                <li>• Fibonacci spiral for natural flow</li>
              </ul>
            </div>

            <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/30 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="w-6 h-6 text-yellow-400" />
                <h3 className="text-xl font-bold text-white">
                  Creative Applications
                </h3>
              </div>
              <p className="text-slate-300 leading-relaxed mb-4">
                Break the rule effectively for:
              </p>
              <ul className="text-slate-300 space-y-2 text-sm">
                <li>• Creating perfect symmetry or balance</li>
                <li>• Emphasizing isolation or solitude</li>
                <li>• Showcasing patterns or textures</li>
                <li>• Making bold artistic statements</li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Practical Implementation */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-white mb-8 flex items-center gap-3">
            <Camera className="w-8 h-8 text-emerald-400" />
            Practical Implementation Guide
          </h2>

          <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/30 rounded-3xl p-8 mb-8 shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-6">
              Step-by-Step Process
            </h3>

            <div className="space-y-6">
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-emerald-300 font-bold">1</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">
                    Enable Grid Lines
                  </h4>
                  <p className="text-slate-300 leading-relaxed">
                    Turn on grid lines in your camera or smartphone settings.
                    This overlay will help you visualize the Rule of Thirds
                    while composing your shots.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-300 font-bold">2</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">
                    Identify Your Main Subject
                  </h4>
                  <p className="text-slate-300 leading-relaxed">
                    Before composing, decide what the primary focus of your
                    image should be. This will be placed on a grid line or power
                    point.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-300 font-bold">3</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">
                    Position and Balance
                  </h4>
                  <p className="text-slate-300 leading-relaxed">
                    Place your subject along a grid line or at an intersection.
                    Consider what balances the composition on the other side of
                    the frame.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-yellow-300 font-bold">4</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">
                    Review and Refine
                  </h4>
                  <p className="text-slate-300 leading-relaxed">
                    Take the shot, then review. Does it feel balanced? Does your
                    eye flow naturally through the frame? Adjust as needed.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6">
            <div className="flex items-start gap-3">
              <Target className="w-6 h-6 text-emerald-400 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-emerald-300 mb-2 text-lg">
                  Practice Exercise
                </h4>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Take 10 photos of the same subject: 3 using the Rule of
                  Thirds, 3 centered, and 4 experimenting with different
                  positions. Compare how each composition feels and affects the
                  story you're telling.
                </p>
                <div className="bg-slate-800/30 rounded-lg p-4">
                  <p className="text-slate-400 text-sm">
                    <strong className="text-emerald-300">Pro tip:</strong> Start
                    with still subjects like flowers or architecture before
                    moving to people or moving subjects. This helps you focus
                    purely on composition without worrying about timing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Quiz Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-white mb-8 flex items-center gap-3">
            <Award className="w-8 h-8 text-emerald-400" />
            Test Your Knowledge
          </h2>

          <div className="mb-8">
            <p className="text-lg text-slate-300 leading-relaxed">
              Ready to put your understanding to the test? This interactive quiz
              covers everything from basic principles to advanced applications
              of the Rule of Thirds.
            </p>
          </div>

          <QuizSection />
        </motion.section>

        {/* Resources Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-white mb-8 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-emerald-400" />
            Further Learning Resources
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/30 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Video className="w-6 h-6 text-emerald-300" />
                <h3 className="font-bold text-white text-lg">
                  Video Masterclasses
                </h3>
              </div>
              <div className="space-y-4">
                <a
                  href="https://www.youtube.com/watch?v=T1C4eSZface"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-4 bg-slate-800/40 rounded-xl hover:bg-slate-700/50 transition-all duration-300 group"
                >
                  <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-emerald-400 transition-colors" />
                  <div>
                    <p className="text-white font-semibold group-hover:text-emerald-300 transition-colors">
                      Photography Composition Guide
                    </p>
                    <p className="text-slate-400 text-sm">
                      Professional techniques and real-world examples
                    </p>
                  </div>
                </a>
                <a
                  href="https://www.youtube.com/watch?v=7ZVyNjKSr0M"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-4 bg-slate-800/40 rounded-xl hover:bg-slate-700/50 transition-all duration-300 group"
                >
                  <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-emerald-400 transition-colors" />
                  <div>
                    <p className="text-white font-semibold group-hover:text-emerald-300 transition-colors">
                      Art History Analysis
                    </p>
                    <p className="text-slate-400 text-sm">
                      How masters used the rule before photography
                    </p>
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/30 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-blue-300" />
                <h3 className="font-bold text-white text-lg">
                  Deep Dive Articles
                </h3>
              </div>
              <div className="space-y-4">
                <a
                  href="https://photographylife.com/rule-of-thirds"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-4 bg-slate-800/40 rounded-xl hover:bg-slate-700/50 transition-all duration-300 group"
                >
                  <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
                  <div>
                    <p className="text-white font-semibold group-hover:text-blue-300 transition-colors">
                      Photography Life Guide
                    </p>
                    <p className="text-slate-400 text-sm">
                      Advanced composition techniques and theory
                    </p>
                  </div>
                </a>
                <div className="p-4 bg-slate-800/40 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <Image className="w-5 h-5 text-purple-400" />
                    <p className="text-white font-semibold">
                      Recommended Practice Subjects
                    </p>
                  </div>
                  <ul className="text-slate-400 text-sm space-y-1">
                    <li>• Portraits - Eyes on power points</li>
                    <li>• Landscapes - Horizon on third lines</li>
                    <li>• Architecture - Strong vertical/horizontal lines</li>
                    <li>• Street photography - Leading lines and subjects</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
        {/* Conclusion */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-2xl border border-slate-700/30 rounded-3xl p-10 shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-6">
                Master the Rule, Then Make It Your Own
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto mb-8">
                The Rule of Thirds isn't a limitation—it's a foundation that
                helps you create compelling compositions consistently. Master
                the basics first, understand why it works, and then you'll know
                exactly when breaking it serves your artistic vision.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Composition Mastered</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-blue-400" />
                  <span>Visual Balance Developed</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-purple-400" />
                  <span>Creative Breaking Understood</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center py-12"
        >
          <div className="bg-slate-900/30 backdrop-blur-xl border border-slate-700/30 rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Apply What You've Learned?
            </h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto leading-relaxed">
              The best way to master the Rule of Thirds is through practice.
              Start with simple subjects, then experiment with more complex
              compositions as your confidence grows.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="px-6 py-3 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-semibold rounded-xl border border-emerald-500/30 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Review the Guide
              </button>
              <a
                href="#quiz"
                className="px-6 py-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 font-semibold rounded-xl border border-blue-500/30 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Award className="w-5 h-5" />
                Retake the Quiz
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RuleOfThirdsGuide;

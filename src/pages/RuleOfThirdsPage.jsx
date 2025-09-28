"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Camera, BookOpen, Video, FileText, Eye, Grid3X3, Move, AlertTriangle,
  Lightbulb, Target, ChevronRight, ExternalLink, CheckCircle, XCircle,
  RotateCcw, Trophy, Award, Clock, Star, Film, Zap, ArrowDown, Play, Quote,
  Image, Crop, Focus
} from "lucide-react";

const RuleOfThirdsGuide = () => {
  const [quizState, setQuizState] = useState({
    currentQuestion: 0,
    selectedAnswers: {},
    showResults: false,
    score: 0,
  });
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(Math.min(progress, 100));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const quizQuestions = [
    {
      id: 1,
      question: "What does the Rule of Thirds primarily help with in photography and cinematography?",
      options: [
        { id: "a", text: "Making colors more vibrant", correct: false },
        { id: "b", text: "Creating more balanced and visually interesting compositions", correct: true },
        { id: "c", text: "Improving image sharpness", correct: false },
        { id: "d", text: "Reducing camera shake", correct: false },
      ],
      explanation: "The Rule of Thirds creates visual balance and interest by placing important elements along grid lines or at intersection points, making compositions more dynamic than centered subjects.",
    },
    {
      id: 2,
      question: "Where should you typically place your main subject when following the Rule of Thirds?",
      options: [
        { id: "a", text: "Exactly in the center of the frame", correct: false },
        { id: "b", text: "Along the grid lines or at intersection points", correct: true },
        { id: "c", text: "In the corners of the frame", correct: false },
        { id: "d", text: "At the very edge of the frame", correct: false },
      ],
      explanation: "Placing subjects along the imaginary grid lines or at their intersection points creates more dynamic and visually appealing compositions than centering everything.",
    },
    {
      id: 3,
      question: "Which is a good reason to intentionally break the Rule of Thirds?",
      options: [
        { id: "a", text: "To create symmetry or emphasize centrality", correct: true },
        { id: "b", text: "To save storage space", correct: false },
        { id: "c", text: "To make editing faster", correct: false },
        { id: "d", text: "Because it's easier than following the rule", correct: false },
      ],
      explanation: "Breaking the rule works well for symmetrical compositions, formal portraits, or when you want to emphasize the central importance of your subject.",
    },
    {
      id: 4,
      question: "In landscape photography, where should the horizon typically be placed according to the Rule of Thirds?",
      options: [
        { id: "a", text: "Always in the exact center", correct: false },
        { id: "b", text: "Along the upper or lower third line", correct: true },
        { id: "c", text: "At the very top of the frame", correct: false },
        { id: "d", text: "It doesn't matter", correct: false },
      ],
      explanation: "Placing the horizon on the upper third emphasizes the foreground, while the lower third emphasizes the sky. This creates more dynamic compositions than centering the horizon.",
    },
    {
      id: 5,
      question: "What are the 'power points' in the Rule of Thirds?",
      options: [
        { id: "a", text: "The corners of the frame", correct: false },
        { id: "b", text: "The four intersection points of the grid lines", correct: true },
        { id: "c", text: "The center of each third", correct: false },
        { id: "d", text: "The edges of the frame", correct: false },
      ],
      explanation: "The power points are the four intersections where the horizontal and vertical grid lines cross. These spots naturally draw the viewer's eye and create strong focal points.",
    },
  ];

  const handleAnswerSelect = (questionIndex, optionId) => {
    setQuizState(prev => ({
      ...prev,
      selectedAnswers: { ...prev.selectedAnswers, [questionIndex]: optionId },
    }));
  };

  const handleNextQuestion = () => {
    if (quizState.currentQuestion < quizQuestions.length - 1) {
      setQuizState(prev => ({ ...prev, currentQuestion: prev.currentQuestion + 1 }));
    } else {
      const correctAnswers = quizQuestions.reduce((count, question, index) => {
        const selectedOption = quizState.selectedAnswers[index];
        const correctOption = question.options.find(opt => opt.correct);
        return selectedOption === correctOption.id ? count + 1 : count;
      }, 0);
      setQuizState(prev => ({ ...prev, showResults: true, score: correctAnswers }));
    }
  };

  const resetQuiz = () => {
    setQuizState({ currentQuestion: 0, selectedAnswers: {}, showResults: false, score: 0 });
  };

  const InteractiveDiagram = () => {
    const [selectedExample, setSelectedExample] = useState(1);
    const [showGrid, setShowGrid] = useState(true);

    const examples = {
      1: { title: "Portrait Composition", description: "Subject positioned on right third line, eyes at upper power point", color: "from-blue-400 to-blue-600" },
      2: { title: "Landscape Composition", description: "Horizon on lower third, tree at left power point", color: "from-green-400 to-green-600" },
      3: { title: "Action Shot", description: "Moving subject on left third with space to 'move into'", color: "from-purple-400 to-purple-600" },
    };

    return (
      <div className="my-8 lg:my-12 bg-slate-900/40 border border-slate-700/30 rounded-2xl lg:rounded-3xl p-3 sm:p-6 lg:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6 lg:mb-8">
          <div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1 sm:mb-2">
              Interactive Demonstration
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm lg:text-base">
              Tap examples to see the rule in action
            </p>
          </div>
          <button
            onClick={() => setShowGrid(!showGrid)}
            className="px-3 py-2 sm:px-4 sm:py-2 bg-emerald-500/20 text-emerald-300 rounded-lg sm:rounded-xl border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors font-medium text-xs sm:text-sm lg:text-base"
          >
            {showGrid ? "Hide Grid" : "Show Grid"}
          </button>
        </div>

        {/* Mobile: Taller aspect ratio, Desktop: Standard */}
        <div className="relative h-80 sm:h-72 md:h-80 lg:h-96 bg-slate-800/30 rounded-xl lg:rounded-2xl border border-slate-700/20 overflow-hidden mb-3 sm:mb-4 lg:mb-6">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5 sm:opacity-10">
            <div
              className="h-full w-full"
              style={{
                backgroundImage: "radial-gradient(circle at 2px 2px, rgba(148,163,184,0.15) 1px, transparent 0)",
                backgroundSize: "24px 24px",
              }}
            />
          </div>

          {/* Rule of Thirds Grid */}
          {showGrid && (
            <div className="absolute inset-0">
              {/* Vertical lines */}
              <div className="absolute left-1/3 top-0 bottom-0 w-0.5 sm:w-1 bg-emerald-400/60" />
              <div className="absolute left-2/3 top-0 bottom-0 w-0.5 sm:w-1 bg-emerald-400/60" />

              {/* Horizontal lines */}
              <div className="absolute top-1/3 left-0 right-0 h-0.5 sm:h-1 bg-emerald-400/60" />
              <div className="absolute top-2/3 left-0 right-0 h-0.5 sm:h-1 bg-emerald-400/60" />

              {/* Power points */}
              <div className="absolute top-1/3 left-1/3 w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50 transform -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute top-1/3 left-2/3 w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50 transform -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute top-2/3 left-1/3 w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50 transform -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute top-2/3 left-2/3 w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50 transform -translate-x-1/2 -translate-y-1/2" />

              <div className="absolute -top-6 sm:-top-8 lg:-top-10 left-1/2 -translate-x-1/2 text-emerald-300 text-xs sm:text-sm font-semibold whitespace-nowrap bg-slate-900/90 px-1.5 py-0.5 sm:px-3 sm:py-1 rounded border border-emerald-500/30">
                Rule of Thirds Grid
              </div>
            </div>
          )}

          {/* Example compositions */}
          <div key={selectedExample} className="absolute inset-0 flex items-center justify-center">
            {selectedExample === 1 && (
              <div className="relative">
                <div className={`w-12 h-16 sm:w-16 sm:h-20 lg:w-20 lg:h-24 bg-gradient-to-br ${examples[1].color} rounded-lg shadow-xl absolute left-2/3 top-1/3 transform -translate-x-1/2 -translate-y-1/2`} />
                <div className="absolute left-2/3 top-1/3 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-4 sm:-translate-y-6" />
              </div>
            )}

            {selectedExample === 2 && (
              <div className="relative w-full h-full">
                <div className="absolute bottom-1/3 left-0 right-0 h-0.5 sm:h-1 bg-green-400/80" />
                <div className={`w-6 h-16 sm:w-8 sm:h-20 lg:w-10 lg:h-24 bg-gradient-to-t ${examples[2].color} rounded-t-lg absolute left-1/3 bottom-1/3 transform -translate-x-1/2`} />
              </div>
            )}

            {selectedExample === 3 && (
              <div className="relative">
                <div className={`w-10 h-6 sm:w-12 sm:h-8 lg:w-14 lg:h-10 bg-gradient-to-br ${examples[3].color} rounded-lg shadow-xl absolute left-1/3 top-1/2 transform -translate-x-1/2 -translate-y-1/2`} />
                <div className="absolute left-1/3 top-1/2 w-6 h-0.5 sm:w-8 sm:h-1 bg-purple-300/60 transform translate-x-2 sm:translate-x-4" />
              </div>
            )}
          </div>

          {/* Example buttons - Better mobile positioning */}
          <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-4">
            {[1, 2, 3].map((num) => {
              const isActive = selectedExample === num;
              return (
                <button
                  key={num}
                  onClick={() => setSelectedExample(num)}
                  className={`px-2 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl border text-xs sm:text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-lg"
                      : "bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-700/50"
                  }`}
                >
                  Example {num}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile-friendly example controls */}
        <div className="flex justify-center gap-2 mb-4 sm:hidden">
          {[1, 2, 3].map(num => {
            const isActive = selectedExample === num;
            const example = examples[num];
            return (
              <button
                key={num}
                onClick={() => setSelectedExample(num)}
                className={`px-3 py-2 rounded-lg font-medium text-xs transition-all ${
                  isActive
                    ? "bg-emerald-500/30 text-emerald-300 border border-emerald-500/50"
                    : "bg-slate-700/30 text-slate-400 border border-slate-600/30 hover:bg-slate-600/30"
                }`}
              >
                {example.title}
              </button>
            );
          })}
        </div>

        <div className="bg-slate-800/30 rounded-lg lg:rounded-xl p-3 sm:p-4 border border-slate-700/30">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
            <span className="font-semibold text-white text-sm sm:text-base">{examples[selectedExample].title}</span>
          </div>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            {examples[selectedExample].description}. Notice how placing elements along the grid lines or at intersection points creates more dynamic and visually interesting compositions than centering everything.
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
      const percentage = Math.round((quizState.score / quizQuestions.length) * 100);
      return (
        <div className="text-center">
          <div className="bg-slate-900/40 border border-slate-700/30 rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl">
            <div className="w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 mx-auto mb-6 lg:mb-8 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-full flex items-center justify-center border-2 border-emerald-500/30 shadow-xl">
              <Trophy className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-emerald-300" />
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">Quiz Complete!</h3>
            <div className="mb-6 lg:mb-8">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-3">
                {quizState.score}/{quizQuestions.length}
              </div>
              <div className="text-lg sm:text-xl lg:text-2xl text-slate-300">{percentage}% Score</div>
            </div>

            <div className="mb-8 lg:mb-10">
              {percentage >= 80 ? (
                <div className="text-emerald-300">
                  <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mx-auto mb-4" />
                  <p className="text-xl sm:text-2xl font-bold mb-2">Outstanding!</p>
                  <p className="text-slate-400 text-sm sm:text-base">You've mastered the Rule of Thirds like a pro photographer.</p>
                </div>
              ) : percentage >= 60 ? (
                <div className="text-blue-300">
                  <Award className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mx-auto mb-4" />
                  <p className="text-xl sm:text-2xl font-bold mb-2">Well Done!</p>
                  <p className="text-slate-400 text-sm sm:text-base">You have a solid foundation. Keep practicing to perfect your skills.</p>
                </div>
              ) : (
                <div className="text-purple-300">
                  <Lightbulb className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mx-auto mb-4" />
                  <p className="text-xl sm:text-2xl font-bold mb-2">Keep Learning!</p>
                  <p className="text-slate-400 text-sm sm:text-base">Review the concepts and try again. Every expert started as a beginner.</p>
                </div>
              )}
            </div>

            <button
              onClick={resetQuiz}
              className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 hover:from-emerald-500/30 hover:to-blue-500/30 text-white font-bold rounded-lg sm:rounded-xl border border-emerald-500/30 transition-all duration-300 flex items-center gap-3 mx-auto shadow-lg text-sm sm:text-base"
            >
              <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6" />
              Take Quiz Again
            </button>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="mb-6 lg:mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-slate-400 font-medium text-sm sm:text-base">
              Question {quizState.currentQuestion + 1} of {quizQuestions.length}
            </span>
            <span className="text-emerald-300 font-bold text-sm sm:text-lg">
              {Math.round(((quizState.currentQuestion + 1) / quizQuestions.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-slate-800/50 rounded-full h-2 sm:h-3 shadow-inner">
            <div
              className="h-2 sm:h-3 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 rounded-full shadow-lg transition-all duration-500"
              style={{ width: `${((quizState.currentQuestion + 1) / quizQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-slate-900/40 border border-slate-700/30 rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 mb-6 lg:mb-8 shadow-xl">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-6 lg:mb-8 leading-relaxed">
            {currentQuestion.question}
          </h3>

          <div className="space-y-3 sm:space-y-4">
            {currentQuestion.options.map(option => {
              const isSelected = selectedAnswer === option.id;
              const isCorrect = option.correct;
              const showCorrectAnswer = hasAnswered;

              let buttonClass = "w-full p-4 sm:p-5 lg:p-6 rounded-xl lg:rounded-2xl border text-left transition-all duration-300 ";

              if (showCorrectAnswer) {
                if (isCorrect) {
                  buttonClass += "bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 border-emerald-500/50 text-emerald-300 shadow-lg";
                } else if (isSelected && !isCorrect) {
                  buttonClass += "bg-gradient-to-r from-red-500/20 to-red-600/20 border-red-500/50 text-red-300 shadow-lg";
                } else {
                  buttonClass += "bg-slate-800/30 border-slate-700/50 text-slate-400";
                }
              } else if (isSelected) {
                buttonClass += "bg-gradient-to-r from-blue-500/20 to-blue-600/20 border-blue-500/50 text-blue-300 shadow-lg";
              } else {
                buttonClass += "bg-slate-800/20 border-slate-700/40 text-slate-300 hover:bg-slate-700/30 hover:border-slate-600/50 hover:text-white";
              }

              return (
                <button
                  key={option.id}
                  onClick={() => !hasAnswered && handleAnswerSelect(quizState.currentQuestion, option.id)}
                  className={buttonClass}
                  disabled={hasAnswered}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-current flex items-center justify-center font-bold text-sm sm:text-lg">
                        {option.id.toUpperCase()}
                      </span>
                      <span className="text-sm sm:text-base lg:text-lg">{option.text}</span>
                    </div>
                    {showCorrectAnswer && (
                      <div>
                        {isCorrect && <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />}
                        {isSelected && !isCorrect && <XCircle className="w-5 h-5 sm:w-6 sm:h-6" />}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {hasAnswered && (
            <div className="mt-6 lg:mt-8 p-4 sm:p-6 bg-slate-800/40 rounded-xl lg:rounded-2xl border border-slate-700/30">
              <div className="flex items-start gap-3 sm:gap-4">
                <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-white mb-2 text-sm sm:text-base lg:text-lg">Explanation</h4>
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">{currentQuestion.explanation}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {hasAnswered && (
          <div className="text-center">
            <button
              onClick={handleNextQuestion}
              className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 hover:from-emerald-500/30 hover:to-blue-500/30 text-white font-bold rounded-lg sm:rounded-xl border border-emerald-500/30 transition-all duration-300 flex items-center gap-3 mx-auto shadow-lg text-sm sm:text-base"
            >
              {quizState.currentQuestion < quizQuestions.length - 1 ? (
                <>Next Question <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" /></>
              ) : (
                <>View Results <Trophy className="w-5 h-5 sm:w-6 sm:h-6" /></>
              )}
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-800/50 z-50">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-blue-500/5 to-purple-500/5" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 sm:gap-3 bg-slate-900/60 backdrop-blur-xl px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-slate-700/50 mb-6 sm:mb-8">
              <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
              <span className="text-slate-300 font-medium text-sm sm:text-base">Photography Masterclass</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight">
              The Complete Guide to
              <br />
              <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                The Rule of Thirds
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12 px-4">
              Master the foundational composition technique that transforms ordinary photos into compelling visual stories. From basic principles to creative applications, learn when to follow the rule—and when to break it for artistic impact.
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

          <div className="mt-12 sm:mt-16 text-center">
            <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400 mx-auto animate-bounce" />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
        {/* Introduction */}
        <section className="mb-16 sm:mb-20">
          <div className="bg-slate-900/30 border border-slate-700/30 rounded-2xl lg:rounded-3xl p-6 sm:p-8 mb-8 sm:mb-12 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-xl lg:rounded-2xl flex items-center justify-center flex-shrink-0">
                <Quote className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <p className="text-lg sm:text-xl text-slate-200 leading-relaxed font-medium italic mb-3">
                  "The Rule of Thirds is your gateway to better composition. Master it first, then learn when breaking it serves your artistic vision."
                </p>
                <p className="text-slate-400 text-sm sm:text-base">
                  — Fundamental principle used by artists and photographers for centuries
                </p>
              </div>
            </div>
          </div>

          <p className="text-lg sm:text-xl text-slate-200 leading-relaxed mb-6 sm:mb-8 font-medium">
            Imagine looking at a photograph where everything feels perfectly balanced and draws your eye naturally through the frame. That's the power of the Rule of Thirds at work—a simple yet transformative composition technique.
          </p>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            The Rule of Thirds is one of the most fundamental principles in photography and visual arts, yet it's often dismissed as "just a beginner's rule." This comprehensive guide will show you why it works, how to apply it effectively, and most importantly, when breaking it creates even more powerful images.
          </p>
        </section>

        {/* What is the Rule of Thirds */}
        <section className="mb-16 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 sm:mb-8 flex items-center gap-3">
            <Grid3X3 className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-emerald-400" />
            What is the Rule of Thirds?
          </h2>

          <div className="bg-slate-900/30 border border-slate-700/30 rounded-2xl lg:rounded-3xl p-6 sm:p-8 mb-6 sm:mb-8 shadow-xl">
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed mb-6">
              The Rule of Thirds divides your frame into nine equal sections with two horizontal and two vertical lines. Instead of placing your subject dead center, you position key elements along these lines or at their <strong className="text-emerald-300">intersection points</strong>—known as <strong className="text-blue-300">power points</strong>.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="bg-slate-800/40 rounded-xl lg:rounded-2xl p-4 sm:p-6 border border-slate-700/30">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                  </div>
                  <h3 className="font-bold text-white text-sm sm:text-base">Following the Rule</h3>
                </div>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Place important elements along grid lines or at intersection points. This creates visual balance, draws the eye naturally, and makes compositions more dynamic than centered subjects.
                </p>
              </div>

              <div className="bg-slate-800/40 rounded-xl lg:rounded-2xl p-4 sm:p-6 border border-slate-700/30">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Target className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                  </div>
                  <h3 className="font-bold text-white text-sm sm:text-base">Power Points</h3>
                </div>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  The four intersection points are the strongest positions in your frame. Placing subjects here creates immediate visual impact and natural focal points.
                </p>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl lg:rounded-2xl p-4 sm:p-6">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-blue-300 mb-2 text-sm sm:text-base">Key Insight</h4>
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    The rule works because it mimics how our eyes naturally scan images—we don't look at the center first, but rather follow a Z-pattern that hits these key intersection points.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Demonstration */}
        <section className="mb-16 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 sm:mb-8 flex items-center gap-3">
            <Play className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-emerald-400" />
            See It in Action
          </h2>
          <InteractiveDiagram />
        </section>

        {/* Why It Matters */}
        <section className="mb-16 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 sm:mb-8 flex items-center gap-3">
            <Eye className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-emerald-400" />
            Why It Matters: The Psychology of Visual Balance
          </h2>

          <p className="text-base sm:text-lg text-slate-200 leading-relaxed mb-6 sm:mb-8">
            Our brains are hardwired to find asymmetrical compositions more engaging than perfectly centered ones. The Rule of Thirds creates visual tension and balance that keeps viewers interested and guides their eye through the frame naturally.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-slate-900/40 border border-slate-700/30 rounded-xl lg:rounded-2xl p-4 sm:p-6 shadow-lg">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-500/20 rounded-lg sm:rounded-xl flex items-center justify-center mb-4">
                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Visual Balance</h3>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                Creates harmonious compositions that feel natural and pleasing to the eye, even when elements aren't perfectly symmetrical.
              </p>
            </div>

            <div className="bg-slate-900/40 border border-slate-700/30 rounded-xl lg:rounded-2xl p-4 sm:p-6 shadow-lg">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/20 rounded-lg sm:rounded-xl flex items-center justify-center mb-4">
                <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Eye Movement</h3>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                Guides the viewer's gaze through your image in a natural, flowing way that creates visual interest and engagement.
              </p>
            </div>

            <div className="bg-slate-900/40 border border-slate-700/30 rounded-xl lg:rounded-2xl p-4 sm:p-6 shadow-lg sm:col-span-2 lg:col-span-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500/20 rounded-lg sm:rounded-xl flex items-center justify-center mb-4">
                <Focus className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Subject Emphasis</h3>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                Makes your main subject stand out while maintaining context with the surrounding environment and supporting elements.
              </p>
            </div>
          </div>
        </section>

        {/* Real-World Examples */}
        <section className="mb-16 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 sm:mb-8 flex items-center gap-3">
            <Image className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-emerald-400" />
            Masterclass Examples
          </h2>

          <div className="mb-8 sm:mb-12">
            <div className="bg-slate-900/40 border border-slate-700/30 rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl">
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
              <div className="p-4 sm:p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                      Rule of Thirds - Photography Composition
                    </h3>
                    <p className="text-slate-400 text-sm sm:text-base">Professional techniques explained</p>
                  </div>
                </div>
                <p className="text-slate-300 leading-relaxed mb-4 text-sm sm:text-base">
                  See how professional photographers use the Rule of Thirds across different genres—from portraits and landscapes to street photography and architecture. Notice how the technique adapts to different subjects while maintaining its effectiveness.
                </p>
                <div className="bg-slate-800/50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                  <p className="text-xs sm:text-sm text-slate-400 italic">
                    "This video demonstrates the versatility of the Rule of Thirds and shows why it remains one of the most reliable composition tools in visual arts."
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-slate-900/40 border border-slate-700/30 rounded-xl lg:rounded-2xl overflow-hidden shadow-xl">
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
              <div className="p-4 sm:p-6">
                <h4 className="text-base sm:text-lg font-bold text-white mb-2">Art History Analysis</h4>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Discover how master painters have used the Rule of Thirds for centuries, long before photography existed.
                </p>
              </div>
            </div>

            <div className="bg-slate-900/40 border border-slate-700/30 rounded-xl lg:rounded-2xl overflow-hidden shadow-xl">
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
              <div className="p-4 sm:p-6">
                <h4 className="text-base sm:text-lg font-bold text-white mb-2">Landscape Applications</h4>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Learn how to apply the rule to horizons, leading lines, and natural elements in outdoor photography.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* When to Break the Rule */}
        <section className="mb-16 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 sm:mb-8 flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-red-400" />
            Breaking the Rule: When and Why
          </h2>

          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl lg:rounded-3xl p-6 sm:p-8 mb-6 sm:mb-8 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-red-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Advanced Technique: Creative Rule Breaking</h3>
                <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
                  Once you understand why the Rule of Thirds works, you can break it intentionally for artistic effect. Centered compositions can be powerful when they serve a specific purpose.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/40 border border-slate-700/30 rounded-2xl lg:rounded-3xl p-6 sm:p-8 mb-8 sm:mb-10 shadow-lg">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">Famous Examples of Strategic Rule Breaking</h3>

            <div className="space-y-4 sm:space-y-6">
              <div className="border-l-4 border-purple-500 pl-4 sm:pl-6 bg-purple-500/5 rounded-r-lg sm:rounded-r-xl p-3 sm:p-4">
                <h4 className="text-lg sm:text-xl font-bold text-purple-300 mb-2">Symmetrical Compositions</h4>
                <p className="text-slate-300 leading-relaxed mb-3 text-sm sm:text-base">
                  Perfect symmetry demands centered subjects. Architecture, reflections, and formal portraits often work better when perfectly balanced and centered.
                </p>
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <p className="text-xs sm:text-sm text-slate-400 italic">
                    "Symmetry creates a sense of order, formality, and timeless elegance that off-center compositions can't achieve."
                  </p>
                </div>
              </div>

              <div className="border-l-4 border-blue-500 pl-4 sm:pl-6 bg-blue-500/5 rounded-r-lg sm:rounded-r-xl p-3 sm:p-4">
                <h4 className="text-lg sm:text-xl font-bold text-blue-300 mb-2">Patterns and Textures</h4>
                <p className="text-slate-300 leading-relaxed mb-3 text-sm sm:text-base">
                  When the entire frame is your subject—like repeating patterns or detailed textures—centering the composition can emphasize the uniformity and create meditative images.
                </p>
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <p className="text-xs sm:text-sm text-slate-400 italic">
                    "Pattern photography often benefits from central framing to showcase the repetitive elements equally across the frame."
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-slate-900/40 border border-slate-700/30 rounded-xl lg:rounded-2xl p-4 sm:p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Crop className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                <h3 className="text-lg sm:text-xl font-bold text-white">Alternative Compositions</h3>
              </div>
              <p className="text-slate-300 leading-relaxed mb-4 text-sm sm:text-base">
                Explore other composition techniques:
              </p>
              <ul className="text-slate-300 space-y-2 text-xs sm:text-sm">
                <li>• Golden ratio for more refined proportions</li>
                <li>• Central composition for formal balance</li>
                <li>• Dynamic symmetry for classical elegance</li>
                <li>• Fibonacci spiral for natural flow</li>
              </ul>
            </div>

            <div className="bg-slate-900/40 border border-slate-700/30 rounded-xl lg:rounded-2xl p-4 sm:p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                <h3 className="text-lg sm:text-xl font-bold text-white">Creative Applications</h3>
              </div>
              <p className="text-slate-300 leading-relaxed mb-4 text-sm sm:text-base">
                Break the rule effectively for:
              </p>
              <ul className="text-slate-300 space-y-2 text-xs sm:text-sm">
                <li>• Creating perfect symmetry or balance</li>
                <li>• Emphasizing isolation or solitude</li>
                <li>• Showcasing patterns or textures</li>
                <li>• Making bold artistic statements</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Practical Implementation */}
        <section className="mb-16 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 sm:mb-8 flex items-center gap-3">
            <Camera className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-emerald-400" />
            Practical Implementation Guide
          </h2>

          <div className="bg-slate-900/40 border border-slate-700/30 rounded-2xl lg:rounded-3xl p-6 sm:p-8 mb-6 sm:mb-8 shadow-xl">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">Step-by-Step Process</h3>

            <div className="space-y-4 sm:space-y-6">
              {[
                { num: 1, title: "Enable Grid Lines", desc: "Turn on grid lines in your camera or smartphone settings. This overlay will help you visualize the Rule of Thirds while composing your shots.", color: "emerald" },
                { num: 2, title: "Identify Your Main Subject", desc: "Before composing, decide what the primary focus of your image should be. This will be placed on a grid line or power point.", color: "blue" },
                { num: 3, title: "Position and Balance", desc: "Place your subject along a grid line or at an intersection. Consider what balances the composition on the other side of the frame.", color: "purple" },
                { num: 4, title: "Review and Refine", desc: "Take the shot, then review. Does it feel balanced? Does your eye flow naturally through the frame? Adjust as needed.", color: "yellow" }
              ].map(step => (
                <div key={step.num} className="flex gap-4 sm:gap-6">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-${step.color}-500/20 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <span className={`text-${step.color}-300 font-bold text-sm sm:text-base`}>{step.num}</span>
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold text-white mb-2">{step.title}</h4>
                    <p className="text-slate-300 leading-relaxed text-sm sm:text-base">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl lg:rounded-2xl p-4 sm:p-6">
            <div className="flex items-start gap-3">
              <Target className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-emerald-300 mb-2 text-base sm:text-lg">Practice Exercise</h4>
                <p className="text-slate-300 leading-relaxed mb-4 text-sm sm:text-base">
                  Take 10 photos of the same subject: 3 using the Rule of Thirds, 3 centered, and 4 experimenting with different positions. Compare how each composition feels and affects the story you're telling.
                </p>
                <div className="bg-slate-800/30 rounded-lg p-3 sm:p-4">
                  <p className="text-slate-400 text-xs sm:text-sm">
                    <strong className="text-emerald-300">Pro tip:</strong> Start with still subjects like flowers or architecture before moving to people or moving subjects. This helps you focus purely on composition without worrying about timing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-16 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 sm:mb-8 flex items-center gap-3">
            <Award className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-emerald-400" />
            Test Your Knowledge
          </h2>

          <div className="mb-6 sm:mb-8">
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Ready to put your understanding to the test? This interactive quiz covers everything from basic principles to advanced applications of the Rule of Thirds.
            </p>
          </div>

          <QuizSection />
        </section>

        {/* Resources Section */}
        <section className="mb-16 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 sm:mb-8 flex items-center gap-3">
            <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-emerald-400" />
            Further Learning Resources
          </h2>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-slate-900/40 border border-slate-700/30 rounded-xl lg:rounded-2xl p-4 sm:p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Video className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-300" />
                <h3 className="font-bold text-white text-base sm:text-lg">Video Masterclasses</h3>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <a
                  href="https://www.youtube.com/watch?v=T1C4eSZface"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 sm:p-4 bg-slate-800/40 rounded-lg sm:rounded-xl hover:bg-slate-700/50 transition-all duration-300 group"
                >
                  <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-emerald-400 transition-colors" />
                  <div>
                    <p className="text-white font-semibold group-hover:text-emerald-300 transition-colors text-sm sm:text-base">
                      Photography Composition Guide
                    </p>
                    <p className="text-slate-400 text-xs sm:text-sm">Professional techniques and real-world examples</p>
                  </div>
                </a>
                <a
                  href="https://www.youtube.com/watch?v=7ZVyNjKSr0M"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 sm:p-4 bg-slate-800/40 rounded-lg sm:rounded-xl hover:bg-slate-700/50 transition-all duration-300 group"
                >
                  <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-emerald-400 transition-colors" />
                  <div>
                    <p className="text-white font-semibold group-hover:text-emerald-300 transition-colors text-sm sm:text-base">
                      Art History Analysis
                    </p>
                    <p className="text-slate-400 text-xs sm:text-sm">How masters used the rule before photography</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-slate-900/40 border border-slate-700/30 rounded-xl lg:rounded-2xl p-4 sm:p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-300" />
                <h3 className="font-bold text-white text-base sm:text-lg">Deep Dive Articles</h3>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <a
                  href="https://photographylife.com/rule-of-thirds"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 sm:p-4 bg-slate-800/40 rounded-lg sm:rounded-xl hover:bg-slate-700/50 transition-all duration-300 group"
                >
                  <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
                  <div>
                    <p className="text-white font-semibold group-hover:text-blue-300 transition-colors text-sm sm:text-base">
                      Photography Life Guide
                    </p>
                    <p className="text-slate-400 text-xs sm:text-sm">Advanced composition techniques and theory</p>
                  </div>
                </a>
                <div className="p-3 sm:p-4 bg-slate-800/40 rounded-lg sm:rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <Image className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                    <p className="text-white font-semibold text-sm sm:text-base">Recommended Practice Subjects</p>
                  </div>
                  <ul className="text-slate-400 text-xs sm:text-sm space-y-1">
                    <li>• Portraits - Eyes on power points</li>
                    <li>• Landscapes - Horizon on third lines</li>
                    <li>• Architecture - Strong vertical/horizontal lines</li>
                    <li>• Street photography - Leading lines and subjects</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section className="mb-16 sm:mb-20">
          <div className="bg-gradient-to-br from-slate-900/60 to-slate-800/60 border border-slate-700/30 rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Master the Rule, Then Make It Your Own</h2>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto mb-6 sm:mb-8">
                The Rule of Thirds isn't a limitation—it's a foundation that helps you create compelling compositions consistently. Master the basics first, understand why it works, and then you'll know exactly when breaking it serves your artistic vision.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
                  <span>Composition Mastered</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                  <span>Visual Balance Developed</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                  <span>Creative Breaking Understood</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <div className="text-center py-8 sm:py-12">
          <div className="bg-slate-900/30 border border-slate-700/30 rounded-xl lg:rounded-2xl p-6 sm:p-8 shadow-xl">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Ready to Apply What You've Learned?</h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
              The best way to master the Rule of Thirds is through practice. Start with simple subjects, then experiment with more complex compositions as your confidence grows.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="px-5 py-3 sm:px-6 sm:py-3 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-semibold rounded-lg sm:rounded-xl border border-emerald-500/30 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
                Review the Guide
              </button>
              <a
                href="#quiz"
                className="px-5 py-3 sm:px-6 sm:py-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 font-semibold rounded-lg sm:rounded-xl border border-blue-500/30 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                Retake the Quiz
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RuleOfThirdsGuide;
"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Camera, BookOpen, Video, FileText, Eye, Users, Move, AlertTriangle,
  Lightbulb, Target, ChevronRight, ExternalLink, CheckCircle, XCircle,
  RotateCcw, Trophy, Award, Clock, Star, Film, Zap, ArrowDown, Play, Quote
} from "lucide-react";

const Rule180Guide = () => {
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
      question: "What does the 180-degree rule primarily help with in a film scene?",
      options: [
        { id: "a", text: "Making the actors look more dramatic", correct: false },
        { id: "b", text: "Ensuring consistent spatial orientation for the audience", correct: true },
        { id: "c", text: "Keeping the lighting balanced", correct: false },
        { id: "d", text: "Allowing the editor to use fancy transitions", correct: false },
      ],
      explanation: "The 180-degree rule maintains spatial consistency, helping the audience understand where characters are positioned relative to each other throughout a scene.",
    },
    {
      id: 2,
      question: "Why should the camera stay on one side of the axis of action between two characters?",
      options: [
        { id: "a", text: "To keep their screen direction and eyelines consistent", correct: true },
        { id: "b", text: "To make them look equally important", correct: false },
        { id: "c", text: "To keep both characters in sharp focus", correct: false },
        { id: "d", text: "Because it looks more symmetrical", correct: false },
      ],
      explanation: "Staying on one side ensures that each character's eyeline direction remains consistent, making the conversation feel natural and connected.",
    },
    {
      id: 3,
      question: "Which is a reason a director might intentionally break the 180-degree rule?",
      options: [
        { id: "a", text: "To create audience confusion and mirror chaos", correct: true },
        { id: "b", text: "To save memory card space", correct: false },
        { id: "c", text: "To avoid using multiple lights", correct: false },
        { id: "d", text: "Because it's easier than following the rule", correct: false },
      ],
      explanation: "Breaking the rule can be a powerful storytelling tool to show confusion, psychological states, or dramatic power shifts in a scene.",
    },
    {
      id: 4,
      question: "In the famous diner scene from 'Heat' (1995), how is the 180-degree rule applied?",
      options: [
        { id: "a", text: "It is constantly broken to show tension", correct: false },
        { id: "b", text: "It is perfectly maintained throughout the conversation", correct: true },
        { id: "c", text: "It only applies to wide shots", correct: false },
        { id: "d", text: "The rule is ignored completely", correct: false },
      ],
      explanation: "The Heat diner scene is a masterclass in maintaining the 180-degree rule, keeping both characters' positions clear throughout their intense dialogue.",
    },
    {
      id: 5,
      question: "What is the 'axis of action' in the 180-degree rule?",
      options: [
        { id: "a", text: "The path actors take when moving", correct: false },
        { id: "b", text: "The imaginary line between two subjects", correct: true },
        { id: "c", text: "The camera movement path", correct: false },
        { id: "d", text: "The lighting setup boundary", correct: false },
      ],
      explanation: "The axis of action is the imaginary straight line drawn between two subjects or along the path of movement that cameras should not cross.",
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
    const [cameraPosition, setCameraPosition] = useState(1);
    const [showLine, setShowLine] = useState(true);

    // Responsive camera positions - more spaced out on mobile
    const cameras = {
      1: { x: "10%", y: "88%" },
      2: { x: "50%", y: "88%" },
      3: { x: "90%", y: "88%" },
    };
    // Better character positioning for mobile
    const characterA = { x: "30%", y: "45%" };
    const characterB = { x: "70%", y: "45%" };

    return (
      <div className="my-8 lg:my-12 bg-slate-900/40 border border-slate-700/30 rounded-2xl lg:rounded-3xl p-3 sm:p-6 lg:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6 lg:mb-8">
          <div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1 sm:mb-2">
              Interactive Demonstration
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm lg:text-base">
              Tap camera positions to see the rule in action
            </p>
          </div>
          <button
            onClick={() => setShowLine(!showLine)}
            className="px-3 py-2 sm:px-4 sm:py-2 bg-emerald-500/20 text-emerald-300 rounded-lg sm:rounded-xl border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors font-medium text-xs sm:text-sm lg:text-base"
          >
            {showLine ? "Hide Line" : "Show Line"}
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
                backgroundSize: "16px 16px",
              }}
            />
          </div>

          {/* 180-degree axis */}
          {showLine && (
            <div className="absolute top-1/2 left-1/4 right-1/4 h-0.5 sm:h-1 bg-gradient-to-r from-emerald-400 to-blue-400 transform -translate-y-0.5 rounded-full">
              <div className="absolute -top-1 sm:-top-2.5 lg:-top-3 left-0 w-2 h-2 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50" />
              <div className="absolute -top-1 sm:-top-2.5 lg:-top-3 right-0 w-2 h-2 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50" />
              <div className="absolute -top-6 sm:-top-10 lg:-top-12 left-1/2 -translate-x-1/2 text-emerald-300 text-xs sm:text-sm font-semibold whitespace-nowrap bg-slate-900/90 px-1.5 py-0.5 sm:px-3 sm:py-1 rounded border border-emerald-500/30">
                180° Axis
              </div>
            </div>
          )}

          {/* Sight lines */}
          {showLine && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <line
                x1={cameras[cameraPosition].x}
                y1={cameras[cameraPosition].y}
                x2={characterA.x}
                y2={characterA.y}
                stroke={cameraPosition === 3 ? "#f87171" : "#10b981"}
                strokeWidth="2"
                strokeDasharray="3,2"
                opacity="0.8"
              />
              <line
                x1={cameras[cameraPosition].x}
                y1={cameras[cameraPosition].y}
                x2={characterB.x}
                y2={characterB.y}
                stroke={cameraPosition === 3 ? "#f87171" : "#10b981"}
                strokeWidth="2"
                strokeDasharray="3,2"
                opacity="0.8"
              />
            </svg>
          )}

          {/* Characters - Better mobile positioning */}
          <div className="absolute top-1/2 left-[30%] -translate-x-1/2 -translate-y-1/2">
            <div className="w-10 h-10 sm:w-14 sm:h-14 lg:w-18 lg:h-18 bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-blue-300 rounded-full flex items-center justify-center shadow-lg">
              <Users className="w-5 h-5 sm:w-7 sm:h-7 lg:w-9 lg:h-9 text-white" />
            </div>
            <div className="text-center mt-1 sm:mt-2 text-blue-300 font-bold text-xs bg-slate-900/80 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded">
              A
            </div>
          </div>

          <div className="absolute top-1/2 left-[70%] -translate-x-1/2 -translate-y-1/2">
            <div className="w-10 h-10 sm:w-14 sm:h-14 lg:w-18 lg:h-18 bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-purple-300 rounded-full flex items-center justify-center shadow-lg">
              <Users className="w-5 h-5 sm:w-7 sm:h-7 lg:w-9 lg:h-9 text-white" />
            </div>
            <div className="text-center mt-1 sm:mt-2 text-purple-300 font-bold text-xs bg-slate-900/80 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded">
              B
            </div>
          </div>

          {/* Camera positions - Better mobile spacing */}
          {[1, 2, 3].map(pos => {
            const isActive = cameraPosition === pos;
            const isWrong = pos === 3;
            return (
              <div
                key={pos}
                className={`absolute ${
                  pos === 1 ? "bottom-2 left-2 sm:bottom-4 sm:left-4" :
                  pos === 2 ? "bottom-2 left-1/2 -translate-x-1/2 sm:bottom-4" :
                  "bottom-2 right-2 sm:bottom-4 sm:right-4"
                }`}
              >
                <motion.div
                  animate={{ scale: isActive ? 1.1 : 1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-lg sm:rounded-xl border-2 flex items-center justify-center cursor-pointer transition-all duration-300 shadow-lg ${
                    isWrong
                      ? "bg-gradient-to-br from-red-500 to-red-700 border-red-400 shadow-red-500/40"
                      : "bg-gradient-to-br from-emerald-500 to-emerald-700 border-emerald-400 shadow-emerald-500/40"
                  } ${isActive ? "ring-2 ring-white/30" : ""}`}
                  onClick={() => setCameraPosition(pos)}
                >
                  <Camera className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                </motion.div>
                <div className={`text-center mt-0.5 sm:mt-1 text-xs font-bold ${isWrong ? "text-red-300" : "text-emerald-300"}`}>
                  {pos === 3 ? "Breaks!" : `Cam ${pos}`}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile-friendly camera controls */}
        <div className="flex justify-center gap-2 mb-4 sm:hidden">
          {[1, 2, 3].map(pos => {
            const isActive = cameraPosition === pos;
            const isWrong = pos === 3;
            return (
              <button
                key={pos}
                onClick={() => setCameraPosition(pos)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  isActive
                    ? isWrong
                      ? "bg-red-500/30 text-red-300 border border-red-500/50"
                      : "bg-emerald-500/30 text-emerald-300 border border-emerald-500/50"
                    : "bg-slate-700/30 text-slate-400 border border-slate-600/30 hover:bg-slate-600/30"
                }`}
              >
                Camera {pos} {pos === 3 && "(Breaks Rule)"}
              </button>
            );
          })}
        </div>

        <div className="bg-slate-800/30 rounded-lg lg:rounded-xl p-3 sm:p-4 border border-slate-700/30">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
            <span className="font-semibold text-white text-sm sm:text-base">How it works</span>
          </div>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Cameras 1 and 2 maintain consistent screen positions—Character A always looks right, Character B always looks left. Camera 3 breaks spatial logic.
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
                  <p className="text-slate-400 text-sm sm:text-base">You've mastered the 180-degree rule like a pro cinematographer.</p>
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
              <span className="text-slate-300 font-medium text-sm sm:text-base">Cinematography Masterclass</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight">
              The Complete Guide to
              <br />
              <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                The 180-Degree Rule
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12 px-4">
              Master the fundamental principle that keeps your audience oriented and your scenes coherent. From basic concepts to advanced applications, learn when to follow the rule—and when to break it for maximum impact.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>15 min read</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>Beginner Friendly</span>
              </div>
              <div className="flex items-center gap-2">
                <Film className="w-4 h-4" />
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
                  "The 180-degree rule is like an invisible fence for your camera. Master it first, then learn when to break it."
                </p>
                <p className="text-slate-400 text-sm sm:text-base">
                  — Industry principle that has guided filmmakers for over a century
                </p>
              </div>
            </div>
          </div>

          <p className="text-lg sm:text-xl text-slate-200 leading-relaxed mb-6 sm:mb-8 font-medium">
            Imagine watching a conversation between two people, and suddenly one character appears to have teleported to the other side of the screen. Confusing? That's exactly what happens when the 180-degree rule is broken accidentally.
          </p>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            The 180-degree rule is one of the most fundamental principles in cinematography, yet it's often misunderstood or overlooked by emerging filmmakers. This comprehensive guide will take you from the basic concepts to advanced applications, complete with interactive examples and real-world case studies.
          </p>
        </section>

        {/* What is the 180-Degree Rule */}
        <section className="mb-16 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 sm:mb-8 flex items-center gap-3">
            <Target className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-emerald-400" />
            What is the 180-Degree Rule?
          </h2>

          <div className="bg-slate-900/30 border border-slate-700/30 rounded-2xl lg:rounded-3xl p-6 sm:p-8 mb-6 sm:mb-8 shadow-xl">
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed mb-6">
              At its core, the 180-degree rule is about <strong className="text-emerald-300">spatial consistency</strong>. When filming two subjects (typically characters in conversation), you establish an imaginary straight line between them—this is your <strong className="text-blue-300">axis of action</strong>.
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
                  Keep your camera on one side of the line, and characters maintain consistent screen positions. Character A always looks right, Character B always looks left.
                </p>
              </div>

              <div className="bg-slate-800/40 rounded-xl lg:rounded-2xl p-4 sm:p-6 border border-slate-700/30">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                    <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                  </div>
                  <h3 className="font-bold text-white text-sm sm:text-base">Breaking the Rule</h3>
                </div>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Cross the line, and suddenly both characters appear to look in the same direction, breaking the spatial relationship and confusing your audience.
                </p>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl lg:rounded-2xl p-4 sm:p-6">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-blue-300 mb-2 text-sm sm:text-base">Key Insight</h4>
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    The rule isn't about the actual 180-degree semicircle—it's about maintaining consistent screen direction. Think of it as staying on one side of an invisible fence that runs between your subjects.
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
            Why It Matters
          </h2>

          <p className="text-base sm:text-lg text-slate-200 leading-relaxed mb-6 sm:mb-8">
            Our brains are wired to understand spatial relationships. When characters maintain consistent screen positions, viewers unconsciously build a mental map of the scene. This isn't just aesthetic preference—it's cognitive necessity.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-slate-900/40 border border-slate-700/30 rounded-xl lg:rounded-2xl p-4 sm:p-6 shadow-lg">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-500/20 rounded-lg sm:rounded-xl flex items-center justify-center mb-4">
                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Spatial Continuity</h3>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                Maintains the audience's understanding of where characters are positioned relative to each other throughout the scene.
              </p>
            </div>

            <div className="bg-slate-900/40 border border-slate-700/30 rounded-xl lg:rounded-2xl p-4 sm:p-6 shadow-lg">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/20 rounded-lg sm:rounded-xl flex items-center justify-center mb-4">
                <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Eyeline Matching</h3>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                Ensures that characters appear to be looking at each other, creating a natural flow in dialogue scenes.
              </p>
            </div>

            <div className="bg-slate-900/40 border border-slate-700/30 rounded-xl lg:rounded-2xl p-4 sm:p-6 shadow-lg sm:col-span-2 lg:col-span-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500/20 rounded-lg sm:rounded-xl flex items-center justify-center mb-4">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Audience Immersion</h3>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                Prevents jarring moments that pull viewers out of the story by maintaining visual logic and flow.
              </p>
            </div>
          </div>
        </section>

        {/* Real-World Examples */}
        <section className="mb-16 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 sm:mb-8 flex items-center gap-3">
            <Film className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-emerald-400" />
            Masterclass Examples
          </h2>

          <div className="mb-8 sm:mb-12">
            <div className="bg-slate-900/40 border border-slate-700/30 rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl">
              <div className="aspect-video bg-slate-800 relative">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/xlNTDEtYX9k"
                  title="Heat Diner Scene Analysis"
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
                      Heat (1995) - The Perfect Execution
                    </h3>
                    <p className="text-slate-400 text-sm sm:text-base">Directed by Michael Mann</p>
                  </div>
                </div>
                <p className="text-slate-300 leading-relaxed mb-4 text-sm sm:text-base">
                  The iconic diner scene between Robert De Niro and Al Pacino is a masterclass in 180-degree rule application. Notice how throughout their intense 4-minute conversation, both characters maintain consistent screen positions.
                </p>
                <div className="bg-slate-800/50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                  <p className="text-xs sm:text-sm text-slate-400 italic">
                    "This scene demonstrates how following the rule enhances dramatic tension rather than limiting it. The consistent eyelines make their psychological chess match even more compelling."
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
                  src="https://www.youtube.com/embed/iW0bKUfvH2c"
                  title="180 Degree Rule Explained"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-4 sm:p-6">
                <h4 className="text-base sm:text-lg font-bold text-white mb-2">Visual Breakdown</h4>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  A comprehensive analysis showing the rule across multiple famous films and genres.
                </p>
              </div>
            </div>

            <div className="bg-slate-900/40 border border-slate-700/30 rounded-xl lg:rounded-2xl overflow-hidden shadow-xl">
              <div className="aspect-video bg-slate-800">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/wLfZL9PZI9k"
                  title="How to Film Conversations"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-4 sm:p-6">
                <h4 className="text-base sm:text-lg font-bold text-white mb-2">Practical Techniques</h4>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Step-by-step guide to implementing the rule in your own dialogue scenes.
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
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Advanced Technique: Intentional Rule Breaking</h3>
                <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
                  Sometimes crossing the line is exactly what you want. Master filmmakers use rule-breaking as a powerful storytelling tool to create specific emotional or psychological effects.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/40 border border-slate-700/30 rounded-2xl lg:rounded-3xl p-6 sm:p-8 mb-8 sm:mb-10 shadow-lg">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">Famous Examples of Strategic Rule Breaking</h3>

            <div className="space-y-4 sm:space-y-6">
              <div className="border-l-4 border-purple-500 pl-4 sm:pl-6 bg-purple-500/5 rounded-r-lg sm:rounded-r-xl p-3 sm:p-4">
                <h4 className="text-lg sm:text-xl font-bold text-purple-300 mb-2">The Dark Knight - Interrogation Scene</h4>
                <p className="text-slate-300 leading-relaxed mb-3 text-sm sm:text-base">
                  Christopher Nolan deliberately crosses the line as tension escalates between Batman and the Joker. The spatial disorientation mirrors the psychological chaos the Joker represents.
                </p>
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <p className="text-xs sm:text-sm text-slate-400 italic">
                    "The camera crossing reinforces the theme that normal rules don't apply when dealing with chaos incarnate."
                  </p>
                </div>
              </div>

              <div className="border-l-4 border-blue-500 pl-4 sm:pl-6 bg-blue-500/5 rounded-r-lg sm:rounded-r-xl p-3 sm:p-4">
                <h4 className="text-lg sm:text-xl font-bold text-blue-300 mb-2">Lord of the Rings - Gollum's Internal Conflict</h4>
                <p className="text-slate-300 leading-relaxed mb-3 text-sm sm:text-base">
                  Peter Jackson uses line crossing during Sméagol/Gollum's conversations with himself, making it appear as two different characters having a dialogue.
                </p>
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <p className="text-xs sm:text-sm text-slate-400 italic">
                    "The 180-degree break visualizes the character's split personality in a way words alone couldn't achieve."
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-slate-900/40 border border-slate-700/30 rounded-xl lg:rounded-2xl p-4 sm:p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Move className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                <h3 className="text-lg sm:text-xl font-bold text-white">Bending, Not Breaking</h3>
              </div>
              <p className="text-slate-300 leading-relaxed mb-4 text-sm sm:text-base">
                You can "reset" the line without jarring your audience by using:
              </p>
              <ul className="text-slate-300 space-y-2 text-xs sm:text-sm">
                <li>• Neutral shots (directly facing one character)</li>
                <li>• Camera movement that carries viewers across the line</li>
                <li>• Cutaways to objects or establishing shots</li>
                <li>• Character movement that naturally shifts the axis</li>
              </ul>
            </div>

            <div className="bg-slate-900/40 border border-slate-700/30 rounded-xl lg:rounded-2xl p-4 sm:p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                <h3 className="text-lg sm:text-xl font-bold text-white">Creative Applications</h3>
              </div>
              <p className="text-slate-300 leading-relaxed mb-4 text-sm sm:text-base">
                Strategic rule-breaking works best for:
              </p>
              <ul className="text-slate-300 space-y-2 text-xs sm:text-sm">
                <li>• Showing confusion or disorientation</li>
                <li>• Indicating power shifts between characters</li>
                <li>• Representing psychological states</li>
                <li>• Covering complex action choreography</li>
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
                { num: 1, title: "Establish the Axis of Action", desc: "Before rolling camera, clearly identify the invisible line running between your subjects. This line becomes your reference point for all camera positions in the scene.", color: "emerald" },
                { num: 2, title: "Choose Your Side", desc: "Decide which side of the line your camera will operate from and commit to it. This choice will determine the consistent screen positions for your entire scene.", color: "blue" },
                { num: 3, title: "Plan Your Coverage", desc: "Map out all your shots while staying on your chosen side. Consider wide shots, medium shots, and close-ups that maintain the established eyeline directions.", color: "purple" },
                { num: 4, title: "Monitor in Post", desc: "During editing, watch for any shots that feel \"off\" or break spatial continuity. These are often unintentional rule violations that need addressing.", color: "yellow" }
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
                  Set up two chairs facing each other about 6 feet apart. Place objects or people in the chairs and practice shooting from different angles while maintaining the 180-degree rule.
                </p>
                <div className="bg-slate-800/30 rounded-lg p-3 sm:p-4">
                  <p className="text-slate-400 text-xs sm:text-sm">
                    <strong className="text-emerald-300">Pro tip:</strong> Use tape on the floor to mark your axis of action. This physical reminder helps crew members understand the invisible boundary.
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
              Ready to put your understanding to the test? This interactive quiz covers everything from basic principles to advanced applications of the 180-degree rule.
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
                  href="https://www.youtube.com/watch?v=BBA8nXTUAw8"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 sm:p-4 bg-slate-800/40 rounded-lg sm:rounded-xl hover:bg-slate-700/50 transition-all duration-300 group"
                >
                  <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-emerald-400 transition-colors" />
                  <div>
                    <p className="text-white font-semibold group-hover:text-emerald-300 transition-colors text-sm sm:text-base">
                      StudioBinder's Complete Guide
                    </p>
                    <p className="text-slate-400 text-xs sm:text-sm">Visual breakdown with industry examples</p>
                  </div>
                </a>
                <a
                  href="https://www.youtube.com/watch?v=wLfZL9PZI9k"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 sm:p-4 bg-slate-800/40 rounded-lg sm:rounded-xl hover:bg-slate-700/50 transition-all duration-300 group"
                >
                  <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-emerald-400 transition-colors" />
                  <div>
                    <p className="text-white font-semibold group-hover:text-emerald-300 transition-colors text-sm sm:text-base">
                      Camber Film School Techniques
                    </p>
                    <p className="text-slate-400 text-xs sm:text-sm">Hands-on filming approaches and tips</p>
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
                  href="https://www.studiobinder.com/blog/what-is-continuity-editing-in-film/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 sm:p-4 bg-slate-800/40 rounded-lg sm:rounded-xl hover:bg-slate-700/50 transition-all duration-300 group"
                >
                  <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
                  <div>
                    <p className="text-white font-semibold group-hover:text-blue-300 transition-colors text-sm sm:text-base">
                      Continuity Editing Masterclass
                    </p>
                    <p className="text-slate-400 text-xs sm:text-sm">Advanced editing techniques and theory</p>
                  </div>
                </a>
                <div className="p-3 sm:p-4 bg-slate-800/40 rounded-lg sm:rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <Film className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                    <p className="text-white font-semibold text-sm sm:text-base">Recommended Films to Study</p>
                  </div>
                  <ul className="text-slate-400 text-xs sm:text-sm space-y-1">
                    <li>• Heat (1995) - Perfect dialogue execution</li>
                    <li>• The Godfather (1972) - Classic Hollywood style</li>
                    <li>• Pulp Fiction (1994) - Creative rule-bending</li>
                    <li>• Mad Max: Fury Road (2015) - Action sequences</li>
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
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Master the Rule, Then Break It</h2>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto mb-6 sm:mb-8">
                The 180-degree rule isn't a creative limitation—it's a foundation that enables more sophisticated storytelling. Master the basics first, understand why the rule works, and then you'll know exactly when and how to break it for maximum impact.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
                  <span>Rule Mastered</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                  <span>Spatial Awareness Developed</span>
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
              The best way to master the 180-degree rule is through practice. Start with simple dialogue scenes, then experiment with more complex scenarios as your confidence grows.
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

export default Rule180Guide;
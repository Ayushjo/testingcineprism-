"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Camera,
  BookOpen,
  Video,
  FileText,
  Eye,
  Users,
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
} from "lucide-react"
import Confetti from "react-confetti"

const Rule180Page = () => {
  const [activeSection, setActiveSection] = useState("basics")
  const [showDiagram, setShowDiagram] = useState(false)
  const [quizState, setQuizState] = useState({
    currentQuestion: 0,
    selectedAnswers: {},
    showResults: false,
    score: 0,
  })
  const [confettiActive, setConfettiActive] = useState(false)

  useEffect(() => {
    if (quizState.showResults && quizState.score === quizQuestions.length) {
      setConfettiActive(true)
      setTimeout(() => {
        setConfettiActive(false)
      }, 5000)
    }
  }, [quizState])

  const sections = [
    { id: "basics", title: "The Basics", icon: Target },
    { id: "examples", title: "Visual Examples", icon: Eye },
    { id: "breaking", title: "When to Break It", icon: AlertTriangle },
    { id: "practice", title: "Practice Tips", icon: Lightbulb },
    { id: "resources", title: "Resources", icon: BookOpen },
    { id: "quiz", title: "Quiz", icon: Award },
  ]

  const quizQuestions = [
    {
      id: 1,
      question: "What does the 180-degree rule primarily help with in a film scene?",
      options: [
        {
          id: "a",
          text: "Making the actors look more dramatic",
          correct: false,
        },
        {
          id: "b",
          text: "Ensuring consistent spatial orientation for the audience",
          correct: true,
        },
        { id: "c", text: "Keeping the lighting balanced", correct: false },
        {
          id: "d",
          text: "Allowing the editor to use fancy transitions",
          correct: false,
        },
      ],
      explanation:
        "The 180-degree rule maintains spatial consistency, helping the audience understand where characters are positioned relative to each other throughout a scene.",
    },
    {
      id: 2,
      question: "Why should the camera stay on one side of the axis of action between two characters?",
      options: [
        {
          id: "a",
          text: "To keep their screen direction and eyelines consistent",
          correct: true,
        },
        {
          id: "b",
          text: "To make them look equally important",
          correct: false,
        },
        {
          id: "c",
          text: "To keep both characters in sharp focus",
          correct: false,
        },
        { id: "d", text: "Because it looks more symmetrical", correct: false },
      ],
      explanation:
        "Staying on one side ensures that each character's eyeline direction remains consistent, making the conversation feel natural and connected.",
    },
    {
      id: 3,
      question: "Which is a reason a director might intentionally break the 180-degree rule?",
      options: [
        {
          id: "a",
          text: "To create audience confusion and mirror chaos",
          correct: true,
        },
        { id: "b", text: "To save memory card space", correct: false },
        { id: "c", text: "To avoid using multiple lights", correct: false },
        {
          id: "d",
          text: "Because it's easier than following the rule",
          correct: false,
        },
      ],
      explanation:
        "Breaking the rule can be a powerful storytelling tool to show confusion, psychological states, or dramatic power shifts in a scene.",
    },
    {
      id: 4,
      question: "In the famous diner scene from 'Heat' (1995), how is the 180-degree rule applied?",
      options: [
        {
          id: "a",
          text: "It is constantly broken to show tension",
          correct: false,
        },
        {
          id: "b",
          text: "It is perfectly maintained throughout the conversation",
          correct: true,
        },
        { id: "c", text: "It only applies to wide shots", correct: false },
        { id: "d", text: "The rule is ignored completely", correct: false },
      ],
      explanation:
        "The Heat diner scene is a masterclass in maintaining the 180-degree rule, keeping both characters' positions clear throughout their intense dialogue.",
    },
    {
      id: 5,
      question: "What is the 'axis of action' in the 180-degree rule?",
      options: [
        { id: "a", text: "The path actors take when moving", correct: false },
        {
          id: "b",
          text: "The imaginary line between two subjects",
          correct: true,
        },
        { id: "c", text: "The camera movement path", correct: false },
        { id: "d", text: "The lighting setup boundary", correct: false },
      ],
      explanation:
        "The axis of action is the imaginary straight line drawn between two subjects or along the path of movement that cameras should not cross.",
    },
  ]

  const handleAnswerSelect = (questionIndex, optionId) => {
    setQuizState((prev) => ({
      ...prev,
      selectedAnswers: {
        ...prev.selectedAnswers,
        [questionIndex]: optionId,
      },
    }))
  }

  const handleNextQuestion = () => {
    if (quizState.currentQuestion < quizQuestions.length - 1) {
      setQuizState((prev) => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
      }))
    } else {
      // Calculate score and show results
      const correctAnswers = quizQuestions.reduce((count, question, index) => {
        const selectedOption = quizState.selectedAnswers[index]
        const correctOption = question.options.find((opt) => opt.correct)
        return selectedOption === correctOption.id ? count + 1 : count
      }, 0)

      setQuizState((prev) => ({
        ...prev,
        showResults: true,
        score: correctAnswers,
      }))
    }
  }

  const resetQuiz = () => {
    setQuizState({
      currentQuestion: 0,
      selectedAnswers: {},
      showResults: false,
      score: 0,
    })
  }

  const QuizComponent = () => {
    const currentQuestion = quizQuestions[quizState.currentQuestion]
    const selectedAnswer = quizState.selectedAnswers[quizState.currentQuestion]
    const hasAnswered = selectedAnswer !== undefined

    // Small sub-component to trigger confetti once on mount
    const ConfettiCelebration = () => {
      useEffect(() => {
        let canceled = false
        ;(async () => {
          try {
            const confetti = (await import("canvas-confetti")).default
            if (!canceled) {
              confetti({
                particleCount: 120,
                spread: 70,
                origin: { y: 0.3 },
                colors: ["#34d399", "#a7f3d0", "#6ee7b7"], // emerald variations only
                ticks: 200,
              })
            }
          } catch {}
        })()
        return () => {
          canceled = true
        }
      }, [])
      return null
    }

    if (quizState.showResults) {
      const percentage = Math.round((quizState.score / quizQuestions.length) * 100)

      return (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          {/* Fire confetti only for >=80% */}
          {percentage >= 80 && <ConfettiCelebration />}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-24 h-24 mx-auto mb-6 bg-emerald-500/20 rounded-full flex items-center justify-center border-2 border-emerald-500/30"
            >
              <Trophy className="w-12 h-12 text-emerald-300" />
            </motion.div>

            <h3 className="text-3xl font-serif font-semibold text-slate-100 mb-4">Quiz Complete!</h3>
            <div className="mb-6">
              <div className="text-5xl font-bold text-emerald-300 mb-2">
                {quizState.score}/{quizQuestions.length}
              </div>
              <div className="text-xl text-slate-300">{percentage}% Score</div>
            </div>

            <div className="mb-8">
              {percentage >= 80 ? (
                <div className="text-emerald-300">
                  <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-lg font-semibold">Excellent work!</p>
                  <p className="text-sm opacity-75">You've mastered the 180-degree rule!</p>
                </div>
              ) : percentage >= 60 ? (
                <div className="text-blue-300">
                  <Award className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-lg font-semibold">Good job!</p>
                  <p className="text-sm opacity-75">You have a solid understanding of the basics.</p>
                </div>
              ) : (
                <div className="text-purple-300">
                  <Lightbulb className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-lg font-semibold">Keep learning!</p>
                  <p className="text-sm opacity-75">Review the material and try again.</p>
                </div>
              )}
            </div>

            <button
              onClick={resetQuiz}
              className="flex items-center gap-2 mx-auto px-6 py-3 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-semibold rounded-lg border border-emerald-500/30 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
            >
              <RotateCcw className="w-5 h-5" />
              Retake Quiz
            </button>
          </div>
        </motion.div>
      )
    }

    return (
      <motion.div
        key={quizState.currentQuestion}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-slate-400">
              Question {quizState.currentQuestion + 1} of {quizQuestions.length}
            </span>
            <span className="text-sm text-emerald-300 font-medium">
              {Math.round(((quizState.currentQuestion + 1) / quizQuestions.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${((quizState.currentQuestion + 1) / quizQuestions.length) * 100}%`,
              }}
              className="h-2 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 mb-6">
          <h3 className="text-xl font-semibold text-white mb-6">{currentQuestion.question}</h3>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === option.id
              const isCorrect = option.correct
              const showCorrectAnswer = hasAnswered

              let buttonClass = "w-full p-4 rounded-xl border text-left transition-all duration-300 "

              if (showCorrectAnswer) {
                if (isCorrect) {
                  buttonClass += "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
                } else if (isSelected && !isCorrect) {
                  buttonClass += "bg-red-500/20 border-red-500/50 text-red-300"
                } else {
                  buttonClass += "bg-slate-800/50 border-slate-700/50 text-slate-400"
                }
              } else if (isSelected) {
                buttonClass += "bg-blue-500/20 border-blue-500/50 text-blue-300"
              } else {
                buttonClass +=
                  "bg-slate-800/30 border-slate-700/50 text-slate-300 hover:bg-slate-700/50 hover:border-slate-600/50 hover:text-white"
              }

              return (
                <motion.button
                  key={option.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => !hasAnswered && handleAnswerSelect(quizState.currentQuestion, option.id)}
                  className={buttonClass}
                  disabled={hasAnswered}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center font-semibold">
                        {option.id.toUpperCase()}
                      </span>
                      <span>{option.text}</span>
                    </div>
                    {showCorrectAnswer && (
                      <div>
                        {isCorrect && <CheckCircle className="w-5 h-5" />}
                        {isSelected && !isCorrect && <XCircle className="w-5 h-5" />}
                      </div>
                    )}
                  </div>
                </motion.button>
              )
            })}
          </div>

          {/* Explanation */}
          {hasAnswered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ delay: 0.3 }}
              className="mt-6 p-4 bg-slate-800/30 rounded-lg border border-slate-700/30"
            >
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-white mb-1">Explanation</h4>
                  <p className="text-slate-300 text-sm">{currentQuestion.explanation}</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Next Button */}
        {hasAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <button
              onClick={handleNextQuestion}
              className="px-6 py-3 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-semibold rounded-lg border border-emerald-500/30 transition-all duration-300 flex items-center gap-2 mx-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
              aria-label={quizState.currentQuestion < quizQuestions.length - 1 ? "Next Question" : "View Results"}
            >
              {quizState.currentQuestion < quizQuestions.length - 1 ? (
                <>
                  Next Question
                  <ChevronRight className="w-5 h-5" />
                </>
              ) : (
                <>
                  View Results
                  <Trophy className="w-5 h-5" />
                </>
              )}
            </button>
          </motion.div>
        )}
      </motion.div>
    )
  }

  const InteractiveDiagram = () => {
    const [cameraPosition, setCameraPosition] = useState(1)
    const [showLine, setShowLine] = useState(true)

    // Coordinates in percentage of container for simple, responsive SVG lines
    const cam = {
      1: { x: 12, y: 88 },
      2: { x: 50, y: 88 },
      3: { x: 88, y: 88 },
    }
    const A = { x: 25, y: 50 }
    const B = { x: 75, y: 50 }
    const stroke = cameraPosition === 3 ? "rgba(248,113,113,1)" /* red-400 */ : "rgba(16,185,129,1)" /* emerald-500 */

    return (
      <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white">Interactive 180° Diagram</h3>
          <button
            onClick={() => setShowLine(!showLine)}
            className="px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-lg border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
          >
            {showLine ? "Hide Line" : "Show Line"}
          </button>
        </div>

        <div className="relative h-80 bg-slate-800/30 rounded-xl border border-slate-700/30 overflow-hidden">
          {/* Background grid */}
          <div className="absolute inset-0 opacity-20">
            <div
              className="h-full w-full"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(148,163,184,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.1) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
          </div>

          {/* 180-degree axis */}
          {showLine && (
            <div className="absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-emerald-500 transform -translate-y-0.5">
              <div className="absolute -top-2 left-0 w-4 h-4 bg-emerald-500 rounded-full" />
              <div className="absolute -top-2 right-0 w-4 h-4 bg-emerald-500 rounded-full" />
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-emerald-300 text-sm font-medium whitespace-nowrap">
                180° Line (Axis of Action)
              </div>
            </div>
          )}

          {/* Animated sight lines (SVG overlay) */}
          {showLine && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {/* Camera -> Character A */}
              <motion.line
                key={`line-a-${cameraPosition}`}
                x1={`${cam[cameraPosition].x}%`}
                y1={`${cam[cameraPosition].y}%`}
                x2={`${A.x}%`}
                y2={`${A.y}%`}
                stroke={stroke}
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
              {/* Camera -> Character B */}
              <motion.line
                key={`line-b-${cameraPosition}`}
                x1={`${cam[cameraPosition].x}%`}
                y1={`${cam[cameraPosition].y}%`}
                x2={`${B.x}%`}
                y2={`${B.y}%`}
                stroke={stroke}
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
              />
            </svg>
          )}

          {/* Characters */}
          <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2">
            <div className="w-16 h-16 bg-blue-500/20 border-2 border-blue-400 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-blue-400" />
            </div>
            <div className="text-center mt-2 text-sm text-blue-300 font-medium">Character A</div>
          </div>

          <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2">
            <div className="w-16 h-16 bg-purple-500/20 border-2 border-purple-400 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-purple-400" />
            </div>
            <div className="text-center mt-2 text-sm text-purple-300 font-medium">Character B</div>
          </div>

          {/* Camera positions (clickable) */}
          <div className="absolute bottom-8 left-8">
            <motion.div
              animate={{ opacity: cameraPosition === 1 ? 1 : 0.3, scale: cameraPosition === 1 ? 1.1 : 1 }}
              className="w-12 h-12 bg-emerald-500/20 border-2 border-emerald-400 rounded-lg flex items-center justify-center cursor-pointer"
              onClick={() => setCameraPosition(1)}
            >
              <Camera className="w-6 h-6 text-emerald-400" />
            </motion.div>
            <div className="text-center mt-1 text-xs text-emerald-300">Cam 1</div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <motion.div
              animate={{ opacity: cameraPosition === 2 ? 1 : 0.3, scale: cameraPosition === 2 ? 1.1 : 1 }}
              className="w-12 h-12 bg-emerald-500/20 border-2 border-emerald-400 rounded-lg flex items-center justify-center cursor-pointer"
              onClick={() => setCameraPosition(2)}
            >
              <Camera className="w-6 h-6 text-emerald-400" />
            </motion.div>
            <div className="text-center mt-1 text-xs text-emerald-300">Cam 2</div>
          </div>

          <div className="absolute bottom-8 right-8">
            <motion.div
              animate={{ opacity: cameraPosition === 3 ? 1 : 0.3, scale: cameraPosition === 3 ? 1.1 : 1 }}
              className="w-12 h-12 bg-red-500/20 border-2 border-red-400 rounded-lg flex items-center justify-center cursor-pointer"
              onClick={() => setCameraPosition(3)}
            >
              <Camera className="w-6 h-6 text-red-400" />
            </motion.div>
            <div className="text-center mt-1 text-xs text-red-300">Cam 3 (Crosses Line!)</div>
          </div>

          {/* Camera View window unchanged */}
        </div>

        <div className="mt-4 text-sm text-slate-300">
          <p className="mb-2">
            <strong className="text-emerald-300">Try it:</strong> Click different camera positions to see how crossing
            the line affects character positions.
          </p>
          <div className="flex items-center gap-4 text-xs">
            <span className="text-emerald-300">✅ Cam 1 & 2: Maintains consistency</span>
            <span className="text-red-300">❌ Cam 3: Crosses the line</span>
          </div>
        </div>
      </div>
    )
  }

  const VideoPlayer = ({ title, embedId, description, fullBleed = false }) => {
    return (
      <div
        className={`${
          fullBleed ? "-mx-4 sm:-mx-6 lg:-mx-8 rounded-none lg:rounded-2xl" : ""
        } bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden mb-6 transition-shadow`}
      >
        <div className={`aspect-video bg-slate-800 relative ${fullBleed ? "lg:rounded-t-2xl" : ""}`}>
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${embedId}`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="p-6">
          <h4 className="text-lg font-semibold text-white mb-2">{title}</h4>
          <p className="text-slate-300 text-sm">{description}</p>
        </div>
      </div>
    )
  }

  const NoteCard = ({ icon: Icon, title, content, color = "emerald" }) => {
    const colorClasses = {
      emerald: "bg-emerald-500/10 border-emerald-500/20 text-emerald-300",
      blue: "bg-blue-500/10 border-blue-500/20 text-blue-300",
      purple: "bg-purple-500/10 border-purple-500/20 text-purple-300",
      red: "bg-red-500/10 border-red-500/20 text-red-300",
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 rounded-2xl border backdrop-blur-xl ${colorClasses[color]} mb-4 shadow-sm transition-colors`}
      >
        <div className="flex items-start gap-4">
          <Icon className="w-6 h-6 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold mb-2">{title}</h4>
            <p className="text-sm leading-relaxed opacity-90">{content}</p>
          </div>
        </div>
      </motion.div>
    )
  }

  const renderSectionContent = () => {
    switch (activeSection) {
      case "basics":
        return (
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-6">Understanding the 180° Rule</h2>
              <div className="text-lg text-slate-300 leading-relaxed mb-8">
                <p className="mb-4">
                  The <strong className="text-emerald-300">180° Rule</strong> is like an invisible fence for your
                  camera. Imagine drawing a straight line between two characters having a conversation—this is your
                  <strong className="text-blue-300"> axis of action</strong>.
                </p>
                <p className="mb-4">
                  As long as you keep your camera on <em>one side</em> of this line, your audience will always know
                  where everyone is in the scene. Cross that line, and suddenly your characters appear to have
                  teleported!
                </p>
              </div>
            </motion.div>

            <InteractiveDiagram />

            <div className="grid md:grid-cols-2 gap-6">
              <NoteCard
                icon={Target}
                title="Why It Matters"
                content="Maintains spatial consistency and keeps your audience oriented. No one likes feeling lost in a scene!"
                color="emerald"
              />
              <NoteCard
                icon={Eye}
                title="Screen Direction"
                content="Ensures characters' eyelines match correctly, making dialogue feel natural and connected."
                color="blue"
              />
            </div>
          </div>
        )

      case "examples":
        return (
          <div>
            <h2 className="text-3xl font-serif font-semibold text-slate-100 mb-6">Visual Examples</h2>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-emerald-300 mb-4">Perfect Execution: Heat (1995)</h3>
              <VideoPlayer
                fullBleed
                title="Heat - Diner Scene Analysis"
                embedId="xlNTDEtYX9k"
                description="Analysis of the famous diner scene between De Niro and Pacino, showing perfect adherence to the 180° rule throughout their intense conversation."
              />
            </div>

            <VideoPlayer
              title="The 180 Degree Rule Explained"
              embedId="iW0bKUfvH2c"
              description="A comprehensive breakdown of the rule with visual examples from famous films."
            />

            <VideoPlayer
              title="How to Film a Conversation - Camber Film School"
              embedId="wLfZL9PZI9k"
              description="Practical techniques for maintaining the 180° rule during dialogue scenes."
            />
          </div>
        )

      case "breaking":
        return (
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">When to Break the Rule</h2>

            <div className="mb-8">
              <NoteCard
                icon={AlertTriangle}
                title="Breaking with Purpose"
                content="Sometimes crossing the line is exactly what you want—to disorient, show chaos, or signal a major shift in power dynamics."
                color="red"
              />
            </div>

            <div className="space-y-6 mb-8">
              <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Famous Line Breaks</h3>

                <div className="space-y-4">
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold text-purple-300">The Dark Knight - Interrogation Scene</h4>
                    <p className="text-slate-300 text-sm mt-1">
                      Camera crosses the line as tension escalates, mirroring the Joker's chaos and Batman losing
                      control.
                    </p>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-blue-300">Lord of the Rings - Gollum's Split Personality</h4>
                    <p className="text-slate-300 text-sm mt-1">
                      Line crossing makes it appear as two different characters talking, showing his internal conflict.
                    </p>
                  </div>

                  <div className="border-l-4 border-emerald-500 pl-4">
                    <h4 className="font-semibold text-emerald-300">Parasite - Class Boundaries</h4>
                    <p className="text-slate-300 text-sm mt-1">
                      Deliberate line crossing when discussing personal matters highlights the theme of crossing social
                      boundaries.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <NoteCard
                icon={Move}
                title="Bending the Rule"
                content="Use neutral shots, camera movement, or cutaways to 'reset' the line without jarring your audience."
                color="blue"
              />
              <NoteCard
                icon={Lightbulb}
                title="Creative Applications"
                content="Perfect for showing confusion, power shifts, psychological states, or covering action choreography."
                color="purple"
              />
            </div>
          </div>
        )

      case "practice":
        return (
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Practice Tips</h2>

            <div className="space-y-6 mb-8">
              <NoteCard
                icon={Target}
                title="Step 1: Establish the Line"
                content="Before you start filming, clearly identify where your axis of action runs between your subjects."
                color="emerald"
              />

              <NoteCard
                icon={Camera}
                title="Step 2: Pick Your Side"
                content="Choose which side of the line your camera will stay on, and stick to it for the entire scene."
                color="blue"
              />

              <NoteCard
                icon={Eye}
                title="Step 3: Maintain Eyelines"
                content="Character A looks right, Character B looks left (or vice versa). Keep this consistent across all shots."
                color="purple"
              />
            </div>

            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">Practice Exercise</h3>
              <div className="space-y-3 text-slate-300">
                <p>
                  <strong className="text-emerald-300">Try this:</strong> Set up two chairs facing each other about 6
                  feet apart.
                </p>
                <p>• Draw an imaginary line between them</p>
                <p>• Position your camera on one side</p>
                <p>• Film someone sitting in each chair</p>
                <p>• Try different angles, but stay on your chosen side</p>
                <p>• Now deliberately cross the line and see how weird it feels!</p>
              </div>
            </div>
          </div>
        )

      case "resources":
        return (
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Additional Resources</h2>

            <div className="space-y-4 mb-8">
              <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Video className="w-5 h-5 text-emerald-300" />
                  <h3 className="font-semibold text-white">Video Resources</h3>
                </div>
                <div className="space-y-3">
                  <a
                    href="https://www.youtube.com/watch?v=BBA8nXTUAw8"
                    target="_blank"
                    className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
                    rel="noreferrer"
                  >
                    <ExternalLink className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="text-white font-medium">The 180 Degree Rule Explained – StudioBinder</p>
                      <p className="text-slate-400 text-sm">Comprehensive visual breakdown with examples</p>
                    </div>
                  </a>
                  <a
                    href="https://www.youtube.com/watch?v=wLfZL9PZI9k"
                    target="_blank"
                    className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
                    rel="noreferrer"
                  >
                    <ExternalLink className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="text-white font-medium">How to Film a Conversation – Camber Film School</p>
                      <p className="text-slate-400 text-sm">Practical filming techniques and tips</p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <FileText className="w-5 h-5 text-blue-300" />
                  <h3 className="font-semibold text-white">Articles & Guides</h3>
                </div>
                <a
                  href="https://www.studiobinder.com/blog/what-is-continuity-editing-in-film/"
                  target="_blank"
                  className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
                  rel="noreferrer"
                >
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                  <div>
                    <p className="text-white font-medium">Continuity Editing in Film – StudioBinder</p>
                    <p className="text-slate-400 text-sm">Deep dive into editing techniques and rules</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        )

      case "quiz":
        return (
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Test Your Knowledge</h2>
            <div className="mb-6">
              <p className="text-slate-300 leading-relaxed">
                Put your understanding of the 180-degree rule to the test! This interactive quiz covers the basics,
                practical applications, and creative uses of this fundamental cinematography principle.
              </p>
            </div>
            <QuizComponent />
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {confettiActive && <Confetti />}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="rounded-3xl border border-slate-700/40 bg-slate-900/60 backdrop-blur-xl px-6 py-8 md:px-10 shadow-sm">
            <div className="flex items-start md:items-center justify-between gap-6 flex-col md:flex-row">
              <div className="flex items-start gap-4">
                <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                  <Camera className="w-8 h-8 text-emerald-300" />
                </div>
                <div>
                  {/* Heading: subtle luxury, serif, no rainbow */}
                  <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-balance text-slate-100">
                    180-Degree Rule
                  </h1>
                  <p className="mt-2 text-slate-300 max-w-2xl leading-relaxed">
                    Maintain spatial clarity and coherent eyelines in dialogue and action. Master the foundation, then
                    learn when and how to break it with purpose.
                  </p>
                  <div className="flex items-center gap-2 mt-4">
                    <span className="px-3 py-1 bg-slate-800/60 text-slate-300 text-sm font-medium rounded-full border border-slate-700/50">
                      Camera Work
                    </span>
                    <span className="px-3 py-1 bg-emerald-500/15 text-emerald-300 text-sm font-medium rounded-full border border-emerald-500/25">
                      Beginner
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveSection("basics")}
                className="px-4 py-2 rounded-xl border border-emerald-500/30 text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 transition-all font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 hover:shadow-[0_0_0_3px_rgba(16,185,129,0.15)]"
              >
                Start with the basics
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Lesson Sections</h3>
                <nav className="space-y-2" aria-label="Lesson Sections">
                  {sections.map((section, idx) => {
                    const Icon = section.icon
                    const isActive = activeSection === section.id
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        aria-current={isActive ? "page" : undefined}
                        className={`group w-full flex items-center justify-between gap-3 p-3 rounded-xl transition-all duration-300 focus-visible:outline-none ${
                          isActive
                            ? "bg-slate-800/60 text-emerald-300 border border-emerald-500/30 ring-1 ring-emerald-400/20"
                            : "text-slate-300 hover:bg-slate-800/50 hover:text-white border border-transparent focus-visible:ring-2 focus-visible:ring-emerald-400/40"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className={`flex items-center justify-center w-7 h-7 rounded-full border ${
                              isActive
                                ? "bg-emerald-500/20 border-emerald-400 text-emerald-300"
                                : "bg-slate-800/60 border-slate-600 text-slate-300 group-hover:text-white"
                            }`}
                            aria-hidden="true"
                          >
                            <Icon className="w-4 h-4" />
                          </span>
                          <span className={`text-left font-medium ${isActive ? "text-emerald-300" : ""}`}>
                            {section.title}
                          </span>
                        </span>
                        <ChevronRight
                          className={`w-4 h-4 transition-opacity ${
                            isActive
                              ? "opacity-100 text-emerald-300"
                              : "opacity-0 group-hover:opacity-100 text-slate-400"
                          }`}
                        />
                      </button>
                    )
                  })}
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              {renderSectionContent()}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Rule180Page

"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Camera,
  Play,
  Pause,
  Volume2,
  VolumeX,
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
} from "lucide-react";

const Rule180Page = () => {
  const [activeSection, setActiveSection] = useState("basics");
  const [showDiagram, setShowDiagram] = useState(false);

  const sections = [
    { id: "basics", title: "The Basics", icon: Target },
    { id: "examples", title: "Visual Examples", icon: Eye },
    { id: "breaking", title: "When to Break It", icon: AlertTriangle },
    { id: "practice", title: "Practice Tips", icon: Lightbulb },
    { id: "resources", title: "Resources", icon: BookOpen },
  ];

  const InteractiveDiagram = () => {
    const [cameraPosition, setCameraPosition] = useState(1);
    const [showLine, setShowLine] = useState(true);

    return (
      <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white">
            Interactive 180° Diagram
          </h3>
          <button
            onClick={() => setShowLine(!showLine)}
            className="px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-lg border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors"
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
                backgroundImage: `
                linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px)
              `,
                backgroundSize: "20px 20px",
              }}
            ></div>
          </div>

          {/* 180-degree line */}
          {showLine && (
            <div className="absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-emerald-500 transform -translate-y-0.5">
              <div className="absolute -top-2 left-0 w-4 h-4 bg-emerald-500 rounded-full"></div>
              <div className="absolute -top-2 right-0 w-4 h-4 bg-emerald-500 rounded-full"></div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-emerald-300 text-sm font-medium whitespace-nowrap">
                180° Line (Axis of Action)
              </div>
            </div>
          )}

          {/* Characters */}
          <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-16 h-16 bg-blue-500/20 border-2 border-blue-400 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-blue-400" />
            </div>
            <div className="text-center mt-2 text-sm text-blue-300 font-medium">
              Character A
            </div>
          </div>

          <div className="absolute top-1/2 right-1/4 transform translate-x-1/2 -translate-y-1/2">
            <div className="w-16 h-16 bg-purple-500/20 border-2 border-purple-400 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-purple-400" />
            </div>
            <div className="text-center mt-2 text-sm text-purple-300 font-medium">
              Character B
            </div>
          </div>

          {/* Camera positions */}
          <div className="absolute bottom-8 left-8">
            <motion.div
              animate={{
                opacity: cameraPosition === 1 ? 1 : 0.3,
                scale: cameraPosition === 1 ? 1.1 : 1,
              }}
              className="w-12 h-12 bg-emerald-500/20 border-2 border-emerald-400 rounded-lg flex items-center justify-center cursor-pointer"
              onClick={() => setCameraPosition(1)}
            >
              <Camera className="w-6 h-6 text-emerald-400" />
            </motion.div>
            <div className="text-center mt-1 text-xs text-emerald-300">
              Cam 1
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <motion.div
              animate={{
                opacity: cameraPosition === 2 ? 1 : 0.3,
                scale: cameraPosition === 2 ? 1.1 : 1,
              }}
              className="w-12 h-12 bg-emerald-500/20 border-2 border-emerald-400 rounded-lg flex items-center justify-center cursor-pointer"
              onClick={() => setCameraPosition(2)}
            >
              <Camera className="w-6 h-6 text-emerald-400" />
            </motion.div>
            <div className="text-center mt-1 text-xs text-emerald-300">
              Cam 2
            </div>
          </div>

          <div className="absolute bottom-8 right-8">
            <motion.div
              animate={{
                opacity: cameraPosition === 3 ? 1 : 0.3,
                scale: cameraPosition === 3 ? 1.1 : 1,
              }}
              className="w-12 h-12 bg-red-500/20 border-2 border-red-400 rounded-lg flex items-center justify-center cursor-pointer"
              onClick={() => setCameraPosition(3)}
            >
              <Camera className="w-6 h-6 text-red-400" />
            </motion.div>
            <div className="text-center mt-1 text-xs text-red-300">
              Cam 3 (Crosses Line!)
            </div>
          </div>

          {/* View window */}
          <div className="absolute top-4 right-4 w-32 h-20 bg-slate-900 border border-slate-600 rounded-lg overflow-hidden">
            <div className="p-2 bg-slate-800 text-xs text-slate-300 font-medium">
              Camera View
            </div>
            <div className="flex items-center justify-between p-2 h-12">
              {cameraPosition <= 2 ? (
                <>
                  <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
                  <div className="w-4 h-4 bg-purple-400 rounded-full"></div>
                </>
              ) : (
                <>
                  <div className="w-4 h-4 bg-purple-400 rounded-full"></div>
                  <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 text-sm text-slate-300">
          <p className="mb-2">
            <strong className="text-emerald-300">Try it:</strong> Click
            different camera positions to see how crossing the line affects
            character positions.
          </p>
          <div className="flex items-center gap-4 text-xs">
            <span className="text-emerald-300">
              ✅ Cam 1 & 2: Maintains consistency
            </span>
            <span className="text-red-300">❌ Cam 3: Crosses the line</span>
          </div>
        </div>
      </div>
    );
  };

  const VideoPlayer = ({ title, embedId, description }) => {
    return (
      <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden mb-6">
        <div className="aspect-video bg-slate-800 relative">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${embedId}`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="p-6">
          <h4 className="text-lg font-semibold text-white mb-2">{title}</h4>
          <p className="text-slate-300 text-sm">{description}</p>
        </div>
      </div>
    );
  };

  const NoteCard = ({ icon: Icon, title, content, color = "emerald" }) => {
    const colorClasses = {
      emerald: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
      blue: "bg-blue-500/10 border-blue-500/30 text-blue-300",
      purple: "bg-purple-500/10 border-purple-500/30 text-purple-300",
      red: "bg-red-500/10 border-red-500/30 text-red-300",
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 rounded-2xl border backdrop-blur-xl ${colorClasses[color]} mb-4`}
      >
        <div className="flex items-start gap-4">
          <Icon className="w-6 h-6 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold mb-2">{title}</h4>
            <p className="text-sm leading-relaxed opacity-90">{content}</p>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case "basics":
        return (
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold text-white mb-6">
                Understanding the 180° Rule
              </h2>
              <div className="text-lg text-slate-300 leading-relaxed mb-8">
                <p className="mb-4">
                  The <strong className="text-emerald-300">180° Rule</strong> is
                  like an invisible fence for your camera. Imagine drawing a
                  straight line between two characters having a
                  conversation—this is your
                  <strong className="text-blue-300"> axis of action</strong>.
                </p>
                <p className="mb-4">
                  As long as you keep your camera on <em>one side</em> of this
                  line, your audience will always know where everyone is in the
                  scene. Cross that line, and suddenly your characters appear to
                  have teleported!
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
        );

      case "examples":
        return (
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">
              Visual Examples
            </h2>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-emerald-300 mb-4">
                Perfect Execution: Heat (1995)
              </h3>
              <VideoPlayer
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
        );

      case "breaking":
        return (
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">
              When to Break the Rule
            </h2>

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
                <h3 className="text-xl font-semibold text-white mb-3">
                  Famous Line Breaks
                </h3>

                <div className="space-y-4">
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold text-purple-300">
                      The Dark Knight - Interrogation Scene
                    </h4>
                    <p className="text-slate-300 text-sm mt-1">
                      Camera crosses the line as tension escalates, mirroring
                      the Joker's chaos and Batman losing control.
                    </p>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-blue-300">
                      Lord of the Rings - Gollum's Split Personality
                    </h4>
                    <p className="text-slate-300 text-sm mt-1">
                      Line crossing makes it appear as two different characters
                      talking, showing his internal conflict.
                    </p>
                  </div>

                  <div className="border-l-4 border-emerald-500 pl-4">
                    <h4 className="font-semibold text-emerald-300">
                      Parasite - Class Boundaries
                    </h4>
                    <p className="text-slate-300 text-sm mt-1">
                      Deliberate line crossing when discussing personal matters
                      highlights the theme of crossing social boundaries.
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
        );

      case "practice":
        return (
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">
              Practice Tips
            </h2>

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
              <h3 className="text-xl font-semibold text-white mb-4">
                Practice Exercise
              </h3>
              <div className="space-y-3 text-slate-300">
                <p>
                  <strong className="text-emerald-300">Try this:</strong> Set up
                  two chairs facing each other about 6 feet apart.
                </p>
                <p>• Draw an imaginary line between them</p>
                <p>• Position your camera on one side</p>
                <p>• Film someone sitting in each chair</p>
                <p>• Try different angles, but stay on your chosen side</p>
                <p>
                  • Now deliberately cross the line and see how weird it feels!
                </p>
              </div>
            </div>
          </div>
        );

      case "resources":
        return (
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">
              Additional Resources
            </h2>

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
                    className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="text-white font-medium">
                        The 180 Degree Rule Explained – StudioBinder
                      </p>
                      <p className="text-slate-400 text-sm">
                        Comprehensive visual breakdown with examples
                      </p>
                    </div>
                  </a>
                  <a
                    href="https://www.youtube.com/watch?v=wLfZL9PZI9k"
                    target="_blank"
                    className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="text-white font-medium">
                        How to Film a Conversation – Camber Film School
                      </p>
                      <p className="text-slate-400 text-sm">
                        Practical filming techniques and tips
                      </p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <FileText className="w-5 h-5 text-blue-300" />
                  <h3 className="font-semibold text-white">
                    Articles & Guides
                  </h3>
                </div>
                <a
                  href="https://www.studiobinder.com/blog/what-is-continuity-editing-in-film/"
                  target="_blank"
                  className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                  <div>
                    <p className="text-white font-medium">
                      Continuity Editing in Film – StudioBinder
                    </p>
                    <p className="text-slate-400 text-sm">
                      Deep dive into editing techniques and rules
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
              <Camera className="w-8 h-8 text-emerald-300" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-slate-200 to-emerald-300 bg-clip-text text-transparent">
                180-Degree Rule
              </h1>
              <div className="flex items-center gap-3 mt-2">
                <span className="px-3 py-1 bg-slate-800/50 text-slate-300 text-sm font-medium rounded-full">
                  Camera Work
                </span>
                <span className="px-3 py-1 bg-green-500/20 text-green-300 text-sm font-medium rounded-full">
                  Beginner
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Lesson Sections
                </h3>
                <nav className="space-y-2">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    const isActive = activeSection === section.id;

                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                          isActive
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                            : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="flex-1 text-left">
                          {section.title}
                        </span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderSectionContent()}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rule180Page;

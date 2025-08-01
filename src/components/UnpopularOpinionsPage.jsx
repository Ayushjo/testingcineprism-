"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Send,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// Genres array for filtering and tagging
const genres = [
  "Action",
  "Comedy",
  "Drama",
  "Horror",
  "Sci-Fi",
  "Thriller",
  "Superhero",
];

const unpopularOpinionsData = [
  {
    id: 1,
    username: "@cinephile_alex",
    avatarInitial: "A",
    opinionText:
      "The Joker's best performance wasn't Heath Ledger, it was Joaquin Phoenix. Ledger's was iconic chaos, but Phoenix's was a pure, devastating character study from the inside out.",
    genres: ["Drama", "Thriller"],
    likeCount: 128,
    comments: [
      {
        id: 101,
        username: "@film_fanatic",
        avatarInitial: "F",
        commentText:
          "Totally agree! The physical transformation alone was incredible.",
        replies: [],
      },
      {
        id: 102,
        username: "@ledger_legend",
        avatarInitial: "L",
        commentText:
          "Respectfully disagree. Ledger's Joker defined a decade of cinema villains. It's not even a competition.",
        replies: [
          {
            id: 103,
            username: "@cinephile_alex",
            avatarInitial: "A",
            commentText:
              "I see your point, but Phoenix's version felt more like a real, tragic person to me.",
            replies: [],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    username: "@story_first",
    avatarInitial: "S",
    opinionText:
      "Blade Runner 2049 is visually stunning, but its story is far too slow and emotionally distant to be considered a true masterpiece. It's a beautiful, hollow painting.",
    genres: ["Sci-Fi"],
    likeCount: 256,
    comments: [
      {
        id: 201,
        username: "@vangelis_dream",
        avatarInitial: "V",
        commentText:
          "The atmosphere IS the story. You have to let it wash over you.",
        replies: [],
      },
    ],
  },
  {
    id: 3,
    username: "@mcu_realist",
    avatarInitial: "M",
    opinionText:
      "Hot take: The Marvel Cinematic Universe peaked with *Captain America: The Winter Soldier*. It was the perfect blend of spy thriller and superhero action, and the franchise has been chasing that high ever since.",
    genres: ["Action", "Superhero", "Thriller"],
    likeCount: 512,
    comments: [
      {
        id: 301,
        username: "@endgame_fan",
        avatarInitial: "E",
        commentText:
          "What about Infinity War and Endgame? The scale was unprecedented!",
        replies: [],
      },
    ],
  },
];

// Recursive Comment Component
const Comment = ({ comment }) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");

  const getAvatarColor = (initial) => {
    const colors = [
      "bg-emerald-500",
      "bg-purple-500",
      "bg-blue-500",
      "bg-pink-500",
      "bg-orange-500",
      "bg-teal-500",
      "bg-indigo-500",
      "bg-rose-500",
    ];
    return colors[initial.charCodeAt(0) % colors.length];
  };

  const handleTextareaInput = (e) => {
    e.currentTarget.style.height = "auto";
    e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
  };

  return (
    <div className="flex gap-3">
      <div
        className={`w-8 h-8 rounded-full ${getAvatarColor(
          comment.avatarInitial
        )} flex items-center justify-center text-white text-sm font-semibold flex-shrink-0`}
      >
        {comment.avatarInitial}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-emerald-400">
            {comment.username}
          </span>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed mb-2">
          {comment.commentText}
        </p>
        <button
          onClick={() => setShowReplyInput(!showReplyInput)}
          className="text-xs text-slate-500 hover:text-emerald-400 transition-colors duration-200"
        >
          Reply
        </button>

        {/* Reply Input */}
        <AnimatePresence>
          {showReplyInput && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2"
            >
              <div className="flex gap-3">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onInput={handleTextareaInput}
                  rows="1"
                  placeholder="Write a reply..."
                  className="flex-1 bg-slate-800/50 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400/50 transition-all duration-300 resize-none overflow-hidden"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 px-3 py-2 rounded-lg border border-emerald-500/30 transition-all duration-300 text-sm self-start"
                >
                  Reply
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Nested Replies with fixed indentation */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-4 space-y-4 pl-4 border-l-2 border-slate-700">
            {comment.replies.map((reply) => (
              <Comment key={reply.id} comment={reply} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default function UnpopularOpinionsPage() {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [expandedComments, setExpandedComments] = useState(new Set());
  const [likedOpinions, setLikedOpinions] = useState(new Set());
  const [newOpinion, setNewOpinion] = useState("");
  const [newComment, setNewComment] = useState("");

  const handleTextareaInput = (e) => {
    e.currentTarget.style.height = "auto";
    e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
  };

  const getTotalComments = (comments) => {
    return comments.reduce((total, comment) => {
      return total + 1 + getTotalComments(comment.replies || []);
    }, 0);
  };

  const toggleGenre = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const toggleLike = (opinionId) => {
    const newLiked = new Set(likedOpinions);
    if (newLiked.has(opinionId)) {
      newLiked.delete(opinionId);
    } else {
      newLiked.add(opinionId);
    }
    setLikedOpinions(newLiked);
  };

  const toggleComments = (opinionId) => {
    const newExpanded = new Set(expandedComments);
    if (newExpanded.has(opinionId)) {
      newExpanded.delete(opinionId);
    } else {
      newExpanded.add(opinionId);
    }
    setExpandedComments(newExpanded);
  };

  const getAvatarColor = (initial) => {
    const colors = [
      "bg-emerald-500",
      "bg-purple-500",
      "bg-blue-500",
      "bg-pink-500",
      "bg-orange-500",
      "bg-teal-500",
      "bg-indigo-500",
      "bg-rose-500",
    ];
    return colors[initial.charCodeAt(0) % colors.length];
  };

  const filteredOpinions = unpopularOpinionsData.filter((opinion) =>
    activeFilter === "All" ? true : opinion.genres.includes(activeFilter)
  );

  

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-20">
      {/* Ambient Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(16,185,129,0.03),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(139,92,246,0.03),transparent_50%)]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Page Header */}
        <section className="py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block mb-6">
              <span className="bg-white/5 backdrop-blur-xl text-emerald-400 px-4 py-2 rounded-2xl text-sm font-semibold border border-white/10">
                💬 Forum Discussion
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent tracking-tight">
              Unpopular Opinions
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Share your controversial takes and engage in thoughtful
              discussions about cinema.
            </p>
          </motion.div>
        </section>

        {/* Section 1: Opinion Submission Form */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Share Your Take
            </h2>

            {/* Opinion Textarea */}
            <textarea
              value={newOpinion}
              onChange={(e) => setNewOpinion(e.target.value)}
              placeholder="What's your unpopular opinion about movies? Be specific and explain your reasoning..."
              className="w-full h-32 bg-slate-800/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400/50 focus:bg-slate-800/70 transition-all duration-300 resize-none mb-6"
            />

            {/* Genre Selector */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">
                Select Genres
              </h3>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <motion.button
                    key={genre}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleGenre(genre)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedGenres.includes(genre)
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30"
                        : "bg-slate-700/50 text-slate-400 border border-slate-600 hover:bg-slate-700 hover:text-slate-300"
                    }`}
                  >
                    {genre}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-emerald-500/80 to-teal-600/80 hover:from-emerald-500 hover:to-teal-600 text-white px-8 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-emerald-500/20 flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Submit Opinion
              </motion.button>
            </div>
          </motion.div>
        </section>

        {/* Section 2: Genre Filter Bar */}
        <section className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-slate-900/30 backdrop-blur-xl border border-slate-700 rounded-2xl p-4"
          >
            {/* Desktop Buttons */}
            <div className="hidden md:flex flex-wrap gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter("All")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === "All"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30"
                    : "bg-slate-700/50 text-slate-400 border border-slate-600 hover:bg-slate-700 hover:text-slate-300"
                }`}
              >
                All
              </motion.button>
              {genres.map((genre) => (
                <motion.button
                  key={genre}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveFilter(genre)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeFilter === genre
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30"
                      : "bg-slate-700/50 text-slate-400 border border-slate-600 hover:bg-slate-700 hover:text-slate-300"
                  }`}
                >
                  {genre}
                </motion.button>
              ))}
            </div>

            {/* Mobile Dropdown */}
            <div className="md:hidden relative">
              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
                // The classes below are updated to match your site's glassmorphism style
                className="w-full bg-slate-900/50 backdrop-blur-xl text-slate-300 border border-slate-700 rounded-2xl px-4 py-3 text-sm font-medium appearance-none focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10 transition-all"
              >
                <option className="bg-slate-900" value="All">
                  All Genres
                </option>
                {genres.map((genre) => (
                  <option className="bg-slate-900" key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>
          </motion.div>
        </section>

        {/* Section 3: Opinion Feed */}
        <section className="pb-24">
          <div className="space-y-6">
            {filteredOpinions.map((opinion, index) => (
              <motion.div
                key={opinion.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 hover:border-slate-600 transition-all duration-300"
              >
                {/* Opinion Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-10 h-10 rounded-full ${getAvatarColor(
                      opinion.avatarInitial
                    )} flex items-center justify-center text-white font-semibold`}
                  >
                    {opinion.avatarInitial}
                  </div>
                  <span className="text-emerald-400 font-medium">
                    {opinion.username}
                  </span>
                </div>

                {/* Opinion Text */}
                <p className="text-slate-200 text-lg leading-relaxed mb-4">
                  {opinion.opinionText}
                </p>

                {/* Genre Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {opinion.genres.map((genre) => (
                    <span
                      key={genre}
                      className="bg-slate-700/50 text-slate-300 px-3 py-1 rounded-full text-sm border border-slate-600"
                    >
                      {genre}
                    </span>
                  ))}
                </div>

                {/* Action Bar */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleLike(opinion.id)}
                      className="flex items-center gap-2 text-slate-500 hover:text-pink-500 transition-colors duration-200"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          likedOpinions.has(opinion.id)
                            ? "fill-pink-500 text-pink-500"
                            : ""
                        }`}
                      />
                      <span className="text-sm font-medium">
                        {opinion.likeCount +
                          (likedOpinions.has(opinion.id) ? 1 : 0)}
                      </span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleComments(opinion.id)}
                      className="flex items-center gap-2 text-slate-500 hover:text-emerald-400 transition-colors duration-200"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-sm font-medium">
                        {getTotalComments(opinion.comments)}
                      </span>
                    </motion.button>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleComments(opinion.id)}
                    className="text-slate-500 hover:text-emerald-400 transition-colors duration-200"
                  >
                    {expandedComments.has(opinion.id) ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </motion.button>
                </div>

                {/* Section 4: Inline Nested Comments */}
                <AnimatePresence>
                  {expandedComments.has(opinion.id) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                        marginTop: "24px",
                      }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      className="pt-6 border-t border-slate-700"
                    >
                      {/* --- CHANGE 3: The main comment input is now a growing textarea --- */}
                      <div className="flex gap-3 mb-6">
                        <textarea
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          onInput={handleTextareaInput}
                          rows="1"
                          placeholder="Add a comment..."
                          className="flex-1 bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400/50 transition-all duration-300 resize-none overflow-hidden"
                        />
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 px-4 py-2 rounded-lg border border-emerald-500/30 transition-all duration-300 self-start"
                        >
                          Comment
                        </motion.button>
                      </div>
                      <div className="space-y-4">
                        {opinion.comments.map((comment) => (
                          <Comment key={comment.id} comment={comment} />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* No Results Message */}
          {filteredOpinions.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-12 max-w-md mx-auto">
                <h3 className="text-2xl font-bold text-white mb-4">
                  No opinions found
                </h3>
                <p className="text-slate-400 mb-6">
                  No unpopular opinions found for the "{activeFilter}" genre. Be
                  the first to share your take!
                </p>
                <button
                  onClick={() => setActiveFilter("All")}
                  className="bg-gradient-to-r from-emerald-500/80 to-teal-600/80 hover:from-emerald-500 hover:to-teal-600 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300"
                >
                  View All Opinions
                </button>
              </div>
            </motion.div>
          )}
        </section>
      </div>
    </div>
  );
}

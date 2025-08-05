"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Send,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { comment } from "postcss";
import { useAuth } from "../context/AuthContext";
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
    // The main container now uses padding to create space for the thread line and avatar
    <div className="relative pl-12">
      {/* The vertical thread line */}
      <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-700" />

      {/* The Avatar, positioned absolutely within the padded area */}
      <div className="absolute left-0 top-0">
        <div
          className={`w-8 h-8 rounded-full ${getAvatarColor(
            comment.avatarInitial
          )} flex items-center justify-center text-white text-sm font-semibold flex-shrink-0`}
        >
          {comment.avatarInitial}
        </div>
      </div>

      {/* The main content of the comment */}
      <div className="flex-1">
        <span className="text-sm font-medium text-emerald-400">
          {comment.username}
        </span>
        <p className="text-slate-300 text-sm leading-relaxed mt-1 mb-2">
          {comment.commentText}
        </p>
        <button
          onClick={() => setShowReplyInput(!showReplyInput)}
          className="text-xs text-slate-500 hover:text-emerald-400 font-semibold transition-colors duration-200"
        >
          Reply
        </button>

        {/* Reply Input Box */}
        <AnimatePresence>
          {showReplyInput && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3"
            >
              <div className="flex gap-3">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onInput={handleTextareaInput}
                  rows="1"
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
      </div>

      {/* Nested Replies Container */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4 space-y-4">
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default function UnpopularOpinionsPage() {
  const [unpopularOpinionsData, setUnpopularOpinionsData] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [expandedComments, setExpandedComments] = useState(new Set());
  const [likedOpinions, setLikedOpinions] = useState(new Set());
  const [newOpinion, setNewOpinion] = useState("");
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const handleTextareaInput = (e) => {
    e.currentTarget.style.height = "auto";
    e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
  };

  useEffect(() => {
    const fetchOpinions = async () => {
      try {
        const response = await axios.get(
          "/api/v1/user/fetch-opinions"
        );
        const opinionsFromApi = response.data.opinions;

        // Map API response to your frontend state structure
        const formattedOpinions = opinionsFromApi.map((opinion) => ({
          id: opinion.id,
          username: opinion.user.username,
          avatarInitial: opinion.user.username[0].toUpperCase(),
          opinionText: opinion.content,
          genres: opinion.genres,
          likeCount: opinion.likes.length,
          comments: opinion.comments || [], // Ensure comments is an array
          // Keep the raw likes array for initialization
          likes: opinion.likes,
        }));

        setUnpopularOpinionsData(formattedOpinions);

        // Initialize the set of opinions liked by the current user
        if (user) {
          const initialLiked = new Set();
          formattedOpinions.forEach((opinion) => {
            if (opinion.likes.some((like) => like.userId === user.id)) {
              initialLiked.add(opinion.id);
            }
          });
          setLikedOpinions(initialLiked);
        }
      } catch (error) {
        console.error("Failed to fetch opinions:", error);
        toast.error("Could not load opinions.");
      }
    };

    fetchOpinions();
  }, [user]); // Re-fetch opinions if the user logs in or out

  const handlePost = async () => {
    if (!newOpinion || selectedGenres.length === 0) {
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } bg-rose-900/80 backdrop-blur-xl border border-rose-700 shadow-lg rounded-xl text-white px-6 py-4 flex items-center gap-4`}
        >
          <XCircle className="text-rose-400" />
          <span className="font-medium">
            Please write an opinion and select at least one genre.
          </span>
        </div>
      ));
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        "/api/v1/user/create-opinion",
        {
          content: newOpinion,
          genres: selectedGenres,
        }
      );

      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } bg-slate-800/80 backdrop-blur-xl border border-slate-700 shadow-lg rounded-xl text-white px-6 py-4 flex items-center gap-4`}
        >
          <CheckCircle className="text-emerald-400" />
          <span className="font-medium">
            {response.data.message || "Opinion submitted successfully!"}
          </span>
        </div>
      ));

      // Clear the form on success
      setNewOpinion("");
      setSelectedGenres([]);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to submit opinion.";
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } bg-rose-900/80 backdrop-blur-xl border border-rose-700 shadow-lg rounded-xl text-white px-6 py-4 flex items-center gap-4`}
        >
          <XCircle className="text-rose-400" />
          <span className="font-medium">{errorMessage}</span>
        </div>
      ));
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
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

  const toggleLike = async (opinionId) => {
    if (!user) {
      toast.error("Please log in to like an opinion.");
      return;
    }

    // Save the original state in case the API call fails
    const originalOpinions = [...unpopularOpinionsData];
    const originalLikedSet = new Set(likedOpinions);

    // --- Start Optimistic Update ---

    // 1. Update the liked set for the icon color
    const newLikedSet = new Set(likedOpinions);
    const isCurrentlyLiked = newLikedSet.has(opinionId);
    if (isCurrentlyLiked) {
      newLikedSet.delete(opinionId);
    } else {
      newLikedSet.add(opinionId);
    }
    setLikedOpinions(newLikedSet);

    // 2. Update the like count directly in the main data state
    setUnpopularOpinionsData((currentOpinions) =>
      currentOpinions.map((opinion) => {
        if (opinion.id === opinionId) {
          return {
            ...opinion,
            likeCount: isCurrentlyLiked
              ? opinion.likeCount - 1
              : opinion.likeCount + 1,
          };
        }
        return opinion;
      })
    );
    // --- End Optimistic Update ---

    // API Call
    try {
      await axios.post(
        "/api/v1/user/like",
        { opinionId }
      );
    } catch (error) {
      // If the API call fails, revert both state changes
      toast.error("Failed to update like. Please try again.");
      setUnpopularOpinionsData(originalOpinions);
      setLikedOpinions(originalLikedSet);
      console.error("Failed to toggle like:", error);
    }
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
              {/* --- CHANGE 5: Updated Submit Button with loading state --- */}
              <motion.button
                onClick={handlePost}
                disabled={isSubmitting}
                whileHover={{
                  scale: isSubmitting ? 1 : 1.02,
                  y: isSubmitting ? 0 : -2,
                }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className="bg-gradient-to-r from-emerald-500/80 to-teal-600/80 hover:from-emerald-500 hover:to-teal-600 text-white px-8 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-emerald-500/20 flex items-center justify-center gap-2 min-w-[180px] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Opinion
                  </>
                )}
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
                        {opinion.likeCount}
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

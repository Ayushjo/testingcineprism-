"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  Calendar,
  Tag,
  Film,
  ChevronLeft,
  ChevronRight,
  Heart,
  MessageCircle,
  Send,
} from "lucide-react";
import { AnimatePresence } from "framer-motion";
import FleebagImage from "../assets/fleebag.png";
import FleebagImage3 from "../assets/fleebag3jpg.jpg";
import FleebagImage4 from "../assets/fleebag4jpg.jpg";
import FleebagImage2 from "../assets/fleebag2.jpg";
import FleebagImage5 from "../assets/fleebag5.jpg";
import BarryImage from "../assets/barry.jpg";
import MarvelousImage from "../assets/marvelous.jpg";
import AfterSunImage from "../assets/aftersun.jpg";
const commentsData = [
  {
    id: 1,
    username: "@critic_chris",
    avatarInitial: "C",
    commentText:
      "This is one of the most honest reviews of Fleabag I've ever read. You captured the blend of humor and heartbreak perfectly.",
    replies: [],
  },
  {
    id: 2,
    username: "@sian_fan",
    avatarInitial: "S",
    commentText:
      "Sian Clifford as Claire is the unsung hero of this show. Her dynamic with Fleabag is the core of the series.",
    replies: [
      {
        id: 3,
        username: "@pwb_is_queen",
        avatarInitial: "P",
        commentText: "100%! Their relationship is so painfully real.",
        replies: [],
      },
    ],
  },
];

const postData = {
  title: "Fleabag",
  year: 2016,
  genre: "Drama, Comedy",
  type: "TV Series",
  rating: 9.0,
  posterUrl:
    FleebagImage,
  reviewText: `Phoebe Waller-Bridge's *Fleabag* is a groundbreaking series that blends dark humor, raw emotion, and fourth-wall-breaking brilliance. With biting wit and vulnerability, the show delves into grief, guilt, and self-worth in a way few series dare to.

Each episode peels back another layer of the protagonist's psyche, leaving you laughing one moment and gutted the next. The supporting cast, particularly Sian Clifford as Claire and Andrew Scott as the 'Hot Priest,' provides the perfect foil to Fleabag's chaotic energy, grounding the show in relationships that feel painfully real.

The writing is the true star—a masterclass in subtext and emotional efficiency. It's comedy, and storytelling, at its most fearless and human.`,
  galleryImages: [
    FleebagImage3,
    FleebagImage4,
    FleebagImage2,
    FleebagImage5,
  ],
};

const relatedPostsData = [
  {
    id: 1,
    title: "Barry",
    posterUrl:
      BarryImage,
  },
  {
    id: 2,
    title: "The Marvelous Mrs. Maisel",
    posterUrl:
      MarvelousImage,
  },
  {
    id: 3,
    title: "Aftersun",
    posterUrl:
      AfterSunImage,
  },
];

// Comment Component
// --- START: New, Corrected, and Self-Contained Comment Component ---
const Comment = ({ comment, getAvatarColor }) => {
  // This component now manages its own state, making it much cleaner.
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleTextareaInput = (e) => {
    e.currentTarget.style.height = "auto";
    e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
  };

  return (
    // The main container uses a fixed left padding to create a "gutter" for the thread line.
    // This will not shrink on deeper nesting.
    <div className="relative pl-12">
      {/* The vertical thread line, connecting the comment to its parent/children. */}
      <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-700" />

      {/* The Avatar, positioned absolutely inside the gutter. */}
      <div className="absolute left-[-2px] top-1">
        <div
          className={`w-8 h-8 rounded-full ${getAvatarColor(
            comment.avatarInitial
          )} flex items-center justify-center text-white text-sm font-semibold flex-shrink-0`}
        >
          {comment.avatarInitial}
        </div>
      </div>

      {/* This wrapper holds all the content to the right of the gutter. */}
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
          className="text-xs text-slate-500 hover:text-emerald-400 font-semibold transition-colors duration-200"
        >
          Reply
        </button>

        {/* Reply Input Form */}
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
            // The recursive call now only needs to pass the reply and the color function.
            <Comment
              key={reply.id}
              comment={reply}
              getAvatarColor={getAvatarColor}
            />
          ))}
        </div>
      )}
    </div>
  );
};
// --- END: New Comment Component ---

export default function PostPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(1247);
  const [comments, setComments] = useState(commentsData);
  const [newComment, setNewComment] = useState("");
  const [replyForms, setReplyForms] = useState({});
  const [replyTexts, setReplyTexts] = useState({});

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % postData.galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) =>
        (prev - 1 + postData.galleryImages.length) %
        postData.galleryImages.length
    );
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const scrollToDiscussion = () => {
    document.getElementById("discussion-section")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const toggleReplyForm = (commentId) => {
    setReplyForms((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
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

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-20">
      {/* Ambient Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(16,185,129,0.03),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(139,92,246,0.03),transparent_50%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section 1: Overlapping Hero & Review Section */}
        <section className="py-16">
          <div className="relative">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              {/* Poster Image */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="lg:w-1/3 flex-shrink-0"
              >
                <div className="aspect-[2/3] relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={
                      postData.posterUrl ||
                      "/placeholder.svg?height=600&width=400"
                    }
                    alt={postData.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              {/* Overlapping Content Block */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:w-2/3 lg:-ml-16 lg:mt-16 relative z-10"
              >
                <div className="bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-8 lg:p-12 shadow-2xl">
                  {/* Title */}
                  <h1 className="text-4xl lg:text-6xl font-black text-white mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent tracking-tight">
                    {postData.title}
                  </h1>

                  {/* Metadata Pills */}
                  <div className="flex flex-wrap gap-3 mb-8">
                    <div className="flex items-center gap-1 bg-black/40 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/10">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white font-semibold text-sm">
                        {postData.rating}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 bg-white/5 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/10">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-300 text-sm">
                        {postData.year}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 bg-white/5 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/10">
                      <Tag className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-300 text-sm">
                        {postData.genre}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 bg-white/5 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/10">
                      <Film className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-300 text-sm">
                        {postData.type}
                      </span>
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="flex items-center gap-6 mb-8 pt-4 border-t border-white/10">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={toggleLike}
                      className="flex items-center gap-2 text-slate-400 hover:text-pink-500 transition-colors duration-200"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          isLiked ? "fill-pink-500 text-pink-500" : ""
                        }`}
                      />
                      <span className="font-medium">
                        {likeCount.toLocaleString()} Likes
                      </span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={scrollToDiscussion}
                      className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors duration-200"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span className="font-medium">Discussion</span>
                    </motion.button>
                  </div>

                  {/* Review Text */}
                  <div className="prose prose-invert prose-lg max-w-none">
                    {postData.reviewText
                      .split("\n\n")
                      .map((paragraph, index) => (
                        <p
                          key={index}
                          className="text-slate-300 leading-relaxed mb-6 text-lg"
                        >
                          {paragraph}
                        </p>
                      ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section 2: Image Gallery Carousel */}
        <section className="py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black text-white mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent tracking-tight">
              Gallery
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative max-w-4xl mx-auto"
          >
            {postData.galleryImages.length === 1 ? (
              // Static image if only one image
              <div className="aspect-video relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={
                    postData.galleryImages[0] ||
                    "/placeholder.svg?height=400&width=600"
                  }
                  alt="Gallery image"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              // Carousel if multiple images
              <div className="relative">
                {/* Main Image */}
                <div className="aspect-video relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={
                      postData.galleryImages[currentImageIndex] ||
                      "/placeholder.svg?height=400&width=600"
                    }
                    alt={`Gallery image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover transition-opacity duration-300"
                  />
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/60 backdrop-blur-xl hover:bg-black/80 text-white p-3 rounded-full border border-white/10 transition-all duration-300 hover:scale-110"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/60 backdrop-blur-xl hover:bg-black/80 text-white p-3 rounded-full border border-white/10 transition-all duration-300 hover:scale-110"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Dot Indicators */}
                <div className="flex justify-center gap-2 mt-6">
                  {postData.galleryImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentImageIndex
                          ? "bg-emerald-400 scale-125"
                          : "bg-white/30 hover:bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </section>

        {/* Section 3: Discussion */}
        <section id="discussion-section" className="py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black text-white mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent tracking-tight">
              Discussion
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            {/* New Comment Form */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 mb-8">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts about this review..."
                className="w-full h-24 bg-slate-800/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400/50 focus:bg-slate-800/70 transition-all duration-300 resize-none mb-4"
              />
              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-emerald-500/80 to-teal-600/80 hover:from-emerald-500 hover:to-teal-600 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-emerald-500/20 flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Post Comment
                </motion.button>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-6">
              {comments.map((comment) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  depth={0}
                  onToggleReply={toggleReplyForm}
                  replyForms={replyForms}
                  replyTexts={replyTexts}
                  setReplyTexts={setReplyTexts}
                  getAvatarColor={getAvatarColor}
                />
              ))}
            </div>
          </motion.div>
        </section>

        {/* Section 4: You Might Also Like */}
        <section className="py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black text-white mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent tracking-tight">
              You Might Also Like
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {relatedPostsData.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative h-96 rounded-2xl overflow-hidden shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 cursor-pointer"
                style={{
                  backgroundImage: `url(${
                    post.posterUrl || "/placeholder.svg?height=400&width=300"
                  })`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Background Image with Hover Effect */}
                <div
                  className="absolute inset-0 transition-transform duration-300 group-hover:scale-105"
                  style={{
                    backgroundImage: `url(${
                      post.posterUrl || "/placeholder.svg?height=400&width=300"
                    })`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />

                {/* Content - Bottom */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                  <h3 className="text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-emerald-300 transition-colors duration-300">
                    {post.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>
    </div>
  );
}

"use client";
import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { ShareButton } from "@/components/ShareComponent.jsx";
import {
  Eye,
  Share2,
  ArrowLeft,
  Tag,
  Heart,
  MessageCircle,
  Send,
  Loader2,
  MoreHorizontal,
  Reply,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useArticleComments,
  useArticleLike,
  useArticleReplies,
  articleCommentApi,
  formatDate,
  getAvatarColor,
} from "../utils/articleApi.js";
import { useTheme } from "../context/ThemeContext";

const Comment = ({
  comment,
  onReplyAdded,
  onCommentUpdated,
  onCommentDeleted,
  depth = 0,
  maxDepth = 8,
}) => {
  const { theme } = useTheme();
  const [user, setUser] = useState(null); // Simple user state - you can replace with your auth context
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.content);

  // Get user from localStorage (replace with your auth logic)
  useEffect(() => {
    const token = localStorage.getItem("cineprism_auth_token");
    if (token) {
      // You can decode token or fetch user data here
      setUser({ id: "current-user", username: "User" }); // Placeholder
    }
  }, []);

  const {
    replies,
    pagination: replyPagination,
    loading: repliesLoading,
    addReply,
    loadMore: loadMoreReplies,
    updateReply,
    removeReply,
  } = useArticleReplies(showReplies ? comment.id : null);

  const handleSubmitReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim() || isSubmittingReply) return;

    if (!user) {
      alert("Please login to reply to comments");
      return;
    }

    try {
      setIsSubmittingReply(true);
      const newReply = await articleCommentApi.createReply(
        comment.id,
        replyText.trim()
      );
      addReply(newReply);
      onReplyAdded(comment.id, newReply);
      setReplyText("");
      setShowReplyInput(false);
      if (!showReplies) setShowReplies(true);
    } catch (error) {
      console.error("Error creating reply:", error);
      alert(error.message || "Failed to create reply");
    } finally {
      setIsSubmittingReply(false);
    }
  };

  const handleEditComment = async () => {
    if (!editText.trim() || editText === comment.content) {
      setIsEditing(false);
      setEditText(comment.content);
      return;
    }

    try {
      const updatedComment = await articleCommentApi.updateComment(
        comment.id,
        editText.trim()
      );
      onCommentUpdated(updatedComment);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating comment:", error);
      alert(error.message || "Failed to update comment");
      setEditText(comment.content);
      setIsEditing(false);
    }
  };

  const handleDeleteComment = async () => {
    if (!confirm("Are you sure you want to delete this comment?")) return;

    try {
      await articleCommentApi.deleteComment(comment.id);
      onCommentDeleted(comment.id);
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert(error.message || "Failed to delete comment");
    }
  };

  const handleTextareaInput = (e) => {
    e.currentTarget.style.height = "auto";
    e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
  };

  const handleNestedReplyAdded = (parentCommentId, reply) => {
    if (parentCommentId === comment.id) {
      return;
    }
    onReplyAdded(parentCommentId, reply);
  };

  const handleNestedCommentUpdated = (updatedComment) => {
    if (updatedComment.id === comment.id) {
      onCommentUpdated(updatedComment);
    } else {
      updateReply(updatedComment.id, updatedComment);
    }
  };

  const handleNestedCommentDeleted = (commentId) => {
    if (commentId === comment.id) {
      onCommentDeleted(commentId);
    } else {
      removeReply(commentId);
    }
  };

  const isOwner =
    user &&
    comment.user &&
    (user.id === comment.user.id || user._id === comment.user._id);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const mobileMaxDepth = 3;
  const desktopMaxDepth = 6;
  const actualMaxDepth = isMobile ? mobileMaxDepth : desktopMaxDepth;
  const visualDepth = Math.min(depth, actualMaxDepth);

  const indentSize = isMobile ? 8 : 20;
  const leftMargin = visualDepth * indentSize;

  const isDeepNest = depth >= actualMaxDepth;

  return (
    <div className="relative">
      {depth > 0 && (
        <div
          className={`absolute top-0 bottom-0 ${
            theme === "light" ? "bg-gray-300/50" : "bg-slate-700/30"
          } ${
            isMobile ? "w-0.5 left-[-6px]" : "w-px left-[-10px]"
          }`}
        />
      )}

      <div
        className="flex gap-2 sm:gap-3 mb-3 sm:mb-4"
        style={{ marginLeft: `${leftMargin}px` }}
      >
        <div className="flex-shrink-0">
          <div
            className={`rounded-full ${getAvatarColor(
              comment.user.username[0]
            )} flex items-center justify-center text-white font-semibold ${
              isDeepNest || isMobile
                ? "w-6 h-6 text-xs sm:w-7 sm:h-7 sm:text-sm"
                : "w-8 h-8 text-sm"
            }`}
          >
            {comment.user.username[0].toUpperCase()}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1">
            <span className={`text-xs sm:text-sm font-medium truncate max-w-[120px] sm:max-w-none ${
              theme === "light" ? "text-black" : "text-emerald-400"
            }`}>
              @{comment.user.username}
            </span>
            <span className={`text-xs flex-shrink-0 ${
              theme === "light" ? "text-gray-600" : "text-slate-500"
            }`}>
              {formatDate(comment.createdAt)}
            </span>
            {comment.updatedAt !== comment.createdAt && (
              <span className={`text-xs ${
                theme === "light" ? "text-gray-600" : "text-slate-500"
              }`}>(edited)</span>
            )}
            {depth > 2 && !isMobile && (
              <span className={`text-xs hidden sm:inline ${
                theme === "light" ? "text-gray-500" : "text-slate-600"
              }`}>
                • L{depth}
              </span>
            )}
          </div>

          {isEditing ? (
            <div className="mb-2">
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onInput={handleTextareaInput}
                className={`w-full border rounded-lg px-3 py-2 text-sm transition-all duration-300 resize-none focus:outline-none ${
                  theme === "light"
                    ? "bg-gray-100 border-gray-300 text-black placeholder-gray-500 focus:border-black"
                    : "bg-slate-800/50 border-slate-600 text-white placeholder-slate-400 focus:border-emerald-400/50"
                }`}
                rows={2}
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={handleEditComment}
                  className={`text-xs px-3 py-1 rounded border transition-all duration-200 ${
                    theme === "light"
                      ? "bg-black/10 hover:bg-black/20 text-black border-black/30"
                      : "bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border-emerald-500/30"
                  }`}
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditText(comment.content);
                  }}
                  className={`text-xs px-3 py-1 transition-colors ${
                    theme === "light"
                      ? "text-gray-600 hover:text-black"
                      : "text-slate-500 hover:text-slate-400"
                  }`}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className={`leading-relaxed mb-2 text-sm sm:text-base break-words ${
              theme === "light" ? "text-black/90" : "text-slate-300"
            }`}>
              {comment.content}
            </div>
          )}

          <div className="flex items-center gap-3 sm:gap-4 text-xs">
            <button
              onClick={() => setShowReplyInput(!showReplyInput)}
              className={`font-medium transition-colors duration-200 flex items-center gap-1 ${
                theme === "light"
                  ? "text-gray-600 hover:text-black"
                  : "text-slate-500 hover:text-emerald-400"
              }`}
            >
              <Reply className="w-3 h-3" />
              <span className="hidden sm:inline">Reply</span>
            </button>

            {comment.replyCount > 0 && (
              <button
                onClick={() => setShowReplies(!showReplies)}
                className={`font-medium transition-colors duration-200 ${
                  theme === "light"
                    ? "text-gray-600 hover:text-black"
                    : "text-slate-500 hover:text-emerald-400"
                }`}
              >
                {showReplies ? "Hide" : "Show"} {comment.replyCount}
                <span className="hidden sm:inline">
                  {" "}
                  {comment.replyCount === 1 ? "reply" : "replies"}
                </span>
              </button>
            )}

            {isOwner && (
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => setIsEditing(true)}
                  className={`transition-colors ${
                    theme === "light"
                      ? "text-gray-600 hover:text-black"
                      : "text-slate-500 hover:text-slate-400"
                  }`}
                >
                  <span className="hidden sm:inline">Edit</span>
                  <span className="sm:hidden">✏️</span>
                </button>
                <button
                  onClick={handleDeleteComment}
                  className={`transition-colors ${
                    theme === "light"
                      ? "text-gray-600 hover:text-red-600"
                      : "text-slate-500 hover:text-red-400"
                  }`}
                >
                  <span className="hidden sm:inline">Delete</span>
                  <span className="sm:hidden">🗑️</span>
                </button>
              </div>
            )}
          </div>

          {showReplyInput && (
            <div className="mt-3">
              <form onSubmit={handleSubmitReply}>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onInput={handleTextareaInput}
                    rows={1}
                    className={`flex-1 border rounded-lg px-3 py-2 text-sm transition-all duration-300 resize-none overflow-hidden focus:outline-none ${
                      theme === "light"
                        ? "bg-gray-100 border-gray-300 text-black placeholder-gray-500 focus:border-black"
                        : "bg-slate-800/50 border-slate-600 text-white placeholder-slate-400 focus:border-emerald-400/50"
                    }`}
                    disabled={isSubmittingReply}
                  />
                  <button
                    type="submit"
                    disabled={!replyText.trim() || isSubmittingReply || !user}
                    className={`px-3 py-2 rounded-lg border transition-all duration-300 text-sm self-start sm:self-auto disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1 w-full sm:w-auto ${
                      theme === "light"
                        ? "bg-black/10 hover:bg-black/20 text-black border-black/30"
                        : "bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border-emerald-500/30"
                    }`}
                  >
                    {isSubmittingReply ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <Send className="w-3 h-3" />
                    )}
                    <span className="sm:inline">Reply</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {showReplies && (
            <div className="mt-3 sm:mt-4">
              {repliesLoading && replies.length === 0 ? (
                <div className={`flex items-center gap-2 text-sm ${
                  theme === "light" ? "text-gray-600" : "text-slate-500"
                }`}>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Loading replies...
                </div>
              ) : (
                <>
                  {replies.map((reply) => (
                    <Comment
                      key={reply.id}
                      comment={reply}
                      onReplyAdded={handleNestedReplyAdded}
                      onCommentUpdated={handleNestedCommentUpdated}
                      onCommentDeleted={handleNestedCommentDeleted}
                      depth={depth + 1}
                      maxDepth={actualMaxDepth}
                    />
                  ))}

                  {replyPagination?.hasMore && (
                    <div className="mt-3">
                      <button
                        onClick={loadMoreReplies}
                        disabled={repliesLoading}
                        className={`text-xs font-semibold transition-colors flex items-center gap-1 py-2 ${
                          theme === "light"
                            ? "text-black hover:text-gray-700"
                            : "text-emerald-400 hover:text-emerald-300"
                        }`}
                      >
                        {repliesLoading ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <MoreHorizontal className="w-3 h-3" />
                        )}
                        Load more replies
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ArticlePage = () => {
  const { theme } = useTheme();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [readingTime, setReadingTime] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [user, setUser] = useState(null);

  const { slug } = useParams();
  const navigate = useNavigate();

  const {
    comments,
    pagination: commentPagination,
    loading: commentsLoading,
    addComment,
    updateComment,
    removeComment,
    loadMore: loadMoreComments,
  } = useArticleComments(article?.id);

  const { isLiked, likeCount, toggleLike } = useArticleLike(article?.id);

  useEffect(() => {
    const token = localStorage.getItem("cineprism_auth_token");
    if (token) {
      setUser({ id: "current-user", username: "User" }); // Placeholder
    }
  }, []);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(
          `https://api.thecineprism.com/api/v1/articles/get-article/${slug}`
        );
        const data = await response.json();

        if (response.ok) {
          setArticle(data.article);
          const wordCount =
            data.article.blocks?.reduce((count, block) => {
              if (block.type === "PARAGRAPH" && block.content.text) {
                return count + block.content.text.split(" ").length;
              }
              return count;
            }, 0) || 0;
          setReadingTime(Math.ceil(wordCount / 200));
        } else {
          setError(data.message || "Article not found");
        }
      } catch (err) {
        setError("Failed to load article");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmittingComment || !article?.id) return;

    if (!user) {
      alert("Please login to comment");
      return;
    }

    try {
      setIsSubmittingComment(true);
      const comment = await articleCommentApi.createComment(
        article.id,
        newComment.trim()
      );
      addComment(comment);
      setNewComment("");
    } catch (error) {
      console.error("Error creating comment:", error);
      alert(error.message || "Failed to create comment");
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleReplyAdded = (commentId, reply) => {
    const parentComment = comments.find((c) => c.id === commentId);
    if (parentComment) {
      updateComment(commentId, {
        ...parentComment,
        replyCount: (parentComment.replyCount || 0) + 1,
      });
    }
  };

  const handleLikeClick = () => {
    if (!user) {
      alert("Please login to like articles");
      return;
    }
    toggleLike();
  };

  const scrollToDiscussion = () => {
    document.getElementById("discussion-section")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-all duration-300 ${
        theme === "light" ? "bg-white text-black" : "bg-slate-950 text-white"
      }`}>
        <div className="text-center">
          <div className={`w-16 h-16 border-4 rounded-full animate-spin mx-auto mb-6 ${
            theme === "light"
              ? "border-gray-300 border-t-black"
              : "border-emerald-500/30 border-t-emerald-500"
          }`}></div>
          <p className={`text-lg ${theme === "light" ? "text-gray-600" : "text-slate-400"}`}>Loading article...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-all duration-300 ${
        theme === "light" ? "bg-white text-black" : "bg-slate-950 text-white"
      }`}>
        <div className="text-center max-w-md mx-auto px-6">
          <h1 className={`text-4xl lg:text-5xl font-bold mb-6 ${
            theme === "light" ? "text-black" : "text-white"
          }`}>
            Article Not Found
          </h1>
          <p className={`mb-8 text-lg ${theme === "light" ? "text-gray-600" : "text-slate-400"}`}>{error}</p>
          <button
            onClick={() => navigate(-1)}
            className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg ${
              theme === "light"
                ? "bg-black hover:bg-gray-800 text-white hover:shadow-black/20"
                : "bg-gradient-to-r from-emerald-500/80 to-teal-600/80 hover:from-emerald-500 hover:to-teal-600 text-white hover:shadow-emerald-500/20"
            }`}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!article) return null;

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      theme === "light" ? "bg-white text-black" : "bg-slate-950 text-white"
    }`}>
      <Helmet>
        <title>{article.title} | TheCinePrism</title>
        <meta
          name="description"
          content={
            article.excerpt ||
            article.shortDescription ||
            article.content?.slice(0, 150) ||
            `Read ${article.title} on TheCinePrism`
          }
        />

        {/* Open Graph */}
        <meta property="og:title" content={article.title} />
        <meta
          property="og:description"
          content={
            article.excerpt ||
            article.shortDescription ||
            article.content?.slice(0, 150) ||
            `Read ${article.title} on TheCinePrism`
          }
        />
        <meta
          property="og:image"
          content={
            article.mainImageUrl || article.imageUrl || "/thecineprismlogo.jpg"
          }
        />
        <meta
          property="og:url"
          content={`${window.location.origin}/articles/${slug}`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="TheCinePrism" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@TheCinePrism" />
        <meta name="twitter:title" content={article.title} />
        <meta
          name="twitter:description"
          content={
            article.excerpt ||
            article.shortDescription ||
            article.content?.slice(0, 150) ||
            `Read ${article.title} on TheCinePrism`
          }
        />
        <meta
          name="twitter:image"
          content={
            article.mainImageUrl || article.imageUrl || "/thecineprismlogo.jpg"
          }
        />

        {/* Article specific */}
        <meta property="article:author" content={article.author} />
        <meta
          property="article:published_time"
          content={article.publishedAt || article.createdAt}
        />
        {article.tags &&
          article.tags.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
      </Helmet>
      {article.mainImageUrl ? (
        <section className="relative">
          {/* Compact Header Section */}
          <div className={`py-4 px-4 sm:px-6 lg:px-8 ${
            theme === "light" ? "bg-white" : "bg-slate-950"
          }`}>
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-center"
              >
                <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 leading-tight ${
                  theme === "light" ? "text-black" : "text-white"
                }`}>
                  {article.title}
                </h1>
                {article.shortDescription && (
                  <p className={`text-sm sm:text-base md:text-lg leading-relaxed mb-3 max-w-3xl mx-auto ${
                    theme === "light" ? "text-gray-700" : "text-slate-300"
                  }`}>
                    {article.shortDescription}
                  </p>
                )}

                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  <button
                    onClick={handleLikeClick}
                    className={`flex items-center gap-1.5 transition-all duration-300 px-3 py-1.5 rounded-lg border text-sm ${
                      theme === "light"
                        ? "bg-gray-100 border-gray-300 text-gray-700 hover:border-pink-400 hover:text-pink-500"
                        : "bg-white/10 backdrop-blur-sm border-white/20 text-white/80 hover:text-pink-400 hover:border-pink-400/50"
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isLiked ? "fill-pink-500 text-pink-500" : ""
                      }`}
                    />
                    <span className="font-medium">
                      {likeCount.toLocaleString()}
                    </span>
                  </button>
                  <button
                    onClick={scrollToDiscussion}
                    className={`flex items-center gap-1.5 transition-all duration-300 px-3 py-1.5 rounded-lg border text-sm ${
                      theme === "light"
                        ? "bg-gray-100 border-gray-300 text-gray-700 hover:border-emerald-500 hover:text-emerald-600"
                        : "bg-white/10 backdrop-blur-sm border-white/20 text-white/80 hover:text-emerald-400 hover:border-emerald-400/50"
                    }`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span className="font-medium">{comments.length || 0}</span>
                  </button>
                  <ShareButton
                    url={window.location.href}
                    title={article.title}
                    description={
                      article.shortDescription ||
                      `Check out this article: ${article.title}`
                    }
                    articleSlug={slug}
                    type="article"
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Image Section - Rectangular with proper aspect ratio */}
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative w-full overflow-hidden rounded-xl shadow-2xl"
              style={{ aspectRatio: '16/9' }}
            >
              <img
                src={article.mainImageUrl}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </section>
      ) : (
        <section className="relative pt-16 pb-12">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200 mb-12"
            >
              <ArrowLeft size={18} />
              <span>Back</span>
            </motion.button>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="mb-4">
                <span className="inline-block bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                  Film Analysis
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {article.title}
              </h1>
              {article.shortDescription && (
                <p className="text-xl md:text-2xl text-slate-300 leading-relaxed mb-8 max-w-3xl mx-auto">
                  {article.shortDescription}
                </p>
              )}
              <div className="flex items-center justify-center gap-3 text-slate-400 mb-8">
                <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {article.author[0].toUpperCase()}
                </div>
                <div className="text-sm">
                  <span className="text-white font-medium">
                    {article.author}
                  </span>
                  <span className="mx-2">•</span>
                  <span>
                    {formatDate(article.publishedAt || article.createdAt)}
                  </span>
                  <span className="mx-2">•</span>
                  <span>{readingTime} min read</span>
                  <span className="mx-2">•</span>
                  <span className="flex items-center gap-1">
                    <Eye size={14} />
                    {(article.viewCount || 0).toLocaleString()} views
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={handleLikeClick}
                  className="flex items-center gap-2 text-slate-400 hover:text-pink-500 transition-all duration-300 group bg-white/5 px-4 py-2.5 rounded-xl border border-slate-600 hover:border-pink-500/50"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isLiked ? "fill-pink-500 text-pink-500" : ""
                    }`}
                  />
                  <span className="font-medium">
                    {likeCount.toLocaleString()}
                  </span>
                </button>
                <button
                  onClick={scrollToDiscussion}
                  className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-all duration-300 group bg-white/5 px-4 py-2.5 rounded-xl border border-slate-600 hover:border-emerald-400/50"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-medium">{comments.length || 0}</span>
                </button>
                <ShareButton
                  url={window.location.href}
                  title={article.title}
                  description={
                    article.excerpt ||
                    article.shortDescription ||
                    `Check out this article: ${article.title}`
                  }
                  articleId={article.id}
                  articleSlug={slug} // This is from your useParams()
                  type="article"
                />
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="relative"
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-8 pb-16">
          <div className="prose prose-lg max-w-none">
            {article.blocks && article.blocks.length > 0 ? (
              article.blocks.map((block, index) => (
                <motion.div
                  key={block.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                >
                  {renderContentBlock(block, theme)}
                </motion.div>
              ))
            ) : (
              <div className="text-center py-16">
                <Tag className={`w-12 h-12 mx-auto mb-4 ${
                  theme === "light" ? "text-gray-400" : "text-slate-500"
                }`} />
                <p className={theme === "light" ? "text-gray-600" : "text-slate-400"}>
                  No content available for this article.
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.article>

      <section id="discussion-section" className="py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-4xl font-black mb-6 bg-clip-text text-transparent tracking-tight transition-all duration-300 ${
              theme === "light"
                ? "bg-gradient-to-r from-black via-gray-800 to-gray-600"
                : "bg-gradient-to-r from-white via-slate-200 to-slate-400"
            }`}>
              Discussion
            </h2>
            <p className={`text-sm ${
              theme === "light" ? "text-gray-600" : "text-slate-400"
            }`}>
              Join the conversation with unlimited nested replies
            </p>
          </div>
          <div className={`backdrop-blur-xl border rounded-2xl p-6 mb-8 transition-all duration-300 ${
            theme === "light"
              ? "bg-gray-50 border-gray-300"
              : "bg-slate-900/50 border-slate-700"
          }`}>
            <form onSubmit={handleSubmitComment}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={
                  user
                    ? "Share your thoughts about this article..."
                    : "Please login to comment..."
                }
                className={`w-full h-24 border rounded-xl px-4 py-3 focus:outline-none transition-all duration-300 resize-none mb-4 ${
                  theme === "light"
                    ? "bg-gray-100 border-gray-300 text-black placeholder-gray-500 focus:border-black focus:bg-gray-100"
                    : "bg-slate-800/50 border-slate-600 text-white placeholder-slate-400 focus:border-emerald-400/50 focus:bg-slate-800/70"
                }`}
                disabled={isSubmittingComment || !user}
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!newComment.trim() || isSubmittingComment || !user}
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                    theme === "light"
                      ? "bg-gradient-to-r from-black to-gray-800 hover:from-gray-900 hover:to-gray-700 text-white hover:shadow-black/20"
                      : "bg-gradient-to-r from-emerald-500/80 to-teal-600/80 hover:from-emerald-500 hover:to-teal-600 text-white hover:shadow-emerald-500/20"
                  }`}
                >
                  {isSubmittingComment ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  {isSubmittingComment ? "Posting..." : "Post Comment"}
                </button>
              </div>
            </form>
          </div>
          <div className="space-y-8">
            {commentsLoading && comments.length === 0 ? (
              <div className="flex items-center justify-center gap-3 py-8">
                <Loader2 className={`w-6 h-6 animate-spin ${
                  theme === "light" ? "text-black" : "text-emerald-400"
                }`} />
                <span className={theme === "light" ? "text-gray-600" : "text-slate-400"}>
                  Loading comments...
                </span>
              </div>
            ) : (
              <>
                {comments.map((comment) => (
                  <Comment
                    key={comment.id}
                    comment={comment}
                    onReplyAdded={handleReplyAdded}
                    onCommentUpdated={updateComment}
                    onCommentDeleted={removeComment}
                    depth={0}
                    maxDepth={8}
                  />
                ))}
                {commentPagination?.hasMore && (
                  <div className="flex justify-center pt-6">
                    <button
                      onClick={loadMoreComments}
                      disabled={commentsLoading}
                      className={`px-6 py-3 rounded-xl border transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                        theme === "light"
                          ? "bg-gray-100 hover:bg-gray-200 text-black border-gray-300 hover:border-gray-400"
                          : "bg-slate-800/50 hover:bg-slate-800/70 text-slate-300 hover:text-white border-slate-600 hover:border-slate-500"
                      }`}
                    >
                      {commentsLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <MoreHorizontal className="w-4 h-4" />
                      )}
                      Load More Comments
                    </button>
                  </div>
                )}
                {comments.length === 0 && !commentsLoading && (
                  <div className="text-center py-12">
                    <MessageCircle className={`w-12 h-12 mx-auto mb-4 ${
                      theme === "light" ? "text-gray-400" : "text-slate-600"
                    }`} />
                    <h3 className={`text-lg font-semibold mb-2 ${
                      theme === "light" ? "text-gray-600" : "text-slate-400"
                    }`}>
                      No comments yet
                    </h3>
                    <p className={theme === "light" ? "text-gray-500" : "text-slate-500"}>
                      Be the first to share your thoughts!
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

const renderContentBlock = (block, theme) => {
  const { type, content } = block;

  switch (type) {
    case "PARAGRAPH":
      return (
        <div className="mb-8">
          {content.hasTitle && content.title && (
            <h3 className={`text-2xl font-semibold mb-4 leading-tight ${
              theme === "light" ? "text-black" : "text-white"
            }`}>
              {content.title}
            </h3>
          )}
          <p className={`leading-[1.8] text-lg font-normal tracking-normal whitespace-pre-wrap ${
            theme === "light" ? "text-gray-700" : "text-slate-200"
          }`}>
            {content.text}
          </p>
        </div>
      );

    case "HEADING":
      const HeadingTag = `h${content.level}`;
      const headingClasses = {
        2: `text-3xl font-bold mb-6 mt-12 leading-tight ${
          theme === "light" ? "text-black" : "text-white"
        }`,
        3: `text-2xl font-semibold mb-4 mt-10 leading-tight ${
          theme === "light" ? "text-black" : "text-white"
        }`,
        4: `text-xl font-medium mb-3 mt-8 leading-tight ${
          theme === "light" ? "text-black" : "text-white"
        }`,
      };

      return React.createElement(
        HeadingTag,
        { className: headingClasses[content.level] },
        content.text
      );

    case "IMAGE":
      return (
        <figure className="mb-10 my-12">
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={content.url || "/placeholder.svg"}
              alt={content.alt}
              className="w-full h-auto object-cover"
            />
          </div>
          {content.caption && (
            <figcaption className="text-center text-slate-400 mt-4 italic text-sm">
              {content.caption}
            </figcaption>
          )}
        </figure>
      );

    case "LIST":
      const ListTag = content.type === "numbered" ? "ol" : "ul";
      const listClasses =
        content.type === "numbered"
          ? `list-decimal list-inside space-y-3 mb-8 text-lg ${
              theme === "light" ? "text-gray-700" : "text-slate-200"
            }`
          : `list-disc list-inside space-y-3 mb-8 text-lg ${
              theme === "light" ? "text-gray-700" : "text-slate-200"
            }`;

      return React.createElement(
        ListTag,
        { className: listClasses },
        content.items.map((item, index) =>
          React.createElement(
            "li",
            { key: index, className: "leading-relaxed pl-2" },
            item
          )
        )
      );

    case "QUOTE":
      return (
        <blockquote className={`border-l-4 pl-6 py-4 my-8 rounded-r-lg ${
          theme === "light"
            ? "border-black/70 bg-gray-100"
            : "border-emerald-500 bg-slate-900/20"
        }`}>
          <p className={`text-xl italic leading-relaxed mb-3 ${
            theme === "light" ? "text-gray-700" : "text-slate-200"
          }`}>
            {content.text}
          </p>
          {content.author && (
            <cite className={`font-medium text-sm ${
              theme === "light" ? "text-black" : "text-emerald-400"
            }`}>
              — {content.author}
            </cite>
          )}
        </blockquote>
      );

    case "DIVIDER":
      return (
        <div className="flex items-center justify-center my-12">
          <div className={`w-32 h-px ${
            theme === "light" ? "bg-gray-300" : "bg-slate-700"
          }`}></div>
        </div>
      );

    default:
      return null;
  }
};

export default ArticlePage;

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

      {/* Fixed Mobile Toolbar with Enhanced Design */}
      <div className={`md:hidden fixed bottom-0 left-0 right-0 z-50 border-t backdrop-blur-xl transition-all duration-300 shadow-2xl ${
        theme === "light"
          ? "bg-white/98 border-gray-200 shadow-gray-200/50"
          : "bg-slate-950/98 border-slate-800 shadow-black/50"
      }`}>
        <div className="flex items-center justify-around px-2 py-3">
          <button
            onClick={() => navigate(-1)}
            className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg transition-all active:scale-95 ${
              theme === "light"
                ? "text-gray-600 active:bg-gray-100"
                : "text-slate-400 active:bg-slate-800"
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-xs font-medium">Back</span>
          </button>
          <button
            onClick={handleLikeClick}
            className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg transition-all active:scale-95 ${
              isLiked
                ? "text-pink-500"
                : theme === "light"
                ? "text-gray-600 active:bg-gray-100"
                : "text-slate-400 active:bg-slate-800"
            }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? "fill-pink-500" : ""}`} />
            <span className="text-xs font-medium">{likeCount > 999 ? `${(likeCount / 1000).toFixed(1)}k` : likeCount}</span>
          </button>
          <button
            onClick={scrollToDiscussion}
            className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg transition-all active:scale-95 ${
              theme === "light"
                ? "text-gray-600 active:bg-gray-100"
                : "text-slate-400 active:bg-slate-800"
            }`}
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-xs font-medium">{comments.length > 99 ? '99+' : comments.length}</span>
          </button>
          <div className={`flex flex-col items-center gap-1 px-3 py-1.5 ${
            theme === "light" ? "text-gray-600" : "text-slate-400"
          }`}>
            <ShareButton
              url={window.location.href}
              title={article.title}
              description={
                article.shortDescription ||
                `Check out this article: ${article.title}`
              }
              articleSlug={slug}
              type="article"
              variant="mobile"
            />
          </div>
        </div>
      </div>

      {/* Classic Newspaper Header Block */}
      <header className="relative pt-20 pb-12 md:pt-24 md:pb-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {/* Optional Category Tag */}
            {article.category && (
              <div className="mb-6">
                <span className={`inline-block text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wide shadow-sm ${
                  theme === "light"
                    ? "bg-black text-white"
                    : "bg-emerald-600 text-white"
                }`}>
                  {article.category || "Film Analysis"}
                </span>
              </div>
            )}

            {/* Large Serif Title with Refined Typography */}
            <h1 className={`font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] md:leading-[1.1] mb-6 tracking-tight ${
              theme === "light" ? "text-black" : "text-white"
            }`}>
              {article.title}
            </h1>

            {/* Subtitle with Enhanced Readability */}
            {article.shortDescription && (
              <p className={`text-lg md:text-xl leading-[1.7] mb-8 font-light max-w-2xl ${
                theme === "light" ? "text-gray-700" : "text-slate-300"
              }`}>
                {article.shortDescription}
              </p>
            )}

            {/* Elegant Horizontal Rule */}
            <hr className={`border-t mb-6 ${
              theme === "light" ? "border-gray-300" : "border-slate-700"
            }`} />

            {/* Metadata Block with Better Visual Hierarchy */}
            <div className="flex flex-wrap items-start gap-4 mb-2">
              {/* Author Avatar & Name */}
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-full flex items-center justify-center text-white font-semibold text-base shadow-md transition-transform hover:scale-105 ${
                  theme === "light" ? "bg-black" : "bg-emerald-600"
                }`}>
                  {article.author[0].toUpperCase()}
                </div>
                <div>
                  <p className={`text-sm font-semibold tracking-tight ${
                    theme === "light" ? "text-black" : "text-white"
                  }`}>
                    {article.author}
                  </p>
                  <p className={`text-xs ${
                    theme === "light" ? "text-gray-500" : "text-slate-500"
                  }`}>
                    Author
                  </p>
                </div>
              </div>

              {/* Metadata with Better Spacing */}
              <div className={`flex flex-wrap items-start gap-3 text-sm pt-1 ${
                theme === "light" ? "text-gray-600" : "text-slate-400"
              }`}>
                <time className="font-medium">{formatDate(article.publishedAt || article.createdAt)}</time>
              </div>
            </div>

            {/* Desktop Action Buttons with Enhanced Styling */}
            <div className="hidden md:flex items-center gap-3 mt-8">
              <button
                onClick={handleLikeClick}
                className={`group flex items-center gap-2 px-5 py-2.5 rounded-lg border transition-all duration-300 hover:shadow-md ${
                  isLiked
                    ? theme === "light"
                      ? "border-pink-500 text-pink-500 bg-pink-50 shadow-pink-100"
                      : "border-pink-500 text-pink-500 bg-pink-500/10 shadow-pink-500/20"
                    : theme === "light"
                    ? "border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50"
                    : "border-slate-700 text-slate-400 hover:border-slate-600 hover:bg-slate-800/50"
                }`}
              >
                <Heart className={`w-4 h-4 transition-transform group-hover:scale-110 ${isLiked ? "fill-pink-500" : ""}`} />
                <span className="text-sm font-semibold">{likeCount.toLocaleString()}</span>
              </button>
              <button
                onClick={scrollToDiscussion}
                className={`group flex items-center gap-2 px-5 py-2.5 rounded-lg border transition-all duration-300 hover:shadow-md ${
                  theme === "light"
                    ? "border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50"
                    : "border-slate-700 text-slate-400 hover:border-slate-600 hover:bg-slate-800/50"
                }`}
              >
                <MessageCircle className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span className="text-sm font-semibold">{comments.length || 0} {comments.length === 1 ? 'Comment' : 'Comments'}</span>
              </button>
              <button className={`group flex items-center gap-2 px-5 py-2.5 rounded-lg border transition-all duration-300 hover:shadow-md ${
                theme === "light"
                  ? "border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50"
                  : "border-slate-700 text-slate-400 hover:border-slate-600 hover:bg-slate-800/50"
              }`}>
                <ShareButton
                  url={window.location.href}
                  title={article.title}
                  description={
                    article.shortDescription ||
                    `Check out this article: ${article.title}`
                  }
                  articleSlug={slug}
                  type="article"
                  variant="compact"
                />
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Hero Image - Conditional, below header */}
      {article.mainImageUrl && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto px-6 lg:px-8 mb-12"
        >
          <figure className="relative overflow-hidden rounded-xl shadow-2xl group">
            <img
              src={article.mainImageUrl}
              alt={article.title}
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Subtle Overlay on Hover */}
            <div className={`absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${
              theme === "light"
                ? "bg-gradient-to-t from-black/10 to-transparent"
                : "bg-gradient-to-t from-emerald-900/20 to-transparent"
            }`}></div>
          </figure>
        </motion.div>
      )}

      {/* Article Body - Single Column */}
      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="relative pb-20 md:pb-16"
      >
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
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

      <section id="discussion-section" className="py-16 border-t transition-all duration-300" style={{
        borderColor: theme === "light" ? "rgb(229, 231, 235)" : "rgb(51, 65, 85)"
      }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 tracking-tight transition-all duration-300 ${
              theme === "light" ? "text-black" : "text-white"
            }`}>
              Join the Discussion
            </h2>
            <p className={`text-sm md:text-base ${
              theme === "light" ? "text-gray-600" : "text-slate-400"
            }`}>
              Share your thoughts and engage with {comments.length > 0 ? `${comments.length} other ${comments.length === 1 ? 'reader' : 'readers'}` : 'the community'}
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
            <h3 className={`text-2xl md:text-3xl font-bold mb-5 leading-tight tracking-tight ${
              theme === "light" ? "text-black" : "text-white"
            }`}>
              {content.title}
            </h3>
          )}
          <p className={`leading-[1.9] text-[17px] md:text-lg font-normal tracking-wide whitespace-pre-wrap hyphens-auto ${
            theme === "light" ? "text-gray-800" : "text-slate-300"
          }`} style={{ textAlign: 'justify' }}>
            {content.text}
          </p>
        </div>
      );

    case "HEADING":
      const HeadingTag = `h${content.level}`;
      const headingClasses = {
        2: `text-3xl md:text-4xl font-bold mb-6 mt-14 leading-[1.2] tracking-tight ${
          theme === "light" ? "text-black" : "text-white"
        }`,
        3: `text-2xl md:text-3xl font-semibold mb-5 mt-12 leading-tight tracking-tight ${
          theme === "light" ? "text-black" : "text-white"
        }`,
        4: `text-xl md:text-2xl font-medium mb-4 mt-10 leading-tight tracking-tight ${
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
        <figure className="mb-12 my-14 group">
          <div className="relative overflow-hidden rounded-xl shadow-xl">
            <img
              src={content.url || "/placeholder.svg"}
              alt={content.alt}
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Subtle gradient overlay on hover */}
            <div className={`absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${
              theme === "light"
                ? "bg-gradient-to-t from-black/5 to-transparent"
                : "bg-gradient-to-t from-emerald-900/10 to-transparent"
            }`}></div>
          </div>
          {content.caption && (
            <figcaption className={`text-center mt-4 italic text-sm ${
              theme === "light" ? "text-gray-600" : "text-slate-400"
            }`}>
              {content.caption}
            </figcaption>
          )}
        </figure>
      );

    case "LIST":
      const ListTag = content.type === "numbered" ? "ol" : "ul";
      const listClasses =
        content.type === "numbered"
          ? `list-decimal list-outside ml-6 space-y-3 mb-8 text-[17px] md:text-lg ${
              theme === "light" ? "text-gray-800" : "text-slate-300"
            }`
          : `list-disc list-outside ml-6 space-y-3 mb-8 text-[17px] md:text-lg ${
              theme === "light" ? "text-gray-800" : "text-slate-300"
            }`;

      return React.createElement(
        ListTag,
        { className: listClasses },
        content.items.map((item, index) =>
          React.createElement(
            "li",
            { key: index, className: "leading-[1.8] pl-2 marker:font-medium" },
            item
          )
        )
      );

    case "QUOTE":
      return (
        <blockquote className={`border-l-[3px] pl-6 md:pl-8 py-5 my-10 rounded-r-lg transition-all duration-300 ${
          theme === "light"
            ? "border-black bg-gray-50/80 hover:bg-gray-100/80"
            : "border-emerald-500 bg-slate-900/30 hover:bg-slate-900/50"
        }`}>
          <p className={`text-xl md:text-2xl italic leading-relaxed mb-4 font-serif ${
            theme === "light" ? "text-gray-800" : "text-slate-200"
          }`}>
            "{content.text}"
          </p>
          {content.author && (
            <cite className={`font-semibold text-sm not-italic ${
              theme === "light" ? "text-black" : "text-emerald-400"
            }`}>
              — {content.author}
            </cite>
          )}
        </blockquote>
      );

    case "DIVIDER":
      return (
        <div className="flex items-center justify-center my-14">
          <div className={`flex items-center gap-3 ${
            theme === "light" ? "text-gray-300" : "text-slate-700"
          }`}>
            <div className="w-16 h-px bg-current"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
            <div className="w-16 h-px bg-current"></div>
          </div>
        </div>
      );

    default:
      return null;
  }
};

export default ArticlePage;

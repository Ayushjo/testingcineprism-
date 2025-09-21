"use client";
import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  Share2,
  Bookmark,
  ArrowLeft,
  Clock,
  Tag,
  Heart,
  MessageCircle,
  Send,
  Loader2,
  MoreHorizontal,
  Reply,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { ShareButton } from "@/components/ShareComponent.jsx";
import {
  useArticleComments,
  useArticleLike,
  useArticleReplies,
  articleCommentApi,
  formatDate,
  getAvatarColor,
} from "../utils/articleApi.js";
import { Helmet } from "react-helmet";

const Comment = ({
  comment,
  onReplyAdded,
  onCommentUpdated,
  onCommentDeleted,
  depth = 0,
  maxDepth = 8,
}) => {
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
          className={`absolute top-0 bottom-0 bg-slate-700/30 ${
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
            <span className="text-xs sm:text-sm font-medium text-emerald-400 truncate max-w-[120px] sm:max-w-none">
              @{comment.user.username}
            </span>
            <span className="text-xs text-slate-500 flex-shrink-0">
              {formatDate(comment.createdAt)}
            </span>
            {comment.updatedAt !== comment.createdAt && (
              <span className="text-xs text-slate-500">(edited)</span>
            )}
            {depth > 2 && !isMobile && (
              <span className="text-xs text-slate-600 hidden sm:inline">
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
                className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400/50 transition-all duration-300 resize-none"
                rows={2}
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={handleEditComment}
                  className="text-xs bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 px-3 py-1 rounded border border-emerald-500/30 transition-all duration-200"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditText(comment.content);
                  }}
                  className="text-xs text-slate-500 hover:text-slate-400 px-3 py-1 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="text-slate-300 leading-relaxed mb-2 text-sm sm:text-base break-words">
              {comment.content}
            </div>
          )}

          <div className="flex items-center gap-3 sm:gap-4 text-xs">
            <button
              onClick={() => setShowReplyInput(!showReplyInput)}
              className="text-slate-500 hover:text-emerald-400 font-medium transition-colors duration-200 flex items-center gap-1"
            >
              <Reply className="w-3 h-3" />
              <span className="hidden sm:inline">Reply</span>
            </button>

            {comment.replyCount > 0 && (
              <button
                onClick={() => setShowReplies(!showReplies)}
                className="text-slate-500 hover:text-emerald-400 font-medium transition-colors duration-200"
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
                  className="text-slate-500 hover:text-slate-400 transition-colors"
                >
                  <span className="hidden sm:inline">Edit</span>
                  <span className="sm:hidden">✏️</span>
                </button>
                <button
                  onClick={handleDeleteComment}
                  className="text-slate-500 hover:text-red-400 transition-colors"
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
                    className="flex-1 bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400/50 focus:bg-slate-800/70 transition-all duration-300 resize-none overflow-hidden"
                    disabled={isSubmittingReply}
                  />
                  <button
                    type="submit"
                    disabled={!replyText.trim() || isSubmittingReply || !user}
                    className="bg-gradient-to-r from-emerald-500/80 to-teal-600/80 hover:from-emerald-500 hover:to-teal-600 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-emerald-500/20 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                  >
                    {isSubmittingReply ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
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
                <div className="flex items-center justify-center gap-3 py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
                  <span className="text-slate-400">Loading replies...</span>
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
                        className="bg-slate-800/50 hover:bg-slate-800/70 text-slate-300 hover:text-white px-6 py-3 rounded-xl border border-slate-600 hover:border-slate-500 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {repliesLoading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <MoreHorizontal className="w-4 h-4" />
                        )}
                        Load More Replies
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
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
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
          `https://testingcineprismbackend-production.up.railway.app/api/v1/articles/get-article/${slug}`
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
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-slate-400 text-lg">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Article Not Found
          </h1>
          <p className="text-slate-400 mb-8 text-lg">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-8 py-4 bg-gradient-to-r from-emerald-500/80 to-teal-600/80 hover:from-emerald-500 hover:to-teal-600 text-white rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-emerald-500/20"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!article) return null;

  return (
    <div className="min-h-screen bg-slate-950">
      <section className="relative pt-16 pb-12">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
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
                article.mainImageUrl ||
                article.imageUrl ||
                "/thecineprismlogo.jpg"
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
                article.mainImageUrl ||
                article.imageUrl ||
                "/thecineprismlogo.jpg"
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
          

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {article.title}
            </h1>

            {article.shortDescription && (
              <p className="text-xl text-slate-300 leading-relaxed mb-8 max-w-3xl">
                {article.shortDescription}
              </p>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8 pb-8 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {article.author[0].toUpperCase()}
                </div>
                <div>
                  <div className="text-white font-medium">{article.author}</div>
                  <div className="text-slate-400 text-sm">
                    {formatDate(article.publishedAt || article.createdAt)}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 text-slate-400 text-sm sm:ml-auto">
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{readingTime} min read</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye size={14} />
                  <span>{article.viewCount || 0} views</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 lg:gap-8 py-6 border-b border-slate-800 overflow-x-auto">
              <button
                onClick={handleLikeClick}
                className="flex items-center gap-2 sm:gap-3 text-slate-400 hover:text-pink-500 transition-all duration-300 group flex-shrink-0"
              >
                <div className="p-1.5 sm:p-2 rounded-xl bg-white/5 group-hover:bg-pink-500/10 transition-colors duration-300">
                  <Heart
                    className={`w-5 h-5 sm:w-6 sm:h-6 ${
                      isLiked ? "fill-pink-500 text-pink-500" : ""
                    }`}
                  />
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-bold text-base sm:text-lg">
                    {likeCount.toLocaleString()}
                  </span>
                  <span className="text-xs sm:text-sm text-slate-500">
                    Likes
                  </span>
                </div>
              </button>

              <button
                onClick={scrollToDiscussion}
                className="flex items-center gap-2 sm:gap-3 text-slate-400 hover:text-emerald-400 transition-all duration-300 group flex-shrink-0"
              >
                <div className="p-1.5 sm:p-2 rounded-xl bg-white/5 group-hover:bg-emerald-500/10 transition-colors duration-300">
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-bold text-base sm:text-lg">
                    {comments.length || 0}
                  </span>
                  <span className="text-xs sm:text-sm text-slate-500">
                    <span className="hidden sm:inline">Comments</span>
                    <span className="sm:hidden">💬</span>
                  </span>
                </div>
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

      {article.mainImageUrl && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={article.mainImageUrl || "/placeholder.svg"}
                alt={article.title}
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
            </div>
          </div>
        </motion.section>
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
                  {renderContentBlock(block)}
                </motion.div>
              ))
            ) : (
              <div className="text-center py-16">
                <Tag className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                <p className="text-slate-400">
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
            <h2 className="text-4xl font-black text-white mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent tracking-tight">
              Discussion
            </h2>
            <p className="text-slate-400 text-sm">
              Join the conversation with unlimited nested replies
            </p>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 mb-8">
            <form onSubmit={handleSubmitComment}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={
                  user
                    ? "Share your thoughts about this article..."
                    : "Please login to comment..."
                }
                className="w-full h-24 bg-slate-800/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400/50 focus:bg-slate-800/70 transition-all duration-300 resize-none mb-4"
                disabled={isSubmittingComment || !user}
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!newComment.trim() || isSubmittingComment || !user}
                  className="bg-gradient-to-r from-emerald-500/80 to-teal-600/80 hover:from-emerald-500 hover:to-teal-600 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-emerald-500/20 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
                <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
                <span className="text-slate-400">Loading comments...</span>
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
                      className="bg-slate-800/50 hover:bg-slate-800/70 text-slate-300 hover:text-white px-6 py-3 rounded-xl border border-slate-600 hover:border-slate-500 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
                    <MessageCircle className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-400 mb-2">
                      No comments yet
                    </h3>
                    <p className="text-slate-500">
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

const renderContentBlock = (block) => {
  const { type, content } = block;

  switch (type) {
    case "PARAGRAPH":
      return (
        <div className="mb-8">
          {content.hasTitle && content.title && (
            <h3 className="text-2xl font-semibold text-white mb-4 leading-tight">
              {content.title}
            </h3>
          )}
          <p className="text-slate-200 leading-[1.8] text-lg font-normal tracking-normal whitespace-pre-wrap">
            {content.text}
          </p>
        </div>
      );

    case "HEADING":
      const HeadingTag = `h${content.level}`;
      const headingClasses = {
        2: "text-3xl font-bold text-white mb-6 mt-12 leading-tight",
        3: "text-2xl font-semibold text-white mb-4 mt-10 leading-tight",
        4: "text-xl font-medium text-white mb-3 mt-8 leading-tight",
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
          ? "list-decimal list-inside space-y-3 mb-8 text-slate-200 text-lg"
          : "list-disc list-inside space-y-3 mb-8 text-slate-200 text-lg";

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
        <blockquote className="border-l-4 border-emerald-500 pl-6 py-4 my-8 bg-slate-900/20 rounded-r-lg">
          <p className="text-xl italic text-slate-200 leading-relaxed mb-3">
            {content.text}
          </p>
          {content.author && (
            <cite className="text-emerald-400 font-medium text-sm">
              — {content.author}
            </cite>
          )}
        </blockquote>
      );

    case "DIVIDER":
      return (
        <div className="flex items-center justify-center my-12">
          <div className="w-32 h-px bg-slate-700"></div>
        </div>
      );

    default:
      return null;
  }
};

export default ArticlePage;

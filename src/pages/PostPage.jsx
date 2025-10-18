import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Calendar,
  Tag,
  Play,
  User,
  ChevronLeft,
  ChevronRight,
  Heart,
  MessageCircle,
  Send,
  Loader2,
  MoreHorizontal,
  Reply,
} from "lucide-react";
import {
  usePost,
  useComments,
  useReplies,
  useLike,
  commentApi,
  formatDate,
  getAvatarColor,
} from "../utils/api.js";
import { useAuth } from "@/context/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext";
import { showSuccessToast, showErrorToast, showInfoToast } from "../utils/toast";
import { ShareButton } from "@/components/ShareComponent.jsx";
import { Helmet } from "react-helmet";

// Comment component remains the same as your existing code
const Comment = ({
  comment,
  onReplyAdded,
  onCommentUpdated,
  onCommentDeleted,
  depth = 0,
  maxDepth = 8,
}) => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.content);

  // For nested replies, we can use the enhanced useReplies hook
  const {
    replies,
    pagination: replyPagination,
    loading: repliesLoading,
    addReply,
    loadMore: loadMoreReplies,
    updateReply,
    removeReply,
  } = useReplies(showReplies ? comment.id : null, true);

  const handleSubmitReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim() || isSubmittingReply) return;

    if (!user) {
      showErrorToast("Please login to reply to comments");
      return;
    }

    try {
      setIsSubmittingReply(true);
      const newReply = await commentApi.createReply(
        comment.id,
        replyText.trim()
      );
      addReply(newReply);
      onReplyAdded(comment.id, newReply);
      setReplyText("");
      setShowReplyInput(false);
      if (!showReplies) setShowReplies(true);
      showSuccessToast("Reply posted successfully");
    } catch (error) {
      console.error("Error creating reply:", error);
      showErrorToast(error.message || "Failed to create reply");
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
      const updatedComment = await commentApi.updateComment(
        comment.id,
        editText.trim()
      );
      onCommentUpdated(updatedComment);
      setIsEditing(false);
      showSuccessToast("Comment updated successfully");
    } catch (error) {
      console.error("Error updating comment:", error);
      showErrorToast(error.message || "Failed to update comment");
      setEditText(comment.content);
      setIsEditing(false);
    }
  };

  const handleDeleteComment = async () => {
    if (!confirm("Are you sure you want to delete this comment?")) return;

    try {
      await commentApi.deleteComment(comment.id);
      onCommentDeleted(comment.id);
      showSuccessToast("Comment deleted successfully");
    } catch (error) {
      console.error("Error deleting comment:", error);
      showErrorToast(error.message || "Failed to delete comment");
    }
  };

  const handleTextareaInput = (e) => {
    e.currentTarget.style.height = "auto";
    e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
  };

  // Handle nested reply events
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

  // Check if current user owns this comment
  const isOwner =
    user &&
    comment.user &&
    (user.id === comment.user.id || user._id === comment.user._id);

  // Twitter-like responsive indentation
  // Mobile: minimal indentation (8px per level, max 3 levels)
  // Desktop: more generous indentation (20px per level, max 6 levels)
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const mobileMaxDepth = 3;
  const desktopMaxDepth = 6;
  const actualMaxDepth = isMobile ? mobileMaxDepth : desktopMaxDepth;
  const visualDepth = Math.min(depth, actualMaxDepth);

  // Responsive indentation
  const indentSize = isMobile ? 8 : 20;
  const leftMargin = visualDepth * indentSize;

  // Different styling for deeply nested comments
  const isDeepNest = depth >= actualMaxDepth;

  return (
    <div className="relative">
      {/* Threading line for nested comments - thinner on mobile */}
      {depth > 0 && (
        <div
          className={`absolute top-0 bottom-0 ${
            theme === "light" ? "bg-gray-300/50" : "bg-slate-700/30"
          } ${isMobile ? "w-0.5 left-[-6px]" : "w-px left-[-10px]"}`}
        />
      )}

      <div
        className="flex gap-2 sm:gap-3 mb-3 sm:mb-4"
        style={{ marginLeft: `${leftMargin}px` }}
      >
        {/* Avatar - smaller on mobile for deep nests */}
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

        {/* Comment content */}
        <div className="flex-1 min-w-0">
          {/* User info and metadata */}
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
            {/* Show depth indicator only on desktop for deep comments */}
            {depth > 2 && !isMobile && (
              <span className={`text-xs hidden sm:inline ${
                theme === "light" ? "text-gray-500" : "text-slate-600"
              }`}>
                • L{depth}
              </span>
            )}
          </div>

          {/* Comment content */}
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

          {/* Comment actions - more compact on mobile */}
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

            {/* Comment owner actions */}
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

          {/* Reply Input Form - full width on mobile */}
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
                    disabled={!replyText.trim() || isSubmittingReply}
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

          {/* Nested Replies Section */}
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

export default function PostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { theme } = useTheme();

  // Check for initial data from server-side rendering
  const initialData =
    typeof window !== "undefined" ? window.__INITIAL_POST_DATA__ : null;

  // Initialize state with server data if available
  const [post, setPost] = useState(initialData);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [initialLikeStatus, setInitialLikeStatus] = useState(null);
  const [initialLikeStatusLoading, setInitialLikeStatusLoading] =
    useState(true);

  const token = localStorage.getItem("cineprism_auth_token");

  // Only fetch from API if we don't have initial data
  const {
    post: fetchedPost,
    relatedPosts,
    loading: postLoading,
    error: postError,
  } = usePost(initialData ? null : id);

  // Use initial data or fetched data
  const currentPost = post || fetchedPost;

  // Update post state when fetched data arrives
  useEffect(() => {
    if (fetchedPost && !post) {
      setPost(fetchedPost);
    }
  }, [fetchedPost, post]);

  const {
    comments,
    pagination: commentPagination,
    loading: commentsLoading,
    addComment,
    updateComment,
    removeComment,
    loadMore: loadMoreComments,
  } = useComments(id);

  const { isLiked, likeCount, toggleLike } = useLike(id, initialLikeStatus);

  const checkInitialLikeStatus = async () => {
    if (!user || !id) {
      setInitialLikeStatusLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://api.thecineprism.com/api/v1/admin/has-liked",
        { postId: id },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setInitialLikeStatus(response.data.hasLiked);
    } catch (error) {
      console.error("Error checking if the user has liked the post:", error);
      setInitialLikeStatus(false);
    } finally {
      setInitialLikeStatusLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    checkInitialLikeStatus();
  }, []);

  useEffect(() => {
    if (!id) {
      console.error("No post ID provided");
      navigate("/");
    }
  }, [id, navigate]);

  const nextImage = () => {
    if (currentPost?.images) {
      setCurrentImageIndex((prev) => (prev + 1) % currentPost.images.length);
    }
  };

  const prevImage = () => {
    if (currentPost?.images) {
      setCurrentImageIndex(
        (prev) =>
          (prev - 1 + currentPost.images.length) % currentPost.images.length
      );
    }
  };

  const scrollToDiscussion = () => {
    document.getElementById("discussion-section")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmittingComment || !id) return;

    if (!user) {
      alert("Please login to comment");
      return;
    }

    try {
      setIsSubmittingComment(true);
      const comment = await commentApi.createComment(id, newComment.trim());
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
      alert("Please login to like posts");
      return;
    }
    toggleLike();
  };

  // Loading state
  if (!currentPost && (postLoading || initialLikeStatusLoading)) {
    return (
      <div className={`min-h-screen pt-20 flex items-center justify-center transition-all duration-300 ${
        theme === "light" ? "bg-white text-black" : "bg-slate-950 text-white"
      }`}>
        <div className="flex items-center gap-3">
          <Loader2 className={`w-8 h-8 animate-spin ${
            theme === "light" ? "text-black" : "text-emerald-400"
          }`} />
          <span className="text-lg">Loading post...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (postError || !currentPost) {
    return (
      <div className={`min-h-screen pt-20 flex items-center justify-center transition-all duration-300 ${
        theme === "light" ? "bg-white text-black" : "bg-slate-950 text-white"
      }`}>
        <div className="text-center">
          <h2 className={`text-2xl font-bold mb-2 ${
            theme === "light" ? "text-red-600" : "text-red-400"
          }`}>Error</h2>
          <p className={theme === "light" ? "text-gray-600" : "text-slate-400"}>
            {postError || "Post not found"}
          </p>
          <button
            onClick={() => navigate("/")}
            className={`mt-4 px-4 py-2 rounded-lg border transition-all duration-200 ${
              theme === "light"
                ? "bg-black/10 hover:bg-black/20 text-black border-black/30"
                : "bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border-emerald-500/30"
            }`}
          >
            Go to Homepage
          </button>
        </div>
      </div>
    );
  }

  const generateMetaTags = () => {
    if (!currentPost) return null;
    const pageUrl = window.location.href;
    const description =
      currentPost.content && currentPost.content.length > 160
        ? currentPost.content.substring(0, 157) + "..."
        : currentPost.content || `A movie review of ${currentPost.title}`;

    return (
      <Helmet>
        <title>{currentPost.title} - CinePrism</title>
      </Helmet>
    );
  };

  return (
    <div className={`min-h-screen pt-20 transition-all duration-300 ${
      theme === "light" ? "bg-white text-black" : "bg-slate-950 text-white"
    }`}>
      {/* Ambient Background */}
      <div className="absolute inset-0 opacity-20">
        {theme === "light" ? (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(0,0,0,0.03),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(0,0,0,0.03),transparent_50%)]" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(16,185,129,0.03),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(139,92,246,0.03),transparent_50%)]" />
          </>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section 1: Hero & Review Section */}
        <section className="py-12 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
              {/* Poster Image */}
              <div className="lg:col-span-2">
                <div className="aspect-[2/3] relative rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={
                      currentPost.posterImageUrl ||
                      "/placeholder.svg?height=600&width=400"
                    }
                    alt={currentPost.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>
              </div>

              {/* Content */}
              <div className="lg:col-span-3 space-y-8">
                <div>
                  <h1 className={`text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 bg-clip-text text-transparent tracking-tight leading-tight transition-all duration-300 ${
                    theme === "light"
                      ? "bg-gradient-to-r from-black via-gray-800 to-gray-600"
                      : "bg-gradient-to-r from-white via-slate-200 to-slate-400"
                  }`}>
                    {currentPost.title}
                  </h1>
                </div>

                {/* Year and Genres */}
                <div className="flex gap-3">
                  <div className="flex flex-wrap gap-3">
                    <div className={`flex items-center gap-2 backdrop-blur-xl px-4 py-3 rounded-2xl border transition-all duration-300 ${
                      theme === "light"
                        ? "bg-gray-100 border-gray-300"
                        : "bg-white/5 border-white/10"
                    }`}>
                      <Calendar className={`w-5 h-5 ${
                        theme === "light" ? "text-gray-600" : "text-slate-400"
                      }`} />
                      <span className={`font-medium text-base ${
                        theme === "light" ? "text-black" : "text-slate-200"
                      }`}>
                        {currentPost.year}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {currentPost.genres?.map((genre, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-2 backdrop-blur-xl px-4 py-2 rounded-xl border transition-all duration-300 ${
                          theme === "light"
                            ? "bg-gray-100 border-gray-300"
                            : "bg-gray-500/10 border-gray-500/20"
                        }`}
                      >
                        <Tag className={`w-4 h-4 ${
                          theme === "light" ? "text-gray-600" : "text-gray-400"
                        }`} />
                        <span className={`font-medium text-sm ${
                          theme === "light" ? "text-black" : "text-gray-300"
                        }`}>
                          {genre}
                        </span>
                      </div>
                    )) || (
                      <div className={`flex items-center gap-2 backdrop-blur-xl px-4 py-2 rounded-xl border transition-all duration-300 ${
                        theme === "light"
                          ? "bg-gray-100 border-gray-300"
                          : "bg-emerald-500/10 border-emerald-500/20"
                      }`}>
                        <Tag className={`w-4 h-4 ${
                          theme === "light" ? "text-gray-600" : "text-emerald-400"
                        }`} />
                        <span className={`font-medium text-sm ${
                          theme === "light" ? "text-black" : "text-emerald-300"
                        }`}>
                          N/A
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Director & Streaming */}
                <div className="space-y-3">
                  {currentPost.directedBy && (
                    <div className={`flex items-center gap-3 backdrop-blur-xl px-5 py-3 rounded-2xl border transition-all duration-300 ${
                      theme === "light"
                        ? "bg-gray-100 border-gray-300"
                        : "bg-white/5 border-white/10"
                    }`}>
                      <User className={`w-5 h-5 ${
                        theme === "light" ? "text-gray-600" : "text-gray-400"
                      }`} />
                      <span className={`font-medium ${
                        theme === "light" ? "text-gray-700" : "text-slate-200"
                      }`}>
                        Director:
                      </span>
                      <span className={`font-semibold ${
                        theme === "light" ? "text-black" : "text-white"
                      }`}>
                        {currentPost.directedBy}
                      </span>
                    </div>
                  )}
                  {currentPost.streamingAt && (
                    <div className={`flex items-center gap-3 backdrop-blur-xl px-5 py-3 rounded-2xl border transition-all duration-300 ${
                      theme === "light"
                        ? "bg-gray-100 border-gray-300"
                        : "bg-white/5 border-white/10"
                    }`}>
                      <Play className={`w-5 h-5 ${
                        theme === "light" ? "text-gray-600" : "text-gray-400"
                      }`} />
                      <span className={`font-medium ${
                        theme === "light" ? "text-gray-700" : "text-slate-200"
                      }`}>
                        Streaming:
                      </span>
                      <span className={`font-semibold ${
                        theme === "light" ? "text-black" : "text-white"
                      }`}>
                        {currentPost.streamingAt}
                      </span>
                    </div>
                  )}
                </div>

                {/* Action Bar */}
                <div className={`flex items-center gap-4 sm:gap-6 lg:gap-8 py-6 border-t overflow-x-auto transition-all duration-300 ${
                  theme === "light" ? "border-gray-300" : "border-white/10"
                }`}>
                  <button
                    onClick={handleLikeClick}
                    className={`flex items-center gap-2 sm:gap-3 transition-all duration-300 group flex-shrink-0 ${
                      theme === "light"
                        ? "text-gray-600 hover:text-pink-500"
                        : "text-slate-400 hover:text-pink-500"
                    }`}
                  >
                    <div className={`p-1.5 sm:p-2 rounded-xl group-hover:bg-pink-500/10 transition-colors duration-300 ${
                      theme === "light" ? "bg-gray-100" : "bg-white/5"
                    }`}>
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
                      <span className={`text-xs sm:text-sm ${
                        theme === "light" ? "text-gray-500" : "text-slate-500"
                      }`}>
                        Likes
                      </span>
                    </div>
                  </button>

                  <button
                    onClick={scrollToDiscussion}
                    className={`flex items-center gap-2 sm:gap-3 transition-all duration-300 group flex-shrink-0 ${
                      theme === "light"
                        ? "text-gray-600 hover:text-black"
                        : "text-slate-400 hover:text-emerald-400"
                    }`}
                  >
                    <div className={`p-1.5 sm:p-2 rounded-xl transition-colors duration-300 ${
                      theme === "light"
                        ? "bg-gray-100 group-hover:bg-black/10"
                        : "bg-white/5 group-hover:bg-emerald-500/10"
                    }`}>
                      <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="font-bold text-base sm:text-lg">
                        {currentPost.commentCount || 0}
                      </span>
                      <span className={`text-xs sm:text-sm ${
                        theme === "light" ? "text-gray-500" : "text-slate-500"
                      }`}>
                        <span className="hidden sm:inline">Comments</span>
                        <span className="sm:hidden">💬</span>
                      </span>
                    </div>
                  </button>

                  <ShareButton
                    url={window.location.href}
                    title={currentPost.title}
                    description={`A review of ${currentPost.title} ${
                      currentPost.year ? `(${currentPost.year})` : ""
                    } ${
                      currentPost.directedBy
                        ? `directed by ${currentPost.directedBy}`
                        : ""
                    }`}
                    postId={id}
                  />
                </div>

                {/* Review Text */}
                {currentPost.content && (
                  <div className={`prose prose-xl max-w-none ${
                    theme === "light" ? "prose-slate" : "prose-invert"
                  }`}>
                    {currentPost.content
                      .split("\n\n")
                      .map((paragraph, index) => (
                        <p
                          key={index}
                          className={`leading-relaxed mb-6 text-lg lg:text-xl font-light transition-all duration-300 ${
                            theme === "light" ? "text-gray-700" : "text-slate-300"
                          }`}
                        >
                          {paragraph}
                        </p>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        {/* Section 2: Image Gallery Carousel - FIXED */}
        {currentPost.images && currentPost.images.length > 0 && (
          <section className="py-16">
            <div className="text-center mb-12">
              <h2 className={`text-4xl font-black mb-6 bg-clip-text text-transparent tracking-tight transition-all duration-300 ${
                theme === "light"
                  ? "bg-gradient-to-r from-black via-gray-800 to-gray-600"
                  : "bg-gradient-to-r from-white via-slate-200 to-slate-400"
              }`}>
                Gallery
              </h2>
            </div>

            <div className="relative max-w-4xl mx-auto">
              {currentPost.images.length === 1 ? (
                <div className="aspect-video relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={
                      currentPost.images[0].imageUrl ||
                      "/placeholder.svg?height=400&width=600"
                    }
                    alt="Gallery image"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="relative">
                  <div className="aspect-video relative rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src={
                        currentPost.images[currentImageIndex]?.imageUrl ||
                        "/placeholder.svg?height=400&width=600"
                      }
                      alt={`Gallery image ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover transition-opacity duration-300"
                    />
                  </div>

                  <button
                    onClick={prevImage}
                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 backdrop-blur-xl p-3 rounded-full border transition-all duration-300 hover:scale-110 ${
                      theme === "light"
                        ? "bg-white/80 hover:bg-white text-black border-gray-300"
                        : "bg-black/60 hover:bg-black/80 text-white border-white/10"
                    }`}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className={`absolute right-4 top-1/2 transform -translate-y-1/2 backdrop-blur-xl p-3 rounded-full border transition-all duration-300 hover:scale-110 ${
                      theme === "light"
                        ? "bg-white/80 hover:bg-white text-black border-gray-300"
                        : "bg-black/60 hover:bg-black/80 text-white border-white/10"
                    }`}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  <div className="flex justify-center gap-2 mt-6">
                    {currentPost.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentImageIndex
                            ? theme === "light"
                              ? "bg-black scale-125"
                              : "bg-emerald-400 scale-125"
                            : theme === "light"
                            ? "bg-gray-300 hover:bg-gray-400"
                            : "bg-white/30 hover:bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Section 3: Discussion with Enhanced Nested Comments */}
        <section id="discussion-section" className="py-16">
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

          <div className="max-w-4xl mx-auto">
            {/* New Comment Form */}
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
                      ? "Share your thoughts about this review..."
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
                    disabled={
                      !newComment.trim() || isSubmittingComment || !user
                    }
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

            {/* Enhanced Comments List with Nested Support */}
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

        {/* Section 4: You Might Also Like */}
        {relatedPosts && relatedPosts.length > 0 && (
          <section className="py-16">
            <div className="text-center mb-12">
              <h2 className={`text-4xl font-black mb-6 bg-clip-text text-transparent tracking-tight transition-all duration-300 ${
                theme === "light"
                  ? "bg-gradient-to-r from-black via-gray-800 to-gray-600"
                  : "bg-gradient-to-r from-white via-slate-200 to-slate-400"
              }`}>
                You Might Also Like
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <div
                  key={relatedPost.id}
                  className={`group relative h-96 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 cursor-pointer ${
                    theme === "light"
                      ? "hover:shadow-black/20"
                      : "hover:shadow-emerald-500/20"
                  }`}
                  onClick={() =>
                    (window.location.href = `/post/${relatedPost.id}`)
                  }
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  <div
                    className="absolute inset-0 transition-transform duration-300 group-hover:scale-105"
                    style={{
                      backgroundImage: `url(${
                        relatedPost.posterImageUrl ||
                        "/placeholder.svg?height=400&width=300"
                      })`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />

                  <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                    <h3 className={`text-2xl font-bold text-white mb-2 tracking-tight transition-colors duration-300 ${
                      theme === "light"
                        ? "group-hover:text-gray-200"
                        : "group-hover:text-emerald-300"
                    }`}>
                      {relatedPost.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <span>{relatedPost.year}</span>
                      <span>•</span>
                      <span>Directed by {relatedPost.directedBy}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                      <Play className="w-3 h-3" />
                      <span>Streaming on {relatedPost.streamingAt}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

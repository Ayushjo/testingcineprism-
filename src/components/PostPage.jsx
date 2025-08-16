import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
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
  X,
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

const Comment = ({
  comment,
  onReplyAdded,
  onCommentUpdated,
  onCommentDeleted,
}) => {
  const { user } = useAuth(); // Use AuthContext
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.content);

  const {
    replies,
    pagination: replyPagination,
    loading: repliesLoading,
    addReply,
    loadMore: loadMoreReplies,
  } = useReplies(showReplies ? comment.id : null);

  const handleSubmitReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim() || isSubmittingReply) return;

    if (!user) {
      alert("Please login to reply to comments");
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
      const updatedComment = await commentApi.updateComment(
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
      await commentApi.deleteComment(comment.id);
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

  // Check if current user owns this comment
  const isOwner =
    user &&
    comment.user &&
    (user.id === comment.user.id || user._id === comment.user._id);

  return (
    <div className="relative pl-12">
      <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-700" />

      <div className="absolute left-[-2px] top-1">
        <div
          className={`w-8 h-8 rounded-full ${getAvatarColor(
            comment.user.username[0]
          )} flex items-center justify-center text-white text-sm font-semibold`}
        >
          {comment.user.username[0].toUpperCase()}
        </div>
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-emerald-400">
            @{comment.user.username}
          </span>
          <span className="text-xs text-slate-500">
            {formatDate(comment.createdAt)}
          </span>
          {comment.updatedAt !== comment.createdAt && (
            <span className="text-xs text-slate-500">(edited)</span>
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
          <p className="text-slate-300 text-sm leading-relaxed mb-2">
            {comment.content}
          </p>
        )}

        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowReplyInput(!showReplyInput)}
            className="text-xs text-slate-500 hover:text-emerald-400 font-semibold transition-colors duration-200"
          >
            Reply
          </button>

          {comment.replyCount > 0 && (
            <button
              onClick={() => setShowReplies(!showReplies)}
              className="text-xs text-slate-500 hover:text-emerald-400 font-semibold transition-colors duration-200"
            >
              {showReplies ? "Hide" : "Show"} {comment.replyCount}{" "}
              {comment.replyCount === 1 ? "reply" : "replies"}
            </button>
          )}

          {/* Comment actions - only show for comment owner */}
          {isOwner && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="text-xs text-slate-500 hover:text-slate-400 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={handleDeleteComment}
                className="text-xs text-slate-500 hover:text-red-400 transition-colors"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        {/* Reply Input Form */}
        {showReplyInput && (
          <form onSubmit={handleSubmitReply} className="mt-3">
            <div className="flex gap-3">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onInput={handleTextareaInput}
                rows={1}
                placeholder="Write a reply..."
                className="flex-1 bg-slate-800/50 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400/50 transition-all duration-300 resize-none overflow-hidden"
                disabled={isSubmittingReply}
              />
              <button
                type="submit"
                disabled={!replyText.trim() || isSubmittingReply}
                className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 px-3 py-2 rounded-lg border border-emerald-500/30 transition-all duration-300 text-sm self-start disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
              >
                {isSubmittingReply ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  <Send className="w-3 h-3" />
                )}
                Reply
              </button>
            </div>
          </form>
        )}

        {/* Replies Section */}
        {showReplies && (
          <div className="mt-4 space-y-4">
            {repliesLoading && replies.length === 0 ? (
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading replies...
              </div>
            ) : (
              <>
                {replies.map((reply) => (
                  <Comment
                    key={reply.id}
                    comment={reply}
                    onReplyAdded={onReplyAdded}
                    onCommentUpdated={onCommentUpdated}
                    onCommentDeleted={onCommentDeleted}
                  />
                ))}

                {replyPagination?.hasMore && (
                  <button
                    onClick={loadMoreReplies}
                    disabled={repliesLoading}
                    className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold transition-colors flex items-center gap-1"
                  >
                    {repliesLoading ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <MoreHorizontal className="w-3 h-3" />
                    )}
                    Load more replies
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default function PostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth(); // Use AuthContext
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  // Debug logging
  useEffect(() => {
    console.log("PostPage mounted with id:", id);
    console.log("User from context:", user);
  }, [id, user]);

  // API hooks - use id directly from useParams
  const {
    post,
    relatedPosts,
    loading: postLoading,
    error: postError,
  } = usePost(id);

  const {
    comments,
    pagination: commentPagination,
    loading: commentsLoading,
    addComment,
    updateComment,
    removeComment,
    loadMore: loadMoreComments,
  } = useComments(id);

  const { isLiked, likeCount, toggleLike } = useLike(id);

  // Redirect if no ID is provided
  useEffect(() => {
    if (!id) {
      console.error("No post ID provided");
      navigate("/");
    }
  }, [id, navigate]);

  const nextImage = () => {
    if (post?.images) {
      setCurrentImageIndex((prev) => (prev + 1) % post.images.length);
    }
  };

  const prevImage = () => {
    if (post?.images) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + post.images.length) % post.images.length
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
    // Update the parent comment's reply count
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
  if (postLoading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white pt-20 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
          <span className="text-lg">Loading post...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (postError || !post) {
    return (
      <div className="min-h-screen bg-slate-950 text-white pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-2">Error</h2>
          <p className="text-slate-400">{postError || "Post not found"}</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-lg border border-emerald-500/30 transition-all duration-200"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-20">
      {/* Ambient Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(16,185,129,0.03),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(139,92,246,0.03),transparent_50%)]" />
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
                      post.posterImageUrl ||
                      "/placeholder.svg?height=600&width=400"
                    }
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>
              </div>

              {/* Content */}
              <div className="lg:col-span-3 space-y-8">
                {/* Title */}
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-4 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent tracking-tight leading-tight">
                    {post.title}
                  </h1>
                </div>

                {/* Primary Info - Rating & Year */}
                <div className="flex flex-wrap gap-3">
                  {/* <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 backdrop-blur-xl px-4 py-3 rounded-2xl border border-yellow-500/20">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-white font-bold text-base">
                      {post.ratingCategory === "HIGHLY_RECOMMENDED"
                        ? "9.5"
                        : post.ratingCategory === "RECOMMENDED"
                        ? "8.0"
                        : "6.5"}
                    </span>
                  </div> */}
                  <div className="flex items-center gap-2 bg-white/5 backdrop-blur-xl px-4 py-3 rounded-2xl border border-white/10">
                    <Calendar className="w-5 h-5 text-slate-400" />
                    <span className="text-slate-200 font-medium text-base">
                      {post.year}
                    </span>
                  </div>
                </div>

                {/* Secondary Info - Genres */}
                <div className="flex flex-wrap gap-2">
                  {post.genres?.map((genre, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-gray-500/10 backdrop-blur-xl px-4 py-2 rounded-xl border border-gray-500/20"
                    >
                      <Tag className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300 font-medium text-sm">
                        {genre}
                      </span>
                    </div>
                  )) || (
                    <div className="flex items-center gap-2 bg-emerald-500/10 backdrop-blur-xl px-4 py-2 rounded-xl border border-emerald-500/20">
                      <Tag className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-300 font-medium text-sm">
                        N/A
                      </span>
                    </div>
                  )}
                </div>

                {/* Tertiary Info - Director & Streaming */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 bg-white/5 backdrop-blur-xl px-5 py-3 rounded-2xl border border-white/10">
                    <User className="w-5 h-5 text-gray-400" />
                    <span className="text-slate-200 font-medium">
                      Directed :
                    </span>
                    <span className="text-white font-semibold">
                      {post.directedBy}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 backdrop-blur-xl px-5 py-3 rounded-2xl border border-white/10">
                    <Play className="w-5 h-5 text-gray-400" />
                    <span className="text-slate-200 font-medium">
                      Streaming :
                    </span>
                    <span className="text-white font-semibold">
                      {post.streamingAt}
                    </span>
                  </div>
                </div>

                {/* Action Bar */}
                <div className="flex items-center gap-8 py-6 border-t border-white/10">
                  <button
                    onClick={handleLikeClick}
                    className="flex items-center gap-3 text-slate-400 hover:text-pink-500 transition-all duration-300 group"
                  >
                    <div className="p-2 rounded-xl bg-white/5 group-hover:bg-pink-500/10 transition-colors duration-300">
                      <Heart
                        className={`w-6 h-6 ${
                          isLiked ? "fill-pink-500 text-pink-500" : ""
                        }`}
                      />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="font-bold text-lg">
                        {likeCount.toLocaleString()}
                      </span>
                      <span className="text-sm text-slate-500">Likes</span>
                    </div>
                  </button>

                  <button
                    onClick={scrollToDiscussion}
                    className="flex items-center gap-3 text-slate-400 hover:text-emerald-400 transition-all duration-300 group"
                  >
                    <div className="p-2 rounded-xl bg-white/5 group-hover:bg-emerald-500/10 transition-colors duration-300">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="font-bold text-lg">
                        {post.commentCount}
                      </span>
                      <span className="text-sm text-slate-500">
                        {post.commentCount === 1 ? "Comment" : "Comments"}
                      </span>
                    </div>
                  </button>
                </div>

                {/* Review Text */}
                <div className="prose prose-invert prose-xl max-w-none">
                  {post.content.split("\n\n").map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-slate-300 leading-relaxed mb-6 text-lg lg:text-xl font-light"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Image Gallery Carousel */}
        {post.images && post.images.length > 0 && (
          <section className="py-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black text-white mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent tracking-tight">
                Gallery
              </h2>
            </div>

            <div className="relative max-w-4xl mx-auto">
              {post.images.length === 1 ? (
                // Static image if only one image
                <div className="aspect-video relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={
                      post.images[0].imageUrl ||
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
                        post.images[currentImageIndex]?.imageUrl ||
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
                    {post.images.map((_, index) => (
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
            </div>
          </section>
        )}

        {/* Section 3: Discussion */}
        <section id="discussion-section" className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent tracking-tight">
              Discussion
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* New Comment Form */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 mb-8">
              <form onSubmit={handleSubmitComment}>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder={
                    user
                      ? "Share your thoughts about this review..."
                      : "Please login to comment..."
                  }
                  className="w-full h-24 bg-slate-800/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400/50 focus:bg-slate-800/70 transition-all duration-300 resize-none mb-4"
                  disabled={isSubmittingComment || !user}
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={
                      !newComment.trim() || isSubmittingComment || !user
                    }
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

            {/* Comments List */}
            <div className="space-y-6">
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
                    />
                  ))}

                  {/* Load More Comments Button */}
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

        {/* Section 4: You Might Also Like */}
        {relatedPosts && relatedPosts.length > 0 && (
          <section className="py-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black text-white mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent tracking-tight">
                You Might Also Like
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <div
                  key={relatedPost.id}
                  className="group relative h-96 rounded-2xl overflow-hidden shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 cursor-pointer"
                  onClick={() => navigate(`/post/${relatedPost.id}`)}
                >
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Background Image with Hover Effect */}
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

                  {/* Content - Bottom */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                    <h3 className="text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-emerald-300 transition-colors duration-300">
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
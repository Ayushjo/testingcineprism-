// utils/api.js - Enhanced API integration with nested comments support

import axios from "axios";
import { useState, useEffect, useCallback } from "react";

const token = localStorage.getItem("cineprism_auth_token");
const API_BASE_URL =
  "https://testingcineprismbackend-production.up.railway.app/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`, // <-- sending token here
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// ============================================================================
// POST API FUNCTIONS
// ============================================================================

export const postApi = {
  // Get single post
  async fetchPost(postId) {
    const response = await api.get(`/posts/${postId}`);
    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to fetch post");
    }
    return response.data.post;
  },

  // Get related posts
  async fetchRelatedPosts(postId) {
    const response = await api.get(`/posts/${postId}/related`);
    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to fetch related posts");
    }
    return response.data.relatedPosts;
  },

  // Get post statistics
  async getPostStats(postId) {
    const response = await api.get(`/posts/${postId}/stats`);
    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to fetch post stats");
    }
    return response.data.stats;
  },
};

// ============================================================================
// ENHANCED COMMENT API FUNCTIONS WITH NESTED SUPPORT
// ============================================================================

export const commentApi = {
  // Get comments with pagination
  async fetchComments(postId, page = 1, limit = 10) {
    const response = await api.get(`/posts/${postId}/comments`, {
      params: { page, limit },
    });
    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to fetch comments");
    }
    return {
      comments: response.data.comments,
      pagination: response.data.pagination,
    };
  },

  // Get replies for a comment with nested support
  async fetchReplies(commentId, page = 1, limit = 5, nested = false) {
    const response = await api.get(`/posts/comments/${commentId}/replies`, {
      params: { page, limit, nested },
    });
    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to fetch replies");
    }
    return {
      replies: response.data.replies,
      pagination: response.data.pagination,
    };
  },

  // Get complete comment thread (new function)
  async fetchCommentThread(commentId) {
    const response = await api.get(`/posts/comments/${commentId}/thread`);
    if (!response.data.success) {
      throw new Error(
        response.data.message || "Failed to fetch comment thread"
      );
    }
    return response.data.thread;
  },

  // Create new comment - with explicit withCredentials
  async createComment(postId, content) {
    try {
      const response = await api.post(
        `/posts/${postId}/comments`,
        { content },
        {
          withCredentials: true,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to create comment");
      }
      return response.data.comment;
    } catch (error) {
      if (error.response?.status === 401) {
        throw new Error("Please login to comment");
      }
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to create comment"
      );
    }
  },

  // Create reply to comment (now supports unlimited nesting)
  async createReply(commentId, content) {
    try {
      const response = await api.post(
        `/posts/comments/${commentId}/replies`,
        { content },
        {
          withCredentials: true,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to create reply");
      }
      return response.data.reply;
    } catch (error) {
      if (error.response?.status === 401) {
        throw new Error("Please login to reply");
      }
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to create reply"
      );
    }
  },

  // Update comment - with explicit withCredentials
  async updateComment(commentId, content) {
    try {
      const response = await api.put(
        `/posts/comments/${commentId}`,
        { content },
        {
          withCredentials: true,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to update comment");
      }
      return response.data.comment;
    } catch (error) {
      if (error.response?.status === 401) {
        throw new Error("Please login to update comment");
      }
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to update comment"
      );
    }
  },

  // Delete comment - with explicit withCredentials
  async deleteComment(commentId) {
    try {
      const response = await api.delete(`/posts/comments/${commentId}`, {
        withCredentials: true,
      });

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to delete comment");
      }
      return { message: response.data.message };
    } catch (error) {
      if (error.response?.status === 401) {
        throw new Error("Please login to delete comment");
      }
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete comment"
      );
    }
  },
};

// ============================================================================
// LIKE API FUNCTIONS
// ============================================================================

export const likeApi = {
  // Toggle like on post - with explicit withCredentials
  async toggleLike(postId) {
    try {
      const response = await api.post(
        `/posts/${postId}/like`,
        {},
        {
          withCredentials: true,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to toggle like");
      }
      return {
        isLiked: response.data.isLiked,
        likeCount: response.data.likeCount,
      };
    } catch (error) {
      if (error.response?.status === 401) {
        throw new Error("Please login to like posts");
      }
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to toggle like"
      );
    }
  },

  // Get like status
  async getLikeStatus(postId) {
    const response = await api.get(`/posts/${postId}/like`);
    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to get like status");
    }
    return {
      isLiked: response.data.isLiked,
      likeCount: response.data.likeCount,
    };
  },
};

// ============================================================================
// ENHANCED REACT HOOKS FOR DATA FETCHING
// ============================================================================

// Hook for post data
export const usePost = (postId) => {
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!postId) {
      setLoading(false);
      setError("No post ID provided");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const [postData, relatedData] = await Promise.all([
        postApi.fetchPost(postId),
        postApi.fetchRelatedPosts(postId),
      ]);
      const optimizedPosterUrl = postData.posterImageUrl?.includes(
        "cloudinary.com"
      )
        ? postData.posterImageUrl.replace(
            "/upload/",
            "/upload/w_1200,h_auto,c_scale,f_auto,q_auto/"
          )
        : postData.posterImageUrl;

      postData.posterImageUrl = optimizedPosterUrl;
      setPost(postData);
      setRelatedPosts(relatedData);
    } catch (err) {
      console.error("Error fetching post data:", err);
      setError(err.message || "Failed to fetch post data");
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { post, relatedPosts, loading, error, refetch: fetchData };
};

// Hook for comments with pagination
export const useComments = (postId) => {
  const [comments, setComments] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchComments = useCallback(
    async (page = 1, append = false) => {
      if (!postId) return;

      try {
        setLoading(true);
        setError(null);

        const data = await commentApi.fetchComments(postId, page);

        if (append) {
          setComments((prev) => [...prev, ...data.comments]);
        } else {
          setComments(data.comments);
        }

        setPagination(data.pagination);
      } catch (err) {
        console.error("Error fetching comments:", err);
        setError(err.message || "Failed to fetch comments");
      } finally {
        setLoading(false);
      }
    },
    [postId]
  );

  const addComment = useCallback((newComment) => {
    setComments((prev) => [newComment, ...prev]);
    setPagination((prev) =>
      prev
        ? {
            ...prev,
            totalComments: (prev.totalComments || 0) + 1,
          }
        : null
    );
  }, []);

  const updateComment = useCallback((commentId, updatedComment) => {
    const updateCommentRecursive = (comments) => {
      return comments.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, ...updatedComment };
        }
        if (comment.replies && comment.replies.length > 0) {
          return {
            ...comment,
            replies: updateCommentRecursive(comment.replies),
          };
        }
        return comment;
      });
    };

    setComments((prev) => updateCommentRecursive(prev));
  }, []);

  const removeComment = useCallback((commentId) => {
    const removeCommentRecursive = (comments) => {
      return comments.filter((comment) => {
        if (comment.id === commentId) {
          return false;
        }
        if (comment.replies && comment.replies.length > 0) {
          comment.replies = removeCommentRecursive(comment.replies);
        }
        return true;
      });
    };

    setComments((prev) => removeCommentRecursive(prev));
    setPagination((prev) =>
      prev
        ? {
            ...prev,
            totalComments: Math.max(0, (prev.totalComments || 0) - 1),
          }
        : null
    );
  }, []);

  const loadMore = useCallback(() => {
    if (pagination?.hasMore) {
      return fetchComments(pagination.currentPage + 1, true);
    }
    return Promise.resolve();
  }, [pagination, fetchComments]);

  useEffect(() => {
    if (postId) {
      fetchComments(1);
    }
  }, [postId, fetchComments]);

  return {
    comments,
    pagination,
    loading,
    error,
    fetchComments,
    addComment,
    updateComment,
    removeComment,
    loadMore,
  };
};

// Enhanced hook for nested replies
export const useReplies = (commentId, enableNested = false) => {
  const [replies, setReplies] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReplies = useCallback(
    async (page = 1, append = false, nested = enableNested) => {
      if (!commentId) return;

      try {
        setLoading(true);
        setError(null);

        const data = await commentApi.fetchReplies(commentId, page, 5, nested);

        if (append) {
          setReplies((prev) => [...prev, ...data.replies]);
        } else {
          setReplies(data.replies);
        }

        setPagination(data.pagination);
      } catch (err) {
        setError(err.message || "Failed to fetch replies");
      } finally {
        setLoading(false);
      }
    },
    [commentId, enableNested]
  );

  const addReply = useCallback((newReply) => {
    setReplies((prev) => [...prev, newReply]);
    setPagination((prev) =>
      prev
        ? {
            ...prev,
            totalReplies: (prev.totalReplies || 0) + 1,
          }
        : null
    );
  }, []);

  const updateReply = useCallback((replyId, updatedReply) => {
    const updateReplyRecursive = (replies) => {
      return replies.map((reply) => {
        if (reply.id === replyId) {
          return { ...reply, ...updatedReply };
        }
        if (reply.replies && reply.replies.length > 0) {
          return {
            ...reply,
            replies: updateReplyRecursive(reply.replies),
          };
        }
        return reply;
      });
    };

    setReplies((prev) => updateReplyRecursive(prev));
  }, []);

  const removeReply = useCallback((replyId) => {
    const removeReplyRecursive = (replies) => {
      return replies.filter((reply) => {
        if (reply.id === replyId) {
          return false;
        }
        if (reply.replies && reply.replies.length > 0) {
          reply.replies = removeReplyRecursive(reply.replies);
        }
        return true;
      });
    };

    setReplies((prev) => removeReplyRecursive(prev));
    setPagination((prev) =>
      prev
        ? {
            ...prev,
            totalReplies: Math.max(0, (prev.totalReplies || 0) - 1),
          }
        : null
    );
  }, []);

  const loadMore = useCallback(() => {
    if (pagination?.hasMore) {
      return fetchReplies(pagination.currentPage + 1, true);
    }
    return Promise.resolve();
  }, [pagination, fetchReplies]);

  // Reset when commentId changes
  useEffect(() => {
    setReplies([]);
    setPagination(null);
    if (commentId) {
      fetchReplies(1);
    }
  }, [commentId, fetchReplies]);

  return {
    replies,
    pagination,
    loading,
    error,
    fetchReplies,
    addReply,
    updateReply,
    removeReply,
    loadMore,
  };
};

// Hook for like functionality
export const useLike = (postId) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleLike = useCallback(async () => {
    if (!postId) return;

    try {
      setLoading(true);
      setError(null);

      const data = await likeApi.toggleLike(postId);
      setIsLiked(data.isLiked);
      setLikeCount(data.likeCount);
    } catch (err) {
      setError(err.message || "Failed to toggle like");
      // Revert optimistic update on error
      setIsLiked((prev) => !prev);
      setLikeCount((prev) => (isLiked ? prev + 1 : prev - 1));
    } finally {
      setLoading(false);
    }
  }, [postId, isLiked]);

  const optimisticToggleLike = useCallback(() => {
    // Optimistic update for better UX
    setIsLiked((prev) => !prev);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    toggleLike();
  }, [toggleLike, isLiked]);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      if (!postId) return;

      try {
        const data = await likeApi.getLikeStatus(postId);
        setIsLiked(data.isLiked);
        setLikeCount(data.likeCount);
      } catch (err) {
        console.error("Error fetching like status:", err);
      }
    };

    fetchLikeStatus();
  }, [postId]);

  return {
    isLiked,
    likeCount,
    loading,
    error,
    toggleLike: optimisticToggleLike,
  };
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMinutes = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60)
  );

  if (diffInMinutes < 1) return "Just now";
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d ago`;

  return date.toLocaleDateString();
};

export const getAvatarColor = (initial) => {
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

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
};

// Helper function to flatten nested comments for display
export const flattenComments = (comments) => {
  const flattened = [];

  const flatten = (commentList, depth = 0) => {
    commentList.forEach((comment) => {
      flattened.push({ ...comment, depth });
      if (comment.replies && comment.replies.length > 0) {
        flatten(comment.replies, depth + 1);
      }
    });
  };

  flatten(comments);
  return flattened;
};

// Helper function to calculate comment depth
export const getCommentDepth = (comment) => {
  return comment.depth || 0;
};

// Helper function to format nested comments for display
export const formatNestedComments = (comments, maxDepth = 5) => {
  return comments.map((comment) => ({
    ...comment,
    displayDepth: Math.min(comment.depth || 0, maxDepth),
  }));
};

// Export default API instance for custom requests
export default api;

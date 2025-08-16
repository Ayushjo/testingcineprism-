// utils/api.js - Fixed API integration with proper withCredentials

import axios from "axios";
import { useState, useEffect, useCallback } from "react";

// Detect environment and use appropriate URL
const API_BASE_URL =
  "https://testingcineprismbackend-production.up.railway.app/api/v1";

// Create axios instance with default config INCLUDING withCredentials
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // THIS IS THE KEY FIX - must be true for cookie auth
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
// COMMENT API FUNCTIONS
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

  // Get replies for a comment
  async fetchReplies(commentId, page = 1, limit = 5) {
    const response = await api.get(`/posts/comments/${commentId}/replies`, {
      params: { page, limit },
    });
    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to fetch replies");
    }
    return {
      replies: response.data.replies,
      pagination: response.data.pagination,
    };
  },

  // Create new comment - with explicit withCredentials
  async createComment(postId, content) {
    try {
      const response = await api.post(
        `/posts/${postId}/comments`,
        { content },
        {
          withCredentials: true, // Explicitly ensure cookies are sent
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to create comment");
      }
      return response.data.comment;
    } catch (error) {
      // Better error handling
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

  // Create reply to comment - with explicit withCredentials
  async createReply(commentId, content) {
    try {
      const response = await api.post(
        `/posts/comments/${commentId}/replies`,
        { content },
        {
          withCredentials: true, // Explicitly ensure cookies are sent
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
          withCredentials: true, // Explicitly ensure cookies are sent
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
        withCredentials: true, // Explicitly ensure cookies are sent
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
          withCredentials: true, // Explicitly ensure cookies are sent
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
// REACT HOOKS FOR DATA FETCHING
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

      console.log("Fetching post data for ID:", postId); // Debug log

      const [postData, relatedData] = await Promise.all([
        postApi.fetchPost(postId),
        postApi.fetchRelatedPosts(postId),
      ]);

      console.log("Post data received:", postData); // Debug log
      console.log("Related posts received:", relatedData); // Debug log

      setPost(postData);
      setRelatedPosts(relatedData);
    } catch (err) {
      console.error("Error fetching post data:", err); // Debug log
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

        console.log("Fetching comments for post:", postId, "page:", page); // Debug log

        const data = await commentApi.fetchComments(postId, page);

        console.log("Comments received:", data); // Debug log

        if (append) {
          setComments((prev) => [...prev, ...data.comments]);
        } else {
          setComments(data.comments);
        }

        setPagination(data.pagination);
      } catch (err) {
        console.error("Error fetching comments:", err); // Debug log
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
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId ? updatedComment : comment
      )
    );
  }, []);

  const removeComment = useCallback((commentId) => {
    setComments((prev) => prev.filter((comment) => comment.id !== commentId));
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

// Hook for replies with pagination
export const useReplies = (commentId) => {
  const [replies, setReplies] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReplies = useCallback(
    async (page = 1, append = false) => {
      if (!commentId) return;

      try {
        setLoading(true);
        setError(null);

        const data = await commentApi.fetchReplies(commentId, page);

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
    [commentId]
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
    setReplies((prev) =>
      prev.map((reply) => (reply.id === replyId ? updatedReply : reply))
    );
  }, []);

  const removeReply = useCallback((replyId) => {
    setReplies((prev) => prev.filter((reply) => reply.id !== replyId));
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
        // Don't set error for like status, just log it
        // This prevents showing errors on initial load for non-authenticated users
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

// Export default API instance for custom requests
export default api;

"use client";

// utils/article-api.js - Article-specific API integration
import axios from "axios";
import { useState, useEffect, useCallback } from "react";

const TOKEN_KEY = "cineprism_auth_token";
const API_BASE_URL =
  "https://testingcineprismbackend-production.up.railway.app/api/v1/articles";

// Helper function to get current token
const getCurrentToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// Helper function to create headers with current token
const getAuthHeaders = () => {
  const token = getCurrentToken();
  return token
    ? {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    : {
        "Content-Type": "application/json",
      };
};

// Create base API instance
const articleApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// ============================================================================
// ARTICLE COMMENT API FUNCTIONS
// ============================================================================

export const articleCommentApi = {
  // Get comments with pagination
  async fetchComments(articleId, page = 1, limit = 10) {
    const response = await articleApi.get(`/${articleId}/comments`, {
      params: { page, limit },
      headers: getAuthHeaders(),
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
    const response = await articleApi.get(`/comments/${commentId}/replies`, {
      params: { page, limit },
      headers: getAuthHeaders(),
    });
    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to fetch replies");
    }
    return {
      replies: response.data.replies,
      pagination: response.data.pagination,
    };
  },

  // Create new comment
  async createComment(articleId, content) {
    try {
      const response = await articleApi.post(
        `/${articleId}/comments`,
        { content },
        {
          headers: getAuthHeaders(),
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

  // Create reply to comment
  async createReply(commentId, content) {
    try {
      const response = await articleApi.post(
        `/comments/${commentId}/replies`,
        { content },
        {
          headers: getAuthHeaders(),
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

  // Update comment
  async updateComment(commentId, content) {
    try {
      const response = await articleApi.put(
        `/comments/${commentId}`,
        { content },
        {
          headers: getAuthHeaders(),
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

  // Delete comment
  async deleteComment(commentId) {
    try {
      const response = await articleApi.delete(`/comments/${commentId}`, {
        headers: getAuthHeaders(),
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
// ARTICLE LIKE API FUNCTIONS
// ============================================================================

export const articleLikeApi = {
  // Toggle like on article
  async toggleLike(articleId) {
    try {
      const response = await articleApi.post(
        `/${articleId}/like`,
        {},
        {
          headers: getAuthHeaders(),
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
        throw new Error("Please login to like articles");
      }
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to toggle like"
      );
    }
  },

  // Get like status
  async getLikeStatus(articleId) {
    const response = await articleApi.get(`/${articleId}/like`, {
      headers: getAuthHeaders(),
    });
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
// REACT HOOKS FOR ARTICLE DATA FETCHING
// ============================================================================

// Hook for article comments with pagination
export const useArticleComments = (articleId) => {
  const [comments, setComments] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchComments = useCallback(
    async (page = 1, append = false) => {
      if (!articleId) return;

      try {
        setLoading(true);
        setError(null);

        const data = await articleCommentApi.fetchComments(articleId, page);

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
    [articleId]
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
    if (articleId) {
      fetchComments(1);
    }
  }, [articleId, fetchComments]);

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

// Hook for article replies
export const useArticleReplies = (commentId) => {
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

        const data = await articleCommentApi.fetchReplies(commentId, page, 5);

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
      prev.map((reply) =>
        reply.id === replyId ? { ...reply, ...updatedReply } : reply
      )
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

// Hook for article like functionality
export const useArticleLike = (articleId, initialStatus = null) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleLike = useCallback(async () => {
    if (!articleId) return;

    try {
      setLoading(true);
      setError(null);

      const data = await articleLikeApi.toggleLike(articleId);
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
  }, [articleId, isLiked]);

  const optimisticToggleLike = useCallback(() => {
    // Optimistic update for better UX
    setIsLiked((prev) => !prev);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    toggleLike();
  }, [toggleLike, isLiked]);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      if (!articleId) return;

      try {
        const data = await articleLikeApi.getLikeStatus(articleId);
        setIsLiked(data.isLiked);
        setLikeCount(data.likeCount);
      } catch (err) {
        console.error("Error fetching like status:", err);
      }
    };

    // Only fetch if no initial status provided
    if (initialStatus === null) {
      fetchLikeStatus();
    }
  }, [articleId, initialStatus]);

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

export default articleApi;

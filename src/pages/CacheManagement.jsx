"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import {
  Database,
  Trash2,
  AlertTriangle,
  X,
  RefreshCw,
  FileText,
  Image as ImageIcon,
  Clock,
  HardDrive,
  Search,
  Filter,
} from "lucide-react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

const cacheTypeColors = {
  article: "text-blue-400 bg-blue-500/20 border-blue-500/30",
  allArticles: "text-purple-400 bg-purple-500/20 border-purple-500/30",
  post: "text-green-400 bg-green-500/20 border-green-500/30",
  topPicks: "text-amber-400 bg-amber-500/20 border-amber-500/30",
  latestReviews: "text-pink-400 bg-pink-500/20 border-pink-500/30",
  other: "text-slate-400 bg-slate-500/20 border-slate-500/30",
};

export default function CacheManagementPage() {
  const [caches, setCaches] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    type: null, // 'single', 'articles', 'posts', 'all'
    key: null,
    title: "",
  });
  const [isDeleting, setIsDeleting] = useState(false);
  const { token } = useAuth();

  // Fetch all caches
  const fetchCaches = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://api.thecineprism.com/api/v1/cache/list",
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setCaches(response.data);
      }
    } catch (error) {
      console.error("Error fetching caches:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCaches();
  }, []);

  // Delete single cache
  const handleDeleteSingleCache = async (key) => {
    setIsDeleting(true);
    try {
      const response = await axios.delete(
        `https://api.thecineprism.com/api/v1/cache/delete/${encodeURIComponent(
          key
        )}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        await fetchCaches();
        hideDeleteConfirmation();
      }
    } catch (error) {
      console.error("Error deleting cache:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  // Delete all article caches
  const handleDeleteAllArticles = async () => {
    setIsDeleting(true);
    try {
      const response = await axios.delete(
        "https://api.thecineprism.com/api/v1/cache/delete-all-articles",
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        await fetchCaches();
        hideDeleteConfirmation();
      }
    } catch (error) {
      console.error("Error deleting article caches:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  // Delete all post caches
  const handleDeleteAllPosts = async () => {
    setIsDeleting(true);
    try {
      const response = await axios.delete(
        "https://api.thecineprism.com/api/v1/cache/delete-all-posts",
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        await fetchCaches();
        hideDeleteConfirmation();
      }
    } catch (error) {
      console.error("Error deleting post caches:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  // Delete ALL caches
  const handleDeleteAllCaches = async () => {
    setIsDeleting(true);
    try {
      const response = await axios.delete(
        "https://api.thecineprism.com/api/v1/cache/delete-all",
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        await fetchCaches();
        hideDeleteConfirmation();
      }
    } catch (error) {
      console.error("Error deleting all caches:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  // Confirmation handlers
  const showDeleteConfirmation = (type, key, title) => {
    setDeleteConfirmation({ isOpen: true, type, key, title });
  };

  const hideDeleteConfirmation = () => {
    setDeleteConfirmation({
      isOpen: false,
      type: null,
      key: null,
      title: "",
    });
  };

  const confirmDelete = () => {
    switch (deleteConfirmation.type) {
      case "single":
        handleDeleteSingleCache(deleteConfirmation.key);
        break;
      case "articles":
        handleDeleteAllArticles();
        break;
      case "posts":
        handleDeleteAllPosts();
        break;
      case "all":
        handleDeleteAllCaches();
        break;
      default:
        break;
    }
  };

  // Filter caches
  // In your CacheManagementPage component, update getFilteredCaches:

  const getFilteredCaches = () => {
    if (!caches || !caches.caches) return [];

    let filtered = caches.caches;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter((cache) =>
        cache.key.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (filterType) {
      filtered = filtered.filter((cache) => {
        if (filterType === "article") return cache.key.startsWith("article:");
        if (filterType === "allArticles") return cache.key === "all_articles";
        if (filterType === "post")
          return cache.key === "all_posts" || cache.key.startsWith("post:"); // ✅ Added individual posts
        if (filterType === "topPicks") return cache.key === "top_picks";
        if (filterType === "latestReviews")
          return cache.key === "latest_reviews";
        return true;
      });
    }

    return filtered;
  };

  const filteredCaches = getFilteredCaches();

  // Format size
  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  // Get cache type color
  const getCacheTypeColor = (key) => {
    if (key.startsWith("article:")) return cacheTypeColors.article;
    if (key === "all_articles") return cacheTypeColors.allArticles;
    if (key.startsWith("post:")) return cacheTypeColors.post; // ✅ Added individual posts
    if (key === "all_posts") return cacheTypeColors.post;
    if (key === "top_picks") return cacheTypeColors.topPicks;
    if (key === "latest_reviews") return cacheTypeColors.latestReviews;
    return cacheTypeColors.other;
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                <Database className="w-10 h-10 text-emerald-400" />
                Cache Management
              </h1>
              <p className="text-slate-400">
                Monitor and manage your Redis cache
              </p>
            </div>
            <motion.button
              onClick={fetchCaches}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 px-4 py-2 rounded-lg font-medium transition-all duration-300"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        {!isLoading && caches && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm">Total Caches</span>
                <Database className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-white">
                {caches.totalCaches}
              </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm">Article Caches</span>
                <FileText className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-white">
                {caches.summary?.articles || 0}
              </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm">Post Caches</span>
                <ImageIcon className="w-5 h-5 text-green-400" />
              </div>
              <div className="text-3xl font-bold text-white">
                {(caches.summary?.posts || 0) +
                  (caches.summary?.topPicks || 0) +
                  (caches.summary?.latestReviews || 0)}
              </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm">Other Caches</span>
                <HardDrive className="w-5 h-5 text-slate-400" />
              </div>
              <div className="text-3xl font-bold text-white">
                {caches.summary?.other || 0}
              </div>
            </div>
          </motion.div>
        )}

        {/* Bulk Actions */}
        {!isLoading && caches && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 flex flex-wrap gap-4"
          >
            <motion.button
              onClick={() =>
                showDeleteConfirmation("articles", null, "all article caches")
              }
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 border border-orange-500/30 px-4 py-2 rounded-lg font-medium transition-all duration-300"
            >
              <Trash2 className="w-4 h-4" />
              Delete All Articles
            </motion.button>

            <motion.button
              onClick={() =>
                showDeleteConfirmation("posts", null, "all post caches")
              }
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30 px-4 py-2 rounded-lg font-medium transition-all duration-300"
            >
              <Trash2 className="w-4 h-4" />
              Delete All Posts
            </motion.button>

            <motion.button
              onClick={() =>
                showDeleteConfirmation(
                  "all",
                  null,
                  "ALL CACHES (NUCLEAR OPTION)"
                )
              }
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 px-4 py-2 rounded-lg font-medium transition-all duration-300"
            >
              <AlertTriangle className="w-4 h-4" />
              Delete ALL Caches
            </motion.button>
          </motion.div>
        )}

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8 space-y-4"
        >
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search caches by key..."
              className="w-full bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
              >
                <option value="">All Types</option>
                <option value="article" className="bg-slate-900">
                  Individual Articles
                </option>
                <option value="allArticles" className="bg-slate-900">
                  All Articles List
                </option>
                <option value="post" className="bg-slate-900">
                  All Posts
                </option>
                <option value="topPicks" className="bg-slate-900">
                  Top Picks
                </option>
                <option value="latestReviews" className="bg-slate-900">
                  Latest Reviews
                </option>
              </select>
            </div>

            {/* Results count */}
            <div className="flex items-center text-slate-400 text-sm ml-auto">
              {filteredCaches.length} of {caches?.totalCaches || 0} caches
            </div>
          </div>
        </motion.div>

        {/* Cache List */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-400">Loading caches...</p>
          </div>
        ) : filteredCaches.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-3"
          >
            {filteredCaches.map((cache, index) => (
              <motion.div
                key={cache.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
                className={`bg-slate-900/50 backdrop-blur-xl border rounded-xl p-4 hover:border-slate-600 transition-all duration-300 ${getCacheTypeColor(
                  cache.key
                )}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <code className="text-sm font-mono text-white break-all">
                        {cache.key}
                      </code>
                      <span
                        className={`px-2 py-1 rounded-md text-xs font-medium ${getCacheTypeColor(
                          cache.key
                        )}`}
                      >
                        {cache.key.startsWith("article:")
                          ? "Article"
                          : cache.key === "all_articles"
                          ? "All Articles"
                          : cache.key.startsWith("post:") // ✅ Added
                          ? "Single Post"
                          : cache.key === "all_posts"
                          ? "All Posts"
                          : cache.key === "top_picks"
                          ? "Top Picks"
                          : cache.key === "latest_reviews"
                          ? "Reviews"
                          : "Other"}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <div className="flex items-center gap-1">
                        <HardDrive className="w-3 h-3" />
                        <span>{formatSize(cache.size)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>TTL: {cache.ttl}</span>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    onClick={() =>
                      showDeleteConfirmation("single", cache.key, cache.key)
                    }
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="ml-4 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 p-2 rounded-lg transition-all duration-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <Database className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg mb-2">No caches found</p>
            <p className="text-slate-500">
              {searchTerm || filterType
                ? "Try adjusting your search or filters"
                : "All caches have been cleared"}
            </p>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {deleteConfirmation.isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
              onClick={hideDeleteConfirmation}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-2xl max-w-md w-full p-6"
              >
                <div
                  className={`flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full ${
                    deleteConfirmation.type === "all"
                      ? "bg-red-500/30"
                      : "bg-red-500/20"
                  }`}
                >
                  <AlertTriangle
                    className={`w-6 h-6 ${
                      deleteConfirmation.type === "all"
                        ? "text-red-300"
                        : "text-red-400"
                    }`}
                  />
                </div>

                <h3 className="text-xl font-bold text-white text-center mb-2">
                  {deleteConfirmation.type === "all"
                    ? "⚠️ DANGER ZONE ⚠️"
                    : "Confirm Deletion"}
                </h3>

                <p className="text-slate-400 text-center mb-6">
                  Are you sure you want to delete{" "}
                  <span className="text-white font-medium font-mono">
                    {deleteConfirmation.title}
                  </span>
                  ?
                  <br />
                  <span
                    className={`text-sm ${
                      deleteConfirmation.type === "all"
                        ? "text-red-300 font-bold"
                        : "text-red-400"
                    }`}
                  >
                    {deleteConfirmation.type === "all"
                      ? "This will delete EVERY cache in Redis! This cannot be undone!"
                      : "This action cannot be undone."}
                  </span>
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={hideDeleteConfirmation}
                    disabled={isDeleting}
                    className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    disabled={isDeleting}
                    className={`flex-1 text-white py-2 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2 ${
                      deleteConfirmation.type === "all"
                        ? "bg-red-700 hover:bg-red-800"
                        : "bg-red-600 hover:bg-red-700"
                    }`}
                  >
                    {isDeleting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-4 h-4" />
                        {deleteConfirmation.type === "all"
                          ? "Yes, Delete Everything!"
                          : "Delete"}
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

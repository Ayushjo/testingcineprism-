"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Save,
  Search,
  Edit3,
  Calendar,
  User,
  Eye,
  ArrowLeft,
} from "lucide-react";
// Using fetch instead of axios

const genres = [
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "History",
  "Horror",
  "Music",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Sport",
  "Thriller",
  "War",
  "Western",
];

export default function EditPostPage() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    directedBy: "",
    streamingAt: "",
    year: "",
    genres: [],
    relatedPostIds: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitMessage, setSubmitMessage] = useState("");
  const [relatedPostsSearch, setRelatedPostsSearch] = useState("");

  // Fetch all posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://testingcineprismbackend-production.up.railway.app/api/v1/admin/fetch-posts",
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (data.posts) {
          setPosts(data.posts);
          setFilteredPosts(data.posts);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoadingPosts(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts based on search
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.directedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.year.toString().includes(searchTerm)
      );
      setFilteredPosts(filtered);
    }
  }, [searchTerm, posts]);

  // Handle post selection and prefill form
  const handleEditPost = (post) => {
    setSelectedPost(post);
    setFormData({
      title: post.title || "",
      content: post.content || "",
      directedBy: post.directedBy || "",
      streamingAt: post.streamingAt || "",
      year: post.year?.toString() || "",
      genres: post.genres || [],
      relatedPostIds: post.relatedPostIds || [],
    });
    setShowEditForm(true);
    setSubmitStatus(null);
    setSubmitMessage("");
  };

  // Close edit form
  const handleCloseEditForm = () => {
    setShowEditForm(false);
    setSelectedPost(null);
    setRelatedPostsSearch("");
    setSubmitStatus(null);
    setSubmitMessage("");
  };

  // Form handlers
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (submitStatus) {
      setSubmitStatus(null);
      setSubmitMessage("");
    }
  };

  const handleGenreToggle = (genre) => {
    setFormData((prev) => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter((g) => g !== genre)
        : [...prev.genres, genre],
    }));
  };

  const handleRelatedPostToggle = (postId) => {
    setFormData((prev) => ({
      ...prev,
      relatedPostIds: prev.relatedPostIds.includes(postId)
        ? prev.relatedPostIds.filter((id) => id !== postId)
        : [...prev.relatedPostIds, postId],
    }));
  };

  // Submit edit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage("");

    try {
      const submitData = {
        postId: selectedPost.id,
        ...formData,
        year: parseInt(formData.year),
      };

      const response = await fetch(
        "https://testingcineprismbackend-production.up.railway.app/api/v1/admin/edit-post",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(submitData),
        }
      );

      const result = await response.json();

      if (response.status === 200) {
        setSubmitStatus("success");
        setSubmitMessage("Post updated successfully!");

        // Refresh posts list
        const refreshResponse = await fetch(
          "https://testingcineprismbackend-production.up.railway.app/api/v1/admin/fetch-posts",
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const refreshData = await refreshResponse.json();
        if (refreshData.posts) {
          setPosts(refreshData.posts);
        }

        // Close form after successful update
        setTimeout(() => {
          handleCloseEditForm();
        }, 2000);
      }
    } catch (error) {
      console.error("Submit error:", error);
      setSubmitStatus("error");
      setSubmitMessage("Failed to update post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter related posts (exclude current post being edited)
  const filteredRelatedPosts = posts.filter(
    (post) =>
      post.id !== selectedPost?.id &&
      post.title.toLowerCase().includes(relatedPostsSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          {!showEditForm ? (
            // Posts List View
            <motion.div
              key="posts-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">
                  Edit Posts
                </h1>
                <p className="text-slate-400">Select a post to edit</p>
              </div>

              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300"
                    placeholder="Search posts by title, director, or year..."
                  />
                </div>
              </div>

              {/* Posts Grid */}
              {isLoadingPosts ? (
                <div className="text-center py-12">
                  <div className="w-8 h-8 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-slate-400">Loading posts...</p>
                </div>
              ) : filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPosts.map((post) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -5 }}
                      className="bg-slate-900/30 backdrop-blur-xl border border-slate-700 rounded-xl overflow-hidden hover:border-emerald-500/30 transition-all duration-300"
                    >
                      {/* Post Image */}
                      {post.posterImageUrl && (
                        <div className="aspect-[3/4] overflow-hidden">
                          <img
                            src={post.posterImageUrl}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      <div className="p-5">
                        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                          {post.title}
                        </h3>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-slate-400 text-sm">
                            <User className="w-4 h-4 mr-2" />
                            {post.directedBy}
                          </div>
                          <div className="flex items-center text-slate-400 text-sm">
                            <Calendar className="w-4 h-4 mr-2" />
                            {post.year}
                          </div>
                        </div>

                        {/* Genres */}
                        {post.genres && post.genres.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-4">
                            {post.genres.slice(0, 3).map((genre) => (
                              <span
                                key={genre}
                                className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded-full"
                              >
                                {genre}
                              </span>
                            ))}
                            {post.genres.length > 3 && (
                              <span className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded-full">
                                +{post.genres.length - 3}
                              </span>
                            )}
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-500">
                            ID: {post.id}
                          </span>
                          <button
                            onClick={() => handleEditPost(post)}
                            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-all duration-200"
                          >
                            <Edit3 className="w-4 h-4" />
                            Edit
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Eye className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400 text-lg">
                    {searchTerm
                      ? "No posts found matching your search"
                      : "No posts available"}
                  </p>
                </div>
              )}
            </motion.div>
          ) : (
            // Edit Form View
            <motion.div
              key="edit-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {/* Header */}
              <div className="mb-8 flex items-center">
                <button
                  onClick={handleCloseEditForm}
                  className="mr-4 p-2 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-6 h-6 text-slate-400" />
                </button>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">
                    Edit Post
                  </h1>
                  <p className="text-slate-400">
                    Editing: {selectedPost?.title}
                  </p>
                </div>
              </div>

              {/* Status Messages */}
              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-6 p-4 rounded-xl border ${
                    submitStatus === "success"
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                      : "bg-red-500/10 border-red-500/30 text-red-400"
                  }`}
                >
                  {submitMessage}
                </motion.div>
              )}

              {/* Edit Form */}
              <div onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">
                    Movie Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="w-full bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300"
                    placeholder="Enter movie title..."
                    required
                    disabled={isSubmitting}
                  />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">
                    Review Content
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) =>
                      handleInputChange("content", e.target.value)
                    }
                    rows={8}
                    className="w-full bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300 resize-none"
                    placeholder="Write your detailed review..."
                    required
                    disabled={isSubmitting}
                  />
                </div>

                {/* Directed By and Streaming At Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">
                      Directed By
                    </label>
                    <input
                      type="text"
                      value={formData.directedBy}
                      onChange={(e) =>
                        handleInputChange("directedBy", e.target.value)
                      }
                      className="w-full bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300"
                      placeholder="e.g., Christopher Nolan..."
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">
                      Streaming At
                    </label>
                    <input
                      type="text"
                      value={formData.streamingAt}
                      onChange={(e) =>
                        handleInputChange("streamingAt", e.target.value)
                      }
                      className="w-full bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300"
                      placeholder="e.g., Netflix, Amazon Prime..."
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Year */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">
                    Release Year
                  </label>
                  <input
                    type="number"
                    value={formData.year}
                    onChange={(e) => handleInputChange("year", e.target.value)}
                    className="w-full bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300"
                    placeholder="2024"
                    min="1900"
                    max={new Date().getFullYear()}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                {/* Genres */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-300">
                    Genres
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {genres.map((genre) => (
                      <motion.button
                        key={genre}
                        type="button"
                        onClick={() => handleGenreToggle(genre)}
                        disabled={isSubmitting}
                        whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                        className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 disabled:opacity-50 ${
                          formData.genres.includes(genre)
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30"
                            : "bg-slate-800/50 text-slate-400 border border-slate-600 hover:bg-slate-700 hover:text-slate-300"
                        }`}
                      >
                        {genre}
                        {formData.genres.includes(genre) && (
                          <X className="w-3 h-3 ml-1 inline" />
                        )}
                      </motion.button>
                    ))}
                  </div>
                  {formData.genres.length > 0 && (
                    <p className="text-xs text-slate-500">
                      Selected: {formData.genres.join(", ")}
                    </p>
                  )}
                </div>

                {/* Related Posts */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-300">
                    Related Posts
                  </label>

                  {/* Search Bar for Related Posts */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      type="text"
                      value={relatedPostsSearch}
                      onChange={(e) => setRelatedPostsSearch(e.target.value)}
                      className="w-full bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300"
                      placeholder="Search related posts by title..."
                      disabled={isSubmitting}
                    />
                  </div>

                  {filteredRelatedPosts.length > 0 ? (
                    <div className="max-h-64 overflow-y-auto border border-slate-700 rounded-xl bg-slate-900/30">
                      <div className="p-4 space-y-2">
                        {filteredRelatedPosts.map((post) => (
                          <motion.div
                            key={post.id}
                            whileHover={{ scale: 1.01 }}
                            className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                              formData.relatedPostIds.includes(post.id)
                                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                                : "bg-slate-800/30 border-slate-700 text-slate-400 hover:bg-slate-700/30 hover:text-slate-300"
                            }`}
                            onClick={() =>
                              !isSubmitting && handleRelatedPostToggle(post.id)
                            }
                          >
                            <div className="flex-1">
                              <p className="font-medium">{post.title}</p>
                              <p className="text-xs opacity-75">
                                {post.year} • {post.directedBy}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs px-2 py-1 rounded bg-slate-700/50">
                                ID: {post.id}
                              </span>
                              {formData.relatedPostIds.includes(post.id) && (
                                <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                                  <div className="w-2 h-2 bg-white rounded-full" />
                                </div>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-slate-400 text-sm py-4 text-center">
                      No related posts found matching your search.
                    </p>
                  )}
                  {formData.relatedPostIds.length > 0 && (
                    <p className="text-xs text-slate-500">
                      Selected {formData.relatedPostIds.length} related post
                      {formData.relatedPostIds.length !== 1 ? "s" : ""}:{" "}
                      {formData.relatedPostIds.join(", ")}
                    </p>
                  )}
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={handleCloseEditForm}
                    disabled={isSubmitting}
                    className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Updating Post...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        Update Post
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

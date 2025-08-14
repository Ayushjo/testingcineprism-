"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Save } from "lucide-react";
import axios from "axios";

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

const ratingOptions = [
  { value: "HIGHLY_RECOMMENDED", label: "Highly Recommended" },
  { value: "RECOMMENDED", label: "Recommended" },
  { value: "LEAST_RECOMMENDED", label: "Least Recommended" },
];

export default function CreatePostPage() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    origin: "",
    duration: "",
    year: "",
    genres: [],
    ratingCategory: "",
    relatedPostIds: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [submitStatus, setSubmitStatus] = useState(null); // success, error
  const [submitMessage, setSubmitMessage] = useState("");

  // Fetch posts for related posts selection
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://testingcineprismbackend-production.up.railway.app/api/v1/admin/fetch-posts"
        );
        const data = await response.json();
        if (data.posts) {
          setPosts(data.posts);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoadingPosts(false);
      }
    };

    fetchPosts();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear status when user starts typing
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage("");

    try {
      // Prepare data for API
      const submitData = {
        ...formData,
        duration: parseInt(formData.duration),
        year: parseInt(formData.year),
      };

      const response = await fetch(
        "https://testingcineprismbackend-production.up.railway.app/api/v1/admin/create-post",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submitData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setSubmitMessage(
          `Post created successfully! Post ID: ${result.post?.id || "Unknown"}`
        );

        // Reset form after successful submission
        setFormData({
          title: "",
          content: "",
          origin: "",
          duration: "",
          year: "",
          genres: [],
          ratingCategory: "",
          relatedPostIds: [],
        });

        // Refresh posts list to include the new post
        const refreshResponse = await axios.get(
          "https://testingcineprismbackend-production.up.railway.app/api/v1/admin/fetch-posts"
        );
        const refreshData = await refreshResponse.json();
        if (refreshData.posts) {
          setPosts(refreshData.posts);
        }
      } else {
        setSubmitStatus("error");
        setSubmitMessage(
          result.message || "Failed to create post. Please try again."
        );
      }
    } catch (error) {
      console.error("Submit error:", error);
      setSubmitStatus("error");
      setSubmitMessage(
        "Network error. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            Create New Post
          </h1>
          <p className="text-slate-400">
            Add a new movie review to your collection
          </p>
        </motion.div>

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

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
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
              onChange={(e) => handleInputChange("content", e.target.value)}
              rows={8}
              className="w-full bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300 resize-none"
              placeholder="Write your detailed review..."
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Origin and Duration Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">
                Origin
              </label>
              <input
                type="text"
                value={formData.origin}
                onChange={(e) => handleInputChange("origin", e.target.value)}
                className="w-full bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300"
                placeholder="e.g., Hollywood, Bollywood..."
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">
                Duration (minutes)
              </label>
              <input
                type="number"
                value={formData.duration}
                onChange={(e) => handleInputChange("duration", e.target.value)}
                className="w-full bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300"
                placeholder="120"
                min="1"
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
            <label className="text-sm font-medium text-slate-300">Genres</label>
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

          {/* Rating Category */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">
              Rating Category
            </label>
            <select
              value={formData.ratingCategory}
              onChange={(e) =>
                handleInputChange("ratingCategory", e.target.value)
              }
              className="w-full bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300"
              required
              disabled={isSubmitting}
            >
              <option value="">Select rating...</option>
              {ratingOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className="bg-slate-900"
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Related Posts */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-300">
              Related Posts
            </label>
            {isLoadingPosts ? (
              <div className="text-center py-4">
                <div className="w-6 h-6 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-2" />
                <p className="text-slate-400 text-sm">Loading posts...</p>
              </div>
            ) : posts.length > 0 ? (
              <div className="max-h-64 overflow-y-auto border border-slate-700 rounded-xl bg-slate-900/30">
                <div className="p-4 space-y-2">
                  {posts.map((post) => (
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
                          {post.year} • {post.origin}
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
                No posts available yet. Create your first post!
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

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Creating Post...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Create Post & Get ID
              </>
            )}
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
}

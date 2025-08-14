"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Upload, X, Image } from "lucide-react";
import axios from "axios";


export default function UploadPosterPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadStatus, setUploadStatus] = useState(null); // success, error
  const [uploadMessage, setUploadMessage] = useState("");

  // Fetch posts from API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.post(
          "https://testingcineprismbackend-production.up.railway.app/api/v1/admin/fetch-posts",
          {withCredentials:true}
        );
        const data = await response.data;

        if (data.posts) {
          setPosts(data.posts);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts based on search term
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUploadClick = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
    setUploadStatus(null);
    setUploadMessage("");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
    setSelectedFile(null);
    setPreviewUrl(null);
    setIsDragOver(false);
    setUploadStatus(null);
    setUploadMessage("");
  };

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setUploadStatus(null);
      setUploadMessage("");
    } else if (file) {
      setUploadStatus("error");
      setUploadMessage("Please select a valid image file.");
    }
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleUpload = async () => {
    if (!selectedFile || !selectedPost) return;

    setIsUploading(true);
    setUploadStatus(null);
    setUploadMessage("");

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("postId", selectedPost.id);
      console.log(formData);
      
      const response = await axios.post(
        "https://testingcineprismbackend-production.up.railway.app/api/v1/admin/add-poster",
        {
          formData
        },
        {withCredentials:true}
      );

      const result = await response.data;

      if (response.ok) {
        setUploadStatus("success");
        setUploadMessage(result.message || "Poster uploaded successfully!");

        // Update the posts state to reflect the new poster
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === selectedPost.id
              ? { ...post, posterImageId: result.poster?.id }
              : post
          )
        );

        // Close modal after a short delay to show success message
        setTimeout(() => {
          handleCloseModal();
        }, 2000);
      } else {
        setUploadStatus("error");
        setUploadMessage(
          result.message || "Failed to upload poster. Please try again."
        );
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus("error");
      setUploadMessage(
        "Network error. Please check your connection and try again."
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Upload Poster</h1>
          <p className="text-slate-400">
            Select a post and upload its main poster image
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search posts by title..."
              className="w-full bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300"
            />
          </div>
        </motion.div>

        {/* Posts Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-xl overflow-hidden"
        >
          {isLoading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-slate-400">Loading posts...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800/50">
                  <tr>
                    <th className="text-left py-4 px-6 text-slate-300 font-semibold">
                      Title
                    </th>
                    <th className="text-left py-4 px-6 text-slate-300 font-semibold">
                      Year
                    </th>
                    <th className="text-left py-4 px-6 text-slate-300 font-semibold">
                      Origin
                    </th>
                    <th className="text-left py-4 px-6 text-slate-300 font-semibold">
                      Duration
                    </th>
                    <th className="text-left py-4 px-6 text-slate-300 font-semibold">
                      Genres
                    </th>
                    <th className="text-center py-4 px-6 text-slate-300 font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPosts.map((post, index) => (
                    <motion.tr
                      key={post.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className="border-t border-slate-700/50 hover:bg-slate-800/30 transition-colors duration-200"
                    >
                      <td className="py-4 px-6 text-white font-medium">
                        {post.title}
                      </td>
                      <td className="py-4 px-6 text-slate-300">{post.year}</td>
                      <td className="py-4 px-6 text-slate-300">
                        {post.origin}
                      </td>
                      <td className="py-4 px-6 text-slate-300">
                        {post.duration} min
                      </td>
                      <td className="py-4 px-6 text-slate-300">
                        <div className="flex flex-wrap gap-1">
                          {post.genres?.slice(0, 2).map((genre) => (
                            <span
                              key={genre}
                              className="bg-slate-700/50 text-slate-300 px-2 py-1 rounded-md text-xs"
                            >
                              {genre}
                            </span>
                          ))}
                          {post.genres?.length > 2 && (
                            <span className="text-slate-400 text-xs">
                              +{post.genres.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <motion.button
                          onClick={() => handleUploadClick(post)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`px-4 py-2 rounded-lg border transition-all duration-300 font-medium ${
                            post.posterImageId
                              ? "bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border-amber-500/30"
                              : "bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border-emerald-500/30"
                          }`}
                        >
                          {post.posterImageId
                            ? "Update Poster"
                            : "Upload Poster"}
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!isLoading && filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-400">
                No posts found matching your search.
              </p>
            </div>
          )}
        </motion.div>

        {/* Upload Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={handleCloseModal}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-slate-900/90 backdrop-blur-xl border border-slate-700 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Upload Poster
                    </h2>
                    <p className="text-slate-400 mt-1">
                      Uploading poster for:{" "}
                      <span className="text-emerald-400">
                        {selectedPost?.title}
                      </span>{" "}
                      <span className="text-slate-500">
                        (ID: {selectedPost?.id})
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={handleCloseModal}
                    disabled={isUploading}
                    className="text-slate-400 hover:text-white transition-colors duration-200 disabled:opacity-50"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Status Messages */}
                {uploadStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mb-6 p-4 rounded-xl border ${
                      uploadStatus === "success"
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                        : "bg-red-500/10 border-red-500/30 text-red-400"
                    }`}
                  >
                    {uploadMessage}
                  </motion.div>
                )}

                {/* File Upload Area */}
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                    isDragOver
                      ? "border-emerald-400 bg-emerald-500/10"
                      : "border-slate-600 hover:border-slate-500"
                  }`}
                >
                  {previewUrl ? (
                    <div className="space-y-4">
                      <div className="relative inline-block">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="max-w-full max-h-64 rounded-lg shadow-lg"
                        />
                        <button
                          onClick={() => {
                            setSelectedFile(null);
                            setPreviewUrl(null);
                            setUploadStatus(null);
                            setUploadMessage("");
                          }}
                          disabled={isUploading}
                          className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors duration-200 disabled:opacity-50"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-slate-300 font-medium">
                        {selectedFile?.name}
                      </p>
                      <p className="text-slate-400 text-sm">
                        {(selectedFile?.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="mx-auto w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center">
                        <Image className="w-8 h-8 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium mb-2">
                          Drop your poster image here
                        </p>
                        <p className="text-slate-400 text-sm mb-4">
                          or click to browse files (JPG, PNG, WebP)
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileSelect(e.target.files[0])}
                          className="hidden"
                          id="file-input"
                          disabled={isUploading}
                        />
                        <label
                          htmlFor="file-input"
                          className={`inline-block bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                            isUploading ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                        >
                          Browse Files
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                {/* Upload Button */}
                <div className="flex justify-end gap-4 mt-8">
                  <button
                    onClick={handleCloseModal}
                    disabled={isUploading}
                    className="px-6 py-3 text-slate-400 hover:text-white transition-colors duration-200 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <motion.button
                    onClick={handleUpload}
                    disabled={!selectedFile || isUploading}
                    whileHover={{
                      scale: !selectedFile || isUploading ? 1 : 1.02,
                    }}
                    whileTap={{
                      scale: !selectedFile || isUploading ? 1 : 0.98,
                    }}
                    className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isUploading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="w-5 h-5" />
                        Upload Poster
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

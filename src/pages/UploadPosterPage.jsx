"use client";
import { useState, useCallback, useEffect } from "react";
import { Search, Upload, X, Image } from "lucide-react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
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
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const { token } = useAuth();
  // Fetch posts from API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.post(
          "https://testingcineprismbackend-production.up.railway.app/api/v1/admin/fetch-posts",
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`, // <-- sending token here
              "Content-Type": "application/json",
            },
          }
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

      const response = await axios.post(
        "https://testingcineprismbackend-production.up.railway.app/api/v1/admin/add-poster",
        formData,
        { withCredentials: true }
      );

      const result = await response.data;

      if (response.status === 201) {
        setUploadStatus("success");
        setUploadMessage(result.message || "Poster uploaded successfully!");

        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === selectedPost.id
              ? {
                  ...post,
                  posterImageId: result.poster?.id,
                  posterImageUrl: result.poster?.url || post.posterImageUrl,
                }
              : post
          )
        );

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

  const hasPoster = (post) => {
    return post.posterImageId || post.posterImageUrl;
  };

  return (
    <div className="min-h-screen bg-slate-950 p-3 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2">
            Upload Poster
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            Select a post and upload its main poster image
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-4 sm:mb-6">
          <div className="relative">
            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search posts by title..."
              className="w-full bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-xl pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300 text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Posts Table Container */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-xl overflow-hidden">
          {isLoading ? (
            <div className="text-center py-8 sm:py-12">
              <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-slate-400 text-sm sm:text-base">
                Loading posts...
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden lg:block overflow-x-auto">
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
                      <tr
                        key={post.id}
                        className="border-t border-slate-700/50 hover:bg-slate-800/30 transition-colors duration-200"
                      >
                        <td className="py-4 px-6 text-white font-medium">
                          {post.title}
                        </td>
                        <td className="py-4 px-6 text-slate-300">
                          {post.year}
                        </td>
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
                          <button
                            onClick={() => handleUploadClick(post)}
                            className={`px-4 py-2 rounded-lg border transition-all duration-300 font-medium hover:scale-105 active:scale-95 ${
                              hasPoster(post)
                                ? "bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border-yellow-500/30"
                                : "bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border-emerald-500/30"
                            }`}
                          >
                            {hasPoster(post)
                              ? "Update Poster"
                              : "Upload Poster"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card Layout */}
              <div className="lg:hidden">
                <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
                  {filteredPosts.map((post) => (
                    <div
                      key={post.id}
                      className="bg-slate-800/30 rounded-lg p-3 sm:p-4 border border-slate-700/50"
                    >
                      <div className="flex flex-col space-y-2 sm:space-y-3">
                        <div className="flex justify-between items-start">
                          <h3 className="text-white font-medium text-sm sm:text-base flex-1 pr-2">
                            {post.title}
                          </h3>
                          <span className="text-slate-400 text-xs sm:text-sm whitespace-nowrap">
                            {post.year}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-1 sm:gap-2 text-xs sm:text-sm">
                          <span className="text-slate-300">{post.origin}</span>
                          <span className="text-slate-500">•</span>
                          <span className="text-slate-300">
                            {post.duration} min
                          </span>
                          {hasPoster(post) && (
                            <>
                              <span className="text-slate-500">•</span>
                              <span className="text-yellow-400">
                                Has Poster
                              </span>
                            </>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {post.genres?.slice(0, 3).map((genre) => (
                            <span
                              key={genre}
                              className="bg-slate-700/50 text-slate-300 px-2 py-1 rounded-md text-xs"
                            >
                              {genre}
                            </span>
                          ))}
                          {post.genres?.length > 3 && (
                            <span className="text-slate-400 text-xs">
                              +{post.genres.length - 3}
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => handleUploadClick(post)}
                          className={`px-3 py-2 rounded-lg border transition-all duration-300 font-medium flex items-center justify-center gap-2 text-sm active:scale-95 ${
                            hasPoster(post)
                              ? "bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border-yellow-500/30"
                              : "bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border-emerald-500/30"
                          }`}
                        >
                          <Image className="w-4 h-4" />
                          {hasPoster(post) ? "Update Poster" : "Upload Poster"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {!isLoading && filteredPosts.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <p className="text-slate-400 text-sm sm:text-base">
                No posts found matching your search.
              </p>
            </div>
          )}
        </div>

        {/* Upload Modal */}
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[120] flex items-center justify-center p-3 sm:p-4"
            onClick={handleCloseModal}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900/90 backdrop-blur-xl border border-slate-700 rounded-2xl p-4 sm:p-6 lg:p-8 max-w-2xl w-full max-h-[95vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    Upload Poster
                  </h2>
                  <p className="text-slate-400 mt-1 text-sm sm:text-base">
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
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              {/* Status Messages */}
              {uploadStatus && (
                <div
                  className={`mb-4 sm:mb-6 p-3 sm:p-4 rounded-xl border text-sm sm:text-base ${
                    uploadStatus === "success"
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                      : "bg-red-500/10 border-red-500/30 text-red-400"
                  }`}
                >
                  {uploadMessage}
                </div>
              )}

              {/* File Upload Area */}
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`border-2 border-dashed rounded-xl p-4 sm:p-6 lg:p-8 text-center transition-all duration-300 ${
                  isDragOver
                    ? "border-emerald-400 bg-emerald-500/10"
                    : "border-slate-600 hover:border-slate-500"
                }`}
              >
                {previewUrl ? (
                  <div className="space-y-3 sm:space-y-4">
                    <div className="relative inline-block">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="max-w-full max-h-48 sm:max-h-64 rounded-lg shadow-lg"
                      />
                      <button
                        onClick={() => {
                          setSelectedFile(null);
                          setPreviewUrl(null);
                          setUploadStatus(null);
                          setUploadMessage("");
                        }}
                        disabled={isUploading}
                        className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors duration-200 disabled:opacity-50"
                      >
                        <X className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                    <p className="text-slate-300 font-medium text-sm sm:text-base">
                      {selectedFile?.name}
                    </p>
                    <p className="text-slate-400 text-xs sm:text-sm">
                      {(selectedFile?.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-slate-800 rounded-full flex items-center justify-center">
                      <Image className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium mb-2 text-sm sm:text-base">
                        Drop your poster image here
                      </p>
                      <p className="text-slate-400 text-xs sm:text-sm mb-3 sm:mb-4">
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
                        className={`inline-block bg-slate-800 hover:bg-slate-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg cursor-pointer transition-colors duration-200 text-sm sm:text-base ${
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
              <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 mt-6 sm:mt-8">
                <button
                  onClick={handleCloseModal}
                  disabled={isUploading}
                  className="px-4 sm:px-6 py-2 sm:py-3 text-slate-400 hover:text-white transition-colors duration-200 disabled:opacity-50 text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpload}
                  disabled={!selectedFile || isUploading}
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base active:scale-95"
                >
                  {isUploading ? (
                    <>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
                      Upload Poster
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

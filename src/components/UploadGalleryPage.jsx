"use client";

import { useState, useCallback, useEffect } from "react";
import { Search, Upload, X, Images } from "lucide-react";
import axios from "axios";

export default function UploadGalleryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  // Fetch posts from API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.post(
          "https://testingcineprismbackend-production.up.railway.app/api/v1/admin/fetch-posts",
          { withCredentials: true }
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
    setUploadProgress(0);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
    setSelectedFiles([]);
    setPreviewUrls([]);
    setIsDragOver(false);
    setUploadStatus(null);
    setUploadMessage("");
    setUploadProgress(0);
    previewUrls.forEach((url) => URL.revokeObjectURL(url));
  };

  const handleFilesSelect = (files) => {
    const imageFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );

    if (imageFiles.length > 0) {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
      setSelectedFiles(imageFiles);
      const urls = imageFiles.map((file) => URL.createObjectURL(file));
      setPreviewUrls(urls);
      setUploadStatus(null);
      setUploadMessage("");
    } else if (files.length > 0) {
      setUploadStatus("error");
      setUploadMessage("Please select only image files.");
    }
  };

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragOver(false);
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        handleFilesSelect(files);
      }
    },
    [previewUrls]
  );

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const removeImage = (index) => {
    URL.revokeObjectURL(previewUrls[index]);
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    const newUrls = previewUrls.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    setPreviewUrls(newUrls);

    if (newFiles.length === 0) {
      setUploadStatus(null);
      setUploadMessage("");
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0 || !selectedPost) return;

    setIsUploading(true);
    setUploadStatus(null);
    setUploadMessage("");
    setUploadProgress(0);

    try {
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append("files", file);
      });
      formData.append("postId", selectedPost.id);

      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90));
      }, 200);

      const response = await axios.post(
        "https://testingcineprismbackend-production.up.railway.app/api/v1/admin/upload-images",
        formData,
        { withCredentials: true }
      );

      clearInterval(progressInterval);
      setUploadProgress(100);

      const result = await response.data;

      if (response.status === 201) {
        setUploadStatus("success");
        setUploadMessage(
          result.message ||
            `Successfully uploaded ${selectedFiles.length} image${
              selectedFiles.length > 1 ? "s" : ""
            } to gallery!`
        );

        const refreshResponse = await axios.post(
          "https://testingcineprismbackend-production.up.railway.app/api/v1/admin/fetch-posts",
          { withCredentials: true }
        );
        const refreshData = await refreshResponse.data;
        if (refreshData.posts) {
          setPosts(refreshData.posts);
        }
        setTimeout(() => {
          handleCloseModal();
        }, 2500);
      } else {
        setUploadStatus("error");
        setUploadMessage(
          result.message || "Failed to upload gallery images. Please try again."
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
      setUploadProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-3 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2">
            Upload Gallery
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            Select a post and upload multiple gallery images
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
              <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4" />
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
                      <th className="text-left py-4 px-6 text-slate-300 font-semibold">
                        Gallery Count
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
                        <td className="py-4 px-6 text-slate-300">
                          <div className="flex items-center gap-2">
                            <Images className="w-4 h-4 text-purple-400" />
                            <span>{post.images?.length || 0}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <button
                            onClick={() => handleUploadClick(post)}
                            className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 px-4 py-2 rounded-lg border border-purple-500/30 transition-all duration-300 font-medium flex items-center gap-2 mx-auto hover:scale-105 active:scale-95"
                          >
                            <Images className="w-4 h-4" />
                            Add to Gallery
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
                          <span className="text-slate-500">•</span>
                          <div className="flex items-center gap-1">
                            <Images className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                            <span className="text-slate-300">
                              {post.images?.length || 0}
                            </span>
                          </div>
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
                          className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 px-3 py-2 rounded-lg border border-purple-500/30 transition-all duration-300 font-medium flex items-center justify-center gap-2 text-sm active:scale-95"
                        >
                          <Images className="w-4 h-4" />
                          Add to Gallery
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
              className="bg-slate-900/90 backdrop-blur-xl border border-slate-700 rounded-2xl p-4 sm:p-6 lg:p-8 max-w-4xl w-full max-h-[95vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    Upload Gallery
                  </h2>
                  <p className="text-slate-400 mt-1 text-sm sm:text-base">
                    Adding gallery images for:{" "}
                    <span className="text-purple-400">
                      {selectedPost?.title}
                    </span>
                    <span className="text-slate-500 ml-2">
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

              {/* Progress Bar */}
              {isUploading && uploadProgress > 0 && (
                <div className="mb-4 sm:mb-6">
                  <div className="flex justify-between text-xs sm:text-sm text-slate-400 mb-2">
                    <span>Uploading {selectedFiles.length} images...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* File Upload Area */}
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`border-2 border-dashed rounded-xl p-4 sm:p-6 lg:p-8 text-center transition-all duration-300 mb-4 sm:mb-6 ${
                  isDragOver
                    ? "border-purple-400 bg-purple-500/10"
                    : "border-slate-600 hover:border-slate-500"
                }`}
              >
                <div className="space-y-3 sm:space-y-4">
                  <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-slate-800 rounded-full flex items-center justify-center">
                    <Images className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2 text-sm sm:text-base">
                      Drop your gallery images here
                    </p>
                    <p className="text-slate-400 text-xs sm:text-sm mb-3 sm:mb-4">
                      or click to browse multiple files (JPG, PNG, WebP)
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => handleFilesSelect(e.target.files)}
                      className="hidden"
                      id="gallery-input"
                      disabled={isUploading}
                    />
                    <label
                      htmlFor="gallery-input"
                      className={`inline-block bg-slate-800 hover:bg-slate-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg cursor-pointer transition-colors duration-200 text-sm sm:text-base ${
                        isUploading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      Browse Files
                    </label>
                  </div>
                </div>
              </div>

              {/* Image Previews */}
              {previewUrls.length > 0 && (
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
                    Selected Images ({selectedFiles.length})
                    <span className="text-xs sm:text-sm text-slate-400 ml-2">
                      Total size:{" "}
                      {(
                        selectedFiles.reduce(
                          (acc, file) => acc + file.size,
                          0
                        ) /
                        1024 /
                        1024
                      ).toFixed(2)}{" "}
                      MB
                    </span>
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 max-h-60 sm:max-h-96 overflow-y-auto">
                    {previewUrls.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 sm:h-32 object-cover rounded-lg shadow-lg"
                        />
                        <button
                          onClick={() => removeImage(index)}
                          disabled={isUploading}
                          className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all duration-200 disabled:opacity-50"
                        >
                          <X className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                        <div className="absolute bottom-1 left-1 sm:bottom-2 sm:left-2 bg-black/60 backdrop-blur-sm text-white text-xs px-1 sm:px-2 py-1 rounded">
                          {selectedFiles[index]?.name.length > 10
                            ? selectedFiles[index]?.name.substring(0, 10) +
                              "..."
                            : selectedFiles[index]?.name}
                        </div>
                        <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 bg-black/60 backdrop-blur-sm text-white text-xs px-1 py-1 rounded">
                          {(selectedFiles[index]?.size / 1024 / 1024).toFixed(
                            1
                          )}
                          MB
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upload Button */}
              <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
                <button
                  onClick={handleCloseModal}
                  disabled={isUploading}
                  className="px-4 sm:px-6 py-2 sm:py-3 text-slate-400 hover:text-white transition-colors duration-200 disabled:opacity-50 text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpload}
                  disabled={selectedFiles.length === 0 || isUploading}
                  className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base active:scale-95"
                >
                  {isUploading ? (
                    <>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Uploading {selectedFiles.length} image
                      {selectedFiles.length > 1 ? "s" : ""}...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
                      Upload Gallery ({selectedFiles.length})
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

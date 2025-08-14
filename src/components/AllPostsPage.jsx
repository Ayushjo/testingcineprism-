"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Eye,
  Calendar,
  Clock,
  MapPin,
  Star,
  Image,
  X,
} from "lucide-react";
import axios from "axios";

const ratingColors = {
  HIGHLY_RECOMMENDED:
    "text-emerald-400 bg-emerald-500/20 border-emerald-500/30",
  RECOMMENDED: "text-amber-400 bg-amber-500/20 border-amber-500/30",
  LEAST_RECOMMENDED: "text-red-400 bg-red-500/20 border-red-500/30",
};

const ratingLabels = {
  HIGHLY_RECOMMENDED: "Highly Recommended",
  RECOMMENDED: "Recommended",
  LEAST_RECOMMENDED: "Least Recommended",
};

export default function AllPostsPage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGenre, setFilterGenre] = useState("");
  const [filterRating, setFilterRating] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Extract unique genres from posts
  const uniqueGenres = [...new Set(posts.flatMap((post) => post.genres || []))];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://testingcineprismbackend-production.up.railway.app/api/v1/admin/fetch-posts",{
            withCredentials:true
          }
        );
        const data = await response.json();
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

  // Filter posts based on search and filters
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesGenre =
      !filterGenre || (post.genres && post.genres.includes(filterGenre));
    const matchesRating = !filterRating || post.ratingCategory === filterRating;

    return matchesSearch && matchesGenre && matchesRating;
  });

  const handleViewPost = (post) => {
    setSelectedPost(post);
    setSelectedImageIndex(0);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
    setSelectedImageIndex(0);
  };

  const handleNextImage = () => {
    if (selectedPost && selectedPost.images) {
      setSelectedImageIndex((prev) =>
        prev >= selectedPost.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handlePrevImage = () => {
    if (selectedPost && selectedPost.images) {
      setSelectedImageIndex((prev) =>
        prev <= 0 ? selectedPost.images.length - 1 : prev - 1
      );
    }
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
          <h1 className="text-4xl font-bold text-white mb-2">All Posts</h1>
          <p className="text-slate-400">
            Browse and manage all your movie reviews
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          {/* Search Bar */}
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

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={filterGenre}
                onChange={(e) => setFilterGenre(e.target.value)}
                className="bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
              >
                <option value="">All Genres</option>
                {uniqueGenres.map((genre) => (
                  <option key={genre} value={genre} className="bg-slate-900">
                    {genre}
                  </option>
                ))}
              </select>
            </div>

            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
            >
              <option value="">All Ratings</option>
              <option value="HIGHLY_RECOMMENDED" className="bg-slate-900">
                Highly Recommended
              </option>
              <option value="RECOMMENDED" className="bg-slate-900">
                Recommended
              </option>
              <option value="LEAST_RECOMMENDED" className="bg-slate-900">
                Least Recommended
              </option>
            </select>

            {/* Results count */}
            <div className="flex items-center text-slate-400 text-sm ml-auto">
              {filteredPosts.length} of {posts.length} posts
            </div>
          </div>
        </motion.div>

        {/* Posts Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-400">Loading posts...</p>
          </div>
        ) : filteredPosts.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-2xl overflow-hidden hover:border-slate-600 transition-all duration-300 group"
              >
                {/* Poster Image */}
                <div className="relative h-64 bg-slate-800 overflow-hidden">
                  {post.posterImageUrl ? (
                    <img
                      src={post.posterImageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Image className="w-12 h-12 text-slate-600" />
                      <span className="text-slate-500 ml-2">No Poster</span>
                    </div>
                  )}

                  {/* Rating Badge */}
                  <div
                    className={`absolute top-3 right-3 px-2 py-1 rounded-lg text-xs font-medium border backdrop-blur-sm ${
                      ratingColors[post.ratingCategory]
                    }`}
                  >
                    {ratingLabels[post.ratingCategory]}
                  </div>

                  {/* Gallery Count Badge */}
                  {post.images && post.images.length > 0 && (
                    <div className="absolute bottom-3 right-3 px-2 py-1 rounded-lg text-xs font-medium bg-slate-900/80 backdrop-blur-sm text-slate-300 border border-slate-700">
                      <Image className="w-3 h-3 inline mr-1" />
                      {post.images.length}
                    </div>
                  )}
                </div>

                {/* Post Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">
                    {post.title}
                  </h3>

                  <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.year}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.duration}min
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {post.origin}
                    </div>
                  </div>

                  {/* Genres */}
                  {post.genres && post.genres.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.genres.slice(0, 3).map((genre) => (
                        <span
                          key={genre}
                          className="bg-slate-800/50 text-slate-300 px-2 py-1 rounded-md text-xs"
                        >
                          {genre}
                        </span>
                      ))}
                      {post.genres.length > 3 && (
                        <span className="text-slate-400 text-xs px-2 py-1">
                          +{post.genres.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Content Preview */}
                  <p className="text-slate-300 text-sm line-clamp-3 mb-4">
                    {post.content}
                  </p>

                  {/* View Button */}
                  <motion.button
                    onClick={() => handleViewPost(post)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <Image className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg mb-2">No posts found</p>
            <p className="text-slate-500">
              {searchTerm || filterGenre || filterRating
                ? "Try adjusting your search or filters"
                : "Create your first post to get started"}
            </p>
          </div>
        )}

        {/* Post Detail Modal */}
        <AnimatePresence>
          {isModalOpen && selectedPost && (
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
                className="bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-700">
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {selectedPost.title}
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-slate-400 mt-1">
                      <span>{selectedPost.year}</span>
                      <span>{selectedPost.duration} minutes</span>
                      <span>{selectedPost.origin}</span>
                    </div>
                  </div>
                  <button
                    onClick={handleCloseModal}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Images */}
                    <div className="space-y-4">
                      {/* Main Image Display */}
                      <div className="relative h-80 bg-slate-800 rounded-xl overflow-hidden">
                        {selectedPost.images &&
                        selectedPost.images.length > 0 ? (
                          <>
                            <img
                              src={
                                selectedPost.images[selectedImageIndex]
                                  ?.imageUrl
                              }
                              alt={`${selectedPost.title} - Image ${
                                selectedImageIndex + 1
                              }`}
                              className="w-full h-full object-cover"
                            />
                            {selectedPost.images.length > 1 && (
                              <>
                                <button
                                  onClick={handlePrevImage}
                                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                                >
                                  ←
                                </button>
                                <button
                                  onClick={handleNextImage}
                                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                                >
                                  →
                                </button>
                              </>
                            )}
                            <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                              {selectedImageIndex + 1} /{" "}
                              {selectedPost.images.length}
                            </div>
                          </>
                        ) : selectedPost.posterImageUrl ? (
                          <img
                            src={selectedPost.posterImageUrl}
                            alt={selectedPost.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Image className="w-16 h-16 text-slate-600" />
                            <span className="text-slate-500 ml-2">
                              No Images
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Image Thumbnails */}
                      {selectedPost.images &&
                        selectedPost.images.length > 1 && (
                          <div className="flex gap-2 overflow-x-auto pb-2">
                            {selectedPost.images.map((image, index) => (
                              <button
                                key={image.id}
                                onClick={() => setSelectedImageIndex(index)}
                                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                                  index === selectedImageIndex
                                    ? "border-emerald-500"
                                    : "border-slate-700 hover:border-slate-600"
                                }`}
                              >
                                <img
                                  src={image.imageUrl}
                                  alt={`Thumbnail ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </button>
                            ))}
                          </div>
                        )}
                    </div>

                    {/* Right Column - Details */}
                    <div className="space-y-6">
                      {/* Rating */}
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border ${
                          ratingColors[selectedPost.ratingCategory]
                        }`}
                      >
                        <Star className="w-4 h-4" />
                        {ratingLabels[selectedPost.ratingCategory]}
                      </div>

                      {/* Genres */}
                      {selectedPost.genres &&
                        selectedPost.genres.length > 0 && (
                          <div>
                            <h4 className="text-white font-semibold mb-2">
                              Genres
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedPost.genres.map((genre) => (
                                <span
                                  key={genre}
                                  className="bg-slate-800/50 text-slate-300 px-3 py-1 rounded-full text-sm"
                                >
                                  {genre}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                      {/* Review Content */}
                      <div>
                        <h4 className="text-white font-semibold mb-2">
                          Review
                        </h4>
                        <p className="text-slate-300 leading-relaxed">
                          {selectedPost.content}
                        </p>
                      </div>

                      {/* Metadata */}
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700">
                        <div>
                          <span className="text-slate-400 text-sm">
                            Created
                          </span>
                          <p className="text-white">
                            {new Date(
                              selectedPost.createdAt
                            ).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <span className="text-slate-400 text-sm">
                            Post ID
                          </span>
                          <p className="text-white font-mono text-sm">
                            {selectedPost.id.split("-")[0]}...
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}


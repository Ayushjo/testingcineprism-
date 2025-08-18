"use client";
import { useState, useEffect } from "react";

import { Star, Save, Search, Trophy, Film } from "lucide-react";
import axios from "axios";

const genres = [
  { key: "action", label: "Action" },
  { key: "adventure", label: "Adventure" },
  { key: "biography", label: "Biography" },
  { key: "comedy", label: "Comedy" },
  { key: "crime", label: "Crime" },
  { key: "drama", label: "Drama" },
  { key: "fantasy", label: "Fantasy" },
  { key: "history", label: "History" },
  { key: "horror", label: "Horror" },
  { key: "music", label: "Music" },
  { key: "mystery", label: "Mystery" },
  { key: "romance", label: "Romance" },
  { key: "scifi", label: "Sci-Fi" },
  { key: "thriller", label: "Thriller" },
  { key: "war", label: "War" },
  { key: "western", label: "Western" },
];

export default function AddTopPicksPage() {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedPostId, setSelectedPostId] = useState("");
  const [posts, setPosts] = useState([]);
  const [topPicks, setTopPicks] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [isLoadingTopPicks, setIsLoadingTopPicks] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitMessage, setSubmitMessage] = useState("");
  const [postsSearch, setPostsSearch] = useState("");
  const [viewMode, setViewMode] = useState("add");

  // Fetch all posts on component mount
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
        setIsLoadingPosts(false);
      }
    };

    fetchPosts();
  }, []);

  // Fetch existing top picks when viewing
  const fetchTopPicks = async (genre = "All") => {
    setIsLoadingTopPicks(true);
    try {
      const response = await fetch(
        "https://testingcineprismbackend-production.up.railway.app/api/v1/admin/fetch-top-picks",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ genre }),
        }
      );
      const data = await response.json();
      if (data.topPicks) {
        setTopPicks(data.topPicks);
      }
    } catch (error) {
      console.error("Error fetching top picks:", error);
      setTopPicks([]);
    } finally {
      setIsLoadingTopPicks(false);
    }
  };

  // Filter posts based on search term
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(postsSearch.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPostId || !selectedGenre) {
      setSubmitStatus("error");
      setSubmitMessage("Please select both a post and a genre.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage("");

    try {
      const response = await fetch(
        "https://testingcineprismbackend-production.up.railway.app/api/v1/admin/create-top-picks",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            postId: selectedPostId,
            genre: selectedGenre,
          }),
        }
      );

      if (response.status === 201) {
        setSubmitStatus("success");
        setSubmitMessage(
          `Successfully added to top picks for ${
            genres.find((g) => g.key === selectedGenre)?.label || selectedGenre
          }!`
        );

        // Reset form
        setSelectedPostId("");
        setSelectedGenre("");
        setPostsSearch("");

        // Refresh top picks if we're viewing them
        if (viewMode === "view") {
          fetchTopPicks("All");
        }
      }
    } catch (error) {
      console.error("Submit error:", error);
      setSubmitStatus("error");
      if (error.response?.data?.message) {
        setSubmitMessage(error.response.data.message);
      } else {
        setSubmitMessage("Failed to add to top picks. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    if (mode === "view") {
      fetchTopPicks("All");
    }
    // Clear status when switching modes
    setSubmitStatus(null);
    setSubmitMessage("");
  };

  const selectedPost = posts.find(
    (post) => post.id === Number.parseInt(selectedPostId)
  );

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-slate-950 to-slate-950" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-6 mb-8">
            <div className="p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
              <Trophy className="w-10 h-10 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-5xl lg:text-6xl font-black tracking-tight mb-4">
                <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                  Top Picks
                </span>
              </h1>
              <p className="text-xl text-slate-300 tracking-wide">
                Curate your collection of cinematic masterpieces
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <motion.button
              onClick={() => handleViewModeChange("add")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 backdrop-blur-xl border ${
                viewMode === "add"
                  ? "bg-emerald-500/80 text-white border-emerald-400/50 shadow-lg shadow-emerald-500/20"
                  : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:border-white/20"
              }`}
            >
              Add New Pick
            </motion.button>
            <motion.button
              onClick={() => handleViewModeChange("view")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 backdrop-blur-xl border ${
                viewMode === "view"
                  ? "bg-emerald-500/80 text-white border-emerald-400/50 shadow-lg shadow-emerald-500/20"
                  : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:border-white/20"
              }`}
            >
              View Collection
            </motion.button>
          </div>
        </motion.div>

        {submitStatus && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-8 p-6 rounded-3xl backdrop-blur-xl border shadow-2xl ${
              submitStatus === "success"
                ? "bg-emerald-500/10 border-emerald-400/30 text-emerald-300 shadow-emerald-500/20"
                : "bg-red-500/10 border-red-400/30 text-red-300 shadow-red-500/20"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-xl ${
                  submitStatus === "success"
                    ? "bg-emerald-500/20"
                    : "bg-red-500/20"
                }`}
              >
                {submitStatus === "success" ? (
                  <Star className="w-5 h-5" />
                ) : (
                  <Film className="w-5 h-5" />
                )}
              </div>
              <p className="font-medium">{submitMessage}</p>
            </div>
          </motion.div>
        )}

        {viewMode === "add" ? (
          /* Updated form with glassmorphic styling throughout */
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            <div className="space-y-4">
              <label className="text-lg font-semibold text-white">
                Select Genre
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {genres.map((genre, index) => (
                  <motion.button
                    key={genre.key}
                    type="button"
                    onClick={() => setSelectedGenre(genre.key)}
                    disabled={isSubmitting}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{
                      scale: isSubmitting ? 1 : 1.05,
                      y: isSubmitting ? 0 : -2,
                    }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                    className={`p-4 rounded-2xl font-medium transition-all duration-300 backdrop-blur-xl border disabled:opacity-50 ${
                      selectedGenre === genre.key
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-400/50 shadow-lg shadow-emerald-500/20"
                        : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    {genre.label}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-lg font-semibold text-white">
                Select Movie Post
              </label>

              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  value={postsSearch}
                  onChange={(e) => setPostsSearch(e.target.value)}
                  className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-400/50 focus:bg-white/10 transition-all duration-300"
                  placeholder="Search movies by title..."
                  disabled={isSubmitting || isLoadingPosts}
                />
              </div>

              {isLoadingPosts ? (
                <div className="text-center py-12">
                  <div className="w-8 h-8 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-slate-300 text-lg">
                    Loading cinematic collection...
                  </p>
                </div>
              ) : filteredPosts.length > 0 ? (
                <div className="max-h-96 overflow-y-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
                  <div className="p-6 space-y-3">
                    {filteredPosts.map((post, index) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.02, x: 4 }}
                        className={`flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 cursor-pointer backdrop-blur-xl ${
                          selectedPostId === post.id
                            ? "bg-emerald-500/20 border-emerald-400/50 text-emerald-300 shadow-lg shadow-emerald-500/20"
                            : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20 hover:text-white"
                        }`}
                        onClick={() =>
                          !isSubmitting && setSelectedPostId(post.id)
                        }
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`p-3 rounded-xl ${
                              selectedPostId === post.id
                                ? "bg-emerald-500/30"
                                : "bg-white/10"
                            }`}
                          >
                            <Film className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-lg">
                              {post.title}
                            </p>
                            <p className="text-sm opacity-75 mb-2">
                              {post.year} • {post.origin} • {post.duration} min
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {post.genres?.slice(0, 3).map((genre) => (
                                <span
                                  key={genre}
                                  className="text-xs px-3 py-1 bg-white/10 backdrop-blur-xl rounded-full border border-white/20"
                                >
                                  {genre}
                                </span>
                              ))}
                              {post.genres?.length > 3 && (
                                <span className="text-xs px-3 py-1 bg-white/10 backdrop-blur-xl rounded-full border border-white/20">
                                  +{post.genres.length - 3}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs px-3 py-1 rounded-full bg-white/10 backdrop-blur-xl border border-white/20">
                            ID: {post.id}
                          </span>
                          {selectedPostId === post.id && (
                            <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/50">
                              <div className="w-2.5 h-2.5 bg-white rounded-full" />
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl">
                  <div className="p-4 bg-white/10 rounded-full w-fit mx-auto mb-4">
                    <Film className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="text-slate-300 text-lg">
                    {postsSearch
                      ? "No movies found matching your search."
                      : "No movies available in the collection."}
                  </p>
                </div>
              )}
            </div>

            {selectedPost && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl"
              >
                <h3 className="text-slate-300 font-semibold mb-4 text-lg">
                  Selected Movie:
                </h3>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-500/20 rounded-2xl border border-emerald-400/30">
                    <Star className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-xl">
                      {selectedPost.title}
                    </p>
                    <p className="text-slate-300">
                      {selectedPost.year} • {selectedPost.origin} • Rating:{" "}
                      <span className="text-emerald-400 font-semibold">
                        {selectedPost.ratingCategory}
                      </span>
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={isSubmitting || !selectedPostId || !selectedGenre}
              whileHover={{
                scale:
                  !isSubmitting && selectedPostId && selectedGenre ? 1.02 : 1,
                y: !isSubmitting && selectedPostId && selectedGenre ? -2 : 0,
              }}
              whileTap={{
                scale:
                  !isSubmitting && selectedPostId && selectedGenre ? 0.98 : 1,
              }}
              className="w-full bg-gradient-to-r from-emerald-500/80 to-teal-600/80 hover:from-emerald-600/90 hover:to-teal-700/90 text-white font-bold py-6 px-8 rounded-3xl transition-all duration-300 shadow-2xl hover:shadow-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 backdrop-blur-xl border border-emerald-400/30"
            >
              {isSubmitting ? (
                <>
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span className="text-lg">Adding to Collection...</span>
                </>
              ) : (
                <>
                  <Save className="w-6 h-6" />
                  <span className="text-lg">Add to Top Picks</span>
                </>
              )}
            </motion.button>
          </motion.form>
        ) : (
          /* Updated view mode with glassmorphic styling */
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            {isLoadingTopPicks ? (
              <div className="text-center py-16">
                <div className="w-12 h-12 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-6" />
                <p className="text-slate-300 text-xl">
                  Loading your curated collection...
                </p>
              </div>
            ) : topPicks.length > 0 ? (
              <div className="grid gap-6">
                {topPicks.map((topPick, index) => (
                  <motion.div
                    key={topPick.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-6">
                        <div className="p-4 bg-emerald-500/20 rounded-2xl border border-emerald-400/30">
                          <Star className="w-8 h-8 text-emerald-400" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-2">
                            {topPick.post.title}
                          </h3>
                          <p className="text-slate-300 mb-4 text-lg">
                            {topPick.post.year} • {topPick.post.origin} •{" "}
                            {topPick.post.duration} min
                          </p>
                          <div className="flex items-center gap-4">
                            <span className="px-4 py-2 bg-gradient-to-r from-amber-500/20 to-amber-600/20 text-amber-300 rounded-2xl font-semibold border border-amber-400/30">
                              {genres.find((g) => g.key === topPick.genre)
                                ?.label || topPick.genre}
                            </span>
                            <span className="px-4 py-2 bg-white/10 text-slate-300 rounded-2xl font-medium border border-white/20">
                              {topPick.post.ratingCategory}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-slate-400 font-mono bg-white/5 px-3 py-1 rounded-xl border border-white/10">
                        ID: {topPick.post.id}
                      </div>
                    </div>
                    {topPick.post.content && (
                      <p className="text-slate-300 mt-6 text-base leading-relaxed line-clamp-2 bg-white/5 p-4 rounded-2xl border border-white/10">
                        {topPick.post.content.substring(0, 200)}...
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl">
                <div className="p-6 bg-white/10 rounded-full w-fit mx-auto mb-6">
                  <Star className="w-12 h-12 text-slate-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  No Top Picks Yet
                </h3>
                <p className="text-slate-300 text-lg mb-6">
                  Start curating your collection of cinematic masterpieces
                </p>
                <motion.button
                  onClick={() => handleViewModeChange("add")}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-emerald-500/80 to-teal-600/80 text-white rounded-2xl hover:from-emerald-600/90 hover:to-teal-700/90 transition-all duration-300 font-semibold shadow-lg shadow-emerald-500/20"
                >
                  Add Your First Top Pick
                </motion.button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}

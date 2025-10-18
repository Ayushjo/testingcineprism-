"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Save, Upload, Trophy, Film, Image } from "lucide-react";
import axios from "axios";

const genres = [
  { key: "Action", label: "Action" },
  { key: "Adventure", label: "Adventure" },
  { key: "Biography", label: "Biography" },
  { key: "Comedy", label: "Comedy" },
  { key: "Crime", label: "Crime" },
  { key: "Drama", label: "Drama" },
  { key: "Fantasy", label: "Fantasy" },
  { key: "History", label: "History" },
  { key: "Horror", label: "Horror" },
  { key: "Music", label: "Music" },
  { key: "Mystery", label: "Mystery" },
  { key: "Romance", label: "Romance" },
  { key: "Scifi", label: "Sci-Fi" },
  { key: "Thriller", label: "Thriller" },
  { key: "War", label: "War" },
  { key: "Western", label: "Western" },
];

export default function AddTopPicksPage() {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [posterFile, setPosterFile] = useState(null);
  const [posterPreview, setPosterPreview] = useState(null);
  const [topPicks, setTopPicks] = useState([]);
  const [isLoadingTopPicks, setIsLoadingTopPicks] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitMessage, setSubmitMessage] = useState("");
  const [viewMode, setViewMode] = useState("add");

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPosterFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPosterPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Fetch existing top picks when viewing
  const fetchTopPicks = async (genre = "all") => {
    setIsLoadingTopPicks(true);
    try {
      const response = await fetch(
        "https://api.thecineprism.com/api/v1/admin/fetch-top-picks",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !year || !selectedGenre || !posterFile) {
      setSubmitStatus("error");
      setSubmitMessage("Please fill in all fields and upload a poster image.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage("");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("year", parseInt(year));
      formData.append("genre", selectedGenre);
      formData.append("file", posterFile);

      const response = await axios.post(
        "https://api.thecineprism.com/api/v1/admin/create-top-picks",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setSubmitStatus("success");
        setSubmitMessage(
          `Successfully added "${title}" to top picks for ${
            genres.find((g) => g.key === selectedGenre)?.label || selectedGenre
          }!`
        );

        // Reset form
        setTitle("");
        setYear("");
        setSelectedGenre("");
        setPosterFile(null);
        setPosterPreview(null);

        // Reset file input
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) {
          fileInput.value = "";
        }

        // Refresh top picks if we're viewing them
        if (viewMode === "view") {
          fetchTopPicks("all");
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
      fetchTopPicks("all");
    }
    // Clear status when switching modes
    setSubmitStatus(null);
    setSubmitMessage("");
  };

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
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            {/* Movie Title */}
            <div className="space-y-4">
              <label className="text-lg font-semibold text-white">
                Movie Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-400/50 focus:bg-white/10 transition-all duration-300"
                placeholder="Enter movie title..."
                disabled={isSubmitting}
              />
            </div>

            {/* Release Year */}
            <div className="space-y-4">
              <label className="text-lg font-semibold text-white">
                Release Year
              </label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-400/50 focus:bg-white/10 transition-all duration-300"
                placeholder="e.g., 2024"
                min="1900"
                max="2030"
                disabled={isSubmitting}
              />
            </div>

            {/* Genre Selection */}
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
                    whileTap={{
                      scale: isSubmitting ? 1 : 0.95,
                    }}
                    className={`p-4 rounded-2xl font-medium transition-all duration-300 backdrop-blur-xl border ${
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

            {/* Poster Upload */}
            <div className="space-y-4">
              <label className="text-lg font-semibold text-white">
                Movie Poster
              </label>
              <div className="space-y-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={isSubmitting}
                  className="hidden"
                  id="poster-upload"
                />
                <label
                  htmlFor="poster-upload"
                  className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer block"
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="p-4 bg-emerald-500/20 rounded-2xl border border-emerald-400/30">
                      <Upload className="w-8 h-8 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-lg mb-2">
                        {posterFile ? posterFile.name : "Upload Movie Poster"}
                      </p>
                      <p className="text-slate-400">
                        Click to browse or drag and drop your poster image
                      </p>
                      <p className="text-slate-500 text-sm mt-2">
                        Supported formats: JPG, PNG, WebP
                      </p>
                    </div>
                  </div>
                </label>

                {posterPreview && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative max-w-sm mx-auto"
                  >
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-4">
                      <img
                        src={posterPreview}
                        alt="Poster preview"
                        className="w-full h-auto rounded-2xl shadow-2xl"
                      />
                      <div className="flex items-center gap-3 mt-4 p-3 bg-emerald-500/10 rounded-2xl border border-emerald-400/30">
                        <Image className="w-5 h-5 text-emerald-400" />
                        <span className="text-emerald-300 font-medium">
                          Poster ready for upload
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Preview Card */}
            {title && year && selectedGenre && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl"
              >
                <h3 className="text-slate-300 font-semibold mb-4 text-lg">
                  Preview:
                </h3>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-500/20 rounded-2xl border border-emerald-400/30">
                    <Star className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-xl">{title}</p>
                    <p className="text-slate-300">
                      {year} • Genre:{" "}
                      <span className="text-emerald-400 font-semibold">
                        {genres.find((g) => g.key === selectedGenre)?.label ||
                          selectedGenre}
                      </span>
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={
                isSubmitting || !title || !year || !selectedGenre || !posterFile
              }
              whileHover={{
                scale:
                  !isSubmitting && title && year && selectedGenre && posterFile
                    ? 1.02
                    : 1,
                y:
                  !isSubmitting && title && year && selectedGenre && posterFile
                    ? -2
                    : 0,
              }}
              whileTap={{
                scale:
                  !isSubmitting && title && year && selectedGenre && posterFile
                    ? 0.98
                    : 1,
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
          /* View Mode */
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
                        {topPick.posterImageUrl && (
                          <div className="w-20 h-28 rounded-xl overflow-hidden border border-white/20 shadow-lg">
                            <img
                              src={topPick.posterImageUrl}
                              alt={topPick.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex items-center gap-4">
                          <div className="p-4 bg-emerald-500/20 rounded-2xl border border-emerald-400/30">
                            <Star className="w-8 h-8 text-emerald-400" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-2">
                              {topPick.title}
                            </h3>
                            <p className="text-slate-300 mb-4 text-lg">
                              {topPick.year}
                            </p>
                            <div className="flex items-center gap-4">
                              <span className="px-4 py-2 bg-gradient-to-r from-amber-500/20 to-amber-600/20 text-amber-300 rounded-2xl font-semibold border border-amber-400/30">
                                {genres.find((g) => g.key === topPick.genre)
                                  ?.label || topPick.genre}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-slate-400 font-mono bg-white/5 px-3 py-1 rounded-xl border border-white/10">
                        ID: {topPick.id}
                      </div>
                    </div>
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

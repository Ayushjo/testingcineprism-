"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X, Save, Upload } from "lucide-react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

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

export default function AddByGenrePage() {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    directedBy: "",
    synopsis: "",
    year: "",
    genre: [],
  });

  const [posterImage, setPosterImage] = useState(null);
  const [posterPreview, setPosterPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitMessage, setSubmitMessage] = useState("");

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
      genre: prev.genre.includes(genre)
        ? prev.genre.filter((g) => g !== genre)
        : [...prev.genre, genre],
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setSubmitStatus("error");
        setSubmitMessage("Image size should be less than 5MB");
        return;
      }
      setPosterImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPosterPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setPosterImage(null);
    setPosterPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage("");

    if (!posterImage) {
      setSubmitStatus("error");
      setSubmitMessage("Please upload a poster image");
      setIsSubmitting(false);
      return;
    }

    if (formData.genre.length === 0) {
      setSubmitStatus("error");
      setSubmitMessage("Please select at least one genre");
      setIsSubmitting(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("directedBy", formData.directedBy);
      formDataToSend.append("synopsis", formData.synopsis);
      formDataToSend.append("year", formData.year);
      formDataToSend.append("genre", JSON.stringify(formData.genre));
      formDataToSend.append("file", posterImage);

      const response = await axios.post(
        "https://testingcineprismbackend-production.up.railway.app/api/v1/admin/add-byGenres",
        formDataToSend,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setSubmitStatus("success");
        setSubmitMessage("Genre pick added successfully!");

        setFormData({
          title: "",
          directedBy: "",
          synopsis: "",
          year: "",
          genre: [],
        });
        setPosterImage(null);
        setPosterPreview(null);
      }
    } catch (error) {
      console.error("Submit error:", error);
      setSubmitStatus("error");
      setSubmitMessage(
        error.response?.data?.message ||
          "Network error. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Add Genre Pick</h1>
          <p className="text-slate-400">
            Add a new movie to genre-based collections
          </p>
        </motion.div>

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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
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
                placeholder="e.g., Christopher Nolan"
                required
                disabled={isSubmitting}
              />
            </div>

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
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">
              Synopsis
            </label>
            <textarea
              value={formData.synopsis}
              onChange={(e) => handleInputChange("synopsis", e.target.value)}
              rows={5}
              className="w-full bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300 resize-none"
              placeholder="Write a brief synopsis..."
              required
              disabled={isSubmitting}
            />
          </div>

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
                    formData.genre.includes(genre)
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30"
                      : "bg-slate-800/50 text-slate-400 border border-slate-600 hover:bg-slate-700 hover:text-slate-300"
                  }`}
                >
                  {genre}
                  {formData.genre.includes(genre) && (
                    <X className="w-3 h-3 ml-1 inline" />
                  )}
                </motion.button>
              ))}
            </div>
            {formData.genre.length > 0 && (
              <p className="text-xs text-slate-500">
                Selected: {formData.genre.join(", ")}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-300">
              Poster Image
            </label>

            {!posterPreview ? (
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="poster-upload"
                  disabled={isSubmitting}
                />
                <label
                  htmlFor="poster-upload"
                  className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-slate-700 rounded-xl bg-slate-900/30 hover:bg-slate-900/50 transition-all duration-300 cursor-pointer ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <Upload className="w-12 h-12 text-slate-500 mb-3" />
                  <p className="text-slate-400 text-sm mb-1">
                    Click to upload poster image
                  </p>
                  <p className="text-slate-500 text-xs">
                    PNG, JPG or WEBP (MAX. 5MB)
                  </p>
                </label>
              </div>
            ) : (
              <div className="relative">
                <div className="relative w-full h-96 rounded-xl overflow-hidden border border-slate-700">
                  <img
                    src={posterPreview}
                    alt="Poster preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={removeImage}
                  disabled={isSubmitting}
                  className="absolute top-3 right-3 p-2 bg-red-500/80 hover:bg-red-600 rounded-lg transition-all duration-200 disabled:opacity-50"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            )}
          </div>

          <motion.button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Adding Genre Pick...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Add Genre Pick
              </>
            )}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

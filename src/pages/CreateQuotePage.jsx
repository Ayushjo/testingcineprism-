"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save, Quote } from "lucide-react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

export default function CreateQuotePage() {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    quote: "",
    author: "",
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage("");

    try {
      const response = await axios.post(
        "https://api.thecineprism.com/api/v1/admin/add-quotes",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setSubmitStatus("success");
        setSubmitMessage(response.data.message || "Quote added successfully!");

        setFormData({
          quote: "",
          author: "",
        });
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
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            Create New Quote
          </h1>
          <p className="text-slate-400">
            Share memorable quotes from cinema
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
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Quote</label>
            <div className="relative">
              <Quote className="absolute left-4 top-4 text-slate-500 w-5 h-5" />
              <textarea
                value={formData.quote}
                onChange={(e) => handleInputChange("quote", e.target.value)}
                rows={6}
                className="w-full bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300 resize-none"
                placeholder="Enter the memorable quote..."
                required
                disabled={isSubmitting}
              />
            </div>
            <p className="text-xs text-slate-500">
              Enter the exact quote as it appears in the movie
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">
              Author (Movie Title & Year)
            </label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => handleInputChange("author", e.target.value)}
              className="w-full bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300"
              placeholder="e.g., The Wizard of Oz (1939)"
              required
              disabled={isSubmitting}
            />
            <p className="text-xs text-slate-500">Format: Movie Title (Year)</p>
          </div>

          {formData.quote && formData.author && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 bg-gradient-to-br from-slate-900/80 to-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-xl"
            >
              <p className="text-xs font-medium text-emerald-400 mb-3">
                PREVIEW
              </p>
              <div className="relative">
                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-emerald-500/20" />
                <p className="text-lg text-white italic leading-relaxed pl-6">
                  "{formData.quote}"
                </p>
                <p className="text-sm text-slate-400 mt-4 text-right">
                  — {formData.author}
                </p>
              </div>
            </motion.div>
          )}

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
                Adding Quote...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Add Quote
              </>
            )}
          </motion.button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 p-4 bg-slate-900/30 backdrop-blur-xl border border-slate-800 rounded-xl"
        >
          <p className="text-xs font-medium text-slate-400 mb-2">TIPS</p>
          <ul className="text-xs text-slate-500 space-y-1">
            <li>• Ensure quotes are accurately transcribed</li>
            <li>• Include the full movie title and release year</li>
            <li>• Double-check spelling and punctuation</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

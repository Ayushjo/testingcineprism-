"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, Quote, ArrowLeft, Edit3, Search } from "lucide-react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

export default function EditQuotePage() {
  const { token } = useAuth();
  const [quotes, setQuotes] = useState([]);
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const [isLoadingQuotes, setIsLoadingQuotes] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [formData, setFormData] = useState({ quote: "", author: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios.get(
          "https://testingcineprismbackend-production.up.railway.app/api/v1/admin/fetch-quotes",
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.quotes) {
          setQuotes(response.data.quotes);
          setFilteredQuotes(response.data.quotes);
        }
      } catch (error) {
        console.error("Error fetching quotes:", error);
      } finally {
        setIsLoadingQuotes(false);
      }
    };
    fetchQuotes();
  }, [token]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredQuotes(quotes);
    } else {
      const filtered = quotes.filter(
        (quote) =>
          quote.quote.toLowerCase().includes(searchTerm.toLowerCase()) ||
          quote.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredQuotes(filtered);
    }
  }, [searchTerm, quotes]);

  const handleEditQuote = (quote) => {
    setSelectedQuote(quote);
    setFormData({ quote: quote.quote || "", author: quote.author || "" });
    setShowEditForm(true);
    setSubmitStatus(null);
    setSubmitMessage("");
  };

  const handleCloseEditForm = () => {
    setShowEditForm(false);
    setSelectedQuote(null);
    setSubmitStatus(null);
    setSubmitMessage("");
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
      const submitData = {
        id: selectedQuote.id,
        quote: formData.quote,
        author: formData.author,
      };
      const response = await axios.post(
        "https://testingcineprismbackend-production.up.railway.app/api/v1/admin/edit-quote",
        submitData,
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
        setSubmitMessage(response.data.message || "Quote updated successfully!");
        const refreshResponse = await axios.get(
          "https://testingcineprismbackend-production.up.railway.app/api/v1/admin/fetch-quotes",
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (refreshResponse.data.quotes) setQuotes(refreshResponse.data.quotes);
        setTimeout(() => handleCloseEditForm(), 2000);
      }
    } catch (error) {
      console.error("Submit error:", error);
      setSubmitStatus("error");
      setSubmitMessage(
        error.response?.data?.message || "Network error. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          {!showEditForm ? (
            <motion.div
              key="quotes-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <Quote className="w-10 h-10 text-emerald-500" />
                  <h1 className="text-4xl font-bold text-white">Edit Quotes</h1>
                </div>
                <p className="text-slate-400">Select a quote to edit</p>
              </div>

              <div className="mb-6">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300"
                    placeholder="Search quotes or authors..."
                  />
                </div>
              </div>

              {isLoadingQuotes ? (
                <div className="text-center py-12">
                  <div className="w-8 h-8 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-slate-400">Loading quotes...</p>
                </div>
              ) : filteredQuotes.length > 0 ? (
                <div className="space-y-4">
                  {filteredQuotes.map((quote, index) => (
                    <motion.div
                      key={quote.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-slate-900/30 backdrop-blur-xl border border-slate-700 rounded-xl p-6 hover:border-emerald-500/30 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-4">
                            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-semibold border border-emerald-400/30">
                              Rank #{quote.rank}
                            </span>
                            <span className="text-xs text-slate-500">
                              ID: {quote.id}
                            </span>
                          </div>
                          <div className="relative mb-4">
                            <Quote className="absolute -top-2 -left-2 w-6 h-6 text-emerald-500/20" />
                            <p className="text-lg text-white italic leading-relaxed pl-5">
                              "{quote.quote}"
                            </p>
                          </div>
                          <p className="text-slate-400 text-sm">
                            — {quote.author}
                          </p>
                        </div>
                        <button
                          onClick={() => handleEditQuote(quote)}
                          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-all duration-200 flex-shrink-0"
                        >
                          <Edit3 className="w-4 h-4" />
                          Edit
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Quote className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400 text-lg">
                    {searchTerm
                      ? "No quotes found matching your search"
                      : "No quotes available"}
                  </p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="edit-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="mb-8 flex items-center">
                <button
                  onClick={handleCloseEditForm}
                  className="mr-4 p-2 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-6 h-6 text-slate-400" />
                </button>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Quote className="w-8 h-8 text-emerald-500" />
                    <h1 className="text-4xl font-bold text-white">
                      Edit Quote
                    </h1>
                  </div>
                  <p className="text-slate-400">
                    Editing Rank #{selectedQuote?.rank} • ID:{" "}
                    {selectedQuote?.id}
                  </p>
                </div>
              </div>

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

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">
                    Quote
                  </label>
                  <div className="relative">
                    <Quote className="absolute left-4 top-4 text-slate-500 w-5 h-5" />
                    <textarea
                      value={formData.quote}
                      onChange={(e) =>
                        handleInputChange("quote", e.target.value)
                      }
                      rows={6}
                      className="w-full bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300 resize-none"
                      placeholder="Enter the memorable quote..."
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">
                    Author (Movie Title & Year)
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) =>
                      handleInputChange("author", e.target.value)
                    }
                    className="w-full bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300"
                    placeholder="e.g., The Wizard of Oz (1939)"
                    required
                    disabled={isSubmitting}
                  />
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
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Updating Quote...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        Update Quote
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

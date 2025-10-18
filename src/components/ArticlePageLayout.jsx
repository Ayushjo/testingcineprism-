"use client";

import { motion } from "framer-motion";
import { Calendar, ExternalLink, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function ArticlePageLayout({ article }) {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const isNewsArticle = article.source_name;

  const handleBackClick = () => {
    // Navigate back to trending page with news tab active
    navigate('/trending?tab=news');
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b relative overflow-hidden transition-colors duration-300 ${
      theme === "light"
        ? "from-gray-50 to-white"
        : "from-slate-950 to-slate-900"
    }`}>
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 opacity-20">
        {theme === "light" ? (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(0,0,0,0.03),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(0,0,0,0.02),transparent_50%)]" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(139,92,246,0.05),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(16,185,129,0.05),transparent_50%)]" />
          </>
        )}
      </div>

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="relative w-full h-96 overflow-hidden"
      >
        <img
          src={article.image_url || "/placeholder.svg"}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${
          theme === "light"
            ? "from-gray-50 via-gray-50/50 to-transparent"
            : "from-slate-950 via-slate-950/50 to-transparent"
        }`} />
      </motion.div>



      {/* Content Container */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-24 z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mb-12"
        >

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className={`text-4xl md:text-5xl lg:text-6xl font-black mb-6 bg-clip-text text-transparent tracking-tight leading-tight ${
              theme === "light"
                ? "bg-gradient-to-r from-black via-gray-800 to-gray-600"
                : "bg-gradient-to-r from-white via-slate-200 to-slate-400"
            }`}
          >
            {article.title}
          </motion.h1>

          {/* Metadata */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className={`flex items-center justify-center gap-4 ${
              theme === "light" ? "text-gray-600" : "text-slate-400"
            }`}
          >
            {isNewsArticle && (
              <>
                <div className="flex items-center gap-2">
                  <ExternalLink className={`w-4 h-4 ${
                    theme === "light" ? "text-[#8B4513]" : "text-purple-400"
                  }`} />
                  <span className={`font-medium ${
                    theme === "light" ? "text-[#654321]" : "text-purple-300"
                  }`}>
                    {article.source_name}
                  </span>
                </div>
                <span className={theme === "light" ? "text-gray-400" : "text-slate-600"}>•</span>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(article.published_at || article.created_at).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </span>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>

        {/* Content Body */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className={`backdrop-blur-xl border rounded-3xl p-8 md:p-12 mb-16 transition-colors duration-300 ${
            theme === "light"
              ? "bg-white/80 border-gray-300"
              : "bg-white/5 border-white/10"
          }`}
        >
          <div className={`prose prose-lg max-w-none ${
            theme === "light" ? "prose-gray" : "prose-invert"
          }`}>
            <p className={`leading-relaxed text-lg ${
              theme === "light" ? "text-gray-700" : "text-slate-300"
            }`}>
              {article.content}
            </p>
          </div>
        </motion.div>

        {/* Bottom Fade Effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-center pb-16"
        >
          <div className={`inline-flex items-center gap-2 text-sm ${
            theme === "light" ? "text-gray-500" : "text-slate-500"
          }`}>
            <div className={`w-8 h-px ${
              theme === "light"
                ? "bg-gradient-to-r from-transparent to-gray-400"
                : "bg-gradient-to-r from-transparent to-slate-500"
            }`} />
            <span>Latest News</span>
            <div className={`w-8 h-px ${
              theme === "light"
                ? "bg-gradient-to-l from-transparent to-gray-400"
                : "bg-gradient-to-l from-transparent to-slate-500"
            }`} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Calendar, ExternalLink } from "lucide-react";

export default function ArticlePageLayout({ article }) {
  const isNewsArticle = article.source_name;
  const isAIInsight = article.content_type;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(139,92,246,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(16,185,129,0.05),transparent_50%)]" />
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
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
      </motion.div>

      {/* Content Container */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-32 z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mb-12"
        >
          {/* Dynamic Header based on article type */}
          {isAIInsight && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-purple-500/20 backdrop-blur-xl text-emerald-300 px-4 py-2 rounded-2xl text-sm font-semibold border border-emerald-400/30 mb-6"
            >
              <BrainCircuit className="w-4 h-4" />
              AI Insight
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent tracking-tight leading-tight"
          >
            {article.title}
          </motion.h1>

          {/* Metadata */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center justify-center gap-4 text-slate-400"
          >
            {isNewsArticle && (
              <>
                <div className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-purple-400" />
                  <span className="text-purple-300 font-medium">
                    {article.source_name}
                  </span>
                </div>
                <span className="text-slate-600">•</span>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(article.published_at).toLocaleDateString(
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

            {isAIInsight && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(article.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Content Body */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 mb-16"
        >
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-slate-300 leading-relaxed text-lg">
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
          <div className="inline-flex items-center gap-2 text-slate-500 text-sm">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-slate-500" />
            <span>{isAIInsight ? "AI Generated Content" : "Latest News"}</span>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-slate-500" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import {
  Newspaper,
  ExternalLink,
  Clock,
  TrendingUp,
  DollarSign,
} from "lucide-react";

export default function TrendingNewsLayout({ articles, onArticleClick }) {
  if (!articles || articles.length === 0) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-slate-400">No trending news available</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Hero Article Card - Large */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        onClick={() => onArticleClick(articles[0], 0)}
        className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 md:col-span-2 md:row-span-2"
      >
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          {articles[0]?.image_url ? (
            <img
              src={articles[0].image_url || "/placeholder.svg"}
              alt={articles[0].title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-slate-800 flex items-center justify-center">
              <Newspaper className="w-16 h-16 text-slate-600" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 p-8 h-full flex flex-col justify-end">
          <div className="mb-4">
            <span className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm font-semibold border border-purple-400/30">
              <ExternalLink className="w-3 h-3" />
              Featured Story
            </span>
          </div>

          <h1 className="text-2xl lg:text-3xl font-black text-white mb-4 leading-tight group-hover:text-purple-300 transition-colors duration-300">
            {articles[0]?.title}
          </h1>

          <p className="text-slate-300 text-base leading-relaxed mb-6 line-clamp-3">
            {articles[0]?.description || articles[0]?.content}
          </p>

          <div className="flex items-center gap-4 text-sm">
            <span className="text-emerald-400 font-semibold">
              {articles[0]?.source_name}
            </span>
            <span className="text-slate-500">•</span>
            <div className="flex items-center gap-1 text-slate-400">
              <Clock className="w-4 h-4" />
              <span>{formatDate(articles[0]?.published_at)}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Secondary Article Cards - Medium */}
      {articles.slice(1, 3).map((article, index) => (
        <motion.div
          key={article.id || index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
          onClick={() => onArticleClick(article, index + 1)}
          className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 md:col-span-2"
        >
          {/* Card Image */}
          <div className="h-32 relative overflow-hidden">
            {article.image_url ? (
              <img
                src={article.image_url || "/placeholder.svg"}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                <Newspaper className="w-8 h-8 text-slate-600" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* Card Content */}
          <div className="p-6">
            <h3 className="text-lg font-bold text-white mb-3 leading-tight group-hover:text-purple-300 transition-colors duration-300 line-clamp-2">
              {article.title}
            </h3>

            <div className="flex items-center justify-between">
              <span className="text-xs text-emerald-400 font-medium">
                {article.source_name}
              </span>
              <span className="text-xs text-slate-500">
                {formatDate(article.published_at)}
              </span>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Quick Headlines Card - Text Only */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:col-span-2"
      >
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          <h3 className="text-lg font-bold text-white">More Headlines</h3>
        </div>

        <div className="space-y-3">
          {articles.slice(3, 8).map((article, index) => (
            <div
              key={article.id || index}
              onClick={() => onArticleClick(article, index + 3)}
              className="group cursor-pointer"
            >
              <p className="text-slate-300 text-sm leading-relaxed group-hover:text-purple-300 transition-colors duration-200 line-clamp-2">
                • {article.title}
              </p>
              <span className="text-xs text-emerald-400 font-medium">
                {article.source_name}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* In Numbers / Stat Card - Small */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="bg-gradient-to-br from-emerald-500/10 to-purple-500/10 backdrop-blur-xl border border-emerald-400/20 rounded-2xl p-6 md:col-span-2 text-center"
      >
        <div className="flex items-center justify-center mb-3">
          <DollarSign className="w-8 h-8 text-emerald-400" />
        </div>

        <h3 className="text-lg font-bold text-white mb-2">Box Office Buzz</h3>
        <div className="text-3xl font-black text-emerald-400 mb-1">$25M</div>
        <p className="text-slate-400 text-sm">Opening Weekend</p>
      </motion.div>

      {/* Additional Secondary Cards */}
      {articles.slice(8, 12).map((article, index) => (
        <motion.div
          key={article.id || index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: (index + 6) * 0.1 }}
          onClick={() => onArticleClick(article, index + 8)}
          className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
        >
          {/* Card Image */}
          <div className="h-32 relative overflow-hidden">
            {article.image_url ? (
              <img
                src={article.image_url || "/placeholder.svg"}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                <Newspaper className="w-6 h-6 text-slate-600" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* Card Content */}
          <div className="p-4">
            <h3 className="text-sm font-bold text-white mb-2 leading-tight group-hover:text-purple-300 transition-colors duration-300 line-clamp-2">
              {article.title}
            </h3>

            <div className="flex items-center justify-between">
              <span className="text-xs text-emerald-400 font-medium">
                {article.source_name}
              </span>
              <span className="text-xs text-slate-500">
                {formatDate(article.published_at)}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

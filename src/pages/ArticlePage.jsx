"use client";
import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  User,
  Eye,
  Share2,
  Bookmark,
  ArrowLeft,
  Clock,
  Tag,
  Heart,
  MessageCircle,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

const ArticlePage = () => {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [readingTime, setReadingTime] = useState(0);

  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(
          `https://testingcineprismbackend-production.up.railway.app/api/v1/articles/get-article/${slug}`
        );
        const data = await response.json();

        if (response.ok) {
          setArticle(data.article);
          // Calculate reading time (assuming 200 words per minute)
          const wordCount =
            data.article.blocks?.reduce((count, block) => {
              if (block.type === "PARAGRAPH" && block.content.text) {
                return count + block.content.text.split(" ").length;
              }
              return count;
            }, 0) || 0;
          setReadingTime(Math.ceil(wordCount / 200));
        } else {
          setError(data.message || "Article not found");
        }
      } catch (err) {
        setError("Failed to load article");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderContentBlock = (block) => {
    const { type, content } = block;

    switch (type) {
      case "PARAGRAPH":
        return (
          <div className="mb-8">
            {content.hasTitle && content.title && (
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6 leading-tight">
                {content.title}
              </h3>
            )}
            <p className="text-slate-300 leading-relaxed text-lg lg:text-xl font-light tracking-wide">
              {content.text}
            </p>
          </div>
        );

      case "HEADING":
        const HeadingTag = `h${content.level}`;
        const headingClasses = {
          2: "text-3xl lg:text-4xl font-bold text-white mb-8 mt-16 leading-tight",
          3: "text-2xl lg:text-3xl font-semibold text-white mb-6 mt-12 leading-tight",
          4: "text-xl lg:text-2xl font-medium text-white mb-5 mt-10 leading-tight",
        };

        return React.createElement(
          HeadingTag,
          { className: headingClasses[content.level] },
          content.text
        );

      case "IMAGE":
        return (
          <figure className="mb-12 my-16">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <img
                src={content.url}
                alt={content.alt}
                className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
            </div>
            {content.caption && (
              <figcaption className="text-center text-slate-400 mt-6 italic text-base font-light">
                {content.caption}
              </figcaption>
            )}
          </figure>
        );

      case "LIST":
        const ListTag = content.type === "numbered" ? "ol" : "ul";
        const listClasses =
          content.type === "numbered"
            ? "list-decimal list-inside space-y-4 mb-10 text-slate-300 text-lg lg:text-xl font-light"
            : "list-disc list-inside space-y-4 mb-10 text-slate-300 text-lg lg:text-xl font-light";

        return React.createElement(
          ListTag,
          { className: listClasses },
          content.items.map((item, index) =>
            React.createElement(
              "li",
              { key: index, className: "leading-relaxed pl-2" },
              item
            )
          )
        );

      case "QUOTE":
        return (
          <blockquote className="relative border-l-4 border-emerald-500 pl-8 py-8 my-12 bg-slate-900/30 rounded-r-3xl">
            <div className="absolute top-4 left-4 text-emerald-500/20 text-6xl font-serif">
              "
            </div>
            <p className="text-xl lg:text-2xl italic text-slate-200 leading-relaxed font-light mb-4 relative z-10">
              {content.text}
            </p>
            {content.author && (
              <cite className="text-emerald-400 font-medium text-base">
                — {content.author}
              </cite>
            )}
          </blockquote>
        );

      case "DIVIDER":
        return (
          <div className="flex items-center justify-center my-16">
            <div className="flex items-center space-x-4">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
              <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/50"></div>
              <div className="w-24 h-px bg-gradient-to-l from-transparent via-slate-600 to-transparent"></div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-slate-400 text-lg">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Article Not Found
          </h1>
          <p className="text-slate-400 mb-8 text-lg">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-8 py-4 bg-gradient-to-r from-emerald-500/80 to-teal-600/80 hover:from-emerald-500 hover:to-teal-600 text-white rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-emerald-500/20"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!article) return null;

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Ambient Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(16,185,129,0.03),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(139,92,246,0.03),transparent_50%)]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-3 text-slate-400 hover:text-white transition-all duration-300 mb-12 group"
          >
            <div className="p-2 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors duration-300">
              <ArrowLeft
                size={20}
                className="group-hover:-translate-x-1 transition-transform duration-300"
              />
            </div>
            <span className="font-medium">Back to Articles</span>
          </motion.button>

          {/* Article Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-8 leading-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent tracking-tight">
              {article.title}
            </h1>

            <p className="text-xl lg:text-2xl text-slate-300 mb-12 leading-relaxed font-light max-w-4xl mx-auto">
              {article.shortDescription}
            </p>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-8 text-slate-400 mb-8">
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-xl px-5 py-3 rounded-2xl border border-white/10">
                <User size={20} />
                <span className="font-medium text-slate-200">
                  {article.author}
                </span>
              </div>

              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-xl px-5 py-3 rounded-2xl border border-white/10">
                <Calendar size={20} />
                <span className="font-medium text-slate-200">
                  {formatDate(article.publishedAt || article.createdAt)}
                </span>
              </div>

              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-xl px-5 py-3 rounded-2xl border border-white/10">
                <Clock size={20} />
                <span className="font-medium text-slate-200">
                  {readingTime} min read
                </span>
              </div>

              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-xl px-5 py-3 rounded-2xl border border-white/10">
                <Eye size={20} />
                <span className="font-medium text-slate-200">
                  {article.viewCount || 0} views
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-4 lg:gap-6">
              <button className="flex items-center gap-3 px-6 py-4 bg-white/5 backdrop-blur-xl text-slate-300 rounded-2xl hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20 group">
                <Share2
                  size={20}
                  className="group-hover:scale-110 transition-transform duration-300"
                />
                <span className="font-medium">Share</span>
              </button>

              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`flex items-center gap-3 px-6 py-4 backdrop-blur-xl rounded-2xl transition-all duration-300 border group ${
                  isBookmarked
                    ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30"
                    : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:border-white/20"
                }`}
              >
                <Bookmark
                  size={20}
                  className={`group-hover:scale-110 transition-transform duration-300 ${
                    isBookmarked ? "fill-current" : ""
                  }`}
                />
                <span className="font-medium">
                  {isBookmarked ? "Saved" : "Save"}
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Image */}
      {article.mainImageUrl && (
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-20"
        >
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <img
                src={article.mainImageUrl}
                alt={article.title}
                className="w-full h-[50vh] lg:h-[70vh] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          </div>
        </motion.section>
      )}

      {/* Article Content */}
      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="relative"
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-8 pb-20">
          <div className="prose prose-lg prose-invert max-w-none">
            {article.blocks && article.blocks.length > 0 ? (
              article.blocks.map((block, index) => (
                <motion.div
                  key={block.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  {renderContentBlock(block)}
                </motion.div>
              ))
            ) : (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Tag className="w-8 h-8 text-slate-500" />
                </div>
                <p className="text-slate-400 text-xl">
                  No content available for this article.
                </p>
              </div>
            )}
          </div>

          {/* Article Footer */}
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="border-t border-slate-800 pt-16 mt-20"
          >
            <div className="bg-slate-900/30 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-slate-700">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {article.author[0].toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">
                        {article.author}
                      </h3>
                      <p className="text-slate-400">
                        Published on{" "}
                        {formatDate(article.publishedAt || article.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <button className="px-8 py-4 bg-gradient-to-r from-emerald-500/80 to-teal-600/80 hover:from-emerald-500 hover:to-teal-600 text-white rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-emerald-500/20">
                    Follow Author
                  </button>
                  <button className="px-8 py-4 border border-slate-600 text-slate-300 rounded-2xl hover:bg-slate-800/50 hover:border-slate-500 transition-all duration-300 font-medium">
                    More Articles
                  </button>
                </div>
              </div>
            </div>
          </motion.footer>
        </div>
      </motion.article>

      {/* Floating Action Bar - Mobile */}
      <div className="fixed bottom-6 left-6 right-6 lg:hidden z-50">
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-700 rounded-2xl p-4">
          <div className="flex items-center justify-around">
            <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-pink-500 transition-colors">
              <Heart size={20} />
              <span className="text-xs">Like</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-emerald-400 transition-colors">
              <MessageCircle size={20} />
              <span className="text-xs">Comment</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-blue-400 transition-colors">
              <Share2 size={20} />
              <span className="text-xs">Share</span>
            </button>
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`flex flex-col items-center gap-1 transition-colors ${
                isBookmarked
                  ? "text-emerald-400"
                  : "text-slate-400 hover:text-emerald-400"
              }`}
            >
              <Bookmark
                size={20}
                className={isBookmarked ? "fill-current" : ""}
              />
              <span className="text-xs">Save</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;

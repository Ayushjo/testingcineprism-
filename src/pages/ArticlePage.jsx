"use client";
import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, Share2, Bookmark, ArrowLeft, Clock, Tag } from "lucide-react";
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
              <h3 className="text-2xl font-semibold text-white mb-4 leading-tight">
                {content.title}
              </h3>
            )}
            <p className="text-slate-200 leading-[1.8] text-lg font-normal tracking-normal whitespace-pre-wrap">
              {content.text}
            </p>
          </div>
        );

      case "HEADING":
        const HeadingTag = `h${content.level}`;
        const headingClasses = {
          2: "text-3xl font-bold text-white mb-6 mt-12 leading-tight",
          3: "text-2xl font-semibold text-white mb-4 mt-10 leading-tight",
          4: "text-xl font-medium text-white mb-3 mt-8 leading-tight",
        };

        return React.createElement(
          HeadingTag,
          { className: headingClasses[content.level] },
          content.text
        );

      case "IMAGE":
        return (
          <figure className="mb-10 my-12">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={content.url || "/placeholder.svg"}
                alt={content.alt}
                className="w-full h-auto object-cover"
              />
            </div>
            {content.caption && (
              <figcaption className="text-center text-slate-400 mt-4 italic text-sm">
                {content.caption}
              </figcaption>
            )}
          </figure>
        );

      case "LIST":
        const ListTag = content.type === "numbered" ? "ol" : "ul";
        const listClasses =
          content.type === "numbered"
            ? "list-decimal list-inside space-y-3 mb-8 text-slate-200 text-lg"
            : "list-disc list-inside space-y-3 mb-8 text-slate-200 text-lg";

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
          <blockquote className="border-l-4 border-emerald-500 pl-6 py-4 my-8 bg-slate-900/20 rounded-r-lg">
            <p className="text-xl italic text-slate-200 leading-relaxed mb-3">
              {content.text}
            </p>
            {content.author && (
              <cite className="text-emerald-400 font-medium text-sm">
                — {content.author}
              </cite>
            )}
          </blockquote>
        );

      case "DIVIDER":
        return (
          <div className="flex items-center justify-center my-12">
            <div className="w-32 h-px bg-slate-700"></div>
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
      <section className="relative pt-16 pb-12">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200 mb-12"
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {article.title}
            </h1>

            {article.shortDescription && (
              <p className="text-xl text-slate-300 leading-relaxed mb-8 max-w-3xl">
                {article.shortDescription}
              </p>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8 pb-8 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {article.author[0].toUpperCase()}
                </div>
                <div>
                  <div className="text-white font-medium">{article.author}</div>
                  <div className="text-slate-400 text-sm">
                    {formatDate(article.publishedAt || article.createdAt)}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 text-slate-400 text-sm sm:ml-auto">
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{readingTime} min read</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye size={14} />
                  <span>{article.viewCount || 0} views</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-white transition-colors">
                <Share2 size={16} />
                <span className="text-sm">Share</span>
              </button>
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`flex items-center gap-2 px-4 py-2 transition-colors ${
                  isBookmarked
                    ? "text-emerald-400"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                <Bookmark
                  size={16}
                  className={isBookmarked ? "fill-current" : ""}
                />
                <span className="text-sm">
                  {isBookmarked ? "Saved" : "Save"}
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {article.mainImageUrl && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={article.mainImageUrl || "/placeholder.svg"}
                alt={article.title}
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
            </div>
          </div>
        </motion.section>
      )}

      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="relative"
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-8 pb-16">
          <div className="prose prose-lg max-w-none">
            {article.blocks && article.blocks.length > 0 ? (
              article.blocks.map((block, index) => (
                <motion.div
                  key={block.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                >
                  {renderContentBlock(block)}
                </motion.div>
              ))
            ) : (
              <div className="text-center py-16">
                <Tag className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                <p className="text-slate-400">
                  No content available for this article.
                </p>
              </div>
            )}
          </div>

          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="border-t border-slate-800 pt-12 mt-16"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                {article.author[0].toUpperCase()}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {article.author}
              </h3>
              <p className="text-slate-400 mb-6">
                Published on{" "}
                {formatDate(article.publishedAt || article.createdAt)}
              </p>
              <div className="flex items-center justify-center gap-3">
                <button className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors">
                  Follow
                </button>
                <button className="px-6 py-2 border border-slate-600 text-slate-300 hover:bg-slate-800 rounded-lg font-medium transition-colors">
                  More Articles
                </button>
              </div>
            </div>
          </motion.footer>
        </div>
      </motion.article>
    </div>
  );
};

export default ArticlePage;

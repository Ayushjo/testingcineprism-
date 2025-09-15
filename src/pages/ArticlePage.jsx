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
          <div className="mb-6">
            {content.hasTitle && content.title && (
              <h3 className="text-xl font-semibold text-white mb-3 leading-tight">
                {content.title}
              </h3>
            )}
            <p className="text-slate-300 leading-[1.7] text-base font-normal tracking-normal whitespace-pre-wrap">
              {content.text}
            </p>
          </div>
        );

      case "HEADING":
        const HeadingTag = `h${content.level}`;
        const headingClasses = {
          2: "text-2xl font-bold text-white mb-4 mt-8 leading-tight",
          3: "text-xl font-semibold text-white mb-3 mt-6 leading-tight",
          4: "text-lg font-medium text-white mb-2 mt-5 leading-tight",
        };

        return React.createElement(
          HeadingTag,
          { className: headingClasses[content.level] },
          content.text
        );

      case "IMAGE":
        return (
          <figure className="mb-8 my-8">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={content.url || "/placeholder.svg"}
                alt={content.alt}
                className="w-full h-auto object-cover"
              />
            </div>
            {content.caption && (
              <figcaption className="text-center text-slate-400 mt-3 italic text-sm">
                {content.caption}
              </figcaption>
            )}
          </figure>
        );

      case "LIST":
        const ListTag = content.type === "numbered" ? "ol" : "ul";
        const listClasses =
          content.type === "numbered"
            ? "list-decimal list-inside space-y-2 mb-6 text-slate-300 text-base"
            : "list-disc list-inside space-y-2 mb-6 text-slate-300 text-base";

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
          <blockquote className="border-l-4 border-emerald-500 pl-6 py-4 my-6 bg-slate-900/20 rounded-r-lg">
            <p className="text-lg italic text-slate-200 leading-relaxed mb-2">
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
          <div className="flex items-center justify-center my-8">
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
      <section className="relative pt-24 pb-8 ">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              {article.title}
            </h1>

            {article.shortDescription && (
              <p className="text-lg text-slate-300 leading-relaxed mb-6 max-w-3xl">
                {article.shortDescription}
              </p>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 pb-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-emerald-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {article.author[0].toUpperCase()}
                </div>
                <div>
                  <div className="text-white font-medium text-sm">
                    {article.author}
                  </div>
                  <div className="text-slate-400 text-xs">
                    {formatDate(article.publishedAt || article.createdAt)}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 text-slate-400 text-xs sm:ml-auto">
                <div className="flex items-center gap-1">
                  <Clock size={12} />
                  <span>{readingTime} min read</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye size={12} />
                  <span>{article.viewCount || 0} views</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-3 py-2 text-slate-300 hover:text-white transition-colors">
                <Share2 size={14} />
                <span className="text-xs">Share</span>
              </button>
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`flex items-center gap-2 px-3 py-2 transition-colors ${
                  isBookmarked
                    ? "text-emerald-400"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                <Bookmark
                  size={14}
                  className={isBookmarked ? "fill-current" : ""}
                />
                <span className="text-xs">
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
          className="mb-8 w-full"
        >
          <div className="w-full">
            <div className="relative overflow-hidden">
              <img
                src={article.mainImageUrl || "/placeholder.svg"}
                alt={article.title}
                className="w-full h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] object-cover"
                style={{ objectFit: "cover" }}
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
            className="border-t border-slate-800 pt-8 mt-12"
          >
            <div className="text-center">
              <div className="w-14 h-14 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3">
                {article.author[0].toUpperCase()}
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">
                {article.author}
              </h3>
              <p className="text-slate-400 mb-4 text-sm">
                Published on{" "}
                {formatDate(article.publishedAt || article.createdAt)}
              </p>
              <div className="flex items-center justify-center gap-3">
                <button className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors text-sm">
                  Follow
                </button>
                <button className="px-5 py-2 border border-slate-600 text-slate-300 hover:bg-slate-800 rounded-lg font-medium transition-colors text-sm">
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

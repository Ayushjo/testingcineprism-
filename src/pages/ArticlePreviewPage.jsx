"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const renderContentBlock = (block, theme) => {
  const { type, content } = block;

  switch (type) {
    case "PARAGRAPH":
      return (
        <div className="mb-8">
          {content.hasTitle && content.title && (
            <h3 className={`text-2xl font-semibold mb-4 leading-tight ${
              theme === "light" ? "text-black" : "text-white"
            }`}>
              {content.title}
            </h3>
          )}
          <p className={`leading-[1.8] text-lg font-normal tracking-normal whitespace-pre-wrap ${
            theme === "light" ? "text-gray-700" : "text-slate-200"
          }`}>
            {content.text}
          </p>
        </div>
      );

    case "HEADING":
      const HeadingTag = `h${content.level}`;
      const headingClasses = {
        2: `text-3xl font-bold mb-6 mt-12 leading-tight ${
          theme === "light" ? "text-black" : "text-white"
        }`,
        3: `text-2xl font-semibold mb-4 mt-10 leading-tight ${
          theme === "light" ? "text-black" : "text-white"
        }`,
        4: `text-xl font-medium mb-3 mt-8 leading-tight ${
          theme === "light" ? "text-black" : "text-white"
        }`,
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
              src={content.preview || content.url || "/placeholder.svg"}
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
          ? `list-decimal list-inside space-y-3 mb-8 text-lg ${
              theme === "light" ? "text-gray-700" : "text-slate-200"
            }`
          : `list-disc list-inside space-y-3 mb-8 text-lg ${
              theme === "light" ? "text-gray-700" : "text-slate-200"
            }`;

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
        <blockquote className={`border-l-4 pl-6 py-4 my-8 rounded-r-lg ${
          theme === "light"
            ? "border-black/70 bg-gray-100"
            : "border-emerald-500 bg-slate-900/20"
        }`}>
          <p className={`text-xl italic leading-relaxed mb-3 ${
            theme === "light" ? "text-gray-700" : "text-slate-200"
          }`}>
            {content.text}
          </p>
          {content.author && (
            <cite className={`font-medium text-sm ${
              theme === "light" ? "text-black" : "text-emerald-400"
            }`}>
              — {content.author}
            </cite>
          )}
        </blockquote>
      );

    case "DIVIDER":
      return (
        <div className="flex items-center justify-center my-12">
          <div className={`w-32 h-px ${
            theme === "light" ? "bg-gray-300" : "bg-slate-700"
          }`}></div>
        </div>
      );

    default:
      return null;
  }
};

export default function ArticlePreviewPage() {
  const { theme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { article, mainImagePreview, blocks } = location.state || {};

  if (!article) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        theme === "light" ? "bg-white" : "bg-slate-950"
      }`}>
        <div className="text-center">
          <h2 className={`text-2xl font-bold mb-4 ${
            theme === "light" ? "text-black" : "text-white"
          }`}>
            No preview data available
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === "light" ? "bg-white" : "bg-slate-950"
    }`}>
      {/* Preview Banner */}
      <div className="sticky top-0 z-50 bg-amber-500 text-black py-3 px-4 text-center font-medium shadow-lg">
        ⚠️ PREVIEW MODE - This is how your article will look when published
      </div>

      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <button
          onClick={() => navigate(-1)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            theme === "light"
              ? "bg-gray-100 text-black hover:bg-gray-200"
              : "bg-slate-800 text-white hover:bg-slate-700"
          }`}
        >
          <ArrowLeft size={20} />
          Back to Editor
        </button>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Main Image */}
        {mainImagePreview && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 rounded-2xl overflow-hidden shadow-2xl"
          >
            <img
              src={mainImagePreview}
              alt={article.title}
              className="w-full h-auto object-cover"
            />
          </motion.div>
        )}

        {/* Article Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 leading-tight ${
            theme === "light" ? "text-black" : "text-white"
          }`}>
            {article.title}
          </h1>

          {article.shortDescription && (
            <p className={`text-xl mb-6 leading-relaxed ${
              theme === "light" ? "text-gray-600" : "text-slate-400"
            }`}>
              {article.shortDescription}
            </p>
          )}

          <div className={`flex items-center gap-4 text-sm ${
            theme === "light" ? "text-gray-500" : "text-slate-500"
          }`}>
            {article.author && (
              <span className="font-medium">By {article.author}</span>
            )}
            <span>•</span>
            <span>{new Date().toLocaleDateString()}</span>
            {article.published && (
              <>
                <span>•</span>
                <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs">
                  Published
                </span>
              </>
            )}
          </div>
        </motion.header>

        {/* Article Blocks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg max-w-none"
        >
          {blocks && blocks.length > 0 ? (
            blocks.map((block, index) => (
              <div key={block.id || index}>
                {renderContentBlock(block, theme)}
              </div>
            ))
          ) : (
            <p className={`text-center py-12 ${
              theme === "light" ? "text-gray-500" : "text-slate-500"
            }`}>
              No content blocks added yet
            </p>
          )}
        </motion.div>
      </article>
    </div>
  );
}

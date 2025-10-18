"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Save,
  Plus,
  Trash2,
  GripVertical,
  Upload,
  X,
  Type,
  Image,
  List,
  Quote,
  Minus,
  Eye,
} from "lucide-react";
import { useCallback } from "react";
import BlockEditor from "@/components/BlockEditor";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
export default function CreateArticlePage() {
  const [article, setArticle] = useState({
    title: "",
    shortDescription: "",
    author: "",
    published: false,
  });

  const [mainImageFile, setMainImageFile] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState("");
  const [blocks, setBlocks] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitMessage, setSubmitMessage] = useState("");
  const { token } = useAuth();
  const blockTypes = [
    { type: "PARAGRAPH", icon: Type, label: "Paragraph" },
    { type: "HEADING", icon: Type, label: "Heading" },
    { type: "IMAGE", icon: Image, label: "Image" },
    { type: "LIST", icon: List, label: "List" },
    { type: "QUOTE", icon: Quote, label: "Quote" },
    { type: "DIVIDER", icon: Minus, label: "Divider" },
  ];

  const handleInputChange = (field, value) => {
    setArticle((prev) => ({ ...prev, [field]: value }));
    if (submitStatus) {
      setSubmitStatus(null);
      setSubmitMessage("");
    }
  };

  const handleMainImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setMainImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setMainImagePreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const addBlock = (type) => {
    const newBlock = {
      id: crypto.randomUUID(),
      type,
      content: getDefaultContent(type),
      order: blocks.length,
    };
    setBlocks([...blocks, newBlock]);
  };

  const getDefaultContent = (type) => {
    switch (type) {
      case "PARAGRAPH":
        return { text: "", hasTitle: false, title: "" };
      case "HEADING":
        return { text: "", level: 2 };
      case "IMAGE":
        return { file: null, alt: "", caption: "", preview: "" };
      case "LIST":
        return { items: [""], type: "bullet" };
      case "QUOTE":
        return { text: "", author: "" };
      case "DIVIDER":
        return {};
      default:
        return {};
    }
  };

  const removeBlock = (index) => {
    setBlocks(blocks.filter((_, i) => i !== index));
  };

  const handleBlockImageUpload = useCallback((blockIndex, file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setBlocks((prev) => {
        const newBlocks = [...prev];
        newBlocks[blockIndex] = {
          ...newBlocks[blockIndex],
          content: {
            ...newBlocks[blockIndex].content,
            file: file,
            preview: e.target.result,
          },
        };
        return newBlocks;
      });
    };
    reader.readAsDataURL(file);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage("");

    try {
      const formData = new FormData();

      // Basic article data
      formData.append("title", article.title);
      formData.append("shortDescription", article.shortDescription);
      formData.append("author", article.author);
      formData.append("published", article.published.toString());

      // Main image
      if (mainImageFile) {
        formData.append("mainImage", mainImageFile);
      }

      // Process blocks and add block images
      const blocksForBackend = blocks.map((block, index) => {
        if (block.type === "IMAGE" && block.content.file) {
          // Add the image file with specific fieldname
          formData.append(`blockImage_${index}`, block.content.file);

          // Return block without the file object
          return {
            ...block,
            content: {
              alt: block.content.alt,
              caption: block.content.caption,
            },
          };
        }
        return block;
      });

      // Add blocks as JSON string
      formData.append("blocks", JSON.stringify(blocksForBackend));

      const response = await axios.post(
        "https://api.thecineprism.com/api/v1/articles/create-article",
        formData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setSubmitStatus("success");
        setSubmitMessage(
          `Article created successfully! Slug: ${
            response.data.article?.slug || "Unknown"
          }`
        );

        // Reset form
        setArticle({
          title: "",
          shortDescription: "",
          author: "",
          published: false,
        });
        setMainImageFile(null);
        setMainImagePreview("");
        setBlocks([]);
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            Create New Article
          </h1>
          <p className="text-slate-400">
            Write engaging articles for your audience
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
          {/* Article Details */}
          <div className="bg-slate-900/30 backdrop-blur-xl p-6 rounded-xl border border-slate-700 space-y-4">
            <h2 className="text-xl font-semibold text-white mb-4">
              Article Details
            </h2>

            <input
              type="text"
              placeholder="Article Title"
              value={article.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="w-full bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300 text-lg font-medium"
              required
              disabled={isSubmitting}
            />

            <textarea
              placeholder="Short description (for SEO and previews)"
              value={article.shortDescription}
              onChange={(e) =>
                handleInputChange("shortDescription", e.target.value)
              }
              rows={2}
              className="w-full bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300 resize-none"
              required
              disabled={isSubmitting}
            />

            <input
              type="text"
              placeholder="Author"
              value={article.author}
              onChange={(e) => handleInputChange("author", e.target.value)}
              className="w-full bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300"
              required
              disabled={isSubmitting}
            />

            {/* Main Image Upload */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Main Article Image
              </label>
              <div className="border-2 border-dashed border-slate-600 rounded-xl p-6 bg-slate-900/30">
                {mainImagePreview ? (
                  <div className="space-y-3">
                    <img
                      src={mainImagePreview}
                      alt="Main article image"
                      className="max-w-full h-auto rounded-lg border border-slate-600"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setMainImageFile(null);
                        setMainImagePreview("");
                      }}
                      className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm transition-colors"
                    >
                      <X size={16} /> Remove Image
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="mx-auto mb-2 text-slate-400" size={24} />
                    <p className="text-slate-400 mb-2">
                      Upload main article image
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleMainImageUpload}
                      className="hidden"
                      id="main-image-upload"
                      disabled={isSubmitting}
                    />
                    <label
                      htmlFor="main-image-upload"
                      className="inline-block px-4 py-2 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 rounded-lg hover:bg-emerald-500/30 cursor-pointer transition-all duration-200 disabled:opacity-50"
                    >
                      Choose File
                    </label>
                  </div>
                )}
              </div>
            </div>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={article.published}
                onChange={(e) =>
                  handleInputChange("published", e.target.checked)
                }
                className="rounded bg-slate-800 border-slate-600 text-emerald-500 focus:ring-emerald-500/50"
                disabled={isSubmitting}
              />
              <span className="text-slate-300">Publish immediately</span>
            </label>
          </div>

          {/* Content Blocks */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white">
              Article Content
            </h2>

            {blocks.map((block, index) => (
              <motion.div
                key={block.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-900/30 backdrop-blur-xl border border-slate-700 rounded-xl p-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <GripVertical
                      size={16}
                      className="text-slate-400 cursor-move"
                    />
                    <span className="text-sm font-medium text-slate-400 capitalize">
                      {block.type.toLowerCase()}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeBlock(index)}
                    className="text-red-400 hover:text-red-300 p-1 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <BlockEditor
                  block={block}
                  index={index}
                  setBlocks={setBlocks}
                  isSubmitting={isSubmitting}
                  handleBlockImageUpload={handleBlockImageUpload}
                />
              </motion.div>
            ))}

            {/* Add Block Buttons */}
            <div className="border-2 border-dashed border-slate-600 rounded-xl p-6 bg-slate-900/20">
              <p className="text-center text-slate-400 mb-4">
                Add a new content block
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {blockTypes.map(({ type, icon: Icon, label }) => (
                  <motion.button
                    key={type}
                    type="button"
                    onClick={() => addBlock(type)}
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                    className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 text-slate-300 border border-slate-600 rounded-lg hover:bg-slate-700/50 hover:text-white text-sm transition-all duration-200 disabled:opacity-50"
                  >
                    <Icon size={16} />
                    {label}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-8 border-t border-slate-700">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating Article...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Create Article
                </>
              )}
            </motion.button>

            <motion.button
              type="button"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              className="px-6 py-4 bg-slate-800/50 text-slate-300 border border-slate-600 rounded-xl hover:bg-slate-700/50 hover:text-white transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Eye className="w-5 h-5" />
              Preview
            </motion.button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
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
  Loader2,
  RefreshCw,
  ArrowLeft,
} from "lucide-react";
import { useCallback } from "react";
import BlockEditor from "@/components/BlockEditor";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import {
  showSuccessToast,
  showErrorToast,
  showLoadingToast,
  dismissToast,
} from "../utils/toast";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateArticlePage() {
  const [article, setArticle] = useState({
    title: "",
    shortDescription: "",
    author: "",
    published: false,
  });

  const [mainImageFile, setMainImageFile] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState("");
  const [keepMainImage, setKeepMainImage] = useState(true); // NEW: Track if keeping main image
  const [originalMainImageUrl, setOriginalMainImageUrl] = useState(""); // NEW: Store original URL
  const [originalMainImagePublicId, setOriginalMainImagePublicId] =
    useState(""); // NEW: Store publicId

  const [blocks, setBlocks] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // NEW: Loading state
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitMessage, setSubmitMessage] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const { token } = useAuth();
  const navigate = useNavigate();
  const { slug } = useParams(); // Get slug from URL
  const [articleIdForUpdate, setArticleIdForUpdate] = useState(""); // Store actual ID for update

  const blockTypes = [
    { type: "PARAGRAPH", icon: Type, label: "Paragraph" },
    { type: "HEADING", icon: Type, label: "Heading" },
    { type: "IMAGE", icon: Image, label: "Image" },
    { type: "LIST", icon: List, label: "List" },
    { type: "QUOTE", icon: Quote, label: "Quote" },
    { type: "DIVIDER", icon: Minus, label: "Divider" },
  ];

  // NEW: Fetch existing article data
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://api.thecineprism.com/api/v1/articles/get-article/${slug}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const articleData = response.data.article;

        // Store the article ID for update endpoint
        setArticleIdForUpdate(articleData.id);

        // Set article metadata
        setArticle({
          title: articleData.title,
          shortDescription: articleData.shortDescription,
          author: articleData.author,
          published: articleData.published,
        });

        // Set main image
        if (articleData.mainImageUrl) {
          setMainImagePreview(articleData.mainImageUrl);
          setOriginalMainImageUrl(articleData.mainImageUrl);
          setOriginalMainImagePublicId(articleData.mainImagePublicId || "");
          setKeepMainImage(true);
        }

        // Set blocks with existing data
        const existingBlocks = articleData.blocks.map((block) => ({
          id: block.id, // Keep original DB ID
          type: block.type,
          content: {
            ...block.content,
            // For IMAGE blocks, add tracking fields
            ...(block.type === "IMAGE" && {
              preview: block.content.url, // Show existing image
              url: block.content.url, // Add url field for keeping existing
              file: null, // No new file initially
              hasNewUpload: false,
              keepExisting: true,
              publicId: block.content.publicId || block.publicId || "",
            }),
          },
          order: block.order,
          isNew: false, // Mark as existing block
        }));

        setBlocks(existingBlocks);
      } catch (error) {
        console.error("Error fetching article:", error);
        showErrorToast(
          error.response?.data?.message || "Failed to load article"
        );
        navigate("/admin/articles"); // Redirect on error
      } finally {
        setIsLoading(false);
      }
    };

    if (slug && token) {
      fetchArticle();
    }
  }, [slug, token, navigate]);

  const handleInputChange = (field, value) => {
    setArticle((prev) => ({ ...prev, [field]: value }));
    if (submitStatus) {
      setSubmitStatus(null);
      setSubmitMessage("");
    }
  };

  // UPDATED: Handle main image replacement
  const handleMainImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setMainImageFile(file);
    setKeepMainImage(false); // Mark as replacing
    const reader = new FileReader();
    reader.onload = (e) => setMainImagePreview(e.target.result);
    reader.readAsDataURL(file);
  };

  // NEW: Revert to original main image
  const revertMainImage = () => {
    setMainImageFile(null);
    setMainImagePreview(originalMainImageUrl);
    setKeepMainImage(true);
  };

  const addBlock = (type) => {
    const newBlock = {
      id: crypto.randomUUID(),
      type,
      content: getDefaultContent(type),
      order: blocks.length,
      isNew: true, // NEW: Mark as new block
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
        return {
          file: null,
          alt: "",
          caption: "",
          preview: "",
          hasNewUpload: false,
          keepExisting: false,
          publicId: "",
        };
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

  // UPDATED: Handle block image upload (for both new and replacement)
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
            hasNewUpload: true, // Mark as new upload
            keepExisting: false, // Not keeping old image
          },
        };
        return newBlocks;
      });
    };
    reader.readAsDataURL(file);
  }, []);

  // NEW: Revert block image to original
  const revertBlockImage = (blockIndex) => {
    setBlocks((prev) => {
      const newBlocks = [...prev];
      const block = newBlocks[blockIndex];

      if (block.type === "IMAGE" && !block.isNew) {
        // Revert to original URL
        newBlocks[blockIndex] = {
          ...block,
          content: {
            ...block.content,
            file: null,
            hasNewUpload: false,
            keepExisting: true,
          },
        };
      }
      return newBlocks;
    });
  };

  const handlePreview = () => {
    navigate("/admin/article-preview", {
      state: {
        article,
        mainImagePreview,
        blocks,
        isUpdate: true, // Flag for preview
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Show confirmation dialog
    if (!showConfirmDialog) {
      setShowConfirmDialog(true);
      return;
    }

    setShowConfirmDialog(false);
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

      // Main image handling
      formData.append("keepMainImage", keepMainImage.toString());
      if (mainImageFile && !keepMainImage) {
        formData.append("mainImage", mainImageFile);
      }

      // Collect publicIds to keep
      const keepImagePublicIds = [];

      // Add main image publicId if keeping it
      if (keepMainImage && originalMainImagePublicId) {
        keepImagePublicIds.push(originalMainImagePublicId);
      }

      // Process blocks and collect image publicIds
      const blocksForBackend = blocks.map((block, index) => {
        if (block.type === "IMAGE") {
          // If has new upload, add file to FormData
          if (block.content.file && block.content.hasNewUpload) {
            formData.append(`blockImage_${index}`, block.content.file);

            // Return block without file object
            return {
              type: block.type,
              content: {
                alt: block.content.alt || "",
                caption: block.content.caption || "",
                hasNewUpload: true,
                keepExisting: false,
                publicId: block.content.publicId, // Old publicId (for deletion tracking)
              },
              order: index,
              isNew: block.isNew,
            };
          } else {
            // Keeping existing image
            if (block.content.publicId && block.content.keepExisting) {
              keepImagePublicIds.push(block.content.publicId);
            }

            return {
              type: block.type,
              content: {
                url: block.content.url || block.content.preview,
                publicId: block.content.publicId,
                alt: block.content.alt || "",
                caption: block.content.caption || "",
                keepExisting: true,
              },
              order: index,
              isNew: block.isNew,
            };
          }
        }

        // Non-image blocks
        return {
          type: block.type,
          content: block.content,
          order: index,
          isNew: block.isNew,
        };
      });

      // Add blocks and keepImagePublicIds as JSON strings
      formData.append("blocks", JSON.stringify(blocksForBackend));
      formData.append("keepImagePublicIds", JSON.stringify(keepImagePublicIds));

      const loadingToastId = showLoadingToast("Updating article...");

      const response = await axios.post(
        `https://api.thecineprism.com/api/v1/articles/update-article/${articleIdForUpdate}`,
        formData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const successMsg = `Article updated successfully!`;
        setSubmitStatus("success");
        setSubmitMessage(successMsg);
        dismissToast(loadingToastId);
        showSuccessToast(successMsg);

        // Redirect to article view or list
        setTimeout(() => {
          navigate(`/articles/${response.data.article.slug}`);
        }, 1500);
      }
    } catch (error) {
      console.error("Submit error:", error);
      const errorMsg =
        error.response?.data?.message ||
        "Network error. Please check your connection and try again.";
      setSubmitStatus("error");
      setSubmitMessage(errorMsg);
      showErrorToast(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-emerald-500 animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading article...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-md w-full shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-white mb-3">
              Confirm Article Update
            </h3>
            <p className="text-slate-300 mb-6">
              Are you sure you want to update this article? This will replace
              the existing content.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="flex-1 px-4 py-3 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-4 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors font-medium"
              >
                Yes, Update Article
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            Back
          </button>
          <h1 className="text-4xl font-bold text-white mb-2">Update Article</h1>
          <p className="text-slate-400">Edit and update your article content</p>
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

            {/* Main Image Upload - UPDATED for replace/keep */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Main Article Image
              </label>
              <div className="border-2 border-dashed border-slate-600 rounded-xl p-6 bg-slate-900/30">
                {mainImagePreview ? (
                  <div className="space-y-3">
                    <div className="relative">
                      <img
                        src={mainImagePreview}
                        alt="Main article image"
                        className="max-w-full h-auto rounded-lg border border-slate-600"
                      />
                      {!keepMainImage && (
                        <span className="absolute top-2 right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded">
                          NEW
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleMainImageUpload}
                        className="hidden"
                        id="main-image-replace"
                        disabled={isSubmitting}
                      />
                      <label
                        htmlFor="main-image-replace"
                        className="flex items-center gap-2 px-3 py-2 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 rounded-lg hover:bg-emerald-500/30 cursor-pointer transition-all text-sm"
                      >
                        <RefreshCw size={14} /> Replace Image
                      </label>
                      {!keepMainImage && (
                        <button
                          type="button"
                          onClick={revertMainImage}
                          className="flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-slate-300 text-sm transition-colors"
                        >
                          <X size={14} /> Revert to Original
                        </button>
                      )}
                    </div>
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
                      className="inline-block px-4 py-2 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 rounded-lg hover:bg-emerald-500/30 cursor-pointer transition-all duration-200"
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
              <span className="text-slate-300">Published</span>
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
                className="bg-slate-900/30 backdrop-blur-xl border border-slate-700 rounded-xl p-4 relative"
              >
                {block.isNew && (
                  <span className="absolute top-2 right-2 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded">
                    NEW
                  </span>
                )}
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
                  revertBlockImage={revertBlockImage}
                  isUpdate={true}
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
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Updating Article...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Update Article
                </>
              )}
            </motion.button>

            <motion.button
              type="button"
              onClick={handlePreview}
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

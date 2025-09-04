import { useState, useEffect, useRef } from "react";
import {
  Share,
  X,
  Copy,
  MessageCircle,
  Send,
  Mail,
  Facebook,
  Linkedin,
  Link,
  Check,
  Twitter,
} from "lucide-react";

const BACKEND_BASE_URL =
  "https://testingcineprismbackend-production.up.railway.app";

// Social Media Share Component
const SharePopup = ({ isOpen, onClose, url, title, description, postId }) => {
  const [copied, setCopied] = useState(false);
  const popupRef = useRef(null);

  // Use backend URL for social media sharing (has meta tags)
  const shareableUrl = postId ? `${BACKEND_BASE_URL}/post/${postId}` : url;

  // Use frontend URL for copying (better UX)
  const copyUrl = url;

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Close popup on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(copyUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const shareOptions = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      color: "bg-green-500 hover:bg-green-600",
      url: `https://wa.me/?text=${encodeURIComponent(
        `${title}\n\n${description}\n\n${shareableUrl}`
      )}`,
    },
    {
      name: "Telegram",
      icon: Send,
      color: "bg-blue-500 hover:bg-blue-600",
      url: `https://t.me/share/url?url=${encodeURIComponent(
        shareableUrl
      )}&text=${encodeURIComponent(`${title}\n\n${description}`)}`,
    },
    {
      name: "Twitter",
      icon: Twitter,
      color: "bg-black hover:bg-gray-800",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        `${title}\n\n${description}`
      )}&url=${encodeURIComponent(shareableUrl)}`,
    },
    {
      name: "Facebook",
      icon: Facebook,
      color: "bg-blue-600 hover:bg-blue-700",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareableUrl
      )}`,
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "bg-blue-700 hover:bg-blue-800",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        shareableUrl
      )}`,
    },
    {
      name: "Email",
      icon: Mail,
      color: "bg-gray-600 hover:bg-gray-700",
      url: `mailto:?subject=${encodeURIComponent(
        title
      )}&body=${encodeURIComponent(
        `Check out this movie review:\n\n${title}\n\n${description}\n\n${shareableUrl}`
      )}`,
    },
  ];

  const handleShare = (shareUrl) => {
    window.open(shareUrl, "_blank", "width=600,height=400");
    onClose();
  };

  // Handle native sharing if available
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description,
          url: shareableUrl,
        });
        onClose();
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error sharing:", error);
        }
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div
        ref={popupRef}
        className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-md transform transition-all duration-300 scale-100 opacity-100"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">
            Share this review
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Copy Link Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 bg-slate-800 border border-slate-600 rounded-lg p-3">
            <Link className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <input
              type="text"
              value={copyUrl}
              readOnly
              className="flex-1 bg-transparent text-slate-300 text-sm outline-none"
            />
            <button
              onClick={copyToClipboard}
              className={`px-3 py-1 rounded text-xs font-medium transition-all duration-200 flex items-center gap-1 ${
                copied
                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                  : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30"
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>

        {/* Native Share Button (if supported) */}
        {navigator.share && (
          <div className="mb-4">
            <button
              onClick={handleNativeShare}
              className="w-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 p-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 font-medium"
            >
              <Share className="w-4 h-4" />
              Share via Device
            </button>
          </div>
        )}

        {/* Social Media Options */}
        <div className="grid grid-cols-2 gap-3">
          {shareOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <button
                key={option.name}
                onClick={() => handleShare(option.url)}
                className={`${option.color} text-white p-4 rounded-xl transition-all duration-200 flex items-center gap-3 hover:scale-105 hover:shadow-lg`}
              >
                <IconComponent className="w-5 h-5" />
                <span className="font-medium">{option.name}</span>
              </button>
            );
          })}
        </div>

        {/* Additional Info */}
        <p className="text-xs text-slate-500 text-center mt-4">
          Share "{title}" with your friends
        </p>
      </div>
    </div>
  );
};

// Enhanced Share Button Component
export const ShareButton = ({ url, title, description, postId }) => {
  const [showSharePopup, setShowSharePopup] = useState(false);

  const handleShareClick = () => {
    setShowSharePopup(true);
  };

  return (
    <>
      <button
        onClick={handleShareClick}
        className="flex items-center gap-2 sm:gap-3 text-slate-400 hover:text-emerald-400 transition-all duration-300 group flex-shrink-0"
      >
        <div className="p-1.5 sm:p-2 rounded-xl bg-white/5 group-hover:bg-emerald-500/10 transition-colors duration-300">
          <Share className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div className="flex flex-col items-start">
          <span className="font-bold text-base sm:text-lg">Share</span>
          <span className="text-xs sm:text-sm text-slate-500">
            <span className="hidden sm:inline">Spread the word</span>
            <span className="sm:hidden">📤</span>
          </span>
        </div>
      </button>

      <SharePopup
        isOpen={showSharePopup}
        onClose={() => setShowSharePopup(false)}
        url={url}
        title={title}
        description={description}
        postId={postId}
      />
    </>
  );
};

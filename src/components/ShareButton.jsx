import React, { useState } from "react";
import {
  Share2,
  Copy,
  Check,
  Facebook,
  Twitter,
  MessageCircle,
} from "lucide-react";

const ShareButton = ({ title, text, url, className = "" }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: text,
          url: url,
        });
        setShowDropdown(false);
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      setShowDropdown(!showDropdown);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setShowDropdown(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const shareToFacebook = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`;
    window.open(fbUrl, "_blank", "width=600,height=400");
    setShowDropdown(false);
  };

  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, "_blank", "width=600,height=400");
    setShowDropdown(false);
  };

  const shareToWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
      `${text} ${url}`
    )}`;
    window.open(whatsappUrl, "_blank");
    setShowDropdown(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={handleNativeShare}
        className="flex items-center gap-2 sm:gap-3 text-slate-400 hover:text-emerald-400 transition-all duration-300 group flex-shrink-0"
      >
        <div className="p-1.5 sm:p-2 rounded-xl bg-white/5 group-hover:bg-emerald-500/10 transition-colors duration-300">
          <Share2 className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div className="flex flex-col items-start">
          <span className="font-bold text-base sm:text-lg">Share</span>
          <span className="text-xs sm:text-sm text-slate-500">Article</span>
        </div>
      </button>

      {/* Dropdown for non-native share */}
      {showDropdown && !navigator.share && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowDropdown(false)}
          />
          <div className="absolute top-full right-0 mt-2 w-56 bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden">
            <div className="p-2">
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center gap-3 px-3 py-3 text-left text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-200"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">
                  {copied ? "Copied!" : "Copy Link"}
                </span>
              </button>

              <button
                onClick={shareToFacebook}
                className="w-full flex items-center gap-3 px-3 py-3 text-left text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-200"
              >
                <Facebook className="w-4 h-4" />
                <span className="text-sm font-medium">Facebook</span>
              </button>

              <button
                onClick={shareToTwitter}
                className="w-full flex items-center gap-3 px-3 py-3 text-left text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-200"
              >
                <Twitter className="w-4 h-4" />
                <span className="text-sm font-medium">Twitter</span>
              </button>

              <button
                onClick={shareToWhatsApp}
                className="w-full flex items-center gap-3 px-3 py-3 text-left text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm font-medium">WhatsApp</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ShareButton;

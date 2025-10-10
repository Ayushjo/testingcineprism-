// src/components/OptimizedImage.jsx
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className = "",
  effect = "blur",
  aspectRatio = null,
  onClick,
  style = {},
}) => {
  // Optimize TMDB image URLs and handle various image sources
  const getOptimizedUrl = (path) => {
    if (!path) return "/placeholder.jpg";

    // If it's already a full URL (local import, cloudinary, etc.), return as-is
    if (path.startsWith('http') || path.startsWith('/') || path.startsWith('data:')) {
      return path;
    }

    // Only optimize TMDB URLs
    if (path.includes('tmdb.org')) {
      return path;
    }

    // Assume it's a TMDB path if it starts with /
    const size =
      width <= 200
        ? "w200"
        : width <= 342
        ? "w342"
        : width <= 500
        ? "w500"
        : width <= 780
        ? "w780"
        : "original";

    return `https://image.tmdb.org/t/p/${size}${path}`;
  };

  const imgStyle = {
    ...style,
    ...(aspectRatio && { aspectRatio }),
  };

  if (priority) {
    // Don't lazy load priority images (above the fold)
    return (
      <img
        src={getOptimizedUrl(src)}
        alt={alt}
        width={width}
        height={height}
        loading="eager"
        fetchPriority="high"
        className={className}
        onClick={onClick}
        style={imgStyle}
      />
    );
  }

  return (
    <LazyLoadImage
      src={getOptimizedUrl(src)}
      alt={alt}
      width={width}
      height={height}
      effect={effect}
      className={className}
      onClick={onClick}
      style={imgStyle}
      placeholderSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 600'%3E%3Crect fill='%231a1a1a' width='400' height='600'/%3E%3C/svg%3E"
    />
  );
};

export default OptimizedImage;

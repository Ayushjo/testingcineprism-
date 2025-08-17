"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, Calendar, Tag, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const ReviewCardsWithFocus = ({ filteredReviews }) => {
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {filteredReviews.map((review, index) => (
        <motion.article
          key={review.id || review.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => {
            navigate(`/post/${review.id}`);
          }}
          className={cn(
            "group relative aspect-[5/4] sm:aspect-[4/3] lg:aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 ease-out",
            hovered !== null &&
              hovered !== index &&
              "blur-sm scale-[0.98] opacity-70"
          )}
        >
          <img
            src={review.image || "/placeholder.svg"}
            alt={review.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              e.target.src =
                "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMUUyOTNGIi8+CjxwYXRoIGQ9Ik0xNzUgMTIwSDE3MFYxNjBIMTc1VjEyMFpNMjMwIDEyMEgyMjVWMTYwSDIzMFYxMjBaTTIwMCAxODBDMTgzLjQzMiAxODAgMTcwIDE2Ni41NjggMTcwIDE1MEMxNzAgMTMzLjQzMiAxODMuNDMyIDEyMCAyMDAgMTIwQzIxNi41NjggMTIwIDIzMCAxMzMuNDMyIDIzMCAxNTBDMjMwIDE2Ni41NjggMjE2LjU2OCAxODAgMjAwIDE4MFoiIGZpbGw9IiM0RjQ2RTUiLz4KPHBhdGggZD0iTTIwMCAxNDBDMjA4LjI4NCAxNDAgMjE1IDE0Ni43MTYgMjE1IDE1NUMyMTUgMTYzLjI4NCAyMDguMjg0IDE3MCAyMDAgMTcwQzE5MS43MTYgMTcwIDE4NSAxNjMuMjg0IDE4NSAxNTVDMTg1IDE0Ni43MTYgMTkxLjcxNiAxNDAgMjAwIDE0MFoiIGZpbGw9IiM5QTgyRkIiLz4KPC9zdmc+";
            }}
          />

          {/* Enhanced gradient overlay - more prominent when hovered */}
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-t transition-all duration-300",
              hovered === index
                ? "from-black/95 via-black/60 to-black/30"
                : "from-black/90 via-black/50 to-black/20 sm:from-black/80 sm:via-black/40 sm:to-transparent"
            )}
          />

          <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
            <div className="flex items-center gap-1 bg-black/70 backdrop-blur-xl px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl sm:rounded-2xl border border-white/20">
              <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
              <span className="text-white font-semibold text-xs sm:text-sm">
                {review.rating}
              </span>
            </div>
          </div>

          {/* Content with enhanced hover state */}
          <div
            className={cn(
              "relative h-full flex flex-col justify-end p-5 sm:p-6 lg:p-8 transition-all duration-300",
              hovered === index && "transform translate-y-0"
            )}
          >
            <div>
              <h2
                className={cn(
                  "font-bold text-white mb-2 sm:mb-2 tracking-tight transition-all duration-300 leading-tight",
                  hovered === index
                    ? "text-2xl sm:text-3xl text-emerald-300"
                    : "text-xl sm:text-2xl group-hover:text-emerald-300"
                )}
              >
                {review.title}
              </h2>

              <div
                className={cn(
                  "flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-slate-300 mb-3 sm:mb-4 transition-all duration-300",
                  hovered === index && "text-slate-200"
                )}
              >
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>{review.year}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="truncate">{review.genre}</span>
                </div>
              </div>

              <p
                className={cn(
                  "text-slate-300 leading-relaxed mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-2 text-sm sm:text-base transition-all duration-300",
                  hovered === index && "text-slate-200 line-clamp-3"
                )}
              >
                {review.review}
              </p>

              <motion.button
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "group/btn inline-flex items-center gap-2 font-semibold transition-all duration-300 text-sm sm:text-base",
                  hovered === index
                    ? "text-emerald-300"
                    : "text-emerald-400 hover:text-emerald-300"
                )}
              >
                Read Full Review
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </div>

          {/* Enhanced focus indicator */}
          <div
            className={cn(
              "absolute inset-0 rounded-2xl sm:rounded-3xl transition-all duration-300 pointer-events-none",
              hovered === index
                ? "ring-2 ring-emerald-400/50 shadow-2xl shadow-emerald-400/20"
                : ""
            )}
          />
        </motion.article>
      ))}
    </div>
  );
};

export default ReviewCardsWithFocus;

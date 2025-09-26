import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Camera,
  Film,
  Users,
  BookOpen,
  Palette,
  Lightbulb,
  Compass,
  Star,
  Calendar,
  Tag,
  ArrowRight,
  Eye,
  User,
} from "lucide-react";
import axios from "axios";

const ArticleSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // API call to fetch articles
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await axios.get(
          "https://testingcineprismbackend-production.up.railway.app/api/v1/articles/get-articles",
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = response.data;
        console.log("API Response:", data);

        if (data.articles && Array.isArray(data.articles)) {
          // Take only the first 6 articles for the section
          setArticles(data.articles.slice(0, 6));
        } else {
          console.warn("Unexpected API response format:", data);
          setArticles([]);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);

        if (error.response?.status === 404) {
          setError("Articles not found.");
        } else if (error.response?.status >= 500) {
          setError("Server error. Please try again later.");
        } else if (error.request) {
          setError("Network error. Please check your connection.");
        } else {
          setError("Failed to load articles. Please try again.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  // Dynamic grid class based on article count
  const getGridClass = (index, totalCount) => {
    if (totalCount === 1) return "md:col-span-3";
    if (totalCount === 2) return "md:col-span-1";
    if (totalCount === 3) return "md:col-span-1";
    if (totalCount === 4) {
      return index < 2 ? "md:col-span-1" : "md:col-span-1";
    }
    if (totalCount === 5) {
      return index < 3 ? "md:col-span-1" : "md:col-span-1";
    }
    if (totalCount >= 6) {
      // First 3 articles get single columns, 4th gets double, last two get single
      if (index === 3) return "md:col-span-2";
      return "md:col-span-1";
    }
    return "md:col-span-1";
  };

  // Loading state
  if (isLoading) {
    return (
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.04),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.04),transparent_50%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <span className="bg-white/5 backdrop-blur-xl text-purple-400 px-4 py-2 rounded-2xl text-sm font-semibold border border-white/10">
                📚 Latest Articles
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent tracking-tight">
              Cinema Insights
            </h2>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.04),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.04),transparent_50%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <span className="bg-white/5 backdrop-blur-xl text-purple-400 px-4 py-2 rounded-2xl text-sm font-semibold border border-white/10">
                📚 Latest Articles
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent tracking-tight">
              Cinema Insights
            </h2>
          </div>

          <div className="text-center">
            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8 max-w-md mx-auto">
              <h3 className="text-xl font-bold text-red-400 mb-4">
                Error Loading Articles
              </h3>
              <p className="text-slate-400">{error}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.04),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.04),transparent_50%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-6">
            <span className="bg-white/5 backdrop-blur-xl text-purple-400 px-4 py-2 rounded-2xl text-sm font-semibold border border-white/10">
              📚 Latest Articles
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent tracking-tight">
            Cinema Insights
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Deep dives into the art, craft, and culture of filmmaking
          </p>
        </motion.div>

        {articles.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto"
          >
            {articles.map((article, index) => (
              <motion.div
                key={article.id || `article-${index}`}
                variants={itemVariants}
                className={`${getGridClass(
                  index,
                  articles.length
                )} relative group block p-2 h-full w-full`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.span
                      className="absolute inset-0 h-full w-full bg-slate-800/[0.8] block rounded-3xl"
                      layoutId="hoverBackground"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        transition: { duration: 0.15 },
                      }}
                      exit={{
                        opacity: 0,
                        transition: { duration: 0.15, delay: 0.2 },
                      }}
                    />
                  )}
                </AnimatePresence>

                <motion.article className="group relative h-80 rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer border border-transparent hover:border-slate-700 z-20">
                  <img
                    src={article.mainImageUrl || "/placeholder.svg"}
                    alt={article.title || "Article"}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src =
                        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMUUyOTNGIi8+CjxwYXRoIGQ9Ik0xNzUgMTIwSDE3MFYxNjBIMTc1VjEyMFpNMjMwIDEyMEgyMjVWMTYwSDIzMFYxMjBaTTIwMCAxODBDMTgzLjQzMiAxODAgMTcwIDE2Ni41NjggMTcwIDE1MEMxNzAgMTMzLjQzMiAxODMuNDMyIDEyMCAyMDAgMTIwQzIxNi41NjggMTIwIDIzMCAxMzMuNDMyIDIzMCAxNTBDMjMwIDE2Ni41NjggMjE2LjU2OCAxODAgMjAwIDE4MFoiIGZpbGw9IiM0RjQ2RTUiLz4KPHBhdGggZD0iTTIwMCAxNDBDMjA4LjI4NCAxNDAgMjE1IDE0Ni43MTYgMjE1IDE1NUMyMTUgMTYzLjI4NCAyMDguMjg0IDE3MCAyMDAgMTcwQzE5MS43MTYgMTcwIDE4NSAxNjMuMjg0IDE4NSAxNTVDMTg1IDE0Ni43MTYgMTkxLjcxNiAxNDAgMjAwIDE0MFoiIGZpbGw9IiM5QTgyRkIiLz4KPC9zdmc+";
                    }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 sm:from-black/80 sm:via-black/40 sm:to-transparent" />

                  <div className="relative h-full flex flex-col justify-end p-4 sm:p-5 lg:p-6 z-50">
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2 tracking-tight group-hover:text-emerald-300 transition-colors duration-300 leading-tight">
                        {article.title || "Untitled Article"}
                      </h2>

                      <div className="flex items-center gap-2 sm:gap-3 text-xs text-slate-300 mb-2 sm:mb-3 flex-wrap">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>
                            {new Date(
                              article.publishedAt ||
                                article.createdAt ||
                                Date.now()
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          <span className="truncate">
                            {article.author || "Unknown Author"}
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <span>
                            {(article.viewCount || 0) >= 1000
                              ? `${((article.viewCount || 0) / 1000).toFixed(
                                  1
                                )}k`
                              : article.viewCount || 0}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-end gap-3">
                        <p className="text-slate-300 leading-relaxed line-clamp-2 text-sm flex-1">
                          {article.shortDescription ||
                            "No description available"}
                        </p>

                        <motion.button
                          whileHover={{ scale: 1.1, x: 3 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center justify-center w-8 h-8 bg-emerald-500/20 hover:bg-emerald-500/30 rounded-full transition-all duration-300 group/btn flex-shrink-0"
                          onClick={() =>
                            (window.location.href = `/articles/${
                              article.slug || article.id
                            }`)
                          }
                        >
                          <ArrowRight className="w-4 h-4 text-emerald-400 group-hover/btn:text-emerald-300" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <div className="text-slate-400 text-lg">
              No articles available at the moment.
            </div>
          </motion.div>
        )}

        {/* View All Articles Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <button
            className="group inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl hover:bg-white/10 text-white px-8 py-4 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 font-medium"
            onClick={() => (window.location.href = "/articles")}
          >
            <span>View All Articles</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ArticleSection;

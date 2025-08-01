"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";

export default function MerchandisePage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setEmail("");

    // Reset success state after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden flex items-center justify-center pt-20">
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Slow-moving ambient glows */}
        <motion.div
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -100, 50, 0],
          }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 60, 0],
            y: [0, 80, -40, 0],
          }}
          transition={{
            duration: 35,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 60, -80, 0],
            y: [0, -60, 80, 0],
          }}
          transition={{
            duration: 40,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/3 rounded-full blur-3xl"
        />
      </div>

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section 1: Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-16"
        >
          {/* --- CHANGE: Updated heading style for a cleaner, more elegant look --- */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none">
            The Collection
          </h1>
        </motion.div>

        {/* Section 2: Teaser Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="mb-16 relative group" // Added group for hover effects
        >
          {/* Main Product Image Container */}
          <div className="relative max-w-2xl mx-auto">
            {/* --- CHANGE: Added hover shadow effect --- */}
            <div className="aspect-[4/3] relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-slate-700/50 transition-shadow duration-500">
              {/* Placeholder for atmospheric product photo */}
              <div className="w-full h-full bg-gradient-to-br from-slate-800 via-slate-900 to-black flex items-center justify-center relative">
                {/* Simulated product mockup - black notebook corner */}
                <div className="relative">
                  <div className="w-80 h-60 bg-black rounded-lg shadow-2xl transform rotate-12 relative overflow-hidden">
                    {/* Notebook texture */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-800" />

                    {/* Subtle embossed logo area */}
                    <div className="absolute bottom-8 right-8 w-16 h-16 bg-slate-800/30 rounded-full flex items-center justify-center">
                      <div className="w-8 h-8 border border-slate-700/50 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-slate-600/50 rounded-full" />
                      </div>
                    </div>

                    {/* Leather-like texture lines */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-4 left-4 right-4 h-px bg-slate-700" />
                      <div className="absolute top-8 left-4 right-4 h-px bg-slate-700" />
                      <div className="absolute bottom-16 left-4 right-4 h-px bg-slate-700" />
                    </div>
                  </div>

                  {/* Dramatic lighting effect */}
                  <div className="absolute -top-20 -left-20 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />
                </div>
              </div>
              {/* Overlay gradient for mystery */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/40" />
            </div>

            {/* --- CHANGE: Added subtle greyish highlight on hover --- */}
            <div
              className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at center, transparent 60%, rgba(203, 213, 225, 0.04))",
              }}
            />
          </div>
        </motion.div>

        {/* Section 3: Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mb-16"
        >
          <p className="text-xl md:text-2xl text-slate-400 tracking-[0.2em] font-light leading-relaxed">
            Curated for the true cinephile. Coming Fall 2025.
          </p>
        </motion.div>

        {/* Section 4: Email Notification Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="max-w-md mx-auto"
        >
          {/* Instructional Text */}
          <p className="text-sm text-slate-500 mb-6 tracking-wide">
            Be the first to know.
          </p>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="flex gap-3">
            <div className="flex-1 relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                required
                disabled={isSubmitting || isSubmitted}
                className="w-full pl-12 pr-4 py-4 bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-full text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400/50 focus:bg-slate-800/70 transition-all duration-300 disabled:opacity-50"
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting || isSubmitted}
              whileHover={{ scale: isSubmitting || isSubmitted ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting || isSubmitted ? 1 : 0.98 }}
              className="group bg-transparent hover:bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:border-emerald-400/50 px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px] justify-center"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin" />
              ) : isSubmitted ? (
                <>
                  <div className="w-5 h-5 border-2 border-emerald-400 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                  </div>
                  <span>Subscribed</span>
                </>
              ) : (
                <>
                  <span>Notify Me</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>
          </form>

          {/* Success Message */}
          {isSubmitted && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-emerald-400 text-sm mt-4 text-center"
            >
              You'll be the first to know when we launch.
            </motion.p>
          )}
        </motion.div>

        {/* Subtle Footer Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="mt-20"
        >
          <p className="text-xs text-slate-600 tracking-wider">
            Quality. Craftsmanship. Cinema.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

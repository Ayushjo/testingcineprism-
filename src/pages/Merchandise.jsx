"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function MerchandisePage() {
  const { theme } = useTheme();
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
    <div className={`min-h-screen relative overflow-hidden flex items-center justify-center pt-20 transition-colors duration-300 ${
      theme === "light"
        ? "bg-white text-black"
        : "bg-slate-950 text-white"
    }`}>
      {/* Ambient Background Effects - Optimized with CSS animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <style jsx>{`
          @keyframes ambient1 {
            0%, 100% { transform: translate(0, 0); }
            33% { transform: translate(100px, -100px); }
            66% { transform: translate(-50px, 50px); }
          }
          @keyframes ambient2 {
            0%, 100% { transform: translate(0, 0); }
            33% { transform: translate(-80px, 80px); }
            66% { transform: translate(60px, -40px); }
          }
          @keyframes ambient3 {
            0%, 100% { transform: translate(0, 0); }
            33% { transform: translate(60px, -60px); }
            66% { transform: translate(-80px, 80px); }
          }
          .ambient-glow-1 {
            animation: ambient1 30s linear infinite;
            will-change: transform;
          }
          .ambient-glow-2 {
            animation: ambient2 35s linear infinite;
            will-change: transform;
          }
          .ambient-glow-3 {
            animation: ambient3 40s linear infinite;
            will-change: transform;
          }
        `}</style>
        {/* Reduced blur from blur-3xl to blur-2xl for better performance */}
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-2xl ambient-glow-1 ${
          theme === "light" ? "bg-gray-300/8" : "bg-emerald-500/5"
        }`} />
        <div className={`absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-2xl ambient-glow-2 ${
          theme === "light" ? "bg-gray-200/8" : "bg-indigo-500/5"
        }`} />
        <div className={`absolute top-1/2 left-1/2 w-64 h-64 rounded-full blur-xl ambient-glow-3 ${
          theme === "light" ? "bg-gray-400/5" : "bg-purple-500/3"
        }`} />
      </div>

      {/* Subtle Grid Pattern */}
      <div className={`absolute inset-0 ${theme === "light" ? "opacity-[0.03]" : "opacity-[0.02]"}`}>
        <div className={`absolute inset-0 bg-[size:100px_100px] ${
          theme === "light"
            ? "bg-[linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)]"
            : "bg-[linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]"
        }`} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section 1: Main Heading */}
        <div className="mb-16 animate-fade-in-up animation-delay-200">
          {/* --- CHANGE: Updated heading style for a cleaner, more elegant look --- */}
          <h1 className={`text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none ${
            theme === "light" ? "text-black" : "text-white"
          }`}>
            The Collection
          </h1>
        </div>

        {/* Section 2: Teaser Image */}
        <div className="mb-16 relative group animate-scale-in animation-delay-500">
          {/* Main Product Image Container */}
          <div className="relative max-w-2xl mx-auto">
            {/* --- CHANGE: Added hover shadow effect --- */}
            <div className={`aspect-[4/3] relative rounded-3xl overflow-hidden shadow-xl transition-shadow duration-500 ${
              theme === "light"
                ? "hover:shadow-2xl hover:shadow-gray-400/50"
                : "hover:shadow-2xl hover:shadow-slate-700/50"
            }`}>
              {/* Placeholder for atmospheric product photo */}
              <div className={`w-full h-full flex items-center justify-center relative ${
                theme === "light"
                  ? "bg-gradient-to-br from-gray-200 via-gray-100 to-white"
                  : "bg-gradient-to-br from-slate-800 via-slate-900 to-black"
              }`}>
                {/* Simulated product mockup - notebook corner */}
                <div className="relative">
                  <div className={`w-80 h-60 rounded-lg shadow-2xl transform rotate-12 relative overflow-hidden ${
                    theme === "light" ? "bg-gray-300" : "bg-black"
                  }`}>
                    {/* Notebook texture */}
                    <div className={`absolute inset-0 ${
                      theme === "light"
                        ? "bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"
                        : "bg-gradient-to-br from-slate-900 via-black to-slate-800"
                    }`} />

                    {/* Subtle embossed logo area */}
                    <div className={`absolute bottom-8 right-8 w-16 h-16 rounded-full flex items-center justify-center ${
                      theme === "light" ? "bg-gray-400/30" : "bg-slate-800/30"
                    }`}>
                      <div className={`w-8 h-8 border rounded-full flex items-center justify-center ${
                        theme === "light" ? "border-gray-500/50" : "border-slate-700/50"
                      }`}>
                        <div className={`w-3 h-3 rounded-full ${
                          theme === "light" ? "bg-gray-600/50" : "bg-slate-600/50"
                        }`} />
                      </div>
                    </div>

                    {/* Leather-like texture lines */}
                    <div className="absolute inset-0 opacity-20">
                      <div className={`absolute top-4 left-4 right-4 h-px ${
                        theme === "light" ? "bg-gray-500" : "bg-slate-700"
                      }`} />
                      <div className={`absolute top-8 left-4 right-4 h-px ${
                        theme === "light" ? "bg-gray-500" : "bg-slate-700"
                      }`} />
                      <div className={`absolute bottom-16 left-4 right-4 h-px ${
                        theme === "light" ? "bg-gray-500" : "bg-slate-700"
                      }`} />
                    </div>
                  </div>

                  {/* Dramatic lighting effect */}
                  <div className={`absolute -top-20 -left-20 w-40 h-40 rounded-full blur-3xl ${
                    theme === "light" ? "bg-gray-400/10" : "bg-white/5"
                  }`} />
                  <div className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-2xl ${
                    theme === "light" ? "bg-gray-300/15" : "bg-emerald-500/10"
                  }`} />
                </div>
              </div>
              {/* Overlay gradient for mystery */}
              <div className={`absolute inset-0 ${
                theme === "light"
                  ? "bg-gradient-to-t from-white/40 via-transparent to-white/30"
                  : "bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/40"
              }`} />
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
        </div>

        {/* Section 3: Text Content */}
        <div className="mb-16 animate-fade-in-up animation-delay-1000">
          <p className={`text-xl md:text-2xl tracking-[0.2em] font-light leading-relaxed ${
            theme === "light" ? "text-gray-600" : "text-slate-400"
          }`}>
            Curated for the true cinephile. Coming Fall 2025.
          </p>
        </div>


        {/* Subtle Footer Text */}
        <div className="mt-20 animate-fade-in animation-delay-1000">
          <p className={`text-xs tracking-wider ${
            theme === "light" ? "text-gray-500" : "text-slate-600"
          }`}>
            Quality. Craftsmanship. Cinema.
          </p>
        </div>
      </div>
    </div>
  );
}

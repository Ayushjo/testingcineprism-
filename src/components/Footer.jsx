import React from "react";
import { motion } from "framer-motion";
import { Twitter } from "lucide-react";
export const Footer = () => {
  return (
    <>
      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white py-20 relative overflow-hidden">
        {/* Ambient Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Logo */}
            <motion.h3
              className="text-4xl font-black mb-8 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent tracking-tight"
              whileHover={{ scale: 1.02 }}
            >
              The Cinéprism
            </motion.h3>

            {/* Navigation Links */}
            <nav className="flex flex-wrap justify-center gap-8 mb-12">
              {["Reviews", "Trending", "Awards", "Community", "About"].map(
                (link, index) => (
                  <motion.a
                    key={link}
                    href={`/${link.toLowerCase()}`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="text-slate-400 hover:text-emerald-400 transition-colors duration-200 font-medium text-lg"
                  >
                    {link}
                  </motion.a>
                )
              )}
            </nav>

            {/* Social Links */}
            <div className="flex justify-center gap-6 mb-8">
              <motion.a
                href="https://twitter.com/thecineprism"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center text-emerald-400 hover:text-emerald-300 transition-colors duration-200 hover:bg-white/10"
              >
                <Twitter className="h-5 w-5" />
              </motion.a>
            </div>

            {/* Copyright */}
            <div className="border-t border-slate-800 pt-8">
              <p className="text-slate-500 text-sm">
                © 2025 thecineprism — Crafted with{" "}
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="text-red-400"
                >
                  ❤️
                </motion.span>{" "}
                for cinema lovers
              </p>
            </div>
          </motion.div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

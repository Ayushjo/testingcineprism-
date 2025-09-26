"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
// --- CHANGE 1: Import the new icons and use 'X' for Twitter ---
import { X, Instagram, Facebook, MessageSquare } from "lucide-react";

// --- CHANGE 2: A cleaner, more maintainable way to handle navigation links ---

// --- CHANGE 3: Create an array for social links to easily add or remove them ---
const socials = [
  { name: "X", href: "#", icon: X },
  { name: "Instagram", href: "#", icon: Instagram },
  { name: "Facebook", href: "#", icon: Facebook },
  { name: "WhatsApp", href: "#", icon: MessageSquare },
];
import { useAuth } from "../context/AuthContext";

const Footer = () => {
  const { user } = useAuth();
  const footerLinks = [
    { text: "Top Picks", href: "/recommendations-page" },
    { text: "Reviews", href: "/reviews" },
    { text: "Trending", href: "/trending" },

    { text: "Unpopular Opinions", href: "/unpopular-opinions" },
    { text: "Merchandise", href: "/merchandise" },
  ];

  if (!user) {
    footerLinks.push({ text: "Login", href: "/login" });
  }

  return (
    <>
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
              {footerLinks.map((link) => (
                <motion.a
                  key={link.text}
                  href={link.href}
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="text-slate-400 hover:text-emerald-400 transition-colors duration-200 font-medium text-lg"
                >
                  {link.text}
                </motion.a>
              ))}
              
            </nav>

            {/* --- CHANGE 4: Social Links are now mapped from the 'socials' array --- */}
            <div className="flex justify-center gap-6 mb-8">
              {socials.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center text-emerald-400 hover:text-emerald-300 transition-colors duration-200 hover:bg-white/10"
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>

            {/* Copyright */}
            <div className="border-t border-slate-800 pt-8">
              <p className="text-slate-500 text-sm">
                {/* --- CHANGE 5: Year is now generated automatically --- */}©{" "}
                {new Date().getFullYear()} The Cinéprism — Crafted with{" "}
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="text-red-400"
                >
                  ❤️
                </motion.span>{" "}
                
              </p>
            </div>
          </motion.div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

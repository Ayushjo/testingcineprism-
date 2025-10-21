"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { X, Instagram, Facebook, Mail } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import TheCineprismLogo from "../assets/thecineprismlogo.jpg";

// WhatsApp Icon Component - Define BEFORE using it
const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

// Social links array - Define AFTER WhatsAppIcon
const socials = [
  { name: "X", href: "https://x.com/TheCineprism", icon: X },
  {
    name: "Instagram",
    href: "https://www.instagram.com/thecineprism/",
    icon: Instagram,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61571175257504",
    icon: Facebook,
  },
  {
    name: "WhatsApp",
    href: "https://whatsapp.com/channel/0029VbBHVGHE1rccoWQwS10W",
    icon: WhatsAppIcon,
  },
  {
    name: "Email",
    href: "mailto:thecineprism@gmail.com",
    icon: Mail,
  },
];

const Footer = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const footerLinks = [
    { text: "Top Picks", href: "/recommendations-page" },
    { text: "Reviews", href: "/reviews" },
    { text: "Trending", href: "/trending" },
    { text: "Articles", href: "/articles" },
    { text: "Explore Genres", href: "/explore-genres" },
    { text: "Merchandise", href: "/merchandise" },
  ];

  if (!user) {
    footerLinks.push({ text: "Login", href: "/login" });
  }

  return (
    <>
      <footer className={`py-10 pb-20 md:pb-10 relative overflow-hidden transition-colors duration-300 ${
        theme === "light"
          ? "bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 text-black"
          : "bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white"
      }`}>
        {/* Ambient Background */}
        <div className="absolute inset-0 opacity-20">
          <div className={`absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl ${
            theme === "light" ? "bg-gray-400/10" : "bg-emerald-500/10"
          }`} />
          <div className={`absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl ${
            theme === "light" ? "bg-gray-500/10" : "bg-blue-500/10"
          }`} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Compact Layout - Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center mb-6">

              {/* Left: Navigation Links */}
              <nav className="flex flex-wrap justify-center lg:justify-start gap-3 lg:gap-4">
                {footerLinks.map((link) => (
                  <motion.a
                    key={link.text}
                    href={link.href}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    className={`transition-colors duration-200 font-medium text-sm whitespace-nowrap ${
                      theme === "light"
                        ? "text-black/70 hover:text-gray-900"
                        : "text-slate-400 hover:text-emerald-400"
                    }`}
                  >
                    {link.text}
                  </motion.a>
                ))}
              </nav>

              {/* Right: Social Links */}
              <div className="flex justify-center lg:justify-end gap-3">
                {socials.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-9 h-9 backdrop-blur-xl border rounded-xl flex items-center justify-center transition-colors duration-200 ${
                      theme === "light"
                        ? "bg-gray-100 border-black/40 text-black/70 hover:text-white hover:bg-black hover:border-black"
                        : "bg-white/5 border-white/10 text-emerald-400 hover:text-emerald-300 hover:bg-white/10"
                    }`}
                  >
                    <social.icon className="h-4 w-4" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Copyright with Logo - Bottom */}
            <div className={`border-t pt-4 pb-6 md:pb-4 ${
              theme === "light" ? "border-black/20" : "border-slate-800"
            }`}>
              <div className="flex flex-col items-center gap-3">
                {/* Logo and Brand Name */}
                <div className="flex items-center gap-3">
                  <img
                    src={TheCineprismLogo}
                    alt="The Cinéprism Logo"
                    className="w-8 h-8 rounded-lg object-cover"
                  />
                  <motion.h3
                    className={`text-xl font-bold bg-clip-text text-transparent tracking-tight ${
                      theme === "light"
                        ? "bg-gradient-to-r from-black via-gray-800 to-gray-600"
                        : "bg-gradient-to-r from-white via-slate-200 to-slate-400"
                    }`}
                    whileHover={{ scale: 1.02 }}
                  >
                    The Cinéprism
                  </motion.h3>
                </div>

                {/* Copyright Text */}
                <p className={`text-xs ${
                  theme === "light" ? "text-black/60" : "text-slate-500"
                }`}>
                  © {new Date().getFullYear()} The Cinéprism — Crafted with{" "}
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className="text-red-400"
                  >
                    ❤️
                  </motion.span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

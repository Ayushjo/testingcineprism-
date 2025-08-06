"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Twitter, Search } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import TheCineprismLogo from "../assets/thecineprismlogo.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logoutUser = async () => {
    try {
      const response = await axios.post(
        "https://testingcineprismbackend-production.up.railway.app/api/v1/user/logout",
        {
         withCredentials: true
        },

      );
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { href: "/recommendations-page", label: "Top Picks" },
    { href: "/reviews", label: "Reviews" },
    { href: "/trending", label: "Trending" },

    { href: "/unpopular-opinions", label: "Unpopular Opinions" },
    {
      href: "/merchandise",
      label: "Merchandise",
    },
  ];
  const { user } = useAuth();
  if (!user) {
    navLinks.push({ href: "/login", label: "Login" });
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || isMobileMenuOpen
          ? "bg-slate-950/90 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.a
            href="/"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2 text-xl font-bold tracking-tight text-white transition-all duration-300 hover:text-emerald-400"
          >
            <img
              src={TheCineprismLogo}
              alt="The Cineprism Logo"
              className="h-8 w-8 object-contain rounded-full"
            />
            The Cinéprism
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-all duration-300 rounded-2xl group"
              >
                {/* Glassmorphic Background on Hover */}
                <motion.div
                  className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />

                <span className="relative z-10">{link.label}</span>
              </motion.a>
            ))}

            {user ? (
              <motion.button 
              onClick={logoutUser}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: navLinks.length * 0.1 }}
                className="relative px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-all duration-300 rounded-2xl group"
              >
                <motion.div
                  className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
                <span className="relative z-10">Logout</span>
              </motion.button>
            ) : null}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Twitter Link */}
            <motion.a
              href="https://twitter.com/thecineprism"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 bg-white/5 backdrop-blur-xl hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-400 rounded-2xl border border-white/10 transition-all duration-300"
            >
              <Twitter className="h-4 w-4" />
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              aria-label="Toggle menu"
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 bg-white/5 backdrop-blur-xl text-slate-300 hover:text-white rounded-2xl border border-white/10 transition-all duration-300"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-slate-950/95 backdrop-blur-xl border-t border-white/5"
          >
            <div className="px-4 py-6 space-y-2">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 rounded-2xl transition-all duration-200 font-medium border border-transparent hover:border-white/10"
                >
                  {link.label}
                </motion.a>
              ))}

              {/* Mobile Actions */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: navLinks.length * 0.1 }}
                className="flex items-center gap-3 pt-4 mt-4 border-t border-white/10"
              >
                <motion.a
                  href="https://twitter.com/thecineprism"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-white/5 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-400 rounded-2xl border border-white/10 transition-all duration-300"
                >
                  <Twitter className="h-4 w-4" />
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

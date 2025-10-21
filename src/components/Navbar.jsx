import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Twitter, LogOut, User, Sun, Moon, Instagram, Facebook, Send } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import TheCineprismLogo from "../assets/thecineprismlogo.jpg";

// WhatsApp icon component (lucide-react doesn't have WhatsApp)
const WhatsAppIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const { user, logout: authLogout, loading } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  // Social media links configuration
  const socialLinks = useMemo(() => [
    {
      name: "Twitter",
      icon: Twitter,
      url: "https://twitter.com/thecineprism",
      color: "hover:text-blue-400"
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://www.instagram.com/thecineprism?igsh=MTFsOWE0YWpycDZnZQ==",
      color: "hover:text-pink-500"
    },
    {
      name: "WhatsApp",
      icon: WhatsAppIcon,
      url: "https://whatsapp.com/channel/0029VaZeFlFHFxP2OuHfnU43",
      color: "hover:text-green-500"
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://www.facebook.com/share/19nnUdSDKx/",
      color: "hover:text-blue-600"
    },
    {
      name: "Telegram",
      icon: Send,
      url: "https://t.me/cineprism01",
      color: "hover:text-sky-500"
    }
  ], []);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  const handleResize = useCallback(() => {
    if (window.innerWidth >= 1024) {
      setIsMobileMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [handleScroll, handleResize]);

  const handleLogout = useCallback(async () => {
    setIsLoggingOut(true);
    try {
      await authLogout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
      setIsMobileMenuOpen(false);
    }
  }, [authLogout, navigate]);

  const handleLinkClick = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const navLinks = useMemo(() => {
    const baseNavLinks = [
      { href: "/recommendations-page", label: "Top Picks" },
      { href: "/reviews", label: "Reviews" },
      { href: "/trending", label: "Trending" },
      { href: "/explore-genres", label: "Explore Genres" },
      { href: "/merchandise", label: "Merchandise" },
    ];

    const links = user
      ? baseNavLinks
      : [...baseNavLinks, { href: "/login", label: "Login" }];

    if (user?.role === "ADMIN") {
      links.push({ href: "/admin", label: "Admin" });
    }

    return links;
  }, [user]);

  if (loading) {
    return (
      <nav
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-colors duration-300 animate-fade-in-down ${
          theme === "light"
            ? "bg-[#FFF8DC]/95 border-black/30"
            : "bg-slate-950/90 border-white/5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link
              to="/"
              className={`flex items-center gap-2 text-xl font-bold tracking-tight transition-colors ${
                theme === "light" ? "text-black" : "text-white"
              }`}
            >
              <img
                src={TheCineprismLogo}
                alt="The Cineprism Logo"
                className="h-8 w-8 object-contain rounded-full"
              />
              The Cinéprism
            </Link>
            <div className={`animate-pulse h-4 w-4 rounded ${
              theme === "light" ? "bg-black" : "bg-white/20"
            }`}></div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 animate-fade-in-down ${
        isScrolled || isMobileMenuOpen
          ? theme === "light"
            ? "bg-white/95 backdrop-blur-xl border-b border-black/20"
            : "bg-slate-950/90 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="transition-transform duration-200 hover:scale-105">
            <Link
              to="/"
              className={`flex items-center gap-2 text-xl font-bold tracking-tight transition-all duration-300 ${
                !isScrolled && !isMobileMenuOpen && isHomePage
                  ? "text-white hover:text-gray-200"
                  : theme === "light"
                  ? "text-black hover:text-gray-700"
                  : "text-white hover:text-emerald-400"
              }`}
            >
              <img
                src={TheCineprismLogo}
                alt="The Cineprism Logo"
                className="h-8 w-8 object-contain rounded-full"
              />
              The Cinéprism
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link, index) => (
              <motion.div
                key={`nav-${link.href}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
                onMouseEnter={() => setHoveredItem(`nav-${index}`)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Link
                  to={link.href}
                  className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 rounded-2xl block z-10 whitespace-nowrap ${
                    !isScrolled && !isMobileMenuOpen && isHomePage
                      ? "text-white/90 hover:text-white"
                      : theme === "light"
                      ? "text-black/70 hover:text-black"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                </Link>

                <motion.div
                  className={`absolute inset-0 backdrop-blur-xl rounded-2xl border ${
                    !isScrolled && !isMobileMenuOpen && isHomePage
                      ? "bg-white/5 border-white/10"
                      : theme === "light"
                      ? "bg-gray-100 border-black/30"
                      : "bg-white/5 border-white/10"
                  }`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: hoveredItem === `nav-${index}` ? 1 : 0.8,
                    opacity: hoveredItem === `nav-${index}` ? 1 : 0,
                  }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
              </motion.div>
            ))}

            {/* User Actions */}
            {user && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-1 ml-1"
              >
                {/* User Profile */}
                <motion.div
                  onMouseEnter={() => setHoveredItem("user-profile")}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="relative"
                >
                  <div className={`flex items-center gap-2 px-2.5 py-2 rounded-2xl relative z-10 ${
                    !isScrolled && !isMobileMenuOpen && isHomePage
                      ? "text-white/90"
                      : theme === "light"
                      ? "text-black"
                      : "text-slate-300"
                  }`}>
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium hidden xl:block whitespace-nowrap">
                      {user.username?.split(" ")[0] ||
                        user.name?.split(" ")[0] ||
                        "User"}
                    </span>
                  </div>
                  <motion.div
                    className={`absolute inset-0 backdrop-blur-xl rounded-2xl border ${
                      !isScrolled && !isMobileMenuOpen && isHomePage
                        ? "bg-white/5 border-white/10"
                        : theme === "light"
                        ? "bg-gray-100 border-black/30"
                        : "bg-white/5 border-white/10"
                    }`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                      scale: hoveredItem === "user-profile" ? 1 : 0.8,
                      opacity: hoveredItem === "user-profile" ? 1 : 0,
                    }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  />
                </motion.div>

                {/* Logout Button */}
                <motion.div
                  onMouseEnter={() => setHoveredItem("logout")}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="relative"
                >
                  <motion.button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    whileTap={{ scale: isLoggingOut ? 1 : 0.95 }}
                    className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed z-10 whitespace-nowrap ${
                      !isScrolled && !isMobileMenuOpen && isHomePage
                        ? "text-white/90 hover:text-red-400"
                        : theme === "light"
                        ? "text-black/70 hover:text-red-600"
                        : "text-slate-300 hover:text-red-400"
                    }`}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <AnimatePresence mode="wait">
                        {isLoggingOut ? (
                          <motion.div
                            key="loading"
                            initial={{ opacity: 0, rotate: 0 }}
                            animate={{ opacity: 1, rotate: 360 }}
                            exit={{ opacity: 0 }}
                            transition={{
                              duration: 0.5,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          >
                            <LogOut className="h-4 w-4" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="logout"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <LogOut className="h-4 w-4" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <span className="hidden xl:inline">
                        {isLoggingOut ? "Logging out..." : "Logout"}
                      </span>
                    </span>
                  </motion.button>
                  <motion.div
                    className="absolute inset-0 bg-red-500/5 backdrop-blur-xl rounded-2xl border border-red-500/10"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                      scale: hoveredItem === "logout" ? 1 : 0.8,
                      opacity: hoveredItem === "logout" ? 1 : 0,
                    }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  />
                </motion.div>
              </motion.div>
            )}
          </div>

          {/* Desktop Social Actions */}
          <div className="hidden lg:flex items-center gap-1.5">
            {/* Theme Toggle */}
            <motion.div
              onMouseEnter={() => setHoveredItem("theme")}
              onMouseLeave={() => setHoveredItem(null)}
              className="relative"
            >
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.05, rotate: theme === "dark" ? 0 : 180 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-2xl transition-all duration-300 relative z-10 ${
                  !isScrolled && !isMobileMenuOpen && isHomePage
                    ? "text-white/90 hover:text-white"
                    : theme === "light"
                    ? "text-black/70 hover:text-black"
                    : "text-slate-300 hover:text-emerald-400"
                }`}
              >
                <AnimatePresence mode="wait">
                  {theme === "dark" ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="h-4 w-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
              <motion.div
                className={`absolute inset-0 backdrop-blur-xl rounded-2xl border ${
                  !isScrolled && !isMobileMenuOpen && isHomePage
                    ? "bg-white/5 border-white/10"
                    : theme === "light"
                    ? "bg-gray-100 border-black/30"
                    : "bg-white/5 border-white/10"
                }`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: hoveredItem === "theme" ? 1 : 0.8,
                  opacity: hoveredItem === "theme" ? 1 : 0,
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            </motion.div>

            {/* Social Media Links */}
            {socialLinks.map((social) => (
              <motion.div
                key={social.name}
                onMouseEnter={() => setHoveredItem(social.name)}
                onMouseLeave={() => setHoveredItem(null)}
                className="relative"
              >
                <motion.a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 rounded-2xl transition-all duration-300 relative z-10 block ${
                    !isScrolled && !isMobileMenuOpen && isHomePage
                      ? `text-white/90 hover:text-white ${social.color}`
                      : theme === "light"
                      ? `text-black/70 hover:text-black ${social.color}`
                      : `text-slate-300 ${social.color}`
                  }`}
                  title={social.name}
                >
                  <social.icon className="h-4 w-4" />
                </motion.a>
                <motion.div
                  className={`absolute inset-0 backdrop-blur-xl rounded-2xl border ${
                    !isScrolled && !isMobileMenuOpen && isHomePage
                      ? "bg-white/5 border-white/10"
                      : theme === "light"
                      ? "bg-gray-100 border-black/30"
                      : "bg-white/5 border-white/10"
                  }`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: hoveredItem === social.name ? 1 : 0.8,
                    opacity: hoveredItem === social.name ? 1 : 0,
                  }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
              </motion.div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <motion.button
              aria-label="Toggle menu"
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 backdrop-blur-xl rounded-2xl border-2 transition-all duration-300 font-semibold text-sm sm:text-base shadow-md ${
                theme === "light"
                  ? "bg-white text-black hover:bg-black hover:text-white border-black/40 hover:border-black"
                  : "bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border-white/10 hover:border-white/20"
              }`}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-2"
                  >
                    <X className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="hidden sm:inline">Close</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-2"
                  >
                    <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span>Menu</span>
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
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`lg:hidden backdrop-blur-xl border-t ${
              theme === "light"
                ? "bg-white/95 border-black/20"
                : "bg-slate-950/95 border-white/5"
            }`}
          >
            {/* Scrollable Container with Max Height */}
            <div className="max-h-[calc(100vh-5rem)] overflow-y-auto overscroll-contain">
              <div className="px-4 py-4 space-y-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={`mobile-${link.href}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link
                    to={link.href}
                    onClick={handleLinkClick}
                    className={`block px-4 py-2.5 rounded-xl transition-all duration-200 font-medium text-sm border ${
                      theme === "light"
                        ? "text-black/70 hover:text-black hover:bg-gray-100 border-transparent hover:border-black/30"
                        : "text-slate-300 hover:text-white hover:bg-white/5 border-transparent hover:border-white/10"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile User Section */}
              {user && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, delay: navLinks.length * 0.1 }}
                  className={`pt-4 mt-4 border-t space-y-3 ${
                    theme === "light" ? "border-black/30" : "border-white/10"
                  }`}
                >
                  <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border ${
                    theme === "light"
                      ? "bg-gray-100 border-black/30"
                      : "bg-white/5 border-white/10"
                  }`}>
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      theme === "light"
                        ? "bg-gradient-to-br from-gray-800 to-black"
                        : "bg-gradient-to-br from-emerald-400 to-blue-500"
                    }`}>
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${
                        theme === "light" ? "text-black" : "text-white"
                      }`}>
                        {user.name || user.username || "User"}
                      </p>
                      <p className={`text-xs ${
                        theme === "light" ? "text-black/60" : "text-slate-400"
                      }`}>{user.email}</p>
                    </div>
                  </div>

                  <motion.button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    whileTap={{ scale: isLoggingOut ? 1 : 0.95 }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 font-medium border disabled:opacity-50 disabled:cursor-not-allowed ${
                      theme === "light"
                        ? "text-black/70 hover:text-red-600 hover:bg-red-100/50 border-transparent hover:border-red-600/30"
                        : "text-slate-300 hover:text-red-400 hover:bg-red-500/5 border-transparent hover:border-red-500/10"
                    }`}
                  >
                    <AnimatePresence mode="wait">
                      {isLoggingOut ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0, rotate: 0 }}
                          animate={{ opacity: 1, rotate: 360 }}
                          exit={{ opacity: 0 }}
                          transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <LogOut className="h-4 w-4" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="logout"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <LogOut className="h-4 w-4" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
                  </motion.button>
                </motion.div>
              )}

              {/* Mobile Social Actions */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.3,
                  delay: (navLinks.length + (user ? 2 : 0)) * 0.1,
                }}
                className={`pt-4 mt-4 border-t ${
                  theme === "light" ? "border-black/30" : "border-white/10"
                }`}
              >
                <p className={`text-xs font-semibold mb-3 px-2 ${
                  theme === "light" ? "text-black/60" : "text-slate-400"
                }`}>
                  Connect with us
                </p>
                
                {/* Theme Toggle in Mobile */}
                <div className="flex items-center gap-2 mb-4">
                  <motion.button
                    onClick={toggleTheme}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 px-4 py-3 rounded-2xl border-2 transition-all duration-300 shadow-md flex-1 ${
                      theme === "light"
                        ? "bg-gray-100 hover:bg-black text-black/70 hover:text-white border-black/40 hover:border-black"
                        : "bg-white/5 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-400 border-white/10"
                    }`}
                  >
                    <AnimatePresence mode="wait">
                      {theme === "dark" ? (
                        <motion.div
                          key="sun"
                          initial={{ rotate: -90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: 90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Sun className="h-5 w-5" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="moon"
                          initial={{ rotate: 90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: -90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Moon className="h-5 w-5" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <span className="text-sm font-medium">
                      {theme === "dark" ? "Light Mode" : "Dark Mode"}
                    </span>
                  </motion.button>
                </div>

                {/* Social Media Grid for Mobile */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-2xl border-2 transition-all duration-300 shadow-md ${
                        theme === "light"
                          ? "bg-gray-100 hover:bg-black text-black/70 hover:text-white border-black/40 hover:border-black"
                          : "bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border-white/10"
                      }`}
                    >
                      <social.icon className="h-5 w-5 flex-shrink-0" />
                      <span className="text-sm font-medium truncate">{social.name}</span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
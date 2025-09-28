import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Twitter, LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import TheCineprismLogo from "../assets/thecineprismlogo.jpg";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  // Use AuthContext instead of managing user state separately
  const { user, logout: authLogout, loading } = useAuth();
  const navigate = useNavigate();

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

  // Memoize navigation links
  const navLinks = useMemo(() => {
    const baseNavLinks = [
      { href: "/recommendations-page", label: "Top Picks" },
      { href: "/reviews", label: "Reviews" },
      { href: "/trending", label: "Trending" },
      { href: "/cinema-school", label: "Cinema School" },
      {href:"/articles",label:"Articles"},
      {href:"/box-office",label:"Box Office"},
    ];

    const links = user
      ? baseNavLinks
      : [...baseNavLinks, { href: "/login", label: "Login" }];

    if (user?.role === "ADMIN") {
      links.push({ href: "/admin", label: "Admin" });
    }

    return links;
  }, [user]);

  // Show loading state briefly if auth is still loading
  if (loading) {
    return (
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link
              to="/"
              className="flex items-center gap-2 text-xl font-bold tracking-tight text-white"
            >
              <img
                src={TheCineprismLogo}
                alt="The Cineprism Logo"
                className="h-8 w-8 object-contain rounded-full"
              />
              The Cinéprism
            </Link>
            <div className="animate-pulse h-4 w-4 bg-white/20 rounded"></div>
          </div>
        </div>
      </motion.nav>
    );
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
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              to="/"
              className="flex items-center gap-2 text-xl font-bold tracking-tight text-white transition-all duration-300 hover:text-emerald-400"
            >
              <img
                src={TheCineprismLogo}
                alt="The Cineprism Logo"
                className="h-8 w-8 object-contain rounded-full"
              />
              The Cinéprism
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
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
                  className="relative px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-all duration-300 rounded-2xl block z-10"
                >
                  <span className="relative z-10">{link.label}</span>
                </Link>

                <motion.div
                  className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10"
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
                className="flex items-center gap-2 ml-2"
              >
                {/* User Profile */}
                <motion.div
                  onMouseEnter={() => setHoveredItem("user-profile")}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="relative"
                >
                  <div className="flex items-center gap-2 px-3 py-2 text-slate-300 rounded-2xl relative z-10">
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium hidden lg:block">
                      {user.username?.split(" ")[0] ||
                        user.name?.split(" ")[0] ||
                        "User"}
                    </span>
                  </div>
                  <motion.div
                    className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10"
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
                    className="relative px-4 py-2 text-sm font-medium text-slate-300 hover:text-red-400 transition-all duration-300 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed z-10"
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
                      <span className="hidden sm:inline">
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
          <div className="hidden lg:flex items-center gap-3">
            <motion.div
              onMouseEnter={() => setHoveredItem("twitter")}
              onMouseLeave={() => setHoveredItem(null)}
              className="relative"
            >
              <motion.a
                href="https://twitter.com/thecineprism"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 text-slate-300 hover:text-emerald-400 rounded-2xl transition-all duration-300 relative z-10 block"
              >
                <Twitter className="h-4 w-4" />
              </motion.a>
              <motion.div
                className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: hoveredItem === "twitter" ? 1 : 0.8,
                  opacity: hoveredItem === "twitter" ? 1 : 0,
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
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
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-slate-950/95 backdrop-blur-xl border-t border-white/5"
          >
            <div className="px-4 py-6 space-y-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={`mobile-${link.href}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    to={link.href}
                    onClick={handleLinkClick}
                    className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 rounded-2xl transition-all duration-200 font-medium border border-transparent hover:border-white/10"
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
                  className="pt-4 mt-4 border-t border-white/10 space-y-3"
                >
                  <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-2xl border border-white/10">
                    <div className="h-8 w-8 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">
                        {user.name || user.username || "User"}
                      </p>
                      <p className="text-slate-400 text-xs">{user.email}</p>
                    </div>
                  </div>

                  <motion.button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    whileTap={{ scale: isLoggingOut ? 1 : 0.95 }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-red-400 hover:bg-red-500/5 rounded-2xl transition-all duration-200 font-medium border border-transparent hover:border-red-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
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
                <span className="text-slate-400 text-sm">
                  Follow us on Twitter
                </span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

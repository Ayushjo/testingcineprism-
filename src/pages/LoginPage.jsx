import { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import TheCineprismLogo from "../assets/thecineprismlogo.jpg";

export default function LoginPage() {
  const { loginWithGoogle, user, handleAuthCallback } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Handle OAuth callback
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    if (token) {
      handleAuthCallback(token);
      toast.success("Login successful!");
      navigate("/");
    } else if (error) {
      const errorMessages = {
        auth_failed: "Authentication failed. Please try again.",
        server_error: "Server error. Please try again later.",
        oauth_failed: "Google authentication failed.",
      };
      toast.error(errorMessages[error] || "Login failed");
    }
  }, [searchParams, handleAuthCallback, navigate]);

  useEffect(() => {
    // Redirect if already logged in
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-neutral-950 via-slate-900 to-black">
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0">
        {/* Main background - Classic cinema aesthetic */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1489599512549-c1b006ad123c?q=80&w=2070')`,
          }}
        />
        {/* Film grain overlay */}
        <div
          className="absolute inset-0 opacity-[0.08] mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' result='noise'/%3E%3CfeColorMatrix in='noise' type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)' opacity='0.4'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Premium gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-neutral-950/75 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-900/50 to-black/80" />
        {/* Subtle color accent */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/15 via-transparent to-red-900/10" />
      </div>

      {/* Cinematic Light Rays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Projector light effect */}
        <motion.div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-amber-200/20 via-amber-300/5 to-transparent"
          style={{
            clipPath: "polygon(45% 0%, 55% 0%, 65% 100%, 35% 100%)",
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scaleX: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating film elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`film-${i}`}
            className="absolute w-2 h-8 bg-gradient-to-b from-amber-400/20 to-transparent"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${Math.random() * 100}%`,
              clipPath: "polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%)",
            }}
            animate={{
              y: [-100, window.innerHeight + 100],
              opacity: [0, 0.6, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear",
            }}
          />
        ))}

        {/* Subtle sparkle effects */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute w-1 h-1 bg-amber-200 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="w-full max-w-md"
        >
          {/* Enhanced Login Panel with Film-Inspired Design */}
          <div className="relative group">
            {/* Outer glow effect */}
            <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/10 via-red-500/5 to-amber-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />

            {/* Film strip border effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-neutral-700/30 to-neutral-600/30 rounded-3xl">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-amber-900/20 via-transparent to-red-900/20" />
            </div>

            <div className="relative bg-neutral-900/60 backdrop-blur-xl border border-neutral-700/30 rounded-3xl p-10 shadow-2xl overflow-hidden">
              {/* Inner luxury gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-950/20 via-transparent to-red-950/20 rounded-3xl" />

              {/* Subtle film strip pattern on sides */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400/30 via-neutral-600/20 to-amber-400/30">
                <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-b from-transparent via-neutral-800/40 to-transparent" />
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400/30 via-neutral-600/20 to-amber-400/30">
                <div className="absolute inset-y-0 right-0 w-full bg-gradient-to-b from-transparent via-neutral-800/40 to-transparent" />
              </div>

              {/* Brand Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center mb-8"
              >
                {/* Logo with cinematic flair */}
                <motion.div
                  className="relative w-20 h-20 mx-auto mb-6 group/logo"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-red-500/20 rounded-2xl blur-md opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500" />
                  <div className="relative bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-2xl p-2 border border-neutral-700/50 shadow-xl">
                    <img
                      src={TheCineprismLogo}
                      alt="The Cinéprism"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  {/* Film reel accent */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full shadow-lg border border-amber-300/50" />
                </motion.div>

                <h1 className="text-3xl font-light tracking-wider mb-2">
                  <span className="bg-gradient-to-r from-amber-200 via-neutral-100 to-amber-200 bg-clip-text text-transparent">
                    THE CINÉPRISM
                  </span>
                </h1>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-8 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
                  <div className="w-1 h-1 bg-amber-400/60 rounded-full" />
                  <div className="w-8 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
                </div>
                <p className="text-neutral-400 font-light text-sm tracking-wide leading-relaxed">
                  Where Cinema Meets Critique
                </p>
              </motion.div>

              {/* Welcome Message */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-center mb-8"
              >
                <h2 className="text-neutral-300 text-lg font-light mb-2">
                  Welcome Back
                </h2>
                <p className="text-neutral-500 text-sm leading-relaxed">
                  Continue your cinematic journey with us
                </p>
              </motion.div>

              {/* Premium Google Sign In Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mb-6"
              >
                <motion.button
                  whileHover={{
                    scale: 1.01,
                    boxShadow: "0 8px 32px rgba(245, 158, 11, 0.15)",
                  }}
                  whileTap={{ scale: 0.99 }}
                  onClick={loginWithGoogle}
                  className="relative w-full group overflow-hidden"
                >
                  {/* Button background with premium styling */}
                  <div className="absolute inset-0 bg-gradient-to-r from-neutral-100 to-white rounded-2xl shadow-lg" />
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-50/50 to-neutral-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative bg-white text-neutral-800 font-medium py-4 px-6 rounded-2xl transition-all duration-300 border border-neutral-200/80 flex items-center justify-center gap-3 group-hover:border-amber-300/40">
                    {/* Enhanced Google Icon */}
                    <motion.div
                      className="relative"
                      whileHover={{ rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg
                        className="w-5 h-5 transition-transform duration-300"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                    </motion.div>

                    <span className="text-base tracking-wide">
                      Continue with Google
                    </span>

                    {/* Subtle arrow */}
                    <motion.div
                      className="opacity-0 group-hover:opacity-70 transition-opacity duration-300"
                      initial={{ x: -5 }}
                      whileHover={{ x: 0 }}
                    >
                      <svg
                        className="w-4 h-4 text-neutral-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </motion.div>
                  </div>
                </motion.button>
              </motion.div>

              {/* Elegant Terms */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-center"
              >
                <p className="text-neutral-500 text-xs leading-relaxed font-light">
                  By continuing, you agree to our{" "}
                  <a
                    href="#"
                    className="text-amber-400/80 hover:text-amber-300 transition-colors duration-200 underline decoration-amber-400/30 hover:decoration-amber-300/50 underline-offset-2"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-amber-400/80 hover:text-amber-300 transition-colors duration-200 underline decoration-amber-400/30 hover:decoration-amber-300/50 underline-offset-2"
                  >
                    Privacy Policy
                  </a>
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Cinematic Ambient Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large cinematic orb */}
        <motion.div
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-amber-500/8 to-red-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Secondary ambient light */}
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-br from-neutral-500/5 to-amber-500/8 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />

        {/* Central subtle glow */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-amber-500/3 via-transparent to-transparent rounded-full blur-2xl" />
      </div>
    </div>
  );
}

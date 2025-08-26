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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-black">
      {/* Enhanced Background with multiple layers */}
      <div className="absolute inset-0">
        {/* Primary background image - Blade Runner 2049 aesthetic */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{
            backgroundImage: `url('https://image.tmdb.org/t/p/original/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg')`,
          }}
        />
        {/* Secondary overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-slate-900/60 to-black/80" />
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-transparent to-emerald-900/20" />
        {/* Noise texture for premium feel */}
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Enhanced Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating orbs */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full bg-gradient-to-br from-emerald-400/20 to-indigo-400/20 blur-sm"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -120, 0],
              x: [0, Math.random() * 60 - 30, 0],
              opacity: [0, 0.8, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Geometric shapes */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`shape-${i}`}
            className="absolute w-px h-12 bg-gradient-to-b from-transparent via-emerald-400/30 to-transparent"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              rotate: `${Math.random() * 360}deg`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scaleY: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.1,
          }}
          className="w-full max-w-lg"
        >
          {/* Enhanced Login Panel */}
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-indigo-500/20 to-emerald-500/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-12 shadow-2xl overflow-hidden">
              {/* Inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-indigo-500/5 rounded-3xl" />

              {/* Subtle border highlight */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-transparent" />

              {/* Brand Logo Area */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-center mb-10"
              >
                {/* Logo placeholder - you can replace with actual logo */}
                <motion.div
                  className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-emerald-400 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img src={TheCineprismLogo} alt="" className="rounded-lg" />
                </motion.div>

                <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-emerald-200 to-white bg-clip-text text-transparent mb-3 tracking-tight">
                  The Cinéprism
                </h1>
                <p className="text-slate-400 text-lg font-light leading-relaxed">
                  Your gateway to cinematic discoveries
                </p>
              </motion.div>

              {/* Enhanced Google Sign In Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="relative z-20 mb-8"
              >
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={loginWithGoogle}
                  className="relative w-full group overflow-hidden"
                >
                  {/* Button background with gradient border */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-50 rounded-2xl" />
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative bg-white group-hover:bg-gray-50 text-gray-900 font-semibold py-5 px-8 rounded-2xl transition-all duration-300 shadow-lg group-hover:shadow-xl border border-gray-200/50 flex items-center justify-center gap-4">
                    {/* Enhanced Google Icon */}
                    <div className="relative">
                      <svg
                        className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"
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
                    </div>
                    <span className="text-lg">Continue with Google</span>
                    {/* Arrow icon */}
                    <motion.div
                      className="opacity-0 group-hover:opacity-100"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg
                        className="w-5 h-5 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </motion.div>
                  </div>
                </motion.button>
              </motion.div>

              {/* Enhanced Terms */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-center"
              >
                <p className="text-slate-500 text-sm leading-relaxed">
                  By continuing, you agree to our{" "}
                  <a
                    href="#"
                    className="text-emerald-400 hover:text-emerald-300 transition-colors duration-200 underline decoration-emerald-400/30 hover:decoration-emerald-300/50 underline-offset-2"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-emerald-400 hover:text-emerald-300 transition-colors duration-200 underline decoration-emerald-400/30 hover:decoration-emerald-300/50 underline-offset-2"
                  >
                    Privacy Policy
                  </a>
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Ambient Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large ambient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        {/* Additional smaller ambient effects */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-emerald-500/5 via-transparent to-transparent rounded-full blur-2xl" />
      </div>
    </div>
  );
}

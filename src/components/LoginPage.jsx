import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { CheckCircle } from "lucide-react";
import { XCircle } from "lucide-react";
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    try {
      if (!email || !password) {
        throw new Error("Please fill in all fields.");
      }
      const response = await axios.post(
        "https://testingcineprismbackend-production.up.railway.app/api/v1/user/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        // --- CHANGE 3: Show success toast ---
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } bg-slate-800/80 backdrop-blur-xl border border-slate-700 shadow-lg rounded-xl text-white px-6 py-4 flex items-center gap-4`}
          >
            <CheckCircle className="text-emerald-400" />
            <span className="font-medium">
              {response.data.message || "Login Successful!"}
            </span>
          </div>
        ));
        // Cookies.set("token", response.data.token);
        navigate("/");
      } else {
        // This handles non-200 success codes if your API uses them
        throw new Error(
          response.data.message || "An unexpected error occurred."
        );
      }
    } catch (error) {
      // --- CHANGE 4: Show error toast ---
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please try again.";
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } bg-rose-900/80 backdrop-blur-xl border border-rose-700 shadow-lg rounded-xl text-white px-6 py-4 flex items-center gap-4`}
        >
          <XCircle className="text-rose-400" />
          <span className="font-medium">{errorMessage}</span>
        </div>
      ));
      console.error(error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };
  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950">
      {" "}
      {/* --- CHANGE: Added base bg for consistency --- */}
      {/* Cinematic Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            // --- CHANGE: Using a real, atmospheric poster ---
            backgroundImage: `url('https://image.tmdb.org/t/p/original/gajva2L0rPYkscC26CsW2MvbcAc.jpg')`,
          }}
        />
        {/* Dark overlay and blur effect */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        {/* --- CHANGE: Toned down the background gradient to be more neutral --- */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-slate-900/20" />
      </div>
      {/* Floating Particles Effect (This is fine, no changes needed) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* Glassmorphism Login Panel */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
            {" "}
            {/* --- CHANGE: bg-black to bg-slate-900 for better theme match --- */}
            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-emerald-500/5 rounded-3xl" />
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
                Welcome Back
              </h2>
              <p className="text-slate-400 text-sm">
                Sign in to continue to The Cineprism
              </p>
            </motion.div>
            {/* Login Form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6 z-20 relative"
            >
              {/* Email Field */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-slate-300 block"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-300 backdrop-blur-sm"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-slate-300 block"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-12 py-4 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-300 backdrop-blur-sm"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <a
                  href="#"
                  className="text-sm text-slate-400 hover:text-emerald-400 transition-colors duration-300"
                >
                  Forgot Password?
                </a>
              </div>

              {/* Sign In Button */}
              <motion.button
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                type="submit"
                disabled={isLoading} // --- CHANGE 5: Disable button while loading ---
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {/* --- CHANGE 6: Show spinner when loading --- */}
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Sign In"
                )}
              </motion.button>

              {/* Sign Up Link */}
              <div className="text-center pt-4">
                <p className="text-slate-400 text-sm">
                  Not a member yet?{" "}
                  <a
                    onClick={() => navigate("/signup")}
                    href="/signup"
                    className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors duration-300 cursor-pointer"
                  >
                    Sign Up
                  </a>
                </p>
              </div>
            </motion.form>
          </div>
        </motion.div>
      </div>
      {/* Ambient Light Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* --- CHANGE: Changed one glow to indigo to match the homepage's multi-color glow --- */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>
    </div>
  );
}

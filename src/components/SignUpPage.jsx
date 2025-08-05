import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, Calendar } from "lucide-react";
import axios from "axios";
import { CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import { XCircle } from "lucide-react";
export default function SignupPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading,setIsLoading]  = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (
        !formData.username ||
        !formData.email ||
        !formData.password ||
        !formData.confirmPassword
      ) {
        throw new Error("Please fill in all fields.");
      }
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match.");
      }

      const response = await axios.post(
        "/api/v1/user/register",
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }
      );

      if (response.status === 200) {
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } bg-slate-800/80 backdrop-blur-xl border border-slate-700 shadow-lg rounded-xl text-white px-6 py-4 flex items-center gap-4`}
          >
            <CheckCircle className="text-emerald-400" />
            <span className="font-medium">
              {response.data.message || "Registration successful!"}
            </span>
          </div>
        ));
        navigate("/login");
      } else {
        throw new Error(
          response.data.message || "An unexpected error occurred."
        );
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Registration failed. Please try again.";
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

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950 pt-12">
      {/* Cinematic Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://image.tmdb.org/t/p/original/gajva2L0rPYkscC26CsW2MvbcAc.jpg')`,
          }}
        />
        {/* Dark overlay and blur effect */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-slate-900/20" />
      </div>

      {/* Floating Particles Effect */}
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
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* Glassmorphism Signup Panel */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
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
                Join The Cineprism
              </h2>
              <p className="text-slate-400 text-sm">
                Create your account to start reviewing movies
              </p>
            </motion.div>

            {/* Signup Form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6 z-20 relative "
            >
              {/* Name Fields Row */}
              <div className="grid  gap-4">
                {/* First Name */}
                <div className="space-y-2">
                  <label
                    htmlFor="username"
                    className="text-sm font-medium text-slate-300 block"
                  >
                    Username
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      id="username"
                      type="text"
                      onChange={(e) =>
                        handleInputChange("username", e.target.value)
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-10 pr-3 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-300 backdrop-blur-sm text-sm"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>
              </div>

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
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
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
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-12 py-4 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-300 backdrop-blur-sm"
                    placeholder="Create a password"
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

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-slate-300 block"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-12 py-4 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-300 backdrop-blur-sm"
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start gap-3">
                <input
                  id="terms"
                  type="checkbox"
                  className="mt-1 w-4 h-4 text-emerald-600 bg-white/5 border-white/10 rounded focus:ring-emerald-500 focus:ring-2"
                  required
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-slate-400 leading-relaxed"
                >
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </label>
              </div>

              {/* Sign Up Button */}
              <motion.button
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                type="submit"
                disabled={isLoading} // --- CHANGE 3: Disable button while loading ---
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {/* --- CHANGE 4: Show spinner when loading --- */}
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Create Account"
                )}
              </motion.button>

              {/* Sign In Link */}
              <div className="text-center pt-4">
                <p className="text-slate-400 text-sm">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors duration-300"
                  >
                    Sign In
                  </a>
                </p>
              </div>
            </motion.form>
          </div>

          {/* Additional Decorative Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-8 text-center"
          >
            <div className="inline-flex items-center gap-2 text-slate-500 text-xs">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-slate-500" />
              <span>Secure Registration</span>
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-slate-500" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Ambient Light Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>
    </div>
  );
}

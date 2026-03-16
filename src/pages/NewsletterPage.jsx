import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import {
  Film,
  Clapperboard,
  Star,
  Check,
  ArrowRight,
  Globe,
  Sparkles,
  BookOpen,
  Eye,
  ChevronDown,
  X,
} from "lucide-react";
import axios from "axios";

// Country selector data (most common + India prominent)
const COUNTRIES = [
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "SG", name: "Singapore", flag: "🇸🇬" },
  { code: "AE", name: "UAE", flag: "🇦🇪" },
  { code: "NZ", name: "New Zealand", flag: "🇳🇿" },
  { code: "OTHER", name: "Other", flag: "🌍" },
];

// Checkout Modal
const CheckoutModal = ({ plan, onClose, theme }) => {
  const [step, setStep] = useState(1); // 1 = form, 2 = processing, 3 = redirecting
  const [form, setForm] = useState({ name: "", email: "", country: "" });
  const [countryOpen, setCountryOpen] = useState(false);
  const [error, setError] = useState("");

  const selectedCountry = COUNTRIES.find((c) => c.code === form.country);

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.country) {
      setError("Please fill all fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email.");
      return;
    }
    setError("");
    setStep(2);

    try {
      const res = await axios.post(
        "https://api.thecineprism.com/api/v1/newsletter/checkout",
        {
          email: form.email,
          name: form.name,
          planId: plan.id,
          country: form.country,
        }
      );

      setStep(3);
      setTimeout(() => {
        window.location.href = res.data.checkoutUrl;
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.error || "Something went wrong. Please try again."
      );
      setStep(1);
    }
  };

  const inputClass = `w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 ${
    theme === "light"
      ? "bg-white border-gray-300 text-black placeholder-gray-400 focus:border-black"
      : "bg-slate-800/60 border-slate-700 text-white placeholder-slate-500 focus:border-slate-400"
  }`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className={`fixed inset-0 backdrop-blur-md z-50 flex items-center justify-center p-4 ${
        theme === "light" ? "bg-black/50" : "bg-slate-950/80"
      }`}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-md rounded-3xl border overflow-hidden shadow-2xl ${
          theme === "light"
            ? "bg-white border-gray-200"
            : "bg-slate-900 border-slate-700/50"
        }`}
      >
        {/* Header */}
        <div
          className={`p-6 border-b ${
            theme === "light" ? "border-gray-100" : "border-slate-800"
          }`}
        >
          <button
            onClick={onClose}
            className={`absolute top-4 right-4 p-2 rounded-full border transition-all ${
              theme === "light"
                ? "bg-gray-100 border-gray-200 hover:bg-gray-200"
                : "bg-slate-800 border-slate-700 hover:bg-slate-700"
            }`}
          >
            <X
              className={`w-4 h-4 ${
                theme === "light" ? "text-black" : "text-white"
              }`}
            />
          </button>
          <p
            className={`text-xs font-semibold uppercase tracking-widest mb-1 ${
              theme === "light" ? "text-gray-400" : "text-slate-500"
            }`}
          >
            Subscribe to
          </p>
          <h2
            className={`text-xl font-bold ${
              theme === "light" ? "text-black" : "text-white"
            }`}
          >
            {plan?.name}
          </h2>
          <p
            className={`text-sm mt-1 ${
              theme === "light" ? "text-gray-500" : "text-slate-400"
            }`}
          >
            {plan?.billingInterval === "YEARLY"
              ? `Billed annually`
              : `Billed monthly`}
          </p>
        </div>

        {/* Body */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <label
                    className={`block text-xs font-semibold mb-1.5 uppercase tracking-wider ${
                      theme === "light" ? "text-gray-600" : "text-slate-400"
                    }`}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    className={`block text-xs font-semibold mb-1.5 uppercase tracking-wider ${
                      theme === "light" ? "text-gray-600" : "text-slate-400"
                    }`}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    className={inputClass}
                  />
                </div>

                <div className="relative">
                  <label
                    className={`block text-xs font-semibold mb-1.5 uppercase tracking-wider ${
                      theme === "light" ? "text-gray-600" : "text-slate-400"
                    }`}
                  >
                    Country
                  </label>
                  <button
                    type="button"
                    onClick={() => setCountryOpen(!countryOpen)}
                    className={`w-full px-4 py-3 rounded-xl border text-sm outline-none text-left flex items-center justify-between transition-all duration-200 ${
                      theme === "light"
                        ? "bg-white border-gray-300 text-black focus:border-black"
                        : "bg-slate-800/60 border-slate-700 text-white focus:border-slate-400"
                    }`}
                  >
                    <span>
                      {selectedCountry
                        ? `${selectedCountry.flag} ${selectedCountry.name}`
                        : "Select your country"}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${countryOpen ? "rotate-180" : ""} ${
                        theme === "light" ? "text-gray-400" : "text-slate-500"
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {countryOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className={`absolute z-10 mt-1 w-full rounded-xl border shadow-xl overflow-hidden max-h-48 overflow-y-auto ${
                          theme === "light"
                            ? "bg-white border-gray-200"
                            : "bg-slate-800 border-slate-700"
                        }`}
                      >
                        {COUNTRIES.map((c) => (
                          <button
                            key={c.code}
                            type="button"
                            onClick={() => {
                              setForm((f) => ({ ...f, country: c.code }));
                              setCountryOpen(false);
                            }}
                            className={`w-full px-4 py-2.5 text-left text-sm flex items-center gap-2 transition-colors ${
                              theme === "light"
                                ? "hover:bg-gray-50 text-black"
                                : "hover:bg-slate-700 text-white"
                            } ${form.country === c.code ? (theme === "light" ? "bg-gray-100" : "bg-slate-700") : ""}`}
                          >
                            <span>{c.flag}</span>
                            <span>{c.name}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {error && (
                  <p className="text-red-400 text-sm">{error}</p>
                )}

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  className={`w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                    theme === "light"
                      ? "bg-black text-white hover:bg-gray-800"
                      : "bg-white text-black hover:bg-slate-100"
                  }`}
                >
                  Continue to Payment
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                <p
                  className={`text-xs text-center ${
                    theme === "light" ? "text-gray-400" : "text-slate-600"
                  }`}
                >
                  You'll be redirected to Razorpay to complete payment securely.
                </p>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 text-center"
              >
                <div
                  className={`mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 ${
                    theme === "light" ? "border-black" : "border-white"
                  }`}
                />
                <p
                  className={`font-medium ${
                    theme === "light" ? "text-black" : "text-white"
                  }`}
                >
                  Setting up your subscription...
                </p>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="redirecting"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-emerald-400" />
                </div>
                <p
                  className={`font-medium ${
                    theme === "light" ? "text-black" : "text-white"
                  }`}
                >
                  Redirecting to payment...
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Plan Card
const PlanCard = ({ plan, onSelect, theme, index }) => {
  const isYearly = plan?.billingInterval === "YEARLY";
  const isBollywood = plan?.type === "BOLLYWOOD";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative rounded-2xl border-2 border-dashed overflow-hidden cursor-pointer group transition-all duration-300 ${
        theme === "light"
          ? "border-gray-300 bg-gray-50 hover:border-black/60 hover:shadow-lg hover:shadow-black/10"
          : "border-slate-700/50 bg-slate-900/30 hover:border-amber-400/50 hover:shadow-lg hover:shadow-amber-400/10"
      }`}
      onClick={() => onSelect(plan)}
    >
      {isYearly && (
        <div className="absolute top-4 right-4 z-10">
          <span
            className={`text-xs font-bold px-2.5 py-1 rounded-full ${
              theme === "light"
                ? "bg-black text-white"
                : "bg-amber-400 text-black"
            }`}
          >
            BEST VALUE
          </span>
        </div>
      )}

      <div className="p-6">
        {/* Icon + Type */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isBollywood
                ? theme === "light"
                  ? "bg-orange-100"
                  : "bg-orange-500/20"
                : theme === "light"
                  ? "bg-blue-100"
                  : "bg-blue-500/20"
            }`}
          >
            {isBollywood ? (
              <Star
                className={`w-5 h-5 ${
                  isBollywood
                    ? theme === "light"
                      ? "text-orange-600"
                      : "text-orange-400"
                    : theme === "light"
                      ? "text-blue-600"
                      : "text-blue-400"
                }`}
              />
            ) : (
              <Film
                className={`w-5 h-5 ${
                  theme === "light" ? "text-blue-600" : "text-blue-400"
                }`}
              />
            )}
          </div>
          <div>
            <p
              className={`text-xs font-semibold uppercase tracking-widest ${
                theme === "light" ? "text-gray-400" : "text-slate-500"
              }`}
            >
              {plan?.type}
            </p>
            <h3
              className={`font-bold leading-tight ${
                theme === "light" ? "text-black" : "text-white"
              }`}
            >
              {plan?.name}
            </h3>
          </div>
        </div>

        {/* Price */}
        <div className="mb-5">
          <div className="flex items-baseline gap-1">
            <span
              className={`text-3xl font-black ${
                theme === "light" ? "text-black" : "text-white"
              }`}
            >
              {plan?.currency === "inr" ? "₹" : "$"}
              {Number(plan?.amount).toFixed(0)}
            </span>
            <span
              className={`text-sm ${
                theme === "light" ? "text-gray-400" : "text-slate-500"
              }`}
            >
              /{isYearly ? "year" : "month"}
            </span>
          </div>
          {isYearly && (
            <p
              className={`text-xs mt-1 ${
                theme === "light" ? "text-gray-500" : "text-slate-500"
              }`}
            >
              ~{plan?.currency === "inr" ? "₹" : "$"}
              {(Number(plan?.amount) / 12).toFixed(0)}/month
            </p>
          )}
        </div>

        {/* Features */}
        <ul className="space-y-2 mb-6">
          {(isBollywood
            ? [
                "Weekly Bollywood digest",
                "Box office analysis",
                "OTT release roundups",
                "Scene breakdowns",
                "Hidden gem picks",
              ]
            : [
                "Weekly Hollywood digest",
                "Festival coverage",
                "Awards season analysis",
                "Director spotlights",
                "Cinephile trivia",
              ]
          ).map((feature, i) => (
            <li key={i} className="flex items-center gap-2">
              <Check
                className={`w-4 h-4 flex-shrink-0 ${
                  theme === "light" ? "text-gray-700" : "text-slate-300"
                }`}
              />
              <span
                className={`text-sm ${
                  theme === "light" ? "text-gray-600" : "text-slate-400"
                }`}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          className={`w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
            theme === "light"
              ? "bg-black text-white group-hover:bg-gray-800"
              : "bg-white/10 text-white border border-white/20 group-hover:bg-white/20"
          }`}
        >
          Subscribe Now
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Hover glow */}
      <div
        className={`absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none ${
          theme === "light"
            ? "bg-gradient-to-br from-black/3 to-gray-600/3"
            : "bg-gradient-to-br from-amber-400/5 to-emerald-400/5"
        }`}
      />
    </motion.div>
  );
};

// Sample newsletter preview
const NewsletterPreview = ({ theme }) => {
  const sections = [
    { icon: Sparkles, label: "Industry Spotlight", desc: "Breaking news from Bollywood & Hollywood" },
    { icon: Film, label: "New Releases", desc: "Weekly reviews with our honest take" },
    { icon: BookOpen, label: "The Editorial", desc: "Deep dives into cinema culture" },
    { icon: Eye, label: "Scene Breakdown", desc: "Frame-by-frame analysis of iconic scenes" },
    { icon: Star, label: "Hidden Gem", desc: "Underrated films you must watch" },
    { icon: Clapperboard, label: "Cinephile Trivia", desc: "Film knowledge you'll actually use" },
  ];

  return (
    <div
      className={`rounded-2xl border-2 border-dashed overflow-hidden ${
        theme === "light"
          ? "border-gray-200 bg-gray-50"
          : "border-slate-800 bg-slate-900/40"
      }`}
    >
      {/* Mock email header */}
      <div
        className={`px-6 py-4 border-b ${
          theme === "light" ? "border-gray-200 bg-white" : "border-slate-800"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              theme === "light" ? "bg-black" : "bg-white"
            }`}
          >
            <Film
              className={`w-4 h-4 ${
                theme === "light" ? "text-white" : "text-black"
              }`}
            />
          </div>
          <div>
            <p
              className={`text-xs font-bold ${
                theme === "light" ? "text-black" : "text-white"
              }`}
            >
              The Cineprism Weekly
            </p>
            <p
              className={`text-xs ${
                theme === "light" ? "text-gray-400" : "text-slate-500"
              }`}
            >
              newsletter@thecineprism.com
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <p
          className={`text-xs font-semibold uppercase tracking-widest mb-4 ${
            theme === "light" ? "text-gray-400" : "text-slate-500"
          }`}
        >
          Every issue includes
        </p>
        <div className="grid grid-cols-1 gap-3">
          {sections.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              className={`flex items-center gap-3 p-3 rounded-xl ${
                theme === "light" ? "bg-white" : "bg-slate-800/50"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  theme === "light" ? "bg-gray-100" : "bg-slate-700/60"
                }`}
              >
                <s.icon
                  className={`w-4 h-4 ${
                    theme === "light" ? "text-black" : "text-slate-300"
                  }`}
                />
              </div>
              <div>
                <p
                  className={`text-sm font-semibold leading-tight ${
                    theme === "light" ? "text-black" : "text-white"
                  }`}
                >
                  {s.label}
                </p>
                <p
                  className={`text-xs ${
                    theme === "light" ? "text-gray-500" : "text-slate-500"
                  }`}
                >
                  {s.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main Page
const NewsletterPage = () => {
  const { theme } = useTheme();
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [activeTab, setActiveTab] = useState("MONTHLY"); // MONTHLY | YEARLY

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get(
          "https://api.thecineprism.com/api/v1/newsletter/plans"
        );
        setPlans(res.data.plans || []);
      } catch (err) {
        console.error("Failed to fetch plans:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const filteredPlans = plans.filter((p) => p.billingInterval === activeTab);

  return (
    <div
      className={`min-h-screen pt-20 transition-colors duration-300 ${
        theme === "light" ? "bg-[#FFF8DC] text-black" : "bg-slate-950 text-white"
      }`}
    >
      {/* Background effects matching homepage */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {theme === "light" ? (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(0,0,0,0.03),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(0,0,0,0.03),transparent_50%)]" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(16,185,129,0.03),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(245,158,11,0.03),transparent_50%)]" />
          </>
        )}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <span
              className={`inline-flex items-center gap-3 backdrop-blur-none border px-5 py-2.5 rounded-full text-sm font-medium ${
                theme === "light"
                  ? "bg-white/80 border-gray-200 text-gray-700"
                  : "bg-slate-800/30 border-slate-700/30 text-slate-200"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full animate-pulse ${
                  theme === "light" ? "bg-black" : "bg-slate-200"
                }`}
              />
              Cinema for acquired taste.
              <Film className="w-4 h-4" />
            </span>
          </div>

          <h1
            className={`text-5xl sm:text-6xl md:text-7xl font-light leading-[0.9] tracking-tight mb-6 ${
              theme === "light" ? "text-black" : "text-slate-100"
            }`}
          >
            <span className="font-extralight">The</span>
            <br />
            <span
              className={`font-normal bg-clip-text text-transparent ${
                theme === "light"
                  ? "bg-gradient-to-r from-black via-gray-800 to-gray-600"
                  : "bg-gradient-to-r from-slate-100 via-white to-slate-200"
              }`}
            >
              Cinéprism Newsletter
            </span>
          </h1>

          <p
            className={`text-lg max-w-2xl mx-auto leading-relaxed ${
              theme === "light" ? "text-gray-600" : "text-slate-400"
            }`}
          >
            Deep dives, critical essays, and curated film picks — delivered to
            your inbox every week. Choose Bollywood, Hollywood, or both.
          </p>
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left — Plans */}
          <div className="lg:col-span-2">
            {/* Billing toggle */}
            <div className="flex items-center gap-3 mb-8">
              {["MONTHLY", "YEARLY"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeTab === tab
                      ? theme === "light"
                        ? "bg-black text-white"
                        : "bg-white text-black"
                      : theme === "light"
                        ? "bg-white border border-gray-200 text-gray-500 hover:border-gray-400"
                        : "bg-slate-800/50 border border-slate-700 text-slate-400 hover:border-slate-500"
                  }`}
                >
                  {tab === "YEARLY" ? "Yearly (Save 20%)" : "Monthly"}
                </button>
              ))}
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-24">
                <div
                  className={`h-12 w-12 animate-spin rounded-full border-b-2 ${
                    theme === "light" ? "border-black" : "border-emerald-400"
                  }`}
                />
              </div>
            ) : filteredPlans.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredPlans.map((plan, i) => (
                  <PlanCard
                    key={plan.id}
                    plan={plan}
                    index={i}
                    theme={theme}
                    onSelect={setSelectedPlan}
                  />
                ))}
              </div>
            ) : (
              // Fallback placeholder cards when no plans in DB yet
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    id: "bollywood-placeholder",
                    name: "Bollywood Weekly",
                    type: "BOLLYWOOD",
                    billingInterval: activeTab,
                    amount: activeTab === "MONTHLY" ? 199 : 1999,
                    currency: "inr",
                  },
                  {
                    id: "hollywood-placeholder",
                    name: "Hollywood Weekly",
                    type: "HOLLYWOOD",
                    billingInterval: activeTab,
                    amount: activeTab === "MONTHLY" ? 199 : 1999,
                    currency: "inr",
                  },
                ].map((plan, i) => (
                  <PlanCard
                    key={plan.id}
                    plan={plan}
                    index={i}
                    theme={theme}
                    onSelect={setSelectedPlan}
                  />
                ))}
              </div>
            )}

            {/* Trust line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className={`mt-8 flex flex-wrap items-center gap-6 text-sm ${
                theme === "light" ? "text-gray-400" : "text-slate-600"
              }`}
            >
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4" /> Cancel anytime
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4" /> Secure payment via Razorpay
              </span>
              <span className="flex items-center gap-2">
                <Globe className="w-4 h-4" /> UPI & International cards accepted
              </span>
            </motion.div>
          </div>

          {/* Right — Preview */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p
                className={`text-xs font-semibold uppercase tracking-widest mb-4 ${
                  theme === "light" ? "text-gray-400" : "text-slate-500"
                }`}
              >
                What you'll receive
              </p>
              <NewsletterPreview theme={theme} />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Checkout modal */}
      <AnimatePresence>
        {selectedPlan && (
          <CheckoutModal
            plan={selectedPlan}
            theme={theme}
            onClose={() => setSelectedPlan(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default NewsletterPage;
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";
import {
  Check,
  Film,
  ArrowRight,
  Loader2,
  ChevronDown,
  X,
  Calendar,
  BookOpen,
  Eye,
  TrendingUp,
  Star,
  Globe,
  Clapperboard,
} from "lucide-react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import Marquee from "../components/Marquee";

// ─── Constants ───────────────────────────────────────────────────────────────

const API = "https://api.thecineprism.com/api/v1";

const FEATURES = [
  "Weekly new releases with honest ratings",
  "The Editorial — one strong opinion every week",
  "Scene Breakdown — frame by frame analysis",
  "Hidden Gem of the week",
  "Industry news worth knowing",
  "Cinephile trivia and technique",
  "What to watch, what to skip on OTT",
];

const POSTER_URLS = [
  "https://image.tmdb.org/t/p/w342/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", // Interstellar
  "https://image.tmdb.org/t/p/w342/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg", // Parasite
  "https://image.tmdb.org/t/p/w342/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg", // Joker
  "https://image.tmdb.org/t/p/w342/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg", // The Godfather
  "https://image.tmdb.org/t/p/w342/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg", // Oppenheimer
  "https://image.tmdb.org/t/p/original/v1tRXZ4JtD2Iv6fjkPvT4GiwslV.jpg", // Dune
  "https://image.tmdb.org/t/p/w342/qJ2tW6WMUDux911r6m7haRef0WH.jpg", // The Dark Knight
  "https://image.tmdb.org/t/p/w342/hek3koDUyRQk7FIhPXsa6mT2Zc3.jpg", // Blade Runner 2049
];

const ISSUE_SECTIONS = [
  {
    label: "EDITORIAL",
    Icon: BookOpen,
    headline: "One strong opinion, every week",
    teaser: "Not a summary. An argument.",
  },
  {
    label: "NEW RELEASES",
    Icon: Film,
    headline: "What to watch. What to skip.",
    teaser: "Honest ratings before the discourse dies down.",
  },
  {
    label: "SCENE BREAKDOWN",
    Icon: Eye,
    headline: "Frame by frame analysis",
    teaser: "The technique behind the moment.",
  },
  {
    label: "HIDDEN GEM",
    Icon: Star,
    headline: "One underseen film, every issue",
    teaser: "Films the algorithm will never surface.",
  },
  {
    label: "INDUSTRY",
    Icon: TrendingUp,
    headline: "News worth knowing",
    teaser: "Not gossip. What actually shapes cinema.",
  },
  {
    label: "CINEPHILE TRIVIA",
    Icon: Clapperboard,
    headline: "Film knowledge you'll actually use",
    teaser: "Technique, history, the stuff that changes how you watch.",
  },
];

const WHO_ITS_FOR = [
  "People who watch at least one film a week",
  "People who are tired of algorithmic recommendations",
  "People who want to understand film, not just consume it",
  "People who miss having a knowledgeable friend to discuss cinema with",
];

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function NewsletterPage() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // ── State (preserved from original) ─────────────────────────────────────
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [billing, setBilling] = useState("MONTHLY"); // "MONTHLY" | "YEARLY"
  const [modalOpen, setModalOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [slowLoading, setSlowLoading] = useState(false);
  const [error, setError] = useState("");

  const [openFaq, setOpenFaq] = useState(null);

  // Pre-fill from auth (preserved)
  useEffect(() => {
    if (user) {
      setName(user.username || user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  // Fetch plans (preserved)
  useEffect(() => {
    axios
      .get(`${API}/newsletter/plans`)
      .then((res) => setPlans(res.data.plans || []))
      .catch(() => setError("Failed to load plans. Please refresh."))
      .finally(() => setLoading(false));
  }, []);

  // Filter by active billing toggle (preserved)
  const selectedPlan = plans.find((p) => p.billingInterval === billing);

  // FIX 4: map HTTP status codes to user-friendly messages
  const getCheckoutError = (err) => {
    if (!err.response) {
      return "Connection failed. Please check your internet and try again.";
    }
    const status = err.response?.status;
    if (status === 409)
      return "You already have an active subscription to this plan.";
    if (status === 404)
      return "This plan is currently unavailable. Please refresh the page.";
    if (status === 500)
      return "Something went wrong on our end. Please try again in a moment.";
    return (
      err.response?.data?.error || "Something went wrong. Please try again."
    );
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!selectedPlan) return;
    setError("");
    setSlowLoading(false);
    setSubmitting(true);

    const slowTimer = setTimeout(() => setSlowLoading(true), 15000);

    try {
      const res = await axios.post(`${API}/newsletter/checkout`, {
        email: email.trim(),
        name: name.trim() || undefined,
        planId: selectedPlan.id,
        country: "IN",
        userId: user?.id || undefined,
      });
      clearTimeout(slowTimer);
      setSlowLoading(false);

      const { subscriptionId, razorpayKeyId } = res.data;

      // Open Razorpay embedded checkout modal — no page redirect needed,
      // no callback_url required. The handler fires on payment success.
      const rzp = new window.Razorpay({
        key: razorpayKeyId,
        subscription_id: subscriptionId,
        name: "The Cineprism",
        description: `${selectedPlan.name} — ₹${(selectedPlan.amount / 100).toFixed(0)}/${billing === "MONTHLY" ? "month" : "year"}`,
        image: "https://thecineprism.com/thecineprismlogo.jpg",
        prefill: {
          name: name.trim() || undefined,
          email: email.trim(),
        },
        theme: { color: "#D4AF37" },
        handler: function (response) {
          // Payment succeeded — navigate to status page with the subscription ID
          window.location.href = `/newsletter/status?razorpay_subscription_id=${response.razorpay_subscription_id}`;
        },
        modal: {
          ondismiss: function () {
            // User closed the modal without paying
            setSubmitting(false);
            setError("Payment cancelled. You can try again whenever you're ready.");
          },
        },
      });

      rzp.on("payment.failed", function (response) {
        setSubmitting(false);
        setError(
          response.error?.description ||
          "Payment failed. Please try again or use a different payment method."
        );
      });

      rzp.open();
      // Keep submitting=true while modal is open so button stays disabled
    } catch (err) {
      clearTimeout(slowTimer);
      setSlowLoading(false);
      setError(getCheckoutError(err));
      setSubmitting(false);
    }
  };

  // Updated FAQ content
  const faqs = [
    {
      q: "When does the newsletter arrive?",
      a: "Every Friday morning in your inbox. No exceptions, no skipped weeks.",
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes. Cancel from your account or email us. You keep access until the end of your billing period.",
    },
    {
      q: "Is there a free trial?",
      a: "No free trial — but the first issue will make the ₹99 feel worth it or we've failed at our job.",
    },
    {
      q: "What makes this different from free film newsletters?",
      a: "We have a point of view. Every section has an opinion, not just information. You're not subscribing to aggregated news — you're subscribing to a perspective.",
    },
  ];

  // ── Shared style helpers ─────────────────────────────────────────────────
  const gradientText = isDark
    ? "bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent"
    : "bg-gradient-to-r from-black via-gray-800 to-gray-600 bg-clip-text text-transparent";

  const mutedText = isDark ? "text-slate-400" : "text-gray-800";

  return (
    <>
      <Helmet>
        <title>Newsletter — TheCinePrism</title>
        <meta
          name="description"
          content="Subscribe to The Cineprism Weekly — honest reviews, deep dives, and curated film picks delivered every Friday. Written for people who take cinema seriously."
        />
      </Helmet>

      {/* Font imports — same pattern as Homepage */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,400&family=Inter:wght@300;400;500;600&display=swap');
        .font-playfair  { font-family: 'Playfair Display', Georgia, serif; }
        .font-garamond  { font-family: 'EB Garamond', Georgia, serif; }
        .font-editorial { font-family: 'EB Garamond', Georgia, serif; }
        .font-inter     { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
        .font-dm-mono   { font-family: 'DM Mono', 'Courier New', monospace; }
        .font-dm-sans   { font-family: 'DM Sans', ui-sans-serif, system-ui, sans-serif; }
      `}</style>

      <div
        className={`min-h-screen transition-colors duration-300 ${
          isDark ? "bg-slate-950 text-white" : "bg-white text-black"
        }`}
      >
        {/* ════════════════════════════════════════════════════════════════════
            SECTION 1 — CINEMATIC HERO
            Full-width mosaic of movie posters behind a heavy overlay.
            Posters are barely visible as texture; content floats on top.
        ════════════════════════════════════════════════════════════════════ */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
          {/* Poster mosaic — absolute background */}
          <div className="absolute inset-0">
            <div className="grid grid-cols-4 grid-rows-2 h-full">
              {POSTER_URLS.map((url, i) => (
                <div key={i} className="relative overflow-hidden">
                  <img
                    src={url}
                    alt=""
                    aria-hidden="true"
                    className={`absolute inset-0 w-full h-full object-cover ${
                      isDark ? "" : "brightness-[0.55] saturate-[1.15]"
                    }`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
            {/* Overlay strategy:
              Dark  — bg-slate-950/80: posters visible as atmospheric texture.
              Light — posters are grayscale+dark via CSS filter, then
                      bg-white/50 sits on top → clean film-grain texture,
                      black text is perfectly readable. */}
            <div
              className={`absolute inset-0 ${
                isDark ? "bg-slate-950/80" : "bg-white/40"
              }`}
            />
          </div>

          {/* Hero content — sits above the overlay */}
          <div className="relative z-10 text-center px-4 sm:px-6 py-24 max-w-4xl mx-auto w-full">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center mb-8"
            >
              <span
                className={`inline-flex items-center gap-2.5 rounded-full px-5 py-2 text-sm font-medium border ${
                  isDark
                    ? "bg-slate-800/50 border-slate-700/50 text-slate-300"
                    : "bg-white/90 border-gray-300 text-gray-800"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                    isDark ? "bg-slate-300" : "bg-gray-800"
                  }`}
                />
                Est. 2024 · Cinema for acquired taste
              </span>
            </motion.div>

            {/* Headline — two lines */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1 }}
            >
              <h1 className="leading-[1.05] tracking-tight">
                <span
                  className={`block font-extralight text-5xl sm:text-6xl md:text-7xl lg:text-8xl ${
                    isDark ? "" : "text-gray-900"
                  }`}
                >
                  THE CINÉPRISM
                </span>
                <span
                  className={`block font-normal text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-playfair ${gradientText}`}
                >
                  Weekly
                </span>
              </h1>
            </motion.div>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className={`mt-7 text-base sm:text-lg leading-relaxed max-w-xl mx-auto font-medium ${
                isDark ? "text-slate-400" : "text-gray-950"
              }`}
            >
              Deep dives, honest reviews, and curated film picks — delivered
              every Friday. Written for people who take cinema seriously.
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.42 }}
              className={`mt-8 flex items-center justify-center gap-6 text-sm font-semibold ${
                isDark ? "text-slate-400" : "text-gray-950"
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                Every Friday
              </span>
              <span
                className={`w-px h-4 ${isDark ? "bg-slate-700" : "bg-gray-300"}`}
              />
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                ₹99/month
              </span>
            </motion.div>
          </div>

          {/* Scroll indicator — bouncing chevron signals content below */}
          <div
            className={`absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce ${
              isDark ? "text-slate-400" : "text-gray-500"
            }`}
          >
            <ChevronDown className="w-6 h-6" />
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 2 — LATEST ISSUE PREVIEW (MOCK EMAIL)
            Styled as an email open in a mail client.
        ════════════════════════════════════════════════════════════════════ */}
        <section className="max-w-2xl mx-auto px-4 sm:px-6 py-20">
          {/* Section label + rule */}
          <div className="mb-6">
            <p
              className={`text-xs tracking-[0.2em] uppercase font-mono text-center mb-3 ${mutedText}`}
            >
              Latest Issue Preview
            </p>
            <div
              className={`h-px ${isDark ? "bg-slate-800" : "bg-gray-200"}`}
            />
          </div>

          {/* Mock email card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`rounded-2xl overflow-hidden ${
              isDark
                ? "bg-slate-900 border border-slate-700/60 shadow-2xl"
                : "bg-white border border-gray-200 shadow-lg"
            }`}
          >
            {/* ── Email client top bar — fake macOS window chrome ── */}
            <div
              className={`h-8 flex items-center px-4 gap-2 ${
                isDark
                  ? "bg-slate-800 border-b border-slate-700/60"
                  : "bg-gray-100 border-b border-gray-200"
              }`}
            >
              {/* Traffic-light circles */}
              <span className="w-3 h-3 rounded-full bg-red-400/60 flex-shrink-0" />
              <span className="w-3 h-3 rounded-full bg-yellow-400/60 flex-shrink-0" />
              <span className="w-3 h-3 rounded-full bg-green-400/60 flex-shrink-0" />
              {/* Fake sender address */}
              <span className={`ml-auto text-xs ${mutedText}`}>
                newsletter@thecineprism.com
              </span>
            </div>

            {/* ── Email header ── */}
            <div className="p-5 pb-0">
              {/* From row — avatar + sender details */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isDark ? "bg-slate-700" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`text-xs font-bold ${
                      isDark ? "text-slate-200" : "text-gray-700"
                    }`}
                  >
                    TC
                  </span>
                </div>
                <div>
                  <p
                    className={`text-sm font-semibold leading-tight ${
                      isDark ? "text-slate-100" : "text-gray-900"
                    }`}
                  >
                    The Cineprism Weekly
                  </p>
                  <p className={`text-xs leading-tight mt-0.5 ${mutedText}`}>
                    newsletter@thecineprism.com → you
                  </p>
                </div>
              </div>

              {/* Subject line — Playfair */}
              <h3
                className={`font-playfair text-base font-bold leading-snug mb-2 ${
                  isDark ? "text-slate-100" : "text-gray-900"
                }`}
              >
                The Mid-Budget Film Is Dying — And We&rsquo;re Letting It Happen
              </h3>

              {/* Preview text */}
              <p className={`text-sm leading-relaxed mb-4 ${mutedText}`}>
                This week: Oppenheimer&rsquo;s box office legacy, a scene
                breakdown from Dune Part Two, and one film from 1974 you need to
                watch this weekend.
              </p>

              {/* Divider rule */}
              <div
                className={`h-px ${isDark ? "bg-slate-700/40" : "bg-gray-200"}`}
              />
            </div>

            {/* ── Email body preview — truncated with fade ── */}
            {/*
              The wrapper is `relative overflow-hidden` so the absolute fade
              gradient sits inside this box. The gradient's `to-*` color matches
              the card background exactly, creating a seamless cutoff:
                dark  → to-slate-900  (card is bg-slate-900)
                light → to-white      (card is bg-white)
            */}
            <div className="relative px-5 pt-5 pb-1 overflow-hidden">
              {/* Section label inside email body */}
              <p
                className={`text-[10px] tracking-[0.2em] uppercase font-mono mb-2 ${mutedText}`}
              >
                Editorial &middot; Issue No. 12
              </p>

              {/* Article headline */}
              <h4
                className={`font-playfair text-lg font-bold leading-snug mb-3 ${
                  isDark ? "text-slate-100" : "text-gray-900"
                }`}
              >
                Why We Need More Mid-Budget Films Now Than Ever
              </h4>

              {/* Article body — two lines, ends with ellipsis */}
              <p
                className={`font-editorial text-sm leading-relaxed pb-12 ${
                  isDark ? "text-slate-400" : "text-gray-600"
                }`}
              >
                This week, as I watched The Long Shadow in a nearly empty
                Thursday matinee, I was struck by a sobering realization: films
                like this are becoming endangered species. Not because
                they&rsquo;re bad...
              </p>

              {/* Fade overlay — blends body text into card background */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-16 pointer-events-none ${
                  isDark
                    ? "bg-gradient-to-b from-transparent to-slate-900"
                    : "bg-gradient-to-b from-transparent to-white"
                }`}
              />
            </div>

            
          </motion.div>

          {/* Below-card note */}
          <p className={`text-xs text-center mt-5 ${mutedText}`}>
            A new issue lands in your inbox every Friday morning.
          </p>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 3 — WHAT'S INSIDE (NEWSPAPER FRONT PAGE)
            The entire section is styled as a printed broadsheet.
            Masthead → three editorial columns → newspaper footer.
        ════════════════════════════════════════════════════════════════════ */}
        <section
          className={`border-t py-16 px-4 sm:px-6 ${
            isDark ? "border-slate-800/50" : "border-gray-200"
          }`}
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`border p-6 sm:p-8 md:p-10 ring-1 ring-offset-2 ${
                isDark
                  ? "bg-slate-900 border-slate-700/50 shadow-2xl shadow-black/40 ring-slate-700/30 ring-offset-slate-900"
                  : "bg-[#f5f0e8] border-gray-400 shadow-lg shadow-gray-400/20 ring-gray-300/50 ring-offset-[#f5f0e8]"
              }`}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
              }}
            >
              {/* ── MASTHEAD ──────────────────────────────────────────────── */}
              <div>
                {/* Top rule */}
                <div
                  className={`h-px mb-3 ${
                    isDark ? "bg-slate-600/30" : "bg-gray-400/40"
                  }`}
                />

                {/* Publication line — Inter sans-serif, uppercase, letter-spaced */}
                <p
                  className={`text-[10px] tracking-[0.28em] uppercase text-center font-inter ${
                    isDark ? "text-slate-500" : "text-gray-500"
                  }`}
                >
                  The Cineprism Weekly &nbsp;&middot;&nbsp; Every Friday
                  &nbsp;&middot;&nbsp; Est. 2024
                </p>

                {/* Rule */}
                <div
                  className={`h-px mt-3 mb-5 ${
                    isDark ? "bg-slate-600/30" : "bg-gray-400/40"
                  }`}
                />

                {/* Main headline — Playfair Black, centerpiece */}
                <h2
                  className={`font-playfair font-black text-4xl sm:text-5xl md:text-6xl text-center tracking-tight leading-tight ${
                    isDark ? "text-slate-100" : "text-gray-900"
                  }`}
                >
                  What&rsquo;s Inside Every Issue
                </h2>

                {/* Rule */}
                <div
                  className={`h-px mt-5 mb-3 ${
                    isDark ? "bg-slate-600/30" : "bg-gray-400/40"
                  }`}
                />

                {/* Dateline — EB Garamond italic */}
                <p
                  className={`font-garamond italic text-base text-center leading-relaxed ${
                    isDark ? "text-slate-500" : "text-gray-500"
                  }`}
                >
                  Your weekly dispatch on cinema — reviews, analysis, hidden
                  gems, and one strong opinion
                </p>

                {/* Rule separating masthead from columns */}
                <div
                  className={`h-px mt-3 mb-7 ${
                    isDark ? "bg-slate-600/30" : "bg-gray-400/40"
                  }`}
                />
              </div>

              {/* ── THREE COLUMNS ─────────────────────────────────────────── */}
              <div
                className={`grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x ${
                  isDark ? "divide-slate-700/25" : "divide-gray-400/40"
                }`}
              >
                {/* ── COLUMN 1 — THE EDITORIAL ── */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0 }}
                  className="pt-0 pb-7 lg:pb-0 lg:pr-7"
                >
                  {/* Column header — Inter, uppercase, no mono */}
                  <p
                    className={`text-[11px] tracking-widest uppercase font-inter font-medium pb-2.5 border-b ${
                      isDark
                        ? "text-slate-500 border-slate-700/40"
                        : "text-gray-500 border-gray-400/50"
                    }`}
                  >
                    Vol. I &nbsp;&middot;&nbsp; Editorial
                  </p>

                  {/* Headline — Playfair, text-xl */}
                  <h3
                    className={`font-playfair font-bold text-xl leading-snug mt-3 mb-3 ${
                      isDark ? "text-slate-100" : "text-gray-900"
                    }`}
                  >
                    One Strong Opinion. Every Week. No Exceptions.
                  </h3>

                  <div
                    className={`h-px mb-3 ${
                      isDark ? "bg-slate-600/30" : "bg-gray-400/40"
                    }`}
                  />

                  {/* Body text — EB Garamond, base size */}
                  <p
                    className={`font-garamond text-base leading-relaxed tracking-wide ${
                      isDark ? "text-slate-400" : "text-gray-600"
                    }`}
                  >
                    Not a summary of what critics said. Not a round-up of takes.
                    One argument, fully formed, every Friday. The kind of film
                    writing that makes you see a movie differently — or want to
                    argue back.
                  </p>

                  <div
                    className={`h-px mt-4 mb-3 ${
                      isDark ? "bg-slate-600/30" : "bg-gray-400/40"
                    }`}
                  />

                  {/* Also in this issue — Inter label */}
                  <p
                    className={`text-[11px] tracking-widest uppercase font-inter font-medium mb-2.5 ${
                      isDark ? "text-slate-500" : "text-gray-500"
                    }`}
                  >
                    Also In This Issue
                  </p>
                  <ul
                    className={`space-y-2 font-garamond text-base tracking-wide ${
                      isDark ? "text-slate-400" : "text-gray-600"
                    }`}
                  >
                    <li className="flex items-start gap-2">
                      <span
                        className={`mt-[3px] text-xs leading-none select-none ${
                          isDark ? "text-slate-500" : "text-gray-400"
                        }`}
                      >
                        &middot;
                      </span>
                      Scene Breakdown — frame by frame, every week
                    </li>
                    <li className="flex items-start gap-2">
                      <span
                        className={`mt-[3px] text-xs leading-none select-none ${
                          isDark ? "text-slate-500" : "text-gray-400"
                        }`}
                      >
                        &middot;
                      </span>
                      Cinephile Trivia — technique that changes how you watch
                    </li>
                  </ul>
                </motion.div>

                {/* ── COLUMN 2 — NEW RELEASES & OTT ── */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="py-7 lg:py-0 lg:px-7"
                >
                  {/* Column header — Inter, uppercase, no mono */}
                  <p
                    className={`text-[11px] tracking-widest uppercase font-inter font-medium pb-2.5 border-b ${
                      isDark
                        ? "text-slate-500 border-slate-700/40"
                        : "text-gray-500 border-gray-400/50"
                    }`}
                  >
                    Vol. II &nbsp;&middot;&nbsp; This Week in Cinema
                  </p>

                  {/* Headline — Playfair, text-xl */}
                  <h3
                    className={`font-playfair font-bold text-xl leading-snug mt-3 mb-3 ${
                      isDark ? "text-slate-100" : "text-gray-900"
                    }`}
                  >
                    What to Watch. What to Skip. Before the Discourse Dies Down.
                  </h3>

                  <div
                    className={`h-px mb-3 ${
                      isDark ? "bg-slate-600/30" : "bg-gray-400/40"
                    }`}
                  />

                  {/* Body text — EB Garamond, base size */}
                  <p
                    className={`font-garamond text-base leading-relaxed tracking-wide ${
                      isDark ? "text-slate-400" : "text-gray-600"
                    }`}
                  >
                    Every major theatrical release and OTT drop — reviewed with
                    honest ratings before the algorithm decides what you think.
                    No PR language. No hedging. Just the verdict.
                  </p>

                  <div
                    className={`h-px mt-4 mb-3 ${
                      isDark ? "bg-slate-600/30" : "bg-gray-400/40"
                    }`}
                  />

                  {/* Pull-quote box — newspaper verdict snippet */}
                  <div
                    className={`p-3 border ${
                      isDark
                        ? "border-slate-700/50 bg-slate-800/30"
                        : "border-gray-400/50 bg-[#e8e2d0]"
                    }`}
                  >
                    {/* Label — Inter */}
                    <p
                      className={`text-[10px] tracking-widest uppercase font-inter font-medium mb-2 ${
                        isDark ? "text-slate-500" : "text-gray-500"
                      }`}
                    >
                      This Week&rsquo;s Verdict
                    </p>
                    {/* Quote — EB Garamond italic, base size */}
                    <p
                      className={`font-garamond italic text-base leading-relaxed ${
                        isDark ? "text-slate-300" : "text-gray-700"
                      }`}
                    >
                      ★★★★½ &mdash; A masterclass in atmospheric tension.
                    </p>
                    {/* Attribution — Inter, muted */}
                    <p
                      className={`font-inter text-xs mt-1.5 ${
                        isDark ? "text-slate-500" : "text-gray-500"
                      }`}
                    >
                      &mdash; The Cineprism, on The Long Shadow
                    </p>
                  </div>

                  <div
                    className={`h-px mt-4 mb-3 ${
                      isDark ? "bg-slate-600/30" : "bg-gray-400/40"
                    }`}
                  />

                  {/* Streaming picks — Inter label */}
                  <p
                    className={`text-[11px] tracking-widest uppercase font-inter font-medium mb-1.5 ${
                      isDark ? "text-slate-500" : "text-gray-500"
                    }`}
                  >
                    Streaming Picks
                  </p>
                  <p
                    className={`font-garamond text-base leading-relaxed tracking-wide ${
                      isDark ? "text-slate-400" : "text-gray-600"
                    }`}
                  >
                    One OTT recommendation every issue. Not the
                    algorithm&rsquo;s pick — ours.
                  </p>
                </motion.div>

                {/* ── COLUMN 3 — HIDDEN GEM & INDUSTRY ── */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="pt-7 pb-0 lg:pt-0 lg:pl-7"
                >
                  {/* Column header — Inter, uppercase, no mono */}
                  <p
                    className={`text-[11px] tracking-widest uppercase font-inter font-medium pb-2.5 border-b ${
                      isDark
                        ? "text-slate-500 border-slate-700/40"
                        : "text-gray-500 border-gray-400/50"
                    }`}
                  >
                    Vol. III &nbsp;&middot;&nbsp; Beyond the Algorithm
                  </p>

                  {/* Headline — Playfair, text-xl */}
                  <h3
                    className={`font-playfair font-bold text-xl leading-snug mt-3 mb-3 ${
                      isDark ? "text-slate-100" : "text-gray-900"
                    }`}
                  >
                    One Underseen Film. One Industry Story Worth Knowing.
                  </h3>

                  <div
                    className={`h-px mb-3 ${
                      isDark ? "bg-slate-600/30" : "bg-gray-400/40"
                    }`}
                  />

                  {/* Body text — EB Garamond, base size */}
                  <p
                    className={`font-garamond text-base leading-relaxed tracking-wide ${
                      isDark ? "text-slate-400" : "text-gray-600"
                    }`}
                  >
                    Every issue surfaces one film the algorithm will never show
                    you. Could be from 1963 or last month. Could be Iranian or
                    Irish. Will always be worth your time.
                  </p>

                  <div
                    className={`h-px mt-4 mb-3 ${
                      isDark ? "bg-slate-600/30" : "bg-gray-400/40"
                    }`}
                  />

                  {/* Industry sub-section — Inter label */}
                  <p
                    className={`text-[11px] tracking-widest uppercase font-inter font-medium mb-1.5 ${
                      isDark ? "text-slate-500" : "text-gray-500"
                    }`}
                  >
                    Industry Dispatch
                  </p>
                  {/* Industry body — EB Garamond italic */}
                  <p
                    className={`font-garamond italic text-base leading-relaxed tracking-wide ${
                      isDark ? "text-slate-400" : "text-gray-600"
                    }`}
                  >
                    Not gossip. The moves that shape what films get made.
                  </p>

                  <div
                    className={`h-px mt-4 mb-3 ${
                      isDark ? "bg-slate-600/30" : "bg-gray-400/40"
                    }`}
                  />

                  {/* Subscription notice — old newspaper classifieds style */}
                  <div
                    className={`p-3 border text-center ${
                      isDark
                        ? "border-slate-700/50 bg-slate-800/30"
                        : "border-gray-400/50 bg-[#e8e2d0]"
                    }`}
                  >
                    {/* Label — Inter uppercase */}
                    <p
                      className={`text-[10px] tracking-widest uppercase font-inter font-medium mb-1 ${
                        isDark ? "text-slate-500" : "text-gray-500"
                      }`}
                    >
                      Subscribe
                    </p>
                    {/* Price — Playfair bold, xl */}
                    <p
                      className={`font-playfair font-bold text-xl mb-0.5 ${
                        isDark ? "text-slate-100" : "text-gray-900"
                      }`}
                    >
                      ₹99 per month
                    </p>
                    {/* Delivery line — EB Garamond italic */}
                    <p
                      className={`font-garamond italic text-sm mb-3 ${
                        isDark ? "text-slate-500" : "text-gray-500"
                      }`}
                    >
                      Delivered every Friday
                    </p>
                    {/* Button — Inter medium, triggers checkout modal */}
                    <button
                      onClick={() => {
                        setBilling("MONTHLY");
                        setModalOpen(true);
                      }}
                      className={`font-inter font-medium text-sm underline underline-offset-2 transition-opacity hover:opacity-60 ${
                        isDark ? "text-slate-300" : "text-gray-700"
                      }`}
                    >
                      Subscribe Now &rarr;
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* ── NEWSPAPER FOOTER ──────────────────────────────────────── */}
              <div className="mt-7">
                <div
                  className={`h-px mb-3 ${
                    isDark ? "bg-slate-600/30" : "bg-gray-400/40"
                  }`}
                />
                {/* Footer text — Inter, uppercase, small */}
                <p
                  className={`text-[10px] tracking-[0.2em] uppercase text-center font-inter ${
                    isDark ? "text-slate-600" : "text-gray-400"
                  }`}
                >
                  The Cineprism Weekly &nbsp;&middot;&nbsp; Thecineprism.com
                  &nbsp;&middot;&nbsp; All Rights Reserved
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 4 — FILM POSTER STRIP (decorative divider)
            Grayscale by default; hover reveals color.
        ════════════════════════════════════════════════════════════════════ */}
        <section
          className={`py-10 border-y ${
            isDark
              ? "bg-slate-900/30 border-slate-800/40"
              : "bg-gray-100/50 border-gray-200"
          }`}
        >
          <Marquee speed={35}>
            {POSTER_URLS.map((url, i) => (
              <PosterTile key={i} url={url} />
            ))}
          </Marquee>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            COUNTDOWN — time until next Friday issue
        ════════════════════════════════════════════════════════════════════ */}
        <CountdownTimer isDark={isDark} />

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 5 — PRICING / SUBSCRIBE
            Left: cinema ticket card. Right: who is this for.
            All checkout logic is preserved exactly.
        ════════════════════════════════════════════════════════════════════ */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
          {loading ? (
            <div className="flex justify-center py-24">
              <Loader2 className={`w-8 h-8 animate-spin ${mutedText}`} />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">
                {/* ── LEFT — cinema ticket card (lg:col-span-3) ── */}
                <div className="lg:col-span-3">
                  <CinemaTicketCard
                    isDark={isDark}
                    billing={billing}
                    setBilling={setBilling}
                    selectedPlan={selectedPlan}
                    onSubscribe={() => setModalOpen(true)}
                  />
                </div>

                {/* ── RIGHT — who is this for (lg:col-span-2) ── */}
                <div className="lg:col-span-2 lg:pt-20">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.65, delay: 0.2 }}
                  >
                    <h3
                      className={`font-playfair text-2xl sm:text-3xl font-semibold mb-6 ${gradientText}`}
                    >
                      Who is this for?
                    </h3>

                    <ul className="space-y-4">
                      {WHO_ITS_FOR.map((line, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: 12 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.35 + i * 0.07 }}
                          className={`flex items-start gap-3 text-sm leading-relaxed ${
                            isDark ? "text-slate-300" : "text-gray-700"
                          }`}
                        >
                          <span
                            className={`mt-[3px] text-base leading-none select-none ${mutedText}`}
                          >
                            ·
                          </span>
                          {line}
                        </motion.li>
                      ))}
                    </ul>

                    <div
                      className={`h-px my-8 ${
                        isDark ? "bg-slate-800" : "bg-gray-200"
                      }`}
                    />

                    <div
                      className={`flex items-center gap-2 text-sm ${mutedText}`}
                    >
                      <Globe className="w-4 h-4 flex-shrink-0" />
                      <span>Read by film lovers across 30+ countries</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 6 — FAQ
            Accordion, one open at a time, framer-motion height animation.
        ════════════════════════════════════════════════════════════════════ */}
        <section
          className={`border-t py-20 px-4 sm:px-6 pb-28 ${
            isDark ? "border-slate-800/50" : "border-gray-200"
          }`}
        >
          <div className="max-w-2xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`font-playfair text-3xl font-semibold text-center mb-10 ${gradientText}`}
            >
              Questions
            </motion.h2>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className={`rounded-xl overflow-hidden border ${
                    isDark
                      ? "bg-slate-900/30 border-slate-800/60"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className={`w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium transition-colors ${
                      isDark
                        ? "text-white hover:bg-white/[0.04]"
                        : "text-black hover:bg-gray-50"
                    }`}
                  >
                    {faq.q}
                    <motion.div
                      animate={{ rotate: openFaq === i ? 180 : 0 }}
                      transition={{ duration: 0.22 }}
                      className="ml-4 flex-shrink-0"
                    >
                      <ChevronDown className={`w-4 h-4 ${mutedText}`} />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p
                          className={`px-5 pb-4 text-sm leading-relaxed ${mutedText}`}
                        >
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ── CHECKOUT MODAL — DO NOT MODIFY ─────────────────────────────────── */}
      <AnimatePresence>
        {modalOpen && (
          <CheckoutModal
            plan={selectedPlan}
            billing={billing}
            name={name}
            email={email}
            submitting={submitting}
            slowLoading={slowLoading}
            error={error}
            onNameChange={setName}
            onEmailChange={setEmail}
            onSubmit={handleSubscribe}
            onClose={() => {
              setModalOpen(false);
              setError("");
              setSlowLoading(false);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// ── Poster tile helper (used inside the Marquee strip) ────────────────────────
// Grayscale by default; transitions to full colour on hover.
function PosterTile({ url }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="w-24 h-36 rounded-lg overflow-hidden flex-shrink-0 cursor-default"
      style={{
        filter: hovered ? "grayscale(100%)" : "grayscale(0%)",
        transition: "filter 500ms ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={url}
        alt=""
        aria-hidden="true"
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
}

// ── Sprocket strip — reused by CinemaTicketCard ───────────────────────────────
function SprocketStrip({ stripBg, holeBg, isMobile }) {
  const count = isMobile ? 10 : 16;
  const holeW = isMobile ? "9px" : "11px";
  const holeH = isMobile ? "7px" : "8px";
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: isMobile ? "6px" : "7px",
        padding: isMobile ? "7px 14px" : "8px 18px",
        backgroundColor: stripBg,
      }}
    >
      {Array(count).fill(0).map((_, i) => (
        <div
          key={i}
          style={{
            width: holeW,
            height: holeH,
            borderRadius: "3px",
            flexShrink: 0,
            backgroundColor: holeBg,
            boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.4), inset 0 1px 3px rgba(0,0,0,0.7)",
          }}
        />
      ))}
    </div>
  );
}

// ── Cinema Ticket Card ────────────────────────────────────────────────────────
function CinemaTicketCard({ isDark, billing, setBilling, selectedPlan, onSubscribe }) {
  const ticketBg  = isDark ? "#0E0B08" : "#FDFAF3";
  const stubBg    = isDark ? "#090603" : "#F4EAD0";
  const pageBg    = isDark ? "#020617" : "#FFF8DC";
  const stripBg   = isDark ? "#040201" : "#1C1208";
  const accent    = isDark ? "#D4AF37" : "#8B5D0A";
  const heading   = isDark ? "#F4EDD0" : "#1A1005";
  const muted     = isDark ? "#9A8060" : "#9A7038";
  const body      = isDark ? "#C0A882" : "#5A3B18";

  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" ? window.innerWidth < 640 : false
  );
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const META = [
    { label: "Screens",  value: "Every Friday"  },
    { label: "Sections", value: "6 Per Issue"    },
    { label: "Rating",   value: "Cinephiles"     },
  ];

  return (
    <div className="w-full">
      {/* ── BILLING TOGGLE ── */}
      <div className="flex justify-center mb-8">
        <div
          style={{
            display: "inline-flex",
            borderRadius: "999px",
            padding: "4px",
            gap: "4px",
            border: `1px solid ${isDark ? "rgba(212,175,55,0.15)" : "rgba(139,93,10,0.18)"}`,
            backgroundColor: isDark ? "rgba(14,11,8,0.7)" : "rgba(253,250,243,0.8)",
          }}
        >
          {["MONTHLY", "YEARLY"].map((interval) => (
            <button
              key={interval}
              onClick={() => setBilling(interval)}
              className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200"
              style={
                billing === interval
                  ? { backgroundColor: accent, color: isDark ? "#0A0800" : "#FFF5E0", fontWeight: 800 }
                  : { color: isDark ? "#9A8060" : "#9A7038", fontWeight: 500 }
              }
            >
              {interval === "MONTHLY" ? "Monthly" : "Yearly — Save 40%"}
            </button>
          ))}
        </div>
      </div>

      {/* ── TICKET ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={billing}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.28 }}
          style={{
            borderRadius: "14px",
            overflow: "hidden",
            boxShadow: isDark
              ? "0 40px 80px -20px rgba(0,0,0,0.98), 0 0 0 1px rgba(212,175,55,0.14), 0 0 60px -30px rgba(212,175,55,0.08), inset 0 1px 0 rgba(255,255,255,0.04)"
              : "0 24px 64px -14px rgba(0,0,0,0.30), 0 0 0 1px rgba(139,93,10,0.22), inset 0 1px 0 rgba(255,255,255,0.85)",
          }}
        >
          {/* Top sprocket */}
          <SprocketStrip stripBg={stripBg} holeBg={pageBg} isMobile={isMobile} />

          {/* Body */}
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              backgroundColor: ticketBg,
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
            }}
          >
            {/* ── MAIN CONTENT ── */}
            <div style={{ flex: 1, padding: isMobile ? "22px 20px 20px" : "28px 32px 28px 28px" }}>
              {/* Header row */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                <span style={{ color: accent, fontSize: "9px", letterSpacing: "0.38em", textTransform: "uppercase", fontFamily: "'DM Mono', 'Courier New', monospace", fontWeight: 700 }}>
                  ADMIT ONE
                </span>
                <span style={{ color: muted, fontSize: "9px", letterSpacing: "0.22em", fontFamily: "'DM Mono', 'Courier New', monospace" }}>
                  NO. 001847
                </span>
              </div>

              {/* Gold rule */}
              <div style={{ height: "1px", backgroundColor: `${accent}28`, marginBottom: "18px" }} />

              {/* Now Screening label */}
              <p style={{ color: muted, fontSize: "9px", letterSpacing: "0.38em", textTransform: "uppercase", fontFamily: "'DM Mono', 'Courier New', monospace", marginBottom: "5px" }}>
                Now Screening
              </p>

              {/* Title */}
              <h2
                className="font-playfair"
                style={{ color: heading, fontSize: "clamp(1.55rem,3.8vw,2.15rem)", lineHeight: 1.0, fontWeight: 300, marginBottom: "2px" }}
              >
                The Cinéprism
              </h2>
              <h2
                className="font-playfair"
                style={{ color: accent, fontSize: "clamp(1.55rem,3.8vw,2.15rem)", lineHeight: 1.05, fontWeight: 900, marginBottom: "10px", textShadow: `0 0 28px ${accent}28` }}
              >
                Weekly
              </h2>

              {/* Tagline */}
              <p
                className="font-garamond"
                style={{ color: body, fontSize: "13px", fontStyle: "italic", marginBottom: "18px" }}
              >
                Cinema for acquired taste · Est. 2024
              </p>

              {/* Gold rule */}
              <div style={{ height: "1px", backgroundColor: `${accent}1e`, marginBottom: "16px" }} />

              {/* Features — 2-col grid on desktop, 1-col on mobile */}
              <ul
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                  gap: isMobile ? "6px 0" : "7px 20px",
                  marginBottom: "20px",
                }}
              >
                {FEATURES.map((feat, i) => (
                  <li
                    key={i}
                    style={{ display: "flex", alignItems: "flex-start", gap: "6px", fontSize: "11.5px", color: body, lineHeight: 1.5, fontFamily: "'DM Sans', ui-sans-serif, system-ui, sans-serif", fontWeight: 400 }}
                  >
                    <span style={{ color: accent, marginTop: "1px", flexShrink: 0, fontSize: "9px" }}>✦</span>
                    {feat}
                  </li>
                ))}
              </ul>

              {/* Gold rule */}
              <div style={{ height: "1px", backgroundColor: `${accent}1e`, marginBottom: "16px" }} />

              {/* Meta row — hidden on mobile */}
              <div style={{ display: isMobile ? "none" : "flex", gap: "18px", alignItems: "center" }}>
                {META.map(({ label, value }, i) => (
                  <React.Fragment key={label}>
                    {i > 0 && (
                      <div style={{ height: "28px", width: "1px", backgroundColor: `${accent}18`, flexShrink: 0 }} />
                    )}
                    <div>
                      <p style={{ color: muted, fontSize: "8px", letterSpacing: "0.28em", textTransform: "uppercase", fontFamily: "'DM Mono', 'Courier New', monospace", marginBottom: "2px" }}>
                        {label}
                      </p>
                      <p style={{ color: heading, fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "'DM Mono', 'Courier New', monospace" }}>
                        {value}
                      </p>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* ── TEAR LINE ── */}
            {isMobile ? (
              /* Horizontal tear line for mobile */
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  height: "1px",
                  margin: "0 0",
                  zIndex: 2,
                  overflow: "visible",
                }}
              >
                {/* Left punch hole */}
                <div
                  style={{
                    position: "absolute",
                    left: "-15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    backgroundColor: pageBg,
                    zIndex: 20,
                    flexShrink: 0,
                    boxShadow: isDark
                      ? "inset 0 0 0 1.5px rgba(0,0,0,0.9), inset 0 2px 6px rgba(0,0,0,0.6)"
                      : "inset 0 0 0 1.5px rgba(0,0,0,0.18), inset 0 2px 4px rgba(0,0,0,0.10)",
                  }}
                />
                {/* Dashed line */}
                <div
                  style={{
                    flex: 1,
                    height: "1px",
                    backgroundImage: `repeating-linear-gradient(to right, ${accent}50 0, ${accent}50 4px, transparent 4px, transparent 10px)`,
                  }}
                />
                {/* Scissors */}
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%) rotate(-90deg)",
                    fontSize: "13px",
                    color: accent,
                    opacity: 0.55,
                    zIndex: 15,
                    userSelect: "none",
                    lineHeight: 1,
                    backgroundColor: ticketBg,
                    padding: "0 3px",
                  }}
                >
                  ✂
                </div>
                {/* Right punch hole */}
                <div
                  style={{
                    position: "absolute",
                    right: "-15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    backgroundColor: pageBg,
                    zIndex: 20,
                    flexShrink: 0,
                    boxShadow: isDark
                      ? "inset 0 0 0 1.5px rgba(0,0,0,0.9), inset 0 2px 6px rgba(0,0,0,0.6)"
                      : "inset 0 0 0 1.5px rgba(0,0,0,0.18), inset 0 2px 4px rgba(0,0,0,0.10)",
                  }}
                />
              </div>
            ) : (
              /* Vertical tear line for desktop */
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "1px",
                  padding: "0",
                  zIndex: 2,
                }}
              >
                {/* Top punch hole */}
                <div
                  style={{
                    position: "absolute",
                    top: "-15px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    backgroundColor: pageBg,
                    zIndex: 20,
                    boxShadow: isDark
                      ? "inset 0 0 0 1.5px rgba(0,0,0,0.9), inset 0 2px 6px rgba(0,0,0,0.6)"
                      : "inset 0 0 0 1.5px rgba(0,0,0,0.18), inset 0 2px 4px rgba(0,0,0,0.10)",
                  }}
                />
                {/* Dashed line */}
                <div
                  style={{
                    flex: 1,
                    width: "1px",
                    margin: "6px 0",
                    backgroundImage: `repeating-linear-gradient(to bottom, ${accent}50 0, ${accent}50 4px, transparent 4px, transparent 10px)`,
                  }}
                />
                {/* Scissors icon at midpoint */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontSize: "13px",
                    color: accent,
                    opacity: 0.55,
                    zIndex: 15,
                    userSelect: "none",
                    lineHeight: 1,
                    backgroundColor: ticketBg,
                    padding: "2px 0",
                  }}
                >
                  ✂
                </div>
                {/* Bottom punch hole */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "-15px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    backgroundColor: pageBg,
                    zIndex: 20,
                    boxShadow: isDark
                      ? "inset 0 0 0 1.5px rgba(0,0,0,0.9), inset 0 2px 6px rgba(0,0,0,0.6)"
                      : "inset 0 0 0 1.5px rgba(0,0,0,0.18), inset 0 2px 4px rgba(0,0,0,0.10)",
                  }}
                />
              </div>
            )}

            {/* ── STUB ── */}
            {isMobile ? (
              /* ── MOBILE STUB: horizontal strip ── */
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "18px 20px",
                  backgroundColor: stubBg,
                  backgroundImage: isDark
                    ? "repeating-linear-gradient(-45deg, transparent, transparent 9px, rgba(255,255,255,0.018) 9px, rgba(255,255,255,0.018) 10px)"
                    : "repeating-linear-gradient(-45deg, transparent, transparent 9px, rgba(0,0,0,0.028) 9px, rgba(0,0,0,0.028) 10px)",
                  gap: "16px",
                }}
              >
                {/* Left: price + trust */}
                <div style={{ flexShrink: 0 }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={billing + "mprice"}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 6 }}
                      transition={{ duration: 0.18 }}
                    >
                      {selectedPlan ? (
                        <div style={{ display: "flex", alignItems: "baseline", gap: "5px", flexWrap: "wrap" }}>
                          <span
                            className="font-playfair"
                            style={{ color: heading, fontSize: "1.75rem", fontWeight: 900, lineHeight: 1 }}
                          >
                            ₹{(selectedPlan.amount / 100).toFixed(0)}
                          </span>
                          <span
                            style={{ color: muted, fontSize: "8px", fontFamily: "'DM Mono', 'Courier New', monospace", letterSpacing: "0.2em", textTransform: "uppercase" }}
                          >
                            /{billing === "MONTHLY" ? "mo" : "yr"}
                          </span>
                          {billing === "YEARLY" && (
                            <span style={{ color: accent, fontSize: "8px", fontFamily: "'DM Mono', 'Courier New', monospace", fontWeight: 700, letterSpacing: "0.1em" }}>
                              · Save 40%
                            </span>
                          )}
                        </div>
                      ) : (
                        <div style={{ width: "80px", height: "32px", borderRadius: "6px", backgroundColor: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.06)" }} className="animate-pulse" />
                      )}
                    </motion.div>
                  </AnimatePresence>
                  <p style={{ color: muted, fontSize: "7px", fontFamily: "'DM Mono', 'Courier New', monospace", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: "5px", opacity: 0.75 }}>
                    Cancel anytime · Razorpay
                  </p>
                </div>

                {/* Right: barcode + button */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px", flexShrink: 0 }}>
                  {/* Mini barcode */}
                  <div style={{ display: "flex", gap: "1.5px", height: "20px", alignItems: "stretch", opacity: isDark ? 0.5 : 0.4 }}>
                    {[2,1,3,1,2,1,1,3,1,2,3,1,2].map((w, i) => (
                      <div
                        key={i}
                        style={{
                          width: `${w * 2}px`,
                          backgroundColor: i % 2 === 0 ? accent : "transparent",
                          flexShrink: 0,
                          borderRadius: "1px",
                        }}
                      />
                    ))}
                  </div>
                  <motion.button
                    onClick={onSubscribe}
                    disabled={!selectedPlan}
                    whileHover={{ scale: selectedPlan ? 1.04 : 1 }}
                    whileTap={{ scale: 0.96 }}
                    style={{
                      padding: "10px 18px",
                      borderRadius: "8px",
                      backgroundColor: accent,
                      color: isDark ? "#0A0800" : "#FFF5E0",
                  fontFamily: "'DM Sans', ui-sans-serif, system-ui, sans-serif",
                  fontWeight: 700,
                  fontSize: "9.5px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  cursor: selectedPlan ? "pointer" : "not-allowed",
                  opacity: selectedPlan ? 1 : 0.4,
                  boxShadow: selectedPlan ? `0 6px 20px -4px ${accent}70` : "none",
                  border: "none",
                  outline: "none",
                  whiteSpace: "nowrap",
                    }}
                  >
                    Reserve Seat
                  </motion.button>
                </div>
              </div>
            ) : (
              /* ── DESKTOP STUB: vertical column ── */
              <div
                style={{
                  width: "158px",
                  minWidth: "140px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "20px 16px 20px",
                  backgroundColor: stubBg,
                  backgroundImage: isDark
                    ? "repeating-linear-gradient(-45deg, transparent, transparent 9px, rgba(255,255,255,0.018) 9px, rgba(255,255,255,0.018) 10px)"
                    : "repeating-linear-gradient(-45deg, transparent, transparent 9px, rgba(0,0,0,0.028) 9px, rgba(0,0,0,0.028) 10px)",
                  position: "relative",
                }}
              >
                {/* "KEEP THIS STUB" label */}
                <p
                  style={{
                    fontFamily: "'DM Mono', 'Courier New', monospace",
                    fontSize: "6.5px",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: muted,
                    opacity: 0.75,
                    marginBottom: "12px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Keep This Stub
                </p>

                {/* Vertical label */}
                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px" }}>
                  <p
                    style={{
                      writingMode: "vertical-rl",
                      textOrientation: "mixed",
                      transform: "rotate(180deg)",
                      fontFamily: "'DM Mono', 'Courier New', monospace",
                      fontSize: "8px",
                      letterSpacing: "0.45em",
                      textTransform: "uppercase",
                      color: muted,
                      userSelect: "none",
                    }}
                  >
                    THE CINEPRISM WEEKLY
                  </p>
                </div>

                {/* Price */}
                <div style={{ textAlign: "center", marginBottom: "12px" }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={billing + "price"}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.18 }}
                    >
                      {selectedPlan ? (
                        <>
                          <p
                            className="font-playfair"
                            style={{ color: heading, fontSize: "2rem", fontWeight: 900, lineHeight: 1 }}
                          >
                            ₹{(selectedPlan.amount / 100).toFixed(0)}
                          </p>
                          <p
                            style={{
                              color: muted,
                              fontSize: "8px",
                              letterSpacing: "0.3em",
                              textTransform: "uppercase",
                              fontFamily: "'DM Mono', 'Courier New', monospace",
                              marginTop: "5px",
                            }}
                          >
                            per {billing === "MONTHLY" ? "month" : "year"}
                          </p>
                          {billing === "YEARLY" && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              style={{ color: accent, fontSize: "8px", letterSpacing: "0.2em", fontFamily: "'DM Mono', 'Courier New', monospace", marginTop: "3px", fontWeight: 700 }}
                            >
                              Save 40%
                            </motion.p>
                          )}
                        </>
                      ) : (
                        <div
                          style={{
                            width: "64px",
                            height: "38px",
                            borderRadius: "6px",
                            backgroundColor: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.06)",
                          }}
                          className="animate-pulse"
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Divider */}
                <div style={{ height: "1px", width: "100%", backgroundColor: `${accent}28`, marginBottom: "12px" }} />

                {/* Barcode decoration */}
                <div
                  style={{
                    display: "flex",
                    gap: "1.5px",
                    height: "28px",
                    alignItems: "stretch",
                    marginBottom: "12px",
                    width: "100%",
                    justifyContent: "center",
                    opacity: isDark ? 0.55 : 0.45,
                  }}
                >
                  {[2,1,3,1,2,1,1,3,1,2,3,1,2,1,3,1,2,1].map((w, i) => (
                    <div
                      key={i}
                      style={{
                        width: `${w * 2.5}px`,
                        backgroundColor: i % 2 === 0 ? accent : "transparent",
                        flexShrink: 0,
                        borderRadius: "1px",
                      }}
                    />
                  ))}
                </div>

                {/* CTA */}
                <motion.button
                  onClick={onSubscribe}
                  disabled={!selectedPlan}
                  whileHover={{ scale: selectedPlan ? 1.04 : 1 }}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    width: "100%",
                    padding: "11px 0",
                    borderRadius: "8px",
                    backgroundColor: accent,
                    color: isDark ? "#0A0800" : "#FFF5E0",
                  fontFamily: "'DM Sans', ui-sans-serif, system-ui, sans-serif",
                  fontWeight: 700,
                  fontSize: "9.5px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  cursor: selectedPlan ? "pointer" : "not-allowed",
                  opacity: selectedPlan ? 1 : 0.4,
                  boxShadow: selectedPlan ? `0 6px 24px -4px ${accent}70` : "none",
                  border: "none",
                  outline: "none",
                  transition: "box-shadow 0.2s",
                  }}
                >
                  Reserve Seat
                </motion.button>

                {/* Trust */}
                <p
                  style={{
                    textAlign: "center",
                    fontFamily: "'DM Mono', 'Courier New', monospace",
                    fontSize: "7px",
                    color: muted,
                    marginTop: "10px",
                    lineHeight: 1.75,
                    letterSpacing: "0.04em",
                  }}
                >
                  Cancel anytime
                  <br />
                  Secured by Razorpay
                </p>
              </div>
            )}
          </div>

          {/* Bottom sprocket */}
          <SprocketStrip stripBg={stripBg} holeBg={pageBg} isMobile={isMobile} />
        </motion.div>
      </AnimatePresence>

      {/* Best value badge */}
      <AnimatePresence>
        {billing === "YEARLY" && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="flex justify-center mt-5"
          >
            <span
              style={{
                backgroundColor: accent,
                color: isDark ? "#0A0800" : "#FFF5E0",
                fontSize: "9px",
                fontWeight: 900,
                padding: "5px 20px",
                borderRadius: "999px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontFamily: "'DM Mono', 'Courier New', monospace",
                boxShadow: `0 4px 16px -4px ${accent}80`,
              }}
            >
              ✦ BEST VALUE ✦
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Countdown Timer ───────────────────────────────────────────────────────────
function CountdownTimer({ isDark }) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    function getNextFriday8am() {
      const now = new Date();
      const day = now.getDay(); // 0 Sun … 6 Sat
      let daysUntil = (5 - day + 7) % 7;
      if (daysUntil === 0 && now.getHours() >= 8) daysUntil = 7;
      const t = new Date(now);
      t.setDate(now.getDate() + daysUntil);
      t.setHours(8, 0, 0, 0);
      return t;
    }

    function tick() {
      const diff = Math.max(0, getNextFriday8am() - Date.now());
      setTime({
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    }

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { v: time.days,    l: "DAYS" },
    { v: time.hours,   l: "HRS"  },
    { v: time.minutes, l: "MIN"  },
    { v: time.seconds, l: "SEC"  },
  ];

  const cdAccent  = isDark ? "#D4AF37" : "#8B5D0A";
  const cdMuted   = isDark ? "#9A8060" : "#9A7038";
  const cdHeading = isDark ? "#C8B890" : "#5A3B18";

  return (
    <section
      className={`py-16 px-4 border-y ${
        isDark ? "border-amber-950/40" : "border-amber-200/50"
      }`}
    >
      <div className="max-w-xl mx-auto text-center">
        {/* Eyebrow */}
        <p
          style={{
            fontSize: "8px",
            letterSpacing: "0.55em",
            textTransform: "uppercase",
            fontFamily: "'DM Mono', 'Courier New', monospace",
            marginBottom: "24px",
            color: cdMuted,
          }}
        >
          ▸ BROADCAST SCHEDULE
        </p>

        <p
          className="font-playfair"
          style={{
            fontSize: "0.875rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginBottom: "36px",
            color: cdHeading,
          }}
        >
          Next Issue Arrives In
        </p>

        {/* Digit blocks */}
        <div className="flex items-start justify-center gap-2 sm:gap-4">
          {units.map(({ v, l }, i) => (
            <React.Fragment key={l}>
              <div className="flex flex-col items-center gap-2">
                {/* Split-flap board */}
                <div
                  style={{
                    position: "relative",
                    width: "clamp(54px, 17vw, 70px)",
                    height: "clamp(60px, 19vw, 78px)",
                    borderRadius: "8px",
                    overflow: "hidden",
                    backgroundColor: "#0A0806",
                    boxShadow: isDark
                      ? `inset 0 2px 10px rgba(0,0,0,0.95), 0 6px 24px rgba(0,0,0,0.7), 0 0 0 1px rgba(212,175,55,0.08)`
                      : `inset 0 2px 10px rgba(0,0,0,0.85), 0 4px 20px rgba(0,0,0,0.28), 0 0 0 1px rgba(139,93,10,0.15)`,
                  }}
                >
                  {/* Top-half shadow (gives depth) */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0, left: 0, right: 0,
                      height: "50%",
                      background: "linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0.08))",
                      zIndex: 3,
                      pointerEvents: "none",
                    }}
                  />
                  {/* Horizontal mid-line */}
                  <div
                    style={{
                      position: "absolute",
                      insetInline: 0,
                      top: "50%",
                      height: "1.5px",
                      backgroundColor: "rgba(0,0,0,0.98)",
                      zIndex: 10,
                    }}
                  />
                  {/* Number */}
                  <motion.span
                    key={v}
                    initial={{ opacity: 0.55, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.12, ease: "easeOut" }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'DM Mono', 'Courier New', monospace",
                      fontSize: "clamp(1.55rem, 5.5vw, 2.2rem)",
                      fontWeight: 700,
                      color: cdAccent,
                      letterSpacing: "-0.04em",
                      fontVariantNumeric: "tabular-nums",
                      zIndex: 5,
                      textShadow: `0 0 28px ${cdAccent}60`,
                    }}
                  >
                    {String(v).padStart(2, "0")}
                  </motion.span>
                </div>

                {/* Label */}
                <span
                  style={{
                    fontFamily: "'DM Mono', 'Courier New', monospace",
                    fontSize: "clamp(7px, 2vw, 8px)",
                    letterSpacing: "0.32em",
                    textTransform: "uppercase",
                    color: cdMuted,
                  }}
                >
                  {l}
                </span>
              </div>

              {/* Separator colon */}
              {i < 3 && (
                <span
                  style={{
                    fontFamily: "'DM Mono', 'Courier New', monospace",
                    fontSize: "clamp(1.1rem, 4vw, 1.7rem)",
                    fontWeight: 700,
                    marginTop: "16px",
                    color: isDark ? `${cdAccent}50` : `${cdAccent}40`,
                    flexShrink: 0,
                  }}
                >
                  :
                </span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Footer line */}
        <p
          style={{
            marginTop: "28px",
            fontFamily: "'DM Mono', 'Courier New', monospace",
            fontSize: "8px",
            letterSpacing: "0.38em",
            textTransform: "uppercase",
            color: isDark ? "#7A6545" : "#A07838",
          }}
        >
          THE CINEPRISM WEEKLY — EVERY FRIDAY MORNING
        </p>
      </div>
    </section>
  );
}

// ── Checkout Modal — DO NOT MODIFY ────────────────────────────────────────────
// This component is reproduced verbatim from the original file.
// It retains its own amber styling intentionally — do not touch.

function CheckoutModal({
  plan,
  billing,
  name,
  email,
  submitting,
  slowLoading,
  error,
  onNameChange,
  onEmailChange,
  onSubmit,
  onClose,
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-3xl p-8 shadow-2xl"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/20 rounded-full px-3 py-1 text-amber-400 text-xs font-semibold mb-3">
            The Cineprism Weekly
          </div>
          <h2 className="text-xl font-bold text-white mb-1">
            Complete your subscription
          </h2>
          {plan && (
            <p className="text-slate-400 text-sm">
              ₹{(plan.amount / 100).toFixed(0)}/
              {billing === "MONTHLY" ? "month" : "year"} · billed via Razorpay ·
              cancel anytime
            </p>
          )}
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">
              Name (optional)
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="Your name"
              className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-rose-500/50 focus:bg-white/8 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-1.5">
              Email address <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-rose-500/50 focus:bg-white/8 transition-all"
            />
          </div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-red-400 text-sm"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            disabled={submitting || !plan || !email}
            whileHover={{ scale: submitting ? 1 : 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-rose-600/25 text-sm"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Redirecting to payment…
              </>
            ) : (
              <>
                Subscribe Now
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </motion.button>

          {/* FIX 5: slow-loading notice after 15s */}
          <AnimatePresence>
            {submitting && slowLoading && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-center text-xs text-rose-400 overflow-hidden"
              >
                This is taking longer than usual. Please don't close this window.
              </motion.p>
            )}
          </AnimatePresence>

          <p className="text-center text-xs text-slate-500">
            Secured by Razorpay · You'll be redirected to complete payment
          </p>
        </form>
      </motion.div>
    </motion.div>
  );
}

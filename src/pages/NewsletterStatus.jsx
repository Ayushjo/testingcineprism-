import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import { CheckCircle, Clock, XCircle, Loader2, AlertCircle } from "lucide-react";

const API_BASE = "https://api.thecineprism.com/api/v1";

// Poll up to 8 times every 2.5s (20s total) before giving up and showing "pending"
const MAX_ATTEMPTS = 8;
const POLL_INTERVAL_MS = 2500;

export default function NewsletterStatus() {
  const [searchParams] = useSearchParams();

  // Razorpay's hosted page redirects back with razorpay_subscription_id.
  // We also accept subscription_id for direct / manual navigation.
  const subscriptionId =
    searchParams.get("razorpay_subscription_id") ||
    searchParams.get("subscription_id");

  // loading | success | pending | failed | not-found | error | missing
  const [state, setState] = useState("loading");
  const [info, setInfo] = useState(null);

  useEffect(() => {
    // SCENARIO 5: No subscription_id in URL at all
    if (!subscriptionId) {
      setState("missing");
      return;
    }

    let attempts = 0;
    let cancelled = false;

    const poll = async () => {
      if (cancelled) return;
      attempts++;

      try {
        const { data } = await axios.get(
          `${API_BASE}/newsletter/subscription-status/${subscriptionId}`,
        );

        if (cancelled) return;
        setInfo(data);

        if (data.subscriberStatus === "ACTIVE") {
          setState("success");
        } else if (
          data.status === "PAST_DUE" ||
          data.status === "CANCELED"
        ) {
          setState("failed");
        } else if (attempts < MAX_ATTEMPTS) {
          // Still PENDING — webhook not yet received, keep polling
          setTimeout(poll, POLL_INTERVAL_MS);
        } else {
          // Exceeded attempts — payment likely went through but webhook is delayed
          setState("pending");
        }
      } catch (err) {
        if (cancelled) return;

        // SCENARIO 6: subscription_id not in our DB (invalid / fake)
        // Stop polling immediately on 404 — retrying won't help
        if (err?.response?.status === 404) {
          setState("not-found");
          return;
        }

        if (attempts < MAX_ATTEMPTS) {
          setTimeout(poll, POLL_INTERVAL_MS);
        } else {
          setState("error");
        }
      }
    };

    poll();

    return () => {
      cancelled = true;
    };
  }, [subscriptionId]);

  return (
    <div className="min-h-screen bg-[#FFF8DC] dark:bg-slate-950 flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm text-center">

          {/* ── LOADING ─────────────────────────────────────────────────────── */}
          {state === "loading" && (
            <>
              <Loader2 className="w-14 h-14 mx-auto mb-6 animate-spin text-amber-500" />
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                Confirming your subscription…
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Waiting for payment confirmation. This usually takes a few seconds.
              </p>
            </>
          )}

          {/* ── SUCCESS — SCENARIO 1 ─────────────────────────────────────── */}
          {state === "success" && (
            <>
              <CheckCircle className="w-14 h-14 mx-auto mb-6 text-emerald-500" />
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                You're now subscribed 🎬
              </h1>
              {info && (
                <>
                  <p className="text-slate-700 dark:text-slate-200 font-semibold text-lg mb-1">
                    {info.planName}
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">
                    Confirmed for{" "}
                    <span className="font-semibold">{info.subscriberEmail}</span>
                  </p>
                </>
              )}
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-3 mb-8">
                A welcome email is on its way. Your first issue arrives this Friday.
              </p>
              <Link
                to="/"
                className="inline-block bg-slate-900 dark:bg-amber-400 text-white dark:text-slate-900 font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
              >
                Back to The Cineprism
              </Link>
            </>
          )}

          {/* ── PENDING — SCENARIO 2 (UPI Autopay / slow webhook) ────────── */}
          {state === "pending" && (
            <>
              <Clock className="w-14 h-14 mx-auto mb-6 text-amber-500" />
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                Payment received — activating…
              </h1>
              <p className="text-slate-600 dark:text-slate-300 text-sm mb-2">
                Your payment went through. For UPI Autopay, activation can take
                up to a few minutes after the mandate is registered.
              </p>
              {info && (
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
                  Plan:{" "}
                  <span className="font-semibold">{info.planName}</span>
                </p>
              )}
              <p className="text-slate-500 dark:text-slate-400 text-xs mb-8">
                You'll receive a welcome email once your account is active. You
                can safely close this tab.
              </p>
              <Link
                to="/"
                className="inline-block bg-slate-900 dark:bg-amber-400 text-white dark:text-slate-900 font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
              >
                Back to The Cineprism
              </Link>
            </>
          )}

          {/* ── FAILED — SCENARIO 3 (card declined / charge failed) ──────── */}
          {state === "failed" && (
            <>
              <XCircle className="w-14 h-14 mx-auto mb-6 text-red-500" />
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                Payment unsuccessful
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">
                We couldn't process your payment. No charge was made. Please
                check your payment method and try again, or contact your bank if
                the issue persists.
              </p>
              <Link
                to="/newsletter"
                className="inline-block bg-slate-900 dark:bg-amber-400 text-white dark:text-slate-900 font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
              >
                Try again
              </Link>
            </>
          )}

          {/* ── MISSING — SCENARIO 5 (no subscription_id in URL) ─────────── */}
          {state === "missing" && (
            <>
              <AlertCircle className="w-14 h-14 mx-auto mb-6 text-slate-400" />
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                No subscription found
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">
                This page requires a subscription reference in the URL. If you
                were in the middle of subscribing, please start again from the
                newsletter page.
              </p>
              <Link
                to="/newsletter"
                className="inline-block bg-slate-900 dark:bg-amber-400 text-white dark:text-slate-900 font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
              >
                Go back to newsletter page
              </Link>
            </>
          )}

          {/* ── NOT FOUND — SCENARIO 6 (invalid / fake subscription_id) ─── */}
          {state === "not-found" && (
            <>
              <XCircle className="w-14 h-14 mx-auto mb-6 text-slate-400" />
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                Subscription details not found
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">
                We couldn't find your subscription details. If you completed
                payment, don't worry — your account will be activated within a
                few minutes. Check your email for confirmation.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/"
                  className="inline-block bg-slate-900 dark:bg-amber-400 text-white dark:text-slate-900 font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
                >
                  Go to Homepage
                </Link>
                <a
                  href="mailto:support@thecineprism.com"
                  className="inline-block border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold px-6 py-3 rounded-xl hover:opacity-80 transition-opacity"
                >
                  Contact Support
                </a>
              </div>
            </>
          )}

          {/* ── ERROR — SCENARIO 6 fallback / generic API error ──────────── */}
          {state === "error" && (
            <>
              <XCircle className="w-14 h-14 mx-auto mb-6 text-slate-400" />
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                Something went wrong
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">
                We couldn't confirm your subscription status. If you completed
                payment, don't worry — your account will be activated within a
                few minutes. Check your email for confirmation, or{" "}
                <a
                  href="mailto:support@thecineprism.com"
                  className="underline"
                >
                  contact us
                </a>{" "}
                if you need help.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/"
                  className="inline-block bg-slate-900 dark:bg-amber-400 text-white dark:text-slate-900 font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
                >
                  Go to Homepage
                </Link>
                <a
                  href="mailto:support@thecineprism.com"
                  className="inline-block border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold px-6 py-3 rounded-xl hover:opacity-80 transition-opacity"
                >
                  Contact Support
                </a>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}

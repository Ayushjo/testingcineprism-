import toast from "react-hot-toast";

/**
 * Custom toast utility with themed styling for The Cinéprism
 * Provides consistent toast notifications across the application
 */

// Get current theme from localStorage or default to 'dark'
const getCurrentTheme = () => {
  try {
    return localStorage.getItem("theme") || "dark";
  } catch {
    return "dark";
  }
};

// Base toast configuration
const getToastConfig = (theme) => {
  const isDark = theme === "dark";

  return {
    duration: 4000,
    position: "top-center",
    style: {
      background: isDark
        ? "rgba(15, 23, 42, 0.95)" // slate-900 with opacity
        : "rgba(255, 255, 255, 0.95)",
      color: isDark ? "#f1f5f9" : "#0f172a", // slate-100 : slate-900
      border: isDark
        ? "1px solid rgba(251, 191, 36, 0.2)" // amber-400 with opacity
        : "1px solid rgba(209, 213, 219, 0.5)", // gray-300 with opacity
      borderRadius: "16px",
      padding: "16px 20px",
      fontSize: "14px",
      fontWeight: "500",
      backdropFilter: "blur(12px)",
      boxShadow: isDark
        ? "0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(251, 191, 36, 0.1)"
        : "0 8px 32px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(209, 213, 219, 0.3)",
      maxWidth: "500px",
    },
    iconTheme: {
      primary: isDark ? "#fbbf24" : "#0f172a", // amber-400 : slate-900
      secondary: isDark ? "#0f172a" : "#ffffff", // slate-900 : white
    },
  };
};

// Success toast
export const showSuccessToast = (message, options = {}) => {
  const theme = getCurrentTheme();
  const config = getToastConfig(theme);

  return toast.success(message, {
    ...config,
    ...options,
    icon: "✓",
    style: {
      ...config.style,
      border: theme === "dark"
        ? "1px solid rgba(16, 185, 129, 0.3)" // emerald-500
        : "1px solid rgba(34, 197, 94, 0.3)", // green-500
      ...options.style,
    },
    iconTheme: {
      primary: theme === "dark" ? "#10b981" : "#22c55e", // emerald-500 : green-500
      secondary: theme === "dark" ? "#0f172a" : "#ffffff",
    },
  });
};

// Error toast
export const showErrorToast = (message, options = {}) => {
  const theme = getCurrentTheme();
  const config = getToastConfig(theme);

  return toast.error(message, {
    ...config,
    ...options,
    duration: 5000, // Errors stay a bit longer
    icon: "✕",
    style: {
      ...config.style,
      border: theme === "dark"
        ? "1px solid rgba(239, 68, 68, 0.3)" // red-500
        : "1px solid rgba(220, 38, 38, 0.3)", // red-600
      ...options.style,
    },
    iconTheme: {
      primary: theme === "dark" ? "#ef4444" : "#dc2626", // red-500 : red-600
      secondary: theme === "dark" ? "#0f172a" : "#ffffff",
    },
  });
};

// Loading toast
export const showLoadingToast = (message, options = {}) => {
  const theme = getCurrentTheme();
  const config = getToastConfig(theme);

  return toast.loading(message, {
    ...config,
    ...options,
    duration: Infinity, // Loading toasts don't auto-dismiss
  });
};

// Info/Warning toast
export const showInfoToast = (message, options = {}) => {
  const theme = getCurrentTheme();
  const config = getToastConfig(theme);

  return toast(message, {
    ...config,
    ...options,
    icon: "ℹ️",
    style: {
      ...config.style,
      border: theme === "dark"
        ? "1px solid rgba(59, 130, 246, 0.3)" // blue-500
        : "1px solid rgba(37, 99, 235, 0.3)", // blue-600
      ...options.style,
    },
  });
};

// Warning toast
export const showWarningToast = (message, options = {}) => {
  const theme = getCurrentTheme();
  const config = getToastConfig(theme);

  return toast(message, {
    ...config,
    ...options,
    icon: "⚠️",
    style: {
      ...config.style,
      border: theme === "dark"
        ? "1px solid rgba(245, 158, 11, 0.3)" // amber-500
        : "1px solid rgba(217, 119, 6, 0.3)", // amber-600
      ...options.style,
    },
  });
};

// Promise toast - for async operations
export const showPromiseToast = (promise, messages, options = {}) => {
  const theme = getCurrentTheme();
  const config = getToastConfig(theme);

  return toast.promise(
    promise,
    {
      loading: messages.loading || "Loading...",
      success: messages.success || "Success!",
      error: messages.error || "Something went wrong",
    },
    {
      ...config,
      ...options,
    }
  );
};

// Dismiss a specific toast
export const dismissToast = (toastId) => {
  toast.dismiss(toastId);
};

// Dismiss all toasts
export const dismissAllToasts = () => {
  toast.dismiss();
};

// Custom toast with full control
export const showCustomToast = (message, options = {}) => {
  const theme = getCurrentTheme();
  const config = getToastConfig(theme);

  return toast(message, {
    ...config,
    ...options,
    style: {
      ...config.style,
      ...options.style,
    },
  });
};

export default {
  success: showSuccessToast,
  error: showErrorToast,
  loading: showLoadingToast,
  info: showInfoToast,
  warning: showWarningToast,
  promise: showPromiseToast,
  dismiss: dismissToast,
  dismissAll: dismissAllToasts,
  custom: showCustomToast,
};

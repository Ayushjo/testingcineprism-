/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#059669", // A slightly deeper emerald
        "primary-light": "#10b981",
        background: "#f8f7f4", // A warmer off-white
        "text-primary": "#1c1917",
        "text-secondary": "#44403c",
      },
    },
  },
  plugins: [],
};


const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        phosphor: "#5fff87",
      },
      fontFamily: {
        mono: ["var(--font-mono)", ...defaultTheme.fontFamily.mono],
      },
      animation: {
        line: "line 0.5s ease-out forwards",
        cursor: "cursor 1s steps(2, jump-none) infinite",
      },
      keyframes: {
        line: {
          "0%": { opacity: "0", transform: "translateY(2px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        cursor: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

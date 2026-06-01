/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        glass: {
          bg: "rgba(255, 255, 255, 0.15)",
          border: "rgba(255, 255, 255, 0.25)",
          dark: "rgba(0, 0, 0, 0.2)",
        },
      },
      backdropBlur: {
        glass: "20px",
      },
    },
  },
  plugins: [],
};

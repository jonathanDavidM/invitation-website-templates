import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
          950: "#022c22",
        },
        forest: {
          DEFAULT: "#0d3d23",
          light: "#1a5c3a",
          mid: "#145231",
          dark: "#081e12",
          deep: "#040f09",
        },
        gold: {
          DEFAULT: "#c9a84c",
          light: "#e8c878",
          pale: "#f5e6b8",
          dark: "#9e7a2a",
        },
        cream: {
          DEFAULT: "#faf7f0",
          warm: "#f5f0e8",
          ivory: "#ede8da",
        },
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "serif"],
        heading: ["var(--font-cinzel)", "serif"],
        body: ["var(--font-quicksand)", "sans-serif"],
      },
      backgroundImage: {
        "emerald-gradient": "linear-gradient(135deg, #040f09 0%, #0d3d23 40%, #1a5c3a 100%)",
        "gold-gradient": "linear-gradient(135deg, #9e7a2a, #c9a84c, #e8c878, #c9a84c, #9e7a2a)",
      },
      animation: {
        "fade-up": "fadeUp 1s ease forwards",
        "fade-in": "fadeIn 1s ease forwards",
        "shimmer": "shimmer 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "petal-fall": "petalFall linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
        petalFall: {
          "0%": { transform: "translateY(-10px) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "0.5" },
          "100%": { transform: "translateY(100vh) rotate(720deg)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

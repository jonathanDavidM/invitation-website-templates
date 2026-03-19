import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cormorant: ["var(--font-cormorant)", "serif"],
        jost: ["var(--font-jost)", "sans-serif"],
      },
      colors: {
        ivory: "#F4F7FA",
        cream: "#E8EEF4",
        blush: "#8EB4CB",
        rose: "#9C6B6B",
        champagne: "#7AABBE",
        gold: "#5B9CB8",
        ink: "#1A2B38",
        muted: "#4D6E82",
      },
      animation: {
        "slow-zoom": "slowZoom 20s ease-out forwards",
        "fade-up": "fadeUp 1.2s ease both",
        "scroll-pulse": "scrollPulse 2s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        slowZoom: {
          from: { transform: "scale(1.05)" },
          to: { transform: "scale(1)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(28px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        scrollPulse: {
          "0%,100%": { opacity: "0.4", transform: "scaleY(1)" },
          "50%": { opacity: "1", transform: "scaleY(1.2)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

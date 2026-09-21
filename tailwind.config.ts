import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        bg: "#FFFFFF",
        surface: "#FFFFFF",
        surface2: "#FFFFFF",
        ink: "#1C1A17",
        muted: "#6E675D",
        line: "#FFFFFF",
        walnut: {
          DEFAULT: "#7C5A3A",
          light: "#96754F",
          dark: "#5E4128",
        },
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      letterSpacing: {
        tightish: "-0.01em",
      },
      maxWidth: {
        prose: "65ch",
      },
      transitionTimingFunction: {
        "out-soft": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
export default config;

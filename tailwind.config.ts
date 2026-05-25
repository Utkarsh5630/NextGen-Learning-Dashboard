import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "#070b14",
          raised: "#0c1222",
          muted: "#111827",
        },
        ink: {
          DEFAULT: "#f4f4f5",
          muted: "#a1a1aa",
          faint: "#71717a",
        },
        accent: {
          DEFAULT: "#a78bfa",
          soft: "rgba(167, 139, 250, 0.12)",
        },
      },
      boxShadow: {
        card: "0 0 0 1px rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.4)",
        "card-hover":
          "0 0 0 1px rgba(167,139,250,0.25), 0 12px 40px rgba(124,58,237,0.15)",
        glow: "0 0 40px rgba(124, 58, 237, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;

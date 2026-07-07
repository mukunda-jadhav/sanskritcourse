import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#FFF8E7",
          50: "#FFFDF8",
          100: "#FFF8E7",
          200: "#FCEFC7",
          300: "#F8E3A0",
        },
        saffron: {
          DEFAULT: "#FF9933",
          50: "#FFF4E8",
          100: "#FFE3C2",
          300: "#FFC177",
          500: "#FF9933",
          600: "#F2840F",
          700: "#E07A12",
          900: "#A85A0C",
        },
        deepOrange: {
          DEFAULT: "#C1440E",
          400: "#D2691E",
          500: "#C1440E",
          600: "#A8380C",
          700: "#8A2D09",
        },
        brown: {
          DEFAULT: "#3E2723",
          50: "#F5EFEC",
          100: "#E8DCD5",
          400: "#6B4A3F",
          600: "#4E342E",
          800: "#3E2723",
          900: "#2A1A17",
        },
        gold: {
          DEFAULT: "#D4AF37",
          100: "#F7ECC4",
          300: "#E7CD6E",
          500: "#D4AF37",
          700: "#A8861F",
        },
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        devanagari: ["var(--font-devanagari)", "serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        "spin-slow": { from: { transform: "rotate(0deg)" }, to: { transform: "rotate(360deg)" } },
        float: { "0%, 100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        shimmer: { "0%": { backgroundPosition: "-700px 0" }, "100%": { backgroundPosition: "700px 0" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "spin-slow": "spin-slow 18s linear infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 1.6s infinite linear",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;

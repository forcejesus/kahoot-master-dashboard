
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#f97316",
          foreground: "#ffffff",
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
        },
        secondary: {
          DEFAULT: "#00BFA6",
          foreground: "#ffffff",
          50: "#E6FFF9",
          100: "#CCFFF2",
          200: "#99FFE6",
          300: "#66FFD9",
          400: "#33FFCC",
          500: "#00BFA6",
          600: "#00A693",
          700: "#008C80",
          800: "#00736D",
          900: "#005959",
        },
        neutral: {
          50: "#F9F9F9",
          100: "#F5F5F5",
          200: "#DCDCDC",
          300: "#C4C4C4",
          400: "#A0A0A0",
          500: "#7A7A7A",
          600: "#5A5A5A",
          700: "#333333",
          800: "#2A2A2A",
          900: "#1A1A1A",
        },
        destructive: {
          DEFAULT: "#FF4757",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#F9F9F9",
          foreground: "#5A5A5A",
        },
        accent: {
          DEFAULT: "#F5F5F5",
          foreground: "#333333",
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#333333",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#333333",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-in": "slideIn 0.3s ease-out",
        "slide-in-right": "slideInRight 0.3s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
        "bounce-subtle": "bounceSubtle 0.6s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-16px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(16px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        bounceSubtle: {
          "0%, 20%, 50%, 80%, 100%": { transform: "translateY(0)" },
          "40%": { transform: "translateY(-4px)" },
          "60%": { transform: "translateY(-2px)" },
        },
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'medium': '0 4px 16px rgba(0, 0, 0, 0.12)',
        'strong': '0 8px 32px rgba(0, 0, 0, 0.16)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

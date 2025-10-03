/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';
import animate from 'tailwindcss-animate';

export default {
  darkMode: ["class"],
  content: [
    "./index.html", // <-- Aggiunto il file HTML di partenza
    "./src/**/*.{js,ts,jsx,tsx}", // <-- Sintassi aggiornata e completa per tutti i file
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
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "ita-green": {
          light: "#4ade80",
          DEFAULT: "#22c55e",
          dark: "#16a34a",
        },
        "ita-red": {
          light: "#f87171",
          DEFAULT: "#ef4444",
          dark: "#dc2626",
        },
        "cyber-blue": {
          light: "#60a5fa",
          DEFAULT: "#3b82f6",
          dark: "#2563eb",
        },
        "quantum-teal": {
          light: "#5eead4",
          DEFAULT: "#2dd4bf",
          dark: "#14b8a6",
        },
        "neural-purple": {
          light: "#a78bfa",
          DEFAULT: "#8b5cf6",
          dark: "#7c3aed",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "neural-pulse": {
          "0%, 100%": {
            filter: "drop-shadow(0 0 1px hsl(var(--primary)))",
          },
          "50%": {
            filter: "drop-shadow(0 0 5px hsl(var(--primary)))",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "neural-pulse": "neural-pulse 3s infinite ease-in-out",
      },
      boxShadow: {
        glow: "0 0 20px hsl(var(--primary) / 0.5)",
      },
    },
  },
  plugins: [typography, animate],
};

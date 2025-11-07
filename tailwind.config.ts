import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "light-bg": "var(--light-bg)",
        "light-text": "var(--light-text)",
        "light-accent": "var(--light-accent)",
        "light-secondary": "var(--light-secondary)",
        "light-border": "var(--light-border)",
        "dark-bg": "var(--dark-bg)",
        "dark-text": "var(--dark-text)",
        "dark-accent": "var(--dark-accent)",
        "dark-secondary": "var(--dark-secondary)",
        "dark-border": "var(--dark-border)",
      },
      fontFamily: {
        sans: ["Inter", "SF Pro Display", "system-ui", "sans-serif"],
      },
      borderRadius: {
        apple: "1rem",
      },
      boxShadow: {
        apple: "0 4px 20px rgba(0, 0, 0, 0.08)",
        "apple-dark": "0 4px 20px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};
export default config;


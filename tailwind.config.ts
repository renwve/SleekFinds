import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f6f2e8",
        foreground: "#171717",
        surface: "#fbf8f1",
        "surface-secondary": "#f0eadf",
        border: "#e7e0d1",
        muted: "#6b665d",
      },
    },
  },
  plugins: [],
};

export default config;
import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      letterSpacing: { wider: "3em" },
      colors: { google: "#4285f4" },
    },
  },
  plugins: [],
} satisfies Config;

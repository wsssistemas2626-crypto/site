import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B0F17",
        surface: "#121826",
        surface2: "#1A2233",
        line: "#26314A",
        text: "#E8ECF4",
        muted: "#8C97AD",
        signal: "#5B8CFF",
        mint: "#2ED9A8",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      maxWidth: {
        content: "1160px",
      },
    },
  },
  plugins: [],
};
export default config;

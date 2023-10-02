/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mantis: {
          50: "#f1fcf2",
          100: "#e0f8e1",
          200: "#c2f0c4",
          300: "#92e397",
          400: "#63d06a",
          500: "#34b33d",
          600: "#26932d",
          700: "#217427",
          800: "#1f5c24",
          900: "#1b4c1f",
        },
        "cg-red": {
          50: "#fef2f2",
          100: "#ffe1e1",
          200: "#ffc9c9",
          300: "#fea3a3",
          400: "#fb6e6e",
          500: "#f34040",
          600: "#e33434",
          700: "#bd1818",
          800: "#9c1818",
          900: "#811b1b",
        },
      },
      fontFamily: {
        sans: ["Be Vietnam Pro", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};

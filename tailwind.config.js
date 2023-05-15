/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["articulat-cf", "sans-serif"],
    },
    fontSize: {
      xs: ["1.5rem", "2.5rem"],
      sm: ["2rem", "3.25rem"],
      base: ["2.5rem", "3.5rem"],
      lg: ["3rem", "3.75rem"],
      xl: ["3.5rem", "4rem"],
    },
    extend: {},
  },
  plugins: [],
};

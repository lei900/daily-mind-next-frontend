/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "650px", // Extra small devices (<650px)
      sm: "650px", // Small devices (≥650px)
      md: "960px", // Medium devices (≥960px)
      lg: "1280px", // Large devices (≥1280px)
      xl: "1400px", // Extra large devices (≥1400px)
    },
    extend: {},
  },
  plugins: [],
};

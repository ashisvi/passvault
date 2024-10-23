/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#9046CF",
        secondary: "#1374ED",
        black: "#050505",
        white: "#fefefe",
        grey: "#C4C4C4",
        textr: "#18191F",
      },
      fontFamily: {
        "montserrat-thin": ["Montserrat-Thin", "sans-serif"],
        "montserrat-extraLight": ["Montserrat-ExtraLight", "sans-serif"],
        "montserrat-light": ["Montserrat-Light", "sans-serif"],
        "montserrat-regular": ["Montserrat-Regular", "sans-serif"],
        "montserrat-medium": ["Montserrat-Medium", "sans-serif"],
        "montserrat-semibold": ["Montserrat-SemiBold", "sans-serif"],
        "montserrat-bold": ["Montserrat-Bold", "sans-serif"],
        "montserrat-extrabold": ["Montserrat-ExtraBold", "sans-serif"],
      },
    },
  },
  plugins: [],
};

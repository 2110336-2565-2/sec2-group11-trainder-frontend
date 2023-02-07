/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Lexend Deca"', 'sans-serif'],
        "lexend-exa": ['"Lexend Exa"', 'san-serif'],
      },
      colors: {
        backgroundColor: "#FCF4F1",
        gray: {
          DEFAULT: "#9B9B9B",
          light: "#E5E5E5",
        },
        pink: {
          DEFAULT: "#ECB19F",
          dark: "#EC5959",
        },
        blue: "#5D86BC",
        yellow: "#E7BD44",
        green: "#296D6C",
        brown: "#DDD2C7",
      },
    },
  },
  plugins: [],
};

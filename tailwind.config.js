/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Lexend Deca"', "sans-serif"],
        "lexend-exa": ['"Lexend Exa"', "san-serif"],
      },
      colors: {
        backgroundColor: "#FCF4F1",
        gray: {
          DEFAULT: "#9B9B9B",
          light: "#E5E5E5",
          dark: "#404040",
        },
        pink: {
          DEFAULT: "#ECB19F",
          light: "#F0E0DA",
          dark: "#EC5959",
        },
        blue: {
          DEFAULT: "#5D86BC",
          dark: "#415F87",
        },
        yellow: "#E7BD44",
        green: {
          DEFAULT: "#296D6C",
          light: "#83A748",
        },
        brown: "#DDD2C7",
      },
      keyframes: {
        fade: {
          "0%": {
            transform: "translateY(50%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0%)",
            opacity: "1",
          },
        },
      },
      animation: {
        fade: "fade 0.5s linear",
      },
    },
  },
  plugins: [],
};

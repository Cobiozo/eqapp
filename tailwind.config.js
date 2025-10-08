const defaultTheme = require('tailwindcss/defaultTheme')


module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    fontFamily: {
      "main": ['"Roboto"', 'sans-serif'],
      "bitter": ['"Bitter"', 'serif'],
    },
    extend: {
      colors: {
        "primary": "#003b95",
        "primary-lighter": "#006ce4",
        "dark": "#2b2b2b",
        "dark-lighter": "#202324",
        "medium-darker": "#4a4a4a",
        "medium-dark": "#868686",
        "light-back": "#f5f5f5",
        "light": "#f9f9f9",
        "light-border": "#e7e7e7",
        "gold": "#bc9c34",
        "sad": "#FF4E50",
        "client-base": "#4e4e4e",
        "client-base-lighter": "#b4b4b4"
      },
      spacing: {
        30: "7.5rem",
        15: "3.75rem",
        18: "4.5rem",
        26: "6.5rem",
        66: "16.5rem",
        68: "17rem",
        80: "20rem",
        85: "21.25rem",
        90: "22.5rem",
        95: "23.75rem",
        98: "24.5rem",
        99: "24.75rem",
        100: "40rem",
        "24rem": "24rem",
      },
      borderWidth: {
        3: '3px',
        4: '4px',
        5: '5px',
        6: '6px'
      },
      maxWidth: {
        20: "5rem",
        22: "5.5rem",
        24: "6rem",
        64: "16rem",
        80: "20rem",
      },
      minWidth: {
        30: "7.5rem",
        64: "16rem",
      },
      zIndex: {
        60: "60",
        70: "70",
      }
    },
    screens: {
      'xs': '400px',
      '2xs': '500px',
      ...defaultTheme.screens,
      '2xl': '1440px',
      '3xl': '1920px',
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./assets/jsx/**/*.{js,jsx,ts,tsx}", "!./assets/jsx/layouts/nav"],
  theme: {
    extend: {
      colors: {
        "my-red": "#ff0000",
        "light-orange": "#EF9118",
        "dark-purple": "#352853",
        banana: "#FDD691",
        yellow: "#F7D44B",
        "light-purple": "#514495",
        "dark-red": "#E73248",
        white: "#fff",
        black: "#000",
        "black-1": "#2C2C2C",
        "light-lavender": "#f2f4fc",
        "light-gray": "#F6F6F6",
      },
      width: {
        small: "1rem",
        medium: "3.125rem",
        medium1: "2.5rem",
        8.75: "8.75rem",
      },
      widheightth: {
        small: "1rem",
        medium: "3.125rem",
        medium1: "2.5rem",
      },
      borderWidth: {
        DEFAULT: "1px",
        0: "0",
        0.3: "0.3px",
        0.2: "0.2px",
        3: "3px",
        4: "4px",
        6: "6px",
        8: "8px",
      },
      fontSize: {
        sm: ["14px", "20px"],
        base: ["16px", "24px"],
        lg: ["20px", "28px"],
        xl: ["24px", "32px"],
        xxl: ["28px", "36px"],
      },
      fontFamily: {
        roboto: ["Roboto"],
      },
      variants: {
        margin: ["responsive", "hover"],
        width: ["responsive", "hover"],
        padding: ["responsive", "hover"],
        backgroundOpacity: ["active"],
      },
    },
  },
  plugins: [],
};

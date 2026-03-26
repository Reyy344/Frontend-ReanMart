/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
        poppins: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
        montserrat: ["Montserrat", "ui-sans-serif", "system-ui", "sans-serif"],
      },

      colors: {
        "rean-blue-light": "#81A6C6",
        "rean-blue-soft": "#AACDDC",
      },
    },
  },
  plugins: [],
};

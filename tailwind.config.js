/** @type {import('tailwindcss').Config} */
export default {
  content: ["./client/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-bg": "#18191A",
        "nav-bg": "#5383E8",
      },
    },
  },
  plugins: [],
};

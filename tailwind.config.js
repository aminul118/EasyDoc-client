import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "bg-hero1": "url('/src/assets/banner/banner1.png')",
        "bg-hero2": "url('/src/assets/banner/banner2.png')",
      },
    },
  },
  plugins: [daisyui],
};

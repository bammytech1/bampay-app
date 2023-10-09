/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#39a798",

          secondary: "#FFD708",

          accent: "#828282",

          neutral: "#f2f2f2",

          "base-100": "#f2f2f2",
          "base-200": "#4f4f4f",
          "base-300": "#000000",

          info: "#3abff8",

          success: "#39a799",

          warning: "#fbbd23",

          error: "#f87272",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};

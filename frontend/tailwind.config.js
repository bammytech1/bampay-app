/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["[data-theme=light]"],
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
        dark: {
          ...require("daisyui/src/theming/themes")["[data-theme=light]"],
          primary: "#39a798",

          secondary: "#FFD708",

          accent: "#828282",

          neutral: "#f2f2f2",

          "base-200": "#f2f2f2",
          "base-100": "#4f4f4f",
          "base-300": "#000000",

          info: "#3abff8",

          success: "#39a799",

          warning: "#fbbd23",

          error: "#f87272",
        },
      },
    ], // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: ["dark"], // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    // themes: [
    //   {
    //     mytheme: {
    //       primary: "#39a798",

    //       secondary: "#FFD708",

    //       accent: "#828282",

    //       neutral: "#f2f2f2",

    //       "base-100": "#f2f2f2",
    //       "base-200": "#4f4f4f",
    //       "base-300": "#000000",

    //       info: "#3abff8",

    //       success: "#39a799",

    //       warning: "#fbbd23",

    //       error: "#f87272",
    //     },
    //   },
    // ],
  },
  plugins: [require("daisyui")],
};

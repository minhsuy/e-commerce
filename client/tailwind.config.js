/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // fontFamily: {
    //   main: ["Lato", "serif"],
    // },
    listStyleType: {
      disc: "disc",
      decimal: "decimal",
      square: "square",
      circle: "circle",
    },
    extend: {
      width: {
        main: "1220px",
      },
      backgroundColor: {
        main: "#ee3131",
        overlay: "rgba(0,0,0,0.4)",
      },
      colors: {
        main: "#ee3131",
      },
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
        4: "4 4 0%",
        5: "5 5 0%",
        6: "6 6 0%",
        7: "7 7 0%",
      },
      keyframes: {
        "slide-top": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-50px)" },
        },
      },
      animation: {
        "slide-top":
          "slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
      },
    },
  },
  plugins: ["@tailwindcss/line-clamp"],
};

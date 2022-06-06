module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#1f1f1f",
        lightDark: "#333333",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#3c98db",
          secondary: "#9562d2",
          accent: "#37cdbe",
          neutral: "#3d4451",
          "base-100": "#fff",
          gray: "#ccc",
          lightPurple: "#f3e8ff",
        },
      },
      "cupcake",
    ],
  },
  plugins: [require("daisyui")],
};

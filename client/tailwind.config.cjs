/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(0, 119, 175)",
        danger: "red",
        warning: "yellow",
        "dark-purple": "#081A51",
        "light-white": "rgba(255,255,255,0.17)",
        current: "#03C9D7",
        "dark-blue": "#14274A",
      },
      fontFamily: {
        primary: ["Poppins", "sans-serif"],
        secondary: ["Lato", "sans-serif"],
        lexend: ["Lexend", "sans-serif"],
        sans: ["Dosis", "sans-serif"],
      },
      backgroundImage: {
        bgImage:
          "url('https://res.cloudinary.com/feyton/image/upload/v1678962681/papyrus-dark_b3gxf6.png')",
        coverImage:
          "url('https://demos.wrappixel.com/premium-admin-templates/react/flexy-react/dark/static/media/profilebg.f087528c.jpg')",
        heroCover:
          "url('https://res.cloudinary.com/feyton/image/upload/v1678962893/driving-with-headlights_hf56tn.jpg')",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};

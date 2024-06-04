/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{html,js,jsx}",
    "./src/components/**/*.{html,js,jsx}",
  ],
  darkMode: "class",
  mode: "jit",
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans-serif", "ui-sans-serif", "system-ui"],
        montserrat: ["Montserrat", "sans-serif", "ui-sans-serif", "system-ui"],
      },
      colors: {
        primary: "#0D6EFD",
        secondary: "#6C757D",
        success: "#198754",
        danger: "#DC3545",
        warning: "#FFC107",
        info: "#0DCAF0",
        blue: "#1577FF",
        ret: "red",
        grin: "#24A65F",
        'grey': "#ACACAC",
        '#4B4B4B':"#4B4B4B",
        'darkblue': "#296dcd",
        'lightblue': "#f0f7ff", // màu nền 
        'orange': "#ff7f16",
        'darkgrin': "#15663a",
        'darkorange': "#d1660e",
        'pinkk': "#F36062",
        'darkpinkk': "#E0595A",
        'darkgrey': "#5D5D5D",
      },
      screens: {
        sm: "640px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }
      },
      borderRadius: {
        xl: "0.7rem", /* 12px */
      },
      padding: {
        '2': '0.5rem',
      },
      borderWidth: {
        '2.4': '2.4px',
        '3': '3.7px',
      },
      backgroundSize: {
        '123.88%': '123.88%',
      },
      backgroundPosition: {
        '50-11.94': '50% 11.94%',
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(123.88% 123.88% at 50% 11.94%, #5855E8 5.73%, #1577FF 100%)',
      },
    },
  },
  plugins: [],
};

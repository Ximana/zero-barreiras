/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        laranja: {
          DEFAULT: '#58af51',
          escuro: '#3d8a37',
          claro: '#7bc975',
          palido: '#edf7ec',
          suave: '#f4fbf3',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
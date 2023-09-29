/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        buttonPurple: '#3D246C',
        textPurple: '#5C4B99',
        authBG: '#FFF3EB', 
      }
    },
  },
  plugins: [],
}


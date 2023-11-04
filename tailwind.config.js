/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
        '4xl': [
            '0 35px 35px rgba(0, 0, 0, 0.25)',
            '0 45px 65px rgba(0, 0, 0, 0.15)'
        ],
        '3xlcustom-hovered' : '0 25px 25px rgba(61, 0, 255, 0.15)',
        '2xlcustom' : '0 35px 35px rgba(159, 145, 204, 0.25)'
      },
      colors: {
        buttonPurple: '#3D246C',
        textPurple: '#5C4B99',
        authBG: '#FFF3EB', 
        'wedvita-purple-unhover': '#3D246C',
        'wedvita-purple-hovered': '#251347',
        'wedvita-purple-light': '#9F91CC',
        'wedvita-purple': '#5C4B99', //untuk ungu normal
        'wedvita-beige': '#FFF3EB',
        'wedvita-text-light': '#757095',
        'wedvita-sidebar-dark' : '#160A2B',
        'wedvita-content-beige' : '#F2EEEB',
        'wedvita-text-light-purple' : '#B8BED9',
        'genshin-red' : '#B05846',

      },
      fontSize: {
        '1setxl': '1.3rem',
      },
      fontFamily: {
        'manrope': ['Manrope', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'GreatVibes': ['GreatVibes', 'script'],
        'GenshinFont': ['GenshinFont', 'script']
      },
      darkMode: 'class',
    },
  },
  plugins: [],
}

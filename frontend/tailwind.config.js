/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-slate-gray': '#2F4F4F',
        'wheat': '#EFD6AC',
        'french-Gray': '#C8C6D7',
        'white': '#fff',
        'black': '#000' // Custom color
      },
      fontFamily: {
        suse: ['SUSE', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


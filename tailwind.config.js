/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      gridTemplateColumns: {
        '4': 'repeat(4, minmax(0, 1fr))', 
      },
      colors: {
        primary: 'red',
      },
    },
  },
  plugins: []

}


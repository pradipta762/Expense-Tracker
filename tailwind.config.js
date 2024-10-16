/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}",
    "./index.html"
  ],
  theme: {
    extend: {
      colors: {
        'add-color' : '#08f40838',
        'add-border-color' : '#07e407',
        'remove-color' : '#f6000051',
        'reemove-border-color' : '#ff0000'
      }
    },
  },
  plugins: [],
}
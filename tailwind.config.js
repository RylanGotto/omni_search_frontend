/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
      },
      spacing: {
        88: '22rem',
      },
      colors: {
        omni: {
          linen: '#fbf3eb',
          emerald: '#3abd7e',
          moss: '#a5d7b7',
          vista: '#94d4ac'
        }
      }
    },
  },
  plugins: [],
})


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
    },
    screens: {
      'sm': '480px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1440px',
      // '2xl': '1920px'
    },
    extend: {
      colors: {
        softBlue: 'hsl(231, 69%, 60%)',
        softRed: 'hsl(0, 94%, 66%)',
        darkRed: 'hsl(0, 100%, 25%)',
        grayishBlue: 'hsl(229, 8%, 60%)',
        veryDarkBlue: 'hsl(229, 31%, 21%)',
      },
      lineClamp: {
        8: '8',
        10: '10',
        12: '12',
        14: '14',
        16: '16',
        18: '18'
      },
      maxHeight: {
        100: '25rem',
        120: '30rem',
        208: '52rem'
      }
    },
  },
  plugins: [],
}


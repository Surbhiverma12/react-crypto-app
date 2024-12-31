module.exports = {
  important: true,
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        yellow: {
          500: '#EEBC1D',
        },
        cryptoHeader: {
          light: '#16171a',
          dark: '#131111'
        },
        cryptoGold: '#EEBC1D'
      },
    },
  },
  plugins: [],
}
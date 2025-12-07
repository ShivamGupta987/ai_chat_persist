/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(262, 83%, 58%)',
          light: 'hsl(262, 83%, 68%)',
          dark: 'hsl(262, 83%, 48%)',
        },
        accent: {
          DEFAULT: 'hsl(217, 91%, 60%)',
          light: 'hsl(217, 91%, 70%)',
        },
        glass: {
          light: 'hsla(0, 0%, 100%, 0.1)',
          medium: 'hsla(0, 0%, 100%, 0.15)',
          heavy: 'hsla(0, 0%, 100%, 0.2)',
        },
        surface: {
          dark: 'hsl(222, 47%, 11%)',
          darker: 'hsl(224, 71%, 4%)',
        }
      },
      backdropBlur: {
        glass: '20px',
      },
      boxShadow: {
        glass: '0 8px 32px 0 hsla(0, 0%, 0%, 0.37)',
        glow: '0 0 40px hsla(262, 83%, 58%, 0.3)',
      },
      animation: {
        'bounce-slow': 'bounce 1.4s infinite',
      }
    },
  },
  plugins: [],
}

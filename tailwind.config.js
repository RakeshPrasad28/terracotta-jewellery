/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        terracotta: {
          50: '#FDF8F5',
          100: '#F9EEE7',
          200: '#F3D6C5',
          300: '#E7B49B',
          400: '#D78864',
          500: '#C1623C', // Signature baked terracotta
          600: '#A94B29',
          700: '#8C3B20',
          800: '#72311D',
          900: '#5F2B1B',
          950: '#34140B',
        },
        clay: {
          50: '#FAF8F5',
          100: '#F4EFE9',
          200: '#E8DED2',
          300: '#D5C4B1',
          400: '#B89F85',
          500: '#9E8064',
          600: '#82654D',
          700: '#684F3B',
          800: '#544031',
          900: '#45352A',
        },
        warmGold: {
          100: '#FAF3DC',
          200: '#F4E4AF',
          300: '#ECCF7C',
          400: '#E0B74C',
          500: '#C8962D',
          600: '#A7771F',
        },
        festiveRed: '#962D2D',
        festiveGreen: '#3D5A40',
        festiveIndigo: '#243E56',
        charcoal: '#1E1B18',
        canvas: '#FAF7F2',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSlow 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '0.9' },
          '50%': { opacity: '0.6' },
        }
      }
    },
  },
  plugins: [],
}



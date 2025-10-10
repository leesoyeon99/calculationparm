/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        farm: {
          green: '#4ade80',
          lightGreen: '#86efac',
          darkGreen: '#16a34a',
          brown: '#a3a3a3',
          soil: '#8b4513',
          sky: '#87ceeb',
          sun: '#fbbf24',
        },
        crop: {
          potato: '#f59e0b',
          carrot: '#f97316',
          corn: '#eab308',
          sunflower: '#fbbf24',
        }
      },
      animation: {
        'grow': 'grow 2s ease-in-out',
        'harvest': 'harvest 1s ease-out',
        'water': 'water 0.5s ease-in-out',
        'bounce-gentle': 'bounce-gentle 2s infinite',
      },
      keyframes: {
        grow: {
          '0%': { transform: 'scale(0.8)', opacity: '0.5' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        harvest: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)', filter: 'brightness(1.2)' },
          '100%': { transform: 'scale(1)', filter: 'brightness(1)' },
        },
        water: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        }
      }
    },
  },
  plugins: [],
}



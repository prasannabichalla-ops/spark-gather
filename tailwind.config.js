/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        peach: {
          DEFAULT: '#EDC7B7',
          light: '#F8E9E2',
          dark: '#D8A590',
        },
        cream: {
          DEFAULT: '#EEE2DC',
          light: '#FAF6F4',
          surface: '#F5ECE7',
          dark: '#E0CECA',
        },
        mauve: {
          DEFAULT: '#BAB2B5',
          light: '#DDD8D9',
          dark: '#8C8488',
        },
        navy: {
          DEFAULT: '#123C69',
          light: '#1D538F',
          dark: '#0A2542',
          subtle: '#123C690F',
        },
        berry: {
          DEFAULT: '#AC3B61',
          hover: '#8F2E4F',
          light: '#F6E3E9',
          subtle: '#AC3B6114',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Cabinet Grotesk', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(18, 60, 105, 0.06), 0 2px 6px -1px rgba(18, 60, 105, 0.04)',
        'card': '0 10px 30px -4px rgba(18, 60, 105, 0.08), 0 4px 10px -2px rgba(18, 60, 105, 0.04)',
        'elevated': '0 20px 40px -10px rgba(18, 60, 105, 0.14), 0 8px 16px -4px rgba(18, 60, 105, 0.06)',
        'berry-glow': '0 8px 24px -4px rgba(172, 59, 97, 0.35)',
        'navy-glow': '0 8px 24px -4px rgba(18, 60, 105, 0.25)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.35s ease-out forwards',
        'slide-down': 'slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float': 'floatSlow 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-red': {
          DEFAULT: '#8B1E1E',
          light: '#A32D2D',
          dark: '#6B1414',
        },
        'brand-gold': {
          DEFAULT: '#FAC775',
          deep: '#BA7517',
          light: '#FDE4B0',
        },
        'brand-cream': '#FDF6E9',
        'brand-ivory': '#FFF8E7',
        'brand-brown': '#412402',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        script: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Be Vietnam Pro"', 'system-ui', 'sans-serif'],
      },
      animation: {
        float: 'float 3.5s ease-in-out infinite',
        'float-delayed': 'float 3.5s ease-in-out infinite 1.5s',
        'fade-up': 'fadeUp 1s ease-out both',
        'fade-in': 'fadeIn 1.2s ease-out both',
        'seal-float': 'sealFloat 3.5s ease-in-out infinite',
        'pulse-ring': 'pulseRing 2.5s ease-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        sealFloat: {
          '0%, 100%': { transform: 'translateY(0) rotate(-8deg)' },
          '50%': { transform: 'translateY(-6px) rotate(-8deg)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(1)', opacity: '0.5' },
          '70%': { transform: 'scale(1.6)', opacity: '0' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};

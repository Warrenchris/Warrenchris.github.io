/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        primary: {
          DEFAULT: '#FDE900',
          50: '#FFFDE0',
          100: '#FFFAAD',
          200: '#FFF580',
          300: '#FFF04D',
          400: '#FEEC1A',
          500: '#FDE900',
          600: '#D4C200',
          700: '#A89A00',
          800: '#7C7100',
          900: '#524A00',
        },
        accent: {
          gold: '#F5A623',
          amber: '#FFB800',
          yellow: '#FFED00',
          white: '#FFFFFF',
          gray: '#888888',
          dark: '#111111',
        },
        dark: {
          DEFAULT: '#050505',
          50: '#0F0F0F',
          100: '#1A1A1A',
          200: '#252525',
          300: '#333333',
          400: '#555555',
          glass: 'rgba(10, 10, 10, 0.8)',
          border: 'rgba(253, 233, 0, 0.12)',
        },
        glass: {
          DEFAULT: 'rgba(255, 255, 255, 0.03)',
          border: 'rgba(253, 233, 0, 0.1)',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #050505 0%, #0F0F0F 60%, #1A1200 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(253,233,0,0.04) 0%, rgba(255,255,255,0.01) 100%)',
        'neon-gradient': 'linear-gradient(135deg, #FDE900, #F5A623, #FFED00)',
        'yellow-black': 'linear-gradient(135deg, #FDE900, #000000)',
        'gold-gradient': 'linear-gradient(135deg, #FDE900, #F5A623)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 2s',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'aurora': 'aurora 15s ease infinite',
        'blob': 'blob 7s infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.5s ease forwards',
        'border-rotate': 'borderRotate 4s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        aurora: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(253, 233, 0, 0.3), 0 0 20px rgba(253, 233, 0, 0.1)' },
          '100%': { boxShadow: '0 0 20px rgba(253, 233, 0, 0.7), 0 0 60px rgba(253, 233, 0, 0.3)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        borderRotate: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      boxShadow: {
        'neon-yellow': '0 0 20px rgba(253, 233, 0, 0.5), 0 0 60px rgba(253, 233, 0, 0.15)',
        'neon-gold': '0 0 20px rgba(245, 166, 35, 0.4), 0 0 60px rgba(245, 166, 35, 0.1)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.8)',
        'glass-sm': '0 4px 16px 0 rgba(0, 0, 0, 0.6)',
        'card-hover': '0 20px 60px rgba(253, 233, 0, 0.12)',
        'card-hover-strong': '0 0 0 1px rgba(253,233,0,0.2), 0 20px 60px rgba(253, 233, 0, 0.15)',
      },
      backdropBlur: {
        xs: '2px',
      },
      spacing: {
        '18': '4.5rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
}

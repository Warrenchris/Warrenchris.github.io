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
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Text"',
          '"SF Pro Display"',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif'
        ],
        display: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif'
        ],
        mono: ['"SF Mono"', 'SFMono-Regular', 'JetBrains Mono', 'monospace'],
      },
      colors: {
        primary: {
          DEFAULT: '#F4B400',   /* Mapped primary accent to Premium Gold */
          50: '#FFFDF0',
          100: '#FFF7C2',
          200: '#FFE87A',
          300: '#FFD733',
          400: '#F4B400',
          500: '#F4B400',
          600: '#C79200',
          700: '#997000',
          800: '#6B4E00',
          900: '#3D2C00',
        },
        accent: {
          blue: '#F4B400',
          purple: '#C79200',
          magenta: '#C79200',
          gray: '#A3A3A8',
          light: '#F8F5EF',
          dark: '#1A1A1D',
        },
        dark: {
          DEFAULT: '#0B0B0C',  /* Rich Black */
          50: '#121215',       /* Subtle dark elevation */
          100: '#1A1A1D',      /* Charcoal card background */
          200: '#2A2A30',
          300: '#5A5A60',
          400: '#A3A3A8',
          glass: 'rgba(11, 11, 12, 0.8)',
          border: 'rgba(163, 163, 168, 0.12)',
        },
        glass: {
          DEFAULT: 'var(--glass-bg)',
          border: 'var(--border-color)',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(180deg, #0B0B0C 0%, #121215 100%)',
        'card-gradient': 'linear-gradient(180deg, rgba(248, 245, 239, 0.02) 0%, rgba(248, 245, 239, 0) 100%)',
        'neon-gradient': 'linear-gradient(135deg, #F4B400, #C79200)',
        'yellow-black': 'linear-gradient(180deg, #F4B400, #0B0B0C)',
        'gold-gradient': 'linear-gradient(135deg, #F4B400, #C79200)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 2s',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'spin-slow': 'spin 25s linear infinite',
        'aurora': 'aurora 20s ease infinite',
        'blob': 'blob 8s infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards',
        'border-rotate': 'borderRotate 6s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        aurora: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(20px, -30px) scale(1.08)' },
          '66%': { transform: 'translate(-15px, 15px) scale(0.95)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 113, 227, 0.15), 0 0 20px rgba(0, 113, 227, 0.05)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 113, 227, 0.4), 0 0 40px rgba(0, 113, 227, 0.15)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        borderRotate: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      boxShadow: {
        'neon-yellow': '0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)',
        'neon-gold': '0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)',
        'glass': '0 8px 30px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.08)',
        'glass-sm': '0 4px 16px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.08)',
        'card-hover': '0 20px 40px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(0, 113, 227, 0.2)',
        'card-hover-strong': '0 0 0 1px rgba(0, 113, 227, 0.25), 0 20px 40px rgba(0, 0, 0, 0.5)',
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

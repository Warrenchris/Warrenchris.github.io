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
          DEFAULT: '#0071E3',   /* Mapped BVB yellow to Apple Blue */
          50: '#F2F8FF',
          100: '#E1F0FF',
          200: '#BADEFF',
          300: '#8AC7FF',
          400: '#4CA7FF',
          500: '#0071E3',
          600: '#0059B3',
          700: '#004080',
          800: '#002854',
          900: '#001229',
        },
        accent: {
          blue: '#0071E3',
          purple: '#007AFF',   /* iOS System Blue */
          magenta: '#5E5CE6',  /* iOS System Purple */
          gray: '#8E8E93',
          light: '#F5F5F7',
          dark: '#1D1D1F',
        },
        dark: {
          DEFAULT: '#000000',  /* Pure Black background */
          50: '#0A0A0C',       /* Linear elevated background */
          100: '#161618',      /* Raycast card background */
          200: '#222225',
          300: '#424245',
          400: '#8E8E93',
          glass: 'rgba(10, 10, 12, 0.8)',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        glass: {
          DEFAULT: 'rgba(255, 255, 255, 0.03)',
          border: 'rgba(255, 255, 255, 0.08)',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(180deg, #000000 0%, #0A0A0C 100%)',
        'card-gradient': 'linear-gradient(180deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0) 100%)',
        'neon-gradient': 'linear-gradient(135deg, #0071E3, #007AFF)',
        'yellow-black': 'linear-gradient(180deg, #0071E3, #000000)',
        'gold-gradient': 'linear-gradient(135deg, #0071E3, #0059B3)',
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

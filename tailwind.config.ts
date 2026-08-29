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
          'sans-serif',
        ],
        display: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
        mono: ['"SF Mono"', 'SFMono-Regular', 'JetBrains Mono', 'monospace'],
      },
      colors: {
        primary: {
          DEFAULT: '#dda15e',
          50: '#fcf6ef',
          100: '#f9ecdf',
          200: '#f6e3d0',
          300: '#f3dac0',
          400: '#efd0b0',
          500: '#dda15e',
          600: '#bc6c25',
          700: '#a47644',
          800: '#886237',
          900: '#6e4e2b',
        },
        accent: {
          blue: '#dda15e',
          purple: '#bc6c25',
          magenta: '#bc6c25',
          gray: '#A3A3A8',
          light: '#F8F5EF',
          dark: '#1A1A1D',
        },
        dark: {
          DEFAULT: '#0B0B0C',
          50: '#121215',
          100: '#1A1A1D',
          200: '#2A2A30',
          300: '#5A5A60',
          400: '#A3A3A8',
          glass: 'rgba(11, 11, 12, 0.85)',
          border: 'rgba(163, 163, 168, 0.12)',
        },
        glass: {
          DEFAULT: 'var(--glass-bg)',
          border: 'var(--border-color)',
        },
      },
      boxShadow: {
        'glass': '0 8px 30px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.08)',
        'glass-sm': '0 4px 16px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.08)',
        'card-hover': '0 20px 40px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(221, 161, 94, 0.2)',
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

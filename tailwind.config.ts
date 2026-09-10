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
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"SF Mono"', 'monospace'],
      },
      colors: {
        surface: {
          DEFAULT: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          tertiary: 'var(--bg-tertiary)',
        },
        content: {
          DEFAULT: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          hover: 'var(--color-accent-hover)',
        },
        border: {
          DEFAULT: 'var(--border-color)',
        },
      },
      maxWidth: {
        content: '1120px',
      },
      fontSize: {
        'display': ['clamp(2.5rem, 5vw, 3.5rem)', { lineHeight: '1.08', letterSpacing: '-0.03em', fontWeight: '600' }],
        'heading': ['clamp(1.5rem, 3vw, 2rem)', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '600' }],
        'subheading': ['clamp(1.125rem, 2vw, 1.25rem)', { lineHeight: '1.4', letterSpacing: '-0.01em', fontWeight: '500' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'small': ['0.875rem', { lineHeight: '1.5' }],
        'caption': ['0.75rem', { lineHeight: '1.4' }],
        'mono-sm': ['0.8125rem', { lineHeight: '1.4', fontWeight: '500' }],
      },
    },
  },
  plugins: [],
}

import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx,html}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Be Vietnam Pro', 'sans-serif'],
      },
      colors: {
        sage: {
          50: '#c5e1a5',   // Mint pastel (base)
          100: '#b8d99b',  // Slightly darker
          200: '#a5c98a',  // Medium
          300: '#8fb879',  // Medium-dark
          400: '#7da868',  // Dark
          500: '#6b9858',  // Darker
          600: '#5a8748',  // Very dark
          700: '#4a7239',  // Deep
          800: '#3a5c2c',  // Deeper
          900: '#2d4622',  // Deepest
          950: '#1f3017',  // Almost black
        },
        primary: {
          DEFAULT: '#8fb879',
          light: '#c5e1a5',
          dark: '#5a8748',
        },
        sidebar: {
          from: '#4a7239',
          to: '#6b9858',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
} satisfies Config
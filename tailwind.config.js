/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Exo', 'sans-serif'],
      },
      colors: {
        background: 'var(--background-color)',
        text: 'var(--text-color)',
        primary: 'var(--primary-color)',
        dark: {
          50: '#f7f7f7',
          100: '#e3e3e3',
          200: '#c8c8c8',
          300: '#a4a4a4',
          400: '#818181',
          500: '#666666',
          600: '#515151',
          700: '#3e1993',
          800: '#383838',
          900: '#313131',
        }
      },
      backgroundColor: {
        'theme-bg': 'var(--background-color)',
        'theme-card': 'var(--card-background)',
      },
      textColor: {
        'theme-text': 'var(--text-color)',
        'theme-muted': 'var(--muted-text)',
      },
      borderColor: {
        'theme-border': 'var(--border-color)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'custom-image': "url('/Background_Theme_SAI.jpg')",
      }
    },
  },
  plugins: [],
}; 
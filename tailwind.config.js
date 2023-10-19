/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html'],
  theme: {
    extend: {
      colors: {
        pink: 'var(--pink-color)',
        yellow: '#faf4e5',
        blue: 'var(--blue-color)',
        green: 'var(--green-color)',
        text: 'var(--text-color)',
        background: 'var(--background-color)',
        light: {
          text: '#333',
          background: '#faf4e5',
          secondary: '#f0f0f0',
        },
        dark: {
          text: '#faf4e5',
          background: '#8395cd',
          secondary: '#8395cd',
        },
      },
    },
  },
  plugins: [],
}

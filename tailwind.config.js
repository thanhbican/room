/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html"],
  theme: {
    extend: {
      colors: {
        pink: "#e5a1aa",
        yellow: "#FAF4E5",
        text: "var(--text-color)",
        background: "var(--background-color)",
        light: {
          text: "#333",
          background: "#FAF4E5",
          secondary: "#f0f0f0",
        },
        dark: {
          text: "#FAF4E5",
          background: "#8395CD",
          secondary: "#8395CD",
        },
      },
    },
  },
  plugins: [],
};

// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-in': { // Make sure this is already defined
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        'fade-out': { // <-- ADD THIS NEW KEYFRAME
          'from': { opacity: '1' },
          'to': { opacity: '0' },
        },
        // ... any other keyframes you have
      },
      animation: {
        'fade-in': 'fade-in 0.7s ease-out forwards', // Make sure this is already defined
        'fade-out': 'fade-out 0.7s ease-out forwards', // <-- ADD THIS NEW ANIMATION
        // ... any other animations you have
      },
      // ... your other theme extensions
    },
  },
  plugins: [],
}
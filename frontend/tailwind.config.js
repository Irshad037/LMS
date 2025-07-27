import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        'max-h': 'max-height',
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: false, // disables all theme-based color overrides
  }
}

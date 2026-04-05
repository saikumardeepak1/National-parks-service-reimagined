/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      "colors": {
        "on-secondary-container": "#1b1c1c",
        "on-error": "#ffffff",
        "secondary-container": "#d5d4d4",
        "tertiary": "#3b3b3b",
        "outline": "#777777",
        "inverse-primary": "#c8c6c5",
        "surface-container-highest": "#e5e2dc",
        "error": "#ba1a1a",
        "surface-bright": "#fcf9f3",
        "on-error-container": "#410002",
        "tertiary-fixed-dim": "#474747",
        "primary-container": "#3c3b3b",
        "surface-tint": "#5f5e5e",
        "tertiary-container": "#747474",
        "error-container": "#ffdad6",
        "surface-variant": "#e5e2dc",
        "surface-container-lowest": "#ffffff",
        "on-primary-fixed": "#ffffff",
        "on-primary": "#e5e2e1",
        "on-primary-container": "#ffffff",
        "on-surface-variant": "#474747",
        "inverse-surface": "#31312d",
        "on-tertiary-fixed": "#ffffff",
        "inverse-on-surface": "#f3f0ea",
        "primary-fixed-dim": "#474746",
        "surface-dim": "#dcdad4",
        "on-primary-fixed-variant": "#e5e2e1",
        "on-secondary-fixed": "#1b1c1c",
        "tertiary-fixed": "#5e5e5e",
        "outline-variant": "#c6c6c6",
        "on-secondary": "#ffffff",
        "secondary": "#5e5e5e",
        "on-surface": "#1c1c18",
        "background": "#fcf9f3",
        "surface-container-high": "#ebe8e2",
        "secondary-fixed": "#c7c6c6",
        "primary-fixed": "#5f5e5e",
        "on-tertiary-fixed-variant": "#e2e2e2",
        "on-background": "#1c1c18",
        "on-tertiary": "#e2e2e2",
        "surface": "#fcf9f3",
        "surface-container-low": "#f6f3ed",
        "on-tertiary-container": "#ffffff",
        "on-secondary-fixed-variant": "#3b3b3c",
        "surface-container": "#f0eee8",
        "primary": "#000000",
        "secondary-fixed-dim": "#ababab"
      },
      "borderRadius": {
        "DEFAULT": "0px",
        "lg": "0px",
        "xl": "0px",
        "full": "9999px"
      },
      "fontFamily": {
        "headline": ["Playfair Display", "serif"],
        "body": ["Cormorant Garamond", "serif"],
        "label": ["Inter", "sans-serif"],
        "signature": ["Pinyon Script", "cursive"]
      }
    }
  },
  plugins: [],
}

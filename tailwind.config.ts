import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        "display": "'Abril Fatface', display"
      }
    },
  },
  plugins: [],
} satisfies Config


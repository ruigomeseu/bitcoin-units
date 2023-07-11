/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['"Inter"', 'system-ui', 'sans-serif'],
        fira: ['"Fira Mono"', 'ui-monospace', 'monospace']
      }
    }
  },
  plugins: []
}

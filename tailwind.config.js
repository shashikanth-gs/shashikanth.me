/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./apps/**/*.{html,ts}', './libs/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        display: ['var(--font-display)'],
      },
      boxShadow: {
        hero: '0 32px 80px -40px oklch(0.2 0.08 255 / 0.45)',
        panel: '0 18px 60px -32px oklch(0.2 0.06 255 / 0.35)',
      },
      backgroundImage: {
        'brand-grid':
          'linear-gradient(to right, color-mix(in oklch, var(--border) 70%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklch, var(--border) 70%, transparent) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};

import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,js,jsx,mdx}'],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        ivory: '#FAF8F4',
        black: '#0C0B0A',
        charcoal: '#1A1815',
        gold: {
          DEFAULT: '#C2A14D',
          light: '#D8BE7E',
          deep: '#9C7E33',
        },
      },
      fontFamily: {
        // Loaded via next/font in layout.tsx
        display: ['var(--font-cormorant)', 'Cormorant Garamond', 'Playfair Display', 'serif'],
        sans: ['var(--font-jost)', 'Jost', 'Inter', 'system-ui', 'sans-serif'],
        thai: ['var(--font-noto-thai)', 'Noto Serif Thai', 'serif'],
      },
      letterSpacing: {
        eyebrow: '0.24em',
        wide2: '0.18em',
      },
      transitionTimingFunction: {
        elegant: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      },
      animation: {
        'fade-up': 'fadeUp 1.1s cubic-bezier(0.22, 0.61, 0.36, 1) forwards',
        'gentle-rise': 'gentleRise 1.6s cubic-bezier(0.22, 0.61, 0.36, 1) forwards',
        marquee: 'marquee 60s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        gentleRise: {
          '0%': { opacity: '0', transform: 'translateY(48px) scale(1.02)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

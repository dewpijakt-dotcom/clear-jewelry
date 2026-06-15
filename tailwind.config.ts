import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,js,jsx,mdx}'],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        ivory: '#FAF8F4',
        paper: '#F2EBDD',
        cream: '#EFE6D2',
        black: '#0A0908',
        charcoal: '#15130F',
        graphite: '#211E18',
        // a refined 5-stop gold range
        gold: {
          DEFAULT: '#C2A14D',
          light: '#E2C681',
          softer: '#EBD9A8',
          deep: '#947433',
          dark: '#6E5523',
          blush: '#D2A37A',
        },
        emerald: { DEFAULT: '#1d633c', deep: '#0e3a1f' },
        sapphire: { DEFAULT: '#15294d', deep: '#0a1730' },
        ruby:    { DEFAULT: '#7a1729', deep: '#440d18' },
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Cormorant Garamond', 'Playfair Display', 'serif'],
        sans: ['var(--font-jost)', 'Jost', 'Inter', 'system-ui', 'sans-serif'],
        thai: ['var(--font-noto-thai)', 'Noto Serif Thai', 'serif'],
      },
      letterSpacing: {
        eyebrow: '0.32em',
        eyebrowXL: '0.48em',
        wide2: '0.18em',
      },
      transitionTimingFunction: {
        elegant: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
        bezel: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      boxShadow: {
        glow: '0 0 48px rgba(194, 161, 77, 0.25)',
        'glow-soft': '0 0 80px rgba(194, 161, 77, 0.14)',
        plinth: '0 30px 60px -30px rgba(21, 19, 15, 0.35)',
      },
      animation: {
        'fade-up':       'fadeUp 1.1s cubic-bezier(0.22, 0.61, 0.36, 1) forwards',
        'gentle-rise':   'gentleRise 1.6s cubic-bezier(0.22, 0.61, 0.36, 1) forwards',
        marquee:         'marquee 60s linear infinite',
        'gilt-sweep':    'giltSweep 2.8s cubic-bezier(0.22, 0.61, 0.36, 1) forwards',
        'sparkle':       'sparkle 2.4s ease-in-out infinite',
        'sparkle-slow':  'sparkle 6s ease-in-out infinite',
        'shimmer':       'shimmer 8s linear infinite',
        'soft-pulse':    'softPulse 4s ease-in-out infinite',
        'draw-rule':     'drawRule 1.4s cubic-bezier(0.22, 0.61, 0.36, 1) forwards',
        'breathe':       'breathe 10s ease-in-out infinite',
        'letter-settle': 'letterSettle 1.8s cubic-bezier(0.22, 0.61, 0.36, 1) forwards',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        gentleRise: {
          '0%':   { opacity: '0', transform: 'translateY(48px) scale(1.02)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        giltSweep: {
          '0%':   { backgroundPosition: '-150% 0' },
          '100%': { backgroundPosition: '150% 0' },
        },
        sparkle: {
          '0%,100%': { opacity: '0', transform: 'scale(0.5)' },
          '50%':     { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%':   { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        softPulse: {
          '0%,100%': { opacity: '0.45' },
          '50%':     { opacity: '0.95' },
        },
        drawRule: {
          '0%':   { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        breathe: {
          '0%,100%': { transform: 'scale(1)' },
          '50%':     { transform: 'scale(1.04)' },
        },
        letterSettle: {
          '0%':   { opacity: '0', letterSpacing: '0.7em' },
          '100%': { opacity: '1', letterSpacing: '0.32em' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

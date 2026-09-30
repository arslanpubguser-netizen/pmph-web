/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#07080D',
          surface: '#11131A',
          card: '#181B24',
          hover: '#20242F',
        },
        border: {
          DEFAULT: '#292D38',
          subtle: '#1E212B',
        },
        primary: {
          DEFAULT: '#22C55E',
          electric: '#39FF88',
          dark: '#16A34A',
        },
        blue: {
          DEFAULT: '#3B82F6',
          electric: '#00A3FF',
        },
        purple: {
          DEFAULT: '#8B5CF6',
          neon: '#A855F7',
        },
        cyan: '#06B6D4',
        yellow: '#FACC15',
        orange: '#FB923C',
        red: '#EF4444',
        text: {
          primary: '#FFFFFF',
          secondary: '#D4D4D8',
          muted: '#A1A1AA',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Rajdhani', 'Inter', 'sans-serif'],
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'gradient-x': 'gradient-x 3s ease infinite',
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
        'count-up': 'count-up 1s ease-out',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(34, 197, 94, 0.5)' },
          '50%': { opacity: '0.8', boxShadow: '0 0 30px rgba(34, 197, 94, 0.8)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(rgba(34,197,94,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.05) 1px, transparent 1px)",
        'radial-fade': 'radial-gradient(circle at center, rgba(34,197,94,0.15) 0%, transparent 70%)',
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
    },
  },
  plugins: [],
};

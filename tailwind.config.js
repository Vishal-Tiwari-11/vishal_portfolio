/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#EEF3FF',
          100: '#DCE8FF',
          200: '#B9D1FF',
          300: '#8AB0FF',
          400: '#5C8CFF',
          500: '#3D6BFD',
          600: '#2851E0',
          700: '#1D3DB3',
          800: '#182F86',
          900: '#142663',
        },
        ink: {
          bg: '#0A0E1A',
          surface: '#10162A',
          elevated: '#161F35',
          border: '#222C45',
          muted: '#8B96AD',
          text: '#E7ECF7',
        },
        paper: {
          bg: '#F6F8FC',
          surface: '#FFFFFF',
          elevated: '#EEF2FA',
          border: '#DEE5F2',
          muted: '#5B6679',
          text: '#0E1525',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(to right, rgb(61 107 253 / 0.07) 1px, transparent 1px), linear-gradient(to bottom, rgb(61 107 253 / 0.07) 1px, transparent 1px)',
        'glow-radial':
          'radial-gradient(circle at 50% 0%, rgb(61 107 253 / 0.18), transparent 60%)',
      },
      backgroundSize: {
        grid: '38px 38px',
      },
      keyframes: {
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(18px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        scale: {
          from: { opacity: '0', transform: 'scale(0.96)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        blink: 'blink 1s step-start infinite',
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-in': 'fade-in 0.7s ease-out forwards',
        scale: 'scale 0.5s cubic-bezier(0.16,1,0.3,1) forwards',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

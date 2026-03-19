import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        mirror: {
          bg: '#f6efe7',
          secondary: '#efe3d4',
          card: 'rgba(255,248,240,0.82)',
          ivory: '#fffaf4',
          sand: '#dcc7ae',
          terracotta: '#b86f4d',
          copper: '#8e4b32',
          brown: '#3a2a22',
          ink: '#1e1612',
          sage: '#98a08f',
          text: '#2c211b',
          muted: '#6f5a4f',
          border: 'rgba(90,60,40,0.12)'
        }
      },
      boxShadow: {
        soft: '0 18px 45px rgba(60,35,20,0.10)'
      },
      borderRadius: {
        card: '30px'
      },
      backgroundImage: {
        'mirror-surface': 'radial-gradient(circle at top left, rgba(184,111,77,0.16), transparent 36%), radial-gradient(circle at 85% 15%, rgba(220,199,174,0.36), transparent 26%), radial-gradient(circle at 50% 100%, rgba(152,160,143,0.12), transparent 25%), linear-gradient(145deg, #f6efe7 0%, #efe3d4 100%)'
      }
    }
  },
  plugins: []
};

export default config;

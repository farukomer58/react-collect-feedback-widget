import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        feedback: {
          primary: '#3b82f6',
          secondary: '#64748b',
          success: '#10b981',
          error: '#ef4444',
          background: '#ffffff',
          text: '#1f2937',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;


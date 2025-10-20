import type {Config} from 'tailwindcss';
import { getTagColorVariables } from './src/lib/tag-colors';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        body: ['Source Code Pro', 'monospace'],
        headline: ['Source Code Pro', 'monospace'],
        code: ['Source Code Pro', 'monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
        tag: {
          blue: {
            bg: 'hsl(var(--tag-blue-bg))',
            fg: 'hsl(var(--tag-blue-fg))',
          },
          green: {
            bg: 'hsl(var(--tag-green-bg))',
            fg: 'hsl(var(--tag-green-fg))',
          },
           cyan: {
            bg: 'hsl(var(--tag-cyan-bg))',
            fg: 'hsl(var(--tag-cyan-fg))',
          },
          yellow: {
            bg: 'hsl(var(--tag-yellow-bg))',
            fg: 'hsl(var(--tag-yellow-fg))',
          },
          purple: {
            bg: 'hsl(var(--tag-purple-bg))',
            fg: 'hsl(var(--tag-purple-fg))',
          },
          orange: {
            bg: 'hsl(var(--tag-orange-bg))',
            fg: 'hsl(var(--tag-orange-fg))',
          },
          red: {
            bg: 'hsl(var(--tag-red-bg))',
            fg: 'hsl(var(--tag-red-fg))',
          },
          pink: {
            bg: 'hsl(var(--tag-pink-bg))',
            fg: 'hsl(var(--tag-pink-fg))',
          },
          teal: {
            bg: 'hsl(var(--tag-teal-bg))',
            fg: 'hsl(var(--tag-teal-fg))',
          },
          indigo: {
            bg: 'hsl(var(--tag-indigo-bg))',
            fg: 'hsl(var(--tag-indigo-fg))',
          },
          gray: {
            bg: 'hsl(var(--tag-gray-bg))',
            fg: 'hsl(var(--tag-gray-fg))',
          },
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'), 
    require('@tailwindcss/typography'),
    function ({ addBase }) {
      addBase({
        ':root': getTagColorVariables(),
      });
    },
  ],
} satisfies Config;

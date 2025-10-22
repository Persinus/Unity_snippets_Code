
import type {Config} from 'tailwindcss';

const tagColorVariables = {
  '--tag-blue-bg': '217 91% 60%',
  '--tag-blue-fg': '217 91% 98%',
  '--tag-green-bg': '142 71% 45%',
  '--tag-green-fg': '142 71% 98%',
  '--tag-cyan-bg': '187 81% 55%',
  '--tag-cyan-fg': '187 81% 98%',
  '--tag-yellow-bg': '48 96% 58%',
  '--tag-yellow-fg': '48 96% 5%',
  '--tag-purple-bg': '262 84% 60%',
  '--tag-purple-fg': '262 84% 98%',
  '--tag-orange-bg': '24 95% 53%',
  '--tag-orange-fg': '24 95% 98%',
  '--tag-red-bg': '0 84% 60%',
  '--tag-red-fg': '0 84% 98%',
  '--tag-pink-bg': '329 84% 60%',
  '--tag-pink-fg': '329 84% 98%',
  '--tag-teal-bg': '166 84% 45%',
  '--tag-teal-fg': '166 84% 98%',
  '--tag-indigo-bg': '239 84% 60%',
  '--tag-indigo-fg': '239 84% 98%',
  '--tag-gray-bg': '240 5% 50%',
  '--tag-gray-fg': '240 5% 98%',
  '--tag-lime-bg': '84 90% 50%',
  '--tag-lime-fg': '84 90% 10%',
  '--tag-amber-bg': '36 95% 55%',
  '--tag-amber-fg': '36 95% 10%',
  '--tag-violet-bg': '255 90% 65%',
  '--tag-violet-fg': '255 90% 98%',
  '--tag-fuchsia-bg': '290 85% 60%',
  '--tag-fuchsia-fg': '290 85% 98%',
  '--tag-rose-bg': '340 85% 65%',
  '--tag-rose-fg': '340 85% 98%',
  '--tag-light-blue-bg': '205 90% 55%',
  '--tag-light-blue-fg': '205 90% 98%',
  '--tag-sky-bg': '195 90% 50%',
  '--tag-sky-fg': '195 90% 98%',
  '--tag-light-green-bg': '120 70% 45%',
  '--tag-light-green-fg': '120 70% 98%',
  '--tag-slate-bg': '215 30% 50%',
  '--tag-slate-fg': '215 30% 98%',
  '--tag-cool-gray-bg': '220 15% 55%',
  '--tag-cool-gray-fg': '220 15% 98%',
  '--tag-blue-gray-bg': '210 25% 50%',
  '--tag-blue-gray-fg': '210 25% 98%',
  '--tag-warm-gray-bg': '30 10% 50%',
  '--tag-warm-gray-fg': '30 10% 98%',
  '--tag-true-gray-bg': '0 0% 50%',
  '--tag-true-gray-fg': '0 0% 98%',
  '--tag-emerald-bg': '150 70% 45%',
  '--tag-emerald-fg': '150 70% 98%',
  '--tag-gold-bg': '45 90% 50%',
  '--tag-gold-fg': '45 90% 10%',
  '--tag-deep-purple-bg': '280 80% 60%',
  '--tag-deep-purple-fg': '280 80% 98%',
};


export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/tag-colors.ts'
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
        body: ['var(--font-source-code-pro)', 'monospace'],
        headline: ['var(--font-source-code-pro)', 'monospace'],
        code: ['var(--font-source-code-pro)', 'monospace'],
        'fira-code': ['var(--font-fira-code)', 'monospace'],
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
          lime: {
            bg: 'hsl(var(--tag-lime-bg))',
            fg: 'hsl(var(--tag-lime-fg))',
          },
          amber: {
            bg: 'hsl(var(--tag-amber-bg))',
            fg: 'hsl(var(--tag-amber-fg))',
          },
          violet: {
            bg: 'hsl(var(--tag-violet-bg))',
            fg: 'hsl(var(--tag-violet-fg))',
          },
          fuchsia: {
            bg: 'hsl(var(--tag-fuchsia-bg))',
            fg: 'hsl(var(--tag-fuchsia-fg))',
          },
          rose: {
            bg: 'hsl(var(--tag-rose-bg))',
            fg: 'hsl(var(--tag-rose-fg))',
          },
          'light-blue': {
            bg: 'hsl(var(--tag-light-blue-bg))',
            fg: 'hsl(var(--tag-light-blue-fg))',
          },
          sky: {
            bg: 'hsl(var(--tag-sky-bg))',
            fg: 'hsl(var(--tag-sky-fg))',
          },
          'light-green': {
            bg: 'hsl(var(--tag-light-green-bg))',
            fg: 'hsl(var(--tag-light-green-fg))',
          },
          slate: {
            bg: 'hsl(var(--tag-slate-bg))',
            fg: 'hsl(var(--tag-slate-fg))',
          },
          'cool-gray': {
            bg: 'hsl(var(--tag-cool-gray-bg))',
            fg: 'hsl(var(--tag-cool-gray-fg))',
          },
          'blue-gray': {
            bg: 'hsl(var(--tag-blue-gray-bg))',
            fg: 'hsl(var(--tag-blue-gray-fg))',
          },
          'warm-gray': {
            bg: 'hsl(var(--tag-warm-gray-bg))',
            fg: 'hsl(var(--tag-warm-gray-fg))',
          },
          'true-gray': {
            bg: 'hsl(var(--tag-true-gray-bg))',
            fg: 'hsl(var(--tag-true-gray-fg))',
          },
          emerald: {
            bg: 'hsl(var(--tag-emerald-bg))',
            fg: 'hsl(var(--tag-emerald-fg))',
          },
          gold: {
            bg: 'hsl(var(--tag-gold-bg))',
            fg: 'hsl(var(--tag-gold-fg))',
          },
          'deep-purple': {
            bg: 'hsl(var(--tag-deep-purple-bg))',
            fg: 'hsl(var(--tag-deep-purple-fg))',
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
        ':root': tagColorVariables,
      });
    },
  ],
} satisfies Config;

import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Custom project colors
        bole: {
          '100': '#170d0a',
          '200': '#2d1a14',
          '300': '#44271e',
          '400': '#553025',
          '500': '#704031',
          '600': '#8e513e',
          '700': '#bb7763',
          '800': '#d3a99c',
          '850': '#ecdad4',
          '900': '#f9f3f1',
        },
        satin_gold: {
          '100': '#231c06',
          '200': '#57450f',
          '300': '#8b6e18',
          '400': '#ad8a1f',
          '500': '#d0a525',
          '600': '#e0bd52',
          '700': '#ead186',
          '800': '#f3e4ba',
          '900': '#fcf8ee',
        },
        jet: {
          '100': '#09090a',
          '200': '#131314',
          '300': '#1c1c1e',
          '400': '#262628',
          '500': '#2f2f31',
          '600': '#58585c',
          '700': '#818186',
          '800': '#ababae',
          '900': '#d5d5d7',
        },
        // shadcn/ui colors with project theme
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        highlight: 'var(--highlight)',
        header: {
          text: 'var(--header-text)',
          menu: 'var(--header-menu)',
          background: 'var(--header-background)',
          hover: 'var(--header-hover)',
        },
        gradient: {
          from: 'var(--gradient-from)',
          to: 'var(--gradient-to)',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          hover: 'var(--primary-hover)',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
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
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        serif: ['var(--font-serif)'],
        mono: ['var(--font-mono)'],
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
      screens: {
        '2sm': '450px',
        laptop: '1400px',
      },
      spacing: {
        '76': '304px',
        '114': '456px',
        '120': '480px',
        header: '120px',
        'header-sm': '100px',
      },
      gridTemplateColumns: {
        auth: '1.5fr 2fr',
        event: '2fr 1fr',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

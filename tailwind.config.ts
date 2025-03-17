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
            background: 'var(--background)',
            foreground: 'var(--foreground)',
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
               DEFAULT: 'var(--primary)',
               foreground: 'var(--primary-foreground)',
            },
            secondary: {
               DEFAULT: 'var(--secondary)',
               foreground: 'var(--secondary-foreground)',
            },
            card: {
               DEFAULT: 'var(--card)',
               foreground: 'var(--card-foreground)',
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
               from: { height: '0' },
               to: { height: 'var(--radix-accordion-content-height)' },
            },
            'accordion-up': {
               from: { height: 'var(--radix-accordion-content-height)' },
               to: { height: '0' },
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
         },
      },
   },
   plugins: [require('tailwindcss-animate')],
} satisfies Config

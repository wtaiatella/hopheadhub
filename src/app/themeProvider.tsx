'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import React from 'react'

export default function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem={true} {...props}>
      {children}
    </NextThemesProvider>
  )
}

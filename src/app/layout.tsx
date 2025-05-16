import React from 'react'
import ClientProvider from './clientProvider'
import { siteConfig } from '@/config/site'
import { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
   title: siteConfig.name,
   description: siteConfig.description,
   metadataBase: new URL(siteConfig.url),
   keywords: ['Next.js', 'React', 'Tailwind CSS', 'Server Components', 'Radix UI'],
   authors: [
      {
         name: 'shadcn',
         url: 'https://shadcn.com',
      },
   ],
   creator: 'shadcn',
   openGraph: {
      type: 'website',
      locale: 'en_US',
      url: siteConfig.url,
      title: siteConfig.name,
      description: siteConfig.description,
      siteName: siteConfig.name,
      images: [
         {
            url: siteConfig.ogImage,
            width: 1200,
            height: 630,
            alt: siteConfig.name,
         },
      ],
   },
   twitter: {
      card: 'summary_large_image',
      title: siteConfig.name,
      description: siteConfig.description,
      images: [siteConfig.ogImage],
      creator: '@wtaiatella',
   },
   icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png',
   },
   // manifest: `${siteConfig.url}/site.webmanifest`,
}

export const viewport = {
   width: 'device-width',
   initialScale: 1,
}

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <html lang="en">
         <head>
            <link
               rel="stylesheet"
               href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Bitter:ital,wght@0,100..900;1,100..900&family=JetBrains+Mono:wght@100..700&display=swap"
            />
         </head>
         <body className="min-h-screen bg-background bg-[url('/assets/bg-site.jpg')] bg-repeat dark:bg-none transition-colors duration-200">
            <ClientProvider>{children}</ClientProvider>
         </body>
      </html>
   )
}

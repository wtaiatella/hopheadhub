'use client'
import Footer from '@/components/app/footer'
import Header from '@/components/app/header'

export default function mainLayout({ children }: { children: React.ReactNode }) {
   return (
      <>
         <Header />
         {children}
         <Footer />
      </>
   )
}

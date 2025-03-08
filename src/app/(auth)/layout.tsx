import React from 'react'

export default function mainLayout({ children }: { children: React.ReactNode }) {
   return (
      <div className="flex items-center justify-center mx-auto max-w-7xl min-h-screen">
         <div className="grid grid-cols-2 content-center rounded-lg shadow-lg overflow-hidden">
            {children}
         </div>
      </div>
   )
}

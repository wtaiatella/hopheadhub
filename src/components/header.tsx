'use client'

import Image from 'next/image'
import Link from 'next/link'
import { UserRound } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Header() {
   const [selected, setSelected] = useState('')

   return (
      <header className="fixed top-0 right-0 left-0 w-full z-10 bg-header-background">
         <div className="container mx-auto px-4 ">
            <nav className="flex align-center justify-between text-2xl text-header-text  items-center">
               <Link href="/" className="my-3" onClick={() => setSelected('')}>
                  <Image
                     src="/assets/logo-yellow.png"
                     className="2sm:h-24 2sm:w-36 h-16 w-24 cursor-pointer"
                     width={768}
                     height={512}
                     alt="hhh logo"
                     priority
                  />
               </Link>
               <Link
                  href="/events"
                  className={`relative hover:text-header-hover ${selected === 'events' ? '' : ''}`}
                  onClick={() => setSelected('events')}
               >
                  Events
                  {selected === 'events' && (
                     <motion.div
                        className="absolute bottom-0 left-0 right-0 h-1 bg-header-hover rounded"
                        layoutId="underline"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                     />
                  )}
               </Link>
               <Link
                  href="/suppliers"
                  className={`relative hover:text-header-hover ${selected === 'suppliers' ? '' : ''}`}
                  onClick={() => setSelected('suppliers')}
               >
                  Suppliers
                  {selected === 'suppliers' && (
                     <motion.div
                        className="absolute bottom-0 left-0 right-0 h-1 bg-header-hover rounded"
                        layoutId="underline"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                     />
                  )}
               </Link>
               <Link
                  href="/recipes"
                  className={`relative hover:text-header-hover ${selected === 'recipes' ? '' : ''}`}
                  onClick={() => setSelected('recipes')}
               >
                  Recipes
                  {selected === 'recipes' && (
                     <motion.div
                        className="absolute bottom-0 left-0 right-0 h-1 bg-header-hover rounded"
                        layoutId="underline"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                     />
                  )}
               </Link>
               <Link
                  href="/signin"
                  className="hover:text-header-hover items-center flex gap-2"
                  onClick={() => setSelected('')}
               >
                  <UserRound className="size-5 inline-block self-center" />
                  Enter or Register
               </Link>
            </nav>
         </div>
      </header>
   )
}

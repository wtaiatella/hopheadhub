'use client'

import Image from 'next/image'
import Link from 'next/link'
import { UserRound } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import HeaderLink from './headerLink'
import UserMenu from './userMenu'

export default function Header() {
   const [selected, setSelected] = useState('')

   return (
      <header className="fixed top-0 right-0 left-0 w-full z-10 bg-header-background">
         <div className="container mx-auto px-4 ">
            <nav className="flex align-center justify-between text-2xl items-center">
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
               <HeaderLink
                  href="/events"
                  className=""
                  isSelected={selected === 'events'}
                  onClick={() => setSelected('events')}
               >
                  Events
               </HeaderLink>
               <HeaderLink
                  href="/suppliers"
                  className=""
                  isSelected={selected === 'suppliers'}
                  onClick={() => setSelected('suppliers')}
               >
                  Suppliers
               </HeaderLink>
               <HeaderLink
                  href="/recipes"
                  className=""
                  isSelected={selected === 'recipes'}
                  onClick={() => setSelected('recipes')}
               >
                  Recipes
               </HeaderLink>
               <UserMenu />
            </nav>
         </div>
      </header>
   )
}

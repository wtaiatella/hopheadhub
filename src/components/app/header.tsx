'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import HeaderLink from './headerLink'
import UserMenu from './userMenu'
import { Layout } from 'antd'

const { Header } = Layout

export default function AppHeader() {
   const [selected, setSelected] = useState('')

   return (
      <Header
         style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            height: 'fit-content',
         }}
      >
         <div className="container mx-auto">
            <nav className="flex align-center justify-between text-xl items-center">
               <Link href="/" className="my-3" onClick={() => setSelected('')}>
                  <Image
                     src="/assets/logo-yellow.png"
                     className="2sm:h-20 2sm:w-28 h-16 w-24 cursor-pointer"
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
      </Header>
   )
}

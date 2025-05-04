'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { UserRound, LogOut, User, Calendar } from 'lucide-react'
import { Dropdown, Avatar } from 'antd'
import type { MenuProps } from 'antd'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'next/navigation'

export default function UserMenu() {
   const { user, fetchCurrentUser, signout } = useUserStore()
   const router = useRouter()

   useEffect(() => {
      fetchCurrentUser()
   }, [fetchCurrentUser])

   const handleSignout = async () => {
      const result = await signout()
      if (result.success) {
         router.push('/')
      }
   }

   const menuItems: MenuProps['items'] = [
      {
         key: 'account',
         label: 'My Account',
         icon: <User size={16} />,
         onClick: () => router.push('/user/account'),
      },
      {
         key: 'create-event',
         label: 'Create an Event',
         icon: <Calendar size={16} />,
         onClick: () => router.push('/events/create'),
      },
      {
         type: 'divider',
      },
      {
         key: 'signout',
         label: 'Sign out',
         icon: <LogOut size={16} />,
         onClick: handleSignout,
      },
   ]

   if (!user) {
      return (
         <Link
            href="/signin"
            className="text-header-text hover:text-header-hover items-center flex gap-2"
         >
            <UserRound className="size-5 inline-block self-center" />
            Enter
         </Link>
      )
   }

   return (
      <Dropdown
         menu={{ items: menuItems }}
         trigger={['click']}
         placement="bottomRight"
         arrow={{ pointAtCenter: true }}
      >
         <div className="flex items-center gap-2 cursor-pointer text-header-text hover:text-header-hover">
            {user.profileImage ? (
               <Avatar src={user.profileImage} size="small" />
            ) : (
               <Avatar icon={<UserRound className="size-7" />} size="small" />
            )}
            <span>{user.nickname}</span>
         </div>
      </Dropdown>
   )
}

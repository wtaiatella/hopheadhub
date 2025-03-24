'use client'

import React, { useState } from 'react'
import { Layout, Menu, Button } from 'antd'
import {
   UserOutlined,
   ContactsOutlined,
   CalendarOutlined,
   BookOutlined,
   MenuFoldOutlined,
   MenuUnfoldOutlined,
} from '@ant-design/icons'
import { usePathname, useRouter } from 'next/navigation'

const { Sider, Content } = Layout

export default function UserLayout({ children }: { children: React.ReactNode }) {
   const [collapsed, setCollapsed] = useState(false)
   const pathname = usePathname()
   const router = useRouter()

   const menuItems = [
      {
         key: '/user/account',
         icon: <UserOutlined />,
         label: 'Account Info',
      },
      {
         key: '/user/contact',
         icon: <ContactsOutlined />,
         label: 'Contact Settings',
      },
      {
         key: '/user/events',
         icon: <CalendarOutlined />,
         label: 'My Events',
      },
      {
         key: '/user/bookings',
         icon: <BookOutlined />,
         label: 'My Bookings',
      },
   ]

   const toggleCollapsed = () => {
      setCollapsed(!collapsed)
   }

   const handleMenuClick = (key: string) => {
      router.push(key)
   }

   return (
      <Layout className="min-h-screen bg-white mt-header">
         <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={setCollapsed}
            trigger={null}
            theme="light"
            width={250}
            className="border-r border-gray-200"
         >
            <div className="p-4 flex items-center justify-between border-b border-gray-200">
               <h2 className={`text-lg font-semibold ${collapsed ? 'hidden' : 'block'}`}>
                  Account Settings
               </h2>
               <Button
                  type="text"
                  icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                  onClick={toggleCollapsed}
               />
            </div>
            <Menu
               mode="inline"
               selectedKeys={[pathname]}
               className="border-r-0"
               items={menuItems}
               onClick={({ key }) => handleMenuClick(key as string)}
            />
         </Sider>
         <Content className="p-6 bg-gray-50">{children}</Content>
      </Layout>
   )
}

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
         label: 'Personal Info',
      },
      {
         key: '/user/contact',
         icon: <ContactsOutlined />,
         label: 'Contact Info',
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
      <Layout className="container mx-auto">
         <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={setCollapsed}
            trigger={null}
            width={250}
            style={{
               backgroundColor: 'transparent',
            }}
            className="sticky my-6"
         >
            <div className="p-4 flex items-center justify-between bg-transparent">
               <p className={`text-xl font-semibold ${collapsed ? 'hidden' : 'block'}`}>
                  My Account
               </p>
               <Button
                  type="text"
                  icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                  onClick={toggleCollapsed}
               />
            </div>
            <Menu
               mode="inline"
               selectedKeys={[pathname]}
               className="rounded-lg user-layout"
               items={menuItems}
               onClick={({ key }) => handleMenuClick(key as string)}
            />
         </Sider>
         <Content className="pl-6">{children}</Content>
      </Layout>
   )
}

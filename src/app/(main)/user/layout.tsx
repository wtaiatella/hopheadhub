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
      <Layout className="container mx-auto">
         <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={setCollapsed}
            trigger={null}
            width={250}
            style={{
               backgroundColor: 'var(--primary-foreground)',
            }}
            className="border-r-2 border-secondary rounded-sm sticky my-6"
         >
            <div className="p-4 flex items-center justify-between bg-primary-foreground bg-opacity-70 backdrop-blur-sm">
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
               className=" bg-transparent backdrop-blur-sm"
               items={menuItems}
               onClick={({ key }) => handleMenuClick(key as string)}
            />
         </Sider>
         <Content className="p-6 bg-transparent">{children}</Content>
      </Layout>
   )
}

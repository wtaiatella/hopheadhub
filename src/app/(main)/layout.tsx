'use client'
import AppFooter from '@/components/app/footer'
import AppHeader from '@/components/app/header'
import { Layout } from 'antd'

const { Header, Footer, Content } = Layout

export default function mainLayout({ children }: { children: React.ReactNode }) {
   return (
      <Layout>
         <AppHeader />
         <Content>{children}</Content>
         <Footer>
            <AppFooter />
         </Footer>
      </Layout>
   )
}

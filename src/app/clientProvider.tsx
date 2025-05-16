'use client'

import { ConfigProvider, App } from 'antd'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import '@ant-design/v5-patch-for-react-19'
import useAppStore from '@/stores/appStore'
import React from 'react'

export default function ClientProvider({ children }: { readonly children: React.ReactNode }) {
   const theme = useAppStore(state => state.theme)

   return (
      <ConfigProvider theme={theme}>
         <AntdRegistry>
            <App>{children}</App>
         </AntdRegistry>
      </ConfigProvider>
   )
}

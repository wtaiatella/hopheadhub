'use client'

import { AntdRegistry } from '@ant-design/nextjs-registry'
import '@ant-design/v5-patch-for-react-19'
import { App } from 'antd'
import React from 'react'

export default function ClientProvider({ children }: { readonly children: React.ReactNode }) {
  return (
    <AntdRegistry>
      <App>{children}</App>
    </AntdRegistry>
  )
}

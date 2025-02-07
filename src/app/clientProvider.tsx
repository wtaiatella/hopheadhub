'use client';

import React from 'react';
import { ConfigProvider } from 'antd';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import themeConfig from '@/theme/themeConfig';

export default function ClientProvider({ children }: { children: React.ReactNode }) {
    return (
        <ConfigProvider theme={themeConfig}>
            <AntdRegistry>{children}</AntdRegistry>
        </ConfigProvider>
    );
}

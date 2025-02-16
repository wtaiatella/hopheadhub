'use client';

import { ConfigProvider } from 'antd';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import '@ant-design/v5-patch-for-react-19';
import useAppStore from '@/stores/appStore';
import "./globals.css";

export default function ClientProvider({ children }: { readonly children: React.ReactNode }) {

    const theme = useAppStore((state) => state.theme);


    return (
        <ConfigProvider theme={{
          ...theme,
          token: {
            fontFamily: 'var(--font-sans)',
            fontFamilyCode: 'var(--font-mono)'
          }
        }}>
            <AntdRegistry>{children}</AntdRegistry>
        </ConfigProvider>
    );
}

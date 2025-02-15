'use client';

import React from 'react';
import { Button, Switch } from 'antd';
import { MoonIcon, SunIcon } from 'lucide-react';
import useAppStore from '@/stores/appStore';

const ThemeToggle = () => {
    const isDarkMode = useAppStore((state) => state.isDarkMode);
    const toggleDarkMode = useAppStore((state) => state.toggleDarkMode);

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {isDarkMode ? <MoonIcon /> : <SunIcon />}
            <Switch
                checked={isDarkMode}
                onChange={toggleDarkMode}
                checkedChildren="Dark"
                unCheckedChildren="Light"
            />
            <Button type="primary" onClick={toggleDarkMode}>Toggle</Button>
        </div>
    );
};

export default ThemeToggle;

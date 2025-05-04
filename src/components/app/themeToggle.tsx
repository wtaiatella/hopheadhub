'use client';

import React, { useEffect } from 'react';
import { Button, Switch } from 'antd';
import { MoonIcon, SunIcon } from 'lucide-react';
import useAppStore from '@/stores/appStore';

const ThemeToggle = () => {
    const isDarkMode = useAppStore((state) => state.isDarkMode);
    const toggleDarkMode = useAppStore((state) => state.toggleDarkMode);

    useEffect(() => {
        // Update the document class when theme changes
        document.documentElement.classList.toggle('dark', isDarkMode);
    }, [isDarkMode]);

    return (
        <div className="flex items-center gap-2">
            {isDarkMode ? 
                <MoonIcon className="w-5 h-5" /> : 
                <SunIcon className="w-5 h-5" />
            }
            <Switch
                checked={isDarkMode}
                onChange={toggleDarkMode}
                checkedChildren="Dark"
                unCheckedChildren="Light"
            />
            <Button type="primary" onClick={toggleDarkMode}>Toggle</Button>
        </div>
    );
}

export default ThemeToggle;

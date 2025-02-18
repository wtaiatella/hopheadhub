/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from 'zustand';
import type { ThemeConfig } from 'antd';
import { theme } from "antd";

type AppState = {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    theme: ThemeConfig;
};

const bole100 = '#170d0a';
const bole200 = '#2d1a14';
const bole300 = '#44271e';
const bole400 = '#553025';
const bole500 = '#704031';
const bole600 = '#8E513E';
const bole700 = '#BB7763';
const bole800 = '#D3A99C';
const bole850 = '#ECDAD4';
const bole900 = '#F9F3F1';
const satinGold100 = '#231C06';
const satinGold200 = '#57450F';
const satinGold300 = '#8B6E18';
const satinGold400 = '#AD8A1F';
const satinGold500 = '#d0a525';
const satinGold600 = '#E0BD52';
const satinGold700 = '#EAD186';
const satinGold800 = '#F3E4BA';
const satinGold900 = '#FCF8EE'; 
const jet100 = '#09090a';
const jet200 = '#131314';
const jet300 = '#1c1c1e';
const jet400 = '#262628';
const jet500 = '#2f2f31';
const jet600 = '#58585c';
const jet700 = '#818186';
const jet800 = '#ababae';
const jet900 = '#d5d5d7';

const lightTheme: ThemeConfig = {
    algorithm: theme.defaultAlgorithm,
    token: {
        colorPrimary: bole500,
        fontFamily: 'var(--font-sans)',
        fontFamilyCode: 'var(--font-mono)'
    },
};

const darkTheme: ThemeConfig = {
    algorithm: theme.darkAlgorithm,
    token: {
        colorPrimary: satinGold600,
        fontFamily: 'var(--font-sans)',
        fontFamilyCode: 'var(--font-mono)'
    },
};

const useAppStore = create<AppState>((set) => ({
    isDarkMode: false,
    theme: lightTheme,
    toggleDarkMode: () => {
        set((state) => {
            const isDarkMode = !state.isDarkMode;
            document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
            return {
                isDarkMode: isDarkMode,
                theme: isDarkMode ? darkTheme : lightTheme,
            };
        });
    },
}));

if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', useAppStore.getState().isDarkMode ? 'dark' : 'light');
}

export default useAppStore;

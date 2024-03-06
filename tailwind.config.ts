import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            letterSpacing: {
                titleForm: '0.64px',
                titleFormTablet: '1.28px',
                titleLogo: '0.36px',
                textButton: '0.28px',
                textForm: '-0.24px',
                textFormTablet: '-0.28px',
            },
            colors: {
                lightBlack: '#141414',
                darkGrey: '#1F1F1F',
                mediumGrey: '#262626',
                grey: '#e3e3e34d',
                fogGrey: 'rgba(249, 249, 249, 0.20)',
                fogGreyHover: 'rgba(249, 249, 249, 0.1)',
                liteGrey: 'rgba(104, 104, 104, 0.20)',
                lightGrey: '#686868',
                fogWhite: '#F9F9F9',
                fogWhiteHover: 'rgba(249, 249, 249, 0.10)',
                lightGreen: '#30B94D',
                blue: '#4F92F7',
                red: '#E90516',
            },
        },
    },
    plugins: [],
};
export default config;

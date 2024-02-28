import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './globals.css';
const gilroy = localFont({
    src: [
        {
            path: '../../public/assets/fonts/Gilroy-Bold.ttf',
            weight: '700',
            style: 'normal',
        },
        {
            path: '../../public/assets/fonts/Gilroy-Medium.ttf',
            weight: '500',
            style: 'normal',
        },
    ],
});

export const metadata: Metadata = {
    title: 'Read Journey',
    description: 'Library Read Journey',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${gilroy.className} mx-auto max-w-7xl p-5 md:p-8`}
            >
                {children}
                <div id="modal-portal"></div>
                <ToastContainer autoClose={5000} theme="dark" />
            </body>
        </html>
    );
}

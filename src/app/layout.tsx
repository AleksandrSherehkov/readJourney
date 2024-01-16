import type { Metadata } from 'next';
import localFont from 'next/font/local';

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${gilroy.className} max-w-7xl mx-auto p-5 md:p-8`}>{children}</body>
    </html>
  );
}

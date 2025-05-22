import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { Footer, Header } from '@/shared/layout';

import './globals.css';

const pretendard = localFont({
  src: '../../public/fonts/pretendard/PretendardVariable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-pretendard',
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Nook',
  description: 'Nook',
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={`${pretendard.variable} flex min-h-screen flex-col antialiased`}>
        <Header />
        <main className='px-xl max-w-contents mx-auto min-h-screen w-full flex-1 pt-[80px] pb-[200px]'>
          {children}
        </main>
        <Footer />
        <div id='portal-root' />
      </body>
    </html>
  );
}

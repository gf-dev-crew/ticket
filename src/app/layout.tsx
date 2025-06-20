import type { Metadata } from 'next';

import { getAllFontVariables } from '@/shared/config';
import { Footer, Header } from '@/shared/layout';

import './globals.css';
import { Providers } from './providers';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'PlayDrop',
  description: 'Description',
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
      <body className={`${getAllFontVariables()} flex min-h-screen flex-col antialiased`}>
        <Providers>
          <Header />
          <main className='px-4xl mx-auto min-h-screen w-full flex-1 pt-[180px] pb-[200px]'>
            {children}
          </main>
          <Footer />
          <div id='portal-root' />
        </Providers>
      </body>
    </html>
  );
}

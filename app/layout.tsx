import '@mantine/core/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { Noto_Sans_JP } from 'next/font/google';
import { theme } from '../theme';
import './globals.css';

import { Header } from '../components/Nav/Header';
import { FooterLinks } from '../components/Footer/FooterLinks';

export const notojp = Noto_Sans_JP({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'VOCALOID CLUB COLLECTION 2024',
  description: 'Vコレ特設Webサイト',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="ja">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.png" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        {/* インデックスさせない */}
        <meta name="robots" content="noindex" />
      </head>
      <body className={notojp.className}>
        <MantineProvider theme={theme}>
          <Header />
          {children}
          <FooterLinks />
        </MantineProvider>
      </body>
    </html>
  );
}

import '@mantine/core/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { theme } from '../theme';
import './globals.css';

import { Header } from '../components/Nav/Header';
import { FooterLinks } from '../components/Footer/FooterLinks';

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap" rel="stylesheet" />
        <SpeedInsights />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <Header />
          {children}
          <FooterLinks />
        </MantineProvider>
      </body>
    </html>
  );
}

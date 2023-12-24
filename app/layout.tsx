import '@mantine/core/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { theme } from '@/theme';
import './globals.css';
import '@mantine/notifications/styles.css';
import ogpImage from '@/public/opengraph-image.png';

import { Header } from '@/components/Nav/Header';
import { FooterLinks } from '@/components/Footer/FooterLinks';

const title = 'VOCALOID CLUB COLLECTION 2024';
const siteName = 'VOCALOID CLUB COLLECTION';
const description = 'Vコレ特設Webサイト';
const url = 'https://v-collection.vocakentdu.com/';

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url,
    siteName,
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        type: 'image/png',
        url: ogpImage.src,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    site: '@vocaken_tdu',
    creator: '@vocaken_tdu',
  },
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="ja">
      <head>
        <ColorSchemeScript />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        {/* OGP */}

        {/* インデックスさせない */}
        <meta name="robots" content="noindex" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <SpeedInsights />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <Header />
          <Notifications position="top-right" autoClose={6000} />
          {children}
          <FooterLinks />
        </MantineProvider>
      </body>
    </html>
  );
}

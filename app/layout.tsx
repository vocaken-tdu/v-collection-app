import '@mantine/core/styles.css';
import { Metadata } from 'next';
import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { SpeedInsights } from '@vercel/speed-insights/next';
import NextTopLoader from 'nextjs-toploader';
import { theme } from '@/theme';
import './globals.css';
import '@mantine/notifications/styles.css';

import { Header } from '@/components/Navigation/Header';
import { FooterLinks } from '@/components/Navigation/FooterLinks';
import { BGParallax } from '@/components/Background/BGParallax';
import { Loading } from '@/components/Loading/Loading';

const title = process.env.SITE_TITLE;
const siteName = process.env.SITE_NAME;
const description = process.env.SITE_DESCRIPTION;
const url = process.env.BASE_URL;

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url,
    siteName,
    locale: 'ja_JP',
    type: 'website',
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
          <NextTopLoader zIndex={1000} showSpinner={false} />
          <Loading />
          <Header />
          <Notifications position="top-right" autoClose={6000} />
          <main>{children}</main>
          <FooterLinks />
          <BGParallax />
        </MantineProvider>
      </body>
    </html>
  );
}

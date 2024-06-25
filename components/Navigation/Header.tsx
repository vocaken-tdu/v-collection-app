'use client';

import React from 'react';
import Link from 'next/link';
import { Container, Group, Burger, Drawer, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Abel } from 'next/font/google';
import { usePathname } from 'next/navigation';
import classes from './Header.module.css';

// ロゴのフォント
export const abel = Abel({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
});

// ヘッダーのリンク
const links = [
  { link: '/about', label: 'Vコレとは' },
  { link: '/howto', label: '使い方' },
  { link: '/archives', label: 'アーカイブ' },
  { link: '/artists', label: '各アーティスト' },
  { link: 'https://www.vocakentdu.com/', label: 'VOCALOID同好会', external: true },
];

export function Header() {
  // バーガーメニューの状態を管理
  const [opened, { open, close }] = useDisclosure(false);

  // パスを取得してアクティブなリンクを判定
  const pathname = usePathname();
  const active = pathname;

  // リンクを生成
  const items = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      target={link.external ? '_blank' : undefined}
      rel={link.external ? 'noopener noreferrer' : undefined}
      onClick={close}
    >
      {link.label}
    </Link>
  ));

  return (
    <header className={`light-shadow ${classes.header}`}>
      <Container size="xl" className={classes.inner}>
        <Link href="/" className={`${abel.className} text-2xl`}>
          <h1>VOCALOID CLUB COLLECTION</h1>
        </Link>

        <Group gap={5} visibleFrom="sm">
          {items}
        </Group>

        <Burger opened={opened} onClick={open} hiddenFrom="sm" size="sm" />
        <Drawer
          opened={opened}
          onClose={close}
          position="right"
          size="xs"
          title={
            <Text
              size="xl"
              style={{
                fontWeight: 'bold',
                color: '#555577',
                paddingLeft: '8px',
              }}
            >
              Menu
            </Text>
          }
          className={classes.burger}
          transitionProps={{ transition: 'slide-left', duration: 200, timingFunction: 'ease-out' }}
          closeButtonProps={{ size: 'lg' }}
        >
          {items}
        </Drawer>
      </Container>
    </header>
  );
}

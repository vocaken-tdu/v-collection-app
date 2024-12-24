'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Container, Group, Burger, Drawer, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Abel } from 'next/font/google';
import classes from './Header.module.css';

// ロゴのフォント
const abel = Abel({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
});

// ヘッダーのリンク
const links = [
  { link: '/about', label: 'Vコレとは' },
  { link: '/howto', label: '使い方' },
  { link: '/archives', label: 'アーカイブ' },
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
      key={link.link}
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
    <header>
      <Container px="xl" size="1400px" className={`${classes.inner} light-shadow`}>
        <Link href="/" className={`${abel.className} ${classes.h1}`}>
          <h1>VOCALOID CLUB COLLECTION</h1>
        </Link>

        <Group gap={4} visibleFrom="sm">
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

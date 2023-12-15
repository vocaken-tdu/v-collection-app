'use client';

import React from 'react';
import { Container, Group, Burger, Drawer, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Abel } from 'next/font/google';
import { usePathname } from 'next/navigation';
import classes from './Header.module.css';

export const abel = Abel({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
});

const links = [
  { link: '/about', label: 'Vコレとは' },
  { link: '/artists', label: '各アーティスト' },
  { link: '/terms', label: '利用規約' },
  { link: 'https://www.vocakentdu.com/', label: 'VOCALOID同好会' },
];

export function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  const pathname = usePathname();
  const active = pathname;

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
    >
      {link.label}
    </a>
  ));

  return (
    <header className={classes.header}>
      <Container size="xl" className={classes.inner}>
        <a href="/" className={`${abel.className} text-2xl`}>
          <h1>VOCALOID CLUB COLLECTION</h1>
        </a>

        <Group gap={5} visibleFrom="sm">
          {items}
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Drawer opened={opened} onClose={toggle} position="right" className={classes.burger}>
          <Text style={{ fontSize: 23, fontWeight: '500', height: 50 }}>Menu</Text>
          {items}
        </Drawer>
      </Container>
    </header>
  );
}

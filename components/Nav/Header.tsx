'use client';

import { useState } from 'react';
import { Container, Group, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Abel } from 'next/font/google';
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
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
      }}
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

        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}

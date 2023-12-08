'use client';

import { Text, Container, ActionIcon, Group, rem } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube} from '@tabler/icons-react';
import classes from './FooterLinks.module.css';

const data = [
  {
    title: 'About',
    links: [
      { label: 'Features', link: '#' },
      { label: 'Pricing', link: '#' },
      { label: 'Support', link: '#' },
      { label: 'Forums', link: '#' },
    ],
  },
  {
    title: 'Project',
    links: [
      { label: 'Contribute', link: '#' },
      { label: 'Media assets', link: '#' },
      { label: 'Changelog', link: '#' },
      { label: 'Releases', link: '#' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Join Discord', link: '#' },
      { label: 'Follow on Twitter', link: '#' },
      { label: 'Email newsletter', link: '#' },
      { label: 'GitHub discussions', link: '#' },
    ],
  },
];

{/*呼び出されたら出力する場所*/}
export function FooterLinks() {
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text<'a'>
        key={index}
        className={classes.link}
        component="a"
        href={link.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    {/*謎の線から上の場所（表示領域）*/},
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
            以前のVコレ
        </div>
      </Container>
      
      {/*謎の線から下の部分*/}
      <Container className={classes.afterFooter}>
      <div className={classes.test1}>
          <Text c="dark" style={{fontSize:23, fontWeight:'500'}}>
            東京電機大学
          </Text>
          <Text c="dark" style={{fontSize:30, fontWeight:'500'}}>
            VOCALOID同好会
          </Text>
        </div>
        {/*アイコン関係の場所*/}
        <div>
          <Text>Share</Text>
          <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
            <ActionIcon size="lg" color="dark" variant="subtle">
              <IconBrandTwitter style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ActionIcon>
            <ActionIcon size="lg" color="dark" variant="subtle">
              <IconBrandYoutube style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ActionIcon>
          </Group>
        </div>
        <div>
          <Text>Follow Us</Text>
          <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
            <ActionIcon size="lg" color="dark" variant="subtle">
              <IconBrandTwitter style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ActionIcon>
          </Group>
        </div>
        <div className={classes.right}>
          <Text c="dark"style={{fontSize:14, lineHeight:5}}>
            「VOCALOID（ボーカロイド）」および「ボカロ」はヤマハ株式会社の登録商標です。<br />
            © 2023 VOCALOID CLUB COLLECTION.
          </Text>
        </div>
      </Container>
    </footer>
  );
}

'use client';

import Link from 'next/link';
import { Text, Container, ActionIcon, Group, Button, rem } from '@mantine/core';
import { IconBrandTwitterFilled, IconArrowBack, IconGraph } from '@tabler/icons-react';
import classes from './FooterLinks.module.css';

const url = process.env.NEXT_PUBLIC_BASE_URL;
const statusUrl = process.env.NEXT_PUBLIC_STATUS_URL;
const text = 'Vコレを一緒に盛り上げよう！';

//呼び出されたら出力する場所
export function FooterLinks() {
  return (
    <div className={classes.footerWrap}>
      <footer className={classes.footer}>
        <Container size="xl">
          <Link href="https://akatukime.wixsite.com/collection/" target="_blank">
            <Button
              variant="filled"
              rightSection={
                <IconArrowBack style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
              }
              radius="xl"
              size="lg"
              styles={{
                root: { paddingRight: rem(14), height: rem(48) },
                section: { marginLeft: rem(22) },
              }}
            >
              以前のVコレ
            </Button>
          </Link>
        </Container>

        <Container className={classes.afterFooter} size="xl">
          <Group gap={32} justify="flex-start">
            <div className={classes.tdu}>
              <Text c="dark" style={{ fontSize: 23, fontWeight: '500' }}>
                東京電機大学
              </Text>
              <Text c="dark" style={{ fontSize: 30, fontWeight: '500' }}>
                VOCALOID同好会
              </Text>
            </div>

            {/*アイコン関係の場所*/}

            <Group gap={28} wrap="nowrap" className={classes.icons}>
              <div>
                <Text style={{ fontSize: 23 }}>Share</Text>
                <Group gap={8} className={classes.social} wrap="nowrap" justify="flex-start">
                  <ActionIcon size="lg" color="dark" variant="subtle">
                    <Link
                      href={`https://twitter.com/share?url=${url}&text=${text}`}
                      className={classes.icon}
                      target="_blank"
                    >
                      <IconBrandTwitterFilled style={{ width: 20, height: 20 }} stroke={1.5} />
                    </Link>
                  </ActionIcon>
                </Group>
              </div>

              <div>
                <Text style={{ fontSize: 23 }}>Follow us</Text>
                <Group gap={8} className={classes.social} wrap="nowrap" justify="flex-start">
                  <ActionIcon size="lg" color="brack" variant="subtle">
                    <Link
                      href="https://twitter.com/vocaken_tdu"
                      className={classes.icon}
                      target="_blank"
                    >
                      <IconBrandTwitterFilled style={{ width: 20, height: 20 }} stroke={1.5} />
                    </Link>
                  </ActionIcon>
                </Group>
              </div>
            </Group>
          </Group>

          <div className={classes.right}>
            <Text c="dark" className={classes.copyright} style={{ fontSize: 14 }}>
              「VOCALOID（ボーカロイド）」ならびに
              <br className={classes.spBr} />
              「ボカロ」はヤマハ株式会社の登録商標です。
            </Text>
            <Text c="dark" className={classes.copyright} mt={8} style={{ fontSize: 14 }}>
              © 2023 VOCALOID CLUB COLLECTION.&nbsp;
              <br className={classes.spBr} />
              複製・転載等を固く禁じます。
            </Text>
            <Text c="dark" className={classes.copyright} mt={8}>
              <Link href={statusUrl || '/404/'} target="_blank">
                <Button
                  c="dark"
                  style={{ fontSize: 14 }}
                  className={classes.anchor}
                  variant="transparent"
                  size="compact-md"
                >
                  <IconGraph />
                  サービス稼働状況
                </Button>
              </Link>
            </Text>
          </div>
        </Container>
      </footer>
    </div>
  );
}

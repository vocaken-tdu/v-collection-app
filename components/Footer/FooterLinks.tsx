'use client';

import { Text, Container, ActionIcon, Group, Button, rem } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconArrowBack } from '@tabler/icons-react';
import classes from './FooterLinks.module.css';

//呼び出されたら出力する場所
export function FooterLinks() {
  return (
    <div className={classes.footerWrap}>
      <footer className={classes.footer}>
        <Container className={classes.inner} size="lx">
          <Button
            component="a"
            href="/"
            variant="filled"
            rightSection={
              <IconArrowBack style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
            }
            radius="xl"
            size="xl"
            className={classes.logo}
            styles={{
              root: { paddingRight: rem(14), height: rem(48) },
              section: { marginLeft: rem(22) },
            }}
          >
            以前のVコレ
          </Button>
        </Container>

        <Container className={classes.afterFooter} size="lx">
          <div className={classes.test1}>
            <Text c="dark" style={{ fontSize: 23, fontWeight: '500' }}>
              東京電機大学
            </Text>
            <Text c="dark" style={{ fontSize: 30, fontWeight: '500' }}>
              VOCALOID同好会
            </Text>
          </div>

          {/*アイコン関係の場所*/}
          <section>
            <div className={classes.test2}>
              <Text style={{ fontSize: 23 }}>Share</Text>

              <Group gap={0} className={classes.social} wrap="nowrap" justify="space-between">
                <ActionIcon size="lg" color="dark" variant="subtle">
                  <a href="" className={classes.icon}>
                    <IconBrandTwitter style={{ width: 20, height: 20 }} stroke={1.5} />
                  </a>
                </ActionIcon>

                <ActionIcon size="lg" color="dark" variant="subtle">
                  <a href="https://www.nicovideo.jp/watch/sm39776265" className={classes.icon}>
                    <IconBrandYoutube style={{ width: 20, height: 20 }} stroke={1.5} />
                  </a>
                </ActionIcon>
              </Group>
            </div>

            <div className={classes.test2}>
              <Text style={{ fontSize: 23 }}>Follow us</Text>
              <Group gap={0} className={classes.social} justify="left" wrap="nowrap">
                <ActionIcon size="lg" color="brack" variant="subtle">
                  <a
                    href="https://pbs.twimg.com/profile_images/1509818267812364288/Y1EMCVdD_400x400.jpg"
                    className={classes.icon}
                  >
                    <IconBrandTwitter style={{ width: 20, height: 20 }} stroke={1.5} />
                  </a>
                </ActionIcon>
              </Group>
            </div>
          </section>

          <div className={classes.right}>
            <Text c="dark" style={{ fontSize: 14 }}>
              「VOCALOID（ボーカロイド）」ならびに
              <br />
              「ボカロ」はヤマハ株式会社の登録商標です。
              <br />
              <br />
              © 2023 VOCALOID CLUB COLLECTION.
              <br />
              複製・転載等を固く禁じます
            </Text>
          </div>
        </Container>
      </footer>
    </div>
  );
}

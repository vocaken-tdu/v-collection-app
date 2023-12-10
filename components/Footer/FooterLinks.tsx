'use client';

import { Text, Container, ActionIcon, Group } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube } from '@tabler/icons-react';
import classes from './FooterLinks.module.css';

//呼び出されたら出力する場所
export function FooterLinks() {
  return (
    <footer className={classes.footer}>
      {/*謎の線から上の場所（表示領域）*/}
      <Container className={classes.inner} size="lx">
        <div className={classes.logo}>以前のVコレ</div>
      </Container>

      {/*謎の線から下の部分*/}
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
            「VOCALOID（ボーカロイド）」ならびに「ボカロ」はヤマハ株式会社の登録商標です。
            <br />
            <br />© 2023 VOCALOID CLUB COLLECTION.
          </Text>
        </div>
      </Container>
    </footer>
  );
}

'use client';

import { Text, Container, ActionIcon, Group, Button, rem } from '@mantine/core';
import { IconBrandTwitterFilled, IconArrowBack } from '@tabler/icons-react';
import classes from './FooterLinks.module.css';

//呼び出されたら出力する場所
export function FooterLinks() {
  return (
    <div className={classes.footerWrap}>
      <footer className={classes.footer}>
        <Container size="xl">
          <Button
            component="a"
            href="https://akatukime.wixsite.com/collection/"
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
                    <a
                      href="https://twitter.com/share?ref_src=twsrc%5Etfw"
                      className={classes.icon}
                    >
                      <IconBrandTwitterFilled style={{ width: 20, height: 20 }} stroke={1.5} />
                    </a>
                  </ActionIcon>
                </Group>
              </div>

              <div>
                <Text style={{ fontSize: 23 }}>Follow us</Text>
                <Group gap={8} className={classes.social} wrap="nowrap" justify="flex-start">
                  <ActionIcon size="lg" color="brack" variant="subtle">
                    <a href="https://twitter.com/vocaken_tdu" className={classes.icon}>
                      <IconBrandTwitterFilled style={{ width: 20, height: 20 }} stroke={1.5} />
                    </a>
                  </ActionIcon>
                </Group>
              </div>
            </Group>
          </Group>

          <div className={classes.right}>
            <Text c="dark" style={{ fontSize: 14 }} className={classes.copyright}>
              「VOCALOID（ボーカロイド）」ならびに
              <br className={classes.tbBr} />
              「ボカロ」はヤマハ株式会社の登録商標です。
              <br className={classes.tbBr} />
              <br />
              © 2023 VOCALOID CLUB COLLECTION.
              <br className={classes.spBr} />
              複製・転載等を固く禁じます
            </Text>
          </div>
        </Container>
      </footer>
    </div>
  );
}

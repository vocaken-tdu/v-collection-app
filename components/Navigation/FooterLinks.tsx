import Link from 'next/link';
import { Text, Container, ActionIcon, Group, Button } from '@mantine/core';
import {
  IconBrandTwitterFilled,
  IconArrowBack,
  IconPencilHeart,
  IconGraph,
  IconBrandGithub,
} from '@tabler/icons-react';
import classes from './FooterLinks.module.css';

const url = process.env.BASE_URL;
const statusUrl = process.env.STATUS_URL;
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
              rightSection={<IconArrowBack style={{ width: 24, height: 24 }} stroke={1.5} />}
              bg="themeColor.7"
              radius="xl"
              size="lg"
              className={classes.button}
              styles={{
                root: { paddingRight: 16, height: 48 },
                section: { marginLeft: 16 },
              }}
            >
              旧Vコレサイト
            </Button>
          </Link>
        </Container>

        <Container className={classes.afterFooter} size="xl">
          <Group gap={32} justify="flex-start">
            <div className={classes.tdu}>
              <Text c="dark" style={{ fontSize: 24, fontWeight: '500' }}>
                東京電機大学
              </Text>
              <Text c="dark" style={{ fontSize: 32, fontWeight: '500' }}>
                VOCALOID同好会
              </Text>
            </div>

            {/*アイコン関係の場所*/}

            <Group gap={32} wrap="nowrap" className={classes.icons}>
              <div>
                <Text style={{ fontSize: 24 }}>Share</Text>
                <Group gap={8} className={classes.social} wrap="nowrap" justify="flex-start">
                  <ActionIcon size="xl" color="dark" variant="subtle">
                    <Link
                      href={`https://twitter.com/share?url=${url}&text=${text}`}
                      className={classes.icon}
                      target="_blank"
                    >
                      <IconBrandTwitterFilled
                        style={{ width: '75%', height: '75%' }}
                        stroke={1.5}
                      />
                    </Link>
                  </ActionIcon>
                </Group>
              </div>

              <div>
                <Text style={{ fontSize: 24 }}>Follow us</Text>
                <Group gap={8} className={classes.social} wrap="nowrap" justify="flex-start">
                  <ActionIcon size="xl" color="dark" variant="subtle">
                    <Link
                      href="https://twitter.com/vocaken_tdu"
                      className={classes.icon}
                      target="_blank"
                    >
                      <IconBrandTwitterFilled
                        style={{ width: '75%', height: '75%' }}
                        stroke={1.5}
                      />
                    </Link>
                  </ActionIcon>
                </Group>
              </div>
            </Group>
          </Group>

          <div className={classes.right}>
            <Text c="dark" className={classes.copyright} style={{ fontSize: 16 }}>
              「VOCALOID(ボーカロイド)」および
              <br className={classes.spBr} />
              「ボカロ」はヤマハ株式会社の登録商標です。
            </Text>
            <Text c="dark" className={classes.copyright} mt={8} style={{ fontSize: 16 }}>
              © 2023 VOCALOID CLUB COLLECTION.&nbsp;
              <br className={classes.spBr} />
              複製・転載等を固く禁じます。
            </Text>
            <Text c="dark" className={classes.copyright} mt={8}>
              <Link href="/credit/">
                <Button
                  c="dark"
                  style={{ fontSize: 16 }}
                  className={classes.anchor}
                  variant="transparent"
                  size="compact-md"
                >
                  <IconPencilHeart />
                  Credit
                </Button>
              </Link>
              <Link href="https://github.com/vocaken-tdu/v-collection-app" target="_blank">
                <Button
                  c="dark"
                  style={{ fontSize: 16 }}
                  className={classes.anchor}
                  variant="transparent"
                  size="compact-md"
                >
                  <IconBrandGithub />
                  GitHub
                </Button>
              </Link>
              <Link href={statusUrl || '/404/'} target="_blank">
                <Button
                  c="dark"
                  style={{ fontSize: 16 }}
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

'use client';

import Image from 'next/image';
import { Textarea, Button, Group, Paper, TextInput, Text, Progress } from '@mantine/core';
import { useForm } from '@mantine/form';
import classes from './CommentForm.module.css';
import { useComment, setComment } from '../../store/commentFormStore';
import { useMyName } from '../../store/userNameStore';
import sendIcon from '@/public/send.svg';

export function CommentForm({ illustId }: { illustId: number }) {
  // コメントフォームの状態を管理
  const form = useForm({
    initialValues: {
      // 入力したことがあれば名前と送信できなかったコメントを復元
      name: useMyName((state) => state.name),
      comment: useComment((state) => state.comment),
    },
    validate: {
      // 条件に合わない場合はエラーを表示
      name: (val) =>
        val.length < 1
          ? '1文字以上入力してください'
          : val.length > 16
            ? '16文字以内で入力してください'
            : undefined,
      comment: (val) =>
        val.length < 2
          ? '2文字以上入力してください'
          : val.length > 140
            ? '140文字以内で入力してください'
            : undefined,
    },
  });

  // コメントを送信する
  const sendComment = async () => {
    // 送信処理
    setComment(illustId, form.values.name, form.values.comment);
    // 名前を記録
    useMyName.setState({ name: form.values.name });
    // フォームをリセット
    form.setValues({
      comment: '',
    });
  };

  return (
    <Paper px="xl" py="lg" radius="md" className={`light-shadow ${classes.comment}`}>
      <form onSubmit={form.onSubmit(() => sendComment())}>
        <Group className={classes.namearea}>
          <TextInput
            variant="filled"
            label="ハンドルネーム"
            placeholder="ずんだもん (1～16文字)"
            className={classes.name}
            classNames={{ input: classes.input, label: classes.inputLabel }}
            {...form.getInputProps('name')}
          />
          <Button
            type="submit"
            bg="themeColor"
            px={16}
            className={classes.button}
            rightSection={
              <Image
                width={20}
                height={20}
                src={sendIcon.src}
                alt="送信ボタン"
                className={classes.sendIcon}
              />
            }
          >
            コメント送信
          </Button>
        </Group>
        <Textarea
          variant="filled"
          label={
            <Group>
              <div>メッセージ</div>
              <Group justify="space-between" gap={8}>
                <Progress
                  w={100}
                  mt={1}
                  radius="md"
                  value={form.values.comment.length / 1.4} // 140文字を100%として計算
                  color={
                    form.values.comment.length < 130 // 1～129文字 青
                      ? 'blue'
                      : form.values.comment.length < 140 // 130～139文字 黄
                        ? 'yellow'
                        : 'pink' // 140文字以上 ピンク
                  }
                />
                <Text // 130文字を超えたら表示 140文字を超えたらredに
                  size="xs"
                  ta="center"
                  c={form.values.comment.length >= 140 ? 'red' : 'gray'}
                >
                  {form.values.comment.length >= 130 && 140 - form.values.comment.length}
                </Text>
              </Group>
            </Group>
          }
          placeholder="かわいいのだ！ (2～140文字)"
          autosize
          minRows={2}
          maxRows={8}
          mt="xs"
          className={classes.textarea}
          {...form.getInputProps('comment')}
        />
      </form>
    </Paper>
  );
}

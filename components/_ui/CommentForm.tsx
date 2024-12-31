'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { Textarea, Button, Group, Paper, TextInput, Text, Progress } from '@mantine/core';
import { useForm } from '@mantine/form';
import classes from './CommentForm.module.css';
import { createComment } from '@/app/actions';

import { useMyComment } from '@/store/commentFormStore';
import { useMyName } from '@/store/myNameStore';
import { NotifySending, NotifySent, NotifySendFailed } from '@/components/_ui/Notifications';
import sendIcon from '@/public/assets/send-icon.svg';

export function CommentForm({ illustId }: { illustId: string }) {
  const storedMyComment = useMyComment((state) => state.comment);
  const storedMyName = useMyName((state) => state.name);

  // コメントフォームの状態を管理
  const form = useForm({
    initialValues: {
      name: '',
      comment: '',
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
    // 送信中の通知を表示
    NotifySending(form.values.name, form.values.comment);

    // ローカルにコメントを保存
    useMyComment.setState({
      comment: form.values.comment,
    });
    // ローカルに名前を保存
    useMyName.setState({ name: form.values.name });

    // 送信処理
    const response = await createComment(illustId, form.values.name, form.values.comment);

    // エラーがあればアラートを表示
    if (!response) {
      NotifySendFailed();
    } else {
      // 送信完了の通知を表示
      NotifySent(form.values.comment);
      console.log('Comment sent!', response);

      // ローカルデータを削除
      useMyComment.setState({
        comment: '',
      });
    }
  };

  useEffect(() => {
    // 入力したことがあれば名前と送信できなかったコメントを復元
    // ローカルデータの削除時にフォームをリセット
    form.setValues({
      name: storedMyName,
      comment: storedMyComment,
    });
  }, [storedMyComment, storedMyName]);

  return (
    <Paper px="xl" py="lg" radius="md" className={`${classes.comment} light-shadow`}>
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

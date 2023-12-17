import { TextInput, Textarea, Button, Group, Paper } from '@mantine/core';

import classes from './CommentForm.module.css';

export function CommentForm({ illustId }: { illustId: number }) {
  return (
    <Paper withBorder px="xl" py="lg" radius="md" className={classes.comment}>
      <Group className={classes.namearea}>
        <TextInput
          variant="filled"
          label="名前/ハンドルネーム"
          placeholder="名前を入力"
          className={classes.name}
          classNames={{ input: classes.input, label: classes.inputLabel }}
        />
        <Button className={classes.control}>コメントを送る</Button>
      </Group>
      <Textarea
        variant="filled"
        label="メッセージ"
        placeholder="コメントを入力"
        minRows={4}
        mt="xs"
        className={classes.textarea}
      />
    </Paper>
  );
}

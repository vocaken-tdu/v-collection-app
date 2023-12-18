import { Textarea, Button, Group, Paper, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import classes from './CommentForm.module.css';
import { setComment } from '../../store/commentFormStore';

export function CommentForm({ illustId }: { illustId: number }) {
  // コメントフォームの状態を管理
  const form = useForm({
    initialValues: {
      name: '',
      comment: '',
    },
    validate: {
      name: (val) => (val.length > 0 ? undefined : ''),
      comment: (val) => (val.length > 1 ? undefined : ''),
    },
  });

  /* コメントを保存する (未実装)
  useEffect(() => {
    restoreComment((state) =>
      form.setValues({
        name: state.userName,
        comment: state.comment,
      })
    );
  }, []);
  */

  // コメントを送信する
  const sendComment = async () => {
    // 送信処理
    setComment(illustId, form.values.name, form.values.comment);
  };

  return (
    <Paper withBorder px="xl" py="lg" radius="md" className={classes.comment}>
      <form onSubmit={form.onSubmit(() => sendComment())}>
        <Group className={classes.namearea}>
          <TextInput
            variant="filled"
            label="名前/ハンドルネーム"
            placeholder="名前を入力"
            className={classes.name}
            classNames={{ input: classes.input, label: classes.inputLabel }}
            {...form.getInputProps('name')}
          />
          <Button type="submit" className={classes.control}>
            コメントを送る
          </Button>
        </Group>
        <Textarea
          variant="filled"
          label="メッセージ"
          placeholder="コメントを入力"
          minRows={4}
          mt="xs"
          className={classes.textarea}
          {...form.getInputProps('comment')}
        />
      </form>
    </Paper>
  );
}

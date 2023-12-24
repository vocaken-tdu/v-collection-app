import { Textarea, Button, Group, Paper, TextInput, Image } from '@mantine/core';
import { useForm } from '@mantine/form';
import classes from './CommentForm.module.css';
import { setComment } from '../../store/commentFormStore';
import { useMyName } from '../../store/userNameStore';
import kami from "@/public/send.svg";

export function CommentForm({ illustId }: { illustId: number }) {
  // コメントフォームの状態を管理
  const form = useForm({
    initialValues: {
      name: useMyName((state) => state.name),
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
    // 名前を記録
    useMyName.setState({ name: form.values.name });
    // フォームをリセット
    form.setValues({
      comment: '',
    });
  };

  return (
    <Paper withBorder px="xl" py="lg" radius="md" className={classes.comment}>
      <form onSubmit={form.onSubmit(() => sendComment())}>
        <Group className={classes.namearea}>
          <TextInput
            variant="filled"
            label="名前/ハンドルネーム"
            placeholder="名前を入力(1文字～)"
            className={classes.name}
            classNames={{ input: classes.input, label: classes.inputLabel }}
            {...form.getInputProps('name')}
          />
          <Button type="submit" variant="gradient" gradient={{ from: '#1c7ed6', to: '#8DD9F9', deg: 45 }} className={classes.control}>
            コメントを送る
            <Image 
              id="commingSoon"
              src={kami.src}
              fit="contain"
              className={classes.kami}
            />
          </Button>
        </Group>
        <Textarea
          variant="filled"
          label="メッセージ"
          placeholder="コメントを入力(2～140文字)"
          minRows={4}
          mt="xs"
          className={classes.textarea}
          {...form.getInputProps('comment')}
        />
      </form>
    </Paper>
  );
}

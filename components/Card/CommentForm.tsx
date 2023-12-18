import { TextInput, Textarea, Button, Group, Paper, Autocomplete, Loader } from '@mantine/core';
import { useState, useRef, useEffect } from 'react';
import { useUserName, setUserName } from '@/store/userNameStore';

import classes from './CommentForm.module.css';

export function CommentForm({ illustId }: { illustId: number }) {
  const timeoutRef = useRef<number>(-1);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string[]>([]);

  // ユーザー名(リスト)を取得
  useEffect(() => {
    setUserName();
  }, []);

  // リストの状態を取得
  const userList = useUserName((state) => state.user);
  const user = userList.map((userName) => userName.name);

  const handleChange = (val: string) => {
    window.clearTimeout(timeoutRef.current);
    setValue(val);
    setData([]);

    if (val.trim().length === 0 || val.includes('@')) {
      setLoading(false);
    } else {
      setLoading(true);
      timeoutRef.current = window.setTimeout(() => {
        setLoading(false);
        setData(user.map((provider) => `${provider}`));
      }, 1000);
    }
  };

  return (
    <Paper withBorder px="xl" py="lg" radius="md" className={classes.comment}>
      <Group className={classes.namearea}>
        <Autocomplete
          value={value}
          variant="filled"
          label="名前/ハンドルネーム"
          placeholder="名前を入力"
          className={classes.name}
          classNames={{ input: classes.input, label: classes.inputLabel }}
          data={data}
          onChange={handleChange}
          rightSection={loading ? <Loader size="1rem" /> : undefined}
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

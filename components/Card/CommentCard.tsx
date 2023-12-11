import { Button, Text, Group, Paper } from '@mantine/core';
import { IconHeartFilled, IconHeart } from '@tabler/icons-react';
import { useEffect } from 'react';
import { useIllust, setIllust } from '@/store/store';
import classes from './CommentCard.module.css';

export function CommentCard({ id }: { id: number }) {
  useEffect(() => {
    setIllust(id);
  }, []);

  const comments = useIllust((state) => state.illust.comments);

  return (
    <>
      {comments.map((comment, i) => (
        <div key={i}>
          <Paper withBorder radius="md" className={classes.comment}>
            <Text size="sm">{comment.text}</Text>
            <Group>
              <Group>
                <Text pt="sm" fz="sm">
                  {comment.user_id}
                </Text>
                <Text pt="sm" fz="xs" c="dimmed">
                  {comment.created_at}
                </Text>
              </Group>
              <Button variant="light" color="pink" radius="xl">
                <IconHeart />
                <IconHeartFilled />
                {comment.likes}
              </Button>
            </Group>
          </Paper>
        </div>
      ))}
    </>
  );
}

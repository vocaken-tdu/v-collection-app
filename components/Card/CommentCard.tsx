import { Button, Text, Group, Paper } from '@mantine/core';
import { IconHeartFilled, IconHeart } from '@tabler/icons-react';
import { useEffect } from 'react';
import { setComment, useComment } from '@/store/store';
import classes from './CommentCard.module.css';

export function CommentCard({ commentId }: { commentId: number }) {
  useEffect(() => {
    setComment(commentId);
  }, []);

  const comment = useComment((state) => state.comment);

  return (
    <Paper withBorder radius="md" className={classes.comment}>
      <Text size="sm">{comment.text}</Text>
      <Group>
        <Group>
          <Text pt="sm" fz="sm">
            Jacob Warnhalter
          </Text>
          <Text pt="sm" fz="xs" c="dimmed">
            11/24 13:30
          </Text>
        </Group>
        <Button variant="light" color="pink" radius="xl">
          <IconHeart />
          <IconHeartFilled />
          {comment.likes}
        </Button>
      </Group>
    </Paper>
  );
}

import { Button, Text, Group, Paper } from '@mantine/core';
import { IconHeartFilled, IconHeart } from '@tabler/icons-react';
import classes from './CommentCard.module.css';

export function CommentCard({ commentId }: { commentId: number }) {
  return (
    <Paper withBorder radius="md" className={classes.comment}>
      <Text size="sm">
        ああああああああああああああああああああああああああああああああああああああああああ
      </Text>
      <Group>
        <Text pt="sm" fz="sm">Jacob Warnhalter</Text>
        <Text pt="sm" fz="xs" c="dimmed">
          {commentId}
        </Text>
        <Button variant="light" color="pink" radius="xl">
          <IconHeart />
          <IconHeartFilled />
          1
        </Button>
      </Group>
    </Paper>
  );
}

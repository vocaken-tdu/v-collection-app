import { Text, Group, Paper } from '@mantine/core';
import classes from './AuthorCard.module.css';

export function AuthorCard({ id }: { id: number }) {
  return (
    <Paper withBorder radius="md" className={classes.comment}>
      <Group>
        <Text fz="sm">Jacob Warnhalter</Text>
        <Text fz="xs" c="dimmed">
          {id}
        </Text>
      </Group>
      <Text pt="sm" size="sm">
        ああああああああああああああああああああああああああああああああああああああああああ
      </Text>
    </Paper>
  );
}

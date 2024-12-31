import { SimpleGrid } from '@mantine/core';
import { getCommentsByIllustId } from '@/app/actions';

import { CommentCard } from '@/components/_ui/CommentCard';
import classes from './Comments.module.css';

// イラストのidを受け取って、そのイラストのコメントを表示する
export async function Comments({
  illustId,
  isFormVisible,
}: {
  illustId: string;
  isFormVisible: boolean;
}) {
  // 一致するイラストのコメントのみを抽出
  const comments = await getCommentsByIllustId(illustId);
  const sortedComments = comments.sort((a, b) => b.like - a.like);

  return (
    <SimpleGrid cols={1} spacing="md" className={classes.wrap}>
      <h3 className={classes.header} id="comments">
        {comments.length === 0
          ? isFormVisible
            ? '↓でコメントしてみよう！'
            : 'コメントはまだありません'
          : 'このコメントがアツい！'}
      </h3>
      {sortedComments.map((comment, i) => (
        <CommentCard comment={comment} key={comment.id} i={i} />
      ))}
    </SimpleGrid>
  );
}

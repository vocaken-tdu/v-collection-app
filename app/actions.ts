'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { client } from '@/libs/client';
import { Comment, Illustration, Category } from '@/types/database.types';

export async function comments() {
  return (await client.getAllContents({
    customRequestInit: { next: { revalidate: 60, tags: ['comments'] } },
    endpoint: 'comments',
  })) as Comment[];
}
export async function illusts() {
  return (await client.getAllContents({
    customRequestInit: { next: { revalidate: 600 } },
    endpoint: 'illustrations',
  })) as Illustration[];
}
export async function categories() {
  return (await client.getAllContents({
    customRequestInit: { next: { revalidate: 3600 } },
    endpoint: 'categories',
  })) as Category[];
}

export async function getTagName(categoryId: string | undefined) {
  const categoryList = await categories();
  return categoryList.find((category) => category.id === categoryId)?.name || '(未指定)';
}
export async function getLikeCount(commentId: string) {
  const commentList = await comments();
  return commentList.find((comment) => comment.id === commentId)?.like;
}
export async function getCommentsByIllustId(illustId: string) {
  const commentList = await comments();
  return commentList.filter((comment) => comment.illust?.id === illustId);
}
export async function getIllustById(illustId: string) {
  const illustList = await illusts();
  return illustList.find((illust) => illust.id === illustId);
}
export async function getTagById(categoryId: string) {
  const categoryList = await categories();
  return categoryList.find((category) => category.id === categoryId);
}

export const createComment = async (illust_id: string, user_name: string, comment: string) => {
  try {
    const response = await client.create({
      endpoint: 'comments',
      content: {
        text: comment,
        user_name,
        illust: illust_id,
        like: 0,
      },
    });
    revalidatePath(`/works/${illust_id}`);
    console.log('Comment sent!', response);
    return true;
  } catch (error) {
    console.error('Failed to send comment', error);
    return false;
  }
};

export async function updateLike(comment_id: string) {
  const currentLike = await getLikeCount(comment_id);
  if (currentLike === undefined) return { error: 'Failed to get like count' };

  try {
    await client.update({
      endpoint: `comments/${comment_id}`,
      content: {
        like: currentLike + 1,
      },
    });
    revalidateTag('comments');
    console.log('Like updated! Comment ID:', comment_id, 'Current like:', currentLike);
    return true;
  } catch (error) {
    console.error('Failed to update like', error);
    return false;
  }
}

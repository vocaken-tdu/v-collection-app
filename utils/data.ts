import { Comment, Illust, Tag, User } from '@/types/database.types';
import commentsJSON from '@/data/comments.json';
import illustsJSON from '@/data/illusts.json';
import tagsJSON from '@/data/tags.json';
import usersJSON from '@/data/users.json';

const comments = commentsJSON as Comment[];
export const illusts = illustsJSON as Illust[];
export const tags = tagsJSON as Tag[];
export const users = usersJSON as User[];

export const getTagName = (tagId: number | undefined) =>
  tags.find((tag) => tag.id === tagId)?.name || '(未指定)';
export const getUserName = (userId: number | undefined) =>
  users.find((user) => user.id === userId)?.name || '(ななしさん)';

export const getCommentsByIllustId = (illustId: number) =>
  comments.filter((comment) => comment.illust_id === illustId);
export const getIllustById = (illustId: number) => illusts.find((illust) => illust.id === illustId);
export const getTagById = (tagId: number) => tags.find((tag) => tag.id === tagId);
export const getUserById = (userId: number) => users.find((user) => user.id === userId);

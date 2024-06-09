'use client';

import { SimpleGrid, ScrollArea } from '@mantine/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect } from 'react';
import { useCommentList, setCommentList } from '@/store/commentListStore';
import { CommentCard } from '@/components/_ui/CommentCard';
import classes from './Comments.module.css';

gsap.registerPlugin(ScrollTrigger);

// イラストのidを受け取って、そのイラストのコメントを表示する
export function Comments({
  illustId,
  isFormVisible,
}: {
  illustId: number;
  isFormVisible: boolean;
}) {
  // コメントを取得
  useEffect(() => {
    setCommentList();
  }, []);

  // コメントの状態を取得
  const rawComments = useCommentList((state) => state.commentList);
  // 一致するイラストのコメントのみを抽出 (illustIdがstringになるバグで念のためNumber済み)
  const comments = rawComments.filter((c) => Number(c.illust_id) === Number(illustId));
  const sortedComments = comments.sort((a, b) => b.like - a.like);

  // コメントが取得し終わったらGSAP実行
  useEffect(() => {
    // GSAPでコメントを右からスライドインさせる
    if (document.getElementById('comment')) {
      gsap.fromTo(
        '#comment',
        {
          x: 48,
          opacity: 0,
        },
        {
          duration: 0.5,
          x: 0,
          opacity: 1,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#comments',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, [rawComments]);

  return (
    <ScrollArea className={classes.scrollArea}>
      <SimpleGrid cols={1} spacing="md">
        <h2 className="text-xl text-center mt-5 mb-1" id="comments">
          {/* コメントがないとき and フォームが表示されている場合に コメントを促す */}
          {!comments.length && isFormVisible ? '↓でコメントしてみよう！' : 'このコメントがアツい！'}
        </h2>
        {sortedComments.map((comment, i) => (
          <CommentCard comment={comment} i={i} />
        ))}
      </SimpleGrid>
    </ScrollArea>
  );
}

'use client';

import { SimpleGrid } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import { getCommentsByIllustId } from '@/utils/data';

import { CommentCard } from '@/components/_ui/CommentCard';
import classes from './Comments.module.css';

// イラストのidを受け取って、そのイラストのコメントを表示する
export function Comments({ illustId }: { illustId: number }) {
  const cardsRef = useRef(null);
  const [isIntersected, setIsIntersected] = useState(false);
  const [isObserved, setIsObserved] = useState(false);

  // 一致するイラストのコメントのみを抽出
  const comments = getCommentsByIllustId(illustId);
  const sortedComments = comments.sort((a, b) => b.like - a.like);

  // IntersectionObserverの設定
  useEffect(() => {
    // コメントカードが存在しない場合は処理を終了
    if (!cardsRef.current) return;

    // IntersectionObserverの設定
    const options = {
      rootMargin: '32px',
    };

    // IntersectionObserverで画像の読み込みを監視
    const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        // コメントが視野内に表示されたときの処理
        if (entry.isIntersecting) {
          setIsIntersected(true);
          // (負荷軽減のため) 監視を終了
          observer.disconnect();
        }
      });
    }, options);

    // コメントカードが存在していてまだ監視していない場合は監視を開始 (二重監視を防ぐ)
    if (!isObserved) {
      observer.observe(cardsRef.current);
      setIsObserved(true);
    }
  }, []);

  return (
    <SimpleGrid cols={1} spacing="md" className={`${classes.wrap} ${isIntersected && 'anims'}`}>
      <h3 className={classes.header} id="comments" ref={cardsRef}>
        このコメントがアツい！
      </h3>
      {sortedComments.map((comment, i) => (
        <CommentCard comment={comment} key={comment.id} i={i} />
      ))}
    </SimpleGrid>
  );
}

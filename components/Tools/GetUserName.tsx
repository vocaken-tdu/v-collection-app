import React, { useEffect } from 'react';
import { useUserName, setUserName } from '@/store/userNameStore';

export function GetUserName({ userId }: { userId: number }) {
  // ユーザー名(リスト)を取得
  useEffect(() => {
    setUserName();
  }, []);

  // リストの状態を取得
  const userList = useUserName((state) => state.user);

  // ユーザー名を取得
  const userName = userList.find((user) => user.id === userId)?.name;

  return <>{userName}</>;
}

'use client';

import React, { useEffect } from 'react';
import { useUserName, setUserName } from '@/store/userNameStore';

export function GetUserName({ userId }: { userId: number }) {
  useEffect(() => {
    setUserName();
  }, []);

  const userList = useUserName((state) => state.user);
  const userName = userList.find((user) => user.id === userId)?.name;

  return <>{userName}</>;
}

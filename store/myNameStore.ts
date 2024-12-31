import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// -------- 自身の名前を記録する

type MyNameState = {
  name: string;
};

export const useMyName = create<MyNameState>()(
  // 永続化オプション
  persist(
    () => ({
      name: '',
    }),
    {
      name: 'myNameStore',
    }
  )
);

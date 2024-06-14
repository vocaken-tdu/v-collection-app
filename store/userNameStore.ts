import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios, { AxiosResponse } from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// -------- 自身の名前を記録する

type myNameState = {
  name: string;
};

export const useMyName = create<myNameState>()(
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

// -------- ユーザーネームを記録する

type userNameState = {
  user: [
    {
      id: number;
      name: string;
    },
  ];
};

export const useUserName = create<userNameState>()(
  // 永続化オプション
  persist(
    () => ({
      user: [
        {
          id: 0,
          name: '',
        },
      ],
    }),
    {
      name: 'userNameStore',
    }
  )
);

type dataInfo = {
  // データが取得済みかどうか(重複取得を防ぐ)
  isExecuted: boolean;
};

export const dataInfo = create<dataInfo>(() => ({
  isExecuted: false,
}));

export const setUserName = async () => {
  const fetch = async () => {
    try {
      const response: AxiosResponse = await axios.get(`${apiUrl}/user/`);
      useUserName.setState({ user: response.data });
      console.log('userName is fetched!');
    } catch (error) {
      console.error('userName fetch failed!');
    }
  };
  // 初めて実行するときのみ取得
  const { isExecuted } = dataInfo.getState();
  isExecuted ? console.log('userName is already fetched!') : fetch();
  dataInfo.setState({ isExecuted: true });
};

// 補足: フェッチしたかではなく実行したか を使う理由
// GetUserName.tsx は同時に複数実行される
// その度にAPIを呼び出すのを回避する必要がある
// ただし 実行したかどうか で判定すると fetch が正しく行われたかの状態によらないのが難点

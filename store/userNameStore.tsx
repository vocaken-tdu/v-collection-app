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
  isExecuted: boolean;
};

export const useUserName = create<userNameState>()(() => ({
  user: [
    {
      id: 0,
      name: '',
    },
  ],
  isExecuted: false,
}));

export const setUserName = async () => {
  const fetch = async () => {
    const response: AxiosResponse = await axios.get(`${apiUrl}/user/`);
    useUserName.setState({ user: response.data });
    console.log('userName is fetched!');
  };
  // 初めて実行するときのみ取得
  useUserName.getState().isExecuted ? console.log('userName is already fetched!') : fetch();
  useUserName.setState({ isExecuted: true });
};

// 補足: isFetched ではなく isExecuted を先行して使う理由
// GetUserName.tsx は同時に複数実行される
// その度にAPIを呼び出すのを回避する必要がある
// ただし 実行したかどうか で判定すると fetch が正しく行われたかの状態によらないのが難点

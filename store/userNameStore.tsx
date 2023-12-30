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
  isFetched: () => boolean;
};

export const useUserName = create<userNameState>()(() => ({
  user: [
    {
      id: 0,
      name: '',
    },
  ],
  isFetched: () => {
    // ユーザーデータが取得済みかどうかを判定
    const list: number = useUserName.getState().user.length;
    return list > 1;
  },
})
);

export const setUserName = async () => {
  const fetch = async () => {
    const response: AxiosResponse = await axios.get(`${apiUrl}/user/`);
    useUserName.setState({ user: response.data });
    console.log('userName is fetched!');
  };
  // 取得状態がfalseのときのみ取得
  useUserName.getState().isFetched() ? console.log('userName is already fetched!') : fetch();
};

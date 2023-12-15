import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios, { AxiosResponse } from 'axios';

const apiUrl = 'https://django-render-vam9.onrender.com';

// -------- ユーザーネームを記録する

type userNameState = {
  isFetched: boolean;
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
    (): userNameState => ({
      isFetched: false,
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

export const setUserName = async () => {
  const response: AxiosResponse = await axios.get(`${apiUrl}/user/`);
  useUserName.setState({ user: response.data });
  useUserName.setState({ isFetched: true });
  console.log('userName is fetched!');
};
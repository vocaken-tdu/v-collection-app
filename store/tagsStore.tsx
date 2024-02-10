import { create } from 'zustand';
import axios, { AxiosResponse } from 'axios';
import { persist } from 'zustand/middleware';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// -------- タグを取得する

type tagsState = {
  tags: [
    {
      id: number;
      name: string;
    },
  ];
};

export const useTags = create<tagsState>()(
  persist(
    () => ({
      tags: [
        {
          id: 0,
          name: '',
        },
      ],
    }),
    {
      name: 'tagsStore',
    }
  )
);

type dataInfo = {
  // データが取得済みかどうか(重複取得を防ぐ)
  // このコンポーネント内で使う
  isFetched: boolean;
  // データが既に入っているかどうか
  isExist: boolean;
  // 情報を更新したかどうか
  isUpdated: boolean;
};

export const dataInfo = create<dataInfo>(() => ({
  isFetched: false,
  isExist: false,
  isUpdated: false,
}));

// タグを取得する

export const setTags = async () => {
  // データが取得済みかどうかを判定
  const isExist = useTags.getState().tags.length > 1;
  dataInfo.setState({ isExist });

  const fetch = async () => {
    try {
      const response: AxiosResponse = await axios.get(`${apiUrl}/tags/`);
      const data = response.data.sort((a: any, b: any) => b.id - a.id);

      // ローカルのタグデータと取得したタグデータを比較(更新の必要性を判定)
      const dataStr = JSON.stringify(data);
      const localDataStr = JSON.stringify(useTags.getState().tags);

      if (dataStr !== localDataStr) {
        useTags.setState({ tags: data });
        dataInfo.setState({ isUpdated: true });
        console.log('tagData is updated!');
      } else {
        console.log('tagData is the latest!');
      }

      dataInfo.setState({ isFetched: true, isExist: true });
    } catch (error) {
      console.error('tagData fetch failed!');
    }
  };
  // 取得状態がfalseのときのみ取得
  const { isFetched } = dataInfo.getState();
  isFetched ? console.log('tagData is already fetched!') : fetch();
};

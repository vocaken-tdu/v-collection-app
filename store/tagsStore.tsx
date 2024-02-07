import { create } from 'zustand';
import axios, { AxiosResponse } from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// -------- タグを取得する

type tagsState = {
  tags: [
    {
      id: number;
      name: string;
    },
  ];
  isFetched: () => boolean;
};

export const useTags = create<tagsState>()(() => ({
  tags: [
    {
      id: 0,
      name: '',
    },
  ],
  isFetched: () => {
    const list: number = useTags.getState().tags.length;
    return list > 1;
  },
}));

export const setTags = async () => {
  const fetch = async () => {
    const response: AxiosResponse = await axios.get(`${apiUrl}/tags/`);
    const data = response.data.sort((a: any, b: any) => b.id - a.id);
    useTags.setState({ tags: data });
    console.log('tagData is fetched!');
  };
  // 取得状態がfalseのときのみ取得
  useTags.getState().isFetched() ? console.log('tagData is already fetched!') : fetch();
};

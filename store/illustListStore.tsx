import { create } from 'zustand';
import axios, { AxiosResponse } from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// -------- イラスト一覧を取得する

type illustListState = {
  illustList: [
    {
      id: number;
      illust: string;
      title: string;
      user_id: number;
      caption: string;
      tags: [number];
      created_at: string;
      updated_at: string;
    },
  ];
  isFetched: () => boolean;
};

export const useIllustList = create<illustListState>()(() => ({
  illustList: [
    {
      id: 0,
      illust: '',
      title: '',
      user_id: 0,
      caption: '',
      tags: [0],
      created_at: '',
      updated_at: '',
    },
  ],
  isFetched: () => {
    // イラストリストが取得済みかどうかを判定
    const list: number = useIllustList.getState().illustList.length;
    return list > 1;
  },
}));

export const setIllustList = async () => {
  const fetch = async () => {
    const response: AxiosResponse = await axios.get(`${apiUrl}/illustrations/`);
    const data = response.data.sort((a: any, b: any) => b.id - a.id);
    useIllustList.setState({ illustList: data });
    console.log('illustListData is fetched!');
  };
  // 取得状態がfalseのときのみ取得
  const isFetched = useIllustList.getState().isFetched();
  isFetched ? console.log('Data is already fetched!') : fetch();
};

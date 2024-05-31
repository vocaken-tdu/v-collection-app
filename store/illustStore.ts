import { create } from 'zustand';
import axios, { AxiosResponse } from 'axios';
import { FetchFailedIllust } from './StoreNotification';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// -------- イラストを取得する

type illustState = {
  illust: {
    id: number;
    illust: string;
    title: string;
    user_id: number;
    caption: string;
    tags: [number];
    created_at: string;
    updated_at: string;
  };
  isFetched: () => boolean;
};

export const useIllust = create<illustState>()(() => ({
  illust: {
    id: 0,
    illust: '',
    title: '',
    user_id: 0,
    caption: '',
    tags: [0],
    created_at: '',
    updated_at: '',
  },
  isFetched: () => {
    // イラストデータが取得済みかどうかを判定
    const illustId: number = useIllust.getState().illust.id;
    return illustId !== 0;
  },
}));

export const setIllust = async (illustId: number) => {
  const fetch = async () => {
    try {
      const response: AxiosResponse = await axios.get(`${apiUrl}/illustrations/${illustId}`);
      useIllust.setState({ illust: response.data });
      console.log('illustData is fetched!');
    } catch (e) {
      // イラストが取得できなかったときのエラー通知を表示
      FetchFailedIllust();
    }
  };

  // イラストデータを取得
  fetch();
};

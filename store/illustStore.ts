import { create } from 'zustand';
import { useIllustList } from './illustListStore';

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
  // illustListStoreからイラストデータを取得
  const illusts = useIllustList.getState().illustList;
  const illust = illusts.find((i) => i.id === illustId);
  useIllust.setState({ illust });
};

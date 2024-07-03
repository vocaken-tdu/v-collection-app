import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios, { AxiosResponse } from 'axios';
import {
  NotifyFetchFailedIllustList,
  NotifyUpdateIllustList,
} from '@/components/_tools/Notifications';
import dummy from '@/public/assets/dummy.svg';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const visibleSeasonId = Number(process.env.NEXT_PUBLIC_VISIBLE_SEASON_ID);

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
};

export const useIllustList = create<illustListState>()(
  persist(
    () => ({
      illustList: [
        {
          id: 0,
          illust: dummy.src,
          title: '',
          user_id: 0,
          caption: '',
          tags: [0],
          created_at: '',
          updated_at: '',
        },
      ],
    }),
    {
      name: 'illustListStore',
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

// イラストリストを取得

export const setIllustList = async () => {
  // データが取得済みかどうかを判定
  const isExist = useIllustList.getState().illustList.length > 1;
  dataInfo.setState({ isExist });

  const fetch = async () => {
    try {
      const response: AxiosResponse = await axios.get(`${apiUrl}/illustrations/`);

      // シーズンIDでフィルタリング
      const dataFilter = response.data.filter(
        (item: { tags: [number] }) => item.tags[0] <= visibleSeasonId
      );

      // IDで降順ソート
      const dataOrdered = dataFilter.sort((a: any, b: any) => b.id - a.id);

      // シーズンでソート
      const data = dataOrdered.sort((a: any, b: any) => b.tags[0] - a.tags[0]);

      // ローカルのイラストリストと取得したイラストリストを比較(更新の必要性を判定)
      const dataStr = JSON.stringify(data);
      const localDataStr = JSON.stringify(useIllustList.getState().illustList);

      if (dataStr !== localDataStr) {
        useIllustList.setState({ illustList: data });

        // イラストリストが更新された場合に通知を表示
        NotifyUpdateIllustList();

        dataInfo.setState({ isUpdated: true });
        console.log('illustListData is updated!');
      } else {
        console.log('illustListData is the latest!');
      }

      dataInfo.setState({ isFetched: true, isExist: true });
    } catch (e) {
      // イラストリストが取得できなかったときのエラー通知を表示
      NotifyFetchFailedIllustList();
    }
  };
  // 取得状態がfalseのときのみ取得
  const { isFetched } = dataInfo.getState();
  isFetched ? console.log('illustListData is already fetched!') : fetch();
};

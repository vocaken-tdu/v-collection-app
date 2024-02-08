import { create } from 'zustand';
import axios, { AxiosResponse } from 'axios';
import { notifications } from '@mantine/notifications';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const visibleSeasonId = process.env.NEXT_PUBLIC_VISIBLE_SEASON_ID;

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
  // イラストリストが取得できなかったときの通知を表示
  const fetchFailedIllustList = () => {
    notifications.show({
      id: 'fetchFailedIllustList',
      loading: true,
      autoClose: false,
      radius: 'md',
      title: 'イラスト情報が取得できませんでした。',
      message:
        'ページをリロードしても直らない場合は、しばらくお待ちいただくか、お問い合わせください。',
    });
  };

  const fetch = async () => {
    try {
      const response: AxiosResponse = await axios.get(`${apiUrl}/illustrations/`);
      const dataFilter = response.data.filter(
        (item: any) => item.tags[0] <= (visibleSeasonId || 0)
      );
      const data = dataFilter.sort((a: any, b: any) => b.id - a.id);
      useIllustList.setState({ illustList: data });
      console.log('illustListData is fetched!');
    } catch (e) {
      // イラストが取得できなかったときのエラー通知を表示
      fetchFailedIllustList();
    }
  };
  // 取得状態がfalseのときのみ取得
  const isFetched = useIllustList.getState().isFetched();
  isFetched ? console.log('Data is already fetched!') : fetch();
};

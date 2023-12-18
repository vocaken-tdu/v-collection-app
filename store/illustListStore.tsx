import { create } from 'zustand';
import axios, { AxiosResponse } from 'axios';

const apiUrl = 'https://django-render-vam9.onrender.com';

// -------- イラスト一覧を取得する

type illustListState = {
  isFetched: boolean,
  illustList: [
    {
      id: number;
      illust: string;
      title: string;
      user_id: number;
      caption: string;
      created_at: string;
      updated_at: string;
    },
  ];
};

export const useIllustList = create<illustListState>()(() => ({
  isFetched: false,
  illustList: [
    {
      id: 0,
      illust: '',
      title: '',
      user_id: 0,
      caption: '',
      created_at: '',
      updated_at: '',
    },
  ],
}));

export const setIllustList = async () => {
  const fetch = async () => {
    const response: AxiosResponse = await axios.get(`${apiUrl}/illustrations/`);
    const data = response.data.sort((a: any, b: any) => b.id - a.id);
    useIllustList.setState({ illustList: data });
    useIllustList.setState({ isFetched: true });
    console.log('illustListData is fetched!');
  };
  const fetchState = useIllustList.getState().illustList;
  fetchState.length < 2 ? fetch() : console.log('Data is already fetched!');
};

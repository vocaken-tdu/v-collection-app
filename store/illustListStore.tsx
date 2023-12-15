import { create } from 'zustand';
import axios, { AxiosResponse } from 'axios';

const apiUrl = 'https://django-render-vam9.onrender.com';

// -------- イラスト一覧を取得する

type illustListState = {
  isFetched: boolean;
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
      illust: 'https://placehold.co/600x800?text=No+Image',
      title: 'No Title',
      user_id: 0,
      caption: 'No Caption',
      created_at: 'No Date',
      updated_at: 'No Date',
    },
  ],
}));

export const setIllustList = async () => {
  const fetch = async () => {
    const response: AxiosResponse = await axios.get(`${apiUrl}/illustrations/`);
    useIllustList.setState({ illustList: response.data });
    useIllustList.setState({ isFetched: true });
    console.log(response.data, 'Data is fetched!');
  };
  const fetchState = useIllustList.getState().illustList;
  fetchState.length < 2 ? fetch() : console.log('Data is already fetched!');
};

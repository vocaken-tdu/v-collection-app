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
      tags: [number];
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
      tags: [0],
      created_at: '',
      updated_at: '',
    },
  ],
}));

export const setIllustList = async () => {
  const fetch = async () => {
    const response: AxiosResponse = await axios.get(`${apiUrl}/illustrations/`);
    const dataWinter = response.data.filter((item: any) => item.tags.includes(1));
    const data = dataWinter.sort((a: any, b: any) => b.id - a.id);
    console.log(data);
    useIllustList.setState({ illustList: data });
    useIllustList.setState({ isFetched: true });
    console.log('illustListData is fetched!');
  };
  const fetchState = useIllustList.getState().illustList;
  fetchState.length < 2 ? fetch() : console.log('Data is already fetched!');
};

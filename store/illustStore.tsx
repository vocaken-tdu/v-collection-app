import { create } from 'zustand';
import axios, { AxiosResponse } from 'axios';

const apiUrl = 'https://django-render-vam9.onrender.com';

// -------- イラストを取得する

type illustState = {
  isFetched: boolean;
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
};

export const useIllust = create<illustState>()(() => ({
  isFetched: false,
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
}));

export const setIllust = async (illustId: number) => {
  const fetch = async () => {
    const response: AxiosResponse = await axios.get(`${apiUrl}/illustrations/${illustId}`);
    useIllust.setState({ illust: response.data });
    useIllust.setState({ isFetched: true });
    console.log('illustData is fetched!');
  };
  const fetchState = useIllust.getState().illust;
  fetchState ? fetch() : console.log('illustData is already fetched!');
};

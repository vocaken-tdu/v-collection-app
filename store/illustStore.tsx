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
    created_at: string;
    updated_at: string;
  };
};

export const useIllust = create<illustState>()(() => ({
  isFetched: false,
  illust: {
    id: 0,
    illust: 'https://placehold.co/600x800?text=No+Image',
    title: 'No Title',
    user_id: 0,
    caption: 'No Caption',
    created_at: 'No Date',
    updated_at: 'No Date',
  },
}));

export const setIllust = async (illustId: number) => {
  const fetch = async () => {
    const response: AxiosResponse = await axios.get(`${apiUrl}/illustrations/${illustId}`);
    useIllust.setState({ illust: response.data });
    useIllust.setState({ isFetched: true });
    console.log(response.data, 'illustData is fetched!');
  };
  const fetchState = useIllust.getState().illust;
  fetchState ? fetch() : console.log('illustData is already fetched!');
};

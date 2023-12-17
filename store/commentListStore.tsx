import { create } from 'zustand';
import axios, { AxiosResponse } from 'axios';

const apiUrl = 'https://django-render-vam9.onrender.com';

// -------- コメントを取得する

// 一旦仮ですべてのコメントを取得してます

type commentListState = {
  isFetched: boolean;
  commentList: [
    {
      id: number;
      text: string;
      user_id: number;
      like: number;
      illust_id: number;
      created_at: string;
      updated_at: string;
    },
  ];
};

export const useCommentList = create<commentListState>()(() => ({
  isFetched: false,
  commentList: [
    {
      id: 0,
      text: '',
      user_id: 0,
      like: 0,
      illust_id: 0,
      created_at: '',
      updated_at: '',
    },
  ],
}));

export const setCommentList = async () => {
  const fetch = async () => {
    const response: AxiosResponse = await axios.get(`${apiUrl}/comments/`);
    useCommentList.setState({ commentList: response.data });
    useCommentList.setState({ isFetched: true });
    console.log('commentListData is fetched!');
  };
  const fetchState = useCommentList.getState().commentList;
  fetchState.length < 2 ? fetch() : console.log('commentData is already fetched!');
};

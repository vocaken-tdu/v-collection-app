import { create } from 'zustand';
import axios, { AxiosResponse } from 'axios';

const apiUrl = 'https://django-render-vam9.onrender.com';

// -------- コメントを取得する

// 一旦仮ですべてのコメントを取得してます

type commentListState = {
  commentList: [
    {
      id: number;
      text: string;
      user_name: string;
      like: number;
      illust_id: number;
      created_at: string;
      updated_at: string;
    },
  ];
  isFetched: () => boolean;
};

export const useCommentList = create<commentListState>()(() => ({
  commentList: [
    {
      id: 0,
      text: '',
      user_name: '',
      like: 0,
      illust_id: 0,
      created_at: '',
      updated_at: '',
    },
  ],
  isFetched: () => {
    // コメントリストが取得済みかどうかを判定
    const list: number = useCommentList.getState().commentList.length;
    return list > 1;
  },
}));

// -------- コメントを取得する(初回)

export const setCommentList = async () => {
  const fetch = async () => {
    const response: AxiosResponse = await axios.get(`${apiUrl}/comments/`);
    useCommentList.setState({ commentList: response.data });
    console.log('commentListData is fetched!');
  };
  // 取得状態がfalseのときのみ取得
  const isFetched = useCommentList.getState().isFetched();
  isFetched ? console.log('commentData is already fetched!') : fetch();
};

// -------- コメントを更新する

export const updateCommentList = async () => {
  const fetch = async () => {
    const response: AxiosResponse = await axios.get(`${apiUrl}/comments/`);
    useCommentList.setState({ commentList: response.data });
    console.log('commentListData is updated!');
  };

  // 1秒後に更新(コメント送信から十分に経っていないと更新されていないものを取得するため)
  setTimeout(() => {
    fetch();
  }, 800);
};

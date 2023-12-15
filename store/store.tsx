import { create } from 'zustand';
import { persist } from 'zustand/middleware';
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
      text: 'No Comment',
      user_id: 0,
      like: 0,
      illust_id: 0,
      created_at: 'No Date',
      updated_at: 'No Date',
    },
  ],
}));

export const setCommentList = async () => {
  const fetch = async () => {
    const response: AxiosResponse = await axios.get(`${apiUrl}/comments/`);
    useCommentList.setState({commentList: response.data});
    useCommentList.setState({ isFetched: true });
    console.log(response.data, 'commentData is fetched!');
  };
  const fetchState = useCommentList.getState().commentList;
  fetchState.length < 2 ? fetch() : console.log('commentData is already fetched!');
};

// -------- いいねを押したかどうかを記録する

type likeState = {
  commentId: number[];
};

export const useLike = create<likeState>()(
  persist(
    () => ({
      commentId: [0, 1, 2],
    }),
    {
      name: 'likeStore',
    }
  )
);

export const setLike = async (comment_id: number) => {
  const like = async () => {
    const response: AxiosResponse = await axios.post(`${apiUrl}/comments/${comment_id}/like`);
    // いいねを押したコメントのidを追加する
    useLike.setState({ commentId: [...useLike.getState().commentId, comment_id] });
    console.log(response.data, 'liked!');
  };
  const unlike = async () => {
    const response: AxiosResponse = await axios.post(`${apiUrl}/comments/${comment_id}/like`);
    console.log(response.data, 'unliked!');
  };
  const likeState = useLike.getState().commentId;
  likeState.includes(comment_id) ? like() : unlike();
  console.log(comment_id, useLike.getState());
};

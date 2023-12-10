import { create } from 'zustand';
import axios, { AxiosResponse } from 'axios';

const apiUrl = 'https://vcollection-background.onrender.com/illustrations';

// -------- イラスト一覧を取得する

type illustListStore = {
  illustList: [
    {
      title: string;
      description: string;
      url: string;
      id: 0;
      created_at: string;
      comments: [
        {
          text: string;
          illustration_id: number;
          user_id: number;
          id: number;
        },
      ];
      likes: number;
    },
  ];
};

export const useIllustList = create<illustListStore>()(() => ({
  illustList: [
    {
      title: 'title',
      description: 'description',
      url: 'url',
      id: 0,
      created_at: 'created_at',
      comments: [
        {
          text: 'text',
          illustration_id: 0,
          user_id: 0,
          id: 0,
        },
      ],
      likes: 0,
    },
  ],
}));

export const setIllustList = async () => {
  const fetch = async () => {
    const response: AxiosResponse = await axios.get(apiUrl);
    useIllustList.setState({ illustList: response.data });
    console.log('Data is fetched!');
  };
  const fetchState = useIllustList.getState().illustList;
  fetchState.length < 2 ? fetch() : console.log('Data is already fetched!');
};

// -------- イラストを取得する

type illustStore = {
  illust: {
    title: string;
    description: string;
    url: string;
    id: 0;
    created_at: string;
    comments: [
      {
        text: string;
        illustration_id: number;
        user_id: number;
        id: number;
      },
    ];
    likes: number;
  };
};

export const useIllust = create<illustStore>()(() => ({
  illust: {
    title: 'title',
    description: 'description',
    url: 'url',
    id: 0,
    created_at: 'created_at',
    comments: [
      {
        text: 'text',
        illustration_id: 0,
        user_id: 0,
        id: 0,
      },
    ],
    likes: 0,
  },
}));

export const setIllust = async (id: number) => {
  const fetch = async () => {
    const response: AxiosResponse = await axios.get(`${apiUrl}/%7Billustration_id%7D?id=${id}`);
    useIllust.setState({ illust: response.data });
    console.log('illustData is fetched!');
  };
  const fetchState = useIllust.getState().illust;
  fetchState ? fetch() : console.log('illustData is already fetched!');
};

// -------- コメントを取得する

type commentStore = {
  comment: {
    text: 'string';
    illustration_id: number;
    user_id: number;
    id: number;
    likes: number;
  };
};

export const useComment = create<commentStore>()(() => ({
  comment: {
    text: 'string',
    illustration_id: 0,
    user_id: 0,
    id: 0,
    likes: 0,
  },
}));

export const setComment = async (id: number) => {
  const fetch = async () => {
    const response: AxiosResponse = await axios.get(`${apiUrl}/comments/${id}`);
    useComment.setState({ comment: response.data });
    console.log('commentData is fetched!');
  };
  const fetchState = useComment.getState().comment;
  fetchState ? fetch() : console.log('commentData is already fetched!');
};

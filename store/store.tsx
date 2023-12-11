import { create } from 'zustand';
import axios, { AxiosResponse } from 'axios';

const apiUrl = 'https://vcollection-background.onrender.com';

// -------- イラスト一覧を取得する

type illustListStore = {
  isFetched: boolean,
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
  isFetched: false,
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
    const response: AxiosResponse = await axios.get(`${apiUrl}/illustrations/`);
    useIllustList.setState({ illustList: response.data });
    useIllustList.setState({ isFetched: true });
    console.log('Data is fetched!');
  };
  const fetchState = useIllustList.getState().illustList;
  fetchState.length < 2 ? fetch() : console.log('Data is already fetched!');
};

// -------- イラストを取得する

type illustStore = {
  isFetched: boolean,
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
        created_at: string; // 不足
        likes: number; // 不足
      },
    ];
    likes: number;
  };
};

export const useIllust = create<illustStore>()(() => ({
  isFetched: false,
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
        created_at: 'created_at',
        likes: 123456789,
      },
    ],
    likes: 0,
  },
}));

export const setIllust = async (id: number) => {
  const fetch = async () => {
    const response: AxiosResponse = await axios.get(`${apiUrl}/illustrations/%7Billustration_id%7D?id=${id}`);
    useIllust.setState({ illust: response.data });
    useIllust.setState({ isFetched: true });
    console.log('illustData is fetched!');
  };
  const fetchState = useIllust.getState().illust;
  fetchState ? fetch() : console.log('illustData is already fetched!');
};

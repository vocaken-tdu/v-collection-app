import { create } from 'zustand';
import axios, { AxiosResponse } from 'axios';

const apiUrl = 'https://vcollection-background.onrender.com/illustrations';

type Store = {
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

export const useBearStore = create<Store>()(() => ({
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

export const setIllustList = async () => {
  const fetch = async () => {
    const response: AxiosResponse = await axios.get(apiUrl);
    useBearStore.setState({ illustList: response.data });
    console.log('Data is fetched!');
  };
  const fetchState = useBearStore.getState().illustList;
  fetchState.length < 2 ? fetch() : console.log('Data is already fetched!');
};

export const setIllust = async (id: number) => {
  const fetch = async () => {
    const response: AxiosResponse = await axios.get(`${apiUrl}/%7Billustration_id%7D?id=${id}`);
    useBearStore.setState({ illust: response.data });
    console.log('illustData is fetched!');
  };
  const fetchState = useBearStore.getState().illust;
  fetchState ? fetch() : console.log('Data is already fetched!');
};

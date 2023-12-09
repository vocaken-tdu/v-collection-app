import { create } from 'zustand';
import axios, { AxiosResponse } from 'axios';

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
  setIllust: (id: number) => void;
};

export const useBearStore = create<Store>()((set) => ({
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
  setIllust: async (id: number) => {
    const apiUrl = `https://vcollection-background.onrender.com/%7Billustration_id%7D?id=${id}`;
    const response: AxiosResponse = await axios.get(apiUrl);
    set({ illust: response.data });
    console.log('illustData is fetched!');
  },
}));

export const setIllustList = async () => {
  const fetch = async () => {
    const apiUrl = 'https://vcollection-background.onrender.com/illustrations';
    const response: AxiosResponse = await axios.get(apiUrl);
    useBearStore.setState({ illustList: response.data });
    console.log('illustList is fetched!');
  };
  const state = useBearStore.getState().illustList;
  state.length < 2 ? fetch() : console.log('Data is already fetched!');
};

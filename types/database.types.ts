export type Comment = {
  id: number;
  text: string;
  user_name: string;
  like: number;
  illust_id: number;
  created_at: string;
  updated_at: string;
};

export type Illust = {
  id: number;
  illust: string;
  title: string;
  user_id: number;
  caption: string;
  tags: number[];
  created_at: string;
  updated_at: string;
};

export type Tag = {
  id: number;
  name: string;
};

export type User = {
  id: number;
  name: string;
};

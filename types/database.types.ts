export type Illustration = {
  id: string;
  image: {
    url: string;
    height: number;
    width: number;
  };
  title: string;
  caption: string;
  user_name: number;
  category: Category;
  publishedAt: string;
};

export type Category = {
  id: string;
  name: string;
  isPublic: boolean;
  isArchived: boolean;
  publishedAt: string;
};

export type Comment = {
  id: string;
  text: string;
  like: number;
  illust: Illustration;
  user_name: string;
  publishedAt: string;
};

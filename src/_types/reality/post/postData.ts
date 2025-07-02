export type PostData = {
  ID: number;
  title: string;
  description: string;
  content: string;
  cover_url: string;
  tags: string;
  meta_keywords: string;
  meta_title: string;
  meta_description: string;
  published: boolean;
  created_at: Date;
  updated_at: Date;
  user_id: number;
  user_name: string;
  user_avatar: string;
  views: number;
};

export type IPostFilters = {
  published: boolean;
};

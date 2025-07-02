import { PostData } from './postData';

export interface CreatePostRequestBodyType {
  title: string;
  description: string;
  content: string;
  cover_url: string;
  tags: string;
  meta_keywords: string;
  meta_title: string;
  meta_description: string;
  published: boolean;
}

export type CreatePostResponseType = {
  statusCode: number;
  data: PostData;
};

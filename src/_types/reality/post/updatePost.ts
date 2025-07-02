import { PostData } from './postData';

export type UpdatePostRequestBodyType = {
  post: {
    title?: string;
    description?: string;
    content?: string;
    cover_url?: string;
    tags?: string;
    meta_keywords?: string;
    meta_title?: string;
    meta_description?: string;
    published?: boolean;
  };
  ID?: number;
};

export type UpdatePublishedRequestBodyType = {
  post: {
    published: boolean;
  };
  ID?: number;
};

export type UpdateViewsRequestBodyType = {
  post: {
    increment: number;
  };
  ID?: number;
};

export type UpdatePostResponseType = {
  statusCode: number;
  data: PostData;
};

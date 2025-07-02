// types.ts
export type DeletePostsRequestBodyType = {
  ids: number[];
};

export type DeletePostsResponseType = {
  statusCode: number;
  data: {
    ids: number[];
  };
};

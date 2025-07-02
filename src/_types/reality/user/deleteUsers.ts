export type DeleteUsersRequestBodyData = {
  ids: number[];
};

export type DeleteUsersResponseData = {
  statusCode: number;
  data: {
    ids: number[];
  };
};

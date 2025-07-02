export type RefreshTokenRequestBodyType = {
  refresh_token: string;
};

export type RefreshTokensResponseType = {
  statusCode: number;
  data: {
    access_token: string;
    refresh_token: string;
  };
};
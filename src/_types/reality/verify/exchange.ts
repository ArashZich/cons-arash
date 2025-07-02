export type ExchangeCodeRequestBodyType = {
  code: string;
};

export type ExchangeCodeResponseType = {
  statusCode: number;
  data: {
    session_code: string;
  };
};

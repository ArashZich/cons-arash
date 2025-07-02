export type SendCodeRequestBodyType = {
  phone?: string;
  email?: string;
};

export type SendCodeResponseType = {
  statusCode: number;
  data: {
    code: string;
  };
};
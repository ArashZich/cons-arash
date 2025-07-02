import { UserData } from './userData';

export type AddAffiliateCodeRequestBodyType = {
  affiliate_code: string;
  id: number;
};

export type AddAffiliateCodeResponseType = {
  statusCode: number;
  data: UserData;
};

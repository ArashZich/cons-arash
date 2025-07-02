import { AxiosResponse } from 'axios';
import {
  AddAffiliateCodeRequestBodyType,
  AddAffiliateCodeResponseType,
} from 'src/_types/reality/user/affiliateData';
import { reality } from 'src/_clients';

export default async function AddAffiliateCodeUser(
  user: AddAffiliateCodeRequestBodyType
): Promise<AddAffiliateCodeResponseType> {
  const response = await reality.put<
    AddAffiliateCodeRequestBodyType,
    AxiosResponse<AddAffiliateCodeResponseType>
  >(`/api/v1/users/${user.id}/affiliateCode/add`, {
    affiliate_code: user.affiliate_code,
  });

  return response.data;
}

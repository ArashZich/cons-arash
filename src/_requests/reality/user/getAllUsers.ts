import { AxiosResponse } from 'axios';
import { GetAllUsersResponseType } from 'src/_types/reality/user/getAllUsers';
import { reality } from 'src/_clients';

export default async function GetAllUsers(
  page: number,
  per_page: number,
  order: string,
  order_by: string,
  affiliate_codes: string[],
  has_organization: string,
  has_packages: string
): Promise<GetAllUsersResponseType> {
  // Stringify the affiliate codes array
  const affiliateCodesString = affiliate_codes.length > 0 ? JSON.stringify(affiliate_codes) : [];

  const response = await reality.get<void, AxiosResponse<GetAllUsersResponseType>>(
    `/api/v1/users`,
    {
      params: {
        page,
        per_page,
        order,
        order_by,
        affiliate_codes: affiliateCodesString,
        has_organization,
        has_packages,
      },
    }
  );

  return response.data;
}

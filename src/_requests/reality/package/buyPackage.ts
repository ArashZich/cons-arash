import { AxiosResponse } from 'axios';
import {
  BuyPackageRequestBodyType,
  BuyPackageResponseType,
} from 'src/_types/reality/package/buyPackage';
import { reality } from 'src/_clients';

export default async function BuyPackage(
  data: BuyPackageRequestBodyType
): Promise<BuyPackageResponseType> {
  const response = await reality.post<
    BuyPackageRequestBodyType,
    AxiosResponse<BuyPackageResponseType>
  >(`/api/v1/packages/buy`, data);

  return response.data;
}

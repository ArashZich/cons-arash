// src/_requests/reality/package/buyDynamic.ts

import { AxiosResponse } from 'axios';
import {
  BuyDynamicRequestBodyType,
  BuyDynamicResponseType,
} from 'src/_types/reality/package/buyDynamic';
import { reality } from 'src/_clients';

export default async function BuyDynamic(
  data: BuyDynamicRequestBodyType
): Promise<BuyDynamicResponseType> {
  const response = await reality.post<
    BuyDynamicRequestBodyType,
    AxiosResponse<BuyDynamicResponseType>
  >(`/api/v1/packages/buy-dynamic`, data);

  return response.data;
}

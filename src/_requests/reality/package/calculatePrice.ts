// src/_requests/reality/package/calculatePrice.ts

import { AxiosResponse } from 'axios';
import {
  CalculatePriceRequestBodyType,
  CalculatePriceResponseType,
} from 'src/_types/reality/package/calculatePrice';
import { reality } from 'src/_clients';

export default async function CalculatePrice(
  data: CalculatePriceRequestBodyType
): Promise<CalculatePriceResponseType> {
  const response = await reality.post<
    CalculatePriceRequestBodyType,
    AxiosResponse<CalculatePriceResponseType>
  >(`/api/v1/packages/calculate-price`, data);

  return response.data;
}

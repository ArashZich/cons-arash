// src/_requests/reality/admin/getCategoryPricing.ts

import { AxiosResponse } from 'axios';
import {
  GetCategoryPricingListResponseType,
  GetCategoryPricingResponseType,
} from 'src/_types/reality/admin/categoryPricing';
import { reality } from 'src/_clients';

export async function GetCategoryPricingList(): Promise<GetCategoryPricingListResponseType> {
  const response = await reality.get<void, AxiosResponse<GetCategoryPricingListResponseType>>(
    '/api/v1/admin/category-pricing'
  );

  return response.data;
}

export async function GetCategoryPricing(
  categoryId: number
): Promise<GetCategoryPricingResponseType> {
  const response = await reality.get<void, AxiosResponse<GetCategoryPricingResponseType>>(
    `/api/v1/admin/category-pricing/${categoryId}`
  );

  return response.data;
}

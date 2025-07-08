// src/_requests/reality/admin/deleteCategoryPricing.ts

import { AxiosResponse } from 'axios';
import { DeleteCategoryPricingResponseType } from 'src/_types/reality/admin/categoryPricing';
import { reality } from 'src/_clients';

export default async function DeleteCategoryPricing(
  categoryId: number
): Promise<DeleteCategoryPricingResponseType> {
  const response = await reality.delete<void, AxiosResponse<DeleteCategoryPricingResponseType>>(
    `/api/v1/admin/category-pricing/${categoryId}`
  );

  return response.data;
}

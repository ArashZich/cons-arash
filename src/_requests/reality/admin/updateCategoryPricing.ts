// src/_requests/reality/admin/updateCategoryPricing.ts

import { AxiosResponse } from 'axios';
import {
  UpdateCategoryPricingRequestBodyType,
  UpdateCategoryPricingResponseType,
} from 'src/_types/reality/admin/categoryPricing';
import { reality } from 'src/_clients';

export default async function UpdateCategoryPricing(
  categoryId: number,
  data: UpdateCategoryPricingRequestBodyType
): Promise<UpdateCategoryPricingResponseType> {
  const response = await reality.put<
    UpdateCategoryPricingRequestBodyType,
    AxiosResponse<UpdateCategoryPricingResponseType>
  >(`/api/v1/admin/category-pricing/${categoryId}`, data);

  return response.data;
}

// src/_requests/reality/category/getCategoryFeatures.ts

import { AxiosResponse } from 'axios';
import { GetCategoryFeaturesResponseType } from 'src/_types/reality/category/categoryFeatures';
import { reality } from 'src/_clients';

export default async function GetCategoryFeatures(
  categoryId: number
): Promise<GetCategoryFeaturesResponseType> {
  const response = await reality.get<void, AxiosResponse<GetCategoryFeaturesResponseType>>(
    `/api/v1/categories/${categoryId}/features`
  );

  return response.data;
}

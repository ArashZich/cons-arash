// src/_requests/reality/admin/deletePlanFeature.ts

import { AxiosResponse } from 'axios';
import { DeletePlanFeatureResponseType } from 'src/_types/reality/admin/planFeatures';
import { reality } from 'src/_clients';

export default async function DeletePlanFeature(
  id: number
): Promise<DeletePlanFeatureResponseType> {
  const response = await reality.delete<void, AxiosResponse<DeletePlanFeatureResponseType>>(
    `/api/v1/admin/plan-features/${id}`
  );

  return response.data;
}

// src/_requests/reality/admin/updatePlanFeature.ts

import { AxiosResponse } from 'axios';
import {
  UpdatePlanFeatureRequestBodyType,
  UpdatePlanFeatureResponseType,
} from 'src/_types/reality/admin/planFeatures';
import { reality } from 'src/_clients';

export default async function UpdatePlanFeature(
  id: number,
  data: UpdatePlanFeatureRequestBodyType
): Promise<UpdatePlanFeatureResponseType> {
  const response = await reality.put<
    UpdatePlanFeatureRequestBodyType,
    AxiosResponse<UpdatePlanFeatureResponseType>
  >(`/api/v1/admin/plan-features/${id}`, data);

  return response.data;
}

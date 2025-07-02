import { AxiosResponse } from 'axios';
import {
  CreatePlanRequestBodyType,
  CreatePlanResponseType,
} from 'src/_types/reality/plan/createPlan';
import { reality } from 'src/_clients';

export default async function CreatePlan(
  data: CreatePlanRequestBodyType
): Promise<CreatePlanResponseType> {
  const response = await reality.post<
    CreatePlanRequestBodyType,
    AxiosResponse<CreatePlanResponseType>
  >(`/api/v1/plans`, data);

  return response.data;
}

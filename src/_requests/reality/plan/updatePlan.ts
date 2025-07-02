import { AxiosResponse } from 'axios';
import { UpdatePlanRequestBodyType, UpdatePlanResponseType } from 'src/_types/reality/plan/updatePlan';
import { reality } from 'src/_clients';

export default async function UpdatePlan({
    data,
    ID,
}: UpdatePlanRequestBodyType): Promise<UpdatePlanResponseType> {
    const response = await reality.put<
        UpdatePlanRequestBodyType,
        AxiosResponse<UpdatePlanResponseType>
    >(`/api/v1/plans/${ID}`, data);

    return response.data;
}
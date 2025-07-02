import { AxiosResponse } from 'axios';
import { DeletePlansRequestBodyData, DeletePlansResponseData } from 'src/_types/reality/plan/deletePlans';
import { reality } from 'src/_clients';

export default async function DeletePlans(
    ids: DeletePlansRequestBodyData
): Promise<DeletePlansResponseData> {
    const response = await reality.delete<
        DeletePlansRequestBodyData,
        AxiosResponse<DeletePlansResponseData>
    >('/api/v1/plans', {
        data: ids,
    });

    return response.data;
}

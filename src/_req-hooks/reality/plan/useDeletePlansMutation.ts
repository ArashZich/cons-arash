// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { DeletePlansRequestBodyData, DeletePlansResponseData } from 'src/_types/reality/plan/deletePlans';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import DeletePlans from 'src/_requests/reality/plan/deletePlans';


export function useDeletePlansMutation(
    options?: UseMutationOptions<
        DeletePlansResponseData,
        ErrorResponse,
        DeletePlansRequestBodyData
    >
) {
    return useMutation<
        DeletePlansResponseData,
        ErrorResponse,
        DeletePlansRequestBodyData
    >((data: DeletePlansRequestBodyData) => DeletePlans(data), options);
}

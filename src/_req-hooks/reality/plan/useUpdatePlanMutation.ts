// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { UpdatePlanRequestBodyType, UpdatePlanResponseType } from 'src/_types/reality/plan/updatePlan';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import UpdatePlan from 'src/_requests/reality/plan/updatePlan';

export function useUpdatePlanMutation(
    options?: UseMutationOptions<
        UpdatePlanResponseType,
        ErrorResponse,
        UpdatePlanRequestBodyType
    >
) {
    return useMutation<
        UpdatePlanResponseType,
        ErrorResponse,
        UpdatePlanRequestBodyType
    >((data: UpdatePlanRequestBodyType) => UpdatePlan(data), options);
}

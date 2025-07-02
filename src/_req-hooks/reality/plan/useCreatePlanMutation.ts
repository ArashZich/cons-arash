// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import CreatePlan from 'src/_requests/reality/plan/createPlan';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import {
  CreatePlanRequestBodyType,
  CreatePlanResponseType,
} from 'src/_types/reality/plan/createPlan';

// type CreateCategoryMutationType = {
//   requestBody: CreatePlanRequestBodyType;
// };

export function useCreatePlanMutation(
  options?: UseMutationOptions<CreatePlanResponseType, ErrorResponse, CreatePlanRequestBodyType>
) {
  return useMutation<CreatePlanResponseType, ErrorResponse, CreatePlanRequestBodyType>(
    (data: CreatePlanRequestBodyType) => CreatePlan(data),
    options
  );
}

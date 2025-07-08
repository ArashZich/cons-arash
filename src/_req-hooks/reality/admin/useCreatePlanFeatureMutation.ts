// src/_req-hooks/reality/admin/useCreatePlanFeatureMutation.ts

// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import CreatePlanFeature from 'src/_requests/reality/admin/createPlanFeature';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import {
  CreatePlanFeatureRequestBodyType,
  CreatePlanFeatureResponseType,
} from 'src/_types/reality/admin/planFeatures';

export function useCreatePlanFeatureMutation(
  options?: UseMutationOptions<
    CreatePlanFeatureResponseType,
    ErrorResponse,
    CreatePlanFeatureRequestBodyType
  >
) {
  return useMutation<
    CreatePlanFeatureResponseType,
    ErrorResponse,
    CreatePlanFeatureRequestBodyType
  >((data: CreatePlanFeatureRequestBodyType) => CreatePlanFeature(data), options);
}

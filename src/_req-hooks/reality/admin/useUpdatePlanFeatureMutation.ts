// src/_req-hooks/reality/admin/useUpdatePlanFeatureMutation.ts

// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import UpdatePlanFeature from 'src/_requests/reality/admin/updatePlanFeature';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import {
  UpdatePlanFeatureRequestBodyType,
  UpdatePlanFeatureResponseType,
} from 'src/_types/reality/admin/planFeatures';

type UpdatePlanFeatureMutationParams = {
  id: number;
  data: UpdatePlanFeatureRequestBodyType;
};

export function useUpdatePlanFeatureMutation(
  options?: UseMutationOptions<
    UpdatePlanFeatureResponseType,
    ErrorResponse,
    UpdatePlanFeatureMutationParams
  >
) {
  return useMutation<UpdatePlanFeatureResponseType, ErrorResponse, UpdatePlanFeatureMutationParams>(
    ({ id, data }: UpdatePlanFeatureMutationParams) => UpdatePlanFeature(id, data),
    options
  );
}

// src/_req-hooks/reality/admin/useDeletePlanFeatureMutation.ts

// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import DeletePlanFeature from 'src/_requests/reality/admin/deletePlanFeature';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import { DeletePlanFeatureResponseType } from 'src/_types/reality/admin/planFeatures';

export function useDeletePlanFeatureMutation(
  options?: UseMutationOptions<DeletePlanFeatureResponseType, ErrorResponse, number>
) {
  return useMutation<DeletePlanFeatureResponseType, ErrorResponse, number>(
    (id: number) => DeletePlanFeature(id),
    options
  );
}

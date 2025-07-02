// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import {
  UpdateOrganizationRequestBodyType,
  UpdateOrganizationResponseType,
} from 'src/_types/reality/organization/updateOrganization';
import { UpdateOrganization } from 'src/_requests/reality/organization';

export function useUpdateOrganizationMutation(
  options?: UseMutationOptions<
    UpdateOrganizationResponseType,
    ErrorResponse,
    UpdateOrganizationRequestBodyType
  >
) {
  return useMutation<
    UpdateOrganizationResponseType,
    ErrorResponse,
    UpdateOrganizationRequestBodyType
  >((data: UpdateOrganizationRequestBodyType) => UpdateOrganization(data), options);
}

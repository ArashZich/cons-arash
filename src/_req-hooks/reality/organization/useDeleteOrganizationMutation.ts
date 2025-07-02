// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { DeleteOrganization } from 'src/_requests/reality/organization';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import {
  DeleteOrganizationRequestBodyData,
  DeleteOrganizationResponseData,
} from 'src/_types/reality/organization/deleteOrganization';

export function useDeleteOrganizationMutation(
  options?: UseMutationOptions<
    DeleteOrganizationResponseData,
    ErrorResponse,
    DeleteOrganizationRequestBodyData
  >
) {
  return useMutation<
    DeleteOrganizationResponseData,
    ErrorResponse,
    DeleteOrganizationRequestBodyData
  >((data: DeleteOrganizationRequestBodyData) => DeleteOrganization(data), options);
}

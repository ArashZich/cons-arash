// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import {
  CreateOrganizationRequestBodyType,
  CreateOrganizationResponseType,
} from 'src/_types/reality/organization/createOrganization';
import { CreateOrganization } from 'src/_requests/reality/organization';

export function useCreateOrganizationMutation(
  options?: UseMutationOptions<
    CreateOrganizationResponseType,
    ErrorResponse,
    CreateOrganizationRequestBodyType
  >
) {
  return useMutation<
    CreateOrganizationResponseType,
    ErrorResponse,
    CreateOrganizationRequestBodyType
  >((data: CreateOrganizationRequestBodyType) => CreateOrganization(data), options);
}

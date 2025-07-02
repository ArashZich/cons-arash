// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import {
  SetupDomainRequestBodyType,
  SetupDomainResponseType,
} from 'src/_types/reality/organization/setupDomain';

import { SetupDomain } from 'src/_requests/reality/organization';

export function useSetupDomainMutation(
  options?: UseMutationOptions<SetupDomainResponseType, ErrorResponse, SetupDomainRequestBodyType>
) {
  return useMutation<SetupDomainResponseType, ErrorResponse, SetupDomainRequestBodyType>(
    (data: SetupDomainRequestBodyType) => SetupDomain(data),
    options
  );
}

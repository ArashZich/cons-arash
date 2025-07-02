// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import SetEnterprise from 'src/_requests/reality/package/setEnterprise';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';

import {
  SetEnterpriseRequestBodyType,
  SetEnterpriseResponseType,
} from 'src/_types/reality/package/setEnterprise';

export function useSetEnterpriseMutation(
  options?: UseMutationOptions<
    SetEnterpriseResponseType,
    ErrorResponse,
    SetEnterpriseRequestBodyType
  >
) {
  return useMutation<SetEnterpriseResponseType, ErrorResponse, SetEnterpriseRequestBodyType>(
    (data: SetEnterpriseRequestBodyType) => SetEnterprise(data),
    options
  );
}

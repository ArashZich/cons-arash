// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import ExchangeCode from 'src/_requests/reality/verify/exchange';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import {
  ExchangeCodeRequestBodyType,
  ExchangeCodeResponseType,
} from 'src/_types/reality/verify/exchange';

export function useExchangeCodeMutation(
  options?: UseMutationOptions<ExchangeCodeResponseType, ErrorResponse, ExchangeCodeRequestBodyType>
) {
  return useMutation<ExchangeCodeResponseType, ErrorResponse, ExchangeCodeRequestBodyType>(
    (data: ExchangeCodeRequestBodyType) => ExchangeCode(data),
    options
  );
}

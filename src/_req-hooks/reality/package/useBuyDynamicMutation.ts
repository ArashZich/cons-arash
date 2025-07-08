// src/_req-hooks/reality/package/useBuyDynamicMutation.ts

// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import BuyDynamic from 'src/_requests/reality/package/buyDynamic';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import {
  BuyDynamicRequestBodyType,
  BuyDynamicResponseType,
} from 'src/_types/reality/package/buyDynamic';

export function useBuyDynamicMutation(
  options?: UseMutationOptions<BuyDynamicResponseType, ErrorResponse, BuyDynamicRequestBodyType>
) {
  return useMutation<BuyDynamicResponseType, ErrorResponse, BuyDynamicRequestBodyType>(
    (data: BuyDynamicRequestBodyType) => BuyDynamic(data),
    options
  );
}

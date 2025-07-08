// src/_req-hooks/reality/package/useCalculatePriceMutation.ts

// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import CalculatePrice from 'src/_requests/reality/package/calculatePrice';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import {
  CalculatePriceRequestBodyType,
  CalculatePriceResponseType,
} from 'src/_types/reality/package/calculatePrice';

export function useCalculatePriceMutation(
  options?: UseMutationOptions<
    CalculatePriceResponseType,
    ErrorResponse,
    CalculatePriceRequestBodyType
  >
) {
  return useMutation<CalculatePriceResponseType, ErrorResponse, CalculatePriceRequestBodyType>(
    (data: CalculatePriceRequestBodyType) => CalculatePrice(data),
    options
  );
}

// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { BuyPackage } from 'src/_requests/reality/package';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import {
  BuyPackageRequestBodyType,
  BuyPackageResponseType,
} from 'src/_types/reality/package/buyPackage';

export function useBuyPackageMutation(
  options?: UseMutationOptions<BuyPackageResponseType, ErrorResponse, BuyPackageRequestBodyType>
) {
  return useMutation<BuyPackageResponseType, ErrorResponse, BuyPackageRequestBodyType>(
    (data: BuyPackageRequestBodyType) => BuyPackage(data),
    options
  );
}

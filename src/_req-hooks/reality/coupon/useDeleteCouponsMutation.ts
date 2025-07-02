// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  DeleteCouponsRequestBodyData,
  DeleteCouponsResponseData,
} from 'src/_types/reality/coupon/deleteCoupons';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import DeleteCoupons from 'src/_requests/reality/coupon/deleteCoupons';

export function useDeleteCouponsMutation(
  options?: UseMutationOptions<
    DeleteCouponsResponseData,
    ErrorResponse,
    DeleteCouponsRequestBodyData
  >
) {
  return useMutation<DeleteCouponsResponseData, ErrorResponse, DeleteCouponsRequestBodyData>(
    (data: DeleteCouponsRequestBodyData) => DeleteCoupons(data),
    options
  );
}

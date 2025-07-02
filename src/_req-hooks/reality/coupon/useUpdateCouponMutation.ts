// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  UpdateCouponRequestBodyType,
  UpdateCouponResponseType,
} from 'src/_types/reality/coupon/updateCoupon';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import UpdateCoupon from 'src/_requests/reality/coupon/updateCoupon';

export function useUpdateCouponMutation(
  options?: UseMutationOptions<UpdateCouponResponseType, ErrorResponse, UpdateCouponRequestBodyType>
) {
  return useMutation<UpdateCouponResponseType, ErrorResponse, UpdateCouponRequestBodyType>(
    (data: UpdateCouponRequestBodyType) => UpdateCoupon(data),
    options
  );
}

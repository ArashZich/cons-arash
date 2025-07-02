// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import CreateCoupon from 'src/_requests/reality/coupon/createCoupon';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import {
  CreateCouponRequestBodyType,
  CreateCouponResponseType,
} from 'src/_types/reality/coupon/createCoupon';

export function useCreateCouponMutation(
  options?: UseMutationOptions<CreateCouponResponseType, ErrorResponse, CreateCouponRequestBodyType>
) {
  return useMutation<CreateCouponResponseType, ErrorResponse, CreateCouponRequestBodyType>(
    (data: CreateCouponRequestBodyType) => CreateCoupon(data),
    options
  );
}

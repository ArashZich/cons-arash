import { AxiosResponse } from 'axios';
import {
  CreateCouponRequestBodyType,
  CreateCouponResponseType,
} from 'src/_types/reality/coupon/createCoupon';
import { reality } from 'src/_clients';

export default async function CreateCoupon(
  data: CreateCouponRequestBodyType
): Promise<CreateCouponResponseType> {
  const response = await reality.post<
    CreateCouponRequestBodyType,
    AxiosResponse<CreateCouponResponseType>
  >(`/api/v1/coupons`, data);

  return response.data;
}

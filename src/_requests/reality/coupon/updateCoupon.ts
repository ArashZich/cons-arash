import { AxiosResponse } from 'axios';
import {
  UpdateCouponRequestBodyType,
  UpdateCouponResponseType,
} from 'src/_types/reality/coupon/updateCoupon';
import { reality } from 'src/_clients';

export default async function UpdateCoupon({
  data,
  ID,
}: UpdateCouponRequestBodyType): Promise<UpdateCouponResponseType> {
  const response = await reality.put<
    UpdateCouponRequestBodyType,
    AxiosResponse<UpdateCouponResponseType>
  >(`/api/v1/coupons/${ID}`, data);

  return response.data;
}

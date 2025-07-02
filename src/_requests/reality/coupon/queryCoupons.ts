import { AxiosResponse } from 'axios';
import {
  CouponQueryFiltersType,
  QueryCouponResponseType,
} from 'src/_types/reality/coupon/queryCoupon';
import { reality } from 'src/_clients';

export default async function QueryCoupons(
  id: string,
  page: number,
  per_page: number,
  order: string,
  order_by: string,
  filters: CouponQueryFiltersType
): Promise<QueryCouponResponseType> {
  /* eslint-disable-next-line */
  const response = await reality.get<void, AxiosResponse<QueryCouponResponseType>>(
    '/api/v1/coupons',
    {
      params: {
        id,
        page,
        per_page,
        order,
        order_by,
        filters: JSON.stringify(filters),
      },
    }
  );

  return response.data;
}

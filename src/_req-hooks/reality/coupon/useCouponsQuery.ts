/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  CouponQueryFiltersType,
  QueryCouponResponseType,
} from 'src/_types/reality/coupon/queryCoupon';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import { QueryCoupons } from 'src/_requests/reality/coupon';

type CouponsQueryParamsType = {
  id?: string;
  page?: number;
  per_page?: number;
  order?: string;
  order_by?: string;
  filters?: CouponQueryFiltersType;
};

export function useCouponsQuery(
  queryFnArgs: CouponsQueryParamsType,
  options?: UseQueryOptions<QueryCouponResponseType, ErrorResponse>
) {
  const queryKey = ['getAllCouponsQuery', JSON.stringify(queryFnArgs)];

  return useQuery<QueryCouponResponseType, ErrorResponse>(
    queryKey,
    async (): Promise<QueryCouponResponseType> =>
      QueryCoupons(
        queryFnArgs.id || '',
        queryFnArgs.page || 1,
        queryFnArgs.per_page || 10000,
        queryFnArgs.order || 'desc',
        queryFnArgs.order_by || 'id',
        queryFnArgs.filters || ({} as CouponQueryFiltersType)
      ),
    options
  );
}

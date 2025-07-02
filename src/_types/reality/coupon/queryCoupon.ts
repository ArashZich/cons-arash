import { FilterValueInt, FilterValueString } from 'src/_types/site/filters';
import { CouponData } from './couponData';

export type CouponQueryFiltersType = {
  code?: FilterValueString;
  discount_type?: FilterValueString;
  status?: FilterValueString;
  Discounting_amount?: FilterValueInt;
  usage_count?: FilterValueInt;
  usage_limit?: FilterValueInt;
  individual_use?: null;
  minimum_amount?: FilterValueInt;
  maximum_amount?: FilterValueInt;
  expired_at?: Date;
  created_at?: Date;
};

export type QueryCouponResponseType = {
  statusCode: number;
  data: {
    items: CouponData[];
    limit: number;
    offset: number;
    page: number;
    totalRows: number;
    totalPages: number;
  };
};

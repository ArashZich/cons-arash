// src/_types/reality/package/buyDynamic.ts

export interface BuyDynamicRequestBodyType {
  category_id: number;
  months: number;
  product_count: number;
  feature_ids: number[];
  organization_id: number;
  coupon_code?: string;
}

export type BuyDynamicResponseType = {
  success: boolean;
  data: string; // Payment URL
};

export type BuyDynamicErrorResponseType = {
  success: false;
  error: {
    message: string;
  };
};

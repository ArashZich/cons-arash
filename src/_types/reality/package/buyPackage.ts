export interface BuyPackageRequestBodyType {
  plan_id: number;
  organization_id: number;
  coupon_code: string;
}

export type BuyPackageResponseType = {
  statusCode: number;
  data: string;
};

import { PlanData } from 'src/_types/reality/plan/planData';

export interface CreateCouponRequestBodyType {
  code: string;
  description: string;
  discount_type: string;
  status: string;
  discounting_amount: number;
  usage_limit: number;
  maximum_discount_amount: number;
  plan_id: number | null | string;
  expire_date: Date | string;
}

export type CreateCouponResponseType = {
  statusCode: number;
  data: {
    ID: number;
    code: string;
    created_at: Date;
    deleted_at: number;
    description: string;
    discount_type: string;
    discounting_amount: number;
    expire_date: Date;
    maximum_discount_amount: number;
    plan_id: number;
    plans: PlanData;
    status: string;
    updated_at: Date;
    usage_count: number;
    usage_limit: number;
  };
};

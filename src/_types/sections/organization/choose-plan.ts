import { PlanData } from 'src/_types/reality/plan/planData';

export interface NewPlanData extends PlanData {
  price_discounted?: number;
  discount_code?: string;
}

export interface State {
  days: number;
  voucher_code: string;
  is_coupon_enabled: boolean;
  plan_items: NewPlanData[] | any;
}

export type Action =
  | { type: 'days'; payload: number }
  | { type: 'voucher_code'; payload: string }
  | { type: 'is_coupon_enabled'; payload: boolean }
  | { type: 'plan_items'; payload?: NewPlanData[] };

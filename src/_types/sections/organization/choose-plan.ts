// src/_types/sections/organization/choose-plan.ts

import { PlanData } from 'src/_types/reality/plan/planData';

export interface State {
  days: number;
  voucher_code: string;
  is_coupon_enabled: boolean;
  plan_items: NewPlanData[];
}

export interface NewPlanData extends PlanData {
  price_discounted?: number;
  discount_code?: string;
}

export interface DynamicPlanConfiguration {
  category_id: number;
  months: number;
  product_count: number;
  feature_ids: number[];
}

export interface DynamicPlanState {
  configuration: DynamicPlanConfiguration;
  pricing_data: any; // Will be set from API response
  is_calculated: boolean;
}

export type Action =
  | { type: 'days'; payload: number }
  | { type: 'voucher_code'; payload: string }
  | { type: 'is_coupon_enabled'; payload: boolean }
  | { type: 'plan_items'; payload: NewPlanData[] };

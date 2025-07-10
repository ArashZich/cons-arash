// src/_types/reality/admin/discountRules.ts

export interface DiscountRuleData {
  ID: number;
  name: string;
  min_months: number;
  min_products: number;
  min_features: number;
  discount_percentage: number;
  is_active: boolean;
  created_at: string;
}

export interface CreateDiscountRuleRequestBodyType {
  name: string;
  min_months: number;
  min_products: number;
  min_features: number;
  discount_percentage: number;
  is_active: boolean;
}

export interface UpdateDiscountRuleRequestBodyType {
  name: string;
  min_months: number;
  min_products: number;
  min_features: number;
  discount_percentage: number;
  is_active: boolean;
}

export type GetDiscountRulesResponseType = {
  success: boolean;
  data: DiscountRuleData[];
};

export type GetDiscountRuleResponseType = {
  success: boolean;
  data: DiscountRuleData;
};

export type CreateDiscountRuleResponseType = {
  success: boolean;
  data: DiscountRuleData;
};

export type UpdateDiscountRuleResponseType = {
  success: boolean;
  data: DiscountRuleData;
};

export type DeleteDiscountRuleResponseType = {
  success: boolean;
  data: string;
};

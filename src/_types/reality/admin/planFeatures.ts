// src/_types/reality/admin/planFeatures.ts

export interface PlanFeatureData {
  id: number;
  name: string;
  title: string;
  description: string;
  pricing_type: 'fixed' | 'per_month' | 'per_product';
  price: number;
  category_ids: number[];
  is_active: boolean;
  created_at: string;
}

export interface CreatePlanFeatureRequestBodyType {
  name: string;
  title: string;
  description: string;
  pricing_type: 'fixed' | 'per_month' | 'per_product';
  price: number;
  category_ids: number[];
  is_active: boolean;
}

export interface UpdatePlanFeatureRequestBodyType {
  name: string;
  title: string;
  description: string;
  pricing_type: 'fixed' | 'per_month' | 'per_product';
  price: number;
  category_ids: number[];
  is_active: boolean;
}

export type GetPlanFeaturesResponseType = {
  success: boolean;
  data: PlanFeatureData[];
};

export type GetPlanFeatureResponseType = {
  success: boolean;
  data: PlanFeatureData;
};

export type CreatePlanFeatureResponseType = {
  success: boolean;
  data: PlanFeatureData;
};

export type UpdatePlanFeatureResponseType = {
  success: boolean;
  data: PlanFeatureData;
};

export type DeletePlanFeatureResponseType = {
  success: boolean;
  data: string;
};

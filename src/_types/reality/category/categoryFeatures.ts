// src/_types/reality/category/categoryFeatures.ts

export interface CategoryFeatureData {
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

export type GetCategoryFeaturesResponseType = {
  success: boolean;
  data: CategoryFeatureData[];
};

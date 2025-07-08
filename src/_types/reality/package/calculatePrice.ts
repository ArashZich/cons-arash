// src/_types/reality/package/calculatePrice.ts

export interface CalculatePriceRequestBodyType {
  category_id: number;
  months: number;
  product_count: number;
  feature_ids: number[];
}

export interface SelectedFeature {
  id: number;
  name: string;
  title: string;
}

export interface BasePackagePricing {
  price_per_product_per_month: number;
  calculation: string;
  amount: number;
}

export interface FeaturePricing {
  feature_id: number;
  title: string;
  pricing_type: 'fixed' | 'per_month' | 'per_product';
  calculation: string;
  amount: number;
}

export interface AutoDiscount {
  rule_name: string;
  percentage: number;
  total_discount: number;
}

export interface PricingSummary {
  subtotal: number;
  auto_discount: number;
  final_price: number;
  savings: string;
}

export interface ConfigurationData {
  category_id: number;
  category_name: string;
  months: number;
  product_count: number;
  selected_features: SelectedFeature[];
}

export interface PricingData {
  base_package: BasePackagePricing;
  features: FeaturePricing[];
  total_features: number;
}

export interface DiscountsData {
  auto_discount: AutoDiscount;
}

export type CalculatePriceResponseType = {
  success: boolean;
  data: {
    configuration: ConfigurationData;
    pricing: PricingData;
    discounts: DiscountsData;
    summary: PricingSummary;
  };
};

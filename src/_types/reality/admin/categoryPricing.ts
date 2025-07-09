// src/_types/reality/admin/categoryPricing.ts

export interface CategoryPricingData {
  id: number;
  category_id: number;
  price_per_product_per_month: number;
  storage_per_product_mb: number; // 🆕 اضافه شده
  category: {
    id: number;
    title: string;
    icon_url: string;
  };
  created_at: string;
}

export interface CreateCategoryPricingRequestBodyType {
  category_id: number;
  price_per_product_per_month: number;
  storage_per_product_mb: number; // 🆕 اضافه شده
}

export interface UpdateCategoryPricingRequestBodyType {
  category_id: number;
  price_per_product_per_month: number;
  storage_per_product_mb: number; // 🆕 اضافه شده
}

export type GetCategoryPricingListResponseType = {
  success: boolean;
  data: CategoryPricingData[];
};

export type GetCategoryPricingResponseType = {
  success: boolean;
  data: CategoryPricingData;
};

export type CreateCategoryPricingResponseType = {
  success: boolean;
  data: CategoryPricingData;
};

export type UpdateCategoryPricingResponseType = {
  success: boolean;
  data: CategoryPricingData;
};

export type DeleteCategoryPricingResponseType = {
  success: boolean;
  data: string;
};

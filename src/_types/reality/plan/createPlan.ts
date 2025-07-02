import { CategoryData } from '../category/categoryData';

export interface CreatePlanRequestBodyType {
  title: string;
  description: string;
  price: number;
  discounted_price: number;
  categories: number[];
  day_length: number;
  product_limit: number;
  storage_limit_mb: number;
  icon_url: string;
}

export type CreatePlanResponseType = {
  statusCode: number;
  data: {
    ID: number;
    title: string;
    description: string;
    price: number;
    discounted_price: number;
    categories: CategoryData[];
    packages: null;
    user: null;
    user_id: number;
    day_length: number;
    product_limit: number;
    storage_limit_mb: number;
    icon_url: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: number;
  };
};

import { UserData } from 'src/_types/reality/user/userData';
import { CategoryData } from '../category/categoryData';

export type PlanData = {
  ID: number;
  title: string;
  description: string;
  price: number;
  discounted_price: number;
  category_id: number;
  categories: CategoryData[];
  packages: [];
  user: UserData;
  user_id: number;
  day_length: number;
  product_limit: number;
  storage_limit_mb: number;
  icon_url: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: number;
  price_discounted?: number;
};

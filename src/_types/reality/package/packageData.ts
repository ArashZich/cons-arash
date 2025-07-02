import { UserData } from 'src/_types/reality/user/userData';
import { CategoryData } from 'src/_types/reality/category/categoryData';
import { PlanData } from 'src/_types/reality/plan/planData';

export type PackageDataType = {
  ID: number;
  icon_url: string;
  product_limit: number;
  storage_limit_mb: number;
  price: number;
  plan: PlanData;
  plan_id: number;
  category: CategoryData;
  category_id: number;
  organization: null;
  organization_id: number;
  products: [];
  expired_at: string;
  user: UserData;
  user_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: number;
};

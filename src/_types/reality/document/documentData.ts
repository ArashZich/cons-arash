import { UserData } from 'src/_types/reality/user/userData';
import { CategoryData } from 'src/_types/reality/category/categoryData';

export type DocumentDataType = {
  ID: number;
  title: string;
  file_uri: string;
  mime_type: string;
  preview_uri: string;
  shop_link: string; // فیلد جدید اضافه شده
  product: null;
  product_id: number;
  order: number;
  size_mb: number;
  user: UserData;
  user_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: number;
  cell_phone: string;
  instagram: string;
  linkedin: string;
  location: string;
  phone_number: string;
  size: string;
  telegram: string;
  website: string;
  product_uid: string;
  category: CategoryData;
};

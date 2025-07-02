import { DocumentDataType } from '../document/documentData';
import { UserData } from '../user/userData';
import { CategoryData } from '../category/categoryData';

export type ProductData = {
  ID: number;
  product_uid: string;
  name: string;
  category_id: number;
  category: CategoryData;
  package_id: number;
  package: null;
  disabled_at: null;
  organization_id: number;
  organization: null;
  documents: DocumentDataType[];
  user: UserData;
  user_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: number;
  thumbnail_uri: string;
  view_count: number;
};

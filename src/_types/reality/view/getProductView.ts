import { FilterValueInt } from 'src/_types/site/filters';
import { CategoryData } from '../category/categoryData';
import { PackageDataType } from '../package/packageData';
import { OrganizationDataType } from '../organization/organizationData';
import { UserData } from '../user/userData';

export type GetProductViewQueryFiltersType = {
  organization_id?: FilterValueInt;
};

export type GetProductViewQueryParamsType = {
  ID: number;
  name: string;
  thumbnail_uri: string;
  category: CategoryData;
  category_id: number;
  package: PackageDataType;
  package_id: number;
  organization: OrganizationDataType;
  organization_id: number;
  document: null;
  view_count: number;
  user: UserData;
  user_id: number;
  disabled_at: null;
  created_at: Date;
  updated_at: Date;
  deleted_at: number;
  product_uid: string;
};

export type GetProductViewResponseType = {
  statusCode: number;
  data: GetProductViewQueryParamsType[];
};

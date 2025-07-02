import { FilterValueInt, FilterValueString } from 'src/_types/site/filters';
import { PackageDataType } from './packageData';

export type PackagesQueryFiltersType = {
  product_limit?: FilterValueInt;
  storage_limit_mb?: FilterValueInt;
  price?: FilterValueInt;
  plan_id?: FilterValueInt;
  category_id?: FilterValueInt;
  organization_id?: FilterValueInt;
  expired_at?: FilterValueString;
  created_at?: FilterValueString;
};

export type QueryPackagesResponseType = {
  statusCode: number;
  data: {
    limit: number;
    offset: number;
    page: number;
    totalRows: number;
    totalPages: number;
    items: PackageDataType[];
  };
};

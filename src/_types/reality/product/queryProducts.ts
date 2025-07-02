import { FilterValueInt, FilterValueString } from 'src/_types/site/filters';
import { ProductData } from './productData';

type Data = {
  limit: number;
  offset: number;
  page: number;
  totalRows: number;
  totalPages: number;
  items: ProductData[];
};

export type ProductsQueryFiltersType = {
  name?: FilterValueString;
  category_id?: FilterValueInt;
  package_id?: FilterValueInt;
  organization_id?: FilterValueInt;
  expired_at?: FilterValueString;
  created_at?: FilterValueString;
  product_uid?: FilterValueString;
};

export type QueryProductsResponseType = {
  statusCode: number;
  data: Data;
};

import { FilterValueInt, FilterValueString } from 'src/_types/site/filters';
import { CategoryData } from './categoryData';

export type CategoriesQueryFiltersType = {
  title?: FilterValueString;
  parent_id?: FilterValueInt;
  created_at?: FilterValueString;
};

export type QueryCategoriesResponseType = {
  statusCode: number;
  data: {
    limit: number;
    offset: number;
    page: number;
    totalRows: number;
    totalPages: number;
    items: CategoryData[];
  };
};

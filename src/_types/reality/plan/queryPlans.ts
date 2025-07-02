import { FilterValueInt, FilterValueString } from 'src/_types/site/filters';
import { PlanData } from './planData';

export type PlansQueryFiltersType = {
  title?: FilterValueString;
  description?: FilterValueString;
  price?: FilterValueInt;
  category_id?: FilterValueInt;
  day_length?: FilterValueInt;
  product_limit?: FilterValueInt;
  storage_limit_mb?: FilterValueInt;
  icon_url?: FilterValueString;
  created_at?: FilterValueString;
};

export type QueryPlansResponseType = {
  statusCode: number;
  data: {
    limit: number;
    offset: number;
    page: number;
    totalRows: number;
    totalPages: number;
    items: PlanData[];
  };
};

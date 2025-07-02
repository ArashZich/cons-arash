import { FilterValueString, FilterValueBoolean, FilterValueInt } from 'src/_types/site/filters';
import { ResponseViewData } from './viewData';

export type ViewQueryFiltersType = {
  name?: FilterValueString;
  ip?: FilterValueString;
  browser_agent?: FilterValueString;
  operating_sys?: FilterValueString;
  device?: FilterValueString;
  is_ar?: FilterValueBoolean;
  is_3d?: FilterValueBoolean;
  is_vr?: FilterValueBoolean;
  url?: FilterValueString;
  product_uid?: FilterValueString;
  time_range?: FilterValueString;
  created_at?: FilterValueString;
  organization_id?: FilterValueInt;
};

export type QueryViewsResponseType = {
  statusCode: number;
  data: {
    limit: number;
    offset: number;
    page: number;
    totalRows: number;
    totalPages: number;
    items: ResponseViewData;
  };
};

export type FormatFile = 'csv' | 'json';
export type Duration = 'one_week' | 'one_month' | 'three_months' | 'six_months' | 'one_year';

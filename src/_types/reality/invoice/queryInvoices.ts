import { FilterValueInt, FilterValueString } from 'src/_types/site/filters';
import { InvoiceData } from './invoiceData';

export type InvoicesQueryFiltersType = {
  invoice_unique_code?: FilterValueString;
  from_name?: FilterValueString;
  from_address?: FilterValueString;
  from_phone_number?: FilterValueString;
  from_email?: FilterValueString;
  to_name?: FilterValueString;
  to_address?: FilterValueString;
  to_phone_number?: FilterValueString;
  to_email?: FilterValueString;
  to_postal_code?: FilterValueString;
  status?: FilterValueString;
  discount_amount?: FilterValueInt;
  suspended_at?: FilterValueString;
  total_amount?: FilterValueInt;
  coupon_id?: FilterValueInt;
  tax_amount?: FilterValueInt;
  created_at?: FilterValueString;
  organization_id?: FilterValueInt;
};

export type QueryInvoicesResponseType = {
  statusCode: number;
  data: {
    limit: number;
    offset: number;
    page: number;
    totalRows: number;
    totalPages: number;
    items: InvoiceData[];
  };
};

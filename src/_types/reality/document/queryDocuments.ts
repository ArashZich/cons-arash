import { FilterValueInt, FilterValueString } from 'src/_types/site/filters';
import { DocumentDataType } from './documentData';

export type DocumentsQueryFiltersType = {
  title?: FilterValueString;
  mime_type?: FilterValueString;
  Preview_uri?: FilterValueString;
  product_id?: FilterValueInt;
  order?: FilterValueInt;
  size_mb?: FilterValueString;
  created_at?: FilterValueString;
  product_uid?: FilterValueString;
};

export type QueryDocumentsResponseType = {
  statusCode: number;
  data: {
    limit: number;
    offset: number;
    page: number;
    totalRows: number;
    totalPages: number;
    items: DocumentDataType[];
  };
};

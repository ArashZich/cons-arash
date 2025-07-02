import { FilterValueString, FilterValueBoolean } from 'src/_types/site/filters';
import { PostData } from './postData';

export type PostQueryFiltersType = {
  title?: FilterValueString;
  created_at?: FilterValueString;
  published?: FilterValueBoolean;
};

export type QueryPostResponseType = {
  statusCode: number;
  data: {
    items: PostData[];
    limit: number;
    offset: number;
    page: number;
    totalRows: number;
    totalPages: number;
  };
};

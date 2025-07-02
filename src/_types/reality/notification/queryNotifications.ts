import { FilterValueInt, FilterValueString } from 'src/_types/site/filters';
import { NotificationData } from './notificationData';

export type NotificationQueryFiltersType = {
  title?: FilterValueString;
  message?: FilterValueString;
  type?: FilterValueString;
  user_id?: FilterValueInt;
  category_id?: FilterValueInt;
  organization_id?: FilterValueInt;
  created_at?: FilterValueString;
  is_read?: FilterValueInt; // use 0 for false and 1 for true
};

export type QueryNotificationsResponseType = {
  statusCode: number;
  data: {
    limit: number;
    offset: number;
    page: number;
    totalRows: number;
    totalPages: number;
    items: NotificationData[];
  };
};

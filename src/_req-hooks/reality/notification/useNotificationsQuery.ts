import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  NotificationQueryFiltersType,
  QueryNotificationsResponseType,
} from 'src/_types/reality/notification/queryNotifications';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import QueryNotifications from 'src/_requests/reality/notification/queryNotifications';

type NotificationsQueryParamsType = {
  page?: number;
  per_page?: number;
  order?: string;
  order_by?: string;
  filters?: NotificationQueryFiltersType;
};

export function useNotificationsQuery(
  queryFnArgs: NotificationsQueryParamsType,
  options?: UseQueryOptions<QueryNotificationsResponseType, ErrorResponse>
) {
  const queryKey = ['getAllNotificationsQuery', JSON.stringify(queryFnArgs)];

  return useQuery<QueryNotificationsResponseType, ErrorResponse>(
    queryKey,
    async (): Promise<QueryNotificationsResponseType> =>
      QueryNotifications(
        queryFnArgs.page || 1,
        queryFnArgs.per_page || 10,
        queryFnArgs.order || 'desc',
        queryFnArgs.order_by || 'id',
        queryFnArgs.filters || ({} as NotificationQueryFiltersType)
      ),
    options
  );
}

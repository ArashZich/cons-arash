import { AxiosResponse } from 'axios';
import {
  NotificationQueryFiltersType,
  QueryNotificationsResponseType,
} from 'src/_types/reality/notification/queryNotifications';
import { reality } from 'src/_clients';

export default async function QueryNotifications(
  page: number,
  per_page: number,
  order: string,
  order_by: string,
  filters: NotificationQueryFiltersType
): Promise<QueryNotificationsResponseType> {
  /* eslint-disable-next-line */
  const response = await reality.get<void, AxiosResponse<QueryNotificationsResponseType>>(
    '/api/v1/notifications',
    {
      params: {
        page,
        per_page,
        order,
        order_by,
        filters: JSON.stringify(filters),
      },
    }
  );

  return response.data;
}

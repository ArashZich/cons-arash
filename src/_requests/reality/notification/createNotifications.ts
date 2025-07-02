import { AxiosResponse } from 'axios';
import {
  CreateNotificationsRequestBodyType,
  CreateNotificationsResponseType,
} from 'src/_types/reality/notification/createNotifications';
import { reality } from 'src/_clients';

export default async function CreateNotifications(
  data: CreateNotificationsRequestBodyType
): Promise<CreateNotificationsResponseType> {
  const response = await reality.post<
    CreateNotificationsRequestBodyType,
    AxiosResponse<CreateNotificationsResponseType>
  >(`/api/v1/notifications`, data);

  return response.data;
}

import { AxiosResponse } from 'axios';
import {
  UpdateNotificationRequestBodyType,
  UpdateNotificationResponseType,
} from 'src/_types/reality/notification/updateNotifications';
import { reality } from 'src/_clients';

export default async function UpdateCategory({
  notification,
  id,
}: UpdateNotificationRequestBodyType): Promise<UpdateNotificationResponseType> {
  const response = await reality.put<
    UpdateNotificationRequestBodyType,
    AxiosResponse<UpdateNotificationResponseType>
  >(`/api/v1/notifications/${id}`, notification);

  return response.data;
}

import { NotificationData } from './notificationData';

export interface CreateNotificationsRequestBodyType {
  title: string;
  message: string;
  type: string;
  user_ids?: number[];
  category_id?: number | any;
  organization_id?: number | null;
}

export type CreateNotificationsResponseType = {
  statusCode: number;
  data: NotificationData[];
};

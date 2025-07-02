import { NotificationData } from './notificationData';

export type UpdateNotificationRequestBodyType = {
  notification: { is_read: boolean };
  id: number;
};

export type UpdateNotificationResponseType = {
  statusCode: number;
  data: NotificationData;
};

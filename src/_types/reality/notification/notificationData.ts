export type NotificationData = {
  ID: number;
  title: string;
  message: string;
  type: string;
  user_id: number;
  category_id?: number;
  organization_id?: number;
  is_read: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: number;
};

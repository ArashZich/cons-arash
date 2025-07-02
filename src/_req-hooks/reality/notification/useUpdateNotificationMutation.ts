// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  UpdateNotificationRequestBodyType,
  UpdateNotificationResponseType,
} from 'src/_types/reality/notification/updateNotifications';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import { UpdateNotification } from 'src/_requests/reality/notification';

export function useUpdateNotificationMutation(
  options?: UseMutationOptions<
    UpdateNotificationResponseType,
    ErrorResponse,
    UpdateNotificationRequestBodyType
  >
) {
  return useMutation<
    UpdateNotificationResponseType,
    ErrorResponse,
    UpdateNotificationRequestBodyType
  >((data: UpdateNotificationRequestBodyType) => UpdateNotification(data), options);
}

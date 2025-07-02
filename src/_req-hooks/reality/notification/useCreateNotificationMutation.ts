// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { CreateNotification } from 'src/_requests/reality/notification';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import {
  CreateNotificationsRequestBodyType,
  CreateNotificationsResponseType,
} from 'src/_types/reality/notification/createNotifications';

export function useCreateNotificationMutation(
  options?: UseMutationOptions<
    CreateNotificationsResponseType,
    ErrorResponse,
    CreateNotificationsRequestBodyType
  >
) {
  return useMutation<
    CreateNotificationsResponseType,
    ErrorResponse,
    CreateNotificationsRequestBodyType
  >((data: CreateNotificationsRequestBodyType) => CreateNotification(data), options);
}

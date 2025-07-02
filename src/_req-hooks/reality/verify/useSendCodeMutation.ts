// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import SendCode from 'src/_requests/reality/verify/sendCode';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import { SendCodeRequestBodyType, SendCodeResponseType } from 'src/_types/reality/verify/sendCode';

export function useSendCodeMutation(
  options?: UseMutationOptions<SendCodeResponseType, ErrorResponse, SendCodeRequestBodyType>
) {
  return useMutation<SendCodeResponseType, ErrorResponse, SendCodeRequestBodyType>(
    (data: SendCodeRequestBodyType) => SendCode(data),
    options
  );
}

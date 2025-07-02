// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AddAffiliateCodeUser } from 'src/_requests/reality/user';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import {
  AddAffiliateCodeRequestBodyType,
  AddAffiliateCodeResponseType,
} from 'src/_types/reality/user/affiliateData';

export function useAddAffiliateCodeUserMutation(
  options?: UseMutationOptions<
    AddAffiliateCodeResponseType,
    ErrorResponse,
    AddAffiliateCodeRequestBodyType
  >
) {
  return useMutation<AddAffiliateCodeResponseType, ErrorResponse, AddAffiliateCodeRequestBodyType>(
    (data: AddAffiliateCodeRequestBodyType) => AddAffiliateCodeUser(data),
    options
  );
}

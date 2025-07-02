import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import CreatePackageByAdmin from 'src/_requests/reality/package/createPackageByAdmin';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import {
  CreatePackageByAdminRequestBodyType,
  CreatePackageByAdminResponseType,
} from 'src/_types/reality/package/createPackageByAdmin';

export function useCreatePackageByAdminMutation(
  options?: UseMutationOptions<
    CreatePackageByAdminResponseType,
    ErrorResponse,
    CreatePackageByAdminRequestBodyType
  >
) {
  return useMutation<
    CreatePackageByAdminResponseType,
    ErrorResponse,
    CreatePackageByAdminRequestBodyType
  >((data: CreatePackageByAdminRequestBodyType) => CreatePackageByAdmin(data), options);
}

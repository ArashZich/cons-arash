// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import CreatePackage from 'src/_requests/reality/package/createPackage';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import {
  CreatePackageRequestBodyType,
  CreatePackageResponseType,
} from 'src/_types/reality/package/createPackage';

// type CreateCategoryMutationType = {
//   requestBody: CreatePackageRequestBodyType;
// };

export function useCreatePackageMutation(
  options?: UseMutationOptions<
    CreatePackageResponseType,
    ErrorResponse,
    CreatePackageRequestBodyType
  >
) {
  return useMutation<CreatePackageResponseType, ErrorResponse, CreatePackageRequestBodyType>(
    (data: CreatePackageRequestBodyType) => CreatePackage(data),
    options
  );
}

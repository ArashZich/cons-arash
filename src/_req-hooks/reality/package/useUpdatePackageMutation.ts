// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  UpdatePackageRequestBodyType,
  UpdatePackageResponseType,
} from 'src/_types/reality/package/updatePackage';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import UpdatePackage from 'src/_requests/reality/package/updatePackage';

export function useUpdatePackageMutation(
  options?: UseMutationOptions<
    UpdatePackageResponseType,
    ErrorResponse,
    UpdatePackageRequestBodyType
  >
) {
  return useMutation<UpdatePackageResponseType, ErrorResponse, UpdatePackageRequestBodyType>(
    (data: UpdatePackageRequestBodyType) => UpdatePackage(data),
    options
  );
}

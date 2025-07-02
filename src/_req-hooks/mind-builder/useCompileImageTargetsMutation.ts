// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import CompileImageTargets from 'src/_requests/mind-builder/compile-image-targets';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import {
  CompileImageRequestBodyType,
  CompileImageResponseType,
} from 'src/_types/mind-builder/compile-image-targets';

export function useCompileImageTargetsMutation(
  options?: UseMutationOptions<CompileImageResponseType, ErrorResponse, CompileImageRequestBodyType>
) {
  return useMutation<CompileImageResponseType, ErrorResponse, CompileImageRequestBodyType>(
    (data: CompileImageRequestBodyType) => CompileImageTargets(data),
    options
  );
}

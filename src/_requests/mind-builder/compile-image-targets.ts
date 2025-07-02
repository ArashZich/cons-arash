import { AxiosResponse } from 'axios';
import {
  CompileImageRequestBodyType,
  CompileImageResponseType,
} from 'src/_types/mind-builder/compile-image-targets';
import { mindBuilder } from 'src/_clients';

export default async function CompileImageTargets(
  data: CompileImageRequestBodyType
): Promise<CompileImageResponseType> {
  const response = await mindBuilder.post<
    CompileImageRequestBodyType,
    AxiosResponse<CompileImageResponseType>
  >('/compile-image-targets', data);

  // Assuming the response is an array of file upload results
  return response.data;
}

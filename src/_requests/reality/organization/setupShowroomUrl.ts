import { AxiosResponse } from 'axios';
import {
  SetupShowroomUrlRequestBodyType,
  SetupShowroomUrlResponseType,
} from 'src/_types/reality/organization/setupShowroomUrl';
import { reality } from 'src/_clients';

export default async function SetupShowroomUrl(
  data: SetupShowroomUrlRequestBodyType
): Promise<SetupShowroomUrlResponseType> {
  const response = await reality.post<
    SetupShowroomUrlRequestBodyType,
    AxiosResponse<SetupShowroomUrlResponseType>
  >(`/api/v1/setup-showroom-url`, data);

  return response.data;
}

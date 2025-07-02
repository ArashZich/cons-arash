import { AxiosResponse } from 'axios';
import {
  SetupDomainRequestBodyType,
  SetupDomainResponseType,
} from 'src/_types/reality/organization/setupDomain';
import { reality } from 'src/_clients';

export default async function SetupDomain(
  data: SetupDomainRequestBodyType
): Promise<SetupDomainResponseType> {
  const response = await reality.post<
    SetupDomainRequestBodyType,
    AxiosResponse<SetupDomainResponseType>
  >(`/api/v1/setup-domain`, data);

  return response.data;
}

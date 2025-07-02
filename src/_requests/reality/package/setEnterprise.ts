import { AxiosResponse } from 'axios';
import {
  SetEnterpriseRequestBodyType,
  SetEnterpriseResponseType,
} from 'src/_types/reality/package/setEnterprise';
import { reality } from 'src/_clients';

export default async function SetEnterprise(
  data: SetEnterpriseRequestBodyType
): Promise<SetEnterpriseResponseType> {
  const response = await reality.post<
    SetEnterpriseRequestBodyType,
    AxiosResponse<SetEnterpriseResponseType>
  >(`/api/v1/packages/set-enterprise`, data);

  return response.data;
}

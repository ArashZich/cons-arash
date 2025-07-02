import { AxiosResponse } from 'axios';
import {
  UpdateOrganizationRequestBodyType,
  UpdateOrganizationResponseType,
} from 'src/_types/reality/organization/updateOrganization';
import { reality } from 'src/_clients';

export default async function UpdateOrganization({
  organization,
  ID,
}: UpdateOrganizationRequestBodyType): Promise<UpdateOrganizationResponseType> {
  const response = await reality.put<
    UpdateOrganizationRequestBodyType,
    AxiosResponse<UpdateOrganizationResponseType>
  >(`/api/v1/organizations/${ID}`, organization);

  return response.data;
}

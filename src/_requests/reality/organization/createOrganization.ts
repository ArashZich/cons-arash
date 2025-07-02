import { AxiosResponse } from 'axios';
import {
  CreateOrganizationRequestBodyType,
  CreateOrganizationResponseType,
} from 'src/_types/reality/organization/createOrganization';
import { reality } from 'src/_clients';

export default async function CreateOrganization(
  data: CreateOrganizationRequestBodyType
): Promise<CreateOrganizationResponseType> {
  const response = await reality.post<
    CreateOrganizationRequestBodyType,
    AxiosResponse<CreateOrganizationResponseType>
  >(`/api/v1/organizations`, data);

  return response.data;
}

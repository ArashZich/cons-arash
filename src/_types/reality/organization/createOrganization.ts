import { OrganizationDataType } from './organizationData';

export type CreateOrganizationRequestBodyType = {
  name?: string;
  domain?: string;
  national_code?: string;
  individual_address?: string;
  legal_address?: string;
  zip_code?: string;
  company_registration_number?: string;
  company_name?: string;
  industry?: string;
  company_size?: number;
  category_id?: number;
  phone_number?: string;
  website?: string;
  company_logo?: string;
  email?: string;
  is_individual?: boolean;
};

export type CreateOrganizationResponseType = {
  statusCode: number;
  data: OrganizationDataType;
};

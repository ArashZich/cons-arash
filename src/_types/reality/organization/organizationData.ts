import { PackageDataType } from 'src/_types/reality/package/packageData';

export interface OrganizationDataType {
  ID: number;
  name: string;
  industry: string;
  company_size: number;
  phone_number: string;
  website: string;
  company_logo: string;
  user: null;
  user_id: number;
  products: null;
  packages: PackageDataType[];
  created_at: Date;
  updated_at: Date;
  deleted_at: number;
  category: { title: string };
  category_id: number;
  company_name: string;
  company_registration_number: string;
  domain: string;
  email: string;
  individual_address: string;
  is_individual: boolean;
  legal_address: string;
  national_code: string;
  zip_code: string;
  organization_uid: string;
  showroom_url: string;
  organization_type: string;
}

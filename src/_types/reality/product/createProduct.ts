export interface CreateProductRequestBodyType {
  name: string;
  thumbnail_uri: string;
  category_id: number;
  organization_id: number;
  documents: {
    title: string;
    file_uri: string;
    preview_uri: string;
    phone_number?: string;
    cell_phone?: string;
    website?: string;
    telegram?: string;
    instagram?: string;
    linkedin?: string;
    location?: string;
    size?: string;
    order?: number;
    size_mb: number;
    asset_uri?: string;
    organization_id: number;
  }[];
  disabled?: boolean;
}


export type CreateProductResponseType = {
  statusCode: number;
  data: {
    ID: number;
    category: null;
    name: string;
    thumbnail_uri: string;
    category_id: number;
    organization: null;
    organization_id: number;
    package: null;
    package_id: number;
    documents: {
      ID: number;
      cell_phone: string;
      created_at: string;
      deleted_at: number;
      file_uri: string;
      asset_uri: string;
      instagram: string;
      linkedin: string;
      location: string;
      order: number;
      owner_id: number;
      owner_type: string;
      phone_number: string;
      preview_uri: string;
      size: string;
      size_mb: number;
      telegram: string;
      title: string;
      updated_at: string;
      user: null;
      user_id: number;
      website: string;
    }[];
    disabled: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    disabled_at: null;
    user: null;
    user_id: number;
  };
};

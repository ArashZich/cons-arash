export interface UpdateDocumentRequestType {
  title?: string;
  shop_link?: string;
}

export interface UpdateDocumentResponseType {
  statusCode: number;
  data: {
    ID: number;
    title: string;
    shop_link: string;
    file_uri: string;
    asset_uri: string;
    preview_uri: string;
    product_uid: string;
    order: number;
    size_mb: number;
    user_id: number;
    organization_id: number;
    category_id: number;
    phone_number: string;
    cell_phone: string;
    website: string;
    telegram: string;
    instagram: string;
    linkedin: string;
    location: string;
    size: string;
    owner_id: number;
    owner_type: string;
    created_at: string;
    updated_at: string;
    deleted_at: number;
  };
}

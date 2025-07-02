export interface CreatePackageByAdminRequestBodyType {
  user_id: number;
  plan_id: number;
  organization_id: number;
}

export type CreatePackageByAdminResponseType = {
  statusCode: number;
  data: {
    ID: number;
    icon_url: string;
    product_limit: number;
    storage_limit_mb: number;
    price: number;
    plan: null;
    plan_id: number;
    category: null;
    category_id: number;
    organization: null;
    organization_id: number;
    products: null;
    expired_at: Date;
    user: null;
    user_id: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: number;
  };
};

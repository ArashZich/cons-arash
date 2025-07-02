export interface CreateCategoryRequestBodyType {
  icon_url?: string;
  parent_id?: number | null;
  title?: string;
  accepted_file_type?: string;
  url?: string;
  ar_placement?: string;
}

export type CreateCategoryResponseType = {
  statusCode: number;
  data: {
    ID: number;
    children: null;
    parent: null;
    parent_id: null;
    title: string;
    icon_url: string;
    color: string;
    user: null;
    user_id: number;
    rate: number;
    recipes: null;
    created_at: Date;
    updated_at: Date;
    deleted_at: number;
    accepted_file_type: string;
  };
};

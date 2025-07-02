export type UpdateCategoryRequestBodyType = {
  category: {
    icon_url: string;
    parent_id: number;
    title: string;
    accepted_file_type: string;
    url: string;
    ar_placement: string;
  };
  ID?: number;
};

export type UpdateCategoryResponseType = {
  statusCode: number;
  data: {
    ID: number;
    children: null;
    parent: null;
    parent_id: null;
    title: string;
    icon_url: string;
    user: null;
    user_id: number;
    rate: number;
    recipes: null;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
    accepted_file_type: string;
  };
};

import { UserData } from 'src/_types/reality/user/userData';

type accepted_file_type = 'glb' | 'image' | 'video' | 'multi-images' | 'complex';

export type CategoryData = {
  ID: number;
  children: CategoryData[];
  parent: CategoryData;
  parent_id: number;
  title: string;
  icon_url: string;
  color: string;
  user: UserData;
  created_at: Date;
  updated_at: Date;
  plans: null;
  products: null;
  user_id: number;
  deleted_at: number;
  accepted_file_type: accepted_file_type;
  ar_placement: string;
  url: string;
};

import { UserData } from 'src/_types/reality/user/userData';
import { ProductData } from '../product/productData';

export type ViewData = {
  ID: number;
  name: string;
  ip: string;
  browser_agent: string;
  operating_sys: string;
  device: string;
  is_ar: boolean;
  is_3d: boolean;
  is_vr: boolean;
  url: string;
  product_id: number;
  product: ProductData;
  user: UserData;
  user_id: number;
  created_at: Date;
  deleted_at: number;
  product_uid: string;
  visit_duration: number;
};

export type ResponseViewData = {
  browsers: string[];
  is_3d_len: number;
  is_ar_len: number;
  operating_sys: string[];
  ips: string[];
  total: number;
  views: ViewData[];
  visit_duration: number;
};

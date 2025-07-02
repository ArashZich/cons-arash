import { ProductData } from 'src/_types/reality/product/productData';

export interface AnalyticsViewState {
  search: string;
  active: boolean;
  currentTab: string;
  project: ProductData[] | null;
}

export type AnalyticsViewChangedPayloadType = {
  search?: string;
  active?: boolean;
  currentTab?: string;
  project?: ProductData[] | null;
};

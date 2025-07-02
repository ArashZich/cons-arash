import { PlanData } from './planData';

export type UpdatePlanRequestBodyType = {
  data: {
    title: string;
    description: string;
    price: number;
    discounted_price: number;
    categories: number[];
    day_length: number;
    product_limit: number;
    storage_limit_mb: number;
    icon_url: string;
  };
  ID?: Number;
};

export type UpdatePlanResponseType = {
  statusCode: number;
  data: PlanData;
};

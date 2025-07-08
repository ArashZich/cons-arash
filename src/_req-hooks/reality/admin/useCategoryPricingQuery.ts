// src/_req-hooks/reality/admin/useCategoryPricingQuery.ts

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  GetCategoryPricingList,
  GetCategoryPricing,
} from 'src/_requests/reality/admin/getCategoryPricing';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import {
  GetCategoryPricingListResponseType,
  GetCategoryPricingResponseType,
} from 'src/_types/reality/admin/categoryPricing';

export function useCategoryPricingListQuery(
  options?: UseQueryOptions<GetCategoryPricingListResponseType, ErrorResponse>
) {
  const queryKey = ['getAllCategoryPricingQuery'];

  return useQuery<GetCategoryPricingListResponseType, ErrorResponse>(
    queryKey,
    async (): Promise<GetCategoryPricingListResponseType> => GetCategoryPricingList(),
    options
  );
}

type CategoryPricingQueryParamsType = {
  categoryId: number;
};

export function useCategoryPricingQuery(
  queryFnArgs: CategoryPricingQueryParamsType,
  options?: UseQueryOptions<GetCategoryPricingResponseType, ErrorResponse>
) {
  const queryKey = ['getCategoryPricingQuery', queryFnArgs.categoryId];

  return useQuery<GetCategoryPricingResponseType, ErrorResponse>(
    queryKey,
    async (): Promise<GetCategoryPricingResponseType> => GetCategoryPricing(queryFnArgs.categoryId),
    options
  );
}

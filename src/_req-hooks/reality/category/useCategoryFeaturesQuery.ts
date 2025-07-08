// src/_req-hooks/reality/category/useCategoryFeaturesQuery.ts

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import GetCategoryFeatures from 'src/_requests/reality/category/getCategoryFeatures';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import { GetCategoryFeaturesResponseType } from 'src/_types/reality/category/categoryFeatures';

type CategoryFeaturesQueryParamsType = {
  categoryId: number;
};

export function useCategoryFeaturesQuery(
  queryFnArgs: CategoryFeaturesQueryParamsType,
  options?: UseQueryOptions<GetCategoryFeaturesResponseType, ErrorResponse>
) {
  const queryKey = ['getCategoryFeaturesQuery', queryFnArgs.categoryId];

  return useQuery<GetCategoryFeaturesResponseType, ErrorResponse>(
    queryKey,
    async (): Promise<GetCategoryFeaturesResponseType> =>
      GetCategoryFeatures(queryFnArgs.categoryId),
    options
  );
}

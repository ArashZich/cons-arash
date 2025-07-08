// src/_req-hooks/reality/admin/usePlanFeaturesQuery.ts

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { GetPlanFeatures, GetPlanFeature } from 'src/_requests/reality/admin/getPlanFeatures';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import {
  GetPlanFeaturesResponseType,
  GetPlanFeatureResponseType,
} from 'src/_types/reality/admin/planFeatures';

export function usePlanFeaturesQuery(
  options?: UseQueryOptions<GetPlanFeaturesResponseType, ErrorResponse>
) {
  const queryKey = ['getAllPlanFeaturesQuery'];

  return useQuery<GetPlanFeaturesResponseType, ErrorResponse>(
    queryKey,
    async (): Promise<GetPlanFeaturesResponseType> => GetPlanFeatures(),
    options
  );
}

type PlanFeatureQueryParamsType = {
  id: number;
};

export function usePlanFeatureQuery(
  queryFnArgs: PlanFeatureQueryParamsType,
  options?: UseQueryOptions<GetPlanFeatureResponseType, ErrorResponse>
) {
  const queryKey = ['getPlanFeatureQuery', queryFnArgs.id];

  return useQuery<GetPlanFeatureResponseType, ErrorResponse>(
    queryKey,
    async (): Promise<GetPlanFeatureResponseType> => GetPlanFeature(queryFnArgs.id),
    options
  );
}

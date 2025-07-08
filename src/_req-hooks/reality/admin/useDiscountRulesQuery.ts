// src/_req-hooks/reality/admin/useDiscountRulesQuery.ts

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { GetDiscountRules, GetDiscountRule } from 'src/_requests/reality/admin/getDiscountRules';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import {
  GetDiscountRulesResponseType,
  GetDiscountRuleResponseType,
} from 'src/_types/reality/admin/discountRules';

export function useDiscountRulesQuery(
  options?: UseQueryOptions<GetDiscountRulesResponseType, ErrorResponse>
) {
  const queryKey = ['getAllDiscountRulesQuery'];

  return useQuery<GetDiscountRulesResponseType, ErrorResponse>(
    queryKey,
    async (): Promise<GetDiscountRulesResponseType> => GetDiscountRules(),
    options
  );
}

type DiscountRuleQueryParamsType = {
  id: number;
};

export function useDiscountRuleQuery(
  queryFnArgs: DiscountRuleQueryParamsType,
  options?: UseQueryOptions<GetDiscountRuleResponseType, ErrorResponse>
) {
  const queryKey = ['getDiscountRuleQuery', queryFnArgs.id];

  return useQuery<GetDiscountRuleResponseType, ErrorResponse>(
    queryKey,
    async (): Promise<GetDiscountRuleResponseType> => GetDiscountRule(queryFnArgs.id),
    options
  );
}

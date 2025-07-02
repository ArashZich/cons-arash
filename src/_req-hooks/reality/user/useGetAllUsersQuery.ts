import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import { GetAllUsersResponseType } from 'src/_types/reality/user/getAllUsers';
import { GetAllUsers } from 'src/_requests/reality/user';

type getAllUsersType = {
  page?: number;
  per_page?: number;
  order?: string;
  order_by?: string;
  affiliate_codes?: string[] | any;
  has_organization?: string; // اضافه شده
  has_packages?: string; // اضافه شده
};

// Fetch users based on pagination and sorting
export function useGetAllUsersQuery(
  queryFnArgs: getAllUsersType,
  options?: UseQueryOptions<GetAllUsersResponseType, ErrorResponse>
) {
  const {
    page = 1,
    per_page = 10,
    order = 'asc',
    order_by = 'id',
    affiliate_codes = [],
    has_organization = '', // مقدار پیش‌فرض
    has_packages = '', // مقدار پیش‌فرض
  } = queryFnArgs;

  const queryKey = [
    'getAllUsersQuery',
    page,
    per_page,
    order,
    order_by,
    affiliate_codes,
    has_organization,
    has_packages,
  ];

  return useQuery<GetAllUsersResponseType, ErrorResponse>(
    queryKey,
    () =>
      GetAllUsers(page, per_page, order, order_by, affiliate_codes, has_organization, has_packages),
    {
      keepPreviousData: true,
      ...options,
    }
  );
}

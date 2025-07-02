import { AxiosResponse } from 'axios';
import { DashboardResponseType } from 'src/_types/bytebase/dashboard';
import { bytebase } from 'src/_clients';

export default async function GetDashboard(): Promise<DashboardResponseType> {
  const response = await bytebase.get<void, AxiosResponse<DashboardResponseType>>(
    `/api/v1/files/dashboard`
  );

  return response.data;
}

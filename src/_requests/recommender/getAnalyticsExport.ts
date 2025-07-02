// getAnalyticsExport.ts

import { PeriodType } from 'src/_types/recommender/analytics';
import { recommender } from 'src/_clients';

export async function GetAnalyticsExport(
  period: PeriodType,
  organization_uid: string,
  format: 'json' | 'csv'
): Promise<Blob> {
  const response = await recommender.get('/api/v1/analytics/export', {
    params: {
      period,
      organization_uid,
      format,
    },
    responseType: 'blob', // مهم: برای دریافت فایل
  });

  return response.data;
}

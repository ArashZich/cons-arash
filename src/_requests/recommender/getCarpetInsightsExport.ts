// getCarpetInsightsExport.ts
import { recommender } from 'src/_clients';

export async function GetCarpetInsightsExport(
  organization_uid: string,
  days: number = 30,
  limit: number = 10000
): Promise<Blob> {
  const response = await recommender.get(`/api/v1/carpet-insights/${organization_uid}/export`, {
    params: {
      days,
      limit,
    },
    responseType: 'blob', // مهم: برای دریافت فایل
  });

  return response.data;
}

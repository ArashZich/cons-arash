// src/_requests/reality/view/exportViews.ts
import { AxiosResponse } from 'axios';
import { ViewQueryFiltersType, FormatFile, Duration } from 'src/_types/reality/view/queryViews';
import { reality } from 'src/_clients';

export interface ExportViewsRequest {
  format: FormatFile;
  duration: Duration;
  filters?: ViewQueryFiltersType;
}

export default async function ExportViews(request: ExportViewsRequest): Promise<Blob> {
  // اطمینان از ساختار صحیح فیلترها قبل از ارسال
  const payload = {
    format: request.format,
    duration: request.duration,
    filters: request.filters || {},
  };

  const response = await reality.post<void, AxiosResponse<Blob>>('/api/v1/views/export', payload, {
    responseType: 'blob',
  });

  return response.data;
}

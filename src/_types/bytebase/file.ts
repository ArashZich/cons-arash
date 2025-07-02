export interface UploadFileRequestBodyType {
  files: any[];
  optimize?: boolean; // پارامتر جدید برای تعیین بهینه‌سازی
}

export type UploadFileResponseType = {
  statusCode: number;
  data: string[];
};

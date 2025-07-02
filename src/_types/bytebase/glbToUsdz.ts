export interface UploadFileRequestBodyType {
  files: any[];
  optimize?: boolean; // پارامتر جدید برای تعیین بهینه‌سازی
}

export type UploadGlbToUsdzResponseType = {
  statusCode: number;
  data: {
    glb: string;
    usdz: string;
  }[];
};

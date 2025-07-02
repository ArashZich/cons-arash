export interface UploadBatchFileRequestBodyType {
  files: File[];
  width: string;
  length: string;
  isCircle: boolean;
  isTile: boolean;
  tiles?: string;
  isWall: boolean;
}

export interface BatchUploadResultItem {
  poster: string;
  glb: string;
  usdz: string;
}

export type UploadBatchImageToGlbUsdzResponseType = {
  statusCode: number;
  data: BatchUploadResultItem[];
};

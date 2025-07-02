export interface UploadFileRequestBodyType {
  files: any[];
  width: string;
  length: string;
  isCircle: boolean;
  isTile: boolean;
  tiles: string;
  isWall: boolean;
}

export type UploadImageToGlbUsdzResponseType = {
  statusCode: number;
  data: {
    glb: string;
    poster: string;
    usdz: string;
  }[];
};

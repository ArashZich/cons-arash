export interface CompileImageRequestBodyType {
  imageUrl: string;
}

export type CompileImageResponseType = {
  status: boolean;
  message: string;
  fileUrl: string;
};

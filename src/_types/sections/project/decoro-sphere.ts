export type IState = {
  glb: string;
  poster: string;
  usdz: string;
};

export interface FormValues {
  width: string;
  length: string;
  size: string;
  files: File[];
  isCircle: boolean;
  isTile: boolean;
  numberOfVertical: string;
  numberOfHorizontal: string;
}

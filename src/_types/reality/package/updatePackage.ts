import { PackageDataType } from './packageData';

export type UpdatePackageRequestBodyType = {
  data: {
    product_limit: number;
    storage_limit_mb: number;
    expired_at: string;
  };
  ID?: Number;
};

export type UpdatePackageResponseType = {
  statusCode: number;
  data: PackageDataType;
};

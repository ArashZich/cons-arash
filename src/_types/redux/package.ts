import { PackageDataType } from 'src/_types/reality/package/packageData';

export type PackageState = {
  package: PackageDataType | null;
};

export type PackageChangedPayloadType = PackageDataType;

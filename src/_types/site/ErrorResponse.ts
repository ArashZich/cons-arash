/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ErrDataType } from './ErrDataType';

export type ErrorResponse = {
  statusCode?: number;
  data?: Array<ErrDataType> | any;
  message?: string;
};

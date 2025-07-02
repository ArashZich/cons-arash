import * as yup from 'yup';
import { TFunction } from 'i18next';

import {
  project_carpet_size,
  project_frame_size,
  project_wallpaper_size,
  project_stone_ceramic_size,
  curtain_size,
  project_carpet_main,
} from './project-carpet-wallpaper-flooring';

export const createDecoroSphereValidationSchema = (t: TFunction) =>
  yup
    .object({
      size: yup.string().required(t('project.size_required')),
      width: yup.string().when('size', {
        is: (value: string) => value === '0',
        then: (schema: yup.StringSchema) => schema.required(t('project.length_required')),
      }),
      length: yup.string().when('size', {
        is: (value: string) => value === '0',
        then: (schema: yup.StringSchema) =>
          // eslint-disable-next-line func-names
          schema.test('is-circle-check', t('project.width_required'), function (value) {
            // "this.parent" accesses other values in the schema
            const { isCircle } = this.parent;
            return isCircle ? true : !!value; // If isCircle is true, pass validation, else check value
          }),
      }),
      // length: yup.string().when('size', {
      //   is: (value: string) => value === '0',
      //   then: (schema: yup.StringSchema) => schema.required(t('project.width_required')),
      // }),
      isTile: yup.boolean(),
      numberOfVertical: yup.string().when(['size', 'isTile'], {
        is: (size: string, isTile: boolean) => size === '0' && isTile,
        then: (schema: yup.StringSchema) => schema.required(t('project.number_put_required')),
      }),
      numberOfHorizontal: yup.string().when(['size', 'isTile'], {
        is: (size: string, isTile: boolean) => size === '0' && isTile,
        then: (schema: yup.StringSchema) => schema.required(t('project.number_put_required')),
      }),
      files: yup
        .mixed()
        .test(
          'files',
          t('project.one_file_required'),
          (value: any) => value !== null && Array.isArray(value) && value.length > 0
        ),
    })
    .required();

export const category_size = (category: string, t: TFunction, isCircle: boolean) => {
  switch (category) {
    case 'carpet':
      return project_carpet_main(t, isCircle);
    case 'frame':
      return project_frame_size(t);
    case 'wallpaper':
      return project_wallpaper_size(t);
    case 'stone_ceramic_flooring':
    case 'stone_ceramic_wall_covering':
      return project_stone_ceramic_size(t);
    case 'curtain':
      return curtain_size(t);
    default:
      return project_carpet_size(t);
  }
};

export const category_tiles = (category: string) => {
  switch (category) {
    case 'carpet':
      return false;
    case 'frame':
      return false;
    case 'wallpaper':
      return true;
    case 'stone_ceramic_flooring':
    case 'stone_ceramic_wall_covering':
      return true;
    case 'curtain':
      return false;
    default:
      return false;
  }
};

export const category_wall_or_flooring = (category: string) => {
  switch (category) {
    case 'carpet':
      return false;
    case 'frame':
      return true;
    case 'wallpaper':
      return true;
    case 'stone_ceramic_flooring':
      return false;
    case 'stone_ceramic_wall_covering':
      return true;
    case 'curtain':
      return true;
    default:
      return false;
  }
};

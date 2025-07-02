// رگال-related constants
export const REGAL_MAX_FILES = 50;
export const REGAL_MAX_SIZE_MB = 1; // 1MB per file

// رگال info for upload component
export const project_image_regal = (t: any) => [
  { label: t('project.regal_image_info_1'), value: 1 },
  { label: t('project.regal_image_info_2'), value: 2 },
  { label: t('project.regal_image_info_3'), value: 3 },
  { label: t('project.regal_image_info_4'), value: 4 },
];

// اضافه کردن رگال به contentMap موجود
export const regalContentMap = [
  'project.regal_guide_1',
  'project.regal_guide_2',
  'project.regal_guide_3',
  'project.regal_guide_4',
  'project.regal_guide_5',
  'project.regal_single_product_info', // توضیح اینکه یک محصول با چندین داکیومنت ساخته می‌شود
];

// رگال rectangular size options
export const regal_size_options = (t: any) => [
  {
    label: t('project.6m'),
    value: '200,300',
  },
  {
    label: t('project.9m'),
    value: '250,350',
  },
  {
    label: t('project.12m'),
    value: '300,400',
  },
  {
    label: t('project.other_size'),
    value: '0',
  },
];

// رگال circular size options
export const regal_circle_size_options = (t: any) => [
  {
    label: t('project.1m'),
    value: '100',
  },
  {
    label: t('project.1_5m'),
    value: '150',
  },
  {
    label: t('project.2m'),
    value: '200',
  },
  {
    label: t('project.other_size'),
    value: '0',
  },
];

// رگال shape options
export const regal_shape_options = (t: any) => [
  {
    label: t('project.square'),
    value: false,
  },
  {
    label: t('project.circle'),
    value: true,
  },
];

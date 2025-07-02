// رگال-related constants
export const REGAL_MAX_FILES = 50;
export const REGAL_MAX_SIZE_MB = 1; // 1MB per file

// رگال info for upload component
export const project_image_regal = (t: any) => [
  t('project.regal_image_info_1'),
  t('project.regal_image_info_2'),
  t('project.regal_image_info_3'),
  t('project.regal_image_info_4'),
  t('project.single_product_multiple_documents'), // اضافه کردن توضیح جدید
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

// رگال size options
export const regal_size_options = (t: any) => [
  { label: t('project.regal_size_small'), value: '100,200' }, // 1x2 متر
  { label: t('project.regal_size_medium'), value: '150,250' }, // 1.5x2.5 متر
  { label: t('project.regal_size_large'), value: '200,300' }, // 2x3 متر
  { label: t('project.regal_size_custom'), value: '0' }, // سفارشی
];

export const project_image_carpet = (t: Function) => [
  {
    label: t('project.project_image_info1'),
    value: 1,
  },
  {
    label: t('project.project_image_info2'),
    value: 2,
  },
  {
    label: t('project.size_each_photo_must_1mb'),
    value: 3,
  },
];

export const project_carpet_size = (t: Function) => [
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

export const project_carpet_circle_size = (t: Function) => [
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

export const project_carpet_main = (t: Function, isCircle: boolean) =>
  isCircle ? project_carpet_circle_size(t) : project_carpet_size(t);

export const project_frame_size = (t: Function) => [
  {
    label: t('project.3040cm'),
    value: '30,40',
  },
  {
    label: t('project.5070cm'),
    value: '50,70',
  },
  {
    label: t('project.7050cm'),
    value: '70,50',
  },
  {
    label: t('project.other_size'),
    value: '0',
  },
];

export const project_wallpaper_size = (t: Function) => [
  {
    label: t('project.70cm'),
    value: '70,280,1x1',
  },
  {
    label: t('project.90cm'),
    value: '90,280,1x1',
  },
  {
    label: t('project.100cm'),
    value: '100,280,1x1',
  },
  {
    label: t('project.other_size'),
    value: '0',
  },
];

export const project_stone_ceramic_size = (t: Function) => [
  {
    label: t('project.40_40'),
    value: '40,40,3x3',
  },
  {
    label: t('project.60_120'),
    value: '60,120,3x3',
  },
  {
    label: t('project.120_240'),
    value: '120,240,3x3',
  },
  {
    label: t('project.other_size'),
    value: '0',
    tiles: '',
  },
];

export const curtain_size = (t: Function) => [
  {
    label: t('project.100_100'),
    value: '100,100',
  },
  {
    label: t('project.120_150'),
    value: '120,150',
  },
  {
    label: t('project.150_225'),
    value: '150,225',
  },
  {
    label: t('project.other_size'),
    value: '0',
  },
];

export const carpet_shape = (t: Function) => [
  {
    label: t('project.square'),
    value: false,
  },
  {
    label: t('project.circle'),
    value: true,
  },
];

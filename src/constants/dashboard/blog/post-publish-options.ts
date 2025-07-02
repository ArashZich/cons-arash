export const POST_PUBLISH_OPTIONS = (t: Function) => [
  {
    value: true,
    label: t('posts.published'),
  },
  {
    value: false,
    label: t('posts.draft'),
  },
];

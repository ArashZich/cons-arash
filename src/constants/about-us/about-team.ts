export const team_members = (t: Function) => [
  {
    name: t('about.arezoo'),
    position: t('about.arezoo_position'),
    image: `${process.env.NEXT_PUBLIC_LIARA_BASE_URL}/landing/arezoo.webp`,
    linkedin: 'https://www.linkedin.com/in/arezoo-zamany-47b358228/',
  },
  {
    name: t('about.arash'),
    position: t('about.arash_position'),
    image: `${process.env.NEXT_PUBLIC_LIARA_BASE_URL}/landing/arash.webp`,
    linkedin: 'https://www.linkedin.com/in/arashzich',
  },

  // {
  //   name: t('about.shiva'),
  //   position: t('about.shiva_position'),
  //   image: `${process.env.NEXT_PUBLIC_LIARA_BASE_URL}/landing/shiva.webp`,
  // },
  // {
  //   name: t('about.sam'),
  //   position: t('about.sam_position'),
  //   image: `${process.env.NEXT_PUBLIC_LIARA_BASE_URL}/landing/sam.webp`,
  // },
  // {
  //   name: t('about.fatima'),
  //   position: t('about.fatima_position'),
  //   image: `${process.env.NEXT_PUBLIC_LIARA_BASE_URL}/landing/fatima.webp`,
  // },
];

// routes
// import { paths } from 'src/routes/paths';
// config
// import { PATH_AFTER_LOGIN } from 'src/config-global';
// components

import { NavItemProps } from './nav/types';

// ----------------------------------------------------------------------

export const navConfig = (t: Function) => [
  {
    title: t('landing.ar_solution'),
    path: '/ar-solutions',
  },
  {
    title: t('landing.ar_carpet'),
    path: '/ar-carpet',
  },
  {
    title: t('landing.cosmetics'),
    path: '/makeup',
  },
  {
    title: t('landing.eyewear'),
    path: '/eyewear',
  },
  {
    title: t('landing.3d_modeling'),
    path: '/3d-modeling',
  },
  {
    title: t('landing.digital_space_design'),
    path: '/digital-space-design',
  },
  {
    title: t('landing.how_it_works'),
    path: '/how-it-works',
  },

  {
    title: t('landing.about_us'),
    path: '/about-us',
  },
  {
    title: t('landing.pricing'),
    path: '/pricing',
  },
  {
    title: t('landing.blog'),
    path: '/blog',
  },
  {
    title: t('contact_us.contact_us'),
    path: '/contact-us',
  },
  {
    title: t('landing.faq'),
    path: '/faq',
  },
];

export const navConfigMenu = (t: Function): NavItemProps[] => [
  {
    title: t('landing.our_solutions'),
    path: '/ar-solutions', // اضافه کردن path برای آیتم‌های اصلی
    children: [
      {
        subheader: t('landing.our_solutions'),
        items: [
          {
            title: t('landing.ar_solution'),
            path: '/ar-solutions',
          },
          {
            title: t('landing.ar_carpet'),
            path: '/ar-carpet',
          },
          {
            title: t('landing.cosmetics'),
            path: '/makeup',
          },
          {
            title: t('landing.eyewear'),
            path: '/eyewear',
          },
          {
            title: t('landing.3d_modeling'),
            path: '/3d-modeling',
          },
          {
            title: t('landing.digital_space_design'),
            path: '/digital-space-design',
          },
        ],
      },
    ],
  },
  {
    title: t('landing.how_it_works'),
    path: '/how-it-works',
  },
  {
    title: t('landing.about_us'),
    path: '/about-us',
  },
  {
    title: t('landing.pricing'),
    path: '/pricing',
  },
  {
    title: t('landing.blog'),
    path: '/blog',
  },
  {
    title: t('contact_us.contact_us'),
    path: '/contact-us',
  },
  {
    title: t('landing.faq'),
    path: '/faq',
  },
];

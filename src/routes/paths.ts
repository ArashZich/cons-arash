import { paramCase } from 'src/utils/change-case';

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
  ORGANIZATION: '/organization',
  PROJECT: '/project',
  SETTING: '/setting',
  NOTIFICATIONS: '/notifications',
  POST: '/post',
  BLOG: '/blog',
  IDENTITY_VERIFICATION: '/identity-verification',
};

// ----------------------------------------------------------------------

export const paths = {
  pricing: '/pricing',
  about: '/about-us',
  ar_solutions: '/ar-solutions',
  how_it_works: '/how-it-works',
  faq: '/faq',
  contact: '/contact-us',
  page403: '/error/403',
  page404: '/error/404',
  page500: '/error/500',
  ar_carpet: '/ar-carpet',
  makeup: '/makeup',
  eyewear: '/eyewear',

  // AUTH
  auth: {
    login: `${ROOTS.AUTH}/login`,
    register: `${ROOTS.AUTH}/register`,
    forgat_password: `${ROOTS.AUTH}/forgot-password`,
    verification: `${ROOTS.AUTH}/verification`,
    information: `${ROOTS.AUTH}/information`,
    reset_password: `${ROOTS.AUTH}/reset-password`,
  },

  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    overview: `${ROOTS.DASHBOARD}/overview`,
    analytics: {
      root: `${ROOTS.DASHBOARD}/analytics`,
      user_report: (id: number) => `${ROOTS.DASHBOARD}/analytics/${id}`,
    },
    projects: {
      category: `${ROOTS.DASHBOARD}/projects`,
      list: (id: number, label: string) => `${ROOTS.DASHBOARD}/projects/${id}/list/${label}`,
    },
    category_management: {
      root: `${ROOTS.DASHBOARD}/category-management`,
      new: `${ROOTS.DASHBOARD}/category-management/new`,
      edit: (id: number) => `${ROOTS.DASHBOARD}/category-management/${id}/edit`,
    },
    coupon: {
      root: `${ROOTS.DASHBOARD}/coupon`,
      new: `${ROOTS.DASHBOARD}/coupon/new`,
      edit: (id: number) => `${ROOTS.DASHBOARD}/coupon/${id}/edit`,
    },
    plan_management: {
      root: `${ROOTS.DASHBOARD}/plan-management`,
      new: `${ROOTS.DASHBOARD}/plan-management/new`,
      edit: (id: number) => `${ROOTS.DASHBOARD}/plan-management/${id}/edit`,
    },
    organization_management: `${ROOTS.DASHBOARD}/organization-management`,

    billing: {
      root: `${ROOTS.DASHBOARD}/billing`,
      details: (id: number) => `${ROOTS.DASHBOARD}/billing/${id}`,
    },
    user_management: {
      root: `${ROOTS.DASHBOARD}/user-management`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/user-management/${id}/edit`,
    },
    user_information: {
      root: `${ROOTS.DASHBOARD}/user-information`,
      details: (id: string) => `${ROOTS.DASHBOARD}/user-information/${id}/details`,
    },
    send_notification: {
      root: `${ROOTS.DASHBOARD}/send-notification`,
    },
    post: {
      root: `${ROOTS.DASHBOARD}/post`,
      new: `${ROOTS.DASHBOARD}/post/new`,
      // details: (title: string) => `${ROOTS.DASHBOARD}/post/${paramCase(title)}`,
      // edit: (title: string) => `${ROOTS.DASHBOARD}/post/${paramCase(title)}/edit`,
      details: (title: string) => `${ROOTS.DASHBOARD}/post/${paramCase(title)}`,
      edit: (title: string) => `${ROOTS.DASHBOARD}/post/${paramCase(title)}/edit`,
    },
  },
  // ORGANIZATION
  organization: {
    root: ROOTS.ORGANIZATION,
    company_info: `${ROOTS.ORGANIZATION}/company-information`,
    company_activities: `${ROOTS.ORGANIZATION}/company-activities`,
    choose_plan: (id: number) => `${ROOTS.ORGANIZATION}/choose-plan/${id}`,
    assign_admin: `${ROOTS.ORGANIZATION}/assign-admin`,
  },
  // Project
  project: {
    root: ROOTS.PROJECT,
    choose_category: `${ROOTS.PROJECT}/choose-category`,
    project_information: `${ROOTS.PROJECT}/project-information`,
    check_3d_model: `${ROOTS.PROJECT}/3d-model`,
    decoro_sphere: `${ROOTS.PROJECT}/decoro-sphere`,
    printed_products: `${ROOTS.PROJECT}/printed-products`,
    create_project: `${ROOTS.PROJECT}/create-project`,
    project_submitted: `${ROOTS.PROJECT}/project-submitted`,
    details: (uid: string) => `${ROOTS.PROJECT}/${uid}/details`,
    create_showroom: `${ROOTS.PROJECT}/create-showroom`,
  }, //  FIXME: change this when you want change setting profile
  // setting
  setting: { root: ROOTS.SETTING },
  notifications: {
    root: ROOTS.NOTIFICATIONS,
  },
  blog: {
    root: ROOTS.BLOG,
    // details: (title: string) => `${ROOTS.BLOG}/${paramCase(title)}`,
    details: (title: string) => `${ROOTS.BLOG}/${paramCase(title)}`,
  },
  identity_verification: {
    root: ROOTS.IDENTITY_VERIFICATION,
  },
};

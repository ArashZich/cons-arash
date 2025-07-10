import { useMemo } from 'react';
// routes
import { paths } from 'src/routes/paths';
// locales
import { useLocales } from 'src/locales';
// components
import SvgColor from 'src/components/svg-color';
import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  billing: icon('ic_billing'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  overview: icon('ic_overview'),
  projects: icon('ic_projects'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
  user_management: icon('ic_user_management'),
  organization_management: icon('ic_adminConsole'),
};

interface NavItem {
  title: string;
  path: string;
  icon?: JSX.Element; // Adjust this type based on how you define icons
  children?: NavItem[]; // Optionally include children for nested items
}

// ----------------------------------------------------------------------

export function useNavData(): { items: NavItem[] }[] {
  const { user } = useAuthContext(); // Assuming this is how you access the user's role
  // OR
  // const user = useSelector(state => state.user); // If you're using redux

  const { t } = useLocales();

  const data = useMemo(() => {
    const items: NavItem[] = [
      {
        title: t('dashboard.overview'),
        path: paths.dashboard.root,
        icon: ICONS.overview,
      },
      {
        title: t('dashboard.analytics'),
        path: paths.dashboard.analytics.root,
        icon: ICONS.analytics,
      },
      {
        title: t('dashboard.projects'),
        path: paths.dashboard.projects.category,
        icon: ICONS.projects,
      },
      {
        title: t('dashboard.organization_management'),
        path: paths.dashboard.organization_management,
        icon: ICONS.organization_management,
      },
      {
        title: t('dashboard.billing'),
        path: paths.dashboard.billing.root,
        icon: ICONS.billing,
      },
      // Additional items...
    ];

    if (user?.roles?.some((role) => role.title.toLocaleLowerCase() === 'admin')) {
      items.push({
        title: t('dashboard.user_information'),
        path: paths.dashboard.user_information.root,
        icon: ICONS.user_management,
      });
    }

    // Conditionally add sections based on the user role
    if (user?.roles?.some((role) => role.title.toLocaleLowerCase() === 'superadmin')) {
      items.push(
        {
          title: t('dashboard.send_notification'),
          path: paths.dashboard.send_notification.root,
          icon: ICONS.mail,
        },
        {
          title: t('dashboard.user_management'),
          path: paths.dashboard.user_management.root,
          icon: ICONS.user_management,
        },
        // BLOG
        {
          title: t('dashboard.blog'),
          path: paths.dashboard.post.root,
          icon: ICONS.blog,
          children: [
            { title: t('dashboard.list'), path: paths.dashboard.post.root },
            { title: t('dashboard.create'), path: paths.dashboard.post.new },
          ],
        },
        {
          title: t('dashboard.coupon'),
          path: paths.dashboard.coupon.root,
          icon: ICONS.invoice,
          children: [
            { title: t('dashboard.list'), path: paths.dashboard.coupon.root },
            { title: t('dashboard.create'), path: paths.dashboard.coupon.new },
          ],
        },
        {
          title: t('dashboard.category_management'),
          path: paths.dashboard.category_management.root,
          icon: ICONS.organization_management,
          children: [
            { title: t('dashboard.list'), path: paths.dashboard.category_management.root },
            { title: t('dashboard.create'), path: paths.dashboard.category_management.new },
            // Additional children...
          ],
        },
        {
          title: t('dashboard.plan_management'),
          path: paths.dashboard.plan_management.root,
          icon: ICONS.organization_management,
          children: [
            { title: t('dashboard.list'), path: paths.dashboard.plan_management.root },
            { title: t('dashboard.create'), path: paths.dashboard.plan_management.new },
            // Additional children...
          ],
        },
        // 🆕 Admin Section اضافه شده
        {
          title: t('admin.admin_panel'),
          path: paths.dashboard.admin.root,
          icon: ICONS.organization_management,
          children: [
            {
              title: t('admin.discount_rules_management'),
              path: paths.dashboard.admin.discount_rules,
            },
            {
              title: t('admin.plan_features_management'),
              path: paths.dashboard.admin.plan_features,
            },
            {
              title: t('admin.category_pricing_management'),
              path: paths.dashboard.admin.category_pricing,
            },
          ],
        }
      );
    }

    return [{ items }];
  }, [t, user?.roles]);

  return data;
}

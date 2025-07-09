// next
import Link from 'next/link';
// react
import React, { useEffect } from 'react';
// @mui
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
// immer
import { useImmer } from 'use-immer';

// i18n
import { useLocales } from 'src/locales';
// _req-hooks
import { usePackagesQuery } from 'src/_req-hooks/reality/package/usePackagesQuery';
// filters
import { FilterOperatorsEnum } from 'src/_types/site/filters';
// redux
import { useSelector } from 'src/redux/store';
import { organizationSelector } from 'src/redux/slices/organization';
import { SplashScreen } from 'src/components/loading-screen';
// utils
import { fDate, jfDate } from 'src/utils/format-time';
// routes
import { paths } from 'src/routes/paths';

// Helper function for plan name formatting
function formatPlanDisplayName(
  planTitle: string | undefined,
  categoryId?: number,
  t?: any
): string {
  // Handle undefined planTitle
  if (!planTitle) {
    return t?.('plan.unknown') || 'Unknown Plan';
  }

  // Static plans
  if (planTitle && !planTitle.includes('-') && !planTitle.startsWith('home_kitchen')) {
    return t?.(`plan.${planTitle}`) || planTitle;
  }

  // Dynamic plans (format: "home_kitchen-20250709-194634" or "dynamic-plan-uuid")
  if (planTitle.includes('-') || planTitle.startsWith('dynamic-plan-')) {
    let baseName = t?.('plan.dynamic_plan') || 'Dynamic Plan'; // "Dynamic Plan" / "پلن داینامیک"

    // Extract category from plan title if it's in format "category-date-time"
    if (planTitle.includes('-') && !planTitle.startsWith('dynamic-plan-')) {
      const categoryPart = planTitle.split('-')[0];
      if (categoryPart) {
        const categoryName = t?.(`category.${categoryPart}`) || categoryPart;
        baseName = `${t?.('plan.dynamic_plan') || 'Dynamic Plan'} ${categoryName}`;
      }
    }

    return baseName;
  }

  return planTitle;
}

function PlanAndPurchasing() {
  const { t, isRtl } = useLocales();
  const organization = useSelector(organizationSelector);
  const [state, setState] = useImmer<number>(0);

  const today = new Date();

  const { data, isLoading, isSuccess } = usePackagesQuery(
    {
      per_page: 1,
      filters: {
        organization_id: { op: FilterOperatorsEnum._, value: organization?.ID },
      },
    },
    { enabled: !!organization?.ID }
  );

  useEffect(
    () => {
      if (isSuccess && data?.data?.items?.[0]?.expired_at) {
        const expiredAt = new Date(data.data.items[0].expired_at);
        const timeDifference = expiredAt.getTime() - today.getTime();
        setState(Math.ceil(timeDifference / (1000 * 3600 * 24)));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isSuccess]
  );

  if (isLoading) {
    return <SplashScreen />;
  }

  const currentPackage = data?.data?.items?.[0];
  const planTitle = currentPackage?.plan?.title;

  // Check if it's a dynamic plan
  const isDynamicPlan = planTitle?.includes('-') || planTitle?.startsWith('dynamic-plan-');

  // Format plan name for display
  const displayPlanName = formatPlanDisplayName(planTitle, currentPackage?.category_id, t);

  return (
    <Stack spacing={3}>
      <Typography>{t('organization_management.plan_and_purchasing')}</Typography>

      <Stack spacing={2}>
        <Stack spacing={1}>
          <Typography variant="body2" color="text.secondary">
            {t('organization_management.active_plan')}
          </Typography>
          {state === 0 ? (
            <Typography variant="h6" color="text.disabled">
              {t('organization_management.not_active_plan')}
            </Typography>
          ) : (
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="h6" color="secondary.dark">
                {displayPlanName}
              </Typography>
              {isDynamicPlan && (
                <Chip label={t('plan.dynamic')} size="small" variant="outlined" color="primary" />
              )}
            </Stack>
          )}
        </Stack>

        <Stack spacing={1}>
          {state !== 0 && (
            <Stack direction="row" spacing={0.5}>
              <Typography variant="body2" color="text.secondary">
                {t('organization_management.activated')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {isRtl ? jfDate(currentPackage?.created_at) : fDate(currentPackage?.created_at)}
              </Typography>
            </Stack>
          )}

          {currentPackage?.expired_at && (
            <Stack direction="row" spacing={0.5}>
              <Typography variant="body2" color="text.secondary">
                {t('organization_management.expire_date')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {isRtl ? jfDate(currentPackage.expired_at) : fDate(currentPackage.expired_at)}
              </Typography>
            </Stack>
          )}
        </Stack>

        <Stack alignItems="flex-start">
          {isSuccess && currentPackage?.category_id && (
            <Button
              variant={state === 0 ? 'contained' : 'outlined'}
              LinkComponent={Link}
              href={paths.organization.choose_plan(currentPackage.category_id)}
            >
              {state === 0
                ? t('organization_management.active_plan')
                : t('organization_management.upgrade_to_enterprise')}
            </Button>
          )}
        </Stack>
      </Stack>

      <Divider />

      <Stack spacing={1}>
        <Typography variant="body2" color="text.secondary">
          {t('organization_management.remaining_projects')}
        </Typography>
        <Typography variant="subtitle2">{currentPackage?.product_limit || 0}</Typography>
      </Stack>

      <Stack spacing={1}>
        <Typography variant="body2" color="text.secondary">
          {t('organization_management.remaining_volume')}
        </Typography>
        <Typography variant="subtitle2">{currentPackage?.storage_limit_mb || 0} MB</Typography>
      </Stack>

      {/* <Stack spacing={1}>
        <Typography variant="body2" color="text.secondary">
          {t('organization_management.members')}
        </Typography>
        <Typography variant="subtitle2">2</Typography>
      </Stack> */}
    </Stack>
  );
}

export default PlanAndPurchasing;

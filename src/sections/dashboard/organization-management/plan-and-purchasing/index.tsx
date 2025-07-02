// next
import Link from 'next/link';
// react
import React, { useEffect } from 'react';
// @mui
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
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
      if (isSuccess) {
        const expiredAt = new Date(data?.data.items[0].expired_at);
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
            <Typography variant="h6" color="secondary.dark">
              {t(`plan.${data?.data.items[0].plan.title}`)}
            </Typography>
          )}
        </Stack>

        <Stack spacing={1}>
          {state !== 0 && (
            <Stack direction="row" spacing={0.5}>
              <Typography variant="body2" color="text.secondary">
                {t('organization_management.activated')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {isRtl
                  ? jfDate(data?.data?.items[0]?.created_at)
                  : fDate(data?.data?.items[0]?.created_at)}
              </Typography>
            </Stack>
          )}

          <Stack direction="row" spacing={0.5}>
            <Typography variant="body2" color="text.secondary">
              {t('organization_management.expire_date')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {isRtl
                ? jfDate(data?.data?.items[0]?.expired_at)
                : fDate(data?.data?.items[0]?.expired_at)}
            </Typography>
          </Stack>
        </Stack>

        <Stack alignItems="flex-start">
          {isSuccess && (
            <Button
              variant={state === 0 ? 'contained' : 'outlined'}
              LinkComponent={Link}
              href={paths.organization.choose_plan(data?.data?.items[0]?.category_id)}
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
        <Typography variant="subtitle2">{data?.data.items[0].product_limit}</Typography>
      </Stack>

      <Stack spacing={1}>
        <Typography variant="body2" color="text.secondary">
          {t('organization_management.remaining_volume')}
        </Typography>
        <Typography variant="subtitle2">{data?.data.items[0].storage_limit_mb} MB</Typography>
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

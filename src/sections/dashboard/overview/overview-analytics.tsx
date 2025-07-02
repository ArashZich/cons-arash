// next
import Link from 'next/link';
// react
import React from 'react';

// @mui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// lodash
import { isEmpty } from 'lodash';
// redux
import { useSelector } from 'src/redux/store';
import { organizationSelector } from 'src/redux/slices/organization';
// _types
import { FilterOperatorsEnum } from 'src/_types/site/filters';
// routes
import { paths } from 'src/routes/paths';
// locales
import { useLocales } from 'src/locales';
// _req-hooks
import { useViewsQuery } from 'src/_req-hooks/reality/view/useViewsQuery';
// utils
import { serializeDevicesData, serializeBrowserData } from 'src/utils/views-serializer';

//
import TotalImpression from './analytics-details/total-impression';
import CurrentDevicesUses from './analytics-details/current-devices-uses';
import BrowsersUsed from './analytics-details/browsers-used';
// import LocationUsed from './analytics-details/locations-used';

function OverviewAnalytics() {
  const { t } = useLocales();
  const organization = useSelector(organizationSelector);

  const { data: viewData, isSuccess } = useViewsQuery({
    order: 'asc',
    duration: 'one_month',
    filters: {
      organization_id: { op: FilterOperatorsEnum._, value: organization?.ID },
    },
  });

  // const ip = viewData?.data?.items?.ips;

  return (
    isSuccess &&
    !isEmpty(viewData.data.items.views) && (
      <Stack spacing={1}>
        <Stack direction="row" alignItems="center">
          <Typography variant="h6">{t('overview.analytics')}</Typography>
          <Stack ml="auto">
            <Button
              LinkComponent={Link}
              href={paths.dashboard.analytics.root}
              sx={{ color: 'primary.main' }}
            >
              {t('overview.see_more')}
            </Button>
          </Stack>
        </Stack>

        <Stack spacing={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TotalImpression
                title={t('overview.total_impression')}
                total={viewData?.data?.items?.total}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TotalImpression
                title={t('overview.total_3d_views')}
                total={viewData?.data?.items?.is_3d_len}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TotalImpression
                title={t('overview.total_ar_views')}
                total={viewData?.data?.items?.is_ar_len}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <CurrentDevicesUses
                title={t('overview.devices')}
                chart={{
                  series: serializeDevicesData(viewData?.data?.items?.operating_sys),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <BrowsersUsed
                title={t('overview.browsers')}
                list={serializeBrowserData(viewData?.data?.items?.browsers)}
              />
            </Grid>
            {/* <Grid item xs={12} md={4}>
            {ip && <LocationUsed title={t('overview.location')} data={ip} />}
          </Grid> */}
          </Grid>
        </Stack>
      </Stack>
    )
  );
}

export default OverviewAnalytics;

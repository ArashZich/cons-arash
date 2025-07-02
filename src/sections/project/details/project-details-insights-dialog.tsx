// next
import Link from 'next/link';
// react
import React, { useMemo } from 'react';
// @mui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
// lodash
import { isEmpty } from 'lodash';
// iconify
import Iconify from 'src/components/iconify/iconify';
// redux
import { useSelector } from 'src/redux/store';
import { organizationSelector } from 'src/redux/slices/organization';
// locales
import { useLocales } from 'src/locales';
// utils
import { serializeDevicesData, serializeBrowserData } from 'src/utils/views-serializer';
import { formatDurationToClock } from 'src/utils/forma-duration-to-clock';
// _req-hooks
import { useViewsQuery } from 'src/_req-hooks/reality/view/useViewsQuery';
// routes
import { paths } from 'src/routes/paths';
// _types
import { FilterOperatorsEnum } from 'src/_types/site/filters';
// ----------------------------------------------------------------------------
import TotalImpression from '../../dashboard/overview/analytics-details/total-impression';
import CurrentDevicesUses from '../../dashboard/overview/analytics-details/current-devices-uses';
import BrowsersUsed from '../../dashboard/overview/analytics-details/browsers-used';

export interface ProjectDetailsInsightsDialogProps {
  open: boolean;
  onClose: () => void;
  productUid: string | undefined;
}

export default function ProjectDetailsInsightsDialog(props: ProjectDetailsInsightsDialogProps) {
  const { t } = useLocales();
  const { onClose, open, productUid } = props;
  const organization = useSelector(organizationSelector);

  const handleClose = () => {
    onClose();
  };

  const { data: viewData, isSuccess } = useViewsQuery(
    {
      order: 'asc',
      duration: 'one_month',
      filters: {
        product_uid: { op: FilterOperatorsEnum.EQUALS, value: productUid },
        organization_id: { op: FilterOperatorsEnum._, value: organization?.ID },
      },
    },
    {
      enabled: !!productUid,
    }
  );

  const name = useMemo(() => viewData?.data?.items?.views[0]?.name, [viewData]);

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="xl" fullScreen>
      <AppBar
        sx={{ position: 'relative', bgcolor: (theme) => alpha(theme.palette.grey[800], 0.16) }}
      >
        <Toolbar>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {name}
          </Typography>
          <Button autoFocus color="inherit" onClick={handleClose}>
            <Iconify icon="mdi:window-close" />
          </Button>
        </Toolbar>
      </AppBar>
      {isSuccess && !isEmpty(viewData.data.items.views) && (
        <Stack spacing={2} sx={{ mx: 3, mt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <TotalImpression
                title={t('overview.total_impression')}
                total={viewData?.data?.items?.total}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TotalImpression
                title={t('overview.total_3d_views')}
                total={viewData?.data?.items?.is_3d_len}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TotalImpression
                title={t('overview.total_ar_views')}
                total={viewData?.data?.items?.is_ar_len}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TotalImpression
                title={t('overview.total_duration')}
                total={formatDurationToClock(viewData?.data?.items?.visit_duration)}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
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
          </Grid>
        </Stack>
      )}
      <Stack my={2} mx={3}>
        <Stack mr="auto">
          <Button variant="outlined" LinkComponent={Link} href={paths.dashboard.analytics.root}>
            {t('project.see_full_analytics')}
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
}

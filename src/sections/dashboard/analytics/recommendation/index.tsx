// react
import React, { useCallback, useState } from 'react';

// @mui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import ButtonBase from '@mui/material/ButtonBase';
// lodash
import { isEmpty } from 'lodash';
// _req-hooks
import { useAnalyticsQuery } from 'src/_req-hooks/recommender/useAnalyticsQuery';
import { useAnalyticsExportQuery } from 'src/_req-hooks/recommender/useAnalyticsExportQuery';
// utils
import {
  serializeDeviceStats,
  serializeBrowserStats,
  serializeOSStats,
  serializeDailyStats,
  serializeOverviewStats,
} from 'src/utils/recommendation-serializer';
// locales
import { useLocales } from 'src/locales';
// constants
import { duration_recommendation_list, DurationRecommendationType } from 'src/constants';
// components
import Iconify from 'src/components/iconify/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import ButtonLoading from 'src/components/button/button-loading';
// redux
import { useSelector } from 'src/redux/store';
import { organizationSelector } from 'src/redux/slices/organization';
//
import TotalImpression from './total-impression';
import CurrentDevicesUses from './current-devices-uses';
import BrowsersUsed from './browsers-used';
import DailyStats from './daily-stats';

function RecommendationView() {
  const { t } = useLocales();
  const organization = useSelector(organizationSelector);
  const [durationData, setDurationData] = useState<DurationRecommendationType>('week');
  const popover = usePopover();

  const { data: analyticsData, isSuccess } = useAnalyticsQuery(
    {
      organization_uid: organization?.organization_uid,
      period: durationData,
    },
    {
      enabled: !isEmpty(organization?.organization_uid),
    }
  );

  const { data: analyticsExport, isLoading } = useAnalyticsExportQuery(
    {
      organization_uid: organization?.organization_uid,
      period: 'year',
      format: 'csv',
    },
    {
      enabled: false,
    }
  );

  const handleDownload = useCallback(async () => {
    if (analyticsExport) {
      const url = window.URL.createObjectURL(analyticsExport);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `analytics-recommendation-${durationData}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    }
  }, [analyticsExport, durationData]);

  const handleChangeSeries = useCallback(
    (newValue: DurationRecommendationType) => {
      popover.onClose();
      setDurationData(newValue);
    },
    [popover]
  );

  if (!isSuccess || isEmpty(analyticsData)) {
    return null;
  }

  const overview = serializeOverviewStats(analyticsData);
  const deviceStats = serializeDeviceStats(analyticsData);
  const browserStats = serializeBrowserStats(analyticsData);
  const osStats = serializeOSStats(analyticsData);
  const dailyStats = serializeDailyStats(analyticsData);

  return (
    <Stack spacing={3}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <ButtonLoading
          loading={isLoading}
          variant="outlined"
          startIcon={<Iconify icon="mdi:export-variant" />}
          onClick={handleDownload}
          title={t('analytics.export_all')}
        />

        <Stack sx={{ ml: 'auto' }}>
          <ButtonBase
            onClick={popover.onOpen}
            sx={{
              pl: 1,
              py: 0.5,
              pr: 0.5,
              borderRadius: 1,
              typography: 'subtitle2',
              bgcolor: 'background.neutral',
            }}
          >
            {t(`analytics.${durationData}`)}
            <Iconify
              width={16}
              icon={popover.open ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
              sx={{ ml: 0.5 }}
            />
          </ButtonBase>
        </Stack>

        <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 140 }}>
          {React.Children.toArray(
            duration_recommendation_list.map((option) => (
              <MenuItem
                key={option.label}
                selected={option.value === durationData}
                onClick={() => handleChangeSeries(option.value)}
              >
                {t(`analytics.${option.label}`)}
              </MenuItem>
            ))
          )}
        </CustomPopover>
      </Stack>

      {overview && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TotalImpression title={t('analytics.total_requests')} total={overview.totalRequests} />
          </Grid>

          {/* <Grid item xs={12} md={4}>
            <TotalImpression
              title={t('analytics.avg_response_time')}
              total={overview.avgResponseTime}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TotalImpression title={t('analytics.success_rate')} total={overview.successRate} />
          </Grid> */}
        </Grid>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <CurrentDevicesUses
            title={t('analytics.devices')}
            chart={{
              series: deviceStats,
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <BrowsersUsed title={t('analytics.browsers')} list={browserStats} />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <CurrentDevicesUses
            title={t('analytics.operating_systems')}
            chart={{
              series: osStats,
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <DailyStats title={t('analytics.daily_statistics')} data={dailyStats} />
        </Grid>
      </Grid>
    </Stack>
  );
}

export default RecommendationView;

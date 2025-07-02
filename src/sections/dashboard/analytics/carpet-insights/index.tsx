// src/sections/dashboard/carpet-insights/index.tsx
import React, { useCallback, useState } from 'react';
// @mui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import ButtonBase from '@mui/material/ButtonBase';
// lodash
import { isEmpty } from 'lodash';
// _req-hooks
import { useCarpetInsightsQuery } from 'src/_req-hooks/recommender/useCarpetInsightsQuery';
import { useCarpetInsightsExportQuery } from 'src/_req-hooks/recommender/useCarpetInsightsExportQuery';
// locales
import { useLocales } from 'src/locales';
// components
import Iconify from 'src/components/iconify/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import ButtonLoading from 'src/components/button/button-loading';
// redux
import { useSelector } from 'src/redux/store';
import { organizationSelector } from 'src/redux/slices/organization';
//
import TotalCarpets from './total-carpets';
import TopRecommendedCarpets from './top-recommended-carpets';

// ----------------------------------------------------------------------

const TIME_OPTIONS = [
  { label: 'last_30_days', value: 30 },
  { label: 'last_90_days', value: 90 },
  { label: 'last_180_days', value: 180 },
  { label: 'last_365_days', value: 365 },
];

function CarpetInsightsView() {
  const { t } = useLocales();
  const organization = useSelector(organizationSelector);
  const [days, setDays] = useState(30);
  const popover = usePopover();

  const { data: insightsData, isSuccess } = useCarpetInsightsQuery(
    {
      organization_uid: organization?.organization_uid,
      days,
      limit: 1000,
    },
    {
      enabled: !isEmpty(organization?.organization_uid),
    }
  );

  const {
    data: insightsExport,
    isLoading,
    refetch: fetchExport,
  } = useCarpetInsightsExportQuery(
    {
      organization_uid: organization?.organization_uid,
      days,
      limit: 10000,
    },
    {
      enabled: false,
    }
  );

  const handleDownload = useCallback(async () => {
    await fetchExport();

    if (insightsExport) {
      const url = window.URL.createObjectURL(insightsExport);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `carpet-insights-${days}-days.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    }
  }, [insightsExport, days, fetchExport]);

  const handleChangeDays = useCallback(
    (newValue: number) => {
      popover.onClose();
      setDays(newValue);
    },
    [popover]
  );

  if (!isSuccess || isEmpty(insightsData)) {
    return null;
  }

  const { general_stats, top_recommended_carpets } = insightsData;

  return (
    <Stack spacing={3}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <ButtonLoading
          loading={isLoading}
          variant="outlined"
          startIcon={<Iconify icon="mdi:export-variant" />}
          onClick={handleDownload}
          title={t('insights.export_all')}
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
            {t('insights.last_n_days', { days })}
            <Iconify
              width={16}
              icon={popover.open ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
              sx={{ ml: 0.5 }}
            />
          </ButtonBase>
        </Stack>

        <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 180 }}>
          {React.Children.toArray(
            TIME_OPTIONS.map((option) => (
              <MenuItem
                key={option.label}
                selected={option.value === days}
                onClick={() => handleChangeDays(option.value)}
              >
                {t(`insights.${option.label}`)}
              </MenuItem>
            ))
          )}
        </CustomPopover>
      </Stack>

      {general_stats && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TotalCarpets
              title={t('insights.total_recommendations')}
              total={general_stats.total_recommendations}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TotalCarpets
              title={t('insights.unique_carpets')}
              total={general_stats.unique_carpets_count}
            />
          </Grid>
        </Grid>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TopRecommendedCarpets
            title={t('insights.top_recommended_carpets')}
            data={top_recommended_carpets}
          />
        </Grid>
      </Grid>
    </Stack>
  );
}

export default CarpetInsightsView;

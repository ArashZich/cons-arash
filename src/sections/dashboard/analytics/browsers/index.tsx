import React, { useCallback, useMemo, useState } from 'react';
// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import CardHeader from '@mui/material/CardHeader';
import ButtonBase from '@mui/material/ButtonBase';
import Card, { CardProps } from '@mui/material/Card';
import LinearProgress from '@mui/material/LinearProgress';

// _types
import { FilterOperatorsEnum } from 'src/_types/site/filters';
// locales
import { useLocales } from 'src/locales';
// _req-hooks
import { useViewsQuery } from 'src/_req-hooks/reality/view/useViewsQuery';
// utils
import { fShortenNumber } from 'src/utils/format-number';
import { serializeDevicesData } from 'src/utils/views-serializer';
// components
import Iconify from 'src/components/iconify/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
// constants
import { duration_list, DurationType } from 'src/constants';
// ----------------------------------------------------------------------

interface Props extends CardProps {
  title?: string;
  organization_id: number;
}

export default function BrowsersView({ title, organization_id, ...other }: Props) {
  const { t } = useLocales();

  const [durationData, setDurationData] = useState<DurationType>('one_week');

  const { data: viewData } = useViewsQuery({
    order: 'asc',
    duration: durationData,
    filters: {
      organization_id: { op: FilterOperatorsEnum._, value: organization_id },
    },
  });

  const browser = useMemo(
    () => viewData?.data?.items.views.map((item) => item.browser_agent) || [],
    [viewData]
  );

  const popover = usePopover();

  const handleChangeSeries = useCallback(
    (newValue: DurationType) => {
      popover.onClose();
      setDurationData(newValue);
    },
    [popover]
  );

  // Calculate the maximum value for normalization
  const maxProgressValue = useMemo(() => {
    const allValues = serializeDevicesData(browser).map((progress) => progress.value);
    return Math.max(...allValues, 1); // Ensure the max value is at least 1 to avoid division by zero
  }, [browser]);

  return (
    <Card {...other}>
      <CardHeader
        title={title}
        action={
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
        }
      />

      <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 140 }}>
        {duration_list.map((option) => (
          <MenuItem
            key={option.label}
            selected={option.value === durationData}
            onClick={() => handleChangeSeries(option.value)}
          >
            {t(`analytics.${option.label}`)}
          </MenuItem>
        ))}
      </CustomPopover>

      <Stack spacing={3} sx={{ p: 3 }}>
        {browser &&
          serializeDevicesData(browser).map((progress) => (
            <Stack key={progress.label}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ mb: 1 }}
              >
                <Box sx={{ typography: 'overline' }}>{progress.label}</Box>
                <Box sx={{ typography: 'subtitle1' }}>{fShortenNumber(progress.value)}</Box>
              </Stack>

              <LinearProgress
                variant="determinate"
                value={(progress.value / maxProgressValue) * 100} // Normalize to 0-100 range
                sx={{
                  color: 'secondary.main',
                  height: 8,
                  bgcolor: (theme) => alpha(theme.palette.grey[500], 0.16),
                }}
              />
            </Stack>
          ))}
      </Stack>
    </Card>
  );
}

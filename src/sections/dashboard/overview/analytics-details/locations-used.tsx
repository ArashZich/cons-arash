// react
import React, { useCallback, useEffect, useState } from 'react';
// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import CardHeader from '@mui/material/CardHeader';
import ButtonBase from '@mui/material/ButtonBase';
import Card, { CardProps } from '@mui/material/Card';
import LinearProgress from '@mui/material/LinearProgress';

// utils
import { fShortenNumber } from 'src/utils/format-number';
import { fetchGeoInfoForIpList } from 'src/utils/views-serializer';
// locales
import { useLocales } from 'src/locales';
// components
import Iconify from 'src/components/iconify/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
// constants
import { duration_list, DurationType } from 'src/constants';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  data: string[];
}

export default function LocationUsed({ title, subheader, data, ...other }: Props) {
  const { t } = useLocales();
  const [durationData, setDurationData] = useState<DurationType>('one_week');
  const [locationData, setLocationData] = useState<{ label: string; value: number }[]>([]);

  const popover = usePopover();

  const handleChangeSeries = useCallback(
    (newValue: DurationType) => {
      popover.onClose();
      setDurationData(newValue);
    },
    [popover]
  );

  useEffect(() => {
    fetchGeoInfoForIpList(data)
      .then((cities) => {
        setLocationData(cities);
      })
      .catch((error) => {
        console.error('Error fetching geolocation data:', error);
      });
  }, [data]);

  return (
    <Card {...other} sx={{ minHeight: 500 }}>
      <CardHeader
        title={title}
        subheader={subheader}
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
        {locationData.map((progress) => (
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
              value={progress.value}
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

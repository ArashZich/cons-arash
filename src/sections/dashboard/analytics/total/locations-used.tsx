// react
import React, { useEffect, useState } from 'react';
// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import Card, { CardProps } from '@mui/material/Card';
import LinearProgress from '@mui/material/LinearProgress';
// utils
import { fShortenNumber } from 'src/utils/format-number';
// components
import { fetchGeoInfoForIpList } from 'src/utils/views-serializer';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  data: string[];
}

export default function LocationUsed({ title, subheader, data, ...other }: Props) {
  const [locationData, setLocationData] = useState<{ label: string; value: number }[]>([]);

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
    <Card sx={{ minHeight: 500 }} {...other}>
      <CardHeader title={title} subheader={subheader} />

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

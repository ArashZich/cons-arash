import React, { useState } from 'react';
// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import Card, { CardProps } from '@mui/material/Card';
// utils
import { fNumber } from 'src/utils/format-number';
// locales
import { useLocales } from 'src/locales';

type ItemProps = {
  date: string;
  requests: number;
  // responseTime: number;
};

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  data: ItemProps[];
}

export default function DailyStats({ title, subheader, data, ...other }: Props) {
  const [displayCount, setDisplayCount] = useState(5);
  const { t } = useLocales();

  const showMore = () => {
    setDisplayCount((prev) => prev + 5);
  };

  return (
    <Card sx={{ height: 500 }} {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Stack spacing={3}>
        <Stack
          spacing={3}
          sx={{
            p: 3,
            height: 380,
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: 6,
            },
            '&::-webkit-scrollbar-thumb': {
              borderRadius: 8,
              backgroundColor: 'grey.500',
            },
          }}
        >
          {data.slice(0, displayCount).map((item) => (
            <StatItem key={item.date} stat={item} />
          ))}
        </Stack>

        {displayCount < data.length && (
          <Box sx={{ px: 2, textAlign: 'end', pb: 5 }}>
            <Button sx={{ color: 'primary.main' }} size="small" onClick={showMore} variant="text">
              {t('landing.show_more')}
            </Button>
          </Box>
        )}
      </Stack>
    </Card>
  );
}

// StatItem component remains the same
function StatItem({ stat }: { stat: ItemProps }) {
  const { date, requests } = stat;
  const { t } = useLocales();

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Typography variant="subtitle2">{date}</Typography>

        <Stack direction="row" spacing={1}>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {t('analytics.requests')}: {fNumber(requests)}
          </Typography>

          {/* <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            •
          </Typography> */}

          {/* <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {t('analytics.response_time')}: {responseTime}ms
          </Typography> */}
        </Stack>
      </Box>
    </Stack>
  );
}

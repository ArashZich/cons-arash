// src/sections/dashboard/carpet-insights/top-recommended-carpets.tsx
import React, { useState } from 'react';
// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import Card, { CardProps } from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
// utils
import { fShortenNumber } from 'src/utils/format-number';
// locales
import { useLocales } from 'src/locales';
// routes
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
// types
import { CarpetInsightsResponse } from 'src/_types/recommender/carpetInsights';
// utils
import { fDate, jfDate } from 'src/utils/format-time';
// ----------------------------------------------------------------------

type ItemProps = CarpetInsightsResponse['top_recommended_carpets'][0];

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  data: ItemProps[];
}

export default function TopRecommendedCarpets({ title, subheader, data, ...other }: Props) {
  const [displayCount, setDisplayCount] = useState(10);
  const { t } = useLocales();

  const showMore = () => {
    setDisplayCount((prev) => prev + 10);
  };

  return (
    <Card sx={{ minHeight: 600 }} {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Stack spacing={3}>
        <Stack
          spacing={3}
          sx={{
            p: 3,
            maxHeight: 500,
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
            <CarpetItem key={item.carpet_id} carpet={item} />
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

// ----------------------------------------------------------------------

function CarpetItem({ carpet }: { carpet: ItemProps }) {
  const {
    carpet_id,
    carpet_name,
    recommendation_count,
    first_recommended,
    last_recommended,
    preview_uri,
    product_uid,
  } = carpet;

  const router = useRouter();
  const { t, isRtl } = useLocales();

  const formattedFirstDate =
    first_recommended && isRtl ? jfDate(first_recommended) : fDate(first_recommended);
  const formattedLastDate =
    last_recommended && isRtl ? jfDate(last_recommended) : fDate(last_recommended);

  // Generate a simple hash from the carpet_id to create a consistent color
  const getColorFromId = (id: string) => {
    const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 60%)`;
  };

  const handleCarpetClick = () => {
    // استفاده از product_uid برای هدایت به صفحه جزئیات
    if (product_uid) {
      router.push(paths.project.details(product_uid));
    }
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      onClick={handleCarpetClick}
      sx={{
        cursor: 'pointer',
        '&:hover': {
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          borderRadius: 1,
        },
        p: 1,
      }}
    >
      {preview_uri ? (
        <Avatar
          variant="rounded"
          src={preview_uri}
          alt={carpet_name}
          sx={{
            width: 48,
            height: 48,
          }}
        />
      ) : (
        <Avatar
          variant="rounded"
          sx={{
            width: 48,
            height: 48,
            bgcolor: getColorFromId(carpet_id),
            color: 'white',
            fontSize: '1rem',
          }}
        >
          {carpet_name ? carpet_name.charAt(0).toUpperCase() : 'C'}
        </Avatar>
      )}

      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Typography variant="subtitle2" noWrap>
          {carpet_name || `ID: ${carpet_id.substring(0, 8)}...`}
        </Typography>

        <Stack direction="row" spacing={1}>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {t('insights.first_seen')}: {formattedFirstDate}
          </Typography>

          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            •
          </Typography>

          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {t('insights.last_seen')}: {formattedLastDate}
          </Typography>
        </Stack>
      </Box>

      <Stack alignItems="flex-end">
        <Typography variant="subtitle2" sx={{ color: 'primary.main' }}>
          {fShortenNumber(recommendation_count)}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {t('insights.recommendations')}
        </Typography>
      </Stack>
    </Stack>
  );
}

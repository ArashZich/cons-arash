// react
import React from 'react';
// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import Card, { CardProps } from '@mui/material/Card';
// locales
import { useLocales } from 'src/locales';

// utils
import { fShortenNumber } from 'src/utils/format-number';
// components
import Iconify from 'src/components/iconify/iconify';
// ----------------------------------------------------------------------

type ItemProps = {
  label: string;
  value: number;
  icon: string;
};

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  list: ItemProps[];
}

export default function BrowsersUsed({ title, subheader, list, ...other }: Props) {
  const { t } = useLocales();

  return (
    <Card {...other} sx={{ minHeight: 500 }}>
      <CardHeader
        title={title}
        subheader={subheader}
        action={
          <ButtonBase
            sx={{
              px: 1,
              py: 0.5,
              borderRadius: 1,
              typography: 'subtitle2',
              bgcolor: 'background.neutral',
            }}
          >
            {t('analytics.one_month')}
          </ButtonBase>
        }
      />

      <Stack spacing={3}>
        <Stack spacing={3} sx={{ p: 3 }}>
          {list.map((app) => (
            <ApplicationItem key={app.value} app={app} />
          ))}
        </Stack>
      </Stack>
    </Card>
  );
}

// ----------------------------------------------------------------------

type ApplicationItemProps = {
  app: ItemProps;
};

function ApplicationItem({ app }: ApplicationItemProps) {
  const { label, value, icon } = app;
  const { t } = useLocales();

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Avatar
        variant="rounded"
        sx={{
          width: 48,
          height: 48,
          bgcolor: 'background.neutral',
        }}
      >
        <Iconify icon={icon} sx={{ width: 24, height: 24, color: 'black' }} />
      </Avatar>

      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Typography variant="subtitle2">{label}</Typography>
      </Box>

      <Stack alignItems="flex-end">
        <Typography variant="caption" sx={{ mt: 0.5, color: 'text.secondary' }}>
          {fShortenNumber(value)} {t('analytics.reviews')}
        </Typography>
      </Stack>
    </Stack>
  );
}

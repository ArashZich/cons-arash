import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, Divider, Stack, Typography } from '@mui/material';
import React, { ReactNode } from 'react';
import { useRouter } from 'src/routes/hooks';
// locales
import { useLocales } from 'src/locales';

interface NewFormCardProps {
  children: ReactNode;
  title: string;
  disable?: any;
  loading?: any;
}

export default function NewFormCard(props: NewFormCardProps) {
  const { children, title, disable, loading } = props;
  const router = useRouter();
  const { t } = useLocales();
  return (
    <Card>
      <Stack
        sx={{
          height: 72,
          bgcolor: (theme) => theme.palette.background.neutral,
        }}
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h4">{title}</Typography>
      </Stack>
      <Divider />
      <Box sx={{ p: 2 }}>{children}</Box>
      <Divider />
      <Stack
        sx={{
          height: 72,
          p: 2,
        }}
        direction="row"
        justifyContent="end"
        alignItems="center"
        spacing={1}
      >
        <Button variant="outlined" onClick={() => router.back()}>
          {t('category_management.cancel')}
        </Button>
        <LoadingButton
          variant="contained"
          color="primary"
          disabled={disable}
          loading={loading}
          type="submit"
        >
          {t('category_management.submit')} {title}
        </LoadingButton>
      </Stack>
    </Card>
  );
}

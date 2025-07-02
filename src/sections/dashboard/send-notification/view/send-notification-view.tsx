'use client';

// react
import React from 'react';
// @mui
import Stack from '@mui/material/Stack';
import { Container } from '@mui/material';

// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';

// routes
import { paths } from 'src/routes/paths';
// locales
import { useLocales } from 'src/locales';

//
import SendNotificationForm from '../send-notification-form';

//----------------------------------------------------------------

export default function SendNotificationView() {
  const { t } = useLocales();
  const settings = useSettingsContext();

  return (
    <Stack maxWidth="100%" sx={{ height: '100%', px: 2 }}>
      <CustomBreadcrumbs
        heading={t('send_notification.send_notification')}
        links={[
          { name: t('dashboard.root'), href: paths.dashboard.root },
          {
            name: t('send_notification.send_notification'),
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ height: '100%' }}>
        <SendNotificationForm />
      </Container>
    </Stack>
  );
}

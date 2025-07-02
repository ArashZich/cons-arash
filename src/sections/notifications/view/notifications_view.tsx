'use client';

// @mui
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
// locales
import { useLocales } from 'src/locales';
// components
import { useSettingsContext } from 'src/components/settings';
//
import NotificationsItem from '../notifications-item';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function SettingView() {
  const { t } = useLocales();
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'sm'}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        {t('notifications.notifications')}
      </Typography>

      <NotificationsItem />
    </Container>
  );
}

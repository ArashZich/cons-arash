'use client';

// react
import { useCallback } from 'react';
// @mui
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
// useImmer
import { useImmer } from 'use-immer';
// locales
import { useLocales } from 'src/locales';
// components
import { useSettingsContext } from 'src/components/settings';
//
import PersonalInformation from '../personal-information';
// import NotificationSettings from '../notification-settings';
import Security from '../security';

// ----------------------------------------------------------------------

const TABS = (t: Function) => [
  {
    value: 'personal_information',
    label: t('settings.personal_information'),
  },
  // {
  //   value: 'notification_settings',
  //   label: t('settings.notification_settings'),
  // },
  {
    value: 'security',
    label: t('settings.security'),
  },
];

// ----------------------------------------------------------------------

export default function SettingView() {
  const { t } = useLocales();
  const settings = useSettingsContext();

  const [currentTab, setCurrentTab] = useImmer('personal_information');

  const handleChangeTab = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      // Use the update function provided by useImmer
      setCurrentTab(newValue);
    },
    [setCurrentTab]
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'md'}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        {t('settings.settings')}
      </Typography>
      <Stack sx={{ borderBottom: 1, borderColor: 'divider', mb: { xs: 3, md: 5 } }}>
        <Tabs variant="fullWidth" value={currentTab} onChange={handleChangeTab}>
          {TABS(t).map((tab) => (
            <Tab key={tab.value} label={tab.label} value={tab.value} />
          ))}
        </Tabs>
      </Stack>
      {currentTab === 'personal_information' && <PersonalInformation />}

      {/* {currentTab === 'notification_settings' && <NotificationSettings />} */}

      {currentTab === 'security' && <Security />}
    </Container>
  );
}

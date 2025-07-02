import { m } from 'framer-motion';
// @mui
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// components
import { MotionViewport, varFade } from 'src/components/animate';
// i18n
import { useLocales } from 'src/locales';

// ----------------------------------------------------------------------

export default function ContactAddress() {
  const { t } = useLocales();
  return (
    <Stack component={MotionViewport} spacing={5}>
      <m.div variants={varFade().inUp}>
        <Typography color="grey.700" variant="h3">
          {t('contact_us.contact_us')}
        </Typography>
      </m.div>

      <Stack spacing={3} alignItems="flex-start">
        <m.div variants={varFade().inUp}>
          <Typography color="grey.300">{t('contact_us.armo_email')}</Typography>
        </m.div>

        <m.div variants={varFade().inUp}>
          <Typography color="grey.300">{t('contact_us.armo_address')}</Typography>
        </m.div>

        <m.div variants={varFade().inUp}>
          <Typography color="grey.300" style={{ direction: 'ltr' }}>
            {t('contact_us.armo_phone')}
          </Typography>
        </m.div>

        <m.div variants={varFade().inUp}>
          <Typography color="grey.300" style={{ direction: 'ltr' }}>
            {t('contact_us.armo_mobile')}
          </Typography>
        </m.div>
        <m.div variants={varFade().inUp}>
          <Box component="img" alt="auth" src="/assets/illustrations/illustration_dashboard.svg" />
        </m.div>
      </Stack>
    </Stack>
  );
}

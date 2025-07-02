'use client';

import { m } from 'framer-motion';
// @mui
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// layouts
import CompactLayout from 'src/layouts/compact';
// assets
import { ForbiddenIllustration } from 'src/assets/illustrations';
// components
import { RouterLink } from 'src/routes/components';
import { MotionContainer, varBounce } from 'src/components/animate';
// i18n
import { useLocales } from 'src/locales';
// ----------------------------------------------------------------------

export default function View403() {
  const { t } = useLocales();
  return (
    <CompactLayout>
      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            {t('errors.403')}
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>{t('errors.403_description')}</Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <ForbiddenIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
        </m.div>

        <Button component={RouterLink} href="/" size="large" variant="contained">
          {t('errors.go_home')}
        </Button>
      </MotionContainer>
    </CompactLayout>
  );
}

import React from 'react';
// framer-motion
import { m } from 'framer-motion';
// @mui
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// locales
import { useLocales } from 'src/locales';
// components
import { MotionContainer, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

export default function HowItWorksDescriptions() {
  const { t } = useLocales();
  return (
    <Box mt={5}>
      <Container component={MotionContainer}>
        <Stack alignItems="center">
          <Stack p={10} mt={5} alignItems="center" maxWidth="md">
            <Stack>
              <m.div variants={varFade().inUp}>
                <Typography variant="h3" color="grey.300">
                  {t('how_it_works.ar_products')}
                </Typography>
              </m.div>
              <m.div variants={varFade().inUp}>
                <Typography mt={2} variant="body1" color="grey.100">
                  {t('how_it_works.ar_products_description')}
                </Typography>
              </m.div>
            </Stack>
            <Stack mt={10}>
              <m.div variants={varFade().inUp}>
                <Typography variant="h3" color="grey.300">
                  {t('how_it_works.easy_platform')}
                </Typography>
              </m.div>
              <m.div variants={varFade().inUp}>
                <Typography mt={2} variant="body1" color="grey.100">
                  {t('how_it_works.guide_support')}
                </Typography>
              </m.div>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

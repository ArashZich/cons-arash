import React from 'react';
// framer-motion
import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// locales
import { useLocales } from 'src/locales';
// components
import { MotionContainer, varFade } from 'src/components/animate';

//
const HighlightText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '88px',
  lineHeight: 1,
  textAlign: 'center',

  [theme.breakpoints.down('md')]: {
    fontSize: '64px',
  },
}));
// ----------------------------------------------------------------------

export default function HowItWorksManage() {
  const { t } = useLocales();
  return (
    <Box mt={15}>
      <Container component={MotionContainer}>
        <Stack alignItems="center">
          <HighlightText color="grey.700">{t('how_it_works.manage_embed')}</HighlightText>
          <Stack p={10} mt={5} alignItems="center" maxWidth="md">
            <Stack>
              <m.div variants={varFade().inUp}>
                <Typography variant="h3" color="grey.300">
                  {t('how_it_works.manage_everywhere')}
                </Typography>
              </m.div>
              <m.div variants={varFade().inUp}>
                <Typography mt={2} variant="body1" color="grey.100">
                  {t('how_it_works.ease_of_use')}
                </Typography>
              </m.div>
            </Stack>

            <Stack mt={2}>
              <m.div variants={varFade().inUp}>
                <Typography variant="h3" color="grey.300">
                  {t('how_it_works.integrate_share')}
                </Typography>
              </m.div>
              <m.div variants={varFade().inUp}>
                <Typography mt={2} variant="body1" color="grey.100">
                  {t('how_it_works.provide_link_qr')}
                </Typography>
              </m.div>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

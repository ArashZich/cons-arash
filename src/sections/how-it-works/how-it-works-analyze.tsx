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
import Image from 'src/components/image';

//
const HighlightText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '88px',
  lineHeight: 1,

  [theme.breakpoints.down('md')]: {
    fontSize: '64px',
  },
}));
// ----------------------------------------------------------------------

export default function HowItWorksAnalyze() {
  const { t } = useLocales();
  return (
    <Box mt={10}>
      <Container component={MotionContainer}>
        <Stack alignItems="center">
          <HighlightText color="grey.700">{t('how_it_works.analyze_success')}</HighlightText>

          <Stack p={10} mt={5} alignItems="center" maxWidth="md">
            <Stack>
              <m.div variants={varFade().inUp}>
                <Typography variant="h3" color="grey.300">
                  {t('how_it_works.data_analysis')}
                </Typography>
              </m.div>
              <m.div variants={varFade().inUp}>
                <Typography mt={2} variant="body1" color="grey.100">
                  {t('how_it_works.track_results')}
                </Typography>
              </m.div>
              <m.div variants={varFade().inUp}>
                <Image
                  sx={{ mt: 6 }}
                  src={`${process.env.NEXT_PUBLIC_LIARA_BASE_URL}/how-it-works/analyze.webp`}
                  alt="analyze"
                />
              </m.div>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
